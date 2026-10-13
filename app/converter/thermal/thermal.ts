// Isı ve akışkan hesapları: U değeri, ısı eşanjörü (LMTD), pompa gücü, debiden ısı yükü.
// Birimler SI (W, K, m, kg); arayüz kW, °C, m³/h gibi pratik birimlere çevirir.

/* ---------------- U değeri ---------------- */

/** Isı akış yönüne göre iç ve dış yüzey ısıl dirençleri (m²K/W), EN ISO 6946 Tablo 7. */
export const SURFACE_RESISTANCE = {
  horizontal: { Rsi: 0.13, Rse: 0.04, label: "Yatay (duvar)" },
  upward: { Rsi: 0.1, Rse: 0.04, label: "Yukarı (çatı, tavan)" },
  downward: { Rsi: 0.17, Rse: 0.04, label: "Aşağı (döşeme)" },
} as const;
export type HeatFlowDirection = keyof typeof SURFACE_RESISTANCE;

export type Layer = { thicknessM: number; lambda: number };

/** Katmanın ısıl direnci R = d / λ (m²K/W). */
export const layerResistance = (l: Layer) => l.thicknessM / l.lambda;

/** Toplam direnç ve U değeri (W/m²K). */
export function uValue(layers: Layer[], direction: HeatFlowDirection = "horizontal") {
  const { Rsi, Rse } = SURFACE_RESISTANCE[direction];
  const R = Rsi + Rse + layers.reduce((s, l) => s + layerResistance(l), 0);
  return { R, U: 1 / R, Rsi, Rse };
}

/** İletimle ısı kaybı (W): Q = U · A · ΔT. */
export const heatLoss = (U: number, area: number, deltaT: number) => U * area * deltaT;

/* ---------------- LMTD ---------------- */

export type FlowArrangement = "counter" | "parallel";

/** Uçlardaki sıcaklık farkları (K). */
export function terminalDifferences(hotIn: number, hotOut: number, coldIn: number, coldOut: number, arrangement: FlowArrangement) {
  return arrangement === "counter" ? [hotIn - coldOut, hotOut - coldIn] : [hotIn - coldIn, hotOut - coldOut];
}

/** Logaritmik ortalama sıcaklık farkı; uç farkları eşitse limit değeri (aritmetik ortalama) döner. */
export function lmtd(dT1: number, dT2: number) {
  if (dT1 <= 0 || dT2 <= 0) return null;
  if (Math.abs(dT1 - dT2) < 1e-9 * Math.max(dT1, dT2)) return dT1;
  return (dT1 - dT2) / Math.log(dT1 / dT2);
}

/** Gerekli ısı transfer alanı (m²): A = Q / (U · LMTD). */
export const exchangerArea = (Q: number, U: number, lmtdK: number) => Q / (U * lmtdK);

/* ---------------- Debiden ısı yükü ---------------- */

/** Kütlesel debi × özgül ısı × sıcaklık farkı (W). ṁ kg/s, cp J/(kg·K). */
export const sensibleHeat = (massFlow: number, cp: number, deltaT: number) => massFlow * cp * deltaT;

/** Hava: deniz seviyesinde ~20 °C için ρ ≈ 1,2 kg/m³, cp ≈ 1005 J/(kg·K). */
export const AIR = { rho: 1.2, cp: 1005 };
/** Su: ~20–60 °C aralığında ρ ≈ 1000 kg/m³ (yaklaşık), cp ≈ 4180 J/(kg·K). */
export const WATER = { rho: 1000, cp: 4180 };

/* ---------------- Pompa ---------------- */

export const GRAVITY = 9.80665;

/** Hidrolik güç (W): P = ρ · g · Q · H. Q m³/s, H m. */
export const hydraulicPower = (rho: number, Q: number, H: number) => rho * GRAVITY * Q * H;

/** Basınç farkını basma yüksekliğine çevirir (m): H = Δp / (ρ g). Δp Pa. */
export const headFromPressure = (dp: number, rho: number) => dp / (rho * GRAVITY);
