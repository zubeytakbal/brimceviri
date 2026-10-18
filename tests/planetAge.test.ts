import { describe, expect, it } from "vitest";
import { daysBetween, daysFromYears, planetAges } from "../app/converter/time/planetAge";

const byId = (rows: ReturnType<typeof planetAges>, id: string) => rows.find((r) => r.id === id)!;

describe("gezegenlerde yaş", () => {
  const rows = planetAges(daysFromYears(25));

  it("gezegenler Güneş'e uzaklık sırasıyla, yaş giderek küçülür", () => {
    expect(rows.map((r) => r.id)).toEqual(["merkur", "venus", "dunya", "mars", "jupiter", "saturn", "uranus", "neptun", "pluton"]);
    for (let i = 1; i < rows.length; i++) expect(rows[i].age).toBeLessThan(rows[i - 1].age);
  });

  it("25 yaş: Merkür 103,8, Mars 13,29, Jüpiter 2,11", () => {
    expect(byId(rows, "dunya").age).toBeCloseTo(25, 2);
    expect(byId(rows, "merkur").age).toBeCloseTo(103.8, 1);
    expect(byId(rows, "mars").age).toBeCloseTo(13.29, 2);
    expect(byId(rows, "jupiter").age).toBeCloseTo(2.108, 2);
  });

  it("Venüs'te 25 yılda yalnızca 78 Güneş günü geçer", () => {
    expect(Math.floor(byId(rows, "venus").localDays)).toBe(78);
  });

  it("doğum tarihinden sonraki doğum günleri", () => {
    const birth = new Date("2000-03-15T00:00:00Z");
    const r = planetAges(daysBetween(birth, new Date("2026-10-18T00:00:00Z")), birth);
    const earth = byId(r, "dunya").next!;
    expect(earth.age).toBe(27);
    expect(earth.date.toISOString().slice(0, 10)).toBe("2027-03-15");
    const mars = byId(r, "mars").next!;
    expect(mars.age).toBe(15);
    expect(mars.date.getTime()).toBeGreaterThan(Date.parse("2026-10-18T00:00:00Z"));
    expect((mars.date.getTime() - birth.getTime()) / 86400000).toBeCloseTo(15 * 686.98, 3);
  });
});

describe("tam yaş", () => {
  it("girilen Dünya yaşı aşağı yuvarlanmaz", () => {
    for (const a of [1, 18, 25, 40, 65]) expect(Math.floor(byId(planetAges(daysFromYears(a)), "dunya").age)).toBe(a);
  });
});
