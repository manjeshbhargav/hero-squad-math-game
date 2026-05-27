const CACHE_NAME = 'math-hero-squad-v19';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './favicon.svg',
  './manifest.json'
];

// Install event: cache initial shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching offline shell');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Network-first for HTML/navigation requests, Cache-first for static assets
self.addEventListener('fetch', (event) => {
  // Only handle HTTP/HTTPS requests (bypass chrome-extension://, data://, etc.)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Always Network-First for HTML/navigation requests (index.html, root path, etc.)
  const isHtml = event.request.mode === 'navigate' || 
                 event.request.url.endsWith('/') || 
                 event.request.url.endsWith('/index.html') || 
                 event.request.url.includes('/index.html');

  if (isHtml) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch((err) => {
          console.log('[Service Worker] Fetch failed, falling back to cache for HTML:', err);
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return caches.match('./index.html');
          });
        })
    );
    return;
  }

  // Cache-First with Network fallback for static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached asset immediately
        return cachedResponse;
      }

      // Otherwise fetch from network and cache the result
      return fetch(event.request).then((response) => {
        // Don't cache invalid responses or external resources
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch((err) => {
        console.error('[Service Worker] Fetch failed offline:', err);
      });
    })
  );
});
