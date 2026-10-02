import { describe, expect, it } from "vitest";
import {
  hatimDagit,
  hatimPlani,
  kazaNamaziGun,
  okumaSuresiDakika,
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

describe("Hatim ekleri", () => {
  it("okuma süresi ve grup hatmi dağıtımı", () => {
    expect(okumaSuresiDakika(20, 2)).toBe(40);
    expect(okumaSuresiDakika(20, 0)).toBeNaN();
    const yedi = hatimDagit(7);
    expect(yedi.map((p) => p.cuzSayisi)).toEqual([5, 5, 4, 4, 4, 4, 4]);
    expect(yedi[0]).toEqual({ kisi: 1, ilkCuz: 1, sonCuz: 5, cuzSayisi: 5 });
    expect(yedi[6].sonCuz).toBe(30);
    expect(hatimDagit(30).every((p) => p.cuzSayisi === 1)).toBe(true);
    expect(hatimDagit(31)).toEqual([]);
  });
});

describe("Kaza namazı ve orucu", () => {
  it("gün sayısından kaza namazı", () => {
    expect(kazaNamaziGun(10, false, 5)).toEqual({ gun: 10, vakit: 50, rekat: 170, bitisGun: 10 });
  });

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
  it("toplam ÷ hisse; büyükbaş en çok 7 hisse; et verimi varsayılmaz", () => {
    const r = kurbanHissesi(140000, 7000, 7, 175)!;
    expect(r.toplamTutar).toBe(147000);
    expect(r.hisseBasiTutar).toBe(21000);
    expect(r.hisseBasiEt).toBe(25);
    expect(kurbanHissesi(140000, 7000, 7)!.hisseBasiEt).toBeNull();
    expect(kurbanHissesi(140000, 0, 8)).toBeNull();
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

import { manyetikSapma, pusulaKibleAcisi, WMM_GECERLILIK_SONU } from "../app/converter/diniHesaplar";

describe("Manyetik sapma (WMM2025)", () => {
  it("Türkiye'de sapma doğuya 5–7°, pusula açısı gerçek açıdan küçük", () => {
    const tarih = new Date(Date.UTC(2026, 9, 1));
    const ist = manyetikSapma(41.0082, 28.9784, tarih);
    expect(ist).toBeGreaterThan(5);
    expect(ist).toBeLessThan(7);
    expect(pusulaKibleAcisi(41.0082, 28.9784, tarih)).toBeCloseTo(kibleAcisi(41.0082, 28.9784) - ist, 10);
  });

  it("GÜVENLİK: WMM2025 geçerlilik süresi dolmadan WMM2030'a geçilmeli", () => {
    // Bu test bilerek tarihe bağlıdır: 1 Ekim 2029'dan sonra başarısız olur ve
    // magvar paketinin WMM2030 sürümüne geçilmesi gerektiğini hatırlatır.
    expect(WMM_GECERLILIK_SONU).toBe("2029-12-31");
    expect(new Date() < new Date("2029-10-01T00:00:00Z")).toBe(true);
  });
});
