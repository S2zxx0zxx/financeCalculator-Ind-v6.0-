import { readJson, STORAGE_KEYS, writeJson } from "../../shared/storage/storage";
import { addRecent, normalizeIds, toggleId } from "./model";

function notify(name: "favorites" | "recent") {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(`fincalc:${name}-changed`));
}

export function readFavorites(): string[] {
  const raw = readJson<unknown>(STORAGE_KEYS.favorites, []);
  return normalizeIds(Array.isArray(raw) ? raw : []);
}

export function isFavorite(calculatorId: string): boolean {
  return readFavorites().includes(calculatorId);
}

export function toggleFavorite(calculatorId: string): boolean {
  const next = toggleId(readFavorites(), calculatorId);
  writeJson(STORAGE_KEYS.favorites, next.values);
  notify("favorites");
  return next.active;
}

export function readRecent(): string[] {
  const raw = readJson<unknown>(STORAGE_KEYS.recent, []);
  return normalizeIds(Array.isArray(raw) ? raw : []);
}

export function markRecent(calculatorId: string): void {
  writeJson(STORAGE_KEYS.recent, addRecent(readRecent(), calculatorId));
  notify("recent");
}
