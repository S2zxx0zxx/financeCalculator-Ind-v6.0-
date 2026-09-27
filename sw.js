// FinCalc offline shell. No live finance rules or article pages are presented as current offline.
const CACHE_NAME='fincalc-web-v3';
const TOOL_SLUGS=['emi','sip','income-tax','gst','fd','rd','retirement','inflation','loan-eligibility','rent-vs-buy','credit-health'];
const CORE=['/','/app/','/compare/','/saved/','/offline.html','/manifest.json','/icons/icon-192.png','/icons/icon-512.png','/assets/css/app.css','/assets/js/app/app.mjs','/assets/js/app/registry.mjs','/assets/js/app/storage.mjs','/assets/js/domain/tools.mjs','/assets/js/domain/emi.mjs',...TOOL_SLUGS.map(x=>'/calculators/'+x+'/')];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  if(request.mode==='navigate'){
    event.respondWith(fetch(request).then(response=>{
      if(response.ok && response.type==='basic' && !url.pathname.startsWith('/blog/')){
        const clone=response.clone();event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.put(request,clone)));
      }
      return response;
    }).catch(async()=>await caches.match(request)||await caches.match('/offline.html')));
    return;
  }
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{
    if(response.ok && response.type==='basic' && /\.(css|mjs|png|svg)$/.test(url.pathname)){
      const clone=response.clone();event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.put(request,clone)));
    }
    return response;
  })));
});
