// Hesap motorlari: Ingilizce (ABD) klima kapasitesi, dogalgaz faturasi ve
// tasinma hacmi araclari.

import { SQ_FT_PER_SQ_M } from "./englishHomeYardFormulas";

// ---- Room air conditioner sizing (ENERGY STAR room AC sizing chart) ----
// Alan araligi (ft2) -> onerilen kapasite (BTU/h).
export const ENERGY_STAR_AC_CHART: Array<{ maxSqFt: number; btu: number }> = [
  { maxSqFt: 150, btu: 5000 },
  { maxSqFt: 250, btu: 6000 },
  { maxSqFt: 300, btu: 7000 },
  { maxSqFt: 350, btu: 8000 },
  { maxSqFt: 400, btu: 9000 },
  { maxSqFt: 450, btu: 10000 },
  { maxSqFt: 550, btu: 12000 },
  { maxSqFt: 700, btu: 14000 },
  { maxSqFt: 1000, btu: 18000 },
  { maxSqFt: 1200, btu: 21000 },
  { maxSqFt: 1400, btu: 23000 },
  { maxSqFt: 1500, btu: 24000 },
  { maxSqFt: 2000, btu: 30000 },
  { maxSqFt: 2500, btu: 34000 },
];
export const AC_MIN_SQ_FT = 100;
export const AC_MAX_SQ_FT = 2500;

export type SunExposure = "shaded" | "normal" | "sunny";

export type AcSizingInput = {
  sqFt: number;
  sun: SunExposure;
  people: number;
  isKitchen: boolean;
};

export function roomAcSize(input: AcSizingInput) {
  const { sqFt, sun, people, isKitchen } = input;
  if (!Number.isFinite(sqFt) || sqFt <= 0 || !Number.isFinite(people) || people < 0) return null;
  const row = ENERGY_STAR_AC_CHART.find((entry) => sqFt <= entry.maxSqFt);
  if (!row) return { outOfRange: true as const, sqFt };
  const base = row.btu;
  const sunAdjustment = sun === "shaded" ? -0.1 * base : sun === "sunny" ? 0.1 * base : 0;
  // Oda duzenli olarak ikiden fazla kisi tarafindan kullaniliyorsa kisi basina +600 BTU.
  const peopleAdjustment = Math.max(0, Math.floor(people) - 2) * 600;
  const kitchenAdjustment = isKitchen ? 4000 : 0;
  const total = base + sunAdjustment + peopleAdjustment + kitchenAdjustment;
  return { outOfRange: false as const, sqFt, base, sunAdjustment, peopleAdjustment, kitchenAdjustment, total, belowChart: sqFt < AC_MIN_SQ_FT };
}

export function sqMetersToSqFt(sqM: number) {
  return sqM * SQ_FT_PER_SQ_M;
}

// ---- Natural gas bill ----
// 1 therm = 100,000 BTU = 29.3071 kWh. 1 CCF = 100 ft3; isil deger faturaya
// gore degisir (tipik ~1.03-1.04 therm/CCF). 1 m3 = 35.3147 ft3.
export const KWH_PER_THERM = 29.3071;
export const CU_FT_PER_CU_M = 35.3146667;

export type GasUnit = "therm" | "ccf" | "m3" | "kwh";

export type GasBillInput = {
  usage: number;
  unit: GasUnit;
  pricePerUnit: number;
  /** Therms per CCF from the bill (heat content / BTU factor). */
  thermsPerCcf: number;
};

export function gasBill(input: GasBillInput) {
  const { usage, unit, pricePerUnit, thermsPerCcf } = input;
  if (!Number.isFinite(usage) || usage < 0 || !Number.isFinite(thermsPerCcf) || thermsPerCcf <= 0) return null;
  const therms =
    unit === "therm" ? usage : unit === "ccf" ? usage * thermsPerCcf : unit === "m3" ? (usage * CU_FT_PER_CU_M) / 100 * thermsPerCcf : usage / KWH_PER_THERM;
  const cost = Number.isFinite(pricePerUnit) && pricePerUnit >= 0 ? usage * pricePerUnit : null;
  return {
    therms,
    kwh: therms * KWH_PER_THERM,
    btu: therms * 100000,
    ccf: therms / thermsPerCcf,
    cost,
    costPerTherm: cost !== null && therms > 0 ? cost / therms : null,
  };
}

// ---- Moving: volume -> rental truck ----
export const CU_FT_PER_M3 = CU_FT_PER_CU_M;
// Kiralik kamyon kasalarinin yaklasik yuk hacmi (ft3).
export const TRUCK_SIZES: Array<{ label: string; cuFt: number }> = [
  { label: "10 ft truck", cuFt: 400 },
  { label: "15 ft truck", cuFt: 760 },
  { label: "20 ft truck", cuFt: 1000 },
  { label: "26 ft truck", cuFt: 1680 },
];

export function suggestTruck(cuFt: number) {
  if (!Number.isFinite(cuFt) || cuFt <= 0) return null;
  return TRUCK_SIZES.find((truck) => truck.cuFt >= cuFt) ?? { label: "26 ft truck or a moving company", cuFt: 1680 };
}
