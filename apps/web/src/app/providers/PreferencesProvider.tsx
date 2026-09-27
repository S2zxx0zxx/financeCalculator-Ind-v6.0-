import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  browserStorage,
  migrateLegacyPreferences,
  readLanguage,
  readTheme,
  STORAGE_KEYS,
  type LanguagePreference,
  type ThemePreference
} from "../../shared/storage/storage";

interface PreferencesContextValue {
  theme: ThemePreference;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemePreference) => void;
  language: LanguagePreference;
  setLanguage: (language: LanguagePreference) => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function systemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>(() => {
    migrateLegacyPreferences();
    return readTheme();
  });
  const [language, setLanguageState] = useState<LanguagePreference>(() => readLanguage());
  const [system, setSystem] = useState<"light" | "dark">(() => systemTheme());
  const resolvedTheme = theme === "system" ? system : theme;

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystem(query.matches ? "dark" : "light");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const value = useMemo<PreferencesContextValue>(() => ({
    theme,
    resolvedTheme,
    setTheme(next) {
      setThemeState(next);
      browserStorage.set(STORAGE_KEYS.theme, next);
    },
    language,
    setLanguage(next) {
      setLanguageState(next);
      browserStorage.set(STORAGE_KEYS.language, next);
      document.documentElement.lang = next === "hi" ? "hi-IN" : "en-IN";
    }
  }), [theme, resolvedTheme, language]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("usePreferences must be used inside PreferencesProvider");
  return context;
}
