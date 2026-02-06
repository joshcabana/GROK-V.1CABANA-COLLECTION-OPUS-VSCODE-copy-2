const CACHE_NAME = 'cabana-app-v1'
const OFFLINE_URL = '/offline.html'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll([OFFLINE_URL]))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.map((key) => (key === CACHE_NAME ? Promise.resolve() : caches.delete(key))))
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.mode !== 'navigate') return

  event.respondWith(fetch(req).catch(() => caches.match(OFFLINE_URL)))
})
