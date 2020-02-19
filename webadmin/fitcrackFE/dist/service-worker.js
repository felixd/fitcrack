"use strict";var precacheConfig=[["index.html","478a0cee7e5dc18a9cb47c02ecfbbd18"],["service-worker.js","abe4a1216991f307dc4c0e2022997aeb"],["static/configuration.js","9cec3b516ef4631f7d3af53e7bfb34fa"],["static/css/app.b7b8b076c880fd046c9c97b9b5bb0d8e.css","d09cabfd238f5382ef5c53dfe985b61b"],["static/js/0.ab32c4ba3c58715df60c.js","a7ce391ab13328433a5db6e620946615"],["static/js/1.56ddaff4e8fdb8444c43.js","c707484421d8aa15b8b497b4040581ac"],["static/js/10.b2a417cc8b297460154f.js","de5198568d4395ba49c62c1482b5e587"],["static/js/11.bb79d0fe28023bf1f50e.js","fb1c563bd5ac5c5b28d328fd1d368776"],["static/js/12.7fec882c76b767d23126.js","8b7222d8af3268554f0b071d0ea5cf1a"],["static/js/13.b550e74504e4ed9463e2.js","21dd18ad22c2294a0137a40ba8856a3f"],["static/js/14.4bb51dceaffb1db89c03.js","9ef56b3a5e7d310a7d7def4a7579d8dd"],["static/js/15.5791ba59e677792c0952.js","e466199823a69a4d5fb157395e5e3652"],["static/js/16.2dd4d790d781704627a7.js","a7d0ed55bf6ffb4c9823c22acd30d4cc"],["static/js/17.83cfbd200171c0feba54.js","7f64173abe3b420f3cc09fe1edbcf5e1"],["static/js/18.3f9142ec509a60bc2b27.js","aa0af732d2ea62c9df41cc2ac478f6ef"],["static/js/19.2dbddb486fa0bf11ffbd.js","bee70588485c8854416741dee12c2009"],["static/js/2.af42982de753c8994be7.js","a3e7298d71edf14fcf357d3a8ededb24"],["static/js/20.8440744afe3cbc15aac5.js","5829645146ae5d1ca6e1494a0adb3183"],["static/js/21.afd178fea0d13d3a2fb6.js","294a56536c5d371ece475ed8998aa4a0"],["static/js/22.5ffd12de96ef41d1b04b.js","77ed38b9fff1cde0cbae1224ef8bac1e"],["static/js/23.42d443489cf5bc79222f.js","a5f105f0f0a3860e39e6596a55306676"],["static/js/24.5078100662c87dac7b87.js","d11d6e7d1df3e8b556c137897baa62e4"],["static/js/25.99c3a3a57a4cc95db9dc.js","e35ca416fd8f54f5976156af0ad3b206"],["static/js/26.db5a64080b27b499bcdd.js","0fcc0dc1c834636fdffba542b7e56c24"],["static/js/3.b76aad58c7c23347d114.js","374bb28ffa3241394a45029cb853f424"],["static/js/4.446721d5faad0a2dde59.js","5a49a00c470649de7463da1b4332ae90"],["static/js/5.c12d386479dd29480aa3.js","fb89e85ba636bc3cb7141b24715232e3"],["static/js/6.126d6681f1dd2997c1bd.js","bc75e3fe9456b919af3edccb5827e8c1"],["static/js/7.3dc1f395921879057b71.js","4b391fe28ade20dad522ea9f38deb51c"],["static/js/8.2650858e20ce284831da.js","b729db97bc071d7e673c4edef14d8015"],["static/js/9.eb002114a8fb063ac7c0.js","c6ce179eb4205272cb9b722d24059d86"],["static/js/app.9b81d228342d46d46d4d.js","ca02f6fe1cd2b6f197da4edd75da6563"],["static/js/manifest.1bc8c7441c1e9b65fb91.js","010b4706f14c3ee67eaab74af5d13950"],["static/js/vendor.a77abcf1aeb8e9b8f28d.js","83add6bf6b40b92e54655325d6f3a90c"]],cacheName="sw-precache-v3-Fitcrack-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=a),c.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,c,t){var s=new URL(e);return t&&s.pathname.match(t)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(c)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var c=new URL(a).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,a){var c=new URL(e);return c.hash="",c.search=c.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),c.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],c=e[1],t=new URL(a,self.location),s=createCacheKey(t,hashParamName,c,!1);return[t.toString(),s]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(c){if(!a.has(c)){var t=new Request(c,{credentials:"same-origin"});return fetch(t).then(function(a){if(!a.ok)throw new Error("Request for "+c+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(c,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(c){return Promise.all(c.map(function(c){if(!a.has(c.url))return e.delete(c)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,c=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(c))||(c=addDirectoryIndex(c,"index.html"),a=urlsToCacheKeys.has(c));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});