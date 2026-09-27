import { useMemo, useState } from "react";
import { classifyLegacyCibil } from "@fincalc/finance-core";

function context(score: number) {
  if (score > 700) return "Official CIBIL guidance says a score above 700 is generally considered good. Higher scores can improve the chances of an application being reviewed favorably.";
  return "A higher CIBIL Score generally improves the chances of a loan or credit-card application being reviewed favorably. Approval still depends on the lender and other eligibility factors.";
}

export function CibilPage() {
  const [score, setScore] = useState(750);
  const legacy = useMemo(() => classifyLegacyCibil(score).values, [score]);
  const position = ((legacy.score - 300) / 600) * 100;

  return (
    <div className="calculator-layout">
      <section className="calc-intro">
        <span className="eyebrow">CREDIT · CIBIL</span>
        <h1>Understand your score without fake approval promises.</h1>
        <p>CIBIL Scores range from 300 to 900. FinCalc keeps its old band classification for migration continuity, while the V7 guidance uses current official CIBIL wording and avoids stale lender-rate claims.</p>
      </section>
      <section className="calculator-card">
        <div className="input-stack">
          <label>CIBIL Score <strong>{score}</strong>
            <input type="range" min="300" max="900" step="1" value={score} onChange={e => setScore(Number(e.target.value))} />
            <input type="number" inputMode="numeric" min="300" max="900" value={score} onChange={e => setScore(Math.min(900, Math.max(300, Number(e.target.value) || 300)))} />
          </label>
          <div className="credit-principles">
            <strong>What matters most</strong>
            <span>Pay dues on time</span>
            <span>Keep credit utilisation controlled</span>
            <span>Maintain healthy credit history</span>
            <span>Avoid unnecessary hard enquiries</span>
          </div>
        </div>
        <div className="result-panel" aria-live="polite" aria-atomic="true">
          <span className="eyebrow">YOUR SCORE POSITION</span>
          <div className="result-big">{legacy.score}<small> / 900</small></div>
          <div className="score-scale" role="img" aria-label={`CIBIL score ${legacy.score} on a scale from 300 to 900`}>
            <span className="score-marker" style={{ left: `${position}%` }} />
          </div>
          <div className="result-grid">
            <div><span>FinCalc legacy band</span><strong>{legacy.band.replace("-", " ")}</strong></div>
            <div><span>Legacy approval label</span><strong>{legacy.approvalLabel}</strong></div>
          </div>
          <p className="credit-context">{context(legacy.score)}</p>
          <div className="assumption-note">CIBIL does not approve or reject loans. Lenders make the final decision using their own credit policy and other application details.</div>
        </div>
      </section>
    </div>
  );
}
