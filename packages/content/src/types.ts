export interface LegacyArticleRoute {
  slug: string;
  legacyPath: `/blog/${string}.html`;
  migrationStatus: "preserved";
  factVerification: "pending";
}

export interface ContentSourceMeta {
  canonicalPath: string;
  legacyHtmlPreserved: boolean;
  currentFactsVerified: boolean;
}
