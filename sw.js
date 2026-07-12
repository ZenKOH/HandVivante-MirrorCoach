const CACHE = 'mirrorcoach-static-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './sw.js',
  './css/01-foundation.css',
  './css/02-layout.css',
  './css/03-components.css',
  './css/04-responsive.css',
  './js/00-boot.js',
  './js/01-base.js',
  './js/02-exercises.js',
  './js/03-tutorial-content.js',
  './js/04-manual-content.js',
  './js/05-sample-state.js',
  './js/06-core.js',
  './js/07-patients-protocols.js',
  './js/08-session.js',
  './js/09-library-tutorial.js',
  './js/10-manual-outcomes-research.js',
  './js/11-init.js',
  './fragments/00-shell-dashboard.html',
  './fragments/01-clinical-planning.html',
  './fragments/02-session-learning.html',
  './fragments/03-outcomes-research-close.html',
  './assets/brand-mark.svg',
  './assets/control-box.svg',
  './assets/passive-rom.svg',
  './assets/product-hero.svg',
  './assets/robotic-hand.svg',
  './assets/sensor-glove.svg',
  './assets/task-bimanual.svg',
  './assets/task-peg.svg'
];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); return response;
  }).catch(() => caches.match('./index.html'))));
});
