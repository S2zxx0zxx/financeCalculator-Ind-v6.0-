import type { ReactNode } from "react";
import { NavLink } from "react-router";
import { useI18n } from "../shared/i18n/useI18n";
import type { MessageKey } from "../shared/i18n/messages";
import { ThemeControl } from "../shared/ui/ThemeControl";
import { LanguageControl } from "../shared/ui/LanguageControl";

const nav: Array<{ to: string; labelKey: MessageKey }> = [
  { to: "/", labelKey: "nav.overview" },
  { to: "/calculators/emi", labelKey: "nav.calculators" },
  { to: "/activity", labelKey: "nav.activity" },
  { to: "/compare", labelKey: "nav.compare" },
  { to: "/learn", labelKey: "nav.learn" }
];

export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary">
        <NavLink className="brand" to="/" aria-label="FinCalc home">
          <span className="brand-mark">₹</span>
          <span><strong>FinCalc</strong><small>{t("brand.workspace")}</small></span>
        </NavLink>
        <nav className="side-nav">
          {nav.map(item => <NavLink key={item.to} to={item.to} end={item.to === "/"}>{t(item.labelKey)}</NavLink>)}
        </nav>
        <div className="sidebar-foot"><NavLink className="support-link" to="/contact">{t("nav.contact")}</NavLink><span>{t("app.previewNote")}</span></div>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <div><span className="eyebrow">FINCALC INDIA</span><strong>{t("app.tagline")}</strong></div>
          <div className="topbar-actions">
            <NavLink className="support-link top-support" to="/contact">{t("nav.contact")}</NavLink>
            <LanguageControl />
            <ThemeControl />
            <a className="legacy-link" href="/index.html">{t("app.currentFinCalc")} ↗</a>
          </div>
        </header>
        <main className="content">{children}</main>
        <nav className="bottom-nav" aria-label="Mobile primary">
          {nav.map(item => <NavLink key={item.to} to={item.to} end={item.to === "/"}>{t(item.labelKey)}</NavLink>)}
        </nav>
      </div>
    </div>
  );
}
