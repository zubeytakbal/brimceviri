import { describe, expect, it } from "vitest";
import { anaCeviriciVerisi } from "../app/converter/anaCeviriciVeri";
import { birimCevir } from "../app/converter/hizliCevir";
import { hizliCevirmeVerisi } from "../app/converter/hizliCevirmeVeri";
import { populerDonusumler } from "../app/converter/populerDonusumler";
import sitemap from "../app/sitemap";

describe("ana sayfa çeviricisi", () => {
  const veri = anaCeviriciVerisi(hizliCevirmeVerisi(null));
  const sekme = (key: string) => veri.sekmeler.find((s) => s.key === key)!;
  const birim = (key: string, s: string) => sekme(key).birimler.find((b) => b.s === s)!;

  it("beş sekmenin hepsi var ve listedeki her birim kayıtta bulunuyor", () => {
    // Kayıttan bir simge silinir ya da değişirse birim listeden sessizce düşmesin.
    const beklenen: Record<string, number> = { uzunluk: 11, alan: 10, kutle: 10, hacim: 10, sicaklik: 5 };
    expect(veri.sekmeler.map((s) => s.key)).toEqual(Object.keys(beklenen));
    for (const [key, adet] of Object.entries(beklenen)) expect(sekme(key).birimler).toHaveLength(adet);
  });

  it("örnekler: 1 dönüm = 1.000 m², 1 inç = 2,54 cm, 100 °C = 212 °F", () => {
    expect(birimCevir(sekme("alan"), 1, birim("alan", "dönüm"), birim("alan", "m²"))).toBeCloseTo(1000, 9);
    expect(birimCevir(sekme("uzunluk"), 1, birim("uzunluk", "in"), birim("uzunluk", "cm"))).toBeCloseTo(2.54, 10);
    expect(birimCevir(sekme("sicaklik"), 100, birim("sicaklik", "C"), birim("sicaklik", "F"))).toBeCloseTo(212, 10);
  });

  it("çift sayfası bağlantıları doğru yöne gider", () => {
    expect(veri.sayfalar["alan|m²|dönüm"]).toBe("/metrekare-donum");
    expect(veri.sayfalar["alan|dönüm|m²"]).toBe("/donum-metrekare");
    expect(veri.sayfalar["uzunluk|in|cm"]).toBe("/inc-santimetre");
  });

  it("sık yapılan dönüşümlerin her adresi site haritasında", async () => {
    const adresler = new Set((await sitemap()).map((e) => new URL(e.url).pathname.replace(/\/$/, "")));
    for (const [ileri, ters] of populerDonusumler) {
      expect(adresler, ileri.href).toContain(ileri.href);
      expect(adresler, ters.href).toContain(ters.href);
    }
  });
});
