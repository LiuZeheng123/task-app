const CACHE_NAME = 'daily-planner-v1';
const ASSETS = [
  '/task-app/',
  '/task-app/index.html',
  '/task-app/manifest.json',
  '/task-app/icon.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});
