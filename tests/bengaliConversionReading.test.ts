import { describe, expect, it } from "vitest";
import {
  bengaliConversionReadingPlain,
  buildBengaliConversionReading,
} from "../app/converter/bengaliConversionReading";
import { convert } from "../app/converter/convert";
import { bengaliConversionPages } from "../app/converter/localizedBengaliConversionPages";

function readingFor(category: string, fromUnit: string, toUnit: string) {
  const page = bengaliConversionPages.find(
    (item) => item.category === category && item.fromUnit === fromUnit && item.toUnit === toUnit,
  );
  if (!page) throw new Error(`missing ${category} ${fromUnit} ${toUnit}`);
  return buildBengaliConversionReading(page);
}

function formatBn(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("bn-BD", { maximumFractionDigits: 12 });
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

describe("bengali conversion reading", () => {
  const texts = bengaliConversionPages.map((page) => bengaliConversionReadingPlain(buildBengaliConversionReading(page)));

  it("gives every pair its own calculated examples", () => {
    const result = scores(texts, Math.max(3, Math.ceil(texts.length * 0.02)));
    let worst = Infinity;
    let worstAt = 0;
    result.forEach((item, index) => {
      if (item.unique < worst) {
        worst = item.unique;
        worstAt = index;
      }
    });
    expect(worst, `${bengaliConversionPages[worstAt].slug} unique ${worst}`).toBeGreaterThanOrEqual(1100);
    const widespread = Math.max(3, Math.ceil(texts.length * 0.3));
    const five = scores(texts, widespread, 5);
    expect(Math.max(...five.map((item) => item.shared))).toBeLessThanOrEqual(8);
    for (const text of texts) expect(text).not.toMatch(/NaN|undefined/);
  });

  it("uses the converter for metres, gold, temperature and calories", () => {
    const metres = bengaliConversionReadingPlain(readingFor("uzunluk", "m", "cm"));
    expect(metres).toContain(formatBn(100));
    expect(metres).toContain("মিটার");
    expect(metres).toContain("cm");

    const gold = bengaliConversionReadingPlain(readingFor("altin_ayar", "18K", "14K"));
    expect(gold).toContain(formatBn(10 * (18 / 24)));
    expect(gold).toContain("দাঁড়িপাল্লা");

    const temperature = bengaliConversionReadingPlain(readingFor("sicaklik", "C", "F"));
    expect(temperature).toContain(formatBn(-40));
    expect(temperature).toContain("একটি গুণক নেই");

    const calorie = bengaliConversionReadingPlain(readingFor("enerji", "cal", "J"));
    expect(calorie).toContain(formatBn(convert("enerji", 1, "cal", "J")));
    expect(calorie).toContain("খাদ্য");
  });
});
