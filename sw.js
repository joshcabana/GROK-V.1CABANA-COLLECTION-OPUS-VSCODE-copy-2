// sw.js - Service Worker for CABANA
const CACHE_NAME = 'cabana-v7';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/performance-optimizer.js',
  '/assets/Images/CABANA-MODEL-BOXERS-FRONT.png',
  '/assets/Images/CABANA-WOMEN.PNG',
  '/offline.html',
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.log('Cache installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event with runtime caching for images (avoid caching heavy videos)
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Check if the request is for an image (skip mp4/mov to reduce storage/bandwidth)
  if (
    requestUrl.pathname.startsWith('/assets/Images/') &&
    (event.request.url.endsWith('.png') ||
      event.request.url.endsWith('.jpg') ||
      event.request.url.endsWith('.jpeg') ||
      event.request.url.endsWith('.webp') ||
      event.request.url.endsWith('.svg'))
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          return (
            response ||
            fetch(event.request).then((networkResponse) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
          );
        });
      })
    );
  } else {
    // Existing cache-first strategy for other assets
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((networkResponse) => {
            // Optionally cache other resources here
            return networkResponse;
          })
        );
      })
    );
  }
});
