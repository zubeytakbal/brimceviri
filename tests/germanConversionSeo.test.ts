import { describe, expect, it } from "vitest";
import {
  GERMAN_SEO_OVERRIDES,
  germanConversionSeo,
  germanPair,
} from "../app/converter/germanConversionSeo";
import { germanConversionPages, findGermanConversionPage } from "../app/converter/localizedGermanConversionPages";

const page = (slug: string) => {
  const found = findGermanConversionPage(slug);
  if (!found) throw new Error(slug);
  return found;
};

describe("Almanca dönüşüm SEO metinleri", () => {
  it("her özel içerik gerçek bir sayfaya ait", () => {
    expect(Object.keys(GERMAN_SEO_OVERRIDES).filter((slug) => !findGermanConversionPage(slug))).toEqual([]);
  });

  it("her sayfada sonekle ya da soneksiz 60 karaktere sığan bir başlık adayı var", () => {
    const tooLong = germanConversionPages.filter(
      (item) => !germanConversionSeo(item).titles.some((title) => title.length <= 60)
    );
    expect(tooLong.map((item) => item.slug)).toEqual([]);
  });

  it("özel açıklamalar 165 karakteri aşmaz (Google kesmesin)", () => {
    const long = Object.entries(GERMAN_SEO_OVERRIDES)
      .filter(([, value]) => (value.description ?? "").length > 165)
      .map(([slug, value]) => `${slug}: ${value.description!.length}`);
    expect(long).toEqual([]);
  });

  it("sembol Almanca yazılır: °F, °C, kn, t", () => {
    expect(germanPair(page("fahrenheit-celsius"), 100)).toBe("100 °F = 37,777778 °C");
    expect(germanPair(page("knoten-kilometer-pro-stunde"), 30)).toBe("30 kn = 55,56 km/h");
    expect(germanPair(page("tonne-kilogramm"), 3.5)).toBe("3,5 t = 3.500 kg");
  });

  it("açıklama ve SSS'teki sayılar hesapla tutarlı", () => {
    const check = (slug: string, value: number, expected: number, digits = 2) => {
      const p = page(slug);
      const row = germanPair(p, value).split(" = ")[1].split(" ")[0];
      const actual = Number(row.replace(/\./g, "").replace(",", "."));
      expect(actual).toBeCloseTo(expected, digits);
    };
    check("knoten-kilometer-pro-stunde", 10, 18.52);
    check("knoten-kilometer-pro-stunde", 20, 37.04);
    check("psi-bar", 30, 2.068, 3);
    check("psi-bar", 32, 2.206, 3);
    check("psi-bar", 35, 2.413, 3);
    check("fahrenheit-celsius", 350, 176.667, 2);
    check("fahrenheit-celsius", 98.6, 37, 4);
    check("fahrenheit-celsius", 0, -17.778, 2);
    check("celsius-fahrenheit", 180, 356, 4);
    check("fuss-meter", 6, 1.8288, 4);
    check("fuss-meter", 100, 30.48, 4);
    check("meile-kilometer", 26.2, 42.165, 2);
    check("gallone-liter", 5, 18.927, 2);
    check("barrel-liter", 1, 158.987, 2);
    check("kelvin-celsius", 300, 26.85, 4);
    check("hektar-quadratmeter", 1, 10000, 4);
  });

  it("özel tablo değerleri gerçekten tabloya gelir", () => {
    expect(germanConversionSeo(page("knoten-kilometer-pro-stunde")).exampleValues).toContain(30);
    expect(germanConversionSeo(page("psi-bar")).exampleValues).toContain(32);
  });

  it("sıcaklık sayfasının başlığında '1 Fahrenheit' yok, formül var", () => {
    const seo = germanConversionSeo(page("fahrenheit-celsius"));
    expect(seo.titles[0]).not.toMatch(/^1 /);
    expect(seo.description).toContain("(°F − 32) × 5/9");
  });

  it("genel şablon kısaltmayı başlığa ekler", () => {
    expect(germanConversionSeo(page("kilometer-meter")).titles[0]).toBe("Kilometer in Meter (km in m) umrechnen – mit Tabelle");
  });
});
