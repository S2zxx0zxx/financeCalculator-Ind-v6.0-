import { clampLegacy, type CalculationResult } from "../types";

export interface EmiInput {
  principal: number;
  annualRate: number;
  tenureYears: number;
}

export interface EmiValues {
  principal: number;
  monthlyEmi: number;
  totalPayment: number;
  totalInterest: number;
  months: number;
}

export function calculateEmi(input: EmiInput): CalculationResult<EmiValues> {
  const principal = clampLegacy(input.principal, { min: 10_000, max: 500_000_000, fallback: 1_000_000 });
  const annualRate = clampLegacy(input.annualRate, { min: 0.1, max: 30, fallback: 8.5 });
  const tenureYears = clampLegacy(input.tenureYears, { min: 1, max: 40, fallback: 20 });
  const monthlyRate = annualRate / 12 / 100;
  const months = tenureYears * 12;
  const factor = Math.pow(1 + monthlyRate, months);
  const monthlyEmi = principal * monthlyRate * factor / (factor - 1);
  const totalPayment = monthlyEmi * months;
  const totalInterest = totalPayment - principal;

  return {
    values: { principal, monthlyEmi, totalPayment, totalInterest, months },
    meta: {
      calculator: "emi",
      legacyParity: true,
      ruleVersion: "legacy-v4",
      assumptions: ["Monthly reducing-balance EMI", "Legacy FinCalc input clamping preserved"]
    }
  };
}
