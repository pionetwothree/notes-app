const cacheName = 'v2';

//Call Install Event
this.addEventListener('install', (e) => {
    //Perform some task
    console.log('Service Worker: installed');
});

//Call Activate Event
this.addEventListener('activate', e =>{
    console.log('Service Worker: Activated');
    //Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service Worker: Clearing old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call fetch Event
this.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            // Make copy/clone of response
            const resClone = res.clone();
            //Open cache
            caches
                .open(cacheName)
                .then(cache => {
                    //Add response to cache
                    cache.put(e.request, resClone);
                });
                return res;
        }).catch(err => caches.match(e.request).then(res => res))
    );

});

/**
 * 
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    //Prevent Chrome 67 and earlier from automatically showing prompt
    e.preventDefault();
    //Stash the event so it can be triggered later.
    deferredPrompt = e;

});

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    //Update UI notify the user they can add to home screen
    btnAdd.style.display = 'block';

});

btnAdd.addEventListener('click', (e) => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');

        }
        deferredPrompt = null;
    });
});

 */