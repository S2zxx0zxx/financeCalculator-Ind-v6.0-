import { clampLegacy, type CalculationResult } from "../types";

export interface SipInput {
  monthlyInvestment: number;
  annualReturn: number;
  years: number;
}
export interface SipValues {
  monthlyInvestment: number;
  invested: number;
  maturity: number;
  gain: number;
  roiPercent: number;
  months: number;
}

export function calculateSip(input: SipInput): CalculationResult<SipValues> {
  const monthlyInvestment = clampLegacy(input.monthlyInvestment, { min: 100, max: 10_000_000, fallback: 5_000 });
  const annualReturn = clampLegacy(input.annualReturn, { min: 1, max: 50, fallback: 12 });
  const years = clampLegacy(input.years, { min: 1, max: 50, fallback: 10 });
  const monthlyRate = annualReturn / 12 / 100;
  const months = years * 12;
  const maturity = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const invested = monthlyInvestment * months;
  const gain = maturity - invested;
  const roiPercent = Number(((gain / invested) * 100).toFixed(1));
  return {
    values: { monthlyInvestment, invested, maturity, gain, roiPercent, months },
    meta: {
      calculator: "sip",
      legacyParity: true,
      ruleVersion: "legacy-v4",
      assumptions: ["Legacy beginning-of-period SIP formula preserved"]
    }
  };
}
