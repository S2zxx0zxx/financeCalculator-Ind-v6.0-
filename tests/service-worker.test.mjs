import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source=readFileSync(new URL('../sw.js',import.meta.url),'utf8');
function setup(fetcher=async()=>({ok:true,type:'basic',clone(){return this}})){
  const handlers={};const writes=[];const removed=[];const requested=[];
  const match=async request=>request==='/offline.html'?{page:'offline'}:null;
  const caches={open:async()=>({addAll:async urls=>{requested.push(...urls)},put:async(request,response)=>writes.push(String(request))}),keys:async()=>['fincalc-v6','fincalc-web-v2','fincalc-web-v3'],delete:async key=>removed.push(key),match};
  const self={location:{origin:'https://satzzxzxx.me'},addEventListener:(type,fn)=>{handlers[type]=fn}};
  runInNewContext(source,{self,caches,fetch:fetcher,URL});
  return {handlers,writes,removed,requested};
}
test('PWA install caches only the current calculator shell and all tool routes',async()=>{
  const env=setup();let promise;
  env.handlers.install({waitUntil:p=>promise=p});await promise;
  assert.ok(env.requested.includes('/calculators/income-tax/'));
  assert.ok(env.requested.includes('/assets/js/domain/tools.mjs'));
  assert.ok(!env.requested.some(url=>url.startsWith('/blog/')));
});
test('activation evicts old service-worker cache',async()=>{
  const env=setup();let promise;env.handlers.activate({waitUntil:p=>promise=p});await promise;
  assert.deepEqual(env.removed,['fincalc-v6','fincalc-web-v2','fincalc-web-v3']);
});
test('offline navigation shows honest fallback instead of unrelated homepage',async()=>{
  const env=setup(async()=>{throw Error('offline')});let response;
  env.handlers.fetch({request:{method:'GET',mode:'navigate',url:'https://satzzxzxx.me/blog/guide.html'},respondWith:p=>response=p,waitUntil:()=>{}});
  assert.equal((await response).page,'offline');
});
test('requests to other origins are left for the browser',()=>{
  const env=setup();let intercepted=false;
  env.handlers.fetch({request:{method:'GET',mode:'navigate',url:'https://example.com/'},respondWith:()=>{intercepted=true}});
  assert.equal(intercepted,false);
});
