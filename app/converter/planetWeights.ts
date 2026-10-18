import { findCelestialBodyById } from "./celestialBodiesHub";
import { calculateWeightOnCelestialBody } from "./weightOnCelestialBody";

// "Diğer gezegenlerde kaç kilo gelirim" sayfasının sırası: Güneş'ten uzaklığa göre gezegenler (Ay, Dünya'nın ardından)
// ve Plüton; ardından uydular ve diğer cüce gezegenler. Yerçekimi değerleri celestialBodiesDatabase'den (NASA NSSDCA).
export const MAIN_BODIES = ["merkur", "venus", "dunya", "ay", "mars", "jupiter", "saturn", "uranus", "neptun", "pluton"] as const;
export const OTHER_BODIES = ["ceres", "io", "europa", "ganymede", "callisto", "titan", "triton", "eris"] as const;

/** Güneş'in fotosferindeki yerçekimi ivmesi, m/s² (NASA Sun Fact Sheet); Güneş'in katı bir yüzeyi yoktur. */
export const SUN_GRAVITY = 274;

export type BodyWeight = { id: string; name: string; gravity: number; ratio: number; kg: number };

export function bodyWeights(kg: number, ids: readonly string[]): BodyWeight[] {
  const earth = findCelestialBodyById("dunya")!;
  return ids.map((id) => {
    const b = findCelestialBodyById(id)!;
    return { id, name: b.nameTr, gravity: b.gravityMs2, ratio: b.gravityMs2 / earth.gravityMs2, kg: calculateWeightOnCelestialBody(kg, id)! };
  });
}

export const sunWeight = (kg: number) => (kg * SUN_GRAVITY) / findCelestialBodyById("dunya")!.gravityMs2;
