import { calculateAltitudeEffect } from "./mountainAltitudeEffect";
import { findRegionById } from "./regionElevationHubUz";

export type HealthTier = "past" | "orta" | "sezilarli";

export type RegionComparisonResult = {
  regionA: { id: string; name: string; elevationM: number; pressureHpa: number; boilingPointC: number };
  regionB: { id: string; name: string; elevationM: number; pressureHpa: number; boilingPointC: number };
  elevationDiffM: number;
  pressureDiffPercent: number;
  healthTier: HealthTier;
};

// Chegara qiymatlari tibbiy manbalardan tasdiqlangan: 1500m gacha
// farq ahamiyatsiz, 1500-2500m yengil ta'sir, 2500m+ sezilarli xavf
// oshishi (bu universal tibbiy chegaralar, mamlakatga bog'liq emas).
function getHealthTier(elevationDiffM: number): HealthTier {
  const absDiff = Math.abs(elevationDiffM);
  if (absDiff >= 2500) return "sezilarli";
  if (absDiff >= 1500) return "orta";
  return "past";
}

export function compareRegions(
  idA: string,
  idB: string
): RegionComparisonResult | null {
  const regionA = findRegionById(idA);
  const regionB = findRegionById(idB);

  if (!regionA || !regionB) return null;

  const effectA = calculateAltitudeEffect(regionA.elevationM);
  const effectB = calculateAltitudeEffect(regionB.elevationM);

  if (!effectA || !effectB) return null;

  const elevationDiffM = regionB.elevationM - regionA.elevationM;
  const pressureDiffPercent = effectA.percentOfSeaLevel - effectB.percentOfSeaLevel;

  return {
    regionA: {
      id: regionA.id,
      name: regionA.name,
      elevationM: regionA.elevationM,
      pressureHpa: effectA.pressureHpa,
      boilingPointC: effectA.waterBoilingPointC,
    },
    regionB: {
      id: regionB.id,
      name: regionB.name,
      elevationM: regionB.elevationM,
      pressureHpa: effectB.pressureHpa,
      boilingPointC: effectB.waterBoilingPointC,
    },
    elevationDiffM,
    pressureDiffPercent,
    healthTier: getHealthTier(elevationDiffM),
  };
}
