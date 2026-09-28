import { describe, expect, it } from "vitest";
import { PWA_ROUTE_CONTRACT } from "./contract";

describe("PWA route contract", () => {
  it("keeps every calculator and core workspace route in the offline contract", () => {
    expect(PWA_ROUTE_CONTRACT).toHaveLength(16);
    expect(new Set(PWA_ROUTE_CONTRACT).size).toBe(PWA_ROUTE_CONTRACT.length);
    for (const id of ["emi","sip","tax","gst","fd","rd","retirement","inflation","eligibility","rentvsbuy","cibil"]) {
      expect(PWA_ROUTE_CONTRACT).toContain(`/calculators/${id}`);
    }
  });
});
