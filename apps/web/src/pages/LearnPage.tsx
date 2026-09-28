import { useMemo, useState } from "react";
import { legacyArticles } from "@fincalc/content";
import { track } from "../shared/analytics/analytics";

export function LearnPage() {
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
        <span className="eyebrow">FINCALC LEARN · 29 GUIDES PRESERVED</span>
        <h1>Learn the money concept, then model your own numbers.</h1>
        <p>The new discovery layer is live inside V7 while every indexed article keeps its existing public URL. Historical finance facts are not relabelled as current unless separately verified.</p>
      </section>

      <div className="content-trust-note">
        UI migration ≠ factual update. Articles marked from the March–April 2026 archive remain preserved snapshots until their time-sensitive claims are re-verified from authoritative sources.
      </div>

      <section aria-labelledby="learn-library-title">
        <div className="section-heading">
          <div><span className="eyebrow">LIBRARY</span><h2 id="learn-library-title">Finance guides</h2></div>
          <span className="quiet">{filtered.length} of {legacyArticles.length}</span>
        </div>
        <div className="learn-toolbar">
          <input className="learn-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search tax, EMI, gold, CIBIL, NRI…" aria-label="Search finance guides" />
          <div className="category-chips" role="group" aria-label="Filter article category">
            {categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
        </div>
      </section>

      {filtered.length ? (
        <div className="article-grid">
          {filtered.map(article => (
            <a
              className="article-card"
              key={article.slug}
              href={article.legacyPath}
              onClick={() => track({ name: "article_opened", articleSlug: article.slug })}
            >
              <span className="article-category">{article.category}</span>
              <h2>{article.title}</h2>
              <p>Open the preserved article at its existing indexed URL.</p>
              <footer><span>Legacy URL preserved</span><span>Facts: verification pending</span></footer>
            </a>
          ))}
        </div>
      ) : <div className="empty-state"><strong>No matching guide</strong><span>Try a broader topic or choose All.</span></div>}
    </div>
  );
}
