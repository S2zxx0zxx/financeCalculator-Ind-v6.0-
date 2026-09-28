import { clampLegacy, type CalculationResult } from "../types";

export type GstMode = "add" | "remove";
export interface GstInput { amount: number; ratePercent: number; mode: GstMode; }
export interface GstValues { base: number; gst: number; total: number; cgst: number; sgst: number; }

export function calculateGst(input: GstInput): CalculationResult<GstValues> {
  const amount = clampLegacy(input.amount, { min: 1, max: 999_999_999_999, fallback: 1_000 });
  const rate = input.ratePercent / 100;
  const total = input.mode === "add" ? amount * (1 + rate) : amount;
  const base = input.mode === "add" ? amount : amount / (1 + rate);
  const gst = total - base;
  return {
    values: { base, gst, total, cgst: gst / 2, sgst: gst / 2 },
    meta: {
      calculator: "gst",
      legacyParity: true,
      ruleVersion: "legacy-v4",
      assumptions: ["GST split equally into CGST and SGST as in legacy UI"]
    }
  };
}
