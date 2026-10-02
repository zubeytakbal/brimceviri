import { describe, expect, it } from "vitest";
import { conversionPages } from "../app/converter/conversionPages";
import { convert } from "../app/converter/convert";
import { TURKISH_SEO_OVERRIDES, turkishConversionSeo } from "../app/converter/turkishConversionSeo";

const page = (slug: string) => {
  const found = conversionPages.find((item) => item.slug === slug);
  if (!found) throw new Error(slug);
  return found;
};
const c = (slug: string, value: number) => {
  const p = page(slug);
  return convert(p.category, value, p.fromUnit, p.toUnit);
};

describe("Türkçe dönüşüm SEO metinleri", () => {
  it("her özel içerik gerçek bir sayfaya ait", () => {
    const slugs = new Set(conversionPages.map((item) => item.slug));
    expect(Object.keys(TURKISH_SEO_OVERRIDES).filter((slug) => !slugs.has(slug))).toEqual([]);
  });

  it("her sayfada 60 karaktere sığan bir başlık adayı var", () => {
    const tooLong = conversionPages.filter((item) => !turkishConversionSeo(item).titles.some((title) => title.length <= 60));
    expect(tooLong.map((item) => item.slug)).toEqual([]);
  });

  it("özel açıklamalar 165 karakteri aşmaz", () => {
    const long = Object.entries(TURKISH_SEO_OVERRIDES)
      .filter(([, value]) => value.description.length > 165)
      .map(([slug, value]) => `${slug}: ${value.description.length}`);
    expect(long).toEqual([]);
  });

  it("açıklama ve SSS'teki sayılar hesapla tutarlı", () => {
    expect(c("metre-santimetre", 1.75)).toBeCloseTo(175, 8);
    expect(c("santimetre-milimetre", 2.5)).toBeCloseTo(25, 8);
    expect(c("hektar-donum", 2.5)).toBeCloseTo(25, 8);
    expect(c("donum-metrekare", 1)).toBeCloseTo(1000, 8);
    expect(c("dekar-donum", 1)).toBeCloseTo(1, 8);
    expect(c("fit-metre", 6)).toBeCloseTo(1.83, 2);
    expect(c("fit-metre", 20)).toBeCloseTo(6.1, 1);
    expect(c("fit-metre", 40)).toBeCloseTo(12.2, 1);
    expect(c("inc-santimetre", 55)).toBeCloseTo(139.7, 6);
    expect(c("inc-santimetre", 32)).toBeCloseTo(81.28, 6);
    expect(c("yarda-metre", 100)).toBeCloseTo(91.44, 6);
    expect(c("mil-kilometre", 26.2)).toBeCloseTo(42.16, 2);
    expect(c("mil-kilometre", 60)).toBeCloseTo(96.6, 1);
    expect(c("deniz-mili-kilometre", 100)).toBeCloseTo(185.2, 6);
    expect(c("varil-litre", 1)).toBeCloseTo(158.99, 2);
    expect(c("varil-litre", 100)).toBeCloseTo(15899, 0);
    expect(c("galon-litre", 5)).toBeCloseTo(18.93, 2);
    expect(c("galon-litre", 10)).toBeCloseTo(37.85, 2);
    expect(c("bar-psi", 2.2)).toBeCloseTo(31.9, 1);
    expect(c("bar-psi", 2.5)).toBeCloseTo(36.3, 1);
    expect(c("okka-kilogram", 40)).toBeCloseTo(51.3, 1);
    expect(c("okka-kilogram", 1)).toBeCloseTo(1.283, 3);
    expect(c("saat-saniye", 24)).toBeCloseTo(86400, 6);
    // 1 TB disk Windows'ta: 10^12 ÷ 1024^3 ≈ 931 GB
    expect(1e12 / 1024 ** 3).toBeCloseTo(931.3, 1);
    expect(c("terabayt-gigabayt", 1)).toBeCloseTo(1000, 6);
    expect(c("gigabayt-megabayt", 1)).toBeCloseTo(1000, 6);
  });

  it("veri birimlerinde 1 TB = 1.024 GiB gibi yanlış eşitlik yazılmaz", () => {
    for (const slug of ["terabayt-gigabayt", "gigabayt-megabayt"]) {
      const seo = TURKISH_SEO_OVERRIDES[slug];
      expect(seo.description).not.toMatch(/1 TB = [^.]*1\.024 GiB|1 GB = [^;.]*1\.024 MiB/);
    }
  });

  it("genel şablon eski başlığı korur, açıklamada birime uygun örnek verir", () => {
    const seo = turkishConversionSeo(page("kilometre-mil"));
    expect(seo.titles[0]).toBe("1 Kilometre Kaç Mil? – Çevirici");
    expect(seo.description).toMatch(/^1 Kilometre kaç Mil eder\? 1 km = 0,6214 mi\. Örnek: /);
    expect(seo.extraFaq).toEqual([]);
  });

  it("özel başlık aramadaki kısaltmayı içerir", () => {
    expect(turkishConversionSeo(page("metre-santimetre")).titles[0]).toContain("Kaç cm?");
    expect(turkishConversionSeo(page("santimetre-milimetre")).titles[0]).toContain("1 cm Kaç mm?");
    expect(turkishConversionSeo(page("kilogram-gram")).titles[0]).toContain("1 kg Kaç Gram?");
  });
});
