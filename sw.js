// STIKMANIA Service Worker v1.0
const CACHE_NAME = 'stikmania-v1';
const OFFLINE_URL = '/offline.html';

// Archivos para cachear (página principal + recursos críticos)
const urlsToCache = [
  '/',
  '/index.html',
  '/stickers.html',
  '/branding.html',
  '/web.html',
  '/terminos.html',
  '/privacidad.html',
  '/blog-stickers.html',
  '/blog-branding.html',
  '/blog-web.html',
  '/manifest.json',
  '/config.json',
  '/images/favicon.png',
  '/images/logo.png'
];

// INSTALACIÓN - Cachear archivos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos cacheados');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Error cacheando:', error);
      })
  );
  // Activar inmediatamente el nuevo service worker
  self.skipWaiting();
});

// ACTIVACIÓN - Limpiar cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Tomar control inmediatamente
  self.clients.claim();
});

// FETCH - Estrategia: Cache First, luego Network
self.addEventListener('fetch', event => {
  // Ignorar solicitudes que no sean GET
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Ignorar URLs externas (WhatsApp, Instagram, etc.)
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Devolver desde caché
          return cachedResponse;
        }
        
        // Si no está en caché, intentar red
        return fetch(event.request)
          .then(response => {
            // Si la respuesta es válida, guardar en caché
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar la respuesta para guardar en caché
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Si falla todo, mostrar página offline
            return caches.match(OFFLINE_URL);
          });
      })
  );
});

// NOTIFICACIONES PUSH (Opcional - Para futuras notificaciones)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización de STIKMANIA',
    icon: '/images/favicon.png',
    badge: '/images/favicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver ahora',
        icon: '/images/favicon.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/images/favicon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('STIKMANIA', options)
  );
});

// CLICK EN NOTIFICACIÓN
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});