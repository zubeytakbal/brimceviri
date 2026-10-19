import { describe, expect, it } from "vitest";
import { aralikMetni, kapsamKitaplari, okumaPlani } from "../app/converter/christian/kutsalKitap";
import { KITAPLAR } from "../app/converter/christian/kutsalKitapVeri";

describe("Türkçe Kutsal Kitap okuma planı", () => {
  it("66 kitap, 1189 bölüm; Eski Antlaşma 39 kitap 929 bölüm, Yeni Antlaşma 27 kitap 260 bölüm", () => {
    expect(KITAPLAR).toHaveLength(66);
    expect(KITAPLAR.reduce((t, k) => t + k.bolum, 0)).toBe(1189);
    const eski = kapsamKitaplari(KITAPLAR, "eski");
    const yeni = kapsamKitaplari(KITAPLAR, "yeni");
    expect([eski.length, eski.reduce((t, k) => t + k.bolum, 0)]).toEqual([39, 929]);
    expect([yeni.length, yeni.reduce((t, k) => t + k.bolum, 0)]).toEqual([27, 260]);
    expect(KITAPLAR[18]).toMatchObject({ ad: "Mezmurlar", bolum: 150 });
    expect(KITAPLAR[39]).toMatchObject({ ad: "Matta", bolum: 28 });
  });

  it("plan bütün bölümleri bir kez ve sırayla kapsar", () => {
    const plan = okumaPlani(KITAPLAR, 365);
    expect(plan).toHaveLength(365);
    expect(plan.reduce((t, g) => t + g.adet, 0)).toBe(1189);
    expect(aralikMetni(plan[0].ilk, plan[0].son)).toBe("Yaratılış 1–4");
    expect(aralikMetni(plan[364].ilk, plan[364].son)).toBe("Vahiy 20–22");
  });

  it("Müjdeler 89 bölüm: 30 günde günde 3 bölüm civarı", () => {
    const plan = okumaPlani(kapsamKitaplari(KITAPLAR, "mujdeler"), 30);
    expect(plan.reduce((t, g) => t + g.adet, 0)).toBe(89);
    expect(Math.max(...plan.map((g) => g.adet))).toBe(3);
  });
});
