import { useLocation } from "react-router";

export interface SavedScenarioNavigationState {
  savedScenario?: {
    recordId: string;
    inputs: Record<string, number | string | boolean>;
  };
}

export function useSavedScenario() {
  const location = useLocation();
  const state = location.state as SavedScenarioNavigationState | null;
  return state?.savedScenario ?? null;
}

export function savedNumber(
  inputs: Record<string, number | string | boolean> | undefined,
  key: string,
  fallback: number
): number {
  const raw = inputs?.[key];
  const value = typeof raw === "number" ? raw : Number(raw);
  return Number.isFinite(value) ? value : fallback;
}
