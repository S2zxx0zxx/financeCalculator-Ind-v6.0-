import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { tools } from '../assets/js/app/registry.mjs';
import assert from 'node:assert/strict';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
for(const t of tools){const path='calculators/'+t.id+'/index.html';assert.ok(existsSync(new URL('../'+path,import.meta.url)),path);assert.match(read(path),new RegExp('/calculators/'+t.id+'/'));}
for(const path of ['app/index.html','compare/index.html','saved/index.html','offline.html','index.html','sitemap.xml'])assert.ok(read(path));
const articleNames=readdirSync(new URL('../blog/',import.meta.url)).filter(n=>n.endsWith('.html')&&n!=='index.html');
assert.equal(articleNames.length,29);
for(const name of articleNames){assert.match(read('blog/'+name),/Article freshness/);assert.ok(read('sitemap.xml').includes('/blog/'+name));}
for(const path of ['index.html','blog/index.html','contact.html','privacy-policy.html'])assert.doesNotMatch(read(path),/15,000\+ subscribers|You are already subscribed!|Message bhej diya!/);
assert.doesNotMatch(read('podcast/index.html'),/playEp\(|audioSrc|episode_complete/);
console.log('Static route and trust checks passed: 11 tools, 29 preserved articles.');
