import { describe, expect, it } from "vitest";
import { sunTimes } from "../app/converter/time/solar";
import {
  differenceMinutes,
  formatUtcOffset,
  isDst,
  nextTransition,
  observesDst,
  offsetMinutes,
} from "../app/converter/time/timezones";
import { worldCities } from "../app/converter/time/worldCities";

describe("timezones", () => {
  it("reads UTC offsets including half hours", () => {
    expect(offsetMinutes("Europe/Istanbul", new Date(Date.UTC(2026, 0, 10)))).toBe(180);
    expect(offsetMinutes("Asia/Kolkata", new Date(Date.UTC(2026, 0, 10)))).toBe(330);
    expect(offsetMinutes("America/New_York", new Date(Date.UTC(2026, 0, 10)))).toBe(-300);
    expect(offsetMinutes("America/New_York", new Date(Date.UTC(2026, 6, 10)))).toBe(-240);
  });

  it("formats offsets", () => {
    expect(formatUtcOffset(180)).toBe("UTC+3");
    expect(formatUtcOffset(-240)).toBe("UTC−4");
    expect(formatUtcOffset(345)).toBe("UTC+5:45");
    expect(formatUtcOffset(0)).toBe("UTC");
  });

  it("knows who observes daylight saving time", () => {
    expect(observesDst("Europe/Istanbul", 2026)).toBe(false);
    expect(observesDst("Europe/London", 2026)).toBe(true);
    expect(isDst("Europe/London", new Date(Date.UTC(2026, 6, 1)))).toBe(true);
    expect(isDst("Australia/Sydney", new Date(Date.UTC(2026, 0, 1)))).toBe(true);
  });

  it("finds the next clock change", () => {
    // ABD 2026: 1 Kasim 02:00 EDT (06:00 UTC) geri alinir.
    const change = nextTransition("America/New_York", new Date(Date.UTC(2026, 8, 27)));
    expect(change?.at.toISOString()).toBe("2026-11-01T06:00:00.000Z");
    expect(change?.fromMinutes).toBe(-240);
    expect(change?.toMinutes).toBe(-300);
    // Avrupa 2026: 25 Ekim 01:00 UTC
    expect(nextTransition("Europe/Berlin", new Date(Date.UTC(2026, 8, 27)))?.at.toISOString()).toBe("2026-10-25T01:00:00.000Z");
    expect(nextTransition("Europe/Istanbul", new Date(Date.UTC(2026, 8, 27)))).toBeNull();
  });

  it("computes the difference between zones", () => {
    expect(differenceMinutes("Europe/Istanbul", "America/New_York", new Date(Date.UTC(2026, 6, 1)))).toBe(-420);
    expect(differenceMinutes("Europe/Istanbul", "Asia/Tokyo", new Date(Date.UTC(2026, 6, 1)))).toBe(360);
  });
});

describe("sun times", () => {
  const hhmm = (date: Date, offsetHours: number) => {
    const local = new Date(date.getTime() + offsetHours * 3600000);
    return local.getUTCHours() * 60 + local.getUTCMinutes();
  };

  it("matches published Istanbul times within 3 minutes", () => {
    // Istanbul 21 Haziran: gun dogumu ~05:32, batimi ~20:40 (UTC+3)
    const summer = sunTimes(2026, 6, 21, 41.01, 28.98);
    expect(summer.kind).toBe("normal");
    if (summer.kind !== "normal") return;
    expect(Math.abs(hhmm(summer.sunrise, 3) - (5 * 60 + 32))).toBeLessThanOrEqual(3);
    expect(Math.abs(hhmm(summer.sunset, 3) - (20 * 60 + 40))).toBeLessThanOrEqual(3);
  });

  it("matches published London winter times within 3 minutes", () => {
    // Londra 21 Aralik: ~08:04 - 15:53 (UTC)
    const winter = sunTimes(2026, 12, 21, 51.51, -0.13);
    if (winter.kind !== "normal") throw new Error("expected normal day");
    expect(Math.abs(hhmm(winter.sunrise, 0) - (8 * 60 + 4))).toBeLessThanOrEqual(3);
    expect(Math.abs(hhmm(winter.sunset, 0) - (15 * 60 + 53))).toBeLessThanOrEqual(3);
  });

  it("reports polar day", () => {
    expect(sunTimes(2026, 6, 21, 78.2, 15.6).kind).toBe("polar-day");
  });
});

describe("world cities", () => {
  it("has unique slugs and valid time zones", () => {
    expect(new Set(worldCities.map((c) => c.en)).size).toBe(worldCities.length);
    expect(new Set(worldCities.map((c) => c.tr)).size).toBe(worldCities.length);
    for (const city of worldCities) {
      expect(() => new Intl.DateTimeFormat("en", { timeZone: city.timeZone })).not.toThrow();
      expect(city.tr).toMatch(/^[a-z0-9-]+$/);
      expect(city.inTr.startsWith(city.nameTr)).toBe(true);
    }
  });
});

describe("zoned wall time conversion", () => {
  it("converts wall time to UTC across DST", async () => {
    const { zonedWallTimeToUtc } = await import("../app/converter/time/timeZoneOptions");
    // 15:00 Istanbul = 12:00 UTC
    expect(zonedWallTimeToUtc("Europe/Istanbul", { year: 2026, month: 9, day: 27, hour: 15, minute: 0 }, offsetMinutes).toISOString()).toBe(
      "2026-09-27T12:00:00.000Z"
    );
    // 09:00 New York in January (EST) = 14:00 UTC; in July (EDT) = 13:00 UTC
    expect(zonedWallTimeToUtc("America/New_York", { year: 2027, month: 1, day: 15, hour: 9, minute: 0 }, offsetMinutes).toISOString()).toBe(
      "2027-01-15T14:00:00.000Z"
    );
    expect(zonedWallTimeToUtc("America/New_York", { year: 2027, month: 7, day: 15, hour: 9, minute: 0 }, offsetMinutes).toISOString()).toBe(
      "2027-07-15T13:00:00.000Z"
    );
  });
});
