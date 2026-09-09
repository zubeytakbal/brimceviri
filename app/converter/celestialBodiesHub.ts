import { celestialBodiesDatabase, type CelestialBodyEntry } from "./celestialBodiesDatabase";

export function getAllCelestialBodies(): CelestialBodyEntry[] {
  return celestialBodiesDatabase;
}

export function findCelestialBodyById(id: string): CelestialBodyEntry | undefined {
  return celestialBodiesDatabase.find((body) => body.id === id);
}

// Log-oranli en yakin komsu karsilastirmasi (lengthComparison.ts /
// materialsHub.ts'teki findSimilarDensityMaterials ile ayni teknik) --
// buyuklukleri kat kat farkli gokcisimlerini (orn. Merkur ile Jupiter)
// "benzer" saymamak icin oransal fark kullanilir.
export function findSimilarGravityBodies(
  id: string,
  count: number,
): CelestialBodyEntry[] {
  const target = findCelestialBodyById(id);
  if (!target) return [];

  return celestialBodiesDatabase
    .filter((body) => body.id !== id)
    .map((body) => ({
      body,
      logDistance: Math.abs(Math.log(body.gravityMs2 / target.gravityMs2)),
    }))
    .sort((a, b) => a.logDistance - b.logDistance)
    .slice(0, count)
    .map((entry) => entry.body);
}
