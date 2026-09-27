import type { CalculationResult } from "../types";
import type { AgeGroup } from "./tax-legacy";

export interface SalaryTaxInput2026 {
  grossSalary: number;
  ageGroup: AgeGroup;
  resident: boolean;
  section80C: number;
  section80D: number;
}

export interface TaxRegimeResult {
  taxableIncome: number;
  slabTax: number;
  rebate: number;
  marginalRelief: number;
  taxAfterRelief: number;
  cess: number;
  totalTax: number;
}

export interface SalaryTaxValues2026 {
  newRegime: TaxRegimeResult;
  oldRegime: TaxRegimeResult;
  better: "new" | "old";
  savings: number;
}

interface Slab { from: number; to: number; rate: number }

function slabTax(income: number, slabs: readonly Slab[]): number {
  let tax = 0;
  for (const slab of slabs) {
    if (income <= slab.from) break;
    tax += (Math.min(income, slab.to) - slab.from) * slab.rate;
  }
  return Math.max(0, tax);
}

function finalize(taxableIncome: number, slab: number, rebate: number, marginalRelief: number): TaxRegimeResult {
  const taxAfterRelief = Math.max(0, slab - rebate - marginalRelief);
  const cess = taxAfterRelief * 0.04;
  return { taxableIncome, slabTax: slab, rebate, marginalRelief, taxAfterRelief, cess, totalTax: taxAfterRelief + cess };
}

/**
 * Salary-focused ordinary-income estimator for Tax Year 2026-27.
 *
 * Scope:
 * - resident/non-resident individual salary-style ordinary income
 * - standard deduction
 * - old-regime 80C/80D inputs carried from the existing FinCalc UX
 * - 87A rebate + new-regime marginal relief around ₹12 lakh
 * - 4% Health & Education cess
 *
 * Excludes special-rate income and surcharge/marginal-surcharge calculations.
 * The UI must disclose that incomes above ₹50 lakh or special-rate income need a fuller computation.
 */
export function calculateSalaryTax2026(input: SalaryTaxInput2026): CalculationResult<SalaryTaxValues2026> {
  const grossSalary = Number.isFinite(input.grossSalary) ? Math.max(0, input.grossSalary) : 0;

  // Income-tax Act, 2025 section 19: ₹75,000 standard deduction under section 202(1).
  const taxableNew = Math.max(0, grossSalary - 75_000);
  const newSlab = slabTax(taxableNew, [
    { from: 0, to: 400_000, rate: 0 },
    { from: 400_000, to: 800_000, rate: 0.05 },
    { from: 800_000, to: 1_200_000, rate: 0.10 },
    { from: 1_200_000, to: 1_600_000, rate: 0.15 },
    { from: 1_600_000, to: 2_000_000, rate: 0.20 },
    { from: 2_000_000, to: 2_400_000, rate: 0.25 },
    { from: 2_400_000, to: Number.POSITIVE_INFINITY, rate: 0.30 }
  ]);

  const newRebate = input.resident && taxableNew <= 1_200_000 ? Math.min(newSlab, 60_000) : 0;
  let newMarginalRelief = 0;
  if (input.resident && taxableNew > 1_200_000) {
    const excessIncome = taxableNew - 1_200_000;
    newMarginalRelief = Math.max(0, newSlab - excessIncome);
  }
  const newRegime = finalize(taxableNew, newSlab, newRebate, newMarginalRelief);

  // Opt-out/old-regime comparison preserved as a practical comparison path.
  const c80 = Math.min(Math.max(0, input.section80C || 0), 150_000);
  const c80d = Math.min(Math.max(0, input.section80D || 0), 100_000);
  const taxableOld = Math.max(0, grossSalary - 50_000 - c80 - c80d);
  const exempt = input.ageGroup === "super" ? 500_000 : input.ageGroup === "senior" ? 300_000 : 250_000;
  const oldSlab = slabTax(taxableOld, [
    { from: 0, to: exempt, rate: 0 },
    { from: exempt, to: 500_000, rate: 0.05 },
    { from: 500_000, to: 1_000_000, rate: 0.20 },
    { from: 1_000_000, to: Number.POSITIVE_INFINITY, rate: 0.30 }
  ]);
  const oldRebate = input.resident && taxableOld <= 500_000 ? Math.min(oldSlab, 12_500) : 0;
  const oldRegime = finalize(taxableOld, oldSlab, oldRebate, 0);

  const better = newRegime.totalTax <= oldRegime.totalTax ? "new" : "old";
  return {
    values: {
      newRegime,
      oldRegime,
      better,
      savings: Math.abs(newRegime.totalTax - oldRegime.totalTax)
    },
    meta: {
      calculator: "income-tax",
      legacyParity: false,
      ruleVersion: "tax-year-2026-27-income-tax-act-2025",
      assumptions: [
        "Salary-focused ordinary-income estimate",
        "New regime standard deduction ₹75,000; old regime ₹50,000",
        "New regime rebate up to ₹60,000 where eligible taxable income does not exceed ₹12 lakh",
        "4% Health & Education cess",
        "Special-rate income and surcharge are outside this simplified estimator"
      ]
    }
  };
}
