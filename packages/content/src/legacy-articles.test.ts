import { describe, expect, it } from "vitest";
import { legacyArticles, LEGACY_ARTICLE_COUNT } from "./legacy-articles";

describe("legacy article route contract", () => {
  it("freezes all 29 article routes", () => {
    expect(LEGACY_ARTICLE_COUNT).toBe(29);
    expect(new Set(legacyArticles.map(article => article.slug)).size).toBe(29);
    expect(new Set(legacyArticles.map(article => article.legacyPath)).size).toBe(29);
  });

  it("preserves legacy .html URLs until replacement parity is proven", () => {
    for (const article of legacyArticles) {
      expect(article.legacyPath).toBe(`/blog/${article.slug}.html`);
      expect(article.migrationStatus).toBe("preserved");
      expect(article.title.length).toBeGreaterThan(8);
      expect(article.category.length).toBeGreaterThan(2);
    }
  });

  it("does not silently mark historical finance content as current", () => {
    for (const article of legacyArticles) expect(article.factVerification).toBe("pending");
  });
});
