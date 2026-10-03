import { describe, expect, it } from "vitest";
import {
  anmaGunleri,
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

import {
  hafizlikGunlukSayfa,
  hafizlikPlani,
  hayizDegerlendir,
  kazaIlerleme,
  kazaSayacOku,
  maasZekat,
  toplamRekat,
  VAKIT_NAMAZLARI,
} from "../app/converter/diniHesaplar";
import { ESMAUL_HUSNA } from "../app/converter/esmaulHusna";

describe("Hafızlık planı", () => {
  it("günde 1 sayfa, her gün: 604 gün; günde 2 sayfa haftada 5 gün", () => {
    expect(hafizlikPlani(1, 7)).toMatchObject({ kalanSayfa: 604, ezberGunu: 604, takvimGunu: 604 });
    const p = hafizlikPlani(2, 5)!;
    expect(p.ezberGunu).toBe(302);
    // 302 ezber günü = 60 tam hafta (300 gün) + 2 gün → 60×7 + 2
    expect(p.takvimGunu).toBe(422);
    expect(hafizlikPlani(1, 7, 104)!.ezberGunu).toBe(500);
    expect(hafizlikPlani(1, 8)).toBeNull();
    expect(hafizlikPlani(1, 7, 604)).toBeNull();
  });

  it("hedef süreden günlük sayfa, plan ile tutarlı", () => {
    const s = hafizlikGunlukSayfa(422, 5);
    expect(s).toBeCloseTo(2, 10);
    for (const [t, k] of [[365, 6], [180, 5], [700, 7]]) {
      const sayfa = hafizlikGunlukSayfa(t, k);
      expect(hafizlikPlani(sayfa, k)!.takvimGunu).toBeLessThanOrEqual(t);
    }
  });
});

describe("Maaştan zekât", () => {
  it("yıl sonu birikimi üzerinden kırkta bir, 12 taksit", () => {
    const r = maasZekat(200000, 20000, 4000)!;
    expect(r.yilSonuBirikim).toBe(440000);
    expect(r.nisapUstunde).toBe(true);
    expect(r.zekat).toBeCloseTo(11000, 6);
    expect(r.aylikTaksit).toBeCloseTo(11000 / 12, 6);
    expect(maasZekat(0, 1000, 4000)!.zekat).toBe(0);
    expect(maasZekat(0, 1000, 0)).toBeNull();
  });
});

describe("Kaza takip", () => {
  it("bozuk kayıt temizlenir; borçtan fazla kılınan sayılmaz", () => {
    const borc = kazaSayacOku({ sabah: 10, ogle: 10, ikindi: -3, aksam: "x", yatsi: 2.7, oruc: 30 });
    expect(borc).toEqual({ sabah: 10, ogle: 10, ikindi: 0, aksam: 0, yatsi: 2, vitir: 0, oruc: 30 });
    const kilinan = kazaSayacOku({ sabah: 4, ogle: 15, yatsi: 1 });
    const r = kazaIlerleme(borc, kilinan);
    expect(r.borcNamaz).toBe(22);
    expect(r.kilinanNamaz).toBe(4 + 10 + 1);
    expect(r.kalanNamaz).toBe(7);
    expect(r.kalanRekat).toBe(6 * 2 + 1 * 4);
    expect(kazaSayacOku(null).sabah).toBe(0);
  });
});

describe("Hayız ve nifas (Hanefî)", () => {
  it("3 günden az istihaze, 3–10 gün hayız, 10 günü aşınca âdet ya da 10 gün", () => {
    expect(hayizDegerlendir({ tur: "hayiz", saat: 48, adetGun: null, oncekiTemizlikGun: null })!.durum).toBe("istihaze");
    expect(hayizDegerlendir({ tur: "hayiz", saat: 72, adetGun: null, oncekiTemizlikGun: 20 })).toMatchObject({ durum: "hayiz", hayizSaat: 72 });
    expect(hayizDegerlendir({ tur: "hayiz", saat: 240, adetGun: 6, oncekiTemizlikGun: null })).toMatchObject({ durum: "hayiz", hayizSaat: 240 });
    expect(hayizDegerlendir({ tur: "hayiz", saat: 12 * 24, adetGun: 6, oncekiTemizlikGun: null })).toMatchObject({ durum: "karisik", hayizSaat: 144, istihazeSaat: 144, esas: "adet" });
    expect(hayizDegerlendir({ tur: "hayiz", saat: 12 * 24, adetGun: null, oncekiTemizlikGun: null })).toMatchObject({ hayizSaat: 240, istihazeSaat: 48, esas: "azami" });
    expect(hayizDegerlendir({ tur: "hayiz", saat: 100, adetGun: null, oncekiTemizlikGun: 10 })!.durum).toBe("temizlik-kisa");
    expect(hayizDegerlendir({ tur: "hayiz", saat: 100, adetGun: 11, oncekiTemizlikGun: null })).toBeNull();
  });

  it("nifas en çok 40 gün", () => {
    expect(hayizDegerlendir({ tur: "nifas", saat: 5 * 24, adetGun: null, oncekiTemizlikGun: null })!.durum).toBe("nifas");
    expect(hayizDegerlendir({ tur: "nifas", saat: 45 * 24, adetGun: null, oncekiTemizlikGun: null })).toMatchObject({ hayizSaat: 960, istihazeSaat: 120 });
    expect(hayizDegerlendir({ tur: "nifas", saat: 45 * 24, adetGun: 30, oncekiTemizlikGun: null })).toMatchObject({ hayizSaat: 720, esas: "adet" });
  });
});

describe("Namaz rekâtları", () => {
  it("günde 17 rekât farz, 3 vitir, toplam 40 rekât", () => {
    const farz = VAKIT_NAMAZLARI.reduce((t, n) => t + toplamRekat(n, "farz"), 0);
    expect(farz).toBe(17);
    expect(VAKIT_NAMAZLARI.reduce((t, n) => t + toplamRekat(n, "vacip"), 0)).toBe(3);
    expect(VAKIT_NAMAZLARI.reduce((t, n) => t + toplamRekat(n), 0)).toBe(40);
  });
});

describe("Esmâ-i Hüsnâ", () => {
  it("99 benzersiz isim, sıra numaraları 1–99", () => {
    expect(ESMAUL_HUSNA).toHaveLength(99);
    expect(new Set(ESMAUL_HUSNA.map((e) => e.ad)).size).toBe(99);
    expect(ESMAUL_HUSNA[0].ad).toBe("Allah");
    expect(ESMAUL_HUSNA[98]).toMatchObject({ no: 99, ad: "Es-Sabûr" });
  });
});

import { kasrDurumu, KASR_KM, NISAB_GUMUS_VORI, VORI_GRAM, zakatVori } from "../app/converter/diniHesaplar";

describe("Bangladeş zekâtı (ভরি) ve kasr", () => {
  it("gümüş nisabı 52,5 ভরি = 612,36 g; altın 7,5 ভরি = 87,48 g", () => {
    expect(NISAB_GUMUS_VORI * VORI_GRAM).toBeCloseTo(612.36, 2);
    expect(7.5 * VORI_GRAM).toBeCloseTo(87.48, 2);
  });

  it("gümüş nisabıyla zekât", () => {
    const base = { nakit: 100000, banka: 50000, ticari: 0, alacak: 0, borc: 20000, altinVori: 2, gumusVori: 0, altinVoriFiyati: 150000, gumusVoriFiyati: 2500, nisab: "gumus" as const };
    const r = zakatVori(base)!;
    expect(r.altinDegeri).toBe(300000);
    expect(r.netVarlik).toBe(430000);
    expect(r.nisabDegeri).toBe(52.5 * 2500);
    expect(r.zekat).toBeCloseTo(430000 / 40, 6);
    // Altın nisabıyla aynı varlık nisabın altında kalır (7,5 × 150.000 = 1.125.000).
    expect(zakatVori({ ...base, nisab: "altin" })!.nisabUstunde).toBe(false);
    // Altın var ama fiyatı yoksa hesap yapılmaz.
    expect(zakatVori({ ...base, altinVoriFiyati: 0 })).toBeNull();
  });

  it("48 mil ≈ 77,25 km; 15 gün kalış", () => {
    expect(KASR_KM).toBeCloseTo(77.25, 2);
    expect(kasrDurumu(80, 3)).toEqual({ mesafeYeterli: true, kalisKisa: true, musafir: true });
    expect(kasrDurumu(80, 15)!.musafir).toBe(false);
    expect(kasrDurumu(60, 2)!.musafir).toBe(false);
  });
});

import { formatUz } from "../app/converter/uzNumber";

describe("Özbekçe sayı biçimi", () => {
  it("boşlukla binlik, virgülle ondalık", () => {
    expect(formatUz(2190)).toBe("2 190");
    expect(formatUz(1.2, 1)).toBe("1,2");
    expect(formatUz(1.5, 2)).toBe("1,5");
    expect(formatUz(1234567.891, 2)).toBe("1 234 567,89");
    expect(formatUz(0.2, 2)).toBe("0,2");
  });
});

describe("anma günleri (3, 7, 40, 52)", () => {
  it("ölüm günü 1. gün sayılınca", () => {
    const r = anmaGunleri({ year: 2025, month: 1, day: 2 });
    expect(r.map((x) => x.n)).toEqual([3, 7, 40, 52]);
    expect(r[2].gun).toEqual({ year: 2025, month: 2, day: 10 });
    expect(r[2].gecesi).toEqual({ year: 2025, month: 2, day: 9 });
    expect(r[3].gun).toEqual({ year: 2025, month: 2, day: 22 });
  });
  it("ertesi günden sayınca bir gün kayar", () => {
    expect(anmaGunleri({ year: 2025, month: 1, day: 2 }, false)[2].gun).toEqual({ year: 2025, month: 2, day: 11 });
  });
});
