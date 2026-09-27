import { Link } from "react-router";
import { calculatorCatalog } from "../features/calculator-discovery/catalog";

export function DashboardPage() {
  const categories = [...new Set(calculatorCatalog.map(item => item.category))];
  return (
    <>
      <section className="hero-panel">
        <span className="eyebrow">YOUR MONEY TOOLKIT</span>
        <h1>One calm workspace for every important money calculation.</h1>
        <p>FinCalc V7 is being rebuilt without sacrificing the formulas, articles, offline behavior or useful workflows already in production.</p>
        <div className="hero-actions">
          <Link className="primary-button" to="/calculators/emi">Open migrated EMI</Link>
          <a className="secondary-button" href="/index.html">Use current suite</a>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><span className="eyebrow">DISCOVER</span><h2>Calculators by intent</h2></div>
          <span className="quiet">{calculatorCatalog.length} confirmed legacy flows mapped</span>
        </div>
        {categories.map(category => (
          <div className="category-group" key={category}>
            <h3>{category}</h3>
            <div className="tool-grid">
              {calculatorCatalog.filter(x => x.category === category).map(tool => (
                tool.status === "migrated"
                  ? <Link className="tool-card" key={tool.id} to={tool.href}><strong>{tool.title}</strong><span>{tool.description}</span><em>V7 migrated</em></Link>
                  : <a className="tool-card" key={tool.id} href={tool.href}><strong>{tool.title}</strong><span>{tool.description}</span><em>Legacy preserved</em></a>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
