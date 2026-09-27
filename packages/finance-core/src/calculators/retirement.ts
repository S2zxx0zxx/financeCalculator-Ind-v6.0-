import { clampLegacy, type CalculationResult } from "../types";

export interface RetirementInput {
  currentAge: number;
  retirementAge: number;
  monthlyExpense: number;
  inflationPercent: number;
  annualReturnPercent: number;
}
export interface RetirementValues {
  yearsToRetire: number;
  futureMonthlyExpense: number;
  corpus: number;
  monthlySipRequired: number;
}

export function calculateRetirement(input: RetirementInput): CalculationResult<RetirementValues> {
  const currentAge = clampLegacy(input.currentAge, { min: 18, max: 60, fallback: 25 });
  const retirementAge = clampLegacy(input.retirementAge, { min: 40, max: 80, fallback: 60 });
  const monthlyExpense = clampLegacy(input.monthlyExpense, { min: 1_000, max: 10_000_000, fallback: 30_000 });
  const inflation = clampLegacy(input.inflationPercent, { min: 1, max: 20, fallback: 6 }) / 100;
  const returns = clampLegacy(input.annualReturnPercent, { min: 1, max: 30, fallback: 12 }) / 100;
  if (retirementAge <= currentAge) throw new RangeError("retirementAge must be greater than currentAge");

  const yearsToRetire = retirementAge - currentAge;
  const yearsInRetirement = 25;
  const futureMonthlyExpense = monthlyExpense * Math.pow(1 + inflation, yearsToRetire);
  const annualExpenseAtRetirement = futureMonthlyExpense * 12;
  const realReturn = ((1 + returns) / (1 + inflation)) - 1;
  const corpus = realReturn > 0
    ? annualExpenseAtRetirement * (1 - Math.pow(1 + realReturn, -yearsInRetirement)) / realReturn
    : annualExpenseAtRetirement * yearsInRetirement;
  const monthlyReturn = returns / 12;
  const months = yearsToRetire * 12;
  const monthlySipRequired = corpus / (((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn) * (1 + monthlyReturn));

  return {
    values: { yearsToRetire, futureMonthlyExpense, corpus, monthlySipRequired },
    meta: {
      calculator: "retirement",
      legacyParity: true,
      ruleVersion: "legacy-v4",
      assumptions: ["25 years in retirement", "Return and inflation assumptions remain constant"]
    }
  };
}
