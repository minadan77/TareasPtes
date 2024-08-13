const CACHE_NAME = 'tareas-ptes-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Agrega aquí otras URLs de archivos estáticos que quieras cachear (CSS, imágenes, etc.)
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si el recurso está en caché, lo devuelve desde allí
        if (response) {
          console.log('Recurso del caché:', event.request.url);
          return response;
        }

        // Si no está en caché, se descarga de la red
        console.log('Recurso de la red:', event.request.url);
        return fetch(event.request);
      })
  );
});
