const CACHE_NAME = 'cryptoinsight-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

/* Installation - Cache resources */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache).catch(error => {
        console.log('Cache addAll error:', error);
      });
    })
  );
  self.skipWaiting();
});

/* Activation - Clean up old caches */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

/* Fetch - Network first, fallback to cache */
self.addEventListener('fetch', event => {
  const { request } = event;

  /* Skip non-GET requests */
  if (request.method !== 'GET') {
    return;
  }

  /* API requests - Network first */
  if (request.url.includes('api.coingecko.com') || request.url.includes('huggingface.co')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then(response => {
            return response || new Response('Offline - data unavailable', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain',
              }),
            });
          });
        })
    );
    return;
  }

  /* Static assets - Cache first */
  event.respondWith(
    caches.match(request).then(response => {
      if (response) {
        return response;
      }
      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseToCache);
        });
        return response;
      });
    })
  );
});

/* Handle background sync for offline actions */
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      fetch('/api/sync', {
        method: 'POST',
      }).catch(() => {
        console.log('Sync failed, will retry later');
      })
    );
  }
});

/* Handle push notifications */
self.addEventListener('push', event => {
  if (!event.data) return;

  const options = {
    body: event.data.text(),
    icon: '/icon-192.png',
    badge: '/icon-96.png',
    tag: 'cryptoinsight-notification',
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification('CryptoInsight', options)
  );
});

/* Handle notification clicks */
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
