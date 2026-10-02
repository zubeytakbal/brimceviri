import { describe, expect, it } from "vitest";
import {
  hatimPlani,
  kabeMesafesi,
  kazaNamazi,
  kazaOrucu,
  kibleAcisi,
  kurbanHissesi,
  seferDurumu,
  umreMesafe,
  yonAdi,
  zekatHesapla,
} from "../app/converter/diniHesaplar";
import { roadKm } from "../app/converter/geo/provinceDistances";
import { findProvince } from "../app/converter/geo/turkeyProvinces";

describe("Kıble", () => {
  it("Türkiye'den kıble güneydoğu yönünde, İstanbul ≈ 151°", () => {
    const ist = kibleAcisi(41.0082, 28.9784);
    expect(ist).toBeGreaterThan(145);
    expect(ist).toBeLessThan(158);
    expect(yonAdi(ist)).toBe("Güney-güneydoğu");
    // Van, Kâbe'ye göre daha doğuda: açı daha güneye döner
    expect(kibleAcisi(38.5, 43.38)).toBeGreaterThan(170);
  });

  it("Kâbe mesafesi: İstanbul–Mekke kuş uçuşu ≈ 2.400 km", () => {
    expect(kabeMesafesi(41.0082, 28.9784)).toBeGreaterThan(2300);
    expect(kabeMesafesi(41.0082, 28.9784)).toBeLessThan(2500);
  });
});

describe("Hatim", () => {
  it("30 günde hatim: günde 21 sayfa (604 ÷ 30 yukarı), 1 cüz", () => {
    const p = hatimPlani(30)!;
    expect(p.gunlukSayfa).toBe(21);
    expect(p.gunlukCuz).toBeCloseTo(1.0, 6);
    expect(hatimPlani(30, 604)).toBeNull();
    expect(hatimPlani(10, 304)!.gunlukSayfa).toBe(30);
  });
});

describe("Kaza namazı ve orucu", () => {
  it("1 yıl, vitir dahil: 2.190 vakit, 7.300 rekât", () => {
    const k = kazaNamazi(1, 0, 0, true, 5)!;
    expect(k.gun).toBe(365);
    expect(k.vakit).toBe(365 * 6);
    expect(k.rekat).toBe(365 * 20);
    expect(k.bitisGun).toBe(Math.ceil((365 * 6) / 5));
    expect(kazaNamazi(0, 0, 0, true, 5)).toBeNull();
  });

  it("kaza orucu: 2 Ramazan × 30 + 5 gün, haftada 2 gün", () => {
    expect(kazaOrucu(2, 30, 5, 2)).toEqual({ gun: 65, bitisHafta: 33 });
    expect(kazaOrucu(1, 31, 0, 2)).toBeNull();
    expect(kazaOrucu(0, 30, 0, 2)).toBeNull();
  });
});

describe("Zekât", () => {
  it("nisap 80,18 g altın; üstündeyse net varlığın kırkta biri", () => {
    const r = zekatHesapla({ nakit: 300000, banka: 100000, doviz: 0, ticariMal: 0, alacak: 0, borc: 50000, altinGram: 20, altinAyar: 22, altinGramFiyati: 4000 })!;
    expect(r.safAltinGram).toBeCloseTo(20 * (22 / 24), 10);
    expect(r.nisapDegeri).toBeCloseTo(80.18 * 4000, 6);
    expect(r.netVarlik).toBeCloseTo(350000 + r.altinDegeri, 6);
    expect(r.zekat).toBeCloseTo(r.netVarlik / 40, 6);
    const az = zekatHesapla({ nakit: 100000, banka: 0, doviz: 0, ticariMal: 0, alacak: 0, borc: 0, altinGram: 0, altinAyar: 24, altinGramFiyati: 4000 })!;
    expect(az.nisapUstunde).toBe(false);
    expect(az.zekat).toBe(0);
  });
});

describe("Kurban hissesi", () => {
  it("toplam ÷ hisse; büyükbaş en çok 7 hisse", () => {
    const r = kurbanHissesi(140000, 7000, 7, 600, 50)!;
    expect(r.hisseBasiTutar).toBe(21000);
    expect(r.toplamEt).toBe(300);
    expect(r.hisseBasiEt).toBeCloseTo(300 / 7, 10);
    expect(kurbanHissesi(140000, 0, 8, 600, 50)).toBeNull();
  });
});

describe("Seferîlik", () => {
  it("90 km sınırı, il merkezleri arasında 90–120 km 'sınırda'", () => {
    expect(seferDurumu(60)).toBe("degil");
    expect(seferDurumu(100)).toBe("sinirda");
    expect(seferDurumu(100, false)).toBe("seferi");
    expect(seferDurumu(150)).toBe("seferi");
    expect(seferDurumu(-1)).toBeNull();
  });

  it("KGM tablosuyla: İstanbul–Ankara seferî, Adana–Mersin sınırda değil", () => {
    const ist = findProvince("istanbul")!;
    const ank = findProvince("ankara")!;
    expect(seferDurumu(roadKm(ist, ank))).toBe("seferi");
    const adana = findProvince("adana")!;
    const mersin = findProvince("mersin")!;
    const km = roadKm(adana, mersin);
    expect(km).toBeGreaterThan(0);
    expect(seferDurumu(km)).not.toBeNull();
  });
});

describe("Umre mesafesi", () => {
  it("Kâbe'ye 6 m uzaktan tavaf ≈ 75 m/şavt, 7 şavt ≈ 528 m; sa'y 7 × 400 m", () => {
    const r = umreMesafe({ duvaraUzaklikM: 6, tavafSayisi: 1, sayYapilacak: true, safaMerveM: 400, adimCm: 70, hizKmSaat: 4 })!;
    expect(r.tavafSavtM).toBeCloseTo(2 * Math.PI * 12, 10);
    expect(r.tavafToplamM).toBeCloseTo(7 * 2 * Math.PI * 12, 10);
    expect(r.sayToplamM).toBe(2800);
    expect(r.adim).toBe(Math.round(r.toplamM / 0.7));
    expect(r.dakika).toBeCloseTo((r.toplamM / 1000 / 4) * 60, 10);
    expect(umreMesafe({ duvaraUzaklikM: 6, tavafSayisi: 1, sayYapilacak: true, safaMerveM: 100, adimCm: 70, hizKmSaat: 4 })).toBeNull();
  });
});

import { ayrilmaEki } from "../app/converter/diniHesaplar";
import { turkeyProvinces } from "../app/converter/geo/turkeyProvinces";

describe("Türkçe ayrılma eki", () => {
  it("il adlarında doğru ek", () => {
    expect(ayrilmaEki("İstanbul")).toBe("İstanbul'dan");
    expect(ayrilmaEki("İzmir")).toBe("İzmir'den");
    expect(ayrilmaEki("Muş")).toBe("Muş'tan");
    expect(ayrilmaEki("Kilis")).toBe("Kilis'ten");
    expect(ayrilmaEki("Ağrı")).toBe("Ağrı'dan");
    expect(ayrilmaEki("Düzce")).toBe("Düzce'den");
    expect(ayrilmaEki("Hakkari")).toBe("Hakkari'den");
    expect(ayrilmaEki("Kars")).toBe("Kars'tan");
    expect(ayrilmaEki("Bolu")).toBe("Bolu'dan");
    expect(ayrilmaEki("Ordu")).toBe("Ordu'dan");
    expect(ayrilmaEki("Elazığ")).toBe("Elazığ'dan");
    for (const p of turkeyProvinces) expect(ayrilmaEki(p.name)).toMatch(/'(d|t)(a|e)n$/);
  });
});
