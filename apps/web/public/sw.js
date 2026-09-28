const VERSION = "2026-09-28-a";
const CACHE_NAME = `fincalc-v7-${VERSION}`;
const CACHE_PREFIX = "fincalc-v7-";
const OFFLINE_URL = "/offline.html";
const PRECACHE = [
  "/",
  "/manifest.webmanifest",
  OFFLINE_URL,
  "/calculators/emi",
  "/calculators/sip",
  "/calculators/tax",
  "/calculators/gst",
  "/calculators/fd",
  "/calculators/rd",
  "/calculators/retirement",
  "/calculators/inflation",
  "/calculators/eligibility",
  "/calculators/rentvsbuy",
  "/calculators/cibil",
  "/learn",
  "/activity",
  "/compare"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(PRECACHE.map(url => cache.add(url).catch(() => undefined)))
    )
  );
});

self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)))
      ),
      self.clients.claim()
    ])
  );
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone()).catch(() => undefined);
    }
    return response;
  } catch {
    return (await caches.match(request)) || (await caches.match("/")) || (await caches.match(OFFLINE_URL));
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok && response.type === "basic") {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone()).catch(() => undefined);
  }
  return response;
}

self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || request.method !== "GET") return;
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }
  event.respondWith(cacheFirst(request));
});
