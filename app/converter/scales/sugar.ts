// Şeker ve yoğunluk dereceleri: Brix (°Bx), Baumé (°Bé), özgül ağırlık (SG) ve Öchsle (°Oe).
// Brix ↔ SG: ASBC Plato denklemi (°P = 135,997·SG³ − 630,272·SG² + 1111,14·SG − 616,868); Brix ile Plato pratikte eşit kabul edilir.
// Baumé (sudan ağır sıvılar, ABD/modern ölçek): °Bé = 145 − 145 / SG. Öchsle: °Oe = (SG − 1) × 1000.
// Değerler 20 °C içindir ve yaklaşıktır; refraktometre ve hidrometre tabloları küçük farklar gösterebilir.

export type SugarKind = "brix" | "baume" | "sg" | "oechsle";
export type Sugar = { brix: number; baume: number; sg: number; oechsle: number };

export const brixFromSg = (sg: number) => 135.997 * sg ** 3 - 630.272 * sg ** 2 + 1111.14 * sg - 616.868;

const SG_MIN = 1;
const SG_MAX = 1.5;

function sgFromBrix(brix: number) {
  let lo = SG_MIN;
  let hi = SG_MAX;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (brixFromSg(mid) < brix) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Girilen değeri diğer ölçeklere çevirir; 0–85 °Bx (SG 1,000–1,45) aralığı dışında null. */
export function sugarFrom(kind: SugarKind, value: number): Sugar | null {
  if (!Number.isFinite(value)) return null;
  const sg = kind === "sg" ? value : kind === "oechsle" ? 1 + value / 1000 : kind === "baume" ? 145 / (145 - value) : sgFromBrix(value);
  if (!(sg >= 0.9999 && sg <= 1.45)) return null;
  const brix = Math.max(0, brixFromSg(sg));
  if (kind === "brix" && (value < 0 || value > 85)) return null;
  return { brix, sg, baume: 145 - 145 / sg, oechsle: (sg - 1) * 1000 };
}
