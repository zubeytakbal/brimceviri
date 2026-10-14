// Oda ısı kaybı (EN 12831 basitleştirilmiş: iletim + havalandırma), radyatör gücünün su
// sıcaklığına göre düzeltilmesi (EN 442) ve kullanma sıcak suyu gücü.

/** Radyatör ile oda arasındaki logaritmik ortalama sıcaklık farkı (EN 442). */
export function radiatorDeltaT(supply: number, ret: number, room: number): number | null {
  const a = supply - room;
  const b = ret - room;
  if (a <= 0 || b <= 0 || ret > supply) return null;
  if (Math.abs(a - b) < 1e-9) return a;
  return (a - b) / Math.log(a / b);
}

/** EN 442 anma koşulu 75/65/20 °C için logaritmik fark (≈ 49,83 K). */
export const DT_NOMINAL = radiatorDeltaT(75, 65, 20)!;

/** Katalogdaki ΔT50 gücünün verilen sıcaklıklardaki karşılığı için çarpan: (ΔT / 49,83)^n. */
export function radiatorFactor(supply: number, ret: number, room: number, n = 1.3) {
  const dT = radiatorDeltaT(supply, ret, room);
  return dT === null ? null : { dT, factor: Math.pow(dT / DT_NOMINAL, n) };
}

export type RoomInput = {
  wallArea: number; // dış duvar brüt alanı (m²), pencere dahil
  wallU: number;
  windowArea: number;
  windowU: number;
  roofArea?: number; // çatıya ya da ısıtılmayan alana bakan tavan/döşeme (m²)
  roofU?: number;
  volume: number; // oda hacmi (m³)
  airChange: number; // saatlik hava değişimi (1/h)
  tIn: number;
  tOut: number;
};

/**
 * Oda ısı kaybı (W). İletim: Σ U·A·ΔT. Havalandırma: 0,34 · n · V · ΔT
 * (0,34 Wh/(m³·K) havanın hacimsel ısı kapasitesidir).
 */
export function roomHeatLoss(r: RoomInput) {
  const dT = r.tIn - r.tOut;
  const netWall = Math.max(0, r.wallArea - r.windowArea);
  const wall = r.wallU * netWall * dT;
  const window = r.windowU * r.windowArea * dT;
  const roof = (r.roofU ?? 0) * (r.roofArea ?? 0) * dT;
  const ventilation = 0.34 * r.airChange * r.volume * dT;
  return { wall, window, roof, ventilation, total: wall + window + roof + ventilation, dT };
}

/** Gereken dilim sayısı (yukarı yuvarlanır). */
export const sectionsNeeded = (loadW: number, perSectionW50: number, factor: number) => Math.ceil(loadW / (perSectionW50 * factor));

/** Gereken panel radyatör boyu (m) ve bir üst standart boy (10 cm adımlı, 40–300 cm). */
export function panelLength(loadW: number, perMeterW50: number, factor: number) {
  const L = loadW / (perMeterW50 * factor);
  const standard = Math.min(3, Math.max(0.4, Math.ceil(L * 10 - 1e-9) / 10));
  return { L, standard };
}

/** Kullanma sıcak suyu için gereken güç (kW): debi (L/dk) × 4,186 kJ/(kg·K) × ΔT; 1 L ≈ 1 kg alınır. */
export const dhwPowerKw = (flowLpm: number, deltaT: number) => (flowLpm / 60) * 4.186 * deltaT;

/** Verilen güçte (kW) ısıtılabilen sıcak su debisi (L/dk). */
export const dhwFlowLpm = (powerKw: number, deltaT: number) => (powerKw * 60) / (4.186 * deltaT);
