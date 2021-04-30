const version = '-v17';
const staticCacheName = `staticfiles${version}`;
const dynamicCacheName = 'dynamicfiles';

const expectedCaches = [
  staticCacheName,
  dynamicCacheName
];

const fetchAndCache = async (request, cacheName, cachedEtag) => {
  try {
    const fetchedResponse = await fetch(request);
    const fetchedEtag = fetchedResponse.headers.get('ETag');  
    const cache = await caches.open(cacheName);
    await cache.put(request, fetchedResponse.clone());

    // Message client that an updated article was fetched from the network
    if (cachedEtag !== fetchedEtag && request.url.includes('/writing/')) {
      self.clients.matchAll().then(clients =>
        clients.forEach(client => client.postMessage('newContent'))
      );
    }

    return fetchedResponse;
  }
  catch (error) {}
};

const trimCaches = async (cacheName, maxItems) => {
  const cache = await caches.open(cacheName);
  const cacheItems = await cache.keys();
  const itemsToDelete = cacheItems.slice(0, Math.max(cacheItems.length - maxItems, 0));

  await Promise.all(itemsToDelete.map(cacheItem => cache.delete(cacheItem)));
};

addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(async function() {
    const staticCache = await caches.open(staticCacheName);

    await staticCache.addAll([
      '/assets/css/main.css',
      '/assets/css/rss.css',
      '/assets/js/main.js',
      '/offline.html',
      '/favicon.ico'
    ]);
  }());
});

addEventListener('activate', event => {
  event.waitUntil(async function() {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.filter(cacheName =>
      !expectedCaches.includes(cacheName)
    ).map(cacheName =>
      caches.delete(cacheName)
    ));
    clients.claim();
  }());
});

addEventListener('fetch', event => {
  // https://bugs.chromium.org/p/chromium/issues/detail?id=823392
  // https://github.com/paulirish/caltrainschedule.io/pull/51/commits/82d03d9c4468681421321db571d978d6adea45a7
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }

  const requestURL = new URL(event.request.url);

  event.respondWith(async function() {
    const cachedResponse = await caches.match(event.request);

    if (requestURL.pathname === '/' ||
      requestURL.pathname.includes('/writing/') ||
      requestURL.pathname.includes('/images/')) {
      if (cachedResponse) {
        event.waitUntil(
          fetchAndCache(event.request, dynamicCacheName, cachedResponse.headers.get('ETag'))
        );

        return cachedResponse;
      }

      try {
        const fetchedResponse = await fetch(event.request);
        const copiedResponse = fetchedResponse.clone();

        event.waitUntil(
          caches.open(dynamicCacheName).then(cache =>
            cache.put(event.request, copiedResponse)
          )
        )

        return fetchedResponse;
      }
      catch (error) {
        if (requestURL.pathname.includes('/writing/')) {
          return caches.match('/offline.html');
        }
      }
    }

    return cachedResponse || fetch(event.request);
  }());
});

addEventListener('message', event => {
  if (event.data === 'trimCaches') {
    trimCaches(dynamicCacheName, 30);
  }
});
