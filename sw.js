var CACHE_SHELL = 'bresca-shell-v1';
var CACHE_MEDIA = 'bresca-media-v1';

var SHELL_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/style.css?v=9',
  '/assets/js/app.js?v=9',
  '/data/poi.json?v=4',
  '/assets/img/logos/Logo_Bresca_Blanc.png',
  '/assets/img/logos/Logo_Bresca_Vert.png',
  '/assets/img/logos/Logo_Département_Var_Blanc.png',
  '/assets/img/logos/Logo_Département_Var_Noir.png',
  '/assets/img/background/fond_feuilles.jpeg',
  '/assets/img/mascotte/mascotte_sourire.png',
  '/assets/img/mascotte/mascotte_triste.png',
  '/assets/img/mascotte/mascotte_peur.png',
  '/assets/img/mascotte/mascotte_saut de joie.png',
  '/assets/img/carte/New_Map.svg?v=5'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_SHELL).then(function (cache) {
      return cache.addAll(SHELL_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) {
          return k !== CACHE_SHELL && k !== CACHE_MEDIA;
        }).map(function (k) {
          return caches.delete(k);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      return cached || fetch(e.request);
    })
  );
});
