// Klima BTU hesaplama -- oda alanindan gerekli klima sogutma kapasitesini
// (BTU/h) tahmin eder. Yaygin kullanilan pratik formul: alan x 500-600
// BTU/m2 (bu araclta 600 kullanilir), kisi basina +600 BTU, gunes alan
// veya ust kat/cati katinda ekstra isi yuku icin yuzdesel artis.

export type AcCapacityInput = {
  areaM2: number;
  occupantCount: number;
  isSunny: boolean;
  isTopFloor: boolean;
};

export const STANDARD_BTU_SIZES = [9000, 12000, 18000, 24000, 30000] as const;

export type AcCapacityResult = {
  baseBtu: number;
  occupantBtu: number;
  adjustmentBtu: number;
  totalBtu: number;
  suggestedCapacity: number;
};

const BTU_PER_M2 = 600;
const BTU_PER_OCCUPANT = 600;
const SUNNY_EXTRA_RATIO = 0.1;
const TOP_FLOOR_EXTRA_RATIO = 0.1;

export function calculateAcCapacity(
  input: AcCapacityInput
): AcCapacityResult | null {
  const { areaM2, occupantCount, isSunny, isTopFloor } = input;

  if (
    !Number.isFinite(areaM2) ||
    areaM2 <= 0 ||
    !Number.isFinite(occupantCount) ||
    occupantCount < 0
  ) {
    return null;
  }

  const baseBtu = areaM2 * BTU_PER_M2;
  const occupantBtu = occupantCount * BTU_PER_OCCUPANT;
  const subtotal = baseBtu + occupantBtu;

  const adjustmentRatio =
    (isSunny ? SUNNY_EXTRA_RATIO : 0) + (isTopFloor ? TOP_FLOOR_EXTRA_RATIO : 0);
  const adjustmentBtu = subtotal * adjustmentRatio;

  const totalBtu = subtotal + adjustmentBtu;

  const suggestedCapacity =
    STANDARD_BTU_SIZES.find((size) => size >= totalBtu) ??
    STANDARD_BTU_SIZES[STANDARD_BTU_SIZES.length - 1];

  return {
    baseBtu,
    occupantBtu,
    adjustmentBtu,
    totalBtu,
    suggestedCapacity,
  };
}
