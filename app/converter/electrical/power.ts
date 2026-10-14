// AC güç üçgeni, kompanzasyon, motor devri ve direnç renk kodu.

export type Phase = "single" | "three";

/** Görünür güçten akım (A). S VA, V volt (üç fazda fazlar arası). */
export const currentFromApparent = (S: number, V: number, phase: Phase) => (phase === "three" ? S / (Math.sqrt(3) * V) : S / V);
export const apparentFromCurrent = (I: number, V: number, phase: Phase) => (phase === "three" ? Math.sqrt(3) * V * I : V * I);

/** Güç üçgeni: P = S·cosφ, Q = S·sinφ. */
export function powerTriangle(S: number, cosPhi: number) {
  const sinPhi = Math.sqrt(Math.max(0, 1 - cosPhi * cosPhi));
  return { P: S * cosPhi, Q: S * sinPhi, S };
}

/** Güç faktörünü cosφ1'den cosφ2'ye çıkarmak için gereken reaktif güç (var): Qc = P (tanφ1 − tanφ2). */
export function compensationVar(P: number, cosPhi1: number, cosPhi2: number) {
  const tan = (c: number) => Math.sqrt(1 - c * c) / c;
  return P * (tan(cosPhi1) - tan(cosPhi2));
}

/** Kondansatör kapasitesi (F): tek fazlı eşdeğer, C = Q / (2π f V²). */
export const capacitanceForVar = (Q: number, V: number, f: number) => Q / (2 * Math.PI * f * V * V);

/**
 * Üç fazlı bankta faz başına kapasite (F). Üçgen bağlamada her kondansatör fazlar arası gerilimi,
 * yıldızda faz-nötr gerilimini görür; toplam Q üç kondansatöre eşit bölünür.
 */
export function capacitancePerPhase(Qtotal: number, lineV: number, f: number, connection: "delta" | "star") {
  const V = connection === "delta" ? lineV : lineV / Math.sqrt(3);
  return capacitanceForVar(Qtotal / 3, V, f);
}

/** Senkron devir (dev/dk): n = 120·f / p (p kutup sayısı). */
export const synchronousSpeed = (f: number, poles: number) => (120 * f) / poles;
/** Kayma (%) = (ns − n) / ns. */
export const slipPercent = (ns: number, n: number) => ((ns - n) / ns) * 100;

/* ---------------- Direnç renk kodu (IEC 60062) ---------------- */

export type ColorId = "black" | "brown" | "red" | "orange" | "yellow" | "green" | "blue" | "violet" | "grey" | "white" | "gold" | "silver";

export const COLORS: Array<{ id: ColorId; tr: string; hex: string; digit: number | null; multiplier: number; tolerance: number | null; tempco: number | null }> = [
  { id: "black", tr: "Siyah", hex: "#111111", digit: 0, multiplier: 1, tolerance: null, tempco: 250 },
  { id: "brown", tr: "Kahverengi", hex: "#7a4a1e", digit: 1, multiplier: 10, tolerance: 1, tempco: 100 },
  { id: "red", tr: "Kırmızı", hex: "#d32f2f", digit: 2, multiplier: 100, tolerance: 2, tempco: 50 },
  { id: "orange", tr: "Turuncu", hex: "#f57c00", digit: 3, multiplier: 1e3, tolerance: null, tempco: 15 },
  { id: "yellow", tr: "Sarı", hex: "#fbc02d", digit: 4, multiplier: 1e4, tolerance: null, tempco: 25 },
  { id: "green", tr: "Yeşil", hex: "#388e3c", digit: 5, multiplier: 1e5, tolerance: 0.5, tempco: 20 },
  { id: "blue", tr: "Mavi", hex: "#1976d2", digit: 6, multiplier: 1e6, tolerance: 0.25, tempco: 10 },
  { id: "violet", tr: "Mor", hex: "#7b1fa2", digit: 7, multiplier: 1e7, tolerance: 0.1, tempco: 5 },
  { id: "grey", tr: "Gri", hex: "#808080", digit: 8, multiplier: 1e8, tolerance: 0.05, tempco: 1 },
  { id: "white", tr: "Beyaz", hex: "#f5f5f5", digit: 9, multiplier: 1e9, tolerance: null, tempco: null },
  { id: "gold", tr: "Altın", hex: "#c9a227", digit: null, multiplier: 0.1, tolerance: 5, tempco: null },
  { id: "silver", tr: "Gümüş", hex: "#b0b0b0", digit: null, multiplier: 0.01, tolerance: 10, tempco: null },
];

const byId = (id: ColorId) => COLORS.find((c) => c.id === id)!;

/** Bantlardan direnç değeri. 4 bant: 2 hane; 5 ve 6 bant: 3 hane. */
export function decodeBands(bands: ColorId[]) {
  const digitsCount = bands.length === 4 ? 2 : 3;
  const digits = bands.slice(0, digitsCount).map((b) => byId(b).digit);
  if (digits.some((d) => d === null)) return null;
  const base = Number(digits.join(""));
  const mult = byId(bands[digitsCount]).multiplier;
  const tol = byId(bands[digitsCount + 1])?.tolerance ?? null;
  const tempco = bands.length === 6 ? byId(bands[5]).tempco : null;
  const ohms = base * mult;
  return { ohms, tolerance: tol, min: tol ? ohms * (1 - tol / 100) : null, max: tol ? ohms * (1 + tol / 100) : null, tempco };
}

/** Değerden bant renkleri (4 veya 5 bant), tolerans bandı hariç. Değer gösterilemiyorsa null. */
export function encodeValue(ohms: number, bandCount: 4 | 5): ColorId[] | null {
  const sig = bandCount === 4 ? 2 : 3;
  if (!(ohms > 0)) return null;
  for (const m of COLORS.filter((c) => c.multiplier > 0)) {
    const base = ohms / m.multiplier;
    const rounded = Math.round(base);
    if (Math.abs(base - rounded) > 1e-6 * Math.max(1, base)) continue;
    const s = String(rounded);
    if (s.length !== sig) continue;
    const digits = s.split("").map((ch) => COLORS.find((c) => c.digit === Number(ch))!.id);
    return [...digits, m.id];
  }
  return null;
}

/** Ohm değerini okunur biçime çevirir (Ω, kΩ, MΩ, GΩ). */
export function formatOhms(ohms: number) {
  const units: Array<[number, string]> = [
    [1e9, "GΩ"],
    [1e6, "MΩ"],
    [1e3, "kΩ"],
    [1, "Ω"],
  ];
  for (const [v, u] of units) if (ohms >= v) return `${(ohms / v).toLocaleString("tr-TR", { maximumFractionDigits: 3 })} ${u}`;
  return `${ohms.toLocaleString("tr-TR", { maximumFractionDigits: 3 })} Ω`;
}
