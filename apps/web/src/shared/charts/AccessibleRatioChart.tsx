interface Segment {
  label: string;
  value: number;
  formatted: string;
}

export function AccessibleRatioChart({ title, segments }: { title: string; segments: [Segment, Segment] }) {
  const total = segments[0].value + segments[1].value;
  const firstPercent = total > 0 ? (segments[0].value / total) * 100 : 0;
  const secondPercent = total > 0 ? 100 - firstPercent : 0;
  const description = `${segments[0].label} ${firstPercent.toFixed(1)}%; ${segments[1].label} ${secondPercent.toFixed(1)}%.`;

  return (
    <figure className="ratio-chart">
      <figcaption>
        <strong>{title}</strong>
        <span>{description}</span>
      </figcaption>
      <div className="ratio-chart-track" role="img" aria-label={description}>
        <span className="ratio-chart-first" style={{ width: `${Math.max(0, Math.min(100, firstPercent))}%` }} />
        <span className="ratio-chart-second" aria-hidden="true" />
      </div>
      <table className="ratio-chart-table">
        <thead><tr><th scope="col">Component</th><th scope="col">Amount</th><th scope="col">Share</th></tr></thead>
        <tbody>
          <tr><th scope="row">{segments[0].label}</th><td>{segments[0].formatted}</td><td>{firstPercent.toFixed(1)}%</td></tr>
          <tr><th scope="row">{segments[1].label}</th><td>{segments[1].formatted}</td><td>{secondPercent.toFixed(1)}%</td></tr>
        </tbody>
      </table>
    </figure>
  );
}
