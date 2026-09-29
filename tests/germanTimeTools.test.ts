import { describe, expect, it } from "vitest";
import { timeInWords } from "../app/components/time/faces/MoreFaces";
import { alarmLabelDe, alarmSlugDe, findTimerPresetDe, timerLabelDe, timerSlugDe, timerTitleDe, timerUsesDe } from "../app/i18n/germanTimeTools";
import { timerPresets } from "../app/i18n/timerPresets";

const words = (h: number, m: number) => timeInWords(new Date(2026, 0, 1, h, m), "de").map((w) => w.replace(/\*\*/g, "")).join(" ");

describe("German word clock", () => {
  it("says the time the way Germans do", () => {
    expect(words(15, 0)).toBe("Es ist drei Uhr");
    expect(words(1, 0)).toBe("Es ist ein Uhr");
    expect(words(15, 15)).toBe("Es ist Viertel nach drei");
    expect(words(15, 25)).toBe("Es ist fünf vor halb vier");
    expect(words(15, 30)).toBe("Es ist halb vier");
    expect(words(12, 30)).toBe("Es ist halb eins");
    expect(words(15, 35)).toBe("Es ist fünf nach halb vier");
    expect(words(15, 45)).toBe("Es ist Viertel vor vier");
    expect(words(11, 55)).toBe("Es ist fünf vor zwölf");
    expect(words(15, 58)).toBe("Es ist vier Uhr");
  });
});

describe("German timer presets", () => {
  it("builds unique German slugs, labels and titles for every preset", () => {
    const slugs = timerPresets.map(timerSlugDe);
    expect(new Set(slugs).size).toBe(timerPresets.length);
    const five = findTimerPresetDe("5-minuten")!;
    expect(timerLabelDe(five)).toBe("5 Minuten");
    expect(timerTitleDe(five)).toBe("5-Minuten-Timer");
    expect(timerLabelDe(findTimerPresetDe("1-minute")!)).toBe("1 Minute");
    expect(timerLabelDe(findTimerPresetDe("90-sekunden")!)).toBe("90 Sekunden");
    expect(timerLabelDe(findTimerPresetDe("90-minuten")!)).toBe("90 Minuten");
    expect(timerTitleDe(findTimerPresetDe("2-stunden")!)).toBe("2-Stunden-Timer");
  });
  it("has German uses for every preset", () => {
    for (const p of timerPresets) expect(timerUsesDe[p.seconds]?.length).toBeGreaterThan(0);
  });
  it("formats wake-up times in German", () => {
    expect(alarmSlugDe("06:30")).toBe("6-30");
    expect(alarmLabelDe("07:00")).toBe("7:00 Uhr");
  });
});
