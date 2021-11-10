/**
 * @file
 *
 * CTools flexible AJAX responder object.
 */

(function ($) {
  Drupal.CTools = Drupal.CTools || {};
  Drupal.CTools.AJAX = Drupal.CTools.AJAX || {};
  Drupal.CTools.AJAX.commands = Drupal.CTools.AJAX.commands || {};
  Drupal.CTools.AJAX.commandCache = Drupal.CTools.AJAX.commandCache || {};
  Drupal.CTools.AJAX.scripts = {};
  Drupal.CTools.AJAX.css = {};
  Drupal.settings.CToolsUrlIsAjaxTrusted = Drupal.settings.CToolsUrlIsAjaxTrusted || {};

  /**
   * Success callback for an ajax request.
   *
   * This function expects to receive a packet of data from a JSON object
   * which is essentially a list of commands. Each commands must have a
   * 'command' setting and this setting must resolve to a function in the
   * Drupal.CTools.AJAX.commands space.
   */
  Drupal.CTools.AJAX.respond = function(data) {
    var i;
    for (i in data) {
      if (data[i]['command'] && Drupal.CTools.AJAX.commands[data[i]['command']]) {
        Drupal.CTools.AJAX.commands[data[i]['command']](data[i]);
      }
    }
  };

  /**
   * Grab the response from the server and store it.
   */
  Drupal.CTools.AJAX.warmCache = function () {
    // Store this expression for a minor speed improvement.
    var $this = $(this),
        old_url = $this.attr('href');
    // If we are currently fetching, or if we have fetched this already which is
    // ideal for things like pagers, where the previous page might already have
    // been seen in the cache.
    if ($this.hasClass('ctools-fetching') || !Drupal.CTools.AJAX.urlIsLocal(old_url) || Drupal.CTools.AJAX.commandCache[old_url]) {
      return false;
    }

    // Grab all the links that match this url and add the fetching class.
    // This allows the caching system to grab each url once and only once
    // instead of grabbing the url once per <a>.
    var $objects = $('a[href="' + old_url + '"]');
    $objects.addClass('ctools-fetching');
    try {
      var url = Drupal.sanitizeAjaxUrl(Drupal.CTools.AJAX.urlReplaceNojs(url));
      var ajaxOptions = {
        type: "POST",
        url: url,
        data: { 'js': 1, 'ctools_ajax': 1},
        global: true,
        success: function (data) {
          if (!Drupal.CTools.AJAX.isAjaxResponseTrusted(ajaxOptions.cXhr, url)) {
            return this.error(ajaxOptions.cXhr);
          }

          Drupal.CTools.AJAX.commandCache[old_url] = data;
          $objects.addClass('ctools-cache-warmed').trigger('ctools-cache-warm', [data]);
        },
        beforeSend: Drupal.CTools.AJAX.beforeSend,
        complete: function() {
          $objects.removeClass('ctools-fetching');
        },
        dataType: 'json',
        jsonp: false
      };
      $.ajax(ajaxOptions);
    }
    catch (err) {
      $objects.removeClass('ctools-fetching');
      return false;
    }

    return false;
  };

  /**
   * Cachable click handler to fetch the commands out of the cache or from url.
   */
  Drupal.CTools.AJAX.clickAJAXCacheLink = function () {
    var $this = $(this);
    if ($this.hasClass('ctools-fetching')) {
      $this.bind('ctools-cache-warm', function (event, data) {
        Drupal.CTools.AJAX.respond(data);
      });
      return false;
    }
    else {
      if ($this.hasClass('ctools-cache-warmed') && Drupal.CTools.AJAX.commandCache[$this.attr('href')]) {
        Drupal.CTools.AJAX.respond(Drupal.CTools.AJAX.commandCache[$this.attr('href')]);
        return false;
      }
      else {
        return Drupal.CTools.AJAX.clickAJAXLink.apply(this);
      }
    }
  };

  /**
   * Generic replacement click handler to open the modal with the destination
   * specified by the href of the link.
   */
  Drupal.CTools.AJAX.clickAJAXLink = function() {
    if ($(this).hasClass('ctools-ajaxing')) {
      return false;
    }

    var url = $(this).attr('href');
    if (!Drupal.CTools.AJAX.urlIsLocal(url)) {
      return false;
    }
    $(this).addClass('ctools-ajaxing');
    try {
      url = Drupal.sanitizeAjaxUrl(Drupal.CTools.AJAX.urlReplaceNojs(url));
      $.ajax({
        type: "POST",
        url: url,
        data: { 'js': 1, 'ctools_ajax': 1},
        global: true,
        success: Drupal.CTools.AJAX.success,
        beforeSend: Drupal.CTools.AJAX.beforeSend,
        error: function(xhr) {
          Drupal.CTools.AJAX.handleErrors(xhr, url);
        },
        complete: function() {
          $('.ctools-ajaxing').removeClass('ctools-ajaxing');
        },
        dataType: 'json',
        jsonp: false
      });
    }
    catch (err) {
      alert("An error occurred while attempting to process " + url);
      $('.ctools-ajaxing').removeClass('ctools-ajaxing');
      return false;
    }

    return false;
  };

  /**
   * Generic replacement click handler to open the modal with the destination
   * specified by the href of the link.
   */
  Drupal.CTools.AJAX.clickAJAXButton = function() {
    if ($(this).hasClass('ctools-ajaxing')) {
      return false;
    }

    // Put our button in.
    this.form.clk = this;

    var url = Drupal.CTools.AJAX.findURL(this);
    $(this).addClass('ctools-ajaxing');
    try {
      if (url) {
        url = Drupal.sanitizeAjaxUrl(Drupal.CTools.AJAX.urlReplaceNojs(url));
        $.ajax({
          type: "POST",
          url: url,
          data: { 'js': 1, 'ctools_ajax': 1},
          global: true,
          success: Drupal.CTools.AJAX.success,
          beforeSend: Drupal.CTools.AJAX.beforeSend,
          error: function(xhr) {
            Drupal.CTools.AJAX.handleErrors(xhr, url);
          },
          complete: function() {
            $('.ctools-ajaxing').removeClass('ctools-ajaxing');
          },
          dataType: 'json',
          jsonp: false
        });
      }
      else {
        var form = this.form;
        url = $(form).attr('action');
        setTimeout(function() { Drupal.CTools.AJAX.ajaxSubmit(form, url); }, 1);
      }
    }
    catch (err) {
      alert("An error occurred while attempting to process " + url);
      $(this).removeClass('ctools-ajaxing');
      return false;
    }
    return false;
  };

  /**
   * Helper method to stash the xhr object so it is available in the success callback.
   */
  Drupal.CTools.AJAX.beforeSend = function(xhr) {
    this.cXhr = xhr;
  };

  /**
   * Respond wrapper that checks security of the request.
   */
  Drupal.CTools.AJAX.success = function(data) {
    if (data !== null && !Drupal.CTools.AJAX.isAjaxResponseTrusted(this.cXhr, this.url)) {
      return this.error(this.cXhr);
    }
    Drupal.CTools.AJAX.respond(data);
  };

  Drupal.CTools.AJAX.isAjaxResponseTrusted = function(xhr, url) {
    return Drupal.settings.CToolsUrlIsAjaxTrusted[url] || (Drupal.CTools.AJAX.urlIsLocal(url) && xhr.getResponseHeader('X-Drupal-Ajax-Token') === '1');
  };

  /**
   * Event handler to submit an AJAX form.
   *
   * Using a secondary event ensures that our form submission is last, which
   * is needed when submitting wysiwyg controlled forms, for example.
   */
  Drupal.CTools.AJAX.ajaxSubmit = function (form, url) {
    var $form = $(form);

    if ($form.hasClass('ctools-ajaxing')) {
      return false;
    }

    $form.addClass('ctools-ajaxing');

    try {
      url = Drupal.CTools.AJAX.urlReplaceNojs(url);

      var ajaxOptions = {
        type: 'POST',
        url: url,
        data: { 'js': 1, 'ctools_ajax': 1},
        global: true,
        success: function(data) {
          Drupal.CTools.AJAX.success.apply(ajaxOptions, [data]);
        },
        beforeSend: function (xhr) {
          Drupal.CTools.AJAX.beforeSend.apply(ajaxOptions, [xhr]);
        },
        error: function(xhr) {
          Drupal.CTools.AJAX.handleErrors(xhr, url);
        },
        complete: function() {
          $('.ctools-ajaxing').removeClass('ctools-ajaxing');
          $('div.ctools-ajaxing-temporary').remove();
        },
        dataType: 'json'
      };

      // If the form requires uploads, use an iframe instead and add data to
      // the submit to support this and use the proper response.
      if ($form.attr('enctype') == 'multipart/form-data') {
        $form.append('<input type="hidden" name="ctools_multipart" value="1">');
        var ajaxIframeOptions = {
          success: function(data) {
            if (!Drupal.CTools.AJAX.isAjaxResponseTrusted(ajaxOptions.cXhr, url)) {
              return this.error(ajaxOptions.cXhr);
            }

            Drupal.CTools.AJAX.iFrameJsonRespond(data);
          },
          iframe: true
        };
        ajaxOptions = $.extend(ajaxOptions, ajaxIframeOptions);
      }

      $form.ajaxSubmit(ajaxOptions);
    }
    catch (err) {
      alert("An error occurred while attempting to process " + url);
      $('.ctools-ajaxing').removeClass('ctools-ajaxing');
      $('div.ctools-ajaxing-temporary').remove();
      return false;
    }
  };

  /**
   * Wrapper for handling JSON responses from an iframe submission
   */
  Drupal.CTools.AJAX.iFrameJsonRespond = function(data) {
    var myJson = eval(data);
    Drupal.CTools.AJAX.respond(myJson);
  };

  /**
   * Display error in a more fashion way
   */
  Drupal.CTools.AJAX.handleErrors = function(xhr, path) {
    var error_text = '';

    if ((xhr.status == 500 && xhr.responseText) || xhr.status == 200) {
      error_text = xhr.responseText;

      // Replace all &lt; and &gt; by < and >
      error_text = error_text.replace("/&(lt|gt);/g", function (m, p) {
        return (p == "lt")? "<" : ">";
      });

      // Now, replace all html tags by empty spaces
      error_text = error_text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi,"");

      // Fix end lines
      error_text = error_text.replace(/[\n]+\s+/g,"\n");
    }
    else if (xhr.status == 500) {
      error_text = xhr.status + ': ' + Drupal.t("Internal server error. Please see server or PHP logs for error information.");
    }
    else {
      error_text = xhr.status + ': ' + xhr.statusText;
    }

    alert(Drupal.t("An error occurred at @path.\n\nError Description: @error", {'@path': path, '@error': error_text}));
  };

  /**
   * Generic replacement for change handler to execute ajax method.
   */
  Drupal.CTools.AJAX.changeAJAX = function () {
    if ($(this).hasClass('ctools-ajaxing')) {
      return false;
    }

    var url = Drupal.CTools.AJAX.findURL(this);
    $(this).addClass('ctools-ajaxing');
    var $object = $(this);
    var form_id = $object.parents('form').get(0).id;
    try {
      if (url) {
        url = Drupal.sanitizeAjaxUrl(Drupal.CTools.AJAX.urlReplaceNojs(url));
        $.ajax({
          type: "POST",
          url: url,
          data: {'ctools_changed': $(this).val(), 'js': 1, 'ctools_ajax': 1 },
          global: true,
          success: Drupal.CTools.AJAX.success,
          beforeSend: Drupal.CTools.AJAX.beforeSend,
          error: function(xhr) {
            Drupal.CTools.AJAX.handleErrors(xhr, url);
          },
          complete: function() {
            $('.ctools-ajaxing').removeClass('ctools-ajaxing');
            if ($(object).hasClass('ctools-ajax-submit-onchange')) {
              $('form#' + form_id).submit();
            }
          },
          dataType: 'json',
          jsonp: false
        });
      }
      else {
        if ($object.hasClass('ctools-ajax-submit-onchange')) {
          $('form#' + form_id).submit();
        }
        return false;
      }
    }
    catch (err) {
      alert("An error occurred while attempting to process " + url);
      $('.ctools-ajaxing').removeClass('ctools-ajaxing');
      return false;
    }
    return false;
  };

  /**
   * Find a URL for an AJAX button.
   *
   * The URL for this gadget will be composed of the values of items by
   * taking the ID of this item and adding -url and looking for that
   * class. They need to be in the form in order since we will
   * concat them all together using '/'.
   */
  Drupal.CTools.AJAX.findURL = function(item) {
    var url = '';
    var url_class = '.' + $(item).attr('id') + '-url';
    $(url_class).each(
      function() {
        if (url && $(this).val()) {
          url += '/';
        }
        url += $(this).val();
      });
    return Drupal.CTools.AJAX.urlIsLocal(url) ? url : '/';
  };

  Drupal.CTools.AJAX.getPath = function (link) {
    if (!link) {
      return;
    }

    var index = link.indexOf('?');
    if (index != -1) {
      link = link.substr(0, index);
    }

    return link;
  };

  Drupal.CTools.AJAX.commands.prepend = function(data) {
    $(data.selector).prepend(data.data);
    Drupal.attachBehaviors($(data.selector));
  };

  Drupal.CTools.AJAX.commands.append = function(data) {
    $(data.selector).append(data.data);
    Drupal.attachBehaviors($(data.selector));
  };

  Drupal.CTools.AJAX.commands.replace = function(data) {
    $(data.selector).replaceWith(data.data);
    Drupal.attachBehaviors($(data.selector));
  };

  Drupal.CTools.AJAX.commands.after = function(data) {
    var object = $(data.data);
    $(data.selector).after(object);
    Drupal.attachBehaviors(object);
  };

  Drupal.CTools.AJAX.commands.before = function(data) {
    var object = $(data.data);
    $(data.selector).before(object);
    Drupal.attachBehaviors(object);
  };

  Drupal.CTools.AJAX.commands.html = function(data) {
    $(data.selector).html(data.data);
    Drupal.attachBehaviors($(data.selector));
  };

  Drupal.CTools.AJAX.commands.remove = function(data) {
    $(data.selector).remove();
  };

  Drupal.CTools.AJAX.commands.changed = function(data) {
    if (!$(data.selector).hasClass('changed')) {
      $(data.selector).addClass('changed');
      if (data.star) {
        $(data.selector).find(data.star).append(' <span class="star">*</span> ');
      }
    }
  };

  Drupal.CTools.AJAX.commands.alert = function(data) {
    alert(data.text, data.title);
  };

  Drupal.CTools.AJAX.commands.css = function(data) {
  /*
    if (data.selector && data.selector.contains('* html ')) {
      // This indicates an IE hack and we should only do it if we are IE.
      if (!jQuery.browser.msie) {
        return;
      }
      data.selector = data.selector.replace('* html ', '');
    }
  */
    $(data.selector).css(data.argument);
  };

  Drupal.CTools.AJAX.commands.css_files = function(data) {
    // Build a list of css files already loaded:
    $('link:not(.ctools-temporary-css)').each(function () {
      if ($(this).attr('type') == 'text/css') {
        var href = $(this).attr('href');
        var link = Drupal.CTools.AJAX.getPath(href);
        if (link && Drupal.CTools.AJAX.urlIsLocal(href)) {
          Drupal.CTools.AJAX.css[link] = href;
        }
      }
    });

    var html = '';
    for (var i = 0; i < data.argument.length; i++) {
      var link = Drupal.CTools.AJAX.getPath(data.argument[i].file);
      if (!Drupal.CTools.AJAX.css[link]) {
        html += '<link class="ctools-temporary-css" type="text/css" rel="stylesheet" media="' + data.argument[i].media +
          '" href="' + data.argument[i].file + '" />';
      }
    }

    if (html) {
      $('link.ctools-temporary-css').remove();
      $('body').append($(html));
    }
  };

  Drupal.CTools.AJAX.commands.settings = function(data) {
    $.extend(Drupal.settings, data.argument);
  };

  Drupal.CTools.AJAX.commands.scripts = function(data) {
    // Build a list of scripts already loaded:
    $('script').each(function () {
      var link = Drupal.CTools.AJAX.getPath($(this).attr('src'));
      if (link) {
        Drupal.CTools.AJAX.scripts[link] = $(this).attr('src');
      }
    });

    var html = '',
        head = document.getElementsByTagName('head')[0];
    for (var i = 0; i < data.argument.length; i++) {
      var link = Drupal.CTools.AJAX.getPath(data.argument[i]);
      if (!Drupal.CTools.AJAX.scripts[link]) {
        Drupal.CTools.AJAX.scripts[link] = link;
        // Use this to actually get the script tag into the dom, which is
        // needed for scripts that self-reference to determine paths.
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = data.argument[i];
        head.appendChild(script);
        html += '<script type="text/javascript" src="' + data.argument[i] + '"></script>';
      }
    }

    if (html) {
      $('body').append($(html));
    }
  };

  Drupal.CTools.AJAX.commands.data = function(data) {
    $(data.selector).data(data.name, data.value);
  };

  Drupal.CTools.AJAX.commands.attr = function(data) {
    $(data.selector).attr(data.name, data.value);
  };

  Drupal.CTools.AJAX.commands.restripe = function(data) {
    // :even and :odd are reversed because jquery counts from 0 and
    // we count from 1, so we're out of sync.
    $('tbody tr:not(:hidden)', $(data.selector))
      .removeClass('even')
      .removeClass('odd')
      .filter(':even')
        .addClass('odd')
      .end()
      .filter(':odd')
        .addClass('even');
  };

  Drupal.CTools.AJAX.commands.redirect = function(data) {
    if (data.delay > 0) {
      setTimeout(function () {
        if (data.new_window) {
          window.open(data.url, '_blank');
        }
        else {
          location.href = data.url;
        }
      }, data.delay);
    }
    else if (data.new_window) {
      window.open(data.url, '_blank');
    }
    else {
      location.href = data.url;
    }
  };

  Drupal.CTools.AJAX.commands.reload = function(data) {
    location.reload();
  };

  Drupal.CTools.AJAX.commands.submit = function(data) {
    $(data.selector).submit();
  };

  /**
   * Replacing 'nojs' with 'ajax' in the URL allows for an easy method to let
   * the server detect when it needs to degrade gracefully.
   * There are five scenarios to check for:
   * 1. /nojs/
   * 2. /nojs$ - The end of a URL string.
   * 3. /nojs? - Followed by a query (with clean URLs enabled).
   *      E.g.: path/nojs?destination=foobar
   * 4. /nojs& - Followed by a query (without clean URLs enabled).
   *      E.g.: ?q=path/nojs&destination=foobar
   * 5. /nojs# - Followed by a fragment.
   *      E.g.: path/nojs#myfragment
   */
  Drupal.CTools.AJAX.urlReplaceNojs = function(url) {
    var new_url = url.replace(/\/nojs(\/|$|\?|&|#)/g, '/ajax$1');

    // If the 'nojs' version of the URL is trusted, also trust the 'ajax'
    // version.
    if (Drupal.settings.CToolsUrlIsAjaxTrusted[url]) {
      Drupal.settings.CToolsUrlIsAjaxTrusted[new_url] = true;
    }
    return new_url;
  };

  /**
  * Returns the passed in URL as an absolute URL.
  *
  * @param url
  *   The URL string to be normalized to an absolute URL.
  *
  * @return
  *   The normalized, absolute URL.
   *
   * @see https://github.com/angular/angular.js/blob/v1.4.4/src/ng/urlUtils.js
   * @see https://grack.com/blog/2009/11/17/absolutizing-url-in-javascript
   * @see https://github.com/jquery/jquery-ui/blob/1.11.4/ui/tabs.js#L53
  */
  Drupal.CTools.AJAX.absoluteUrl = function (url) {
    var urlParsingNode = document.createElement('a');

    // Decode the URL first; this is required by IE <= 6. Decoding non-UTF-8
    // strings may throw an exception.
    try {
      url = decodeURIComponent(url);
    } catch (e) {}

    urlParsingNode.setAttribute('href', url);

    // IE <= 7 normalizes the URL when assigned to the anchor node similar to
    // the other browsers.
    return urlParsingNode.cloneNode(false).href;
  };

  /**
   * Returns true if the URL is within Drupal's base path.
   *
   * @param url
   *   The URL string to be tested.
   *
   * @return
   *   Boolean true if local, or false if the url may be external or have a scheme.
   *
   * @see https://github.com/jquery/jquery-ui/blob/1.11.4/ui/tabs.js#L58
   */
  Drupal.CTools.AJAX.urlIsLocal = function (url) {
    // Always use browser-derived absolute URLs in the comparison, to avoid
    // attempts to break out of the base path using directory traversal.
    var absoluteUrl = Drupal.CTools.AJAX.absoluteUrl(url);

    var protocol = location.protocol;

    // Consider URLs that match this site's base URL but use HTTPS instead of HTTP
    // as local as well.
    if (protocol === 'http:' && absoluteUrl.indexOf('https:') === 0) {
      protocol = 'https:';
    }
    var baseUrl = protocol + '//' + location.host + Drupal.settings.basePath.slice(0, -1);

    // Decoding non-UTF-8 strings may throw an exception.
    try {
      absoluteUrl = decodeURIComponent(absoluteUrl);
    } catch (e) {}
    try {
      baseUrl = decodeURIComponent(baseUrl);
    } catch (e) {}

    // The given URL matches the site's base URL, or has a path under the site's
    // base URL.
    return absoluteUrl === baseUrl || absoluteUrl.indexOf(baseUrl + '/') === 0;
  };

  /**
   * Bind links that will open modals to the appropriate function.
   */
  Drupal.behaviors.CToolsAJAX = function(context) {
    // Bind links

    // Note that doing so in this order means that the two classes can be
    // used together safely.
    $('a.ctools-use-ajax-cache:not(.ctools-use-ajax-processed)', context)
      .addClass('ctools-use-ajax-processed')
      .click(Drupal.CTools.AJAX.clickAJAXCacheLink)
      .each(function () {
        Drupal.CTools.AJAX.warmCache.apply(this);
      });

    $('a.ctools-use-ajax:not(.ctools-use-ajax-processed)', context)
      .addClass('ctools-use-ajax-processed')
      .click(Drupal.CTools.AJAX.clickAJAXLink);


    // Bind buttons
    $('input.ctools-use-ajax:not(.ctools-use-ajax-processed), button.ctools-use-ajax:not(.ctools-use-ajax-processed)', context)
      .addClass('ctools-use-ajax-processed')
      .click(Drupal.CTools.AJAX.clickAJAXButton);

    // Bind select
    $('select, input:text, input:radio, input:checkbox', context)
       .filter('.ctools-use-ajax-onchange:not(.ctools-use-ajax-processed)')
       .addClass('ctools-use-ajax-processed')
       .change(Drupal.CTools.AJAX.changeAJAX);

    // Add information about loaded CSS and JS files.
    if (Drupal.settings.CToolsAJAX && Drupal.settings.CToolsAJAX.css) {
      $.extend(Drupal.CTools.AJAX.css, Drupal.settings.CToolsAJAX.css);
    }
    if (Drupal.settings.CToolsAJAX && Drupal.settings.CToolsAJAX.scripts) {
      $.extend(Drupal.CTools.AJAX.scripts, Drupal.settings.CToolsAJAX.scripts);
    }
  };
})(jQuery);
