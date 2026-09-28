import type { CalculationResult } from "../types";

export type AgeGroup = "general" | "senior" | "super";
export interface LegacyTaxInput { income: number; ageGroup: AgeGroup; section80C: number; section80D: number; }
export interface LegacyTaxValues { taxableNew: number; taxableOld: number; newTax: number; oldTax: number; better: "new" | "old"; savings: number; }

function slabTax(income: number, slabs: ReadonlyArray<{ from: number; to: number; rate: number }>) {
  let tax = 0;
  for (const slab of slabs) {
    if (income <= slab.from) break;
    tax += (Math.min(income, slab.to) - slab.from) * slab.rate;
  }
  return tax;
}

export function calculateLegacyTax(input: LegacyTaxInput): CalculationResult<LegacyTaxValues> {
  const income = Number.isFinite(input.income) ? Math.max(0, input.income) : 0;
  const c80 = Math.min(Math.max(0, input.section80C || 0), 150_000);
  const c80d = Math.min(Math.max(0, input.section80D || 0), 100_000);

  const taxableNew = Math.max(0, income - 75_000);
  let newBase = slabTax(taxableNew, [
    { from: 0, to: 400_000, rate: 0 },
    { from: 400_000, to: 800_000, rate: 0.05 },
    { from: 800_000, to: 1_200_000, rate: 0.10 },
    { from: 1_200_000, to: 1_600_000, rate: 0.15 },
    { from: 1_600_000, to: 2_000_000, rate: 0.20 },
    { from: 2_000_000, to: 2_400_000, rate: 0.25 },
    { from: 2_400_000, to: Number.POSITIVE_INFINITY, rate: 0.30 }
  ]);
  if (taxableNew <= 1_200_000) newBase = 0;
  const newTax = newBase * 1.04;

  const exempt = input.ageGroup === "super" ? 500_000 : input.ageGroup === "senior" ? 300_000 : 250_000;
  const taxableOld = Math.max(0, income - 50_000 - c80 - c80d);
  let oldBase = slabTax(taxableOld, [
    { from: 0, to: exempt, rate: 0 },
    { from: exempt, to: 500_000, rate: 0.05 },
    { from: 500_000, to: 1_000_000, rate: 0.20 },
    { from: 1_000_000, to: Number.POSITIVE_INFINITY, rate: 0.30 }
  ]);
  if (taxableOld <= 500_000) oldBase = 0;
  const oldTax = oldBase * 1.04;
  const better = newTax <= oldTax ? "new" : "old";
  return {
    values: { taxableNew, taxableOld, newTax, oldTax, better, savings: Math.abs(oldTax - newTax) },
    meta: {
      calculator: "income-tax",
      legacyParity: true,
      ruleVersion: "legacy-2025-26-source-code",
      assumptions: [
        "This module preserves the restored legacy source exactly for regression only.",
        "It must not be presented as current tax law until the current FY rules are verified from authoritative sources."
      ]
    }
  };
}
