import { describe, expect, it } from "vitest";
import {
  GRUNDERWERBSTEUER,
  kaufnebenkosten,
} from "../app/converter/germanKaufnebenkosten";

const base = {
  kaufpreis: 400000,
  bundesland: "nw" as const,
  inventar: 0,
  notarProzent: 1.5,
  grundbuchProzent: 0.5,
  maklerProzent: 3.57,
  familie: false,
};

describe("Grunderwerbsteuer und Kaufnebenkosten", () => {
  it("has the 2026 rates for all 16 states", () => {
    expect(Object.keys(GRUNDERWERBSTEUER)).toHaveLength(16);
    expect(GRUNDERWERBSTEUER.by).toBe(3.5);
    expect(GRUNDERWERBSTEUER.hb).toBe(5.5);
    expect(GRUNDERWERBSTEUER.th).toBe(5.0);
    expect(
      ["bb", "nw", "sl", "sh"].every(
        (s) => GRUNDERWERBSTEUER[s as keyof typeof GRUNDERWERBSTEUER] === 6.5,
      ),
    ).toBe(true);
  });

  it("computes the costs", () => {
    const r = kaufnebenkosten(base);
    expect(r.grunderwerbsteuer).toBe(26000);
    expect(r.notar).toBe(6000);
    expect(r.grundbuch).toBe(2000);
    expect(r.makler).toBeCloseTo(14280, 6);
    expect(r.summe).toBeCloseTo(48280, 6);
    expect(r.prozent).toBeCloseTo(12.07, 2);
  });

  it("excludes inventory, rounds down and applies exemptions", () => {
    const r = kaufnebenkosten({ ...base, inventar: 10000 });
    expect(r.bemessung).toBe(390000);
    expect(r.grunderwerbsteuer).toBe(25350);
    expect(r.inventarErsparnis).toBe(650);
    expect(
      kaufnebenkosten({ ...base, kaufpreis: 123457, bundesland: "by" })
        .grunderwerbsteuer,
    ).toBe(4320);
    expect(kaufnebenkosten({ ...base, familie: true }).grunderwerbsteuer).toBe(
      0,
    );
    expect(
      kaufnebenkosten({ ...base, kaufpreis: 2500 }).grunderwerbsteuer,
    ).toBe(0);
    expect(
      kaufnebenkosten({ ...base, kaufpreis: 2501 }).grunderwerbsteuer,
    ).toBe(162);
  });
});
