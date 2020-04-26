"use strict";var precacheConfig=[["index.html","e36b396be3eaef5064f20dbb608f9b97"],["service-worker.js","fa58882bf9145e7f17a90064ac30d27a"],["static/configuration.js","85d6dda12c88391e482c20da4a6ba342"],["static/css/app.acd1d18be224bbf4086c4b9d6fec57de.css","1adba5beb534d6e1507b0f2fdcd703b5"],["static/js/0.40167375fc0a00cb7691.js","8e23b42c8b796b8a0654b29559a79223"],["static/js/1.1cc619d8cedb7babf2bf.js","7cb3822f2f05dc6c5234b9eb90257ce8"],["static/js/10.51924b2d17a5e628d9b0.js","4401f4cbe47b4c25165cfe35667db88c"],["static/js/11.c4fa64c439cd50cbf44a.js","d4352c4037211bc4d4b682388244e735"],["static/js/12.1071c6a64217b1fd561c.js","e3ade61f0590ed3d08bcc19c632636a0"],["static/js/13.1e1c9822db216912ef69.js","3b0fdfc3a804a7b0d0bdb6eb8fd6efc8"],["static/js/14.08ad2762c197960cd216.js","c5a62f085d44dc6063eaf41972b6cac2"],["static/js/15.bab204d894f5b64b86de.js","68a2482d93a74725c742a55132be2546"],["static/js/16.310e2f9be71dc1bf7e5a.js","b8de286ef2b4d68fb5f9e13ab68b9df0"],["static/js/17.c6953f183933874cd0bd.js","1bd21f2c0a0dcd9481c11e9fb49af110"],["static/js/18.6201f1122d86fbe24977.js","35d89278120d98a25fded5a97597c235"],["static/js/19.7f23b73b00ad7160a82e.js","1b0c5e860f03d49dfff67ccf7d9edf63"],["static/js/2.2fa7fbfb960f9a435c74.js","a38efb82cafc5373f5578f596dd3dfef"],["static/js/20.40b260dab51bd8787725.js","c37bd728ba8b5a2147b7059a3656b8ee"],["static/js/21.6c1febd7f510c745037f.js","30577c322f3e24be897d0237d9fcad90"],["static/js/22.3477677606e0323a4d37.js","a26bdd1560839861ea2aeddc0cb62b22"],["static/js/23.adc1046e47c55c75110c.js","1ae389d84619a9ad7a7820a0f8154f99"],["static/js/24.4034b02d5314d0bbdd7a.js","d62d7c1d4ffc8e5c7abd9182df87043d"],["static/js/25.caaf4bb5293d9a40275a.js","cb3662cd6fa67dd17c35eed8327b51d3"],["static/js/26.e5961328c7e59fe901f6.js","80202ff7aa98909f72ccf001303d3b9f"],["static/js/27.48956461beddd608f0dd.js","4cbb088910a59baae1eabbe19b62a1b7"],["static/js/3.cab460b1de63b9df12b3.js","15d86936a46ff98e89702a3898af7e54"],["static/js/4.bc996881f8951a50d3fc.js","706e409ea2873ac6a3e07eaacaf3d0af"],["static/js/5.a38580a48afed451cf8b.js","8a55dd6d5d0299cb5caa9317ba260231"],["static/js/6.1bd4fba08cc3b43c290c.js","73087e413c6f1576fee17dfd1ded6f0e"],["static/js/7.90294954d9daf4dd5fa6.js","ff69220ef062ec7b7ab4926401a4b9f0"],["static/js/8.d8e10f4c9196ef0d98c3.js","ddf5c636ad247856f095ad053368ce7a"],["static/js/9.d46d5b545c42fcc3693d.js","ab71a5d933c2207e20ca67063f271e39"],["static/js/app.7ffd61cb91d89d246780.js","1b00c6e13895b96f91be854513447d7b"],["static/js/manifest.57a6597ebe179fdef815.js","66757b1fc80acbbb0979ebb06af2fae7"],["static/js/vendor.1ae1fb58bfa08f00eccc.js","864a9bd15696cbb9bb39aaac8708d994"]],cacheName="sw-precache-v3-Fitcrack-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=a),c.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,c,t){var s=new URL(e);return t&&s.pathname.match(t)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(c)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var c=new URL(a).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,a){var c=new URL(e);return c.hash="",c.search=c.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),c.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],c=e[1],t=new URL(a,self.location),s=createCacheKey(t,hashParamName,c,!1);return[t.toString(),s]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(c){if(!a.has(c)){var t=new Request(c,{credentials:"same-origin"});return fetch(t).then(function(a){if(!a.ok)throw new Error("Request for "+c+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(c,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(c){return Promise.all(c.map(function(c){if(!a.has(c.url))return e.delete(c)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,c=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(c))||(c=addDirectoryIndex(c,"index.html"),a=urlsToCacheKeys.has(c));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});