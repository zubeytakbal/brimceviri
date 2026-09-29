import { describe, expect, it } from "vitest";
import { brueckenJeFeiertag, feiertageAmWochenende, icsDatei, MO_BIS_FR, optimalerPlan, tageDesJahres } from "../app/converter/time/brueckentage";
import { ymdKey } from "../app/converter/time/dateMath";
import { brueckenUebersicht, laenderUebersicht, planungsjahr } from "../app/i18n/germanBrueckentage";

const opt = (state: "by" | "nw" | "be" | "sn", year: number, extra: Partial<Parameters<typeof optimalerPlan>[0]> = {}) => ({
  state,
  year,
  workdays: MO_BIS_FR,
  partial: [] as string[],
  heiligabendFrei: false,
  silvesterFrei: false,
  ...extra,
});

describe("Brückentage-Planer", () => {
  it("finds the classic one-day bridges (Himmelfahrt and Fronleichnam 2027 on Thursdays)", () => {
    const b = brueckenJeFeiertag(opt("by", 2027));
    const himmelfahrt = b.find((x) => x.feiertag === "Christi Himmelfahrt")!;
    expect(himmelfahrt.optionen[0]).toMatchObject({ urlaub: 1, tage: 4 });
    expect(ymdKey(himmelfahrt.optionen[0].urlaubstage[0])).toBe("2027-05-07");
    const ostern = b.find((x) => x.feiertag === "Karfreitag")!;
    expect(ostern.optionen.some((z) => z.urlaub === 8 && z.tage === 16)).toBe(true);
  });

  it("builds a plan within the budget without overlaps", () => {
    for (const budget of [1, 5, 12, 30]) {
      const p = optimalerPlan(opt("nw", 2027), budget);
      expect(p.urlaub).toBeLessThanOrEqual(budget);
      for (let i = 1; i < p.zeitraeume.length; i += 1) expect(ymdKey(p.zeitraeume[i].von) > ymdKey(p.zeitraeume[i - 1].bis)).toBe(true);
      for (const z of p.zeitraeume) {
        expect(z.feiertage.length).toBeGreaterThan(0);
        expect(z.urlaubstage.every((d) => d.year === 2027)).toBe(true);
      }
    }
    expect(optimalerPlan(opt("nw", 2027), 1).freieTage).toBe(4);
  });

  it("respects part-time workdays and optional days off", () => {
    const monFrei = [false, false, true, true, true, true, false];
    const t = tageDesJahres(opt("nw", 2027, { workdays: monFrei }));
    expect(t.find((x) => x.key === "2027-05-03")!.frei).toBe(true);
    const mitHeiligabend = tageDesJahres(opt("nw", 2026, { heiligabendFrei: true })).find((x) => x.key === "2026-12-24")!;
    expect(mitHeiligabend.frei).toBe(true);
    const ohne = tageDesJahres(opt("nw", 2026)).find((x) => x.key === "2026-12-24")!;
    expect(ohne.frei).toBe(false);
    const augsburg = tageDesJahres(opt("by", 2027, { partial: ["augsburger-friedensfest"] })).find((x) => x.key === "2027-08-08")!;
    expect(augsburg.frei).toBe(true);
  });

  it("lists holidays lost on weekends (2027: 1. Mai on Saturday, 3. Oktober on Sunday)", () => {
    const names = feiertageAmWochenende(opt("be", 2027)).map((h) => h.name);
    expect(names).toContain("Tag der Arbeit");
    expect(names).toContain("Tag der Deutschen Einheit");
  });

  it("exports a valid iCalendar file", () => {
    const p = optimalerPlan(opt("nw", 2027), 3);
    const ics = icsDatei(p.zeitraeume);
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics).toContain("DTSTART;VALUE=DATE:2027");
    expect(ics.trim().endsWith("END:VCALENDAR")).toBe(true);
  });

  it("builds overviews for all states", () => {
    const l = laenderUebersicht(2027);
    expect(l).toHaveLength(16);
    expect(l.find((x) => x.state.code === "by")!.plan30).toBeGreaterThan(l.find((x) => x.state.code === "be")!.plan30);
    expect(brueckenUebersicht(2027).find((b) => b.feiertag === "Christi Himmelfahrt")!.laender).toHaveLength(16);
    expect(planungsjahr(new Date(Date.UTC(2026, 8, 29)))).toBe(2027);
    expect(planungsjahr(new Date(Date.UTC(2026, 3, 1)))).toBe(2026);
  });
});
