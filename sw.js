// STIKMANIA - Service Worker v3
// Network First para HTML | Cache First para assets
const CACHE_NAME = 'stikmania-unified-v3';

// Solo assets estáticos en caché (el HTML siempre se busca fresco)
const urlsToCache = [
  '/assets/css/global.css',
  '/assets/js/main.js',
  '/assets/js/recent-purchase.js',
  '/assets/js/calculator.js',
  '/manifest.json',
  '/config.json',
  '/images/favicon.png',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/logoW.png',
  '/images/var_malva.jpg'
];

// 1. INSTALACIÓN
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('[SW v3] Cacheando assets');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.log('[SW v3] Error al cachear:', error);
      })
  );
  self.skipWaiting();
});

// 2. ACTIVACIÓN - Elimina TODAS las cachés anteriores (v1, v2)
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW v3] Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. FETCH - Estrategia mixta
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  
  var url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  
  // HTML: siempre desde la red (Network First)
  // Así los cambios que subas se ven al instante
  if (event.request.destination === 'document' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, copy);
          });
          return response;
        })
        .catch(function() {
          // Si no hay internet, sirve la última copia guardada
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Assets (CSS, JS, imágenes): Cache First para velocidad
  event.respondWith(
    caches.match(event.request)
      .then(function(cachedResponse) {
        if (cachedResponse) return cachedResponse;
        
        return fetch(event.request)
          .then(function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var copy = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, copy);
            });
            return response;
          });
      })
  );
});