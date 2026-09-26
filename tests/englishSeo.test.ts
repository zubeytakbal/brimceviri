// Ingilizce donusum sayfalarinin baslik ve adlandirma kurallari.
import { describe, expect, it } from "vitest";
import {
  ENGLISH_TITLE_BUDGET,
  buildEnglishConversionTitle,
  pluralizeEnglishUnitName,
} from "../app/converter/englishUnitDisplay";
import { englishConversionPages } from "../app/converter/localizedConversionPages";

describe("ingilizce birim adlari", () => {
  it.each([
    ["Inch", "Inches"],
    ["Foot", "Feet"],
    ["Mile per Hour", "Miles per Hour"],
    ["Millimeter of Mercury", "Millimeters of Mercury"],
    ["Kilogram-Force", "Kilograms-Force"],
    ["Pound-Foot", "Pound-Feet"],
    ["Celsius", "Celsius"],
    ["Milligrams per Deciliter", "Milligrams per Deciliter"],
    ["Cubic Feet per Minute (CFM)", "Cubic Feet per Minute (CFM)"],
    ["Henry", "Henries"],
  ])("%s -> %s", (name, plural) => {
    expect(pluralizeEnglishUnitName(name)).toBe(plural);
  });
});

describe("ingilizce donusum basliklari", () => {
  it("hepsi sinirin icinde (sablon markasi ile 65 karakter)", () => {
    const tooLong = englishConversionPages
      .map((page) => buildEnglishConversionTitle(page))
      .filter((title) => title.length > ENGLISH_TITLE_BUDGET);
    expect(tooLong).toEqual([]);
  });

  it("aramalarla uyumlu kalip", () => {
    const page = englishConversionPages.find((candidate) => candidate.slug === "centimeters-to-inches");
    expect(page && buildEnglishConversionTitle(page)).toBe("Centimeters to Inches Converter (cm to in)");
  });

  it("basliklar benzersiz", () => {
    const titles = englishConversionPages.map((page) => buildEnglishConversionTitle(page));
    expect(titles.filter((title, index) => titles.indexOf(title) !== index)).toEqual([]);
  });
});
