import { usePreferences } from "../../app/providers/PreferencesProvider";
import { messages, type MessageKey } from "./messages";

export function useI18n() {
  const { language } = usePreferences();
  return {
    language,
    t(key: MessageKey): string {
      return messages[language][key];
    }
  };
}
