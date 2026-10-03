// Uzbek number format (space thousands, comma decimal) without Intl: Node has
// full ICU data for uz-UZ but Chromium does not, so Intl output would differ
// between the pre-rendered HTML and the browser and break hydration.
export function formatUz(n: number, maxDecimals = 0) {
  if (!Number.isFinite(n)) return "—";
  const factor = 10 ** maxDecimals;
  const r = Math.round(Math.abs(n) * factor) / factor;
  const [int, frac] = r.toFixed(maxDecimals).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const decimals = frac ? frac.replace(/0+$/, "") : "";
  return `${n < 0 && r !== 0 ? "-" : ""}${grouped}${decimals ? `,${decimals}` : ""}`;
}
