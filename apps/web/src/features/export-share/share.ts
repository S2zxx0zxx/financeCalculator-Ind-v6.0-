import type { CalculationRecord } from "../history/model";

export function humanizeLabel(value: string): string {
  return value.replace(/([A-Z])/g, " $1").replace(/[-_]+/g, " ").replace(/^./, c => c.toUpperCase()).trim();
}

export function buildShareText(record: CalculationRecord): string {
  const lines = [
    `FinCalc — ${record.calculatorTitle}`,
    ...Object.entries(record.summary).map(([key, value]) => `${humanizeLabel(key)}: ${value}`),
    "Calculate your own scenario at satzzxzxx.me"
  ];
  return lines.join("\n");
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[char] ?? char));
}

export function buildPrintHtml(record: CalculationRecord): string {
  const rows = Object.entries(record.summary)
    .map(([key,value]) => `<tr><th>${escapeHtml(humanizeLabel(key))}</th><td>${escapeHtml(value)}</td></tr>`)
    .join("");
  const inputs = Object.entries(record.inputs)
    .map(([key,value]) => `<tr><th>${escapeHtml(humanizeLabel(key))}</th><td>${escapeHtml(String(value))}</td></tr>`)
    .join("");
  const generated = Number.isNaN(Date.parse(record.createdAt)) ? "Unknown date" : new Date(record.createdAt).toLocaleString("en-IN");
  return `<!doctype html><html><head><meta charset="utf-8"><title>FinCalc — ${escapeHtml(record.calculatorTitle)}</title>
  <style>body{font:14px system-ui;max-width:760px;margin:40px auto;color:#15181d}h1{font-size:30px}small{color:#68707c}table{width:100%;border-collapse:collapse;margin:20px 0}th,td{padding:10px;border-bottom:1px solid #ddd;text-align:left}td{text-align:right}.note{margin-top:24px;padding:14px;background:#f3f4f6;border-radius:10px;font-size:11px}</style>
  </head><body><div>₹ <strong>FinCalc India</strong></div><h1>${escapeHtml(record.calculatorTitle)}</h1><small>Generated ${escapeHtml(generated)}</small>
  <h2>Result</h2><table>${rows}</table><h2>Inputs</h2><table>${inputs}</table>
  <div class="note">Informational estimate only. Assumptions and actual outcomes can vary. Verify tax, lending and investment decisions from authoritative sources or a qualified professional where appropriate.</div>
  <script>window.onload=()=>window.print();<\/script></body></html>`;
}

export async function copyCalculation(record: CalculationRecord): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(buildShareText(record));
    return true;
  } catch {
    return false;
  }
}

export async function nativeShare(record: CalculationRecord): Promise<"shared" | "unavailable" | "cancelled"> {
  if (!navigator.share) return "unavailable";
  try {
    await navigator.share({ title: `FinCalc — ${record.calculatorTitle}`, text: buildShareText(record) });
    return "shared";
  } catch {
    return "cancelled";
  }
}

export function shareWhatsApp(record: CalculationRecord): void {
  const url = `https://wa.me/?text=${encodeURIComponent(buildShareText(record))}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function printCalculation(record: CalculationRecord): void {
  const popup = window.open("", "_blank", "noopener,noreferrer");
  if (!popup) return;
  popup.document.open();
  popup.document.write(buildPrintHtml(record));
  popup.document.close();
}
