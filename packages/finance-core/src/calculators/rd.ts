import { clampLegacy, type CalculationResult } from "../types";

export interface RdInput { monthlyDeposit: number; annualRate: number; years: number; }
export interface RdValues { deposited: number; maturity: number; interest: number; months: number; }

export function calculateRd(input: RdInput): CalculationResult<RdValues> {
  const monthlyDeposit = clampLegacy(input.monthlyDeposit, { min: 100, max: 500_000, fallback: 500 });
  const annualRate = clampLegacy(input.annualRate, { min: 1, max: 15, fallback: 7 }) / 100;
  const years = clampLegacy(input.years, { min: 1, max: 30, fallback: 1 });
  const compoundsPerYear = 4;
  const months = years * 12;
  let maturity = 0;
  for (let i = 1; i <= months; i += 1) {
    const remainingMonths = months - i;
    maturity += monthlyDeposit * Math.pow(1 + annualRate / compoundsPerYear, compoundsPerYear * remainingMonths / 12);
  }
  const deposited = monthlyDeposit * months;
  return {
    values: { deposited, maturity, interest: maturity - deposited, months },
    meta: {
      calculator: "rd",
      legacyParity: true,
      ruleVersion: "legacy-v4",
      assumptions: ["Quarterly compounding preserved exactly from legacy implementation"]
    }
  };
}
