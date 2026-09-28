import { describe, expect, it } from "vitest";
import { calculatorCatalog } from "./catalog";

describe("calculator catalog", () => {
  it("contains exactly the 11 confirmed live calculator experiences", () => {
    expect(calculatorCatalog).toHaveLength(11);
    expect(new Set(calculatorCatalog.map(item => item.id)).size).toBe(11);
  });

  it("routes every confirmed calculator through V7 dedicated URLs", () => {
    for (const item of calculatorCatalog) {
      expect(item.status).toBe("migrated");
      expect(item.href).toMatch(/^\/calculators\/[a-z0-9-]+$/);
    }
  });

  it("keeps every tool discoverable under a user-intent category", () => {
    for (const item of calculatorCatalog) {
      expect(item.category.length).toBeGreaterThan(0);
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.description.length).toBeGreaterThan(10);
    }
  });
});
