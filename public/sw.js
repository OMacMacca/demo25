const cacheName = "v1"

const cacheAssets = [
  "/",
  "index.html",
  "/CSS/styles.css"
]

//install event
self.addEventListener('install', e => {
  console.log("Service worker: Installed")

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("Service worker: Caching Files")
        cache.addAll(cacheAssets)
      })
      .then(() => self.skipWaiting())
  )
})

//activate event
self.addEventListener('activate', e => {
  console.log("Service worker: Activated")
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName) {
            console.log("Service worker: Clearing Old Cache")
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

//fetch event
self.addEventListener('fetch', e => {
  console.log("Service worker: fetching")
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
})