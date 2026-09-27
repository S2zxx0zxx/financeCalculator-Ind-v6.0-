import { calculators } from '../domain/tools.mjs';

const DB = 'fincalc-scenarios-v1';
const STORE = 'scenarios';
const open = () => new Promise((resolve,reject)=>{
  if (!globalThis.indexedDB) { reject(new Error('This browser does not support local scenario storage.')); return; }
  const request=indexedDB.open(DB,1);
  request.onupgradeneeded=()=>{ if(!request.result.objectStoreNames.contains(STORE))request.result.createObjectStore(STORE,{keyPath:'id'}); };
  request.onsuccess=()=>resolve(request.result);
  request.onerror=()=>reject(request.error);
});
const operation=async(mode,work)=>{
  const db=await open();
  try{return await new Promise((resolve,reject)=>{
    const tx=db.transaction(STORE,mode); const request=work(tx.objectStore(STORE));
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(request.error);
    tx.onerror=()=>reject(tx.error);
  });}finally{db.close();}
};
export const listScenarios = async()=> (await operation('readonly',store=>store.getAll())).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
export const saveScenario = scenario => operation('readwrite',store=>store.put(validateScenario(scenario)));
export const removeScenario = id => operation('readwrite',store=>store.delete(id));
export const clearScenarios = () => operation('readwrite',store=>store.clear());
export function validateScenario(s){
  if(!s || typeof s!=='object' || typeof s.id!=='string' || !/^[0-9a-f-]{36}$/i.test(s.id) ||
     typeof s.name!=='string' || s.name.trim().length<1 || s.name.length>80 ||
     !/^\d{4}-\d{2}-\d{2}T/.test(s.createdAt) || !s.toolId ||
     !s.inputs || typeof s.inputs!=='object' || !s.result || typeof s.result!=='object' ||
     !Number.isFinite(s.result.headline) || typeof s.result.headlineLabel!=='string') throw new Error('Invalid scenario data.');
  return s;
}
export function validateImport(payload, ids){
  if(!payload || payload.schemaVersion!==1 || !Array.isArray(payload.scenarios) || payload.scenarios.length>200) throw new Error('Unsupported file version or too many scenarios.');
  const seen=new Set();
  return payload.scenarios.map(s=>{
    validateScenario(s);
    if(!ids.includes(s.toolId) || !calculators[s.toolId] || s.result.toolId!==s.toolId || seen.has(s.id)) throw new Error('Unknown or duplicate scenario in backup.');
    seen.add(s.id);
    // Backup results are untrusted snapshots. Recalculate from validated inputs
    // so imported estimates always carry the current formula and disclosures.
    let result;
    try { result=calculators[s.toolId](s.inputs); }
    catch { throw new Error('A backup scenario has invalid or unsupported inputs.'); }
    return {id:s.id,name:s.name,toolId:s.toolId,createdAt:s.createdAt,inputs:s.inputs,result};
  });
}
