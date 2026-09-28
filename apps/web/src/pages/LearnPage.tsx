import { useMemo, useState } from "react";
import { legacyArticles } from "@fincalc/content";
import { NewsletterForm } from "../features/newsletter/NewsletterForm";
import { track } from "../shared/analytics/analytics";
import { useI18n } from "../shared/i18n/useI18n";

export function LearnPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...new Set(legacyArticles.map(article => article.category))], []);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return legacyArticles.filter(article => {
      const categoryMatch = category === "All" || article.category === category;
      const textMatch = !needle || `${article.title} ${article.category}`.toLowerCase().includes(needle);
      return categoryMatch && textMatch;
    });
  }, [query, category]);

  return (
    <div className="learn-page">
      <section className="calc-intro">
        <span className="eyebrow">{t("learn.eyebrow")}</span>
        <h1>{t("learn.title")}</h1>
        <p>{t("learn.description")}</p>
      </section>

      <div className="content-trust-note">{t("learn.trust")}</div>

      <section aria-labelledby="learn-library-title">
        <div className="section-heading">
          <div><span className="eyebrow">{t("learn.library")}</span><h2 id="learn-library-title">{t("learn.guides")}</h2></div>
          <span className="quiet">{filtered.length} / {legacyArticles.length}</span>
        </div>
        <div className="learn-toolbar">
          <input className="learn-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t("learn.search")} aria-label={t("learn.searchLabel")} />
          <div className="category-chips" role="group" aria-label={t("learn.filterLabel")}>
            {categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === "All" ? t("common.all") : item}</button>)}
          </div>
        </div>
      </section>

      {filtered.length ? (
        <div className="article-grid">
          {filtered.map(article => (
            <a className="article-card" key={article.slug} href={article.legacyPath} onClick={() => track({ name: "article_opened", articleSlug: article.slug })}>
              <span className="article-category">{article.category}</span>
              <h2>{article.title}</h2>
              <p>{t("learn.openPreserved")}</p>
              <footer><span>{t("learn.legacyUrl")}</span><span>{t("learn.factsPending")}</span></footer>
            </a>
          ))}
        </div>
      ) : <div className="empty-state"><strong>{t("learn.noMatch")}</strong><span>{t("learn.tryBroader")}</span></div>}

      <NewsletterForm />
    </div>
  );
}
