const CACHE_NAME = 'math-hero-squad-v45';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './favicon.svg',
  './manifest.json',
  './fonts/orbitron.woff2',
  './fonts/outfit.woff2',
  './audio/dash-volt-strike.mp3',
  './audio/titan-shock-wave.mp3',
  './audio/aero-whirlwind.mp3',
  './audio/intro.mp3',
  './audio/wrong-answer.mp3',
  './audio/level-mastered.mp3',
  './audio/level-failed.mp3'
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

  // Handle Range Requests (specifically for audio/video files)
  const rangeHeader = event.request.headers.get('range');
  if (rangeHeader) {
    event.respondWith(handleRangeRequest(event.request));
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

// Helper to handle Range Requests for cached assets (like media/audio)
async function handleRangeRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (!cachedResponse) {
    return fetch(request);
  }

  try {
    const arrayBuffer = await cachedResponse.arrayBuffer();
    const rangeHeader = request.headers.get('range');
    const bytes = rangeHeader.replace('bytes=', '').split('-');
    const start = parseInt(bytes[0], 10);
    const end = bytes[1] ? parseInt(bytes[1], 10) : arrayBuffer.byteLength - 1;

    const chunk = arrayBuffer.slice(start, end + 1);

    return new Response(chunk, {
      status: 206,
      statusText: 'Partial Content',
      headers: {
        'Content-Range': `bytes ${start}-${end}/${arrayBuffer.byteLength}`,
        'Content-Length': chunk.byteLength,
        'Content-Type': cachedResponse.headers.get('content-type') || 'audio/mpeg',
        'Accept-Ranges': 'bytes',
      },
    });
  } catch (err) {
    console.error('[Service Worker] Error slicing range buffer:', err);
    return fetch(request);
  }
}

