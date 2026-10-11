import { describe, expect, it } from "vitest";
import { ymdKey } from "../app/converter/time/dateMath";
import { bridgeDays, nordicHolidays } from "../app/converter/time/nordicHolidays";

const dates = (locale: "sv" | "no" | "da", year: number) =>
  Object.fromEntries(nordicHolidays(locale, year).map((h) => [h.id, ymdKey(h.date)]));

describe("nordic holidays", () => {
  it("computes Swedish movable holidays for 2026", () => {
    const sv = dates("sv", 2026);
    expect(sv["paskdagen"]).toBe("2026-04-05");
    expect(sv["kristi-himmelsfardsdag"]).toBe("2026-05-14");
    expect(sv["midsommardagen"]).toBe("2026-06-20");
    expect(sv["alla-helgons-dag"]).toBe("2026-10-31");
  });

  it("includes Norwegian Maundy Thursday and 17 May", () => {
    const no = dates("no", 2026);
    expect(no["skjaertorsdag"]).toBe("2026-04-02");
    expect(no["syttende-mai"]).toBe("2026-05-17");
    expect(no["andre-pinsedag"]).toBe("2026-05-25");
  });

  it("drops Danish Store bededag from 2024", () => {
    expect(dates("da", 2023)["store-bededag"]).toBe("2023-05-05");
    expect(dates("da", 2024)["store-bededag"]).toBeUndefined();
  });

  it("finds bridge days between a holiday and a weekend", () => {
    expect(bridgeDays("sv", 2026).map(ymdKey)).toEqual(["2026-01-02", "2026-01-05", "2026-05-15"]);
  });
});
