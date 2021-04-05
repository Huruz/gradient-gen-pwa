const CACHE_NAME = "v1_cache_gen_hex_app_vue";
const URLSTOCACHE = [
    "./",
    "./?umt_source=web_app_manifest",//Fue importante como un paso actualizado para que funcione
    "./img/coloricon16.png",
    "./img/coloricon32.png",
    "./img/coloricon64.png",
    "./img/coloricon128.png",
    "./img/coloricon192.png",
    "./img/coloricon256.png",
    "./img/coloricon512.png",
    "./img/coloricon1024.png",
    "https://unpkg.com/vue@next",
    "./pages/fallback.html",
    "./js/main.js",
    "./js/mountApp.js",
    "./css/style.css",
    "./pages/css/style.css",
    "./manifest.json",
    "https://fonts.googleapis.com/css2?family=Kiwi+Maru&display=swap",

];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(URLSTOCACHE).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
});

self.addEventListener("activate", e => {
    const cacheWhiteList= [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if(cacheWhiteList.indexOf(cacheName) === -1){
                                return caches.delete(cacheName);
                            }
                        }
                    )
                )
            }
        ).then(
            () => self.clients.claim()
        )
    );
});

self.addEventListener("fetch", e =>{
    e.respondWith( /*async function(){
        const cachedResponse = await caches.match(e.request);

        if(cachedResponse) return cachedResponse;

        return fetch(e.request);
    }());*/
        caches.match(e.request).then(
                res => {
                    if(res) return res;
                    return fetch(e.request);
                }
        ).catch(
            () => caches.match("./pages/fallback.html")
        )
    )
});