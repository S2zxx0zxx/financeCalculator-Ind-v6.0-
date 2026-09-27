import { writeFileSync, mkdirSync } from 'node:fs';
import { tools, categories } from '../assets/js/app/registry.mjs';
const escape=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const pages=[
  {path:'app',title:'Financial decision tools',description:'Browse eleven transparent finance topics by category.',fallback:'<p>Choose a calculator:</p><ul>'+tools.map(t=>'<li><a href="/calculators/'+t.id+'/">'+escape(t.title)+'</a> — '+escape(t.description)+'</li>').join('')+'</ul>'},
  {path:'compare',title:'Compare saved estimates',description:'Compare same-tool scenarios with clear assumptions.',fallback:'<p>Save scenarios in a calculator first. Comparison uses results on this browser only.</p>'},
  {path:'saved',title:'Saved scenarios',description:'Save, export or remove your private, browser-local scenarios.',fallback:'<p>Scenarios stay on this device unless you export a backup. Browser data can be removed.</p>'},
  ...tools.map(t=>({path:'calculators/'+t.id,title:t.title,description:t.description,fallback:'<p>'+escape(t.question)+'</p><p>Inputs: '+escape(t.fields.map(f=>f.label).join(', ')||'No financial inputs')+'.</p><p>Basis: '+escape(t.source)+'</p>'}))
];
for(const p of pages){
  const html=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${escape(p.description)} FinCalc by FinCo-Pilot.">
<link rel="canonical" href="https://satzzxzxx.me/${p.path}/"><link rel="stylesheet" href="/assets/css/app.css">
<meta name="theme-color" content="#f8f9fb"><link rel="manifest" href="/manifest.json">
<title>${escape(p.title)} | FinCalc by FinCo-Pilot</title>
</head>
<body>
<a class="skip" href="#app-main">Skip to content</a><header id="app-header" class="site-header"><div class="header-inner"><a class="brand" href="/">FinCalc <small>by FinCo-Pilot</small></a><nav class="top-nav" aria-label="Primary"><a href="/app/">Calculators</a><a href="/blog/">Blog</a></nav></div></header>
<main id="app-main" class="shell"><h1>${escape(p.title)}</h1>${p.fallback}<noscript><p class="notice">Interactive calculations require JavaScript. Browse the tool details or visit our guides.</p></noscript></main>
<footer id="footer" class="footer"><a href="/privacy-policy.html">Privacy</a> · <a href="/contact.html">Contact</a></footer><nav id="bottom-nav" class="bottom-nav" aria-label="Mobile navigation"></nav>
<script type="module" src="/assets/js/app/app.mjs"></script>
</body></html>
`;
  mkdirSync(new URL('../'+p.path+'/',import.meta.url),{recursive:true});
  writeFileSync(new URL('../'+p.path+'/index.html',import.meta.url),html);
}
console.log('Generated '+pages.length+' static route shells.');
