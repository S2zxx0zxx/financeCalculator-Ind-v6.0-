import { clampLegacy, type CalculationResult } from "../types";

export interface RentVsBuyInput {
  propertyValue: number;
  monthlyRent: number;
  annualRentIncreasePercent: number;
  annualLoanRatePercent: number;
  annualPropertyGrowthPercent: number;
  years: number;
}
export interface RentVsBuyValues {
  totalRent: number;
  totalEmi: number;
  downPayment: number;
  futurePropertyValue: number;
  netBuyCost: number;
  better: "buy" | "rent";
  difference: number;
}

export function calculateRentVsBuy(input: RentVsBuyInput): CalculationResult<RentVsBuyValues> {
  const propertyValue = clampLegacy(input.propertyValue, { min: 500_000, max: 500_000_000, fallback: 5_000_000 });
  const monthlyRent = clampLegacy(input.monthlyRent, { min: 1_000, max: 5_000_000, fallback: 15_000 });
  const rentIncrease = clampLegacy(input.annualRentIncreasePercent, { min: 0, max: 30, fallback: 5 }) / 100;
  const monthlyLoanRate = clampLegacy(input.annualLoanRatePercent, { min: 0.1, max: 20, fallback: 8.5 }) / 12 / 100;
  const propertyGrowth = clampLegacy(input.annualPropertyGrowthPercent, { min: 0, max: 30, fallback: 6 }) / 100;
  const years = clampLegacy(input.years, { min: 1, max: 40, fallback: 10 });

  const downPayment = propertyValue * 0.2;
  const loanAmount = propertyValue * 0.8;
  const months = years * 12;
  const factor = Math.pow(1 + monthlyLoanRate, months);
  const emi = loanAmount * monthlyLoanRate * factor / (factor - 1);
  const totalEmi = emi * months;
  const totalBuyCost = totalEmi + downPayment;
  const futurePropertyValue = propertyValue * Math.pow(1 + propertyGrowth, years);
  const netBuyCost = totalBuyCost - futurePropertyValue;

  let totalRent = 0;
  let currentRent = monthlyRent;
  for (let year = 0; year < years; year += 1) {
    totalRent += currentRent * 12;
    currentRent *= 1 + rentIncrease;
  }
  const better = netBuyCost < totalRent ? "buy" : "rent";
  return {
    values: {
      totalRent,
      totalEmi,
      downPayment,
      futurePropertyValue,
      netBuyCost,
      better,
      difference: Math.abs(totalRent - netBuyCost)
    },
    meta: {
      calculator: "rent-vs-buy",
      legacyParity: true,
      ruleVersion: "legacy-v4",
      assumptions: ["20% down payment", "No maintenance, taxes, transaction costs or investment opportunity cost in legacy formula"]
    }
  };
}
