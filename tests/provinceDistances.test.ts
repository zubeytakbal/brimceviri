import { describe, expect, it } from "vitest";
import { KGM_DISTANCES, KGM_PROVINCES } from "../app/converter/geo/kgmDistances";
import { airKm, distancesFrom, roadKm } from "../app/converter/geo/provinceDistances";
import { findProvince, turkeyProvinces } from "../app/converter/geo/turkeyProvinces";

describe("province data", () => {
  it("has 81 provinces in plate order matching the KGM table", () => {
    expect(turkeyProvinces).toHaveLength(81);
    expect(KGM_PROVINCES).toHaveLength(81);
    turkeyProvinces.forEach((p, i) => expect(p.plate).toBe(i + 1));
    expect(KGM_DISTANCES.every((row, i) => row.length === 81 && row[i] === 0)).toBe(true);
  });

  it("keeps coordinates inside Turkey", () => {
    for (const p of turkeyProvinces) {
      expect(p.lat).toBeGreaterThan(35.8);
      expect(p.lat).toBeLessThan(42.1);
      expect(p.lon).toBeGreaterThan(25.9);
      expect(p.lon).toBeLessThan(44.9);
    }
  });

  it("road distances are never much shorter than the straight line", () => {
    for (const a of turkeyProvinces) for (const b of turkeyProvinces) {
      if (a.plate >= b.plate) continue;
      expect(roadKm(a, b)).toBeGreaterThan(airKm(a, b) * 0.9);
    }
  });

  it("gives known distances", () => {
    const ist = findProvince("istanbul")!;
    const ank = findProvince("ankara")!;
    expect(roadKm(ist, ank)).toBe(453);
    expect(airKm(ist, ank)).toBeGreaterThan(340);
    expect(airKm(ist, ank)).toBeLessThan(360);
    expect(distancesFrom(ank)).toHaveLength(80);
  });
});

import { findRoutePair, routePairPath, routePairs } from "../app/converter/geo/routePairs";

describe("route pair pages", () => {
  it("covers hub cities once per pair", () => {
    const pairs = routePairs();
    expect(pairs).toHaveLength(237);
    const keys = new Set(pairs.map((p) => [p.from.id, p.to.id].sort().join("|")));
    expect(keys.size).toBe(237);
    expect(findRoutePair("istanbul", "ankara")).not.toBeNull();
    expect(findRoutePair("ankara", "istanbul")).toBeNull();
    expect(routePairPath(findProvince("ankara")!, findProvince("istanbul")!)).toBe("/iller-arasi-mesafe/istanbul/ankara");
    expect(routePairPath(findProvince("van")!, findProvince("mus")!)).toBeNull();
  });
});
