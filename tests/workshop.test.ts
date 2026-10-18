import { describe, expect, it } from "vitest";
import { FRACTION_DRILLS, FRENCH, NEEDLES, NUMBER_LETTER_DRILLS, SWG, nearest, nearestMetricDrill } from "../app/converter/scales/workshop";

describe("atölye numaraları", () => {
  it("SWG tablosu azalan ve doğru", () => {
    for (let i = 1; i < SWG.length; i++) expect(SWG[i].inch).toBeLessThan(SWG[i - 1].inch);
    expect(SWG.find((r) => r.id === "16")!.mm).toBeCloseTo(1.6256, 6);
    expect(nearest(SWG, 1)!.id).toBe("19");
  });
  it("matkap tabloları artan", () => {
    for (let i = 1; i < NUMBER_LETTER_DRILLS.length; i++) expect(NUMBER_LETTER_DRILLS[i].inch).toBeGreaterThan(NUMBER_LETTER_DRILLS[i - 1].inch);
    expect(NUMBER_LETTER_DRILLS.find((r) => r.id === "#7")!.mm).toBeCloseTo(5.1054, 6);
    expect(nearest(NUMBER_LETTER_DRILLS, 6.35)!.id).toBe("E");
  });
  it("kesirli inç", () => {
    expect(FRACTION_DRILLS.length).toBe(64);
    expect(FRACTION_DRILLS[7].id).toBe('1/8"');
    expect(FRACTION_DRILLS[63].id).toBe('1"');
    expect(FRACTION_DRILLS[4].id).toBe('5/64"');
    expect(nearestMetricDrill(3.175)).toBe(3.2);
    expect(nearestMetricDrill(6.35)).toBe(6.4);
  });
});

describe("iğne ve French", () => {
  it("iğne dış çapları", () => {
    expect(NEEDLES.find((r) => r.id === "18G")!.mm).toBeCloseTo(1.27, 6);
    expect(NEEDLES.find((r) => r.id === "22G")!.mm).toBeCloseTo(0.71755, 5);
    expect(FRENCH.find((r) => r.id === "12 Fr")!.mm).toBeCloseTo(4, 10);
    for (let i = 1; i < NEEDLES.length; i++) expect(NEEDLES[i].mm).toBeLessThan(NEEDLES[i - 1].mm);
  });
});
