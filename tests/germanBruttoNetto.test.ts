import { describe, expect, it } from "vitest";
import {
  annualUpdates,
  isOutdated,
  isReminderDue,
} from "../app/converter/annualUpdates";
import {
  BN_JAHR,
  bruttoNetto,
  DEFAULT_EINGABE,
  midijobBasisAn,
  nettoJeSteuerklasse,
  pvSatzArbeitnehmer,
} from "../app/converter/germanBruttoNetto";

const base = { ...DEFAULT_EINGABE };

// Einkommensteuertarif 2026 nach § 32a EStG (unabhängige Gegenrechnung)
function est2026(zve: number) {
  const x = Math.floor(zve);
  if (x <= 12348) return 0;
  if (x <= 17799) {
    const y = (x - 12348) / 10000;
    return Math.floor((914.51 * y + 1400) * y);
  }
  if (x <= 69878) {
    const z = (x - 17799) / 10000;
    return Math.floor((173.1 * z + 2397) * z + 1034.87);
  }
  if (x <= 277825) return Math.floor(0.42 * x - 11135.63);
  return Math.floor(0.45 * x - 19470.38);
}

describe("Brutto-Netto 2026", () => {
  it("matches the BMF reference case (5.000 €, Steuerklasse I, kinderlos, Zusatzbeitrag 2,5 %)", () => {
    const r = bruttoNetto({ ...base, brutto: 5000, zusatzbeitrag: 2.5 });
    expect(r.lohnsteuer).toBe(785.83);
    expect(r.soli).toBe(0);
    expect(r.kv).toBe(427.5);
    expect(r.pv).toBe(120);
    expect(r.rv).toBe(465);
    expect(r.av).toBe(65);
    expect(r.netto).toBe(3136.67);
  });

  it("agrees with an independent tariff calculation", () => {
    // 60.000 € p. a.: Vorsorgepauschale RV 5.580 + KV 4.950 + PV 1.440, Werbungskosten 1.230, Sonderausgaben 36
    const zve = 60000 - 1230 - 36 - 5580 - 4950 - 1440;
    expect(
      Math.abs(
        bruttoNetto({ ...base, brutto: 5000, zusatzbeitrag: 2.5 }).lohnsteuer *
          12 -
          est2026(zve),
      ),
    ).toBeLessThan(1);
  });

  it("caps contributions at the Beitragsbemessungsgrenzen", () => {
    const r = bruttoNetto({ ...base, brutto: 10000 });
    expect(r.kv).toBe(Math.round(5812.5 * 8.75) / 100);
    expect(r.rv).toBe(Math.round(8450 * 9.3) / 100);
    expect(r.soli).toBeGreaterThan(0);
  });

  it("handles Minijob and Übergangsbereich", () => {
    expect(bruttoNetto({ ...base, brutto: 603 }).netto).toBe(603);
    expect(
      bruttoNetto({ ...base, brutto: 603, minijobRvBefreit: false }).rv,
    ).toBe(21.71);
    expect(midijobBasisAn(603.01)).toBeLessThan(0.1);
    expect(midijobBasisAn(2000)).toBeCloseTo(2000, 6);
    const m = bruttoNetto({ ...base, brutto: 1500 });
    expect(m.art).toBe("midijob");
    expect(m.rv).toBeCloseTo((2000 / 1397) * 897 * 0.093, 1);
  });

  it("applies Pflegeversicherung rules", () => {
    expect(
      pvSatzArbeitnehmer({ bundesland: "nw", kinder: 0, unter23: false }),
    ).toBe(2.4);
    expect(
      pvSatzArbeitnehmer({ bundesland: "nw", kinder: 0, unter23: true }),
    ).toBe(1.8);
    expect(
      pvSatzArbeitnehmer({ bundesland: "nw", kinder: 3, unter23: false }),
    ).toBe(1.3);
    expect(
      pvSatzArbeitnehmer({ bundesland: "nw", kinder: 7, unter23: false }),
    ).toBe(0.8);
    expect(
      pvSatzArbeitnehmer({ bundesland: "sn", kinder: 1, unter23: false }),
    ).toBe(2.3);
  });

  it("orders tax classes plausibly and adds church tax", () => {
    const rows = nettoJeSteuerklasse({ ...base, brutto: 4000 });
    const netto = Object.fromEntries(
      rows.map((r) => [r.stkl, r.ergebnis.netto]),
    );
    expect(netto[3]).toBeGreaterThan(netto[2]);
    expect(netto[2]).toBeGreaterThan(netto[1]);
    expect(netto[1]).toBe(netto[4]);
    expect(netto[5]).toBeLessThan(netto[1]);
    expect(netto[6]).toBeLessThan(netto[5]);
    const k = bruttoNetto({
      ...base,
      brutto: 4000,
      kirchensteuer: true,
      bundesland: "by",
    });
    expect(k.kirchensteuer).toBeCloseTo(k.lohnsteuer * 0.08, 0);
  });

  it("handles private health insurance with employer subsidy", () => {
    const r = bruttoNetto({
      ...base,
      brutto: 7000,
      krankenversicherung: "privat",
      pkvBeitrag: 700,
    });
    expect(r.kv).toBe(0);
    expect(r.pkvNetto).toBe(350);
    const g = bruttoNetto({ ...base, brutto: 7000 });
    expect(r.lohnsteuer).not.toBe(g.lohnsteuer);
  });
});

describe("Yearly update reminders", () => {
  it("keeps the Brutto-Netto year in sync and flags outdated values", () => {
    const bn = annualUpdates.find((u) => u.id === "de-brutto-netto")!;
    expect(bn.validYear).toBe(BN_JAHR);
    expect(isReminderDue(bn, new Date(Date.UTC(BN_JAHR, 10, 14)))).toBe(false);
    expect(isReminderDue(bn, new Date(Date.UTC(BN_JAHR, 10, 15)))).toBe(true);
    expect(isOutdated(bn, new Date(Date.UTC(BN_JAHR, 11, 31)))).toBe(false);
    expect(isOutdated(bn, new Date(Date.UTC(BN_JAHR + 1, 0, 1)))).toBe(true);
  });
});

describe("parseBetrag", () => {
  it("reads German and plain amounts", async () => {
    const { parseBetrag } = await import("../app/converter/germanBruttoNetto");
    expect(parseBetrag("3.500")).toBe(3500);
    expect(parseBetrag("3.500,50 €")).toBe(3500.5);
    expect(parseBetrag("3500,5")).toBe(3500.5);
    expect(parseBetrag("3500.50")).toBe(3500.5);
    expect(parseBetrag("48.000")).toBe(48000);
  });
});
