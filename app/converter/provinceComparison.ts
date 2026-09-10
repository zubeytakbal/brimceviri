import { calculateAltitudeEffect } from "./mountainAltitudeEffect";
import { findProvinceById } from "./provinceElevationHub";

export type HealthTier = "dusuk" | "orta" | "belirgin";

export type ProvinceComparisonResult = {
  provinceA: { id: string; nameTr: string; elevationM: number; pressureHpa: number; boilingPointC: number };
  provinceB: { id: string; nameTr: string; elevationM: number; pressureHpa: number; boilingPointC: number };
  elevationDiffM: number;
  pressureDiffPercent: number;
  healthTier: HealthTier;
};

// Esik degerleri gercek tibbi kaynaklardan (Acibadem, Memorial, TUBITAK
// arastirmasi ile dogrulanmis): 1500m alti fark onemsiz, 1500-2500m
// hafif etki, 2500m+ belirgin risk artisi.
function getHealthTier(elevationDiffM: number): HealthTier {
  const absDiff = Math.abs(elevationDiffM);
  if (absDiff >= 2500) return "belirgin";
  if (absDiff >= 1500) return "orta";
  return "dusuk";
}

export function compareProvinces(
  idA: string,
  idB: string
): ProvinceComparisonResult | null {
  const provinceA = findProvinceById(idA);
  const provinceB = findProvinceById(idB);

  if (!provinceA || !provinceB) return null;

  const effectA = calculateAltitudeEffect(provinceA.elevationM);
  const effectB = calculateAltitudeEffect(provinceB.elevationM);

  if (!effectA || !effectB) return null;

  const elevationDiffM = provinceB.elevationM - provinceA.elevationM;
  const pressureDiffPercent = effectA.percentOfSeaLevel - effectB.percentOfSeaLevel;

  return {
    provinceA: {
      id: provinceA.id,
      nameTr: provinceA.nameTr,
      elevationM: provinceA.elevationM,
      pressureHpa: effectA.pressureHpa,
      boilingPointC: effectA.waterBoilingPointC,
    },
    provinceB: {
      id: provinceB.id,
      nameTr: provinceB.nameTr,
      elevationM: provinceB.elevationM,
      pressureHpa: effectB.pressureHpa,
      boilingPointC: effectB.waterBoilingPointC,
    },
    elevationDiffM,
    pressureDiffPercent,
    healthTier: getHealthTier(elevationDiffM),
  };
}
