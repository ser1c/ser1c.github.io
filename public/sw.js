const CACHE_NAME = 'sabin-website-v1';
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/styles/global.css',
  '/styles/nepal-theme.css',
  '/styles/theme-modes.css',
  '/fonts/LinuxLibertine_Regular.woff',
  '/fonts/LinuxLibertine_Bold.woff',
  '/fonts/LinuxLibertine_Italic.woff',
  '/fonts/LinuxLibertine_BoldItalic.woff',
  '/images/nepal-flag-mini.png',
  '/images/mountain-silhouette.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Clone the request because it can only be used once
        const fetchRequest = event.request.clone();

        // Make network request and cache the response
        return fetch(fetchRequest).then(response => {
          // Check if response is valid
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response because it can only be used once
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              // Cache only successful responses
              if (event.request.method === 'GET') {
                cache.put(event.request, responseToCache);
              }
            });

          return response;
        });
      })
  );
});