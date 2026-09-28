import type { CalculationRecord } from "../history/model";

export function calculatorIdsWithScenarios(history: readonly CalculationRecord[]): string[] {
  return [...new Set(history.map(item => item.calculatorId))];
}

export function scenariosFor(history: readonly CalculationRecord[], calculatorId: string): CalculationRecord[] {
  return history.filter(item => item.calculatorId === calculatorId);
}

export interface ComparisonSelection {
  calculatorId: string;
  leftId: string;
  rightId: string;
}

export function initialComparison(history: readonly CalculationRecord[]): ComparisonSelection {
  const ids = calculatorIdsWithScenarios(history);
  const calculatorId = ids.find(id => scenariosFor(history, id).length >= 2) ?? ids[0] ?? "";
  const options = scenariosFor(history, calculatorId);
  return { calculatorId, leftId: options[0]?.id ?? "", rightId: options[1]?.id ?? "" };
}

export function selectionForCalculator(history: readonly CalculationRecord[], calculatorId: string): ComparisonSelection {
  const options = scenariosFor(history, calculatorId);
  return { calculatorId, leftId: options[0]?.id ?? "", rightId: options[1]?.id ?? "" };
}

export function resolveComparison(history: readonly CalculationRecord[], selection: ComparisonSelection) {
  const left = history.find(item => item.id === selection.leftId && item.calculatorId === selection.calculatorId);
  const right = history.find(item => item.id === selection.rightId && item.calculatorId === selection.calculatorId);
  if (!left || !right || left.id === right.id) return null;
  return { left, right };
}
