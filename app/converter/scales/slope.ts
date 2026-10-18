// Eğim gösterimleri arasında çeviri. Hepsi aynı tanjanta dayanır: eğim = dikey / yatay.
// Yüzde = tan(açı) × 100, binde = tan(açı) × 1000, 1:n oranında n = yatay / dikey = 1 / tan(açı).
// Yüzde 100'lük eğim 45°'dir; 90° (dikey) eğimin yüzde ve oran karşılığı tanımsızdır.

export type SlopeKind = "percent" | "degree" | "permille" | "ratio" | "rise";

export type Slope = { tan: number; degree: number; percent: number; permille: number; ratio: number | null };

const DEG = Math.PI / 180;

/** Girilen değeri ortak eğime çevirir. "rise" için değer cm/m'dir (1 metrede kaç cm yükselir) ve yüzdeyle aynı sayıdır. */
export function slopeFrom(kind: SlopeKind, value: number): Slope | null {
  if (!Number.isFinite(value) || value < 0) return null;
  let tan: number;
  switch (kind) {
    case "percent":
    case "rise":
      tan = value / 100;
      break;
    case "permille":
      tan = value / 1000;
      break;
    case "degree":
      if (value >= 90) return null;
      tan = Math.tan(value * DEG);
      break;
    case "ratio":
      if (value <= 0) return null;
      tan = 1 / value;
      break;
  }
  return { tan, degree: Math.atan(tan) / DEG, percent: tan * 100, permille: tan * 1000, ratio: tan > 0 ? 1 / tan : null };
}

/** Yatay mesafe ve eğimden yükseklik farkı (aynı birimde). */
export const riseOver = (slope: Slope, run: number) => slope.tan * run;
/** Eğim boyunca ölçülen (eğik) uzunluk. */
export const slopeLength = (slope: Slope, run: number) => run * Math.sqrt(1 + slope.tan * slope.tan);
