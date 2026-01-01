const CACHE_NAME = 'way-to-diliara-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
];

// Kurulum: Dosyaları önbelleğe al
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch: İnternetten veya önbellekten veri çek
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Önbellekte varsa oradan ver, yoksa internetten çek
      return response || fetch(e.request).then((fetchRes) => {
        return caches.open(CACHE_NAME).then((cache) => {
          // Yeni çekilen resimleri de hafızaya at (Imgur vb.)
          cache.put(e.request, fetchRes.clone());
          return fetchRes;
        });
      });
    })
  );
});