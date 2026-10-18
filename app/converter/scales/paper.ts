// Kâğıt boyutları, ISO 216 (A ve B serileri) ve ISO 269 (C zarf serisi): her boyut bir öncekinin uzun kenarının yarıya
// bölünmesiyle (milimetreye aşağı yuvarlanarak) elde edilir. A0 = 841 × 1189 mm (1 m²), B0 = 1000 × 1414 mm, C0 = 917 × 1297 mm.
// ABD boyutları ANSI/ASME Y14.1: Letter 8,5 × 11 inç, Legal 8,5 × 14 inç, Tabloid 11 × 17 inç.

export type PaperSize = { id: string; w: number; h: number };

function series(prefix: string, w0: number, h0: number, count: number): PaperSize[] {
  const out: PaperSize[] = [];
  let w = w0;
  let h = h0;
  for (let i = 0; i <= count; i++) {
    out.push({ id: `${prefix}${i}`, w, h });
    [w, h] = [Math.floor(h / 2), w];
  }
  return out;
}

export const A_SERIES = series("A", 841, 1189, 10);
export const B_SERIES = series("B", 1000, 1414, 10);
export const C_SERIES = series("C", 917, 1297, 8);
export const US_SIZES: PaperSize[] = [
  { id: "Letter", w: 215.9, h: 279.4 },
  { id: "Legal", w: 215.9, h: 355.6 },
  { id: "Tabloid", w: 279.4, h: 431.8 },
];
export const ALL_PAPER = [...A_SERIES, ...B_SERIES, ...C_SERIES, ...US_SIZES];

/** Verilen çözünürlükte (dpi) piksel boyutu; 1 inç = 25,4 mm. */
export const pixels = (mm: number, dpi: number) => Math.round((mm / 25.4) * dpi);
/** Tek yaprağın ağırlığı (g): alan (m²) × gramaj (g/m²). */
export const sheetWeight = (p: PaperSize, gsm: number) => (p.w / 1000) * (p.h / 1000) * gsm;
