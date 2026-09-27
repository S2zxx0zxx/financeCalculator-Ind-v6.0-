import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { calculators } from '../assets/js/domain/tools.mjs';

const article=name=>readFileSync(new URL('../blog/'+name,import.meta.url),'utf8').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ');
const nearText=(value,expected)=>assert.ok(article(value).includes(expected),`${value} must display ${expected}`);
const rupees=value=>'₹'+new Intl.NumberFormat('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}).format(value);

test('published EMI example matches current formula',()=>{
  const r=calculators.emi({principal:1_000_000,rate:8.5,years:20});
  nearText('emi-payment-formula.html',rupees(r.headline));
});
test('published SIP and FD examples match calculator outputs',()=>{
  const sip=calculators.sip({contribution:5000,rate:10,years:10});
  assert.ok(article('sip-growth-illustration.html').includes(rupees(sip.headline)));
  const fd=calculators.fd({principal:100000,rate:7,years:3,frequency:4});
  assert.ok(article('fd-compounding-math.html').includes(rupees(fd.headline)));
});
test('published GST inclusive example uses the calculator arithmetic',()=>{
  const gst=calculators.gst({amount:118,rate:18,mode:'inclusive'});
  const page=article('gst-amount-math.html');
  for(const value of [gst.headline,...gst.rows.map(row=>row.value)])assert.ok(page.includes(String(value)));
});
