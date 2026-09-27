import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEmi } from '../assets/js/domain/emi.mjs';

test('fixed-rate EMI and totals agree with an independently checked example', () => {
  const result = calculateEmi({ principal: 1000000, annualRatePercent: 8.5, tenureMonths: 240 });
  assert.ok(Math.abs(result.monthlyPayment - 8678.23) < 0.01);
  assert.ok(Math.abs(result.totalPaid - result.principal - result.totalInterest) < 0.00001);
});
test('zero interest divides principal evenly', () => {
  const result = calculateEmi({ principal: 120000, annualRatePercent: 0, tenureMonths: 12 });
  assert.equal(result.monthlyPayment, 10000);
  assert.equal(result.totalInterest, 0);
});
test('long term stays finite and shorter terms cost more per month', () => {
  const input = { principal: 2500000, annualRatePercent: 9 };
  const short = calculateEmi({ ...input, tenureMonths: 120 });
  const long = calculateEmi({ ...input, tenureMonths: 600 });
  assert.ok(short.monthlyPayment > long.monthlyPayment);
  assert.ok(short.totalInterest < long.totalInterest);
});
test('invalid and unsupported cases reject explicitly', () => {
  for (const input of [
    { principal: 0, annualRatePercent: 8, tenureMonths: 12 },
    { principal: 1000, annualRatePercent: -1, tenureMonths: 12 },
    { principal: 1000, annualRatePercent: 8, tenureMonths: 1.5 },
    { principal: Infinity, annualRatePercent: 8, tenureMonths: 12 }
  ]) assert.throws(() => calculateEmi(input), RangeError);
});
