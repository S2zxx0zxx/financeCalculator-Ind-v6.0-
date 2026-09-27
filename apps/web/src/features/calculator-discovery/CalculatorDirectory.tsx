import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { isFavorite, toggleFavorite } from "../preferences/tool-preferences";
import { calculatorCatalog } from "./catalog";

export function CalculatorDirectory() {
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
        <div><span className="eyebrow">DISCOVER</span><h2 id="calculator-directory-title">Calculators by intent</h2></div>
        <span className="quiet">{filtered.length} of {calculatorCatalog.length} confirmed tools</span>
      </div>
      <label className="tool-search">
        <span className="sr-only">Search calculators</span>
        <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search EMI, tax, retirement, GST…" />
        <kbd>/</kbd>
      </label>
      {filtered.length === 0 ? (
        <div className="empty-state"><strong>No matching calculator</strong><span>Try a goal like loan, tax, savings or retirement.</span></div>
      ) : categories.map(category => (
        <div className="category-group" key={category}>
          <h3>{category}</h3>
          <div className="tool-grid">
            {filtered.filter(x => x.category === category).map(tool => (
              <article className="tool-card" key={tool.id}>
                <div className="tool-card-head">
                  <strong>{tool.title}</strong>
                  <button
                    type="button"
                    className="favorite-button"
                    aria-label={isFavorite(tool.id) ? `Remove ${tool.title} from favorites` : `Add ${tool.title} to favorites`}
                    aria-pressed={isFavorite(tool.id)}
                    onClick={() => toggleFavorite(tool.id)}
                  >★</button>
                </div>
                <span>{tool.description}</span>
                <div className="tool-card-foot">
                  <em>{tool.status === "migrated" ? "V7 migrated" : "Legacy preserved"}</em>
                  {tool.status === "migrated"
                    ? <Link to={tool.href}>Open →</Link>
                    : <a href={tool.href}>Open legacy →</a>}
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
