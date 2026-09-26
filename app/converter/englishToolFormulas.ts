// Hesap motorlari: Ingilizce pazara tasinan araclarin ABD'ye ozgu surumleri
// (havuz hacmi galon cinsinden, klor dozu, standart icki, amortisman).
// Turkce motorlar metrik/Turkiye mevzuatina gore yazildigi icin ayri tutuldu.

export const US_GALLONS_PER_CUBIC_FOOT = 7.48051948;
export const LITERS_PER_US_GALLON_POOL = 3.785411784;
export const ML_PER_US_FL_OZ = 29.5735295625;
export const GRAMS_PER_OUNCE = 28.349523125;

// ---- Pool volume ----
export type PoolShape = "rectangle" | "round" | "oval";

/** Pool volume in US gallons; dimensions in feet, depth = average of shallow and deep end. */
export function poolVolume(shape: PoolShape, lengthOrDiameterFt: number, widthFt: number, shallowFt: number, deepFt: number) {
  const depth = Number.isFinite(deepFt) && deepFt > 0 ? (shallowFt + deepFt) / 2 : shallowFt;
  if (![lengthOrDiameterFt, depth].every((value) => Number.isFinite(value) && value > 0)) return null;
  let cubicFeet: number;
  if (shape === "round") {
    cubicFeet = Math.PI * (lengthOrDiameterFt / 2) ** 2 * depth;
  } else {
    if (!Number.isFinite(widthFt) || widthFt <= 0) return null;
    cubicFeet = shape === "oval" ? Math.PI * (lengthOrDiameterFt / 2) * (widthFt / 2) * depth : lengthOrDiameterFt * widthFt * depth;
  }
  const gallons = cubicFeet * US_GALLONS_PER_CUBIC_FOOT;
  return { cubicFeet, gallons, liters: gallons * LITERS_PER_US_GALLON_POOL, averageDepthFt: depth };
}

// ---- Chlorine dose ----
// Sivilarda "trade %" = 100 mL'deki aktif klor gram (g/100 mL); granullerde agirlikca %.
export const chlorineProducts = [
  { id: "liquid-12.5", label: "Liquid chlorine 12.5%", kind: "liquid", percent: 12.5 },
  { id: "liquid-10", label: "Liquid chlorine 10%", kind: "liquid", percent: 10 },
  { id: "bleach-6", label: "Household bleach 6%", kind: "liquid", percent: 6 },
  { id: "cal-hypo-65", label: "Cal-hypo granules 65%", kind: "granular", percent: 65 },
  { id: "dichlor-56", label: "Dichlor granules 56%", kind: "granular", percent: 56 },
  { id: "trichlor-90", label: "Trichlor 90% (tabs/granules)", kind: "granular", percent: 90 },
] as const;

export type ChlorineProductId = (typeof chlorineProducts)[number]["id"];

export function chlorineDose(gallons: number, currentPpm: number, targetPpm: number, productId: ChlorineProductId) {
  const product = chlorineProducts.find((candidate) => candidate.id === productId);
  if (!product || ![gallons, currentPpm, targetPpm].every(Number.isFinite) || gallons <= 0 || currentPpm < 0) return null;
  const increase = targetPpm - currentPpm;
  if (increase <= 0) return { increase, alreadyAtTarget: true as const };
  // ppm = mg/L
  const chlorineMg = increase * gallons * LITERS_PER_US_GALLON_POOL;
  if (product.kind === "liquid") {
    const ml = chlorineMg / (product.percent * 10);
    return { increase, alreadyAtTarget: false as const, kind: "liquid" as const, ml, flOz: ml / ML_PER_US_FL_OZ, gallons: ml / 1000 / LITERS_PER_US_GALLON_POOL };
  }
  const grams = chlorineMg / 1000 / (product.percent / 100);
  return { increase, alreadyAtTarget: false as const, kind: "granular" as const, grams, oz: grams / GRAMS_PER_OUNCE, lb: grams / GRAMS_PER_OUNCE / 16 };
}

// ---- Standard drinks ----
export const ETHANOL_DENSITY_G_PER_ML = 0.789;
// US standard drink: 14 g pure alcohol (NIAAA); UK unit: 10 mL (8 g); Australia: 10 g.
export function standardDrinks(volumeMl: number, abvPercent: number) {
  if (![volumeMl, abvPercent].every((value) => Number.isFinite(value) && value > 0) || abvPercent > 100) return null;
  const alcoholMl = volumeMl * (abvPercent / 100);
  const alcoholGrams = alcoholMl * ETHANOL_DENSITY_G_PER_ML;
  return { alcoholMl, alcoholGrams, usDrinks: alcoholGrams / 14, ukUnits: alcoholMl / 10, australianDrinks: alcoholGrams / 10 };
}

// ---- Depreciation (US) ----
export type DepreciationMethod = "straight-line" | "double-declining" | "sum-of-years";

export type DepreciationRow = { year: number; depreciation: number; accumulated: number; bookValue: number };

export function depreciationSchedule(cost: number, salvage: number, lifeYears: number, method: DepreciationMethod): DepreciationRow[] | null {
  if (![cost, salvage, lifeYears].every(Number.isFinite) || cost <= 0 || salvage < 0 || salvage >= cost) return null;
  const life = Math.round(lifeYears);
  if (life < 1 || life > 100) return null;
  const depreciable = cost - salvage;
  const rows: DepreciationRow[] = [];
  let bookValue = cost;
  let accumulated = 0;
  const sumOfYears = (life * (life + 1)) / 2;
  for (let year = 1; year <= life; year += 1) {
    let depreciation: number;
    if (method === "straight-line") {
      depreciation = depreciable / life;
    } else if (method === "sum-of-years") {
      depreciation = (depreciable * (life - year + 1)) / sumOfYears;
    } else {
      // Double-declining balance, never below salvage; last year brings book value to salvage.
      depreciation = year === life ? bookValue - salvage : Math.min(bookValue * (2 / life), bookValue - salvage);
    }
    depreciation = Math.max(0, depreciation);
    accumulated += depreciation;
    bookValue -= depreciation;
    rows.push({ year, depreciation, accumulated, bookValue });
  }
  return rows;
}
