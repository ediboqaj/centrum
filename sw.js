const CACHE_NAME = 'centrum-v2';

const PRECACHE_ASSETS = [
    // Root images
    'assets/Logo.png',
    'assets/64601059.jpg',
    'assets/477010432.jpg',
    'assets/DSC00035.jpg',
    'assets/DSC09338.jpg',
    'assets/suite.png',
    'assets/double room.png',
    'assets/family room.png',
    'assets/triple room.png',
    'assets/twin room.png',
    'assets/quadruple room.png',
    // Suite
    'assets/Suite/DSC08732.jpg',
    'assets/Suite/DSC08737.jpg',
    'assets/Suite/DSC08744.jpg',
    'assets/Suite/DSC08747.jpg',
    'assets/Suite/DSC08754.jpg',
    'assets/Suite/DSC08757.jpg',
    'assets/Suite/DSC08762.jpg',
    'assets/Suite/DSC08767.jpg',
    'assets/Suite/DSC08772.jpg',
    'assets/Suite/DSC08777.jpg',
    'assets/Suite/DSC08784.jpg',
    // Double Room
    'assets/Double Room/DSC08679.jpg',
    'assets/Double Room/DSC08829.jpg',
    'assets/Double Room/DSC08834.jpg',
    // Double Room with Jacuzzi
    'assets/Double Room with Jacuzzi/DSC08528.jpg',
    'assets/Double Room with Jacuzzi/DSC08534.jpg',
    'assets/Double Room with Jacuzzi/DSC08536.jpg',
    'assets/Double Room with Jacuzzi/DSC08548.jpg',
    'assets/Double Room with Jacuzzi/DSC08558.jpg',
    'assets/Double Room with Jacuzzi/DSC08570.jpg',
    // Family Room
    'assets/Family Room/DSC08602.jpg',
    'assets/Family Room/DSC08607.jpg',
    'assets/Family Room/DSC08617.jpg',
    'assets/Family Room/DSC08622.jpg',
    'assets/Family Room/DSC08627.jpg',
    'assets/Family Room/DSC08630.jpg',
    'assets/Family Room/DSC08635.jpg',
    'assets/Family Room/DSC08642.jpg',
    'assets/Family Room/DSC08649.jpg',
    'assets/Family Room/DSC08659.jpg',
    'assets/Family Room/DSC08664.jpg',
    'assets/Family Room/DSC08667.jpg',
    'assets/Family Room/DSC08672.jpg',
    // Triple Room
    'assets/Triple Room/DSC08575.jpg',
    'assets/Triple Room/DSC08585.jpg',
    'assets/Triple Room/DSC08593.jpg',
    'assets/Triple Room/DSC08692.jpg',
    'assets/Triple Room/DSC08697.jpg',
    'assets/Triple Room/DSC08705.jpg',
    'assets/Triple Room/DSC08710.jpg',
    // Twin Room
    'assets/Twin Room/DSC08847.jpg',
    'assets/Twin Room/DSC08853.jpg',
    // Quadruple Room
    'assets/Quadruple Room/DSC08805.jpg',
    'assets/Quadruple Room/DSC08814.jpg',
    'assets/Quadruple Room/DSC08817.jpg'
];

// Install: pre-cache all images
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, { cache: 'reload' })));
        }).then(() => self.skipWaiting())
    );
});

// Activate: remove old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch: cache-first for images, network-first for everything else
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Only handle same-origin requests
    if (url.origin !== self.location.origin) return;

    const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.pathname);

    if (isImage) {
        // Cache-first strategy for images
        event.respondWith(
            caches.match(event.request).then(cached => {
                if (cached) return cached;
                return fetch(event.request).then(response => {
                    if (!response || response.status !== 200) return response;
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                });
            })
        );
    } else {
        // Network-first for HTML, CSS, JS
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
    }
});
