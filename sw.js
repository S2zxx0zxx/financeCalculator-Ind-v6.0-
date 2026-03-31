// FinCalc India — Service Worker
// Provides offline support via Cache-First strategy for static assets
// and Network-First strategy for HTML pages.

const CACHE_NAME = 'fincalc-v1';

// Core shell files to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// ── Install: pre-cache core shell ──────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// ── Activate: remove old caches ────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Helper: write a response clone into the cache, ignoring write failures.
function cacheResponse(request, response) {
  caches.open(CACHE_NAME)
    .then((cache) => cache.put(request, response))
    .catch(() => { /* cache write failure is non-fatal */ });
}

// ── Fetch: serve from cache, fall back to network ──────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // Navigation requests (HTML pages): Network-First
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the fresh response for offline use
          cacheResponse(request, response.clone());
          return response;
        })
        .catch(() =>
          caches.match(request)
            .then((cached) => cached || caches.match('/index.html'))
            .catch(() => caches.match('/index.html'))
        )
    );
    return;
  }

  // Static assets: Cache-First
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        // Only cache successful same-origin responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        cacheResponse(request, response.clone());
        return response;
      });
    })
  );
});
