import { describe, expect, it } from "vitest";
import {
  baufiRate,
  effektivAusSollzins,
  kreditbetragAusRate,
  monatsrate,
  monatszinsAusEffektiv,
  restschuldNachJahren,
  tilgungsplan,
} from "../app/converter/germanKredit";

describe("Kreditrechner (Annuität)", () => {
  it("Monatsrate nach Annuitätenformel", () => {
    // 10.000 € über 36 Monate, 0,5 % pro Monat (6 % nominal): 304,22 €
    expect(monatsrate(10000, 0.005, 36)).toBeCloseTo(304.219, 2);
    expect(monatsrate(1200, 0, 12)).toBe(100);
    expect(monatsrate(0, 0.005, 12)).toBeNaN();
  });

  it("effektiver Jahreszins ↔ Monatszins", () => {
    const i = monatszinsAusEffektiv(6.17);
    expect((1 + i) ** 12).toBeCloseTo(1.0617, 10);
    // 6 % Sollzins ≈ 6,17 % effektiv (monatliche Verrechnung)
    expect(effektivAusSollzins(6)).toBeCloseTo(6.168, 3);
  });

  it("Kreditbetrag aus Wunschrate ist die Umkehrung der Rate", () => {
    const rate = monatsrate(15000, 0.004, 60);
    expect(kreditbetragAusRate(rate, 0.004, 60)).toBeCloseTo(15000, 6);
    expect(kreditbetragAusRate(250, 0, 48)).toBe(12000);
  });

  it("Tilgungsplan endet genau nach der Laufzeit, Summen stimmen", () => {
    const rate = monatsrate(10000, 0.005, 36);
    const plan = tilgungsplan({ betrag: 10000, monatszins: 0.005, rate })!;
    expect(plan.laufzeitMonate).toBe(36);
    expect(plan.jahre).toHaveLength(3);
    expect(plan.jahre[2].restschuld).toBe(0);
    expect(plan.gesamtGezahlt).toBeCloseTo(rate * 36, 6);
    expect(plan.gesamtZinsen).toBeCloseTo(rate * 36 - 10000, 6);
    const tilgungSumme = plan.jahre.reduce((s, j) => s + j.tilgung + j.sondertilgung, 0);
    expect(tilgungSumme).toBeCloseTo(10000, 6);
  });

  it("Rate deckt die Zinsen nicht: keine Laufzeit", () => {
    const plan = tilgungsplan({ betrag: 100000, monatszins: 0.005, rate: 400 })!;
    expect(plan.laufzeitMonate).toBeNull();
  });
});

describe("Tilgungsrechner (Baufinanzierung)", () => {
  it("Rate = Darlehen × (Sollzins + Tilgung) ÷ 12", () => {
    expect(baufiRate(300000, 3.5, 2)).toBeCloseTo(1375, 10);
  });

  it("Restschuld nach 10 Jahren Zinsbindung (300.000 €, 3,5 %, 2 % Tilgung)", () => {
    const rate = baufiRate(300000, 3.5, 2);
    const plan = tilgungsplan({ betrag: 300000, monatszins: 0.035 / 12, rate })!;
    // Geschlossene Formel: K·q^n − R·(q^n − 1)/i
    const i = 0.035 / 12;
    const q = (1 + i) ** 120;
    const erwartet = 300000 * q - (rate * (q - 1)) / i;
    expect(restschuldNachJahren(plan, 10)).toBeCloseTo(erwartet, 4);
    expect(erwartet).toBeCloseTo(228283.74, 1);
    // Volltilgung: n = −ln(1 − i·K/R) / ln(1 + i) ≈ 347,3 → 348 Monate (29 Jahre)
    const n = -Math.log(1 - (i * 300000) / rate) / Math.log(1 + i);
    expect(plan.laufzeitMonate).toBe(Math.ceil(n));
    expect(plan.laufzeitMonate).toBe(348);
  });

  it("Sondertilgung verkürzt die Laufzeit und senkt die Zinsen", () => {
    const rate = baufiRate(300000, 3.5, 2);
    const ohne = tilgungsplan({ betrag: 300000, monatszins: 0.035 / 12, rate })!;
    const mit = tilgungsplan({ betrag: 300000, monatszins: 0.035 / 12, rate, sondertilgungProJahr: 5000 })!;
    expect(mit.laufzeitMonate!).toBeLessThan(ohne.laufzeitMonate!);
    expect(mit.gesamtZinsen).toBeLessThan(ohne.gesamtZinsen);
    expect(mit.jahre[0].sondertilgung).toBe(5000);
    const summe = mit.jahre.reduce((s, j) => s + j.tilgung + j.sondertilgung, 0);
    expect(summe).toBeCloseTo(300000, 4);
  });
});
