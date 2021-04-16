let cacheData = "appV1";


this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/vendors~main.chunk.js',
                '/static/js/bundle.js',
                '/index.html',
                 '/',
                '/dficon.ico',
                '/src/components/stocknews.jsx'


            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) 
    {
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) 
                {
                    return resp
                }
                let requestUrl= event.request.clone();
                fetch(requestUrl)
                
            })
        )
    }

});


/** 
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