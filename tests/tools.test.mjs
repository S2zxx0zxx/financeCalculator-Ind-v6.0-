import test from 'node:test';
import assert from 'node:assert/strict';
import { calculators } from '../assets/js/domain/tools.mjs';
import { tools, categories } from '../assets/js/app/registry.mjs';
import { validateImport } from '../assets/js/app/storage.mjs';

const cases = {
  emi:{principal:1000000,rate:8.5,years:20},
  sip:{contribution:1000,rate:0,years:1},
  gst:{amount:118,rate:18,mode:'inclusive'},
  fd:{principal:1000,rate:10,years:1,frequency:1},
  rd:{monthly:1000,rate:0,years:1},
  inflation:{amount:100,rate:10,years:1},
  retirement:{currentAge:30,targetAge:31,spending:1000,inflation:0,retirementYears:1},
  'loan-eligibility':{income:50000,obligations:5000,ratio:40,rate:0,years:1},
  'rent-vs-buy':{price:120000,rent:1000,downPercent:100,loanRate:0,rentRise:0,growth:0,years:1},
  'income-tax':{salary:1275000,resident:'yes',otherIncome:'no'}
};

test('all eleven topic routes have a category and a calculator or an honest credit guide',()=>{
  assert.equal(tools.length,11);
  assert.equal(new Set(tools.map(t=>t.id)).size,11);
  for(const t of tools){assert.ok(categories.some(c=>c.id===t.category));assert.ok(t.id==='credit-health'||typeof calculators[t.id]==='function');}
});
test('independent arithmetic anchors for monthly savings, deposits, inflation and no-loan housing',()=>{
  const expect={sip:12000,gst:118,fd:1100,rd:12000,inflation:110,retirement:12000,'loan-eligibility':180000,'rent-vs-buy':-12000,'income-tax':0};
  for(const [id,headline] of Object.entries(expect))assert.ok(Math.abs(calculators[id](cases[id]).headline-headline)<0.001,id);
  assert.equal(calculators.gst({amount:118,rate:18,mode:'inclusive'}).rows[1].value,18);
  assert.equal(calculators.gst({amount:100,rate:18,mode:'exclusive'}).headline,118);
});
test('FD accepts the compounding value emitted by its HTML select',()=>{
  assert.ok(Math.abs(calculators.fd({...cases.fd,frequency:'4'}).headline-1103.812890625)<0.001);
  assert.throws(()=>calculators.fd({...cases.fd,frequency:'3'}),RangeError);
});
test('tax rules explicitly stop unsupported cases',()=>{
  assert.throws(()=>calculators['income-tax']({...cases['income-tax'],salary:1275001}),/above/);
  assert.throws(()=>calculators['income-tax']({...cases['income-tax'],resident:'no'}),/Only resident/);
  assert.throws(()=>calculators['income-tax']({...cases['income-tax'],otherIncome:'yes'}),/Only resident/);
  assert.equal(calculators['income-tax']({salary:1275000,resident:'yes',otherIncome:'no'}).headline,0);
});
test('numbers and meaningful impossible cases reject without a plausible looking result',()=>{
  assert.throws(()=>calculators.sip({...cases.sip,rate:-1}),RangeError);
  assert.throws(()=>calculators.retirement({...cases.retirement,targetAge:29}),RangeError);
  assert.throws(()=>calculators.gst({...cases.gst,mode:'guess'}),RangeError);
  assert.throws(()=>calculators.fd({...cases.fd,frequency:3}),RangeError);
  assert.throws(()=>calculators.emi({...cases.emi,principal:NaN}),RangeError);
});
test('backup rejects unrelated schema and fake tool data',()=>{
  const scenario={id:'a1234567-89ab-4cde-8abc-0123456789ab',name:'Test',toolId:'emi',createdAt:'2026-09-27T00:00:00.000Z',inputs:cases.emi,result:{toolId:'emi',headline:10,headlineLabel:'EMI'}};
  const imported=validateImport({schemaVersion:1,scenarios:[scenario]},tools.map(t=>t.id));
  assert.equal(imported.length,1);
  assert.equal(imported[0].result.headline,calculators.emi(cases.emi).headline);
  assert.throws(()=>validateImport({schemaVersion:9,scenarios:[scenario]},tools.map(t=>t.id)));
  assert.throws(()=>validateImport({schemaVersion:1,scenarios:[{...scenario,toolId:'other'}]},tools.map(t=>t.id)));
  assert.throws(()=>validateImport({schemaVersion:1,scenarios:[{...scenario,inputs:{principal:100}}]},tools.map(t=>t.id)));
  assert.throws(()=>validateImport({schemaVersion:1,scenarios:[scenario,scenario]},tools.map(t=>t.id)));
});
