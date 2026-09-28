export const MAX_RECENT = 8;

export function normalizeIds(values: readonly unknown[]): string[] {
  const result: string[] = [];
  const seen = new Set<string>();
  for (const value of values) {
    if (typeof value !== "string" || value.length === 0 || seen.has(value)) continue;
    seen.add(value);
    result.push(value);
  }
  return result;
}

export function toggleId(values: readonly string[], id: string): { values: string[]; active: boolean } {
  const normalized = normalizeIds(values);
  if (normalized.includes(id)) return { values: normalized.filter(value => value !== id), active: false };
  return { values: [id, ...normalized], active: true };
}

export function addRecent(values: readonly string[], id: string): string[] {
  return [id, ...normalizeIds(values).filter(value => value !== id)].slice(0, MAX_RECENT);
}
