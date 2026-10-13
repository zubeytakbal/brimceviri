import { describe, expect, it } from "vitest";
import { STEEL_SECTIONS, type SteelSeriesId } from "../app/converter/metal/steelSections";
import { iSectionAreaCm2, iSectionIyCm4, iSectionIzCm4 } from "../app/converter/metal/steelSectionMath";

const rel = (a: number, b: number) => Math.abs(a / b - 1);

describe("çelik profil verisi katalogla ve formülle tutarlı", () => {
  const parallel: SteelSeriesId[] = ["IPE", "HEA", "HEB", "HEM"];
  for (const id of parallel) {
    it.each(STEEL_SECTIONS[id].map((s) => [`${id} ${s.size}`, s] as const))("%s: alan, ağırlık, atalet", (_name, s) => {
      expect(rel(iSectionAreaCm2(s), s.A)).toBeLessThan(0.01);
      expect(rel((s.A * 7850) / 1e4, s.G)).toBeLessThan(0.015);
      expect(rel(iSectionIyCm4(s), s.Iy)).toBeLessThan(0.005);
      expect(rel(iSectionIzCm4(s), s.Iz)).toBeLessThan(0.005);
      expect(rel(s.Iy / (s.h / 20), s.Wely)).toBeLessThan(0.005);
      expect(rel(s.Iz / (s.b / 20), s.Welz)).toBeLessThan(0.005);
    });
  }

  for (const id of ["UPN", "IPN"] as SteelSeriesId[]) {
    it.each(STEEL_SECTIONS[id].map((s) => [`${id} ${s.size}`, s] as const))("%s: ağırlık ve kesit modülü", (_name, s) => {
      expect(rel((s.A * 7850) / 1e4, s.G)).toBeLessThan(0.015);
      expect(rel(s.Iy / (s.h / 20), s.Wely)).toBeLessThan(0.005);
    });
  }

  it("seri boyutları", () => {
    expect(STEEL_SECTIONS.IPE).toHaveLength(18);
    expect(STEEL_SECTIONS.HEA).toHaveLength(24);
    expect(STEEL_SECTIONS.HEB).toHaveLength(24);
    expect(STEEL_SECTIONS.UPN).toHaveLength(18);
    expect(STEEL_SECTIONS.IPN).toHaveLength(21);
  });

  it("bilinen değerler", () => {
    const ipe200 = STEEL_SECTIONS.IPE.find((s) => s.size === 200)!;
    expect(ipe200).toMatchObject({ G: 22.4, h: 200, b: 100, tw: 5.6, tf: 8.5, A: 28.5, Iy: 1943 });
    const hea300 = STEEL_SECTIONS.HEA.find((s) => s.size === 300)!;
    expect(hea300.h).toBe(290);
    const heb300 = STEEL_SECTIONS.HEB.find((s) => s.size === 300)!;
    expect(heb300.h).toBe(300);
  });
});
