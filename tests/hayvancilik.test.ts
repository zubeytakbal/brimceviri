import { describe, expect, it } from "vitest";
import { civcivIsisi, dogumTakvimi, gebelikDurumu, kuluckaGunu, kuluckaRandimani, kuluckaTakvimi } from "../app/converter/hayvancilik";

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
