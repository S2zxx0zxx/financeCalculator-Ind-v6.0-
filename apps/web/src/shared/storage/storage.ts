export const STORAGE_KEYS = {
  theme: "fincalc-theme",
  language: "fincalc-lang",
  history: "fincalc-history",
  favorites: "fincalc-v7-favorites",
  recent: "fincalc-v7-recent",
  preferencesVersion: "fincalc-v7-preferences-version"
} as const;

const LEGACY_KEYS = {
  theme: ["fc-theme"] as const
};

export type ThemePreference = "light" | "dark" | "system";
export type LanguagePreference = "en" | "hi";

function available() {
  try {
    const key = "__fincalc_v7_storage_test__";
    localStorage.setItem(key, "1");
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export const browserStorage = {
  get(key: string): string | null {
    if (!available()) return null;
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key: string, value: string): boolean {
    if (!available()) return false;
    try { localStorage.setItem(key, value); return true; } catch { return false; }
  },
  remove(key: string): void {
    if (!available()) return;
    try { localStorage.removeItem(key); } catch { /* non-fatal */ }
  }
};

export function migrateLegacyPreferences(): void {
  if (!available()) return;
  if (!browserStorage.get(STORAGE_KEYS.theme)) {
    for (const key of LEGACY_KEYS.theme) {
      const legacy = browserStorage.get(key);
      if (legacy === "light" || legacy === "dark") {
        browserStorage.set(STORAGE_KEYS.theme, legacy);
        break;
      }
    }
  }
  browserStorage.set(STORAGE_KEYS.preferencesVersion, "1");
}

export function readTheme(): ThemePreference {
  const value = browserStorage.get(STORAGE_KEYS.theme);
  return value === "light" || value === "dark" || value === "system" ? value : "system";
}

export function readLanguage(): LanguagePreference {
  const value = browserStorage.get(STORAGE_KEYS.language);
  return value === "hi" ? "hi" : "en";
}

export function readJson<T>(key: string, fallback: T): T {
  const raw = browserStorage.get(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export function writeJson<T>(key: string, value: T): boolean {
  return browserStorage.set(key, JSON.stringify(value));
}
