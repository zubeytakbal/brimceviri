import { mountainsDatabase, type MountainEntry } from "./mountainsDatabase";

export function getAllMountains(): MountainEntry[] {
  return mountainsDatabase;
}

export function findMountainById(id: string): MountainEntry | undefined {
  return mountainsDatabase.find((mountain) => mountain.id === id);
}

// Log-oranli en yakin komsu -- materyaller/gokcisimleri hub'larindaki
// findSimilarDensityMaterials/findSimilarGravityBodies ile ayni yontem.
export function findSimilarElevationMountains(
  id: string,
  count: number
): MountainEntry[] {
  const target = findMountainById(id);
  if (!target) return [];

  return mountainsDatabase
    .filter((mountain) => mountain.id !== id)
    .map((mountain) => ({
      mountain,
      logDistance: Math.abs(
        Math.log(mountain.elevationM) - Math.log(target.elevationM)
      ),
    }))
    .sort((a, b) => a.logDistance - b.logDistance)
    .slice(0, count)
    .map((entry) => entry.mountain);
}
