import { describe, expect, it } from "vitest";
import { parseBetrag } from "../app/converter/germanBruttoNetto";
import { benoetigteSparrate, verdopplungszeit, zinseszins } from "../app/converter/germanZinseszins";

describe("Zinseszinsrechner", () => {
  it("jährliche Verzinsung ohne Sparrate: K0 × (1 + p)^n", () => {
    const r = zinseszins({ startkapital: 10000, sparrate: 0, zinssatz: 5, jahre: 10, intervall: "jaehrlich" })!;
    expect(r.endkapital).toBeCloseTo(10000 * 1.05 ** 10, 6); // 16.288,95
    expect(r.zinsen).toBeCloseTo(6288.95, 2);
    expect(r.einzahlungen).toBe(10000);
  });

  it("monatliche Verzinsung ohne Sparrate: K0 × (1 + p/12)^(12n)", () => {
    const r = zinseszins({ startkapital: 10000, sparrate: 0, zinssatz: 5, jahre: 10, intervall: "monatlich" })!;
    expect(r.endkapital).toBeCloseTo(10000 * (1 + 0.05 / 12) ** 120, 6); // 16.470,09
  });

  it("monatliche Sparrate, monatliche Verzinsung: Rentenendwert nachschüssig", () => {
    const q = 1 + 0.06 / 12;
    const r = zinseszins({ startkapital: 0, sparrate: 100, zinssatz: 6, jahre: 20, intervall: "monatlich" })!;
    expect(r.endkapital).toBeCloseTo(100 * ((q ** 240 - 1) / (q - 1)), 6); // 46.204,09
    expect(r.einzahlungen).toBe(24000);
  });

  it("jährliche Verzinsung: unterjährige Sparraten mit einfachem Zins (Sparkassenformel)", () => {
    const r = zinseszins({ startkapital: 0, sparrate: 100, zinssatz: 5, jahre: 1, intervall: "jaehrlich" })!;
    // 100 × 0,05 × (11 + 10 + … + 0) / 12 = 27,50 € Zinsen
    expect(r.zinsen).toBeCloseTo(27.5, 10);
    expect(r.endkapital).toBeCloseTo(1227.5, 10);
  });

  it("Jahrestabelle summiert sich zum Endkapital", () => {
    const r = zinseszins({ startkapital: 5000, sparrate: 200, zinssatz: 4, jahre: 15, intervall: "jaehrlich" })!;
    expect(r.jahre).toHaveLength(15);
    const last = r.jahre[14];
    expect(last.kapital).toBeCloseTo(r.endkapital, 8);
    expect(last.einzahlungen + last.zinsenKumuliert).toBeCloseTo(r.endkapital, 6);
  });

  it("0 % Zinsen: nur Einzahlungen", () => {
    const r = zinseszins({ startkapital: 1000, sparrate: 50, zinssatz: 0, jahre: 3, intervall: "monatlich" })!;
    expect(r.endkapital).toBeCloseTo(2800, 10);
    expect(r.zinsen).toBe(0);
  });

  it("ungültige Eingaben ergeben null", () => {
    expect(zinseszins({ startkapital: -1, sparrate: 0, zinssatz: 5, jahre: 10, intervall: "jaehrlich" })).toBeNull();
    expect(zinseszins({ startkapital: 100, sparrate: 0, zinssatz: 5, jahre: 0, intervall: "jaehrlich" })).toBeNull();
    expect(zinseszins({ startkapital: 100, sparrate: 0, zinssatz: Number.NaN, jahre: 5, intervall: "jaehrlich" })).toBeNull();
  });

  it("Verdopplungszeit: bei 7 % rund 10,2 Jahre (72er-Regel ≈ 10,3)", () => {
    expect(verdopplungszeit(7, "jaehrlich")).toBeCloseTo(10.245, 2);
    expect(verdopplungszeit(0, "jaehrlich")).toBeNaN();
  });

  it("benötigte Sparrate erreicht das Ziel", () => {
    const base = { startkapital: 0, zinssatz: 5, jahre: 10, intervall: "monatlich" as const };
    const rate = benoetigteSparrate(100000, base);
    expect(zinseszins({ ...base, sparrate: rate })!.endkapital).toBeCloseTo(100000, 2);
    expect(rate).toBeCloseTo(643.99, 1);
  });

  it("Beträge mit deutschem Tausenderpunkt (Startkapital 10.000 = zehntausend)", () => {
    expect(parseBetrag("10.000")).toBe(10000);
    expect(parseBetrag("1.234.567")).toBe(1234567);
    expect(parseBetrag("10.000,50 €")).toBe(10000.5);
    expect(parseBetrag("2,5")).toBe(2.5);
    expect(parseBetrag("2.5")).toBe(2.5);
    expect(parseBetrag("100")).toBe(100);
    expect(parseBetrag("")).toBeNaN();
    expect(parseBetrag("abc")).toBeNaN();
  });
});
