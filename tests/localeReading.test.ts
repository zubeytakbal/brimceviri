import { describe, expect, it } from "vitest";
import { buildEnglishUnitWorked, englishUnitWorkedPlain } from "../app/converter/englishUnitWorked";
import { convert } from "../app/converter/convert";
import { englishUnitPages } from "../app/converter/localizedUnitPages";
import { buildCompoundReading, compoundReadingPlain } from "../app/converter/compoundReadingTr";
import { getAllCompoundProfiles } from "../app/converter/compoundsHub";
import { buildElementReading, elementReadingPlain } from "../app/converter/elementReadingTr";
import { periodicTable } from "../app/converter/periodicTableData";
import { countryReadingPlain } from "../app/converter/geo/countryReadingEn";
import { provinceReadingPlain } from "../app/converter/geo/provinceReadingTr";
import { worldCountries } from "../app/converter/geo/worldCountries";
import { turkeyProvinces } from "../app/converter/geo/turkeyProvinces";
import { buildMaterialReading, materialReadingPlain } from "../app/converter/materialReadingTr";
import { getAllMaterialProfiles } from "../app/converter/materialsHub";

const K = 6;

function scores(texts: string[], limit: number, k = K) {
  const words = texts.map((text) => text.toLowerCase().split(/\s+/).filter(Boolean));
  const freq = new Map<string, number>();
  for (const page of words) {
    const seen = new Set<string>();
    for (let i = 0; i + k <= page.length; i++) seen.add(page.slice(i, i + k).join(" "));
    for (const gram of seen) freq.set(gram, (freq.get(gram) ?? 0) + 1);
  }
  return words.map((page) => {
    const own = new Uint8Array(page.length).fill(1);
    const shared = new Set<string>();
    for (let i = 0; i + k <= page.length; i++) {
      const gram = page.slice(i, i + k).join(" ");
      if ((freq.get(gram) ?? 0) >= limit) {
        own.fill(0, i, i + k);
        shared.add(gram);
      }
    }
    const unique = page.reduce((sum, word, index) => sum + (own[index] ? word.length + 1 : 0), 0);
    return { unique, shared: shared.size };
  });
}

function expectFloor(texts: Array<{ name: string; text: string }>, floor: number, sharedCap: number) {
  const result = scores(texts.map((item) => item.text), 3);
  const widespread = Math.max(3, Math.ceil(texts.length * 0.3));
  const fiveGrams = scores(texts.map((item) => item.text), widespread, 5);
  let worstUnique = Infinity;
  let worstName = "";
  let worstShared = 0;
  let worstSharedName = "";
  result.forEach((item, index) => {
    if (item.unique < worstUnique) {
      worstUnique = item.unique;
      worstName = texts[index].name;
    }
  });
  fiveGrams.forEach((item, index) => {
    if (item.shared > worstShared) {
      worstShared = item.shared;
      worstSharedName = texts[index].name;
    }
  });
  expect(worstUnique, `${worstName} unique ${worstUnique}`).toBeGreaterThanOrEqual(floor);
  expect(worstShared, `${worstSharedName} widespread 5-grams ${worstShared}`).toBeLessThanOrEqual(sharedCap);
}

const summer = new Date("2026-07-15T12:00:00Z");

describe("countryReading", () => {
  it("clears the country-page gap on every country", () => {
    expectFloor(
      worldCountries.map((country) => ({ name: country.nameEn, text: countryReadingPlain(country, summer) })),
      750,
      8,
    );
  });

  it("states area, capital and a land border from the dataset", () => {
    const france = worldCountries.find((country) => country.iso3 === "FRA")!;
    const text = countryReadingPlain(france, summer);
    expect(text).toContain("France");
    expect(text).toContain(france.area.toLocaleString("en-US"));
    expect(text).toContain("Paris");
    expect(text).toContain("Germany");
    expect(text).toContain("not a timetable");
  });
});

describe("englishUnitWorked", () => {
  it("clears the unit-guide gap on every English unit", () => {
    expectFloor(
      englishUnitPages.map((page) => ({
        name: page.slug,
        text: englishUnitWorkedPlain(buildEnglishUnitWorked(page)),
      })),
      1000,
      8,
    );
  });

  it("treats karat as purity and keeps the piece weight", () => {
    const gold = englishUnitPages.find((page) => page.unit === "18K")!;
    const text = englishUnitWorkedPlain(buildEnglishUnitWorked(gold));
    const pure = convert("altin_ayar", 10, "18K", "24K");
    expect(text).toContain("still weighs 10 g");
    expect(text).toContain(pure.toLocaleString("en-US", { maximumFractionDigits: 6 }));
    expect(text).toContain("pure gold");
  });

  it("states the Celsius–Fahrenheit identity and the calorie definition", () => {
    const celsius = englishUnitPages.find((page) => page.unit === "C")!;
    expect(englishUnitWorkedPlain(buildEnglishUnitWorked(celsius))).toContain("−40");
    const calorie = englishUnitPages.find((page) => page.unit === "cal")!;
    const text = englishUnitWorkedPlain(buildEnglishUnitWorked(calorie));
    expect(text).toContain("4.184");
    expect(text).toContain("not a food Calorie");
    const glucose = englishUnitPages.find((page) => page.category === "kan_sekeri")!;
    expect(englishUnitWorkedPlain(buildEnglishUnitWorked(glucose)).toLowerCase()).not.toContain("diabetes");
  });
});

describe("Turkish readings", () => {
  it("clears the material gap", () => {
    const profiles = getAllMaterialProfiles();
    expectFloor(
      profiles.map((material) => ({ name: material.id, text: materialReadingPlain(material) })),
      700,
      8,
    );
    const flour = profiles.find((material) => material.id === "un");
    if (flour) expect(buildMaterialReading(flour).paragraphs[0]).toContain(flour.nameTr);
  });

  it("clears the compound and element gaps", () => {
    const compounds = getAllCompoundProfiles();
    expectFloor(
      compounds.map((compound) => ({ name: compound.id, text: compoundReadingPlain(compound) })),
      600,
      8,
    );
    const water = compounds.find((compound) => compound.formula === "H2O")!;
    const waterText = compoundReadingPlain(water);
    expect(waterText).toContain("H2O");
    expect(waterText).toContain(water.molarMass.toLocaleString("tr-TR", { maximumFractionDigits: 4 }));
    expect(buildCompoundReading(water).rows.length).toBeGreaterThan(5);

    expectFloor(
      periodicTable.map((element) => ({ name: element.symbol, text: elementReadingPlain(element) })),
      600,
      8,
    );
    const iron = periodicTable.find((element) => element.symbol === "Fe")!;
    expect(buildElementReading(iron).paragraphs[0]).toContain("Demir");
    expect(elementReadingPlain(iron)).toContain(String(iron.atomicNumber));
  });

  it("clears the province gap with the nearest road distance", () => {
    expectFloor(
      turkeyProvinces.map((province) => ({ name: province.id, text: provinceReadingPlain(province) })),
      250,
      8,
    );
    const ankara = turkeyProvinces.find((province) => province.id === "ankara")!;
    const text = provinceReadingPlain(ankara);
    expect(text).toContain("Ankara");
    expect(text).toContain("06");
    expect(text).toContain("KGM");
  });
});
