

// Fill here with your cache name-version.
const CACHE_NAME = 'my-cache-v1'
// This is the list of URLs to be cached by your Progressive Web App.
const CACHED_URLS = [
    '/',
    //'beach1-large.jpg',
]

// Open cache on install.
this.addEventListener('install', event => {
  event.waitUntil(async function () {
    const cache = await caches.open(CACHE_NAME)

    await cache.addAll(CACHED_URLS)
  }())
})

// Cache and update with stale-while-revalidate policy.
this.addEventListener('fetch', event => {
  const { request } = event

  // Prevent Chrome Developer Tools error:
  // Failed to execute 'fetch' on 'ServiceWorkerGlobalScope': 'only-if-cached' can be set only with 'same-origin' mode
  //
  // See also https://stackoverflow.com/a/49719964/1217468
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return
  }

  event.respondWith(async function () {
    const cache = await caches.open(CACHE_NAME)

    const cachedResponsePromise = await cache.match(request)
    const networkResponsePromise = fetch(request)

    if (request.url.startsWith(this.location.origin)) {
      event.waitUntil(async function () {
        const networkResponse = await networkResponsePromise

        await cache.put(request, networkResponse.clone())
      }())
    }

    return cachedResponsePromise || networkResponsePromise
  }())
})

// Clean up caches other than current.
this.addEventListener('activate', event => {
  event.waitUntil(async function () {
    const cacheNames = await caches.keys()

    await Promise.all(
      cacheNames.filter((cacheName) => {
        const deleteThisCache = cacheName !== CACHE_NAME

        return deleteThisCache
      }).map(cacheName => caches.delete(cacheName))
    )
  }())
})