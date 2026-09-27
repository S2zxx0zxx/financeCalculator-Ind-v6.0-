import test from 'node:test';
import assert from 'node:assert/strict';
import { calculators } from '../assets/js/domain/tools.mjs';

const close=(a,b,abs=0.01)=>assert.ok(Math.abs(a-b)<abs,`${a} differs from ${b}`);

test('monthly EMI balances inputs, and longer term lowers EMI while increasing total interest',()=>{
  for(const principal of [1000,100000,10000000]){
    const short=calculators.emi({principal,rate:8,years:10});
    const long=calculators.emi({principal,rate:8,years:20});
    assert.ok(short.headline>long.headline);
    assert.ok(short.rows[1].value<long.rows[1].value);
    close(short.headline*120,short.rows[2].value);
    close(long.rows[1].value+principal,long.rows[2].value);
  }
});
test('GST inclusive/exclusive round trip returns the original gross and base',()=>{
  for(const rate of [0,5,12,18,28]){
    const exclusive=calculators.gst({amount:10000,rate,mode:'exclusive'});
    const inclusive=calculators.gst({amount:exclusive.headline,rate,mode:'inclusive'});
    close(exclusive.headline,inclusive.headline);
    close(inclusive.rows[0].value,10000);
  }
});
test('zero-return SIP and RD equal deposited money; positive return creates positive gain',()=>{
  const sip=calculators.sip({contribution:2500,rate:0,years:12});
  const rd=calculators.rd({monthly:2500,rate:0,years:12});
  close(sip.headline,2500*144);
  close(rd.headline,2500*144);
  assert.ok(calculators.sip({contribution:2500,rate:8,years:12}).headline>sip.headline);
  assert.ok(calculators.rd({monthly:2500,rate:8,years:12}).headline>rd.headline);
});
test('FD compounding, inflation horizon and obligation cap preserve directional relationships',()=>{
  const fd={principal:100000,rate:8,years:5};
  assert.ok(calculators.fd({...fd,frequency:12}).headline>calculators.fd({...fd,frequency:1}).headline);
  assert.ok(calculators.inflation({amount:100000,rate:5,years:20}).headline>calculators.inflation({amount:100000,rate:5,years:10}).headline);
  const input={income:50000,obligations:0,ratio:40,rate:8,years:20};
  assert.ok(calculators['loan-eligibility'](input).headline>calculators['loan-eligibility']({...input,obligations:10000}).headline);
});
test('income tax hard-stops special cases and does not promise a rate for a lender',()=>{
  assert.throws(()=>calculators['income-tax']({salary:1400000,resident:'yes',otherIncome:'no'}),/official calculator/);
  const loan=calculators['loan-eligibility']({income:50000,obligations:20000,ratio:40,rate:8,years:20});
  assert.equal(loan.headline,0);
  assert.match(loan.warning,/not a lender eligibility check or approval/i);
});
