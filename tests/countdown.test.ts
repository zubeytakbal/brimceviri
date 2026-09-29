import { describe, expect, it } from "vitest";
import {
  countdownEvents,
  daysUntil,
  easterSunday,
  hijriEstimate,
  findCountdownEvent,
  nthWeekday,
  occurrenceInYear,
  pairedEvent,
  upcomingOccurrences,
} from "../app/converter/time/countdownEvents";

describe("countdown date rules", () => {
  it("computes Western Easter", () => {
    expect(easterSunday(2025)).toEqual({ year: 2025, month: 4, day: 20 });
    expect(easterSunday(2026)).toEqual({ year: 2026, month: 4, day: 5 });
    expect(easterSunday(2027)).toEqual({ year: 2027, month: 3, day: 28 });
    expect(easterSunday(2028)).toEqual({ year: 2028, month: 4, day: 16 });
  });

  it("computes nth weekdays", () => {
    // Anneler Gunu 2027: 9 Mayis; Sukran Gunu 2026: 26 Kasim
    expect(nthWeekday(2027, 5, 0, 2)).toEqual({ year: 2027, month: 5, day: 9 });
    expect(nthWeekday(2026, 11, 4, 4)).toEqual({ year: 2026, month: 11, day: 26 });
    const blackFriday = occurrenceInYear(findCountdownEvent("en", "black-friday")!, 2026);
    expect(blackFriday).toEqual({ year: 2026, month: 11, day: 27 });
  });

  it("uses Diyanet dates and marks later years as estimates", () => {
    const bayram = findCountdownEvent("tr", "ramazan-bayrami")!;
    expect(occurrenceInYear(bayram, 2027)).toEqual({ year: 2027, month: 3, day: 9 });
    expect(occurrenceInYear(bayram, 2030)?.estimated).toBe(true);
  });

  it("Umm al-Qura estimate matches every known Diyanet date", () => {
    // Diyanet: 2025 R.Bayrami 30 Mart, Kurban 6 Haziran, Ramazan 1 Mart; 2026: 20 Mart, 27 Mayis, 18 Subat
    const known: Array<[number, number, number, number, number]> = [
      [2025, 10, 1, 3, 30],
      [2025, 12, 10, 6, 6],
      [2025, 9, 1, 3, 1],
      [2026, 10, 1, 3, 20],
      [2026, 12, 10, 5, 27],
      [2026, 9, 1, 2, 18],
      [2027, 10, 1, 3, 9],
      [2027, 12, 10, 5, 16],
      [2027, 9, 1, 2, 8],
      [2028, 10, 1, 2, 26],
      [2028, 12, 10, 5, 5],
    ];
    for (const [year, hm, hd, month, day] of known) {
      expect(hijriEstimate(year, hm, hd)).toEqual({ year, month, day, estimated: true });
    }
  });

  it("lists upcoming occurrences and days left", () => {
    const now = new Date(Date.UTC(2026, 8, 27, 12));
    const newYear = findCountdownEvent("tr", "yilbasi")!;
    const next = upcomingOccurrences(newYear, now, 3);
    expect(next[0]).toEqual({ year: 2027, month: 1, day: 1 });
    expect(next).toHaveLength(3);
    // 1 Ocak 2027 00:00 TR = 31 Aralik 21:00 UTC -> 95 tam gun (+9 saat)
    expect(daysUntil(next[0], "istanbul", now)).toBe(95);
  });

  it("has unique slugs and valid pairs", () => {
    const keys = countdownEvents.map((e) => `${e.lang}:${e.slug}`);
    expect(new Set(keys).size).toBe(keys.length);
    for (const event of countdownEvents) {
      if (!event.pair) continue;
      // Jeder Verweis zeigt auf einen vorhandenen Anlass in einer anderen Sprache;
      // TR und EN verweisen gegenseitig aufeinander, DE verweist auf EN.
      const pair = pairedEvent(event);
      expect(pair).not.toBeNull();
      if (event.lang !== "de" && pair!.lang !== "de") expect(pair!.pair).toBe(event.slug);
    }
  });
});

describe("turkish suffixes", () => {
  it("picks the right locative for clock times", async () => {
    const { trTimeLocative } = await import("../app/i18n/timeToolPaths");
    expect(trTimeLocative("05:00")).toBe("05:00'te");
    expect(trTimeLocative("06:00")).toBe("06:00'da");
    expect(trTimeLocative("07:00")).toBe("07:00'de");
    expect(trTimeLocative("09:00")).toBe("09:00'da");
    expect(trTimeLocative("11:00")).toBe("11:00'de");
    expect(trTimeLocative("12:00")).toBe("12:00'de");
    expect(trTimeLocative("07:30")).toBe("07:30'da");
    expect(trTimeLocative("04:00")).toBe("04:00'te");
    // Ilk dinamik import buyuk rota tablosunu yukler; yavas makinelerde 5 sn'yi asabiliyor.
  }, 30000);

  it("uses vowel harmony for durations", async () => {
    const { timerPresets, trLik } = await import("../app/i18n/timerPresets");
    const by = (tr: string) => trLik(timerPresets.find((p) => p.tr === tr)!);
    expect(by("5-dakika")).toBe("5 dakikalık");
    expect(by("30-saniye")).toBe("30 saniyelik");
    expect(by("2-saat")).toBe("2 saatlik");
  });
});
