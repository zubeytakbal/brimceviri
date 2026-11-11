import { describe, expect, it } from "vitest";
import { convert } from "../app/converter/convert";
import { italianConversionPages } from "../app/converter/localizedItalianConversionPages";
import { nederlandsConversionPages } from "../app/converter/localizedNederlandsConversionPages";
import { portugueseConversionPages } from "../app/converter/localizedPortugueseConversionPages";
import { spanishConversionPages } from "../app/converter/localizedSpanishConversionPages";
import { spanishUnitPages } from "../app/converter/localizedSpanishUnitPages";

describe("Iskandinav mili (10 km)", () => {
  it("10 km'ye esittir ve Ingiliz milinden farklidir", () => {
    expect(convert("uzunluk", 1, "mil", "km")).toBeCloseTo(10, 9);
    expect(convert("uzunluk", 1, "mil", "mi")).toBeCloseTo(10000 / 1609.344, 9);
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
    ["nl", nederlandsConversionPages],
    ["it", italianConversionPages],
    ["pt", portugueseConversionPages],
    ["es", spanishConversionPages],
  ] as const)("%s", (_locale, pages) => {
    const seen = new Set<string>();
    const duplicates = pages.map((page) => page.slug).filter((slug) => (seen.has(slug) ? true : (seen.add(slug), false)));
    expect(duplicates).toEqual([]);
  });
});

describe("ispanyolca birim sayfalari", () => {
  it.each([
    ["es", spanishUnitPages],
  ] as const)("%s: birim adresleri ve kaynaklari benzersiz", (_locale, pages) => {
    const slugs = pages.map((page) => page.slug);
    const sources = pages.map((page) => page.sourceSlug);
    expect(slugs.length - new Set(slugs).size).toBe(0);
    expect(sources.length - new Set(sources).size).toBe(0);
  });

  it("yaygin aramalarin sayfalari var", () => {
    const slugs = new Set(spanishConversionPages.map((page) => page.slug));
    for (const slug of ["pie-cuadrado-metro-cuadrado", "megabit-megabyte", "milimetro-de-mercurio-pascal", "onza-troy-gramo", "kilocaloria-kilojulio"]) {
      expect(slugs.has(slug), slug).toBe(true);
    }
  });
});
