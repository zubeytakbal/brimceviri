import { describe, expect, it } from "vitest";
import { cezaPuani, dotOku, erkenOdeme, gecikmeAy, lastikYasDurumu, muayeneTakvimi } from "../app/converter/aracHesaplari";

const d = (year: number, month: number, day: number) => ({ year, month, day });

describe("trafik cezası erken ödeme", () => {
  it("%25 indirim ve 1 ay süre", () => {
    const r = erkenOdeme(2000, d(2026, 10, 3), "elden", d(2026, 10, 10))!;
    expect(r.indirimli).toBe(1500);
    expect(r.indirim).toBe(500);
    expect(r.sonGun).toEqual(d(2026, 11, 3));
    expect(r.kalan).toBe(24);
  });
  it("e-Tebligat 5 gün sonra tebliğ sayılır; ay sonu sabitlenir", () => {
    expect(erkenOdeme(100, d(2026, 1, 1), "etebligat")!.teblig).toEqual(d(2026, 1, 6));
    expect(erkenOdeme(100, d(2026, 1, 31), "posta")!.sonGun).toEqual(d(2026, 2, 28));
    expect(erkenOdeme(0, d(2026, 1, 1), "posta")).toBeNull();
  });
});

describe("ceza puanı", () => {
  it("1 yıldan eski puanlar düşer", () => {
    const r = cezaPuani(
      [
        { tarih: d(2025, 9, 1), puan: 20 },
        { tarih: d(2026, 3, 1), puan: 15 },
        { tarih: d(2026, 8, 1), puan: 10 },
      ],
      d(2026, 10, 3),
    );
    expect(r.toplam).toBe(25);
    expect(r.kalan).toBe(75);
    expect(r.ilkSilinme).toEqual(d(2027, 3, 1));
    expect(r.doldu).toBeNull();
  });
  it("pencerede 100'e ulaşılan tarih", () => {
    const ihlaller = [20, 20, 20, 20, 20].map((puan, i) => ({ tarih: d(2026, i + 1, 10), puan }));
    expect(cezaPuani(ihlaller, d(2026, 6, 1)).doldu).toEqual(d(2026, 5, 10));
  });
});

describe("muayene", () => {
  it("hususi: ilk 3 yıl, sonra 2 yılda bir", () => {
    expect(muayeneTakvimi("hususi", d(2024, 5, 20), null, 3)).toEqual([d(2027, 5, 20), d(2029, 5, 20), d(2031, 5, 20)]);
  });
  it("son muayeneden; ticari her yıl", () => {
    expect(muayeneTakvimi("hususi", d(2018, 1, 1), d(2025, 4, 10), 1)).toEqual([d(2027, 4, 10)]);
    expect(muayeneTakvimi("ticari", d(2026, 2, 1), null, 2)).toEqual([d(2027, 2, 1), d(2028, 2, 1)]);
  });
  it("gecikme ayı", () => {
    expect(gecikmeAy(d(2026, 5, 1), d(2026, 4, 1))).toBe(0);
    expect(gecikmeAy(d(2026, 5, 1), d(2026, 5, 2))).toBe(1);
    expect(gecikmeAy(d(2026, 5, 1), d(2026, 7, 15))).toBe(3);
  });
});

describe("DOT kodu", () => {
  it("2523 → 2023'ün 25. haftası", () => {
    const r = dotOku("DOT EX 2B 1234 2523", d(2026, 10, 3));
    expect(r.durum).toBe("tamam");
    if (r.durum !== "tamam") return;
    expect(r.baslangic).toEqual(d(2023, 6, 19));
    expect(r.yas.years).toBe(3);
    expect(lastikYasDurumu(r.yasYil).seviye).toBe("iyi");
  });
  it("geçersiz ve eski kodlar", () => {
    expect(dotOku("5523", d(2026, 10, 3)).durum).toBe("gecersiz");
    expect(dotOku("0127", d(2026, 10, 3)).durum).toBe("gecersiz");
    expect(dotOku("258", d(2026, 10, 3)).durum).toBe("eski");
    expect(dotOku("12", d(2026, 10, 3)).durum).toBe("gecersiz");
    expect(lastikYasDurumu(6.5).seviye).toBe("uyari");
    expect(lastikYasDurumu(11).seviye).toBe("tehlike");
  });
});
