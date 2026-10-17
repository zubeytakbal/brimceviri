import { describe, expect, it } from "vitest";
import { BEAUFORT, beaufortOf } from "../app/converter/scales/beaufort";
import { BIKE_RIMS, outerDiameter, parseEtrto, rimByBsd } from "../app/converter/scales/bikeRim";
import { ASTM_E11, finestPassingSieve, nearestSieveByMicron } from "../app/converter/scales/sieve";

describe("bofor", () => {
  it("WMO sınırları", () => {
    expect(beaufortOf(0, "kmh")!.force).toBe(0);
    expect(beaufortOf(19, "kmh")!.force).toBe(3);
    expect(beaufortOf(20, "kmh")!.force).toBe(4);
    expect(beaufortOf(34, "kn")!.force).toBe(8);
    expect(beaufortOf(33, "kn")!.force).toBe(7);
    expect(beaufortOf(118, "kmh")!.force).toBe(12);
    expect(beaufortOf(-1, "ms")).toBeNull();
  });
  it("km/h ve knot aralıkları m/s ile tutarlı", () => {
    for (const l of BEAUFORT) {
      expect(beaufortOf(l.kmh[0], "kmh")!.force).toBe(l.force);
      expect(beaufortOf(l.kn[0], "kn")!.force).toBe(l.force);
    }
  });
});

describe("elek", () => {
  it("tablo azalan sırada", () => {
    for (let i = 1; i < ASTM_E11.length; i++) expect(ASTM_E11[i].micron).toBeLessThan(ASTM_E11[i - 1].micron);
  });
  it("en yakın ve geçen elek", () => {
    expect(nearestSieveByMicron(75)!.mesh).toBe(200);
    expect(nearestSieveByMicron(160)!.mesh).toBe(100);
    expect(finestPassingSieve(100)!.mesh).toBe(140);
    expect(finestPassingSieve(5000)).toBeNull();
  });
});

describe("bisiklet jantı", () => {
  it("ETRTO ayrıştırma", () => {
    expect(parseEtrto("37-622")).toEqual({ width: 37, bsd: 622 });
    expect(parseEtrto("50 x 559")).toEqual({ width: 50, bsd: 559 });
    expect(parseEtrto("700x25")).toBeNull();
    expect(rimByBsd(622)!.names).toContain("700c");
    expect(outerDiameter(25, 622)).toBe(672);
    expect(new Set(BIKE_RIMS.map((r) => r.bsd)).size).toBe(BIKE_RIMS.length);
  });
});
