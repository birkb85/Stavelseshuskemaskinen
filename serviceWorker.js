const staticCacheName = "static-cache-v1"
const assets = [
  "/",
  "index.html",
  "index.js",
  "myMediaRecorder.js",
  "libraries/bootstrap.bundle.min.js",
  "libraries/bootstrap.min.css",
  "libraries/fontawesome.min.js",
  "libraries/solid.min.js",
  "sounds/recording0",
  "sounds/recording1"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })