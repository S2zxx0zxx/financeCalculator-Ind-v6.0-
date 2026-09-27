import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { tools } from '../assets/js/app/registry.mjs';
import assert from 'node:assert/strict';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
for(const t of tools){const path='calculators/'+t.id+'/index.html';assert.ok(existsSync(new URL('../'+path,import.meta.url)),path);assert.match(read(path),new RegExp('/calculators/'+t.id+'/'));}
for(const path of ['app/index.html','compare/index.html','saved/index.html','offline.html','index.html','sitemap.xml'])assert.ok(read(path));
const articleNames=readdirSync(new URL('../blog/',import.meta.url)).filter(n=>n.endsWith('.html')&&n!=='index.html');
const guides=['emi-payment-formula.html','sip-growth-illustration.html','gst-amount-math.html','fd-compounding-math.html'];
const archived=articleNames.filter(name=>!guides.includes(name));
assert.equal(archived.length,29);
assert.equal(guides.filter(name=>articleNames.includes(name)).length,4);
for(const name of archived){
  assert.match(read('blog/'+name),/<meta name="robots" content="noindex,follow">/);
  assert.match(read('blog/'+name),/This article is being reviewed/);
  assert.doesNotMatch(read('blog/'+name),/<script|application\/ld\+json|30% Tax|₹93\.94|Updated with latest/);
  assert.ok(!read('sitemap.xml').includes('/blog/'+name),'Pending-review articles must not appear in the indexable sitemap');
}
for(const name of guides){
  assert.match(read('blog/'+name),/<meta name="robots" content="index,follow">/);
  assert.match(read('sitemap.xml'),new RegExp('/blog/'+name));
  assert.match(read('blog/feed.xml'),new RegExp('/blog/'+name));
}
assert.equal((read('blog/feed.xml').match(/<item>/g)||[]).length,guides.length);
assert.equal((read('blog/index.html').match(/Archive · Source review pending/g)||[]).length,29,'Every archived article preview must show its review status');
assert.doesNotMatch(read('blog/index.html'),/Updated Weekly|Most Read|29 Expert Guides|<span class="special-badge featured">NEW<\/span>/,'Unverified promotional claims on blog index');
for(const path of ['index.html','blog/index.html','contact.html','privacy-policy.html'])assert.doesNotMatch(read(path),/15,000\+ subscribers|You are already subscribed!|Message bhej diya!/);
assert.equal(existsSync(new URL('../podcast/',import.meta.url)),false,'Podcast route must be absent');
for(const path of ['index.html','blog/index.html','about.html','contact.html','disclaimer.html','privacy-policy.html',...articleNames.map(name=>'blog/'+name)]){
  assert.doesNotMatch(read(path),/\/podcast\/|Podcast|🎙️/i,path);
}
console.log('Static route and trust checks passed: 11 tools, 29 archived articles, 4 formula guides.');
