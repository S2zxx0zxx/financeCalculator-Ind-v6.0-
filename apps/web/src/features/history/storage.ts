import { browserStorage, readJson, STORAGE_KEYS, writeJson } from "../../shared/storage/storage";

export interface CalculationRecord {
  schemaVersion: 1;
  id: string;
  calculatorId: string;
  calculatorTitle: string;
  createdAt: string;
  inputs: Record<string, number | string | boolean>;
  summary: Record<string, string>;
}

export interface LegacyHistoryRecord {
  type?: string;
  timestamp?: string;
  [key: string]: unknown;
}

const V7_HISTORY_KEY = "fincalc-v7-history";
const MAX_HISTORY = 20;

function id() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `fincalc-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function createCalculationRecord(
  calculatorId: string,
  calculatorTitle: string,
  inputs: CalculationRecord["inputs"],
  summary: CalculationRecord["summary"]
): CalculationRecord {
  return {
    schemaVersion: 1,
    id: id(),
    calculatorId,
    calculatorTitle,
    createdAt: new Date().toISOString(),
    inputs,
    summary
  };
}

export function readCalculationHistory(): CalculationRecord[] {
  return readJson<CalculationRecord[]>(V7_HISTORY_KEY, [])
    .filter(item => item?.schemaVersion === 1 && typeof item.id === "string")
    .slice(0, MAX_HISTORY);
}

export function saveCalculation(record: CalculationRecord): CalculationRecord[] {
  const history = [record, ...readCalculationHistory().filter(item => item.id !== record.id)].slice(0, MAX_HISTORY);
  writeJson(V7_HISTORY_KEY, history);
  window.dispatchEvent(new CustomEvent("fincalc:history-changed"));
  return history;
}

export function deleteCalculation(id: string): void {
  writeJson(V7_HISTORY_KEY, readCalculationHistory().filter(item => item.id !== id));
  window.dispatchEvent(new CustomEvent("fincalc:history-changed"));
}

export function clearV7History(): void {
  browserStorage.remove(V7_HISTORY_KEY);
  window.dispatchEvent(new CustomEvent("fincalc:history-changed"));
}

export function readLegacyHistory(): LegacyHistoryRecord[] {
  return readJson<LegacyHistoryRecord[]>(STORAGE_KEYS.history, []);
}
