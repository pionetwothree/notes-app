export default function swDev()
{
    let swUrl= `${process.env.PUBLIC_URL}/sw_cached_site.js`
    navigator.serviceWorker.register(swUrl).then((response)=>{
        console.warn("response",response)
    })
}