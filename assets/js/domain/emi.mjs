/** Pure EMI estimate for a fixed annual nominal rate and monthly payments. */
export function calculateEmi({ principal, annualRatePercent, tenureMonths }) {
  if (![principal, annualRatePercent, tenureMonths].every(Number.isFinite)) {
    throw new RangeError('Inputs must be finite numbers.');
  }
  if (principal <= 0 || annualRatePercent < 0 || annualRatePercent > 100 ||
      !Number.isSafeInteger(tenureMonths) || tenureMonths < 1 || tenureMonths > 1200) {
    throw new RangeError('Principal must be positive, rate 0–100%, and term 1–1200 whole months.');
  }
  const monthlyRate = annualRatePercent / 1200;
  // This equivalent form avoids overflowing (1 + rate)^n for long terms.
  const payment = monthlyRate === 0 ? principal / tenureMonths :
    principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -tenureMonths));
  const totalPaid = payment * tenureMonths;
  if (![payment, totalPaid].every(Number.isFinite)) throw new RangeError('Result exceeds supported size.');
  return Object.freeze({ monthlyPayment: payment, totalPaid, totalInterest: Math.max(0, totalPaid - principal),
    principal, annualRatePercent, tenureMonths, formulaVersion: 'emi-fixed-monthly-v1' });
}
