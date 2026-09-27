import { readJson, STORAGE_KEYS, writeJson } from "../../shared/storage/storage";

const MAX_RECENT = 8;

export function readFavorites(): string[] {
  return readJson<string[]>(STORAGE_KEYS.favorites, []);
}

export function isFavorite(calculatorId: string): boolean {
  return readFavorites().includes(calculatorId);
}

export function toggleFavorite(calculatorId: string): boolean {
  const current = readFavorites();
  const next = current.includes(calculatorId)
    ? current.filter(id => id !== calculatorId)
    : [calculatorId, ...current];
  writeJson(STORAGE_KEYS.favorites, next);
  window.dispatchEvent(new CustomEvent("fincalc:favorites-changed"));
  return next.includes(calculatorId);
}

export function readRecent(): string[] {
  return readJson<string[]>(STORAGE_KEYS.recent, []);
}

export function markRecent(calculatorId: string): void {
  const next = [calculatorId, ...readRecent().filter(id => id !== calculatorId)].slice(0, MAX_RECENT);
  writeJson(STORAGE_KEYS.recent, next);
  window.dispatchEvent(new CustomEvent("fincalc:recent-changed"));
}
