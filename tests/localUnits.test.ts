import { describe, expect, it } from "vitest";
import { convert } from "../app/converter/convert";
import { norwegianConversionPages } from "../app/converter/localizedNorwegianConversionPages";
import { swedishConversionPages } from "../app/converter/localizedSwedishConversionPages";
import { getLocalizedUnitOptions } from "../app/converter/localizedUnitOptions";
import { italianConversionPages } from "../app/converter/localizedItalianConversionPages";
import { nederlandsConversionPages } from "../app/converter/localizedNederlandsConversionPages";
import { portugueseConversionPages } from "../app/converter/localizedPortugueseConversionPages";

describe("Iskandinav mili (10 km)", () => {
  it("10 km'ye esittir ve Ingiliz milinden farklidir", () => {
    expect(convert("uzunluk", 1, "mil", "km")).toBeCloseTo(10, 9);
    expect(convert("uzunluk", 1, "mil", "mi")).toBeCloseTo(10000 / 1609.344, 9);
  });

  it.each([
    ["sv", swedishConversionPages],
    ["no", norwegianConversionPages],
  ])("%s: mil <-> kilometer ve engelsk mil sayfalari var, ters sayfalari da mevcut", (_locale, pages) => {
    const slugs = new Set(pages.map((page) => page.slug));
    for (const slug of ["mil-kilometer", "kilometer-mil", "mil-engelsk-mil", "engelsk-mil-mil"]) {
      expect(slugs.has(slug), slug).toBe(true);
    }
    const milPages = pages.filter((page) => page.fromUnit === "mil" || page.toUnit === "mil");
    for (const page of milPages) {
      expect(slugs.has(page.reverseSlug), page.reverseSlug).toBe(true);
    }
  });
});

describe("cevirici acilir listesi sayfanin dilinde", () => {
  it("Isvecce etiketler Isvecce birim adlarini kullanir", () => {
    const labels = Object.fromEntries(
      getLocalizedUnitOptions("uzunluk", "sv").map((option) => [option.value, option.label])
    );
    expect(labels.mi).toBe("Engelsk mil");
    expect(labels.mil).toBe("Mil");
  });
});

describe("yerel kutle birimleri", () => {
  it("degerler dogru", () => {
    expect(convert("kutle", 1, "hg", "g")).toBeCloseTo(100, 9);
    expect(convert("kutle", 1, "pond", "kg")).toBeCloseTo(0.5, 9);
    expect(convert("kutle", 1, "@", "kg")).toBeCloseTo(15, 9);
    expect(convert("kutle", 1, "pond", "lb")).not.toBeCloseTo(1, 2);
  });

  it.each([
    ["nl", nederlandsConversionPages, ["ons-gram", "gram-ons", "ons-kilogram", "pond-500g-kilogram", "kilogram-pond-500g"]],
    ["it", italianConversionPages, ["etto-grammo", "grammo-etto"]],
    ["pt", portugueseConversionPages, ["arroba-quilograma", "quilograma-arroba"]],
  ] as const)("%s: sayfalar var", (_locale, pages, expected) => {
    const slugs = new Set(pages.map((page) => page.slug));
    for (const slug of expected) expect(slugs.has(slug), slug).toBe(true);
  });
});

describe("dil basina donusum adresleri benzersiz", () => {
  it.each([
    ["sv", swedishConversionPages],
    ["no", norwegianConversionPages],
    ["nl", nederlandsConversionPages],
    ["it", italianConversionPages],
    ["pt", portugueseConversionPages],
  ] as const)("%s", (_locale, pages) => {
    const seen = new Set<string>();
    const duplicates = pages.map((page) => page.slug).filter((slug) => (seen.has(slug) ? true : (seen.add(slug), false)));
    expect(duplicates).toEqual([]);
  });
});
