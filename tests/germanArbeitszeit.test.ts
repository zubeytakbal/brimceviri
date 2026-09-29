import { describe, expect, it } from "vitest";
import {
  dezimal,
  feierabend,
  hhmm,
  mindestpause,
  parseDauer,
  parseZeit,
  pflichtpause,
  REGELN,
  tagAuswerten,
  uhrzeit,
  woche,
} from "../app/converter/germanArbeitszeit";

const E = REGELN.erwachsen;
const J = REGELN.jugendlich;

describe("Arbeitszeit", () => {
  it("parses times", () => {
    expect(parseZeit("7:30")).toBe(450);
    expect(parseZeit("07.30")).toBe(450);
    expect(parseZeit("730")).toBe(450);
    expect(parseZeit("16")).toBe(960);
    expect(parseZeit("16:30 Uhr")).toBe(990);
    expect(parseZeit("25:00")).toBeNull();
    expect(parseDauer("0:45")).toBe(45);
    expect(parseDauer("30")).toBe(30);
  });

  it("applies § 4 ArbZG break rules", () => {
    expect(pflichtpause(360, E)).toBe(0);
    expect(pflichtpause(361, E)).toBe(30);
    expect(pflichtpause(540, E)).toBe(30);
    expect(pflichtpause(541, E)).toBe(45);
    expect(mindestpause(380, E)).toBe(20);
    expect(mindestpause(365, E)).toBe(15);
    expect(mindestpause(8 * 60 + 30, E)).toBe(30);
    expect(mindestpause(9 * 60 + 40, E)).toBe(40);
    expect(mindestpause(10 * 60, E)).toBe(45);
    expect(pflichtpause(300, J)).toBe(30);
    expect(pflichtpause(361, J)).toBe(60);
  });

  it("evaluates a day including night shifts", () => {
    const t = tagAuswerten({ beginn: 450, ende: 1020, pause: 30 }, E);
    expect(t.netto).toBe(540);
    expect(t.ueberMax).toBe(true);
    expect(t.ueberAusnahme).toBe(false);
    const n = tagAuswerten({ beginn: 22 * 60, ende: 6 * 60, pause: 30 }, E);
    expect(n.anwesenheit).toBe(480);
    expect(n.ueberNacht).toBe(true);
    const k = tagAuswerten({ beginn: 480, ende: 1080, pause: 0 }, E);
    expect(k.pauseZuKurz).toBe(true);
    expect(k.nettoGesetzlich).toBe(600 - 45);
    expect(dezimal(465)).toBe(7.75);
    expect(hhmm(-75)).toBe("−1:15");
    expect(uhrzeit(1500)).toBe("01:00");
  });

  it("computes the end of the working day", () => {
    const f = feierabend(8 * 60, 8 * 60, 0, E);
    expect(uhrzeit(f.ende)).toBe("16:30");
    expect(uhrzeit(feierabend(8 * 60, 7 * 60 + 48, 0, E).ende)).toBe("16:18");
    expect(uhrzeit(f.spaetestens)).toBe("18:45");
  });

  it("checks weekly totals and rest periods", () => {
    const tag = (b: number, e: number) => ({
      beginn: b * 60,
      ende: e * 60,
      pause: 30,
    });
    const w = woche(
      [
        tag(8, 17),
        tag(8, 22.5),
        tag(7, 16),
        tag(8, 16.5),
        tag(8, 14),
        null,
        null,
      ],
      40 * 60,
      E,
    );
    expect(w.summe).toBe((8.5 + 13.75 + 8.5 + 8 + 5.5) * 60);
    expect(w.ruheVerstoesse).toBe(1);
    expect(w.ruhezeiten[2]).toBe(8.5 * 60);
    expect(w.ueberstunden).toBe(4.25 * 60);
  });
});
