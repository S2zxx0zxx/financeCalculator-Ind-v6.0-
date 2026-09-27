export type Money = number;
export type Percentage = number;
export type Years = number;

export interface CalculationMeta {
  calculator: string;
  legacyParity: boolean;
  ruleVersion: string;
  assumptions: readonly string[];
}

export interface CalculationResult<T> {
  values: T;
  meta: CalculationMeta;
}

export interface RangeRule {
  min: number;
  max: number;
  fallback: number;
}

export function clampLegacy(value: number, rule: RangeRule): number {
  if (!Number.isFinite(value)) return rule.fallback;
  return Math.min(rule.max, Math.max(rule.min, value));
}
