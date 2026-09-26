import { describe, expect, it } from "vitest";
import { convert } from "../app/converter/convert";
import { norwegianConversionPages } from "../app/converter/localizedNorwegianConversionPages";
import { swedishConversionPages } from "../app/converter/localizedSwedishConversionPages";
import { getLocalizedUnitOptions } from "../app/converter/localizedUnitOptions";

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
