import { describe, expect, it } from "vitest";
import { countdownAlternatePaths, findCountdownEvent, occurrenceInYear } from "../app/converter/time/countdownEvents";

const on = (slug: string, year: number) => {
  const d = occurrenceInYear(findCountdownEvent("de", slug)!, year)!;
  return `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
};

describe("German countdown dates", () => {
  it("computes movable dates", () => {
    expect(on("ostern", 2027)).toBe("2027-03-28");
    expect(on("rosenmontag", 2027)).toBe("2027-02-08");
    expect(on("rosenmontag", 2026)).toBe("2026-02-16");
    expect(on("vatertag", 2027)).toBe("2027-05-06");
    expect(on("pfingsten", 2027)).toBe("2027-05-16");
    expect(on("muttertag", 2027)).toBe("2027-05-09");
  });
  it("computes the first Sunday of Advent", () => {
    expect(on("erster-advent", 2026)).toBe("2026-11-29");
    expect(on("erster-advent", 2027)).toBe("2027-11-28");
    expect(on("erster-advent", 2022)).toBe("2022-11-27"); // 25.12.2022 war ein Sonntag
    expect(on("erster-advent", 2023)).toBe("2023-12-03");
  });
  it("matches the official Oktoberfest start dates", () => {
    expect(on("oktoberfest", 2025)).toBe("2025-09-20");
    expect(on("oktoberfest", 2026)).toBe("2026-09-19");
    expect(on("oktoberfest", 2027)).toBe("2027-09-18");
    expect(on("oktoberfest", 2028)).toBe("2028-09-16");
  });
  it("links language versions for hreflang", () => {
    expect(countdownAlternatePaths(findCountdownEvent("de", "neujahr")!)).toEqual({ de: "/de/countdown/neujahr", en: "/en/countdown/new-year", tr: "/geri-sayim/yilbasi" });
    expect(countdownAlternatePaths(findCountdownEvent("en", "christmas")!)).toEqual({ en: "/en/countdown/christmas", de: "/de/countdown/weihnachten" });
    expect(countdownAlternatePaths(findCountdownEvent("de", "oktoberfest")!)).toEqual({ de: "/de/countdown/oktoberfest" });
  });
});
