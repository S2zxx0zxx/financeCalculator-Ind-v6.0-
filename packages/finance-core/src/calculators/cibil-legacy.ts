import type { CalculationResult } from "../types";

export type CibilBand = "excellent" | "very-good" | "good" | "average" | "poor";
export interface CibilValues { score: number; band: CibilBand; approvalLabel: string; }

export function classifyLegacyCibil(rawScore: number): CalculationResult<CibilValues> {
  const score = Math.round(Math.min(900, Math.max(300, Number.isFinite(rawScore) ? rawScore : 750)));
  const values: CibilValues = score >= 800
    ? { score, band: "excellent", approvalLabel: "Very High" }
    : score >= 750
      ? { score, band: "very-good", approvalLabel: "High" }
      : score >= 650
        ? { score, band: "good", approvalLabel: "Moderate" }
        : score >= 550
          ? { score, band: "average", approvalLabel: "Low" }
          : { score, band: "poor", approvalLabel: "Very Low" };
  return {
    values,
    meta: {
      calculator: "cibil",
      legacyParity: true,
      ruleVersion: "legacy-v4-ui-bands",
      assumptions: ["Score-band labels are preserved for UI parity; lending-rate claims require separate current-source verification"]
    }
  };
}
