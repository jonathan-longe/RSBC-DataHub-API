importScripts("/precache-manifest.93629af7f6581cd3d45b60122f33ad7b.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("message", msg => {
    if (msg.data.action === 'SKIP_WAITING') self.skipWaiting();
})

const CACHE_NAME = 'roadsafety-digital-forms';

self.addEventListener('fetch',event=> {
    console.log('caching: ' + event.request.url )
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    );
});

