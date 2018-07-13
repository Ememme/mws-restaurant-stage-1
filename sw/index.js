// This section is based on "Introducing the Service Worker" class by Udacity

let staticCacheName = 'mws-restaurant-stage-1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        'mws-resturant=stage-1/build/styles.css',
        'mws-resturant=stage-1/index.html',
        'mws-resturant=stage-1/restaurant.html',
        'mws-resturant=stage-1/js/dbhelper.js',
        'mws-resturant=stage-1/js/main.js',
        'mws-resturant=stage-1/js/restaurant_info.js',
        'mws-resturant=stage-1/data/restaurants.json',
        'mws-resturant=stage-1/img/1.jpg',
        'mws-resturant=stage-1/img/2.jpg',
        'mws-resturant=stage-1/img/3.jpg',
        'mws-resturant=stage-1/img/4.jpg',
        'mws-resturant=stage-1/img/5.jpg',
        'mws-resturant=stage-1/img/6.jpg',
        'mws-resturant=stage-1/img/7.jpg',
        'mws-resturant=stage-1/img/8.jpg',
        'mws-resturant=stage-1/img/9.jpg',
        'mws-resturant=stage-1/img/10.jpg',
      ]);
    })
    .catch(function(err) { console.log('Caching failed, sorry', err);})
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mws-') && cacheName != staticCacheName;
        }).map(function(cacheName) {
          return cache.delete(cacheName);
        })
      )
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) return response;
        return fetch(event.request);
      })
  );
});
