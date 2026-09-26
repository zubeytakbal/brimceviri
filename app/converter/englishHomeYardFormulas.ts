// Hesap motorlari: ABD ev ve bahce araclari (square footage, cubic yard,
// mulch, board foot). ABD olculeri (ft, in, yd) esas alinir.

export const SQ_FT_PER_SQ_M = 10.7639104167097;
export const CU_FT_PER_CU_YD = 27;
export const CU_M_PER_CU_YD = 0.764554857984;

// ---- Square footage ----
export type AreaShape = "rectangle" | "circle" | "triangle";

export type AreaSection = {
  shape: AreaShape;
  /** Length or base (ft); diameter for circles. */
  a: number;
  /** Width or height (ft); ignored for circles. */
  b: number;
};

export function sectionSquareFeet(section: AreaSection) {
  const { shape, a, b } = section;
  if (!Number.isFinite(a) || a <= 0) return null;
  if (shape === "circle") return Math.PI * (a / 2) ** 2;
  if (!Number.isFinite(b) || b <= 0) return null;
  return shape === "triangle" ? (a * b) / 2 : a * b;
}

export function totalSquareFeet(sections: AreaSection[], wastePercent = 0) {
  const areas = sections.map(sectionSquareFeet).filter((value): value is number => value !== null);
  if (areas.length === 0) return null;
  const sqFt = areas.reduce((sum, value) => sum + value, 0);
  const withWaste = sqFt * (1 + Math.max(0, wastePercent) / 100);
  return { sqFt, withWaste, sqM: sqFt / SQ_FT_PER_SQ_M, sqYd: sqFt / 9, acres: sqFt / 43560 };
}

/** Feet + inches input to decimal feet: 12 ft 6 in -> 12.5. */
export function feetAndInches(feet: number, inches: number) {
  const f = Number.isFinite(feet) ? feet : 0;
  const i = Number.isFinite(inches) ? inches : 0;
  return f + i / 12;
}

// ---- Cubic yards ----
export type VolumeShape = "rectangle" | "circle";

/** Volume in cubic yards of a slab or hole: length/width (ft) or diameter (ft), depth in inches. */
export function cubicYards(shape: VolumeShape, lengthOrDiameterFt: number, widthFt: number, depthIn: number) {
  if (![lengthOrDiameterFt, depthIn].every((value) => Number.isFinite(value) && value > 0)) return null;
  const depthFt = depthIn / 12;
  let cubicFeet: number;
  if (shape === "circle") {
    cubicFeet = Math.PI * (lengthOrDiameterFt / 2) ** 2 * depthFt;
  } else {
    if (!Number.isFinite(widthFt) || widthFt <= 0) return null;
    cubicFeet = lengthOrDiameterFt * widthFt * depthFt;
  }
  return { cubicFeet, cubicYards: cubicFeet / CU_FT_PER_CU_YD, cubicMeters: (cubicFeet / CU_FT_PER_CU_YD) * CU_M_PER_CU_YD };
}

// ---- Mulch ----
export const mulchBagSizes = [
  { cubicFeet: 1.5, label: "1.5 cu ft bag" },
  { cubicFeet: 2, label: "2 cu ft bag" },
  { cubicFeet: 3, label: "3 cu ft bag" },
] as const;

/** Mulch needed for an area (sq ft) at a depth (in). 1 cu yd covers 324 sq ft at 1 inch. */
export function mulchNeeded(areaSqFt: number, depthIn: number) {
  if (![areaSqFt, depthIn].every((value) => Number.isFinite(value) && value > 0)) return null;
  const cubicFeet = areaSqFt * (depthIn / 12);
  return {
    cubicFeet,
    cubicYards: cubicFeet / CU_FT_PER_CU_YD,
    bags: mulchBagSizes.map((bag) => ({ ...bag, count: Math.ceil(cubicFeet / bag.cubicFeet - 1e-9) })),
  };
}

// ---- Board feet ----
export type LumberPiece = {
  /** Thickness in inches (nominal, as lumber is sold). */
  thicknessIn: number;
  widthIn: number;
  lengthFt: number;
  quantity: number;
};

/** One board foot = 144 cubic inches (1 in × 12 in × 12 in). */
export function boardFeet(piece: LumberPiece) {
  const { thicknessIn, widthIn, lengthFt, quantity } = piece;
  if (![thicknessIn, widthIn, lengthFt].every((value) => Number.isFinite(value) && value > 0)) return null;
  const count = Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
  return ((thicknessIn * widthIn * lengthFt) / 12) * count;
}

export function totalBoardFeet(pieces: LumberPiece[]) {
  const values = pieces.map(boardFeet).filter((value): value is number => value !== null);
  if (values.length === 0) return null;
  const total = values.reduce((sum, value) => sum + value, 0);
  // 1 board foot = 144 in³ = 0.002359737216 m³
  return { boardFeet: total, cubicFeet: total / 12, cubicMeters: total * 0.002359737216 };
}
