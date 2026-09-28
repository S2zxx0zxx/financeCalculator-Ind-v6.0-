import { sanitizeEvent, type FinCalcEvent } from "./events";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: FinCalcEvent): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const safe = sanitizeEvent(event);
  const { name, ...params } = safe;
  window.gtag("event", name, params);
}
