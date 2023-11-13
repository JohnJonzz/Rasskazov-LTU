const CACHE="V4",URLS=["index.html","./","manifest.json","app.css","app.js","favicon.ico","log.html","./icons/icon-32.png","./icons/icon-64.png","./icons/icon-96.png","./icons/icon-128.png","./icons/icon-168.png","./icons/icon-192.png","./icons/icon-256.png","./icons/icon-512.png","./icons/apple-launch-828x1792.png","./icons/apple-touch-icon-80x80.png","./icons/touch-icon-iphone.png","./icons/touch-icon-ipad.png","./icons/touch-icon-iphone-retina.png","./icons/touch-icon-ipad-retina.png","./resources/placeholder.png","./resources/home.html","./resources/contacts.html","./resources/incognito.svg","./webfonts/fa-solid-900.woff2","./webfonts/fa-solid-900.ttf"];let logFromSw=[];function myLog(e){logFromSw.push(e)}myLog("CACHE V4"),self.addEventListener("install",e=>{myLog("Service Worker installing"),self.skipWaiting(),e.waitUntil(caches.open("V4").then(e=>e.addAll(URLS)))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(e=>Promise.all(e.map(e=>{if("V4"!==e)return myLog(`Deleting cache ${e}`),caches.delete(e)}))).then(()=>(myLog("SW is activate and now ready to handle fetches!"),self.clients.claim())))}),self.addEventListener("fetch",e=>{if(e.request.url.endsWith("log.html")){const n={status:200,headers:{"Content-type":"text/html"}};let o=new Response(JSON.stringify(logFromSw),n);logFromSw=[],e.respondWith(o)}else e.respondWith(caches.match(e.request).then(n=>n?(myLog(e.request.url+" from caches"),n):(myLog(e.request.url+" from server"),fetch(e.request).then(n=>("error"!==n.type&&caches.open("V4").then(o=>o.put(e.request,n)),n.clone())))))});