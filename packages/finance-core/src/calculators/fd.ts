import { clampLegacy, type CalculationResult } from "../types";

export interface FdInput { principal: number; annualRate: number; years: number; compoundsPerYear: number; }
export interface FdValues { principal: number; maturity: number; interest: number; }

export function calculateFd(input: FdInput): CalculationResult<FdValues> {
  const principal = clampLegacy(input.principal, { min: 1_000, max: 100_000_000, fallback: 5_000 });
  const annualRate = clampLegacy(input.annualRate, { min: 1, max: 15, fallback: 7.1 }) / 100;
  const years = clampLegacy(input.years, { min: 1, max: 30, fallback: 1 });
  const compoundsPerYear = Math.max(1, Math.trunc(input.compoundsPerYear || 4));
  const maturity = principal * Math.pow(1 + annualRate / compoundsPerYear, compoundsPerYear * years);
  return {
    values: { principal, maturity, interest: maturity - principal },
    meta: {
      calculator: "fd",
      legacyParity: true,
      ruleVersion: "legacy-v4",
      assumptions: ["Compound frequency comes from calculator selection"]
    }
  };
}
