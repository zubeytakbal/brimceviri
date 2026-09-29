import { describe, expect, it } from "vitest";
import { germanCities } from "../app/converter/geo/germanCities";
import {
  entfernungPaare,
  entfernungPaarPath,
  findGermanCity,
  himmelsrichtung,
  kurs,
  lageAdjektiv,
  luftlinieKm,
  mittelpunkt,
} from "../app/converter/geo/germanDistances";

const city = (id: string) => findGermanCity(id)!;

describe("German city data", () => {
  it("has unique ids and all 16 Landeshauptstädte", () => {
    expect(new Set(germanCities.map((c) => c.id)).size).toBe(germanCities.length);
    for (const id of ["berlin", "hamburg", "bremen", "muenchen", "stuttgart", "wiesbaden", "mainz", "saarbruecken", "duesseldorf", "hannover", "kiel", "schwerin", "potsdam", "magdeburg", "dresden", "erfurt"]) {
      expect(findGermanCity(id), id).not.toBeNull();
    }
    expect(city("muenchen").land).toBe("by");
    expect(city("potsdam").land).toBe("bb");
    expect(city("saarbruecken").land).toBe("sl");
  });
});

describe("Luftlinie", () => {
  it("matches reference distances", () => {
    // Referenz luftlinie.org: Berlin – München 504,5 km
    expect(luftlinieKm(city("berlin"), city("muenchen"))).toBeGreaterThan(502);
    expect(luftlinieKm(city("berlin"), city("muenchen"))).toBeLessThan(507);
    expect(Math.round(luftlinieKm(city("berlin"), city("hamburg")))).toBeGreaterThan(250);
    expect(Math.round(luftlinieKm(city("berlin"), city("hamburg")))).toBeLessThan(260);
  });
  it("gives compass directions", () => {
    expect(himmelsrichtung(kurs(city("berlin"), city("muenchen")))).toBe("Süden");
    expect(lageAdjektiv(kurs(city("muenchen"), city("hamburg")))).toBe("nördlich");
    expect(himmelsrichtung(kurs(city("koeln"), city("dresden")))).toBe("Osten");
  });
  it("computes a midpoint between the cities", () => {
    const m = mittelpunkt(city("berlin"), city("muenchen"));
    expect(m.lat).toBeGreaterThan(48.1);
    expect(m.lat).toBeLessThan(52.6);
  });
});

describe("Pair pages", () => {
  it("builds one page per hub pair without duplicates", () => {
    const pairs = entfernungPaare();
    const keys = pairs.map((p) => [p.from.id, p.to.id].sort().join("|"));
    expect(new Set(keys).size).toBe(pairs.length);
    expect(pairs.length).toBe(5 * (germanCities.length - 1) - 10);
    expect(entfernungPaarPath(city("muenchen"), city("berlin"))).toBe("/de/entfernung/berlin/muenchen");
    expect(entfernungPaarPath(city("bonn"), city("kiel"))).toBeNull();
  });
});
