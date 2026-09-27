export function LegacyBridgePage({ kind }: { kind: "blog" }) {
  return (
    <section className="hero-panel">
      <span className="eyebrow">MIGRATION BRIDGE</span>
      <h1>{kind === "blog" ? "FinCalc Learn" : "FinCalc"}</h1>
      <p>The existing content experience remains available while its routes, SEO metadata and article structures are migrated with parity checks.</p>
      <a className="primary-button" href="/blog/">Open current blog</a>
    </section>
  );
}
