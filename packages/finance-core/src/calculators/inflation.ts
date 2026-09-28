import { clampLegacy, type CalculationResult } from "../types";

export interface InflationInput { amount: number; annualInflation: number; years: number; }
export interface InflationValues { amount: number; futureCost: number; purchasingPowerLostPercent: number; currentHundredFutureWorth: number; }

export function calculateInflation(input: InflationInput): CalculationResult<InflationValues> {
  const amount = clampLegacy(input.amount, { min: 100, max: 999_999_999, fallback: 10_000 });
  const annualInflation = clampLegacy(input.annualInflation, { min: 1, max: 30, fallback: 6 }) / 100;
  const years = clampLegacy(input.years, { min: 1, max: 50, fallback: 10 });
  const futureCost = amount * Math.pow(1 + annualInflation, years);
  const purchasingPowerLostPercent = Number((((futureCost - amount) / futureCost) * 100).toFixed(1));
  const currentHundredFutureWorth = Number((100 / Math.pow(1 + annualInflation, years)).toFixed(0));
  return {
    values: { amount, futureCost, purchasingPowerLostPercent, currentHundredFutureWorth },
    meta: { calculator: "inflation", legacyParity: true, ruleVersion: "legacy-v4", assumptions: [] }
  };
}
