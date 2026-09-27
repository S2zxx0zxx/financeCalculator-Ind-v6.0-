import { calculateEmi } from './emi.mjs';

const finite = (value, label, min = 0, max = 1e12) => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) {
    throw new RangeError(`${label} must be between ${min} and ${max}.`);
  }
  return value;
};
const integer = (value, label, min = 1, max = 1200) => {
  finite(value, label, min, max);
  if (!Number.isSafeInteger(value)) throw new RangeError(`${label} must be a whole number.`);
  return value;
};
const row = (label, value, unit = 'currency') => ({ label, value, unit });
const result = (toolId, headline, headlineLabel, rows, assumptions, warning, unit = 'currency') => {
  if (!Number.isFinite(headline) || !rows.every(x => Number.isFinite(x.value))) throw new RangeError('Result exceeds the supported range.');
  return { toolId, headline, headlineLabel, rows, assumptions, warning, unit, engineVersion: 'decision-core-1' };
};
const money = (x, label, min = 0) => finite(x, label, min, 1e10);
const pct = (x, label, max = 100) => finite(x, label, 0, max);
const years = (x, label = 'Years', max = 80) => integer(x, label, 1, max);

export const calculators = {
  emi(i) {
    const principal = money(i.principal, 'Principal', 1);
    const annualRatePercent = pct(i.rate, 'Annual rate');
    const tenureMonths = years(i.years, 'Loan term', 100) * 12;
    const e = calculateEmi({ principal, annualRatePercent, tenureMonths });
    return result('emi', e.monthlyPayment, 'Monthly EMI', [row('Loan amount', principal), row('Total interest', e.totalInterest), row('Total paid', e.totalPaid)],
      `Fixed ${annualRatePercent}% nominal annual interest over ${i.years} years; monthly payments.`,
      'Fees, insurance, taxes, variable rates, prepayment and lender rounding are excluded.');
  },
  sip(i) {
    const contribution = money(i.contribution, 'Monthly contribution', 1);
    const rate = pct(i.rate, 'Assumed annual return', 40) / 1200;
    const months = years(i.years, 'Investment period', 70) * 12;
    // Contributions at month end; avoid dividing by zero when return is 0%.
    const factor = rate === 0 ? months : Math.expm1(months * Math.log1p(rate)) / rate;
    const invested = contribution * months;
    const value = contribution * factor;
    return result('sip', value, 'Illustrative future value', [row('Amount invested', invested), row('Illustrative gain', value - invested)],
      `${months} monthly contributions at month end; constant ${i.rate}% hypothetical nominal annual return.`,
      'Returns vary and can be negative. This is not a guaranteed investment outcome; tax, costs and inflation are excluded.');
  },
  gst(i) {
    const amount = money(i.amount, 'Amount');
    const rate = pct(i.rate, 'GST rate', 40) / 100;
    const mode = i.mode;
    if (!['exclusive', 'inclusive'].includes(mode)) throw new RangeError('Choose inclusive or exclusive GST.');
    const base = mode === 'exclusive' ? amount : amount / (1 + rate);
    const tax = mode === 'exclusive' ? amount * rate : amount - base;
    return result('gst', base + tax, 'Total including GST', [row('Before GST', base), row('GST amount', tax)],
      `${i.rate}% rate entered by you; supplied amount is ${mode} of GST.`,
      'Check the official rate and classification for your goods or service. This does not determine CGST/SGST versus IGST.');
  },
  fd(i) {
    const principal = money(i.principal, 'Deposit', 1);
    const rate = pct(i.rate, 'Annual rate', 30) / 100;
    const term = years(i.years, 'Deposit term', 80);
    const frequency = integer(i.frequency, 'Compounding frequency', 1, 12);
    if (![1,2,4,12].includes(frequency)) throw new RangeError('Choose annual, half-yearly, quarterly or monthly compounding.');
    const maturity = principal * Math.pow(1 + rate / frequency, frequency * term);
    return result('fd', maturity, 'Illustrative maturity', [row('Deposit', principal), row('Interest before tax', maturity - principal)],
      `${i.rate}% assumed annual rate for ${term} years with ${frequency} compounding periods per year.`,
      'Not a live FD offer. Actual bank rules, taxation, premature withdrawal and withholding may change the amount.');
  },
  rd(i) {
    const monthly = money(i.monthly, 'Monthly installment', 1);
    const rate = pct(i.rate, 'Annual rate', 30) / 1200;
    const months = years(i.years, 'Deposit term', 50) * 12;
    // An illustration with each payment made at the end of a month and monthly compounding.
    const factor = rate === 0 ? months : Math.expm1(months * Math.log1p(rate)) / rate;
    const maturity = monthly * factor;
    const deposited = monthly * months;
    return result('rd', maturity, 'Illustrative maturity', [row('Total installments', deposited), row('Interest before tax', maturity - deposited)],
      `${months} installments paid at month end, ${i.rate}% assumed nominal annual rate compounded monthly.`,
      'Banks may use different RD compounding or installment rules. This is an illustration, not a deposit quote.');
  },
  inflation(i) {
    const amount = money(i.amount, 'Current amount', 1);
    const rate = pct(i.rate, 'Assumed inflation', 40) / 100;
    const term = years(i.years, 'Horizon', 80);
    const futureCost = amount * Math.pow(1 + rate, term);
    const presentBuyingPower = amount / Math.pow(1 + rate, term);
    return result('inflation', futureCost, 'Future price at this assumption', [row('Current price', amount), row('Future buying power of today’s amount', presentBuyingPower)],
      `${i.rate}% constant annual assumed inflation for ${term} years.`, 'Actual inflation varies and is different across products and households.');
  },
  retirement(i) {
    const currentAge = integer(i.currentAge, 'Current age', 18, 85);
    const targetAge = integer(i.targetAge, 'Retirement age', 19, 90);
    if (targetAge <= currentAge) throw new RangeError('Retirement age must be higher than current age.');
    const spending = money(i.spending, 'Monthly spending', 1);
    const inflation = pct(i.inflation, 'Inflation assumption', 30) / 100;
    const horizon = years(i.retirementYears, 'Retirement years', 60);
    const yearsToRetire = targetAge - currentAge;
    const futureMonthly = spending * Math.pow(1 + inflation, yearsToRetire);
    // Simple nominal sum of escalating annual spending, with zero post-retirement investment return.
    const firstYear = futureMonthly * 12;
    const factor = inflation === 0 ? horizon : Math.expm1(horizon * Math.log1p(inflation)) / inflation;
    const corpus = firstYear * factor;
    return result('retirement', corpus, 'Illustrative corpus at retirement', [row('Estimated monthly spending at retirement', futureMonthly), row('Spending over selected retirement years', corpus)],
      `${yearsToRetire} years until retirement; ${horizon} years after; ${i.inflation}% annual inflation; no investment return after retirement.`,
      'Simplified spending sum, not a recommended target. Excludes investment return, tax, health costs and longevity uncertainty.');
  },
  'loan-eligibility'(i) {
    const income = money(i.income, 'Monthly take-home income', 1);
    const obligations = money(i.obligations, 'Existing monthly obligations');
    const ratio = pct(i.ratio, 'Assumed obligation limit', 100) / 100;
    const rate = pct(i.rate, 'Assumed loan rate');
    const months = years(i.years, 'Loan term', 100) * 12;
    const availablePayment = Math.max(0, income * ratio - obligations);
    const r = rate / 1200;
    const factor = r === 0 ? months : (1 - Math.pow(1 + r, -months)) / r;
    const principal = availablePayment * factor;
    return result('loan-eligibility', principal, 'Indicative principal under your assumptions', [row('Assumed available EMI', availablePayment), row('Existing monthly obligations', obligations)],
      `${i.ratio}% of take-home income for all monthly obligations; ${i.rate}% nominal annual interest for ${i.years} years.`,
      'This is not a lender eligibility check or approval. Each lender has its own limits, fees, credit checks and policies.');
  },
  'rent-vs-buy'(i) {
    const price = money(i.price, 'Property price', 1);
    const rent = money(i.rent, 'Monthly rent', 1);
    const downPercent = pct(i.downPercent, 'Down payment percent');
    const annualRentRise = pct(i.rentRise, 'Rent growth rate', 40) / 100;
    const annualGrowth = pct(i.growth, 'Property growth rate', 40) / 100;
    const loanRate = pct(i.loanRate, 'Loan interest rate');
    const term = years(i.years, 'Comparison horizon', 40);
    const down = price * downPercent / 100;
    const emi = price === down ? 0 : calculateEmi({ principal: price - down, annualRatePercent: loanRate, tenureMonths: term * 12 }).monthlyPayment;
    const totalRent = rent * 12 * (annualRentRise === 0 ? term : Math.expm1(term * Math.log1p(annualRentRise)) / annualRentRise);
    const futureValue = price * Math.pow(1 + annualGrowth, term);
    // Net ownership cash expense after selling for estimated gross value, ignoring sale costs.
    const netBuy = down + emi * term * 12 - futureValue;
    return result('rent-vs-buy', netBuy - totalRent, 'Buy cost minus rent cost (illustrative)', [row('Total rent payments', totalRent), row('Down payment + EMI', down + emi * term * 12), row('Estimated property value', futureValue), row('Net buy cost after assumed sale', netBuy)],
      `${term} years; ${downPercent}% down; ${loanRate}% fixed loan rate; rent rises ${i.rentRise}% and property rises ${i.growth}% each year.`,
      'Negative net buy cost can result from speculative appreciation. Excludes maintenance, taxes, transaction costs, rent deposit, reinvested savings and sale friction. Do not treat this difference as a recommendation.');
  },
  'income-tax'(i) {
    const salary = money(i.salary, 'Annual gross salary', 0);
    if (i.resident !== 'yes' || i.otherIncome !== 'no') throw new RangeError('Only resident salary-only cases are supported; use the official tax calculator for other cases.');
    const taxable = Math.max(0, salary - 75000);
    if (taxable > 1200000) throw new RangeError('Taxable income above ₹12 lakh needs additional marginal-relief and income checks. Use the official calculator linked below.');
    // AY 2026–27, new regime, resident individual, ordinary salary income only.
    // Official page: incometax.gov.in/iec/foportal/help/individual/return-applicable-1
    const slices = [[400000,0],[800000,0.05],[1200000,0.10]];
    let from = 0, slabTax = 0;
    for (const [to, rate] of slices) { slabTax += Math.max(0, Math.min(taxable,to)-from)*rate; from=to; }
    const rebate = Math.min(slabTax,60000); const tax = slabTax-rebate;
    return result('income-tax',tax*1.04,'Limited AY 2026–27 new-regime estimate',[row('Taxable after ₹75,000 standard deduction',taxable),row('Tax before Section 87A rebate',slabTax),row('Section 87A rebate',rebate)],
      'Resident individual; salary only; AY 2026–27 new regime; no special-rate income; taxable income at or below ₹12 lakh.',
      'Only a limited salary example. Does not assess old regime, other income, surcharge, credits, TDS or filing eligibility. Check the official Income Tax Department calculator.');
  }
};
