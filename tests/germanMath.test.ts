import { describe, expect, it } from "vitest";
import {
  abiturNote,
  dreisatzAntiproportional,
  dreisatzProportional,
  grundwert,
  ihkNote,
  mitProzent,
  notenDurchschnitt,
  parseDe,
  prozentsatz,
  prozentwert,
  punkteZuNote,
  veraenderung,
  vorProzent,
} from "../app/converter/germanMath";

describe("parseDe", () => {
  it("reads German and English decimals", () => {
    expect(parseDe("1.234,5")).toBe(1234.5);
    expect(parseDe("49,90")).toBe(49.9);
    expect(parseDe("12.5")).toBe(12.5);
    expect(parseDe("-20 %")).toBe(-20);
    expect(parseDe("")).toBeNaN();
    expect(parseDe("abc")).toBeNaN();
  });
});

describe("Prozentrechnung", () => {
  it("computes the three basic values", () => {
    expect(prozentwert(15, 80)).toBe(12);
    expect(prozentsatz(12, 80)).toBe(15);
    expect(grundwert(12, 15)).toBe(80);
    expect(prozentsatz(1, 0)).toBeNaN();
  });
  it("handles change, discount and reverse", () => {
    expect(veraenderung(1200, 1500)).toBe(25);
    expect(veraenderung(1500, 1200)).toBe(-20);
    expect(mitProzent(49.9, -20)).toBeCloseTo(39.92, 10);
    expect(vorProzent(39.92, -20)).toBeCloseTo(49.9, 10);
  });
});

describe("Dreisatz", () => {
  it("solves proportional and inverse proportional", () => {
    expect(dreisatzProportional(3, 7.5, 5)).toBe(12.5);
    expect(dreisatzAntiproportional(4, 6, 3)).toBe(8);
  });
});

describe("Noten", () => {
  it("averages with weights and skips empty rows", () => {
    expect(notenDurchschnitt([{ note: 2, gewicht: 1 }, { note: 3, gewicht: 1 }, { note: 1.5, gewicht: 2 }, { note: NaN, gewicht: 1 }])).toBe(2);
  });
  it("applies the IHK key", () => {
    expect(ihkNote(92)?.note).toBe(1);
    expect(ihkNote(91)?.note).toBe(2);
    expect(ihkNote(67)?.note).toBe(3);
    expect(ihkNote(50)?.note).toBe(4);
    expect(ihkNote(49)?.note).toBe(5);
    expect(ihkNote(29)?.note).toBe(6);
    expect(ihkNote(39, 50)).toEqual({ hundert: 78, note: 3 });
    expect(ihkNote(101)).toBeNull();
  });
  it("maps Oberstufe points", () => {
    expect(punkteZuNote(15)).toBe("1+");
    expect(punkteZuNote(14)).toBe("1");
    expect(punkteZuNote(13)).toBe("1−");
    expect(punkteZuNote(10)).toBe("2−");
    expect(punkteZuNote(1)).toBe("5−");
    expect(punkteZuNote(0)).toBe("6");
    expect(punkteZuNote(16)).toBeNull();
  });
  it("matches the official Abitur table", () => {
    expect(abiturNote(900)).toBe(1);
    expect(abiturNote(823)).toBe(1);
    expect(abiturNote(822)).toBe(1.1);
    expect(abiturNote(805)).toBe(1.1);
    expect(abiturNote(804)).toBe(1.2);
    expect(abiturNote(787)).toBe(1.2);
    expect(abiturNote(660)).toBe(2);
    expect(abiturNote(643)).toBe(2);
    expect(abiturNote(642)).toBe(2.1);
    expect(abiturNote(463)).toBe(3);
    expect(abiturNote(462)).toBe(3.1);
    expect(abiturNote(319)).toBe(3.8);
    expect(abiturNote(318)).toBe(3.9);
    expect(abiturNote(301)).toBe(3.9);
    expect(abiturNote(300)).toBe(4);
    expect(abiturNote(299)).toBeNull();
  });
});
