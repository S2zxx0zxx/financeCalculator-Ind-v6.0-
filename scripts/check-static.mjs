import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { tools } from '../assets/js/app/registry.mjs';
import assert from 'node:assert/strict';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
for(const t of tools){const path='calculators/'+t.id+'/index.html';assert.ok(existsSync(new URL('../'+path,import.meta.url)),path);assert.match(read(path),new RegExp('/calculators/'+t.id+'/'));}
for(const path of ['app/index.html','compare/index.html','saved/index.html','offline.html','index.html','sitemap.xml'])assert.ok(read(path));
const articleNames=readdirSync(new URL('../blog/',import.meta.url)).filter(n=>n.endsWith('.html')&&n!=='index.html');
assert.equal(articleNames.length,29);
for(const name of articleNames){
  assert.match(read('blog/'+name),/Article freshness/);
  assert.match(read('blog/'+name),/<meta name="robots" content="noindex,follow">/);
  assert.ok(!read('sitemap.xml').includes('/blog/'+name),'Pending-review articles must not appear in the indexable sitemap');
}
assert.doesNotMatch(read('blog/feed.xml'),/<item>/,'Unreviewed articles must not enter RSS');
assert.equal((read('blog/index.html').match(/Archive · Source review pending/g)||[]).length,29,'Every article preview must show its review status');
assert.doesNotMatch(read('blog/index.html'),/Updated Weekly|Most Read|29 Expert Guides|<span class="special-badge featured">NEW<\/span>/,'Unverified promotional claims on blog index');
for(const path of ['index.html','blog/index.html','contact.html','privacy-policy.html'])assert.doesNotMatch(read(path),/15,000\+ subscribers|You are already subscribed!|Message bhej diya!/);
assert.equal(existsSync(new URL('../podcast/',import.meta.url)),false,'Podcast route must be absent');
for(const path of ['index.html','blog/index.html','about.html','contact.html','disclaimer.html','privacy-policy.html',...articleNames.map(name=>'blog/'+name)]){
  assert.doesNotMatch(read(path),/\/podcast\/|Podcast|🎙️/i,path);
}
console.log('Static route and trust checks passed: 11 tools, 29 preserved articles.');
