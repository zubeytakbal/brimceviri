export type BarVolumeUnit = "oz" | "ml" | "cl";

const ML_PER_OZ = 29.5735;
const ML_PER_CL = 10;

export function convertBarVolume(
  value: number,
  fromUnit: BarVolumeUnit
): Record<BarVolumeUnit, number> | null {
  if (!Number.isFinite(value) || value < 0) {
    return null;
  }

  let ml: number;
  if (fromUnit === "oz") {
    ml = value * ML_PER_OZ;
  } else if (fromUnit === "cl") {
    ml = value * ML_PER_CL;
  } else {
    ml = value;
  }

  return {
    oz: ml / ML_PER_OZ,
    ml,
    cl: ml / ML_PER_CL,
  };
}

export type AbvInput = {
  volumeMl: number;
  abvPercent: number;
};

export type AbvResult = {
  pureAlcoholMl: number;
  pureAlcoholGrams: number;
  standardDrinks: number;
};

const ETHANOL_DENSITY_G_PER_ML = 0.789;
// Uluslararasi yaygin referans (10g); ulkeye gore 8-14g arasinda degisebilir.
const GRAMS_PER_STANDARD_DRINK = 10;

export function calculateAbv(input: AbvInput): AbvResult | null {
  const { volumeMl, abvPercent } = input;

  if (
    !Number.isFinite(volumeMl) ||
    volumeMl <= 0 ||
    !Number.isFinite(abvPercent) ||
    abvPercent <= 0 ||
    abvPercent > 100
  ) {
    return null;
  }

  const pureAlcoholMl = volumeMl * (abvPercent / 100);
  const pureAlcoholGrams = pureAlcoholMl * ETHANOL_DENSITY_G_PER_ML;

  return {
    pureAlcoholMl,
    pureAlcoholGrams,
    standardDrinks: pureAlcoholGrams / GRAMS_PER_STANDARD_DRINK,
  };
}
