const CACHE_NAME = 'planner-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
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
