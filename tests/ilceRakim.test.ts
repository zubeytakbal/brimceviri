import { describe, expect, it } from "vitest";
import { ILCE_RAKIMLARI } from "../app/converter/geo/ilceRakimlari";
import { bolgeSirasi, enYuksekIlceler, ilceOzeti, mutfakNotu, yakinIllerRakim } from "../app/converter/geo/ilceRakimHub";
import { turkeyProvinces } from "../app/converter/geo/turkeyProvinces";

describe("ilçe rakımları", () => {
  it("81 ilin hepsinde veri var, değerler makul", () => {
    expect(Object.keys(ILCE_RAKIMLARI).sort()).toEqual(turkeyProvinces.map((p) => p.id).sort());
    for (const liste of Object.values(ILCE_RAKIMLARI)) {
      for (const [ad, rakim] of liste) {
        expect(ad.length).toBeGreaterThan(1);
        expect(rakim).toBeGreaterThanOrEqual(0);
        expect(rakim).toBeLessThan(2600);
      }
      expect(new Set(liste.map((x) => x[0])).size).toBe(liste.length);
    }
  });
  it("merkez satırı il rakımıyla aynı", () => {
    for (const p of turkeyProvinces) {
      const merkez = ILCE_RAKIMLARI[p.id].find((x) => x[2] === true);
      if (merkez) expect(merkez[1]).toBe(p.elevationM);
    }
  });
  it("özet, bölge ve yakın iller", () => {
    const o = ilceOzeti("erzurum")!;
    expect(o.enYuksek.rakim).toBeGreaterThan(o.enAlcak.rakim);
    expect(enYuksekIlceler(5)).toHaveLength(5);
    expect(enYuksekIlceler(1)[0].rakim).toBeGreaterThan(2000);
    const b = bolgeSirasi("erzurum")!;
    expect(b.bolge).toBe("Doğu Anadolu");
    expect(b.sira).toBe(b.liste.findIndex((p) => p.id === "erzurum") + 1);
    expect(yakinIllerRakim("ankara", 3)).toHaveLength(3);
  });
  it("mutfak notu rakıma göre değişir", () => {
    expect(mutfakNotu(5).baslik).not.toBe(mutfakNotu(1900).baslik);
    expect(mutfakNotu(1900).metin).toMatch(/°C/);
  });
});

describe("eksik ilçeler", () => {
  it("dik yamaçtaki ilçe varsa özet kesin değildir", async () => {
    const { ILCE_EKSIK } = await import("../app/converter/geo/ilceRakimlari");
    expect(ILCE_EKSIK.rize.some((x) => x[0] === "İkizdere" && x[1])).toBe(true);
    const o = ilceOzeti("rize")!;
    expect(o.kesin).toBe(false);
    expect(o.eksik.egimli).toContain("İkizdere");
    for (const [il, liste] of Object.entries(ILCE_EKSIK)) {
      const var_ = new Set(ILCE_RAKIMLARI[il].map((x) => x[0]));
      for (const [ad] of liste) expect(var_.has(ad)).toBe(false);
    }
  });
});

describe("il karşılaştırma fizik", () => {
  it("paket, lastik, eğim", async () => {
    const { paketGenlesmesi, lastikGostergeArtisiBar, ortalamaEgim } = await import("../app/converter/provinceComparison");
    expect(paketGenlesmesi(1013, 811)).toBeCloseTo(1.249, 2);
    expect(lastikGostergeArtisiBar(1013, 913)).toBeCloseTo(0.1, 5);
    expect(ortalamaEgim(-850, 450)!.metre100km).toBeCloseTo(188.9, 0);
    expect(ortalamaEgim(100, 0)).toBeNull();
  });
});

describe("güzergâh üzerindeki iller", () => {
  it("İstanbul–Ankara ve tutarlılık", async () => {
    const { routeStops, roadKm } = await import("../app/converter/geo/provinceDistances");
    const { findProvince } = await import("../app/converter/geo/turkeyProvinces");
    const ist = findProvince("istanbul")!, ank = findProvince("ankara")!;
    expect(routeStops(ist, ank).map((s) => s.province.id)).toEqual(["kocaeli", "sakarya", "duzce", "bolu"]);
    const izm = findProvince("izmir")!, erz = findProvince("erzurum")!;
    const st = routeStops(izm, erz);
    const ids = [izm, ...st.map((s) => s.province), erz];
    let total = 0;
    for (let i = 1; i < ids.length; i++) total += roadKm(ids[i - 1], ids[i]);
    expect(total).toBeLessThanOrEqual(roadKm(izm, erz) * 1.02 + 5);
    expect(st.map((s) => s.fromStart)).toEqual(st.map((s) => s.fromStart).slice().sort((a, b) => a - b));
  });
});
