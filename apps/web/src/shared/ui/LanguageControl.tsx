import { usePreferences } from "../../app/providers/PreferencesProvider";

export function LanguageControl() {
  const { language, setLanguage } = usePreferences();
  return (
    <div className="language-control" role="group" aria-label="Language">
      <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
      <button type="button" aria-pressed={language === "hi"} onClick={() => setLanguage("hi")}>हि</button>
    </div>
  );
}
