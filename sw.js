const CACHE = 'mirrorcoach-static-v20';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './sw.js',
  './css/01-foundation.css',
  './css/02-layout.css',
  './css/03-components.css',
  './css/04-responsive.css',
  './css/05-professional.css',
  './css/06-focus-navigation.css',
  './css/07-metric-insights.css',
  './css/08-welcome-navigation.css',
  './css/09-patient-insights.css',
  './css/10-more-hub.css',
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
  './js/12-international-ui.js',
  './js/13-focus-navigation.js',
  './js/14-metric-insights.js',
  './js/15-welcome-navigation.js',
  './js/16-patient-insights.js',
  './js/17-expanded-case-links.js',
  './js/18-more-hub.js',
  './fragments/00-shell-dashboard.html',
  './fragments/01-clinical-planning.html',
  './fragments/02-session-learning.html',
  './fragments/03-outcomes-research-close.html',
  './assets/robotimize-logo.png',
  './assets/control-box.svg',
  './assets/passive-rom.svg',
  './assets/product-hero.svg',
  './assets/robotic-hand.svg',
  './assets/sensor-glove.svg',
  './assets/task-bimanual.svg',
  './assets/task-peg.svg',
  './assets/exercise-cup-grasp.webp',
  './assets/exercise-robotic-hand-closeup.webp',
  './assets/exercise-peg-transfer.webp',
  './assets/exercise-bilateral-grasp.webp',
  './assets/exercise-assisted-open-close.webp'
];

self.addEventListener('install', event => event.waitUntil(
  caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
));

self.addEventListener('activate', event => event.waitUntil(
  caches.keys()
    .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim())
));

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put('./index.html', copy));
        }
        return response;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok && new URL(event.request.url).origin === self.location.origin) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => Response.error()))
  );
});
