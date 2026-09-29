import { describe, expect, it } from "vitest";
import {
  hasGram,
  SIKKELER,
  sikkeToplam,
  taki,
  ZIYNET_MILYEM,
} from "../app/converter/turkishAltin";
import {
  altinOzet,
  altinSayfasi,
  esdeger,
} from "../app/converter/turkishAltinPages";

describe("Altın hesaplama", () => {
  it("uses Darphane weights and value ratios", () => {
    const g = Object.fromEntries(SIKKELER.map((s) => [s.id, s.gram]));
    expect(g["ceyrek-altin"] * 4).toBeCloseTo(g["tam-altin"], 9);
    expect(g["gremse-altin"]).toBeCloseTo(g["tam-altin"] * 2.5, 9);
    expect(g["besli-altin"]).toBeCloseTo(g["tam-altin"] * 5, 9);
    expect(g["ata-ceyrek"] * 4).toBeCloseTo(g["cumhuriyet-altini"], 9);
    expect(g["ata-besli"]).toBeCloseTo(g["cumhuriyet-altini"] * 5, 9);
    expect(hasGram(1.754, ZIYNET_MILYEM)).toBeCloseTo(1.6077, 4);
  });

  it("sums coins", () => {
    const t = sikkeToplam({ "ceyrek-altin": 4, "tam-altin": 1 });
    expect(t.brut).toBeCloseTo(14.032, 9);
    expect(t.ceyrekKarsiligi).toBe(8);
  });

  it("prices jewellery with workmanship", () => {
    const b = taki(20, 916, 20, 4000);
    expect(b.has).toBeCloseTo(18.32, 9);
    expect(b.hasIscilikli).toBeCloseTo(18.72, 9);
    expect(b.satisFiyati).toBeCloseTo(74880, 6);
  });

  it("builds page texts", () => {
    const c = altinSayfasi("ceyrek-altin")!;
    expect(esdeger(c)!.id).toBe("ata-ceyrek");
    expect(altinOzet(c).cumle).toContain("1,754 gram");
    expect(altinSayfasi("ata-yarim")).toBeNull();
  });
});
