import { useEffect, type ReactNode } from "react";
import { markRecent } from "../../features/preferences/tool-preferences";
import { track } from "../../shared/analytics/analytics";

export function TrackedCalculator({ id, children }: { id: string; children: ReactNode }) {
  useEffect(() => {
    markRecent(id);
    track({ name: "calculator_opened", calculatorId: id });
  }, [id]);
  return children;
}
