import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useI18n } from "../../shared/i18n/useI18n";
import { isFavorite, toggleFavorite } from "../preferences/tool-preferences";
import { calculatorCatalog } from "./catalog";

export function CalculatorDirectory() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [, forceFavorites] = useState(0);
  useEffect(() => {
    const refresh = () => forceFavorites(value => value + 1);
    window.addEventListener("fincalc:favorites-changed", refresh);
    return () => window.removeEventListener("fincalc:favorites-changed", refresh);
  }, []);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return calculatorCatalog;
    return calculatorCatalog.filter(tool =>
      [tool.title, tool.description, tool.category, tool.id].some(value => value.toLowerCase().includes(needle))
    );
  }, [query]);
  const categories = [...new Set(filtered.map(item => item.category))];

  return (
    <section className="section-block" aria-labelledby="calculator-directory-title">
      <div className="section-heading">
        <div><span className="eyebrow">{t("directory.eyebrow")}</span><h2 id="calculator-directory-title">{t("directory.title")}</h2></div>
        <span className="quiet">{filtered.length} / {calculatorCatalog.length} {t("directory.confirmedTools")}</span>
      </div>
      <label className="tool-search">
        <span className="sr-only">{t("directory.searchLabel")}</span>
        <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t("directory.search")} />
        <kbd>/</kbd>
      </label>
      {filtered.length === 0 ? (
        <div className="empty-state"><strong>{t("directory.noMatch")}</strong><span>{t("directory.tryGoal")}</span></div>
      ) : categories.map(category => (
        <div className="category-group" key={category}>
          <h3>{category}</h3>
          <div className="tool-grid">
            {filtered.filter(x => x.category === category).map(tool => {
              const favorite = isFavorite(tool.id);
              return (
                <article className="tool-card" key={tool.id}>
                  <div className="tool-card-head">
                    <strong>{tool.title}</strong>
                    <button
                      type="button"
                      className="favorite-button"
                      aria-label={`${favorite ? t("directory.removeFavorite") : t("directory.addFavorite")} ${tool.title}`}
                      aria-pressed={favorite}
                      onClick={() => toggleFavorite(tool.id)}
                    >★</button>
                  </div>
                  <span>{tool.description}</span>
                  <div className="tool-card-foot">
                    <em>{tool.status === "migrated" ? t("directory.migrated") : t("directory.legacy")}</em>
                    {tool.status === "migrated"
                      ? <Link to={tool.href}>{t("directory.open")} →</Link>
                      : <a href={tool.href}>{t("directory.openLegacy")} →</a>}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
