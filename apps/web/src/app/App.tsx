import { NavLink, Route, Routes } from "react-router";
import { DashboardPage } from "../pages/DashboardPage";
import { CalculatorRoutePage } from "../pages/CalculatorRoutePage";
import { LegacyBridgePage } from "../pages/LegacyBridgePage";
import { ThemeControl } from "../shared/ui/ThemeControl";
import { LanguageControl } from "../shared/ui/LanguageControl";
import { ActivityPage } from "../pages/ActivityPage";
import { ComparePage } from "../pages/ComparePage";

const nav = [
  { to: "/", label: "Overview" },
  { to: "/calculators/emi", label: "Calculators" },
  { to: "/activity", label: "Activity" },
  { to: "/compare", label: "Compare" },
  { to: "/learn", label: "Learn" }
];

export function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary">
        <a className="brand" href="/" aria-label="FinCalc home">
          <span className="brand-mark">₹</span>
          <span><strong>FinCalc</strong><small>Financial workspace</small></span>
        </a>
        <nav className="side-nav">
          {nav.map(item => <NavLink key={item.to} to={item.to} end={item.to === "/"}>{item.label}</NavLink>)}
        </nav>
        <div className="sidebar-foot">V7 preview · legacy-safe migration</div>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <div>
            <span className="eyebrow">FINCALC INDIA</span>
            <strong>Calculate. Understand. Decide.</strong>
          </div>
          <div className="topbar-actions"><LanguageControl /><ThemeControl /><a className="legacy-link" href="/index.html">Current FinCalc ↗</a></div>
        </header>
        <main className="content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/calculators/:calculatorId" element={<CalculatorRoutePage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/learn" element={<LegacyBridgePage kind="blog" />} />
            <Route path="*" element={<DashboardPage />} />
          </Routes>
        </main>
        <nav className="bottom-nav" aria-label="Mobile primary">
          {nav.map(item => <NavLink key={item.to} to={item.to} end={item.to === "/"}>{item.label}</NavLink>)}
        </nav>
      </div>
    </div>
  );
}
