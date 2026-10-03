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

/**
 * Alçaktan yükseğe taşınan kapalı bir paketin (cips, pet şişe) hacim oranı: Boyle yasası,
 * sıcaklık sabit varsayımıyla V2/V1 = P1/P2.
 */
export function paketGenlesmesi(pAltHpa: number, pUstHpa: number) {
  return pAltHpa / pUstHpa;
}

/**
 * Lastik basınç saati (gösterge basıncı) yükseğe çıkınca dış basınç düştüğü kadar artar.
 * Sonuç bar cinsinden (1 bar = 1000 hPa).
 */
export function lastikGostergeArtisiBar(pAltHpa: number, pUstHpa: number) {
  return (pAltHpa - pUstHpa) / 1000;
}

/** Karayolu boyunca ortalama tırmanış: 100 km'de metre ve yüzde eğim. */
export function ortalamaEgim(rakimFarkiM: number, yolKm: number) {
  if (!(yolKm > 0)) return null;
  return { metre100km: (Math.abs(rakimFarkiM) / yolKm) * 100, yuzde: (Math.abs(rakimFarkiM) / (yolKm * 1000)) * 100 };
}
