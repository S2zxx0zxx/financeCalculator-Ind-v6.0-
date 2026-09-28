import { clampLegacy, type CalculationResult } from "../types";

export interface LoanEligibilityInput {
  monthlyIncome: number;
  existingMonthlyObligations: number;
  annualRate: number;
  tenureYears: number;
}
export interface LoanEligibilityValues {
  eligible: boolean;
  maxEmi: number;
  maxLoan: number;
  foir: number;
}

export function calculateLoanEligibility(input: LoanEligibilityInput): CalculationResult<LoanEligibilityValues> {
  const monthlyIncome = clampLegacy(input.monthlyIncome, { min: 5_000, max: 100_000_000, fallback: 50_000 });
  const existing = clampLegacy(input.existingMonthlyObligations, { min: 0, max: 50_000_000, fallback: 0 });
  const monthlyRate = clampLegacy(input.annualRate, { min: 0.1, max: 30, fallback: 8.5 }) / 12 / 100;
  const months = clampLegacy(input.tenureYears, { min: 1, max: 40, fallback: 20 }) * 12;
  const foir = 0.5;
  const maxEmi = monthlyIncome * foir - existing;
  const maxLoan = maxEmi <= 0 ? 0 : maxEmi * (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months));
  return {
    values: { eligible: maxEmi > 0, maxEmi: Math.max(0, maxEmi), maxLoan, foir },
    meta: {
      calculator: "loan-eligibility",
      legacyParity: true,
      ruleVersion: "legacy-v4",
      assumptions: ["Fixed 50% FOIR preserved from legacy implementation"]
    }
  };
}
