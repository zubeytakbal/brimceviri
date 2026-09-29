import { describe, expect, it } from "vitest";
import {
  arbeitgeberFrist,
  dritterWerktag,
  GRUNDKUENDIGUNGSFRIST,
  kuendigungsEnde,
  mietEnde,
  naechsteMietTermine,
  naechsteTermine,
  plusMonate,
  PROBEZEIT_FRIST,
  spaetesterZugang,
} from "../app/converter/germanKuendigung";
import { ymdKey } from "../app/converter/time/dateMath";

const d = (s: string) => {
  const [year, month, day] = s.split("-").map(Number);
  return { year, month, day };
};
const k = ymdKey;

describe("Kündigungsfrist Arbeitsvertrag (§ 622 BGB)", () => {
  it("applies the basic period of four weeks to the 15th or end of month", () => {
    expect(k(kuendigungsEnde(d("2026-03-03"), GRUNDKUENDIGUNGSFRIST))).toBe(
      "2026-03-31",
    );
    expect(k(kuendigungsEnde(d("2026-03-04"), GRUNDKUENDIGUNGSFRIST))).toBe(
      "2026-04-15",
    );
    expect(k(spaetesterZugang(d("2026-03-31"), GRUNDKUENDIGUNGSFRIST)!)).toBe(
      "2026-03-03",
    );
    expect(k(spaetesterZugang(d("2026-04-15"), GRUNDKUENDIGUNGSFRIST)!)).toBe(
      "2026-03-18",
    );
    expect(spaetesterZugang(d("2026-04-14"), GRUNDKUENDIGUNGSFRIST)).toBeNull();
  });

  it("uses two weeks to any day during probation", () => {
    expect(k(kuendigungsEnde(d("2026-03-04"), PROBEZEIT_FRIST))).toBe(
      "2026-03-18",
    );
  });

  it("extends the employer's notice with length of service", () => {
    expect(arbeitgeberFrist(1)).toEqual(GRUNDKUENDIGUNGSFRIST);
    expect(arbeitgeberFrist(2).menge).toBe(1);
    expect(arbeitgeberFrist(9.5).menge).toBe(3);
    expect(arbeitgeberFrist(25).menge).toBe(7);
    const zehn = arbeitgeberFrist(10);
    expect(k(kuendigungsEnde(d("2026-03-31"), zehn))).toBe("2026-07-31");
    expect(k(kuendigungsEnde(d("2026-04-01"), zehn))).toBe("2026-08-31");
    expect(k(spaetesterZugang(d("2026-07-31"), zehn)!)).toBe("2026-03-31");
    expect(k(plusMonate(d("2026-01-31"), 1))).toBe("2026-02-28");
  });

  it("lists the next possible dates", () => {
    const t = naechsteTermine(d("2026-03-04"), GRUNDKUENDIGUNGSFRIST, 3);
    expect(t.map((x) => k(x.ende))).toEqual([
      "2026-04-15",
      "2026-04-30",
      "2026-05-15",
    ]);
    expect(k(t[1].zugangBis)).toBe("2026-04-02");
  });
});

describe("Kündigungsfrist Mietvertrag (§ 573c BGB)", () => {
  it("counts Saturdays but not Sundays and holidays as Werktage", () => {
    expect(k(dritterWerktag(2026, 3, "nw"))).toBe("2026-03-04");
    expect(k(dritterWerktag(2026, 5, "nw"))).toBe("2026-05-05");
    expect(k(dritterWerktag(2026, 10, "nw"))).toBe("2026-10-05");
  });

  it("ends at the end of the second following month", () => {
    expect(k(mietEnde(d("2026-03-04"), "nw", "mieter").ende)).toBe(
      "2026-05-31",
    );
    expect(k(mietEnde(d("2026-03-05"), "nw", "mieter").ende)).toBe(
      "2026-06-30",
    );
    expect(k(mietEnde(d("2026-03-04"), "nw", "vermieter", 6).ende)).toBe(
      "2026-08-31",
    );
    expect(k(mietEnde(d("2026-03-04"), "nw", "vermieter", 9).ende)).toBe(
      "2026-11-30",
    );
    const t = naechsteMietTermine(d("2026-03-05"), "nw", "mieter", 0, 2);
    expect(t.map((x) => [k(x.zugangBis), k(x.ende)])).toEqual([
      ["2026-04-04", "2026-06-30"],
      ["2026-05-05", "2026-07-31"],
    ]);
  });
});
