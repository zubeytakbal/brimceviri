import { describe, expect, it } from "vitest";
import {
  arabicConversionReadingPlain,
  buildArabicConversionReading,
} from "../app/converter/arabicConversionReading";
import { convert } from "../app/converter/convert";
import { englishConversionPages } from "../app/converter/localizedConversionPages";
import { getArabicUnitName } from "../app/i18n/arabicLocalization";

function readingFor(category: string, fromUnit: string, toUnit: string) {
  const page = englishConversionPages.find(
    (item) => item.category === category && item.fromUnit === fromUnit && item.toUnit === toUnit,
  );
  if (!page) throw new Error(`missing ${category} ${fromUnit} ${toUnit}`);
  return buildArabicConversionReading({
    category: page.category,
    fromUnit: page.fromUnit,
    toUnit: page.toUnit,
    fromName: getArabicUnitName({ englishName: page.fromName, symbol: page.fromUnit }),
    toName: getArabicUnitName({ englishName: page.toName, symbol: page.toUnit }),
    exampleValues: page.exampleValues,
  });
}

function scores(texts: string[], limit: number, k = 6) {
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

describe("arabic conversion reading", () => {
  const texts = englishConversionPages.map((page) =>
    arabicConversionReadingPlain(
      buildArabicConversionReading({
        category: page.category,
        fromUnit: page.fromUnit,
        toUnit: page.toUnit,
        fromName: getArabicUnitName({ englishName: page.fromName, symbol: page.fromUnit }),
        toName: getArabicUnitName({ englishName: page.toName, symbol: page.toUnit }),
        exampleValues: page.exampleValues,
      }),
    ),
  );

  it("gives every pair its own calculated examples", () => {
    // Aynı 6'lı kalıp ancak dilin %2'sinde tekrar ederse sayfadan düşer.
    const result = scores(texts, Math.max(3, Math.ceil(texts.length * 0.02)));
    let worst = Infinity;
    let worstAt = 0;
    result.forEach((item, index) => {
      if (item.unique < worst) {
        worst = item.unique;
        worstAt = index;
      }
    });
    expect(worst, `${englishConversionPages[worstAt].slug} unique ${worst}`).toBeGreaterThanOrEqual(1100);
    const widespread = Math.max(3, Math.ceil(texts.length * 0.3));
    const five = scores(texts, widespread, 5);
    const worstShared = Math.max(...five.map((item) => item.shared));
    expect(worstShared).toBeLessThanOrEqual(8);
    for (const text of texts) {
      expect(text).not.toMatch(/NaN|undefined/);
    }
  });

  it("uses the converter for metres, gold, temperature and calories", () => {
    const metres = arabicConversionReadingPlain(readingFor("uzunluk", "m", "cm"));
    const hundred = new Intl.NumberFormat("ar", { maximumSignificantDigits: 12 }).format(100);
    expect(metres).toContain(hundred);
    expect(metres).toContain("m");
    expect(metres).toContain("cm");

    const gold = arabicConversionReadingPlain(readingFor("altin_ayar", "18K", "14K"));
    const pure = new Intl.NumberFormat("ar", { maximumSignificantDigits: 12 }).format(10 * (18 / 24));
    expect(gold).toContain(pure);
    expect(gold).toContain("ميزان");

    const temperature = arabicConversionReadingPlain(readingFor("sicaklik", "C", "F"));
    expect(temperature).toContain(new Intl.NumberFormat("ar", { maximumSignificantDigits: 12 }).format(-40));
    expect(temperature).toContain("لا يوجد معامل ضرب واحد");

    const calorie = arabicConversionReadingPlain(readingFor("enerji", "cal", "J"));
    const joule = new Intl.NumberFormat("ar", { maximumSignificantDigits: 12 }).format(
      Number(convert("enerji", 1, "cal", "J").toPrecision(12)),
    );
    expect(calorie).toContain(joule);
    expect(calorie).toContain("الغذائية");
  });
});
