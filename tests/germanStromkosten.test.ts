import { describe, expect, it } from "vitest";
import {
  breakEvenKwh,
  durchschnittspreisCt,
  jahreskosten,
  monatsabschlag,
  zaehlerstand,
} from "../app/converter/germanStromkosten";

const tarif = { arbeitspreisCt: 30, grundpreisMonat: 12 };

describe("Stromkostenrechner", () => {
  it("Jahreskosten = kWh × ct ÷ 100 + 12 × Grundpreis", () => {
    // 2.500 kWh × 0,30 € = 750 € + 144 € Grundpreis = 894 €
    expect(jahreskosten(2500, tarif)).toBeCloseTo(894, 10);
    expect(monatsabschlag(2500, tarif)).toBeCloseTo(74.5, 10);
    expect(jahreskosten(0, tarif)).toBe(144);
  });

  it("Durchschnittspreis inkl. Grundpreis", () => {
    expect(durchschnittspreisCt(2500, tarif)).toBeCloseTo(35.76, 10);
    expect(durchschnittspreisCt(0, tarif)).toBeNaN();
  });

  it("ungültige Eingaben", () => {
    expect(jahreskosten(-1, tarif)).toBeNaN();
    expect(jahreskosten(1000, { arbeitspreisCt: -5, grundpreisMonat: 10 })).toBeNaN();
  });

  it("Zählerstand: Verbrauch und Hochrechnung auf 365 Tage", () => {
    const r = zaehlerstand(12000, 12600, "2026-01-01", "2026-04-01")!;
    expect(r.tage).toBe(90);
    expect(r.verbrauch).toBe(600);
    expect(r.hochrechnungJahr).toBeCloseTo((600 / 90) * 365, 10);
    // Schaltjahr und Zeitumstellung zählen als ganze Tage
    expect(zaehlerstand(0, 366, "2028-01-01", "2029-01-01")!.tage).toBe(366);
    expect(zaehlerstand(0, 10, "2026-03-28", "2026-03-30")!.tage).toBe(2);
  });

  it("Zählerstand: ungültige Daten", () => {
    expect(zaehlerstand(500, 400, "2026-01-01", "2026-02-01")).toBeNull();
    expect(zaehlerstand(100, 200, "2026-02-01", "2026-02-01")).toBeNull();
    expect(zaehlerstand(100, 200, "2026-02-30", "2026-03-10")).toBeNull();
  });

  it("Break-even zwischen zwei Tarifen", () => {
    const a = { arbeitspreisCt: 28, grundpreisMonat: 15 };
    const b = { arbeitspreisCt: 32, grundpreisMonat: 9 };
    const kwh = breakEvenKwh(a, b);
    // (9 − 15) × 12 × 100 ÷ (28 − 32) = 1.800 kWh
    expect(kwh).toBeCloseTo(1800, 10);
    expect(jahreskosten(kwh, a)).toBeCloseTo(jahreskosten(kwh, b), 10);
    expect(jahreskosten(3000, a)).toBeLessThan(jahreskosten(3000, b));
    expect(jahreskosten(1000, a)).toBeGreaterThan(jahreskosten(1000, b));
    expect(breakEvenKwh(a, { ...a, grundpreisMonat: 10 })).toBeNaN();
    expect(breakEvenKwh({ arbeitspreisCt: 25, grundpreisMonat: 9 }, b)).toBeNaN();
  });
});
