// Boya hesaplama -- oda olculerinden gerekli boya miktarini (litre) tahmin
// eder. Fiziksel bir SI donusumu degil, boya markalarinin (DYO, Filli Boya,
// Weber) rehberlerinde kullanilan pratik formulle calisir: brut duvar alani
// - kapi/pencere alani = net alan, kat sayisiyla carpilir, boya kutusu
// etiketindeki verime (m2/litre) bolunur.

export const DOOR_AREA_M2 = 1.6;
export const WINDOW_AREA_M2 = 1.5;

export const PAINT_CAN_SIZES = [15, 7.5, 2.5] as const;

export type PaintCalculatorInput = {
  length: number;
  width: number;
  height: number;
  doorCount: number;
  windowCount: number;
  coats: 1 | 2;
  coverage: number;
  includeCeiling: boolean;
};

export type PaintCanSuggestion = {
  size: (typeof PAINT_CAN_SIZES)[number];
  count: number;
};

export type PaintCalculatorResult = {
  grossWallArea: number;
  openingsArea: number;
  netWallArea: number;
  ceilingArea: number;
  totalArea: number;
  totalPaintedArea: number;
  litersNeeded: number;
  suggestedCans: PaintCanSuggestion[];
};

function suggestCans(liters: number): PaintCanSuggestion[] {
  let remaining = Math.ceil(liters * 10) / 10;
  const suggestions: PaintCanSuggestion[] = [];

  for (const size of PAINT_CAN_SIZES) {
    const count = Math.floor(remaining / size);
    if (count > 0) {
      suggestions.push({ size, count });
      remaining = Math.round((remaining - count * size) * 10) / 10;
    }
  }

  if (remaining > 0) {
    const smallest = PAINT_CAN_SIZES[PAINT_CAN_SIZES.length - 1];
    const lastSuggestion = suggestions[suggestions.length - 1];

    if (lastSuggestion && lastSuggestion.size === smallest) {
      lastSuggestion.count += 1;
    } else {
      suggestions.push({ size: smallest, count: 1 });
    }
  }

  return suggestions;
}

export function calculatePaintNeeds(
  input: PaintCalculatorInput
): PaintCalculatorResult | null {
  const { length, width, height, doorCount, windowCount, coats, coverage, includeCeiling } =
    input;

  const dimensionsValid = [length, width, height, coverage].every(
    (value) => Number.isFinite(value) && value > 0
  );
  const openingsValid =
    Number.isFinite(doorCount) &&
    doorCount >= 0 &&
    Number.isFinite(windowCount) &&
    windowCount >= 0;

  if (!dimensionsValid || !openingsValid) {
    return null;
  }

  const grossWallArea = 2 * (length + width) * height;
  const openingsArea = doorCount * DOOR_AREA_M2 + windowCount * WINDOW_AREA_M2;
  const netWallArea = Math.max(0, grossWallArea - openingsArea);
  const ceilingArea = includeCeiling ? length * width : 0;
  const totalArea = netWallArea + ceilingArea;
  const totalPaintedArea = totalArea * coats;
  const litersNeeded = totalPaintedArea / coverage;

  return {
    grossWallArea,
    openingsArea,
    netWallArea,
    ceilingArea,
    totalArea,
    totalPaintedArea,
    litersNeeded,
    suggestedCans: suggestCans(litersNeeded),
  };
}
