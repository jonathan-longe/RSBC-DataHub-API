importScripts("/precache-manifest.d4f24cdd193ba77d0a8e55866d83f07f.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");



self.addEventListener("message", msg => {
    if (msg.data.action === 'SKIP_WAITING') self.skipWaiting();
})


// Remove all service workers
self.addEventListener("activate", function() {
    self.registration.unregister()
        .then(function() {
            return self.clients.matchAll(); })
        .then(function(clients) {
            clients.forEach(client => client.navigate(client.url));
        });
});

