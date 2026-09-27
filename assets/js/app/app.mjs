import { categories, tools, byId } from './registry.mjs';
import { calculators } from '../domain/tools.mjs';
import { listScenarios, saveScenario, removeScenario, clearScenarios, validateImport } from './storage.mjs';

const $=id=>document.getElementById(id);
const c=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2});
const number=new Intl.NumberFormat('en-IN',{maximumFractionDigits:2});
const escapeHtml=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const category=id=>categories.find(x=>x.id===id)?.name||id;
const title=document.title;
const path=location.pathname;
const selected=path.match(/^\/calculators\/([^/]+)\/?$/)?.[1];
const page=path.startsWith('/compare')?'compare':path.startsWith('/saved')?'saved':selected?'tool':'directory';
let currentResult=null;
const url=id=>'/calculators/'+id+'/';

function chrome(){
  const active=x=>x===page?' aria-current="page"':'';
  $('app-header').innerHTML='<div class="header-inner"><a class="brand" href="/">FinCalc <small>by FinCo-Pilot</small></a><nav class="top-nav" aria-label="Primary"><a href="/app/"'+active('directory')+'>Calculators</a><a href="/blog/">Blog</a></nav><button id="theme" class="icon-button" type="button" aria-label="Toggle light or dark theme">◐ Theme</button></div>';
  $('bottom-nav').innerHTML='<a href="/app/"'+active('directory')+'>▦ Calculators</a><a href="/blog/">▤ Blog</a>';
  $('footer').innerHTML='FinCalc by FinCo-Pilot · Estimates only · <a href="/disclaimer.html">Disclaimer</a> · <a href="/privacy-policy.html">Privacy</a> · <a href="/contact.html">Contact</a>';
  try{document.documentElement.dataset.theme=localStorage.getItem('fincalc-app-theme')||'';}catch{}
  $('theme').addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('fincalc-app-theme',next);}catch{}});
}
function directory(){
  $('app-main').innerHTML='<section class="hero"><span class="eyebrow">Decision tools · India</span><h1>Make the numbers easier to understand.</h1><p class="lead">Pick a question, change the assumptions, and see what the estimate includes. No sign-up. No invented live rates.</p><div class="action-row"><a class="button secondary" href="/saved/">Saved calculations</a><a class="button secondary" href="/compare/">Compare calculations</a></div></section><div class="workspace"><aside class="rail"><h2>Categories</h2><div class="category-list" id="categories"></div></aside><div><label for="search"><strong>Find a tool</strong></label><input class="search" id="search" type="search" placeholder="Try home loan, tax, savings…" autocomplete="off"><p class="small muted" id="count" role="status"></p><div class="tools-grid" id="tools-grid"></div><p id="empty" class="notice" hidden>No matching tools. Try a category or a shorter search.</p><section class="section-title card"><h2>Where numbers come from</h2><p>Each tool lists the inputs and assumptions used. Income tax has a strictly limited verified case; credit health never pretends to know your bureau score. Financial rules and real offers can change.</p></section></div></div>';
  let filter='all';
  const buttons=[{id:'all',name:'All tools'},...categories].map(cat=>'<button type="button" data-category="'+cat.id+'">'+cat.name+'</button>').join('');
  $('categories').innerHTML=buttons;
  function update(){
    const query=$('search').value.trim().toLowerCase();
    const list=tools.filter(t=>(filter==='all'||filter===t.category) && (t.title+' '+t.question+' '+t.description+' '+category(t.category)).toLowerCase().includes(query));
    $('tools-grid').innerHTML=list.map(t=>'<article class="card tool-card"><span class="tag">'+escapeHtml(category(t.category))+'</span><h3>'+escapeHtml(t.title)+'</h3><p>'+escapeHtml(t.description)+'</p><a href="'+url(t.id)+'" aria-label="Open '+escapeHtml(t.title)+'">Explore tool →</a></article>').join('');
    $('empty').hidden=list.length>0;$('count').textContent=list.length+' of '+tools.length+' tools';
    $('categories').querySelectorAll('button').forEach(b=>{b.classList.toggle('selected',b.dataset.category===filter);b.setAttribute('aria-pressed',String(b.dataset.category===filter));});
  }
  $('categories').addEventListener('click',e=>{const b=e.target.closest('button[data-category]');if(b){filter=b.dataset.category;update();}});
  $('search').addEventListener('input',update);update();
}
function fields(tool){return tool.fields.map(f=>{
  const help=f.help?'<small>'+escapeHtml(f.help)+'</small>':'';
  const value=f.type==='number'?'<input id="input-'+f.key+'" name="'+f.key+'" type="number" inputmode="decimal" min="'+f.min+'" max="'+f.max+'" step="'+f.step+'" value="'+f.defaultValue+'" required>':'<select id="input-'+f.key+'" name="'+f.key+'">'+f.options.map(o=>'<option value="'+o.value+'"'+(o.value===f.defaultValue?' selected':'')+'>'+escapeHtml(o.label)+'</option>').join('')+'</select>';
  return '<label class="field"><span>'+escapeHtml(f.label)+'</span>'+value+help+'</label>';
}).join('');}
function toolPage(tool){
  $('app-main').innerHTML='<nav class="small" aria-label="Breadcrumb"><a href="/app/">Tools</a> / '+escapeHtml(category(tool.category))+'</nav><section class="hero"><span class="eyebrow">'+escapeHtml(category(tool.category))+'</span><h1>'+escapeHtml(tool.question)+'</h1><p class="lead">'+escapeHtml(tool.description)+'</p></section>'+
    (tool.id==='credit-health'?'<section class="card"><h2>Use your real credit report</h2><p>FinCalc does not have access to your bureau data and cannot infer an actual CIBIL score from a quiz. Review your report, check for mistakes, repay on time, and discuss your loan eligibility with the lender.</p><p><a href="https://www.cibil.com/freecibilscore" target="_blank" rel="noopener noreferrer">Check your score through CIBIL ↗</a></p><p class="callout">A score helps lenders evaluate applications; lenders decide whether to approve. Never enter a report, OTP or banking credentials into this tool.</p></section>':
      '<div class="app-grid"><section class="card"><h2>Enter your assumptions</h2><form id="tool-form" novalidate>'+fields(tool)+'<p id="error" class="error" role="alert"></p><button class="button" type="submit">Calculate</button></form></section><section class="card result-card" id="result"><h2>Your estimate</h2><p class="muted">Complete the fields and calculate to see a breakdown.</p></section></div>')+
    '<section class="card section-title"><h2>Basis and limits</h2><p>'+escapeHtml(tool.source)+'</p>'+(tool.lastReviewed?'<p class="small">Rule review date: '+tool.lastReviewed+'. Confirm current rules before filing.</p>':'')+(tool.external?'<p><a href="'+tool.external+'" target="_blank" rel="noopener noreferrer">Check official source ↗</a></p>':'')+'<p class="muted">Information is illustrative, not a personalized offer or professional advice. See the assumptions shown with each result.</p></section>';
  if(tool.id==='credit-health')return;
  $('tool-form').addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget;const invalid=[...form.elements].find(el=>el.matches('input,select')&&!el.checkValidity());$('error').textContent='';if(invalid){$('error').textContent='Check the value for '+(invalid.closest('label')?.querySelector('span')?.textContent||invalid.name)+'.';invalid.focus();return;}
    const inputs=Object.fromEntries(tool.fields.map(f=>[f.key,f.type==='number'?Number(form.elements[f.key].value):form.elements[f.key].value]));
    try{const value=calculators[tool.id](inputs);currentResult={tool,inputs,result:value};renderResult(value);}
    catch(err){currentResult=null;$('error').textContent=err.message;$('result').innerHTML='<h2>Cannot show this estimate</h2><p class="notice">'+escapeHtml(err.message)+'</p>'+(tool.external?'<a href="'+tool.external+'" target="_blank" rel="noopener noreferrer">Use the official source ↗</a>':'');}
  });
  $('app-main').addEventListener('click',async e=>{
    if(!currentResult)return;
    if(e.target.id==='print-result')window.print();
    if(e.target.id==='save-result'){
      const name=window.prompt('Name this scenario (stored on this device)',tool.title);
      if(name===null)return;
      if(!name.trim()||name.length>80){$('save-status').textContent='Choose a name up to 80 characters.';return;}
      try{await saveScenario({id:crypto.randomUUID(),name:name.trim(),toolId:tool.id,createdAt:new Date().toISOString(),inputs:currentResult.inputs,result:currentResult.result});$('save-status').textContent='Saved to this browser. Export from Saved to keep a separate backup.';}
      catch(err){$('save-status').textContent='Could not save locally: '+err.message;}
    }
  });
  const fromSaved=new URLSearchParams(location.search).get('scenario');
  if(fromSaved){listScenarios().then(list=>{const item=list.find(s=>s.id===fromSaved&&s.toolId===tool.id);if(item)for(const f of tool.fields){if(item.inputs[f.key]!==undefined)$('tool-form').elements[f.key].value=item.inputs[f.key];}}).catch(()=>{});}
}
function renderResult(r){
  const format=(value,unit='currency')=>unit==='currency'?c.format(value):number.format(value);
  $('result').innerHTML='<h2>'+escapeHtml(r.headlineLabel)+'</h2><output class="big-result" aria-live="polite">'+format(r.headline,r.unit)+'</output><table class="result-table"><caption class="small muted" style="text-align:left">Breakdown</caption><tbody>'+r.rows.map(x=>'<tr><td>'+escapeHtml(x.label)+'</td><td>'+format(x.value,x.unit)+'</td></tr>').join('')+'</tbody></table><p class="small"><strong>Assumptions:</strong> '+escapeHtml(r.assumptions)+'</p><p class="callout"><strong>Limit:</strong> '+escapeHtml(r.warning)+'</p><div class="action-row"><button id="save-result" class="button" type="button">Save on this device</button><button id="print-result" class="button secondary" type="button">Print</button><a class="button secondary" href="/compare/">Compare saved →</a></div><p class="small" id="save-status" role="status"></p><p class="small muted">Rules: '+escapeHtml(r.engineVersion)+'</p>';
}
function scenarioCard(s){const t=byId(s.toolId);return '<article class="card scenario" data-id="'+s.id+'"><div><span class="tag">'+escapeHtml(t?.title||s.toolId)+'</span><h3>'+escapeHtml(s.name)+'</h3><span class="small muted">'+escapeHtml(s.createdAt.slice(0,10))+' · '+escapeHtml(s.result.engineVersion||'Legacy version')+'</span><p>'+escapeHtml(s.result.headlineLabel)+': <strong>'+c.format(s.result.headline)+'</strong></p></div><div class="action-row"><a class="button secondary" href="'+url(s.toolId)+'?scenario='+encodeURIComponent(s.id)+'">Reopen inputs</a><button class="button secondary" data-delete="'+s.id+'" type="button">Delete</button></div></article>';}
async function saved(){
  $('app-main').innerHTML='<section class="hero"><span class="eyebrow">Private workspace</span><h1>Saved scenarios</h1><p class="lead">Stored on this browser only. Clearing site data or switching devices can remove them. Export a backup if they matter.</p></section><div class="action-row"><button id="export" class="button secondary" type="button">Export JSON backup</button><label class="button secondary" for="import">Import JSON backup</label><input id="import" type="file" accept="application/json,.json" hidden><button id="clear" class="button secondary" type="button">Delete all</button></div><p id="status" role="status"></p><div id="scenarios" class="scenarios"></div>';
  const refresh=async()=>{try{const list=await listScenarios();$('scenarios').innerHTML=list.length?list.map(scenarioCard).join(''):'<div class="card empty"><h2>Nothing saved here yet</h2><p>Explore a calculator and save an estimate.</p><a href="/app/">Browse tools →</a></div>';}catch(err){$('status').textContent='Local storage unavailable: '+err.message;}};
  $('scenarios').addEventListener('click',async e=>{const id=e.target.dataset.delete;if(!id)return;if(!confirm('Delete this saved scenario?'))return;try{await removeScenario(id);await refresh();}catch(err){$('status').textContent=err.message;}});
  $('export').addEventListener('click',async()=>{try{const data={schemaVersion:1,exportedAt:new Date().toISOString(),scenarios:await listScenarios()};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='fincalc-scenarios-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}catch(err){$('status').textContent=err.message;}});
  $('import').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>2000000)throw new Error('File must be smaller than 2 MB.');const data=validateImport(JSON.parse(await file.text()),tools.map(t=>t.id));const existing=await listScenarios();const novel=data.filter(s=>!existing.some(x=>x.id===s.id));if(!confirm('Import '+novel.length+' new scenarios? Existing scenarios stay unchanged.'))return;for(const s of novel)await saveScenario(s);$('status').textContent='Imported '+novel.length+' scenarios.';await refresh();}catch(err){$('status').textContent='Import failed: '+err.message;}finally{e.target.value='';}});
  $('clear').addEventListener('click',async()=>{if(!confirm('Delete all locally saved scenarios? Export a backup first if needed.'))return;try{await clearScenarios();await refresh();}catch(err){$('status').textContent=err.message;}});
  await refresh();
}
async function compare(){
  $('app-main').innerHTML='<section class="hero"><span class="eyebrow">Scenario lab</span><h1>Compare saved estimates</h1><p class="lead">Compare up to three scenarios from the same calculator. Equal units alone do not make assumptions identical; inspect each scenario before deciding.</p></section><div id="comparison" class="card"></div><p id="status" role="status"></p>';
  let list;try{list=await listScenarios();}catch(err){$('comparison').textContent='Storage unavailable: '+err.message;return;}
  if(!list.length){$('comparison').innerHTML='<h2>No saved scenarios yet</h2><p>Save estimates from a calculator first.</p><a href="/app/">Browse tools →</a>';return;}
  $('comparison').innerHTML='<fieldset><legend>Choose up to three scenarios of one tool</legend>'+list.map(s=>'<label class="field"><input type="checkbox" value="'+s.id+'" name="scenario"> '+escapeHtml(s.name)+' · '+escapeHtml(byId(s.toolId)?.title||s.toolId)+'</label>').join('')+'</fieldset><div id="compare-table"></div>';
  $('comparison').addEventListener('change',()=>{
    const checked=[...$('comparison').querySelectorAll('input:checked')];const selected=checked.map(el=>list.find(s=>s.id===el.value));
    if(selected.length>3||new Set(selected.map(s=>s.toolId)).size>1){$('status').textContent='Choose at most three scenarios from the same tool.';$('compare-table').innerHTML='';return;}
    $('status').textContent='';if(!selected.length){$('compare-table').innerHTML='';return;}
    const aligned=selected.every(s=>s.result.headlineLabel===selected[0].result.headlineLabel&&s.result.engineVersion===selected[0].result.engineVersion);
    if(!aligned){$('compare-table').innerHTML='<p class="notice">Results use different units or rule versions. Recalculate before comparison.</p>';return;}
    const rows=[['Result',...selected.map(s=>c.format(s.result.headline))],['Assumptions',...selected.map(s=>s.result.assumptions||'Unknown')],['Limits',...selected.map(s=>s.result.warning||'Unknown')]];
    $('compare-table').innerHTML='<div style="overflow-x:auto"><table class="compare"><caption>Same calculator and rules: '+escapeHtml(selected[0].result.headlineLabel)+'</caption><thead><tr><th scope="col">Measure</th>'+selected.map(s=>'<th scope="col">'+escapeHtml(s.name)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr><th scope="row">'+row[0]+'</th>'+row.slice(1).map(cell=>'<td>'+escapeHtml(cell)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
  });
}
chrome();if(page==='tool'){const t=byId(selected);if(t)toolPage(t);else directory();}else if(page==='compare')compare();else if(page==='saved')saved();else directory();

if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
