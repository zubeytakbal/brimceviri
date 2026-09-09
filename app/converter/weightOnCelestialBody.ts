import { findCelestialBodyById } from "./celestialBodiesHub";

// "Kilon"un (kutle) sabit kaldigi, sadece terazinin gosterdigi
// "agirligin" yercekimine gore degistigi varsayimiyla klasik
// "diger gezegenlerde kac kilosun" hesaplamasi: oran = hedef
// gokcisminin yerçekimi / Dunya'nin yercekimi.
export function calculateWeightOnCelestialBody(
  weightOnEarthKg: number,
  celestialBodyId: string,
): number | null {
  if (!Number.isFinite(weightOnEarthKg) || weightOnEarthKg <= 0) {
    return null;
  }

  const earth = findCelestialBodyById("dunya");
  const target = findCelestialBodyById(celestialBodyId);
  if (!earth || !target) {
    return null;
  }

  return weightOnEarthKg * (target.gravityMs2 / earth.gravityMs2);
}
