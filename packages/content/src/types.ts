export interface LegacyArticleRoute {
  slug: string;
  title: string;
  category: string;
  legacyPath: `/blog/${string}.html`;
  migrationStatus: "preserved";
  factVerification: "pending" | "verified";
}

export interface ContentSourceMeta {
  canonicalPath: string;
  legacyHtmlPreserved: boolean;
  currentFactsVerified: boolean;
}
