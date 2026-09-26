import { describe, expect, it } from "vitest";
import { buildHistoryDates, parseCurrencyApiDay, parseOpenErApiLatest } from "../app/converter/fx/fxData";
import { bankMarkup, crossRate, formatMoney, formatRate, pairSeries, seriesStats } from "../app/converter/fx/fxMath";

const NOW = Date.parse("2026-09-26T08:00:00Z");

function latestFixture(overrides: Record<string, unknown> = {}) {
  const rates: Record<string, number> = { USD: 1, TRY: 41.25, EUR: 0.85, GBP: 0.74, JPY: 148.5, KWD: 0.305 };
  for (let i = 0; i < 20; i += 1) rates[`X${String.fromCharCode(65 + i)}A`] = 1 + i;
  return {
    result: "success",
    provider: "https://www.exchangerate-api.com",
    base_code: "USD",
    time_last_update_unix: Date.parse("2026-09-26T00:02:31Z") / 1000,
    time_next_update_unix: Date.parse("2026-09-27T00:02:31Z") / 1000,
    rates,
    ...overrides,
  };
}

describe("parseOpenErApiLatest", () => {
  it("accepts a valid response and keeps both timestamps", () => {
    const latest = parseOpenErApiLatest(latestFixture(), NOW);
    expect(latest?.rates.TRY).toBe(41.25);
    expect(latest?.lastUpdateUnix).toBe(Date.parse("2026-09-26T00:02:31Z") / 1000);
    expect(latest?.nextUpdateUnix).toBe(Date.parse("2026-09-27T00:02:31Z") / 1000);
  });

  it("rejects errors, wrong base and broken timestamps", () => {
    expect(parseOpenErApiLatest({ result: "error", "error-type": "unsupported-code" }, NOW)).toBeNull();
    expect(parseOpenErApiLatest(latestFixture({ base_code: "EUR" }), NOW)).toBeNull();
    expect(parseOpenErApiLatest(latestFixture({ time_last_update_unix: 0 }), NOW)).toBeNull();
    expect(parseOpenErApiLatest(latestFixture({ time_last_update_unix: NOW / 1000 + 7200 }), NOW)).toBeNull();
    expect(parseOpenErApiLatest(null, NOW)).toBeNull();
  });

  it("drops invalid individual rates and ignores a bad next-update time", () => {
    const fixture = latestFixture({ time_next_update_unix: 5 });
    (fixture.rates as Record<string, unknown>).BAD = -3;
    (fixture.rates as Record<string, unknown>).NAN = "12";
    const latest = parseOpenErApiLatest(fixture, NOW);
    expect(latest?.rates.BAD).toBeUndefined();
    expect(latest?.rates.NAN).toBeUndefined();
    expect(latest?.nextUpdateUnix).toBeNull();
  });
});

describe("parseCurrencyApiDay", () => {
  it("uppercases codes and keeps only requested ones", () => {
    const point = parseCurrencyApiDay({ date: "2026-09-25", usd: { try: 41.1, eur: 0.851, gbp: 0.74 } }, ["USD", "TRY", "EUR"]);
    expect(point).toEqual({ date: "2026-09-25", rates: { USD: 1, TRY: 41.1, EUR: 0.851 } });
  });

  it("rejects a day missing a requested currency or with a bad date", () => {
    expect(parseCurrencyApiDay({ date: "2026-09-25", usd: { eur: 0.85 } }, ["TRY"])).toBeNull();
    expect(parseCurrencyApiDay({ date: "25.09.2026", usd: { try: 41 } }, ["TRY"])).toBeNull();
  });
});

describe("buildHistoryDates", () => {
  it("returns 30 consecutive days ending on the given date", () => {
    const { daily } = buildHistoryDates("2026-09-26");
    expect(daily).toHaveLength(30);
    expect(daily[0]).toBe("2026-08-28");
    expect(daily[29]).toBe("2026-09-26");
  });

  it("anchors yearly samples to fixed days so most dates repeat the next day", () => {
    const today = buildHistoryDates("2026-09-26").yearly;
    const tomorrow = buildHistoryDates("2026-09-27").yearly;
    expect(today.at(-1)).toBe("2026-09-26");
    expect(today[0]).toBe("2025-09-26");
    expect(today.length).toBeGreaterThanOrEqual(26);
    const shared = today.slice(1, -1).filter((date) => tomorrow.includes(date));
    expect(shared.length).toBeGreaterThanOrEqual(today.length - 3);
  });
});

describe("pair math", () => {
  const rates = { USD: 1, TRY: 41.25, EUR: 0.85, JPY: 148.5 };

  it("computes cross rates through USD", () => {
    expect(crossRate(rates, "USD", "TRY")).toBe(41.25);
    expect(crossRate(rates, "EUR", "TRY")).toBeCloseTo(48.5294, 4);
    expect(crossRate(rates, "EUR", "USD")).toBeCloseTo(1.17647, 5);
    expect(crossRate(rates, "USD", "XXX")).toBeNull();
  });

  it("formats rates readably at every magnitude (tr-TR)", () => {
    expect(formatRate(41.25, "tr-TR")).toBe("41,2500");
    expect(formatRate(crossRate(rates, "JPY", "TRY")!, "tr-TR")).toBe("0,2778");
    expect(formatRate(135.234, "tr-TR")).toBe("135,23");
    expect(formatMoney(1 / 41.9, "tr-TR")).toBe("0,02387");
    expect(formatMoney(4190, "tr-TR")).toBe("4.190,00");
  });

  it("builds series and stats", () => {
    const series = pairSeries(
      [
        { date: "2026-09-24", rates: { USD: 1, TRY: 40 } },
        { date: "2026-09-25", rates: { USD: 1, TRY: 42 } },
        { date: "2026-09-26", rates: { USD: 1, TRY: 41 } },
      ],
      "USD",
      "TRY"
    );
    const stats = seriesStats(series)!;
    expect(stats.high.date).toBe("2026-09-25");
    expect(stats.low.value).toBe(40);
    expect(stats.average).toBe(41);
    expect(stats.changePercent).toBeCloseTo(2.5, 10);
    expect(seriesStats(series.slice(0, 1))).toBeNull();
  });

  it("measures a bank markup in both directions", () => {
    const buy = bankMarkup(41.25, 42.5, 1000, "buy")!;
    expect(buy.costInTo).toBeCloseTo(1250, 6);
    expect(buy.markupPercent).toBeCloseTo(3.0303, 3);
    const sell = bankMarkup(41.25, 40.5, 1000, "sell")!;
    expect(sell.costInTo).toBeCloseTo(750, 6);
    expect(bankMarkup(41.25, 0, 1000, "buy")).toBeNull();
  });
});
