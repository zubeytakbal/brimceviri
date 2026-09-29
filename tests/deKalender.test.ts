import { describe, expect, it } from "vitest";
import {
  deBelegteTage,
  deJahresTermine,
  deTagInfo,
  deTermine,
  ersterAdvent,
  findDeTag,
} from "../app/converter/calendar/deKalender";
import { ymdKey } from "../app/converter/time/dateMath";

const datum = (id: string, year: number) =>
  deTermine(findDeTag(id)!, year).map((t) => ymdKey(t.datum));

describe("Deutscher Kalender", () => {
  it("computes Easter-based and Advent dates", () => {
    expect(datum("ostersonntag", 2026)).toEqual(["2026-04-05"]);
    expect(datum("rosenmontag", 2026)).toEqual(["2026-02-16"]);
    expect(datum("weiberfastnacht", 2026)).toEqual(["2026-02-12"]);
    expect(datum("aschermittwoch", 2026)).toEqual(["2026-02-18"]);
    expect(datum("rosenmontag", 2027)).toEqual(["2027-02-08"]);
    expect(ymdKey(ersterAdvent(2026))).toBe("2026-11-29");
    expect(ymdKey(ersterAdvent(2023))).toBe("2023-12-03");
    expect(datum("totensonntag", 2026)).toEqual(["2026-11-22"]);
    expect(datum("volkstrauertag", 2026)).toEqual(["2026-11-15"]);
  });

  it("computes DST changes, Muttertag, Oktoberfest and Erntedank", () => {
    expect(datum("sommerzeit", 2026)).toEqual(["2026-03-29"]);
    expect(datum("winterzeit", 2026)).toEqual(["2026-10-25"]);
    expect(datum("sommerzeit", 2027)).toEqual(["2027-03-28"]);
    expect(datum("muttertag", 2026)).toEqual(["2026-05-10"]);
    expect(datum("oktoberfest", 2026)).toEqual(["2026-09-19"]);
    expect(datum("erntedank", 2026)).toEqual(["2026-10-04"]);
  });

  it("takes statutory holidays with their states from the holiday data", () => {
    const f = deTermine(findDeTag("fronleichnam")!, 2026)[0];
    expect(ymdKey(f.datum)).toBe("2026-06-04");
    expect(f.laender).toContain("by");
    expect(f.laender).not.toContain("be");
    const p = deTermine(findDeTag("pfingstmontag")!, 2026)[0];
    expect(ymdKey(p.datum)).toBe("2026-05-24");
    expect(ymdKey(p.bis!)).toBe("2026-05-25");
    expect(datum("frauentag", 2018)).toEqual([]);
  });

  it("builds day info and day pages", () => {
    const i = deTagInfo({ year: 2026, month: 10, day: 3 });
    expect(i.wochentag).toBe("Samstag");
    expect(i.kw).toBe(40);
    expect(i.termine.map((t) => t.tag.id)).toContain(
      "tag-der-deutschen-einheit",
    );
    expect(deBelegteTage(2026).length).toBeGreaterThan(45);
    expect(deJahresTermine(2026).length).toBeGreaterThan(45);
  });
});
