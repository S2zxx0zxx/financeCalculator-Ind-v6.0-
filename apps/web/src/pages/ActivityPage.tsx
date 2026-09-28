import { useEffect, useState } from "react";
import { Link } from "react-router";
import { calculatorCatalog } from "../features/calculator-discovery/catalog";
import { deleteCalculation, readCalculationHistory, readLegacyHistory, type CalculationRecord } from "../features/history/storage";
import { readFavorites, readRecent } from "../features/preferences/tool-preferences";

function useActivityState() {
  const [history, setHistory] = useState<CalculationRecord[]>(() => readCalculationHistory());
  const [favorites, setFavorites] = useState(() => readFavorites());
  const [recent, setRecent] = useState(() => readRecent());
  useEffect(() => {
    const refreshHistory = () => setHistory(readCalculationHistory());
    const refreshFavorites = () => setFavorites(readFavorites());
    const refreshRecent = () => setRecent(readRecent());
    window.addEventListener("fincalc:history-changed", refreshHistory);
    window.addEventListener("fincalc:favorites-changed", refreshFavorites);
    window.addEventListener("fincalc:recent-changed", refreshRecent);
    return () => {
      window.removeEventListener("fincalc:history-changed", refreshHistory);
      window.removeEventListener("fincalc:favorites-changed", refreshFavorites);
      window.removeEventListener("fincalc:recent-changed", refreshRecent);
    };
  }, []);
  return { history, favorites, recent };
}

export function ActivityPage() {
  const { history, favorites, recent } = useActivityState();
  const legacyCount = readLegacyHistory().length;
  const byId = new Map(calculatorCatalog.map(item => [item.id, item]));
  return (
    <div className="activity-page">
      <section className="calc-intro">
        <span className="eyebrow">YOUR FINCALC</span>
        <h1>Pick up where you left off.</h1>
        <p>Recent tools, favorites and saved calculations stay local on this device unless you explicitly choose cloud sync in a future account layer.</p>
      </section>

      <section className="activity-section">
        <div className="section-heading"><div><span className="eyebrow">RECENT</span><h2>Recently opened</h2></div></div>
        <div className="tool-grid">
          {recent.map(id => byId.get(id)).filter(Boolean).map(tool => tool && <Link className="tool-card" to={tool.href} key={tool.id}><strong>{tool.title}</strong><span>{tool.description}</span></Link>)}
          {recent.length === 0 ? <div className="empty-state"><strong>No recent tools yet</strong><span>Open a calculator and it will appear here.</span></div> : null}
        </div>
      </section>

      <section className="activity-section">
        <div className="section-heading"><div><span className="eyebrow">FAVORITES</span><h2>Your shortcuts</h2></div></div>
        <div className="tool-grid">
          {favorites.map(id => byId.get(id)).filter(Boolean).map(tool => tool && <Link className="tool-card" to={tool.href} key={tool.id}><strong>{tool.title}</strong><span>{tool.description}</span></Link>)}
          {favorites.length === 0 ? <div className="empty-state"><strong>No favorites yet</strong><span>Star calculators from the directory for quicker access.</span></div> : null}
        </div>
      </section>

      <section className="activity-section">
        <div className="section-heading">
          <div><span className="eyebrow">HISTORY</span><h2>Saved calculations</h2></div>
          {legacyCount > 0 ? <span className="quiet">{legacyCount} legacy records preserved separately</span> : null}
        </div>
        <div className="history-grid">
          {history.map(record => (
            <article className="history-card" key={record.id}>
              <div><span className="eyebrow">{new Date(record.createdAt).toLocaleString("en-IN")}</span><h3>{record.calculatorTitle}</h3></div>
              <dl>{Object.entries(record.summary).slice(0,4).map(([key,value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
              <div className="history-actions">
                <Link to={`/calculators/${record.calculatorId}`} state={{ savedScenario: { recordId: record.id, inputs: record.inputs } }}>Load scenario</Link>
                <button type="button" onClick={() => deleteCalculation(record.id)}>Delete</button>
              </div>
            </article>
          ))}
          {history.length === 0 ? <div className="empty-state"><strong>No V7 calculations saved yet</strong><span>Your old FinCalc history remains untouched.</span></div> : null}
        </div>
      </section>
    </div>
  );
}
