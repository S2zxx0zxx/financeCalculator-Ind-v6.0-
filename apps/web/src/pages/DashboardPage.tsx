import { Link } from "react-router";
import { CalculatorDirectory } from "../features/calculator-discovery/CalculatorDirectory";
import { useI18n } from "../shared/i18n/useI18n";

export function DashboardPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="hero-panel">
        <span className="eyebrow">{t("home.eyebrow")}</span>
        <h1>{t("home.title")}</h1>
        <p>{t("home.description")}</p>
        <div className="hero-actions">
          <Link className="primary-button" to="/calculators/emi">{t("home.openEmi")}</Link>
          <a className="secondary-button" href="/index.html">{t("home.useCurrent")}</a>
        </div>
      </section>
      <CalculatorDirectory />
    </>
  );
}
