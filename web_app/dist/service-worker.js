importScripts("/precache-manifest.415c38c1e40457c0fddb0ce5d3fa3c99.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("message", msg => {
    if (msg.data.action === 'SKIP_WAITING') self.skipWaiting();
})

const CACHE_NAME = 'roadsafety-digital-forms-' + "0.0.63";

self.addEventListener('fetch',event=> {
    console.log('caching fetch request: ', event.request.url, event.request.method )
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    );
});

// self.addEventListener('activate', event => {
//   console.log('Activating new service worker...');
//
//   const cacheAllowlist = [CACHE_NAME];
//
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheAllowlist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener( "install", function( event ){
//     event.waitUntil(
//         caches.open( CACHE_NAME + "-public-assets")
//               .then(function( cache ){
//             return cache.addAll([
//                 "/public/assets/MV2634_102018_notice.png",
//                 "/public/assets/MV2634_102018_report.png",
//                 "/public/assets/MV2906_102018_notice.png"
//             ]);
//         })
//     );
// });

