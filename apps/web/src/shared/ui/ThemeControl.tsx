import { usePreferences } from "../../app/providers/PreferencesProvider";

export function ThemeControl() {
  const { theme, setTheme } = usePreferences();
  return (
    <label className="theme-control">
      <span className="sr-only">Theme</span>
      <select value={theme} onChange={event => setTheme(event.target.value as "light" | "dark" | "system")} aria-label="Theme">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
