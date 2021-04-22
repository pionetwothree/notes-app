const CACHE_NAME = 'offline';
const OFFLINE_URL = 'offline.html';


this.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Setting {cache: 'reload'} in the new request will ensure that the response
    // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
  })());
  
  this.skipWaiting();
});


this.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in this.registration) {
      await this.registration.navigationPreload.enable();
    }
  })());

  // Tell the active service worker to take control of the page immediately.
  this.clients.claim();
});

this.addEventListener('fetch', function(event) {
  // console.log('[Service Worker] Fetch', event.request.url);
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        console.log('[Service Worker] Fetch failed; returning offline page instead.', error);

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })());
  }
});

//https://github.com/sylvainpolletvillard/pwa-workshop/tree/master/6-background-sync
// Test sync attendees
function registerBackgroundSync() {
  if (!navigator.serviceWorker){
      return console.error("Service Worker not supported")
  }

  navigator.serviceWorker.ready
  .then(registration => registration.sync.register('syncAttendees'))
  .then(() => console.log("Registered background sync"))
  .catch(err => console.error("Error registering background sync", err))
}

function syncAttendees(){
	return update({ url: `https://reqres.in/api/users` })
    	.then(refresh)
    	.then((attendees) => this.registration.showNotification(
    		`${attendees.length} attendees to the PWA Workshop`
    	))
}

function syncAttendees(){
	return update({ url: `https://reqres.in/api/users` })
    	.then(refresh)
    	.then((attendees) => self.registration.showNotification(
    		`${attendees.length} attendees to the PWA Workshop`
    	))
}

//from google
this.addEventListener('sync', function(event) {
	console.log("sync event", event);
    if (event.tag === 'syncAttendees') {
        event.waitUntil(syncAttendees()); // sending sync request
    }
});

/** 
this.addEventListener('sync', (event) => {
  console.info('Event: Sync');

  //Check registered sync name or emulated sync from devTools
  if (event.tag === 'github' || event.tag === 'test-tag-from-devtools') {
    event.waitUntil(
      //To check all opened tabs and send postMessage to those tabs
      this.clients.matchAll().then((all) => {
        return all.map((client) => {
          return client.postMessage('online'); //To make fetch request, check app.js - line no: 122
        })
      })
      .catch((error) => {
        console.error(error);
      })
    );
  }
});
*/