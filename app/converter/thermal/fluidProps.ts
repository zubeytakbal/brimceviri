// Üretilmiş akışkan tablolarından doğrusal ara değer bulma ve standart atmosfer basıncı.
import { BOILING_KPA, type AirRow, type SatRow, type WaterRow } from "./fluidTables";

/** Sıralı bir tabloda x'e göre doğrusal ara değer; aralık dışında null. */
export function interpolate<T extends Record<string, number>>(rows: T[], xKey: keyof T, x: number, yKey: keyof T): number | null {
  if (!Number.isFinite(x) || rows.length === 0) return null;
  const first = rows[0][xKey];
  const last = rows[rows.length - 1][xKey];
  if (x < first || x > last) return null;
  for (let i = 1; i < rows.length; i++) {
    const a = rows[i - 1];
    const b = rows[i];
    if (x <= b[xKey]) {
      const t = (x - a[xKey]) / (b[xKey] - a[xKey]);
      return a[yKey] + t * (b[yKey] - a[yKey]);
    }
  }
  return null;
}

export function interpolateRow<T extends Record<string, number>>(rows: T[], xKey: keyof T, x: number): T | null {
  const keys = Object.keys(rows[0]) as Array<keyof T>;
  const out = {} as T;
  for (const k of keys) {
    const v = interpolate(rows, xKey, x, k);
    if (v === null) return null;
    out[k] = v as T[keyof T];
  }
  return out;
}

export type { AirRow, SatRow, WaterRow };

/** ICAO standart atmosferinde rakıma göre basınç (kPa), troposfer (≤ 11 km). */
export function isaPressureKpa(elevationM: number) {
  return 101.325 * Math.pow(1 - 2.25577e-5 * elevationM, 5.25588);
}

/** Verilen mutlak basınçta (kPa) suyun kaynama noktası (°C), IAPWS-95 tablosundan; 25–110 kPa. */
export function boilingPointC(pressureKpa: number): number | null {
  const rows = BOILING_KPA.map(([p, t]) => ({ p, t }));
  return interpolate(rows, "p", pressureKpa, "t");
}

const LOG_KEYS = new Set<keyof SatRow>(["p", "vg"]);

/**
 * Doymuş buhar tablosunda ara değer. Basınç ve buhar özgül hacmi sıcaklıkla üstel değiştiği için
 * bu ikisi (ve basınçla arama yapılırken x ekseni) logaritmik ölçekte ara değerlenir.
 */
export function interpolateSat(rows: SatRow[], by: "t" | "p", x: number): SatRow | null {
  if (!Number.isFinite(x) || (by === "p" && x <= 0)) return null;
  const first = rows[0][by];
  const last = rows[rows.length - 1][by];
  if (x < first || x > last) return null;
  const tx = (v: number) => (by === "p" ? Math.log(v) : v);
  for (let i = 1; i < rows.length; i++) {
    const a = rows[i - 1];
    const b = rows[i];
    if (x <= b[by]) {
      const f = (tx(x) - tx(a[by])) / (tx(b[by]) - tx(a[by]));
      const out = {} as SatRow;
      for (const k of Object.keys(a) as Array<keyof SatRow>) {
        out[k] = LOG_KEYS.has(k) ? Math.exp(Math.log(a[k]) + f * (Math.log(b[k]) - Math.log(a[k]))) : a[k] + f * (b[k] - a[k]);
      }
      out[by] = x;
      return out;
    }
  }
  return null;
}
