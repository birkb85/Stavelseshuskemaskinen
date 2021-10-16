const staticCacheName = "static-cache-v1"
const assets = [
  "/",
  "/index.html",
  "/index.js",
  "/myMediaRecorder.js"
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