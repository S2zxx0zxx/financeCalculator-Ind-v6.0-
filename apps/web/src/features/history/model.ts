export interface CalculationRecord {
  schemaVersion: 1;
  id: string;
  calculatorId: string;
  calculatorTitle: string;
  createdAt: string;
  inputs: Record<string, number | string | boolean>;
  summary: Record<string, string>;
}

export const MAX_HISTORY = 20;

function isScalar(value: unknown): value is number | string | boolean {
  return typeof value === "number" || typeof value === "string" || typeof value === "boolean";
}

function isScalarRecord(value: unknown): value is Record<string, number | string | boolean> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
    && Object.values(value as Record<string, unknown>).every(isScalar);
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
    && Object.values(value as Record<string, unknown>).every(item => typeof item === "string");
}

export function isCalculationRecord(value: unknown): value is CalculationRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const item = value as Partial<CalculationRecord>;
  return item.schemaVersion === 1
    && typeof item.id === "string" && item.id.length > 0
    && typeof item.calculatorId === "string" && item.calculatorId.length > 0
    && typeof item.calculatorTitle === "string" && item.calculatorTitle.length > 0
    && typeof item.createdAt === "string" && !Number.isNaN(Date.parse(item.createdAt))
    && isScalarRecord(item.inputs)
    && isStringRecord(item.summary);
}

export function normalizeHistory(values: readonly unknown[]): CalculationRecord[] {
  const seen = new Set<string>();
  const result: CalculationRecord[] = [];
  for (const value of values) {
    if (!isCalculationRecord(value) || seen.has(value.id)) continue;
    seen.add(value.id);
    result.push(value);
    if (result.length === MAX_HISTORY) break;
  }
  return result;
}

export function upsertHistory(history: readonly CalculationRecord[], record: CalculationRecord): CalculationRecord[] {
  return normalizeHistory([record, ...history.filter(item => item.id !== record.id)]);
}

export function removeHistoryRecord(history: readonly CalculationRecord[], id: string): CalculationRecord[] {
  return history.filter(item => item.id !== id);
}
