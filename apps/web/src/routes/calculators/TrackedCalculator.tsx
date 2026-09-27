import { useEffect, type ReactNode } from "react";
import { markRecent } from "../../features/preferences/tool-preferences";

export function TrackedCalculator({ id, children }: { id: string; children: ReactNode }) {
  useEffect(() => { markRecent(id); }, [id]);
  return children;
}
