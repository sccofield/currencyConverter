const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  '/css/style.css',
  '/index.js'
];

self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then((response)=>{
      if (response.status == 404){
        return new Response('page not found');
      }
      return response
    }).catch((error) => {
      return new Response('what totally fail')
    })
  );
});

// self.addEventListener('fetch', (event) => {
//   console.log('hello world new')
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       }
//     )
//   );
// });

