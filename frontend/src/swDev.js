export default function swDev()
{
    let swUrl= `${process.env.PUBLIC_URL}/sw_stale_while_revalidate.js`
    navigator.serviceWorker.register(swUrl).then((response)=>{
        console.warn("response",response)
    })

}


// 1. sw_cached_site.js

// 2. sw_udacity.js

// 3. sw_stale_while_revalidate.js



