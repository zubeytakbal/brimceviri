import { describe, expect, it } from "vitest";
import {
  gelirVergisi,
  hizmetSuresi,
  ihbarHaftasi,
  kidemTavani,
  tazminat,
} from "../app/converter/turkishTazminat";

const d = (s: string) => {
  const [year, month, day] = s.split("-").map(Number);
  return { year, month, day };
};

describe("Kıdem ve ihbar tazminatı", () => {
  it("uses the ceiling valid on the termination date", () => {
    expect(kidemTavani(d("2026-06-30"))!.tutar).toBe(64948.77);
    expect(kidemTavani(d("2026-07-01"))!.tutar).toBe(73729.87);
    expect(kidemTavani(d("2025-12-31"))!.tutar).toBe(53919.68);
  });

  it("matches the official 2026 wage tax amounts", () => {
    expect(gelirVergisi(190000, 2026)).toBeCloseTo(28500, 6);
    expect(gelirVergisi(400000, 2026)).toBeCloseTo(70500, 6);
    expect(gelirVergisi(1500000, 2026)).toBeCloseTo(367500, 6);
    expect(gelirVergisi(5300000, 2026)).toBeCloseTo(1697500, 6);
  });

  it("computes service time and notice weeks", () => {
    expect(hizmetSuresi(d("2020-03-01"), d("2026-08-31"))).toMatchObject({
      yil: 6,
      ay: 6,
      gun: 0,
    });
    expect([0.4, 0.5, 1.49, 1.5, 2.9, 3].map(ihbarHaftasi)).toEqual([
      2, 4, 4, 6, 6, 8,
    ]);
  });

  it("computes severance and notice pay", () => {
    const r = tazminat({
      giris: d("2020-03-01"),
      cikis: d("2026-08-31"),
      brutMaas: 50000,
      ekOdemeler: 0,
      neden: "isveren-fesih",
      kumulatifMatrah: 300000,
    });
    expect(r.kidemBrut).toBeCloseTo(325000, 6);
    expect(r.kidemNet).toBeCloseTo(325000 * (1 - 0.00759), 6);
    expect(r.ihbarHafta).toBe(8);
    expect(r.ihbarBrut).toBeCloseTo((50000 / 30) * 56, 6);
    // 300.000 → 393.333: ganz im 20-%-Dilim
    expect(r.ihbarGelirVergisi).toBeCloseTo(r.ihbarBrut * 0.2, 4);
  });

  it("caps at the ceiling and respects the termination reason", () => {
    const hoch = tazminat({
      giris: d("2016-01-01"),
      cikis: d("2026-12-31"),
      brutMaas: 150000,
      ekOdemeler: 10000,
      neden: "isveren-fesih",
    });
    expect(hoch.tavanaTakildi).toBe(true);
    expect(hoch.kidemBrut).toBeCloseTo(73729.87 * 11, 4);
    expect(hoch.ihbarBrut).toBeCloseTo((160000 / 30) * 56, 6);
    expect(
      tazminat({
        giris: d("2020-01-01"),
        cikis: d("2026-05-31"),
        brutMaas: 40000,
        ekOdemeler: 0,
        neden: "istifa",
      }).kidemBrut,
    ).toBe(0);
    const emekli = tazminat({
      giris: d("2020-01-01"),
      cikis: d("2026-05-31"),
      brutMaas: 40000,
      ekOdemeler: 0,
      neden: "emeklilik",
    });
    expect(emekli.kidemBrut).toBeGreaterThan(0);
    expect(emekli.ihbarBrut).toBe(0);
    expect(
      tazminat({
        giris: d("2026-01-01"),
        cikis: d("2026-10-31"),
        brutMaas: 40000,
        ekOdemeler: 0,
        neden: "isveren-fesih",
      }).kidemHakki,
    ).toBe(false);
  });
});
