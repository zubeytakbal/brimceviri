import { describe, expect, it } from "vitest";
import { DE_JAHRE, DE_MONATE } from "../app/converter/calendar/deKalender";
import { germanMonthReadingPlain } from "../app/converter/calendar/germanMonthReading";
import { convert } from "../app/converter/convert";
import {
  formatGermanUnitValue,
  germanUnitConversionTable,
  germanUnitWorked,
} from "../app/converter/germanUnitGuideExtras";
import { findGermanUnitPageBySlug, germanUnitPages } from "../app/converter/localizedGermanUnitPages";
import { getUnitsForCategory } from "../app/converter/unitRegistry";
import { germanCityReadingPlain } from "../app/converter/time/germanCityReading";
import { weekdayOf } from "../app/converter/time/dateMath";
import { worldCities } from "../app/converter/time/worldCities";

const winter = new Date(Date.UTC(2026, 0, 15, 12));

function uniqueChars(texts: string[], limit: number) {
  const pages = texts.map((text) => text.toLowerCase().split(/\s+/).filter(Boolean));
  const freq = new Map<string, number>();
  for (const words of pages) {
    const set = new Set<string>();
    for (let i = 0; i + 6 <= words.length; i++) set.add(words.slice(i, i + 6).join(" "));
    for (const gram of set) freq.set(gram, (freq.get(gram) ?? 0) + 1);
  }
  return pages.map((words) => {
    const own = new Uint8Array(words.length).fill(1);
    for (let i = 0; i + 6 <= words.length; i++) {
      if ((freq.get(words.slice(i, i + 6).join(" ")) ?? 0) >= limit) own.fill(0, i, i + 6);
    }
    let chars = 0;
    words.forEach((word, index) => {
      if (own[index]) chars += word.length + 1;
    });
    return chars;
  });
}

describe("German month reading", () => {
  it("lists the Mondays of July 2027 and keeps February 2028 at 29 days", () => {
    const mondays: number[] = [];
    for (let day = 1; day <= 31; day++) {
      if (weekdayOf({ year: 2027, month: 7, day }) === 1) mondays.push(day);
    }
    const july = germanMonthReadingPlain(2027, 7);
    expect(july).toContain(`Die Montage im Juli 2027 sind der ${mondays.map((day) => `${day}.`).join(", ").replace(/, ([^,]+)$/, " und $1")}`);
    expect(july).toContain("Arbeitstage im Juli 2027");
    expect(germanMonthReadingPlain(2028, 2)).toContain("Februar 2028 hat 29 Tage");
  });

  it("stays specific on every month page", () => {
    const texts = DE_JAHRE.flatMap((year) => DE_MONATE.map((_, index) => germanMonthReadingPlain(year, index + 1)));
    const scores = uniqueChars(texts, 30);
    expect(Math.min(...scores)).toBeGreaterThan(650);
  });
});

describe("German unit examples", () => {
  it("converts 3 microhenry with the unit calculator", () => {
    const page = findGermanUnitPageBySlug("mikrohenry")!;
    const worked = germanUnitWorked(page)!;
    const target = germanUnitConversionTable(page, 1)[0];
    const targetSymbol =
      getUnitsForCategory(page.category).find((unit) => (unit.displaySymbol ?? unit.symbol) === target.symbol)?.symbol ??
      target.symbol;
    const value = convert(page.category, 3, page.unit, targetSymbol);
    expect(worked.rows[0].label).toContain("3 Mikrohenry");
    expect(worked.rows[0].value).toBe(`${formatGermanUnitValue(value)} ${target.symbol}`);
    expect(worked.reverse).toContain("Mikrohenry");
  });

  it("gives every convertible unit its own examples", () => {
    const texts = germanUnitPages.map((page) => {
      const worked = germanUnitWorked(page);
      if (!worked) return "";
      return [worked.heading, ...worked.rows.flatMap((row) => [row.label, row.value]), worked.reverse].join(" ");
    }).filter(Boolean);
    expect(texts.length).toBeGreaterThan(200);
    expect(Math.min(...uniqueChars(texts, 30))).toBeGreaterThan(450);
  });
});

describe("German city reading", () => {
  it("keeps Rome on the same winter clock as Berlin and Tokyo eight hours ahead", () => {
    const rome = worldCities.find((city) => city.en === "rome")!;
    const tokyo = worldCities.find((city) => city.en === "tokyo")!;
    const berlin = worldCities.find((city) => city.en === "berlin")!;
    const romeText = germanCityReadingPlain(rome, winter);
    expect(romeText).toContain("Rom liegt bei");
    expect(romeText).toContain("Berlin 08:00, 12:00 und 18:00 Uhr sind in Rom 08:00 Uhr, 12:00 Uhr und 18:00 Uhr");
    expect(romeText).toMatch(/1\.18\d km Luftlinie/);
    expect(germanCityReadingPlain(tokyo, winter)).toContain("16:00 Uhr, 20:00 Uhr und 02:00 Uhr am Folgetag");
    expect(germanCityReadingPlain(berlin, winter)).not.toContain("Berlin–Berlin");
  });

  it("stays specific on every city page", () => {
    const texts = worldCities.map((city) => germanCityReadingPlain(city, winter));
    expect(Math.min(...uniqueChars(texts, 30))).toBeGreaterThan(280);
  });
});
