self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                '/myRepair/',
                '/myRepair/index.html',
                '/myRepair/custom.css',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css',
                'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
