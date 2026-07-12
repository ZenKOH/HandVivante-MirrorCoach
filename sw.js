const CACHE = 'mirrorcoach-static-v2';
const ASSETS = [
  './', './index.html', './styles.css', './manifest.webmanifest',
  './js/01-content.js', './js/02-core.js', './js/03-patients-protocols.js',
  './js/04-session.js', './js/05-library-tutorial.js', './js/06-manual-outcomes-research.js', './js/07-init.js',
  './assets/brand-mark.svg', './assets/product-hero.svg', './assets/robotic-hand.svg',
  './assets/sensor-glove.svg', './assets/control-box.svg', './assets/task-peg.svg',
  './assets/task-bimanual.svg', './assets/passive-rom.svg'
];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); return response;
  }).catch(() => caches.match('./index.html'))));
});
