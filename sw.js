/* Kanak — lightweight service worker for "Add to Home Screen" + fast repeat loads.
   Strategy: network-first for the page (so updates show immediately),
   cache-first for same-origin static assets. Cross-origin (fonts, CDN libs,
   live price APIs) is never cached so prices always come fresh from the network. */
var CACHE = 'kanak-v7';
var CORE = [
  './', './index.html', './styles.css', './main.js', './content.js',
  './logo.svg', './favicon.svg',
  './photo-goldbars.jpg', './photo-bullion.jpg', './photo-jewellery.jpg', './photo-earrings.jpg',
  './forging.svg', './scrap.svg', './refining.svg', './casting.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE).catch(function () {}); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return; // let network handle fonts / CDN / APIs

  if (req.mode === 'navigate') {
    // Network-first for HTML so content is always up to date.
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (m) { return m || caches.match('./index.html'); });
      })
    );
    return;
  }

  // Stale-while-revalidate for same-origin assets: serve cache instantly for
  // speed, but always fetch a fresh copy in the background so updates appear on
  // the next load (prevents stale CSS/JS after you deploy changes).
  e.respondWith(
    caches.match(req).then(function (m) {
      var network = fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () { return m; });
      return m || network;
    })
  );
});
