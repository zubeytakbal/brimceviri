import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HESAPLAYICI_GRUPLARI, HIZLI_KATEGORILER, SIK_GRUPLARI } from "../app/components/yeni/anaSayfaVerisi";
import { conversionPages } from "../app/converter/conversionPages";
import { hizliCevirmeVerisi } from "../app/converter/hizliCevirmeVeri";
import { ciftYayinda } from "../app/converter/mergedPairs";
import { isClosedPath } from "../app/indexPolicy";
import { HESAP_GRUP_SLUGLARI, isYeniYapiYolu } from "../app/converter/siteYapisi";

describe("Türkçe ana sayfa listeleri", () => {
  const hesaplayicilar = HESAPLAYICI_GRUPLARI.flatMap((g) => g.linkler);

  it("sık dönüşümler yayında olan çiftler", () => {
    const slugs = new Set(conversionPages.map((p) => p.slug));
    for (const s of SIK_GRUPLARI.flatMap((g) => g.sluglar)) {
      expect(slugs.has(s), s).toBe(true);
      expect(ciftYayinda(s), s).toBe(true);
    }
  });

  it("hesaplayıcılar Google'a açık ve tekrarsız", () => {
    for (const l of hesaplayicilar) expect(isClosedPath(l.href), l.href).toBe(false);
    expect(new Set(hesaplayicilar.map((l) => l.href)).size).toBe(hesaplayicilar.length);
  });

  it("sabit adresli hesaplayıcıların sayfası var", () => {
    for (const { href } of hesaplayicilar) {
      if (href.includes("/elektrik-hesaplari/") || href.startsWith("/altin-hesaplama/")) continue; // dinamik rota
      if (/-ayar-altin-/.test(href)) continue; // çift sayfası, [slug] rotasından üretilir
      expect(existsSync(`app${href}/page.tsx`), href).toBe(true);
    }
  });

  it("grup slug'ları tekrarsız ve site yapısındaki listeyle aynı", () => {
    const sluglar = HESAPLAYICI_GRUPLARI.map((g) => g.slug);
    expect(new Set(sluglar).size).toBe(sluglar.length);
    expect([...HESAP_GRUP_SLUGLARI].sort()).toEqual([...sluglar].sort());
    expect(isYeniYapiYolu("/hesaplayicilar/finans-ve-maas")).toBe(true);
    expect(isYeniYapiYolu("/hesaplayicilar/ohm-yasasi")).toBe(false);
    expect(isYeniYapiYolu("/ceviriciler/temel")).toBe(true);
  });

  it("hızlı çeviricinin ilk birimleri veride var", () => {
    const { kategoriler } = hizliCevirmeVerisi(null);
    for (const [anahtar, birimler] of Object.entries(HIZLI_KATEGORILER)) {
      const k = kategoriler.find((x) => x.key === anahtar);
      expect(k, anahtar).toBeTruthy();
      for (const s of birimler) expect(k!.birimler.some((b) => b.s === s), `${anahtar}: ${s}`).toBe(true);
    }
  });
});
