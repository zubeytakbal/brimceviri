// Kısmi dolu dairesel borularda yerçekimli akış: Prandtl-Colebrook hız formülü, hidrolik çap = 4·R.
// Bina içi atık su kapasite tablolarında (EN 12056-2) yaygın kabul kb = 1,0 mm ve 10 °C su (ν = 1,31·10⁻⁶ m²/s).

const G = 9.81;

/** Doluluk oranı h/d için ıslak kesit alanı (m²) ve hidrolik yarıçap (m). */
export function partialSection(d: number, fill: number) {
  const theta = 2 * Math.acos(1 - 2 * fill);
  const A = ((d * d) / 8) * (theta - Math.sin(theta));
  const P = (d * theta) / 2;
  return { A, R: A / P };
}

/** Akış hızı (m/s): v = −2·log10(kb/(3,71·dh) + 2,51·ν/(dh·√(2g·dh·J)))·√(2g·dh·J). */
export function velocity(dh: number, slope: number, kb = 0.001, nu = 1.31e-6) {
  const s = Math.sqrt(2 * G * dh * slope);
  return -2 * Math.log10(kb / (3.71 * dh) + (2.51 * nu) / (dh * s)) * s;
}

/** Kapasite: iç çap d (m), eğim J (m/m, %1 = 0,01), doluluk h/d. Q (m³/s) ve v (m/s). */
export function drainCapacity(d: number, slope: number, fill = 0.5, kb = 0.001) {
  if (d <= 0 || slope <= 0 || fill <= 0 || fill > 1) return null;
  const { A, R } = partialSection(d, fill);
  const v = velocity(4 * R, slope, kb);
  return { Q: A * v, v };
}

/** Verilen debiyi (m³/s) taşımak için gereken en az eğim (m/m); ikiye bölme ile. */
export function slopeForFlow(d: number, Q: number, fill = 0.5, kb = 0.001) {
  let lo = 1e-5;
  let hi = 0.5;
  if (drainCapacity(d, hi, fill, kb)!.Q < Q) return null;
  for (let i = 0; i < 80; i++) {
    const mid = Math.sqrt(lo * hi);
    if (drainCapacity(d, mid, fill, kb)!.Q < Q) lo = mid;
    else hi = mid;
  }
  return hi;
}

/** PVC atık su boruları: dış çap ve örnek et kalınlığıyla iç çap (mm). Et kalınlığı ürüne göre değişir. */
export const DRAIN_PIPES = [
  { id: "50", label: "Ø50", od: 50, wall: 1.8 },
  { id: "75", label: "Ø75", od: 75, wall: 1.8 },
  { id: "110", label: "Ø110 (100'lük)", od: 110, wall: 2.2 },
  { id: "125", label: "Ø125", od: 125, wall: 2.5 },
  { id: "160", label: "Ø160", od: 160, wall: 3.2 },
  { id: "200", label: "Ø200", od: 200, wall: 3.9 },
];
