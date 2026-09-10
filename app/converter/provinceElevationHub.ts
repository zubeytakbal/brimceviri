import { turkishProvinceElevations, type ProvinceElevation } from "./turkishProvinceElevations";
import { mountainsDatabase, type MountainEntry } from "./mountainsDatabase";

export function getAllProvinces(): ProvinceElevation[] {
  return turkishProvinceElevations;
}

export function findProvinceById(id: string): ProvinceElevation | undefined {
  return turkishProvinceElevations.find((province) => province.id === id);
}

export type ProvinceRankContext = {
  rank: number;
  totalCount: number;
  nextHigher: ProvinceElevation | null;
  nextLower: ProvinceElevation | null;
};

// Her ilin 81 il arasindaki rakim sirasini ve komsularini verir -- her
// sayfaya, sadece rakami degil, gercek ve dogru bir "baglam" cumlesi
// eklemek icin (zaten dogrulanmis veriden hesaplaniyor, ekstra
// arastirma/dogrulama riski yok).
export function getProvinceRankContext(id: string): ProvinceRankContext | null {
  const sorted = turkishProvinceElevations
    .slice()
    .sort((a, b) => b.elevationM - a.elevationM);

  const index = sorted.findIndex((province) => province.id === id);
  if (index === -1) return null;

  return {
    rank: index + 1,
    totalCount: sorted.length,
    nextHigher: index > 0 ? sorted[index - 1] : null,
    nextLower: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

// En yakin (rakimca) zirveyi bulur -- her zaman binlerce metre fark
// olacaktir (Turkiye'nin en yuksek ili bile 8.000+ zirvelerin cok
// altinda), amac "en yakin" degil "karsilastirma icin ilginc bir
// referans" sunmak.
export function findNearestMountain(elevationM: number): MountainEntry | null {
  if (mountainsDatabase.length === 0) return null;

  return mountainsDatabase.reduce((closest, mountain) => {
    const closestDiff = Math.abs(closest.elevationM - elevationM);
    const currentDiff = Math.abs(mountain.elevationM - elevationM);
    return currentDiff < closestDiff ? mountain : closest;
  }, mountainsDatabase[0]);
}
