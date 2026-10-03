// Gold purity calculations used by the international gold calculator pages.
// Fixed rules only: karat/24 and hallmark fineness. A price is never stored;
// melt value uses the price the visitor types in.

export type GoldGrade = { karat: number; hallmark: number };

/** Common grades: karat and the hallmark (parts per thousand) stamped in most countries. */
export const GOLD_GRADES: GoldGrade[] = [
  { karat: 8, hallmark: 333 },
  { karat: 9, hallmark: 375 },
  { karat: 10, hallmark: 417 },
  { karat: 14, hallmark: 585 },
  { karat: 18, hallmark: 750 },
  { karat: 21, hallmark: 875 },
  { karat: 22, hallmark: 916 },
  { karat: 24, hallmark: 999 },
];

/**
 * Purity basis. "karat" uses karat ÷ 24 (14K = 58.33 %), the jeweller's
 * alloying arithmetic; "hallmark" uses the stamped fineness (585 = 58.5 %),
 * which German and most European buyers use.
 */
export type PurityBasis = "karat" | "hallmark";

export function fineness(grade: GoldGrade, basis: PurityBasis) {
  return basis === "karat" ? grade.karat / 24 : grade.hallmark / 1000;
}

export const findGrade = (karat: number) => GOLD_GRADES.find((g) => g.karat === karat);

/** Grams of pure gold in `weight` grams of an alloy with the given fineness (0–1). */
export function pureGold(weight: number, purity: number) {
  if (!(weight >= 0) || !(purity > 0 && purity <= 1)) return Number.NaN;
  return weight * purity;
}

/** Weight of another alloy that contains the same pure gold (the Turkish "ayar çevirme"). */
export function equivalentWeight(weight: number, fromPurity: number, toPurity: number) {
  if (!(weight >= 0) || !(fromPurity > 0 && fromPurity <= 1) || !(toPurity > 0 && toPurity <= 1)) return Number.NaN;
  return (weight * fromPurity) / toPurity;
}

export type AlloyResult =
  | { direction: "up"; addPureGold: number; finalWeight: number }
  | { direction: "down"; addAlloy: number; finalWeight: number }
  | { direction: "same"; finalWeight: number };

/**
 * Alloying up (add pure gold) or down (add base-metal alloy) from one
 * fineness to another. Pure gold (24K, 999 and above) cannot be reached by
 * adding gold to an alloy, so that case returns null.
 */
export function alloy(weight: number, fromPurity: number, toPurity: number): AlloyResult | null {
  if (!(weight > 0) || !(fromPurity > 0 && fromPurity <= 1) || !(toPurity > 0 && toPurity <= 1)) return null;
  if (Math.abs(toPurity - fromPurity) < 1e-12) return { direction: "same", finalWeight: weight };
  if (toPurity > fromPurity) {
    if (toPurity >= 0.999) return null;
    const addPureGold = (weight * (toPurity - fromPurity)) / (1 - toPurity);
    return { direction: "up", addPureGold, finalWeight: weight + addPureGold };
  }
  const addAlloy = (weight * (fromPurity - toPurity)) / toPurity;
  return { direction: "down", addAlloy, finalWeight: weight + addAlloy };
}

export const TROY_OUNCE_G = 31.1034768;

/** Melt value: pure gold × price of pure gold per gram (price typed by the visitor). */
export function meltValue(weight: number, purity: number, pricePerGramPure: number) {
  const g = pureGold(weight, purity);
  if (!Number.isFinite(g) || !(pricePerGramPure > 0)) return Number.NaN;
  return g * pricePerGramPure;
}
