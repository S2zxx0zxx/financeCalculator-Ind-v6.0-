import type { ReactNode } from "react";
import { NavLink } from "react-router";
import { ThemeControl } from "../shared/ui/ThemeControl";
import { LanguageControl } from "../shared/ui/LanguageControl";

const nav = [
  { to: "/", label: "Overview" },
  { to: "/calculators/emi", label: "Calculators" },
  { to: "/activity", label: "Activity" },
  { to: "/compare", label: "Compare" },
  { to: "/learn", label: "Learn" }
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary">
        <NavLink className="brand" to="/" aria-label="FinCalc home">
          <span className="brand-mark">₹</span>
          <span><strong>FinCalc</strong><small>Financial workspace</small></span>
        </NavLink>
        <nav className="side-nav">
          {nav.map(item => <NavLink key={item.to} to={item.to} end={item.to === "/"}>{item.label}</NavLink>)}
        </nav>
        <div className="sidebar-foot">V7 preview · preservation-first rebuild</div>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <div>
            <span className="eyebrow">FINCALC INDIA</span>
            <strong>Calculate. Understand. Decide.</strong>
          </div>
          <div className="topbar-actions">
            <LanguageControl />
            <ThemeControl />
            <a className="legacy-link" href="/index.html">Current FinCalc ↗</a>
          </div>
        </header>
        <main className="content">{children}</main>
        <nav className="bottom-nav" aria-label="Mobile primary">
          {nav.map(item => <NavLink key={item.to} to={item.to} end={item.to === "/"}>{item.label}</NavLink>)}
        </nav>
      </div>
    </div>
  );
}
