import { describe, expect, it } from "vitest";
import { civcivIsisi, dekaraBitki, dogumTakvimi, ilaclama, toplamBitki, gebelikDurumu, kuluckaGunu, kuluckaRandimani, kuluckaTakvimi } from "../app/converter/hayvancilik";

const d = (year: number, month: number, day: number) => ({ year, month, day });

describe("doğum takvimi", () => {
  it("inek: 283 gün, kızgınlık 21 ve 42. gün, kuruya ayırma 60 gün önce", () => {
    const r = dogumTakvimi("inek", d(2026, 1, 1));
    expect(r.dogum).toEqual(d(2026, 10, 11));
    expect(r.kizginlik).toEqual([d(2026, 1, 22), d(2026, 2, 12)]);
    expect(r.kuru).toEqual(d(2026, 8, 12));
    expect(r.kontrol).toEqual(d(2026, 1, 31));
  });
  it("koyun: 150 gün, 17 günlük döngü; düvede kuruya ayırma yok", () => {
    const r = dogumTakvimi("koyun", d(2026, 9, 1));
    expect(r.dogum).toEqual(d(2027, 1, 29));
    expect(r.kizginlik[0]).toEqual(d(2026, 9, 18));
    expect(dogumTakvimi("duve", d(2026, 1, 1)).kuru).toBeNull();
  });
  it("gebelik durumu", () => {
    expect(gebelikDurumu("inek", d(2026, 1, 1), d(2026, 4, 1))).toEqual({ gun: 90, ay: 3, kalan: 193 });
  });
});

describe("kuluçka", () => {
  it("tavuk: 7 ve 14. gün kontrol, 18. günden sonra kilit, 21. gün çıkım", () => {
    const r = kuluckaTakvimi("tavuk", d(2026, 10, 1));
    expect(r.kontrol1).toEqual(d(2026, 10, 8));
    expect(r.kilit).toEqual(d(2026, 10, 19));
    expect(r.cikim).toEqual(d(2026, 10, 22));
  });
  it("aşamalar", () => {
    expect(kuluckaGunu("tavuk", d(2026, 10, 1), d(2026, 10, 1))).toEqual({ gun: 1, asama: "gelisim" });
    expect(kuluckaGunu("tavuk", d(2026, 10, 1), d(2026, 10, 19)).asama).toBe("kilit");
    expect(kuluckaGunu("bildircin", d(2026, 10, 1), d(2026, 10, 20)).asama).toBe("sonra");
  });
  it("civciv ısısı ve randıman", () => {
    expect(civcivIsisi(1)).toEqual({ alt: 33, ust: 35 });
    expect(civcivIsisi(6)).toEqual({ alt: 20, ust: 21 });
    const r = kuluckaRandimani(100, 90, 81)!;
    expect(r.dolluluk).toBeCloseTo(0.9);
    expect(r.cikis).toBeCloseTo(0.81);
    expect(r.dolluCikis).toBeCloseTo(0.9);
    expect(kuluckaRandimani(100, 90, 95)).toBeNull();
  });
});

describe("dekara fidan", () => {
  it("dikdörtgen ve üçgen dikim", () => {
    expect(dekaraBitki("dikdortgen", 10, 10)).toBeCloseTo(10);
    expect(dekaraBitki("dikdortgen", 4, 1.5)).toBeCloseTo(166.67, 1);
    expect(dekaraBitki("ucgen", 10, 0)).toBeCloseTo(11.55, 2);
    expect(dekaraBitki("dikdortgen", 0, 1)).toBeNull();
  });
  it("alan ve yedek", () => {
    expect(toplamBitki(166.67, 3, 10)).toEqual({ net: 500, yedekli: 551 });
  });
});

describe("ilaçlama", () => {
  it("dekara doz", () => {
    const r = ilaclama({ doz: 50, birim: "dekar", dekaraSu: 20, depo: 200, alan: 25 })!;
    expect(r.toplamSu).toBe(500);
    expect(r.toplamIlac).toBe(1250);
    expect(r.depoBasinaIlac).toBe(500);
    expect(r.depoBasinaAlan).toBe(10);
    expect(r.tamDepo).toBe(2);
    expect(r.sonDepoSu).toBe(100);
    expect(r.sonDepoIlac).toBe(250);
  });
  it("100 litre suya doz", () => {
    const r = ilaclama({ doz: 150, birim: "yuzLitre", dekaraSu: 100, depo: 1000, alan: 10 })!;
    expect(r.depoBasinaIlac).toBe(1500);
    expect(r.toplamIlac).toBe(1500);
    expect(r.tamDepo).toBe(1);
    expect(r.sonDepoSu).toBe(0);
    expect(ilaclama({ doz: 0, birim: "dekar", dekaraSu: 20, depo: 200, alan: 1 })).toBeNull();
  });
});

describe("ondalık sayı okuma", () => {
  it("virgül, nokta ve binlik", async () => {
    const { ondalik } = await import("../app/components/HayvancilikAraclari");
    expect(ondalik("1,5")).toBe(1.5);
    expect(ondalik("1.5")).toBe(1.5);
    expect(ondalik("1.000")).toBe(1000);
    expect(ondalik("1.000,5")).toBe(1000.5);
    expect(ondalik("200")).toBe(200);
    expect(ondalik("")).toBeNaN();
  });
});
