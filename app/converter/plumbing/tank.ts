// Tank ve depo hacmi: doluluk yüksekliğinden sıvı hacmi. Tüm ölçüler metre, sonuçlar m³.
// Yatay silindirde daire kesimi alanı, yarım küre başlarda küre kapağı formülü kullanılır.

export type TankShape =
  | { kind: "horizontal"; D: number; L: number; heads: "flat" | "hemi" } // L: silindirik gövde boyu (baş hariç)
  | { kind: "vertical"; D: number; H: number }
  | { kind: "box"; W: number; L: number; H: number };

/** Yarıçapı r olan dairede, tabandan h yüksekliğe kadar dolu kesim alanı. */
export function circleSegmentArea(r: number, h: number) {
  const x = Math.min(Math.max(h, 0), 2 * r);
  return r * r * Math.acos((r - x) / r) - (r - x) * Math.sqrt(Math.max(0, 2 * r * x - x * x));
}

/** Yarıçapı r olan kürede h yüksekliğindeki kapak hacmi (iki yarım küre baş = bir küre). */
export function sphereCapVolume(r: number, h: number) {
  const x = Math.min(Math.max(h, 0), 2 * r);
  return (Math.PI * x * x * (3 * r - x)) / 3;
}

/** Tankın iç yüksekliği (ölçü çubuğunun en büyük değeri). */
export function tankHeight(s: TankShape) {
  return s.kind === "horizontal" ? s.D : s.H;
}

/** Toplam iç hacim (m³). */
export function tankVolume(s: TankShape) {
  return filledVolume(s, tankHeight(s));
}

/** Tabandan `h` metre yüksekliğe kadar dolu hacim (m³). */
export function filledVolume(s: TankShape, h: number) {
  switch (s.kind) {
    case "horizontal": {
      const r = s.D / 2;
      const body = circleSegmentArea(r, h) * s.L;
      return s.heads === "hemi" ? body + sphereCapVolume(r, h) : body;
    }
    case "vertical":
      return Math.PI * (s.D / 2) ** 2 * Math.min(Math.max(h, 0), s.H);
    case "box":
      return s.W * s.L * Math.min(Math.max(h, 0), s.H);
  }
}

/** Belirli bir hacme (m³) karşılık gelen doluluk yüksekliği (m); ikiye bölme yöntemiyle. */
export function heightForVolume(s: TankShape, v: number) {
  const H = tankHeight(s);
  if (v <= 0) return 0;
  if (v >= tankVolume(s)) return H;
  let lo = 0;
  let hi = H;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (filledVolume(s, mid) < v) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Ölçü çubuğu (tank cetveli) tablosu: her `step` metrede litre. */
export function dipChart(s: TankShape, step: number) {
  const H = tankHeight(s);
  const rows: Array<{ h: number; liters: number }> = [];
  for (let h = 0; h < H - 1e-9; h += step) rows.push({ h, liters: filledVolume(s, h) * 1000 });
  rows.push({ h: H, liters: tankVolume(s) * 1000 });
  return rows;
}

/**
 * Sık kullanılan sıvıların yoğunluğu (kg/m³). Su 20 °C IAPWS değeri; motorin ve benzin
 * standartların 15 °C yoğunluk aralığının ortası (EN 590: 820–845, EN 228: 720–775).
 */
export const LIQUIDS = [
  { id: "su", label: "Su (20 °C)", rho: 998.2 },
  { id: "motorin", label: "Motorin (EN 590, 820–845)", rho: 832.5 },
  { id: "benzin", label: "Benzin (EN 228, 720–775)", rho: 747.5 },
] as const;
