import { browserStorage, readJson, STORAGE_KEYS, writeJson } from "../../shared/storage/storage";
import {
  normalizeHistory,
  removeHistoryRecord,
  upsertHistory,
  type CalculationRecord
} from "./model";

export type { CalculationRecord } from "./model";

export interface LegacyHistoryRecord {
  type?: string;
  timestamp?: string;
  [key: string]: unknown;
}

const V7_HISTORY_KEY = "fincalc-v7-history";

function id() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `fincalc-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function notifyHistoryChanged() {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("fincalc:history-changed"));
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
    inputs: { ...inputs },
    summary: { ...summary }
  };
}

export function readCalculationHistory(): CalculationRecord[] {
  return normalizeHistory(readJson<unknown[]>(V7_HISTORY_KEY, []));
}

export function saveCalculation(record: CalculationRecord): CalculationRecord[] {
  const history = upsertHistory(readCalculationHistory(), record);
  writeJson(V7_HISTORY_KEY, history);
  notifyHistoryChanged();
  return history;
}

export function deleteCalculation(id: string): void {
  writeJson(V7_HISTORY_KEY, removeHistoryRecord(readCalculationHistory(), id));
  notifyHistoryChanged();
}

export function clearV7History(): void {
  browserStorage.remove(V7_HISTORY_KEY);
  notifyHistoryChanged();
}

export function readLegacyHistory(): LegacyHistoryRecord[] {
  const value = readJson<unknown>(STORAGE_KEYS.history, []);
  return Array.isArray(value)
    ? value.filter(item => Boolean(item) && typeof item === "object") as LegacyHistoryRecord[]
    : [];
}
