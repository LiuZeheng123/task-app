const CACHE_NAME = 'planner-fixed-v1';
// 使用绝对路径，避免 GitHub Pages 子目录解析错误
const ASSETS = [
  '/task-app/',
  '/task-app/index.html',
  '/task-app/manifest.json',
  '/task-app/icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // 加 catch 防止单个文件 404 导致整个 SW 崩溃
      return cache.addAll(ASSETS).catch(err => {
        console.warn('部分资源缓存失败，但不影响安装:', err);
      });
    })
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
