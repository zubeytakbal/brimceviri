import { describe, expect, it } from "vitest";
import {
  ausRoemisch,
  bruchRechnen,
  euklidSchritte,
  fakultaet,
  ggT,
  gemischt,
  inRoemisch,
  kgV,
  nUeberK,
  parseBruch,
  parseZahlenliste,
  primfaktoren,
  primfaktorText,
  quadratisch,
  statistik,
  teiler,
  teilerAnzahl,
  wurzelVereinfachen,
} from "../app/converter/germanSchoolMath";

describe("Teiler", () => {
  it("ggT, kgV, Euklid", () => {
    expect(ggT(84, 36)).toBe(12);
    expect(kgV(4, 6)).toBe(12);
    expect(euklidSchritte(84, 36)).toEqual([
      { a: 84, b: 36, q: 2, r: 12 },
      { a: 36, b: 12, q: 3, r: 0 },
    ]);
  });
  it("Primfaktoren und Teiler", () => {
    expect(primfaktorText(primfaktoren(360))).toBe("2³ · 3² · 5");
    expect(teilerAnzahl(primfaktoren(360))).toBe(24);
    expect(teiler(12)).toEqual([1, 2, 3, 4, 6, 12]);
    expect(primfaktoren(97)).toEqual([[97, 1]]);
  });
});

describe("Brüche", () => {
  it("parses input", () => {
    expect(parseBruch("3/4")).toEqual({ z: 3, n: 4 });
    expect(parseBruch("1 1/2")).toEqual({ z: 3, n: 2 });
    expect(parseBruch("0,75")).toEqual({ z: 3, n: 4 });
    expect(parseBruch("-2")).toEqual({ z: -2, n: 1 });
    expect(parseBruch("3/0")).toBeNull();
  });
  it("calculates with steps", () => {
    const r = bruchRechnen({ z: 1, n: 4 }, "+", { z: 1, n: 6 })!;
    expect(r.ergebnis).toEqual({ z: 5, n: 12 });
    expect(r.steps[0]).toBe("Hauptnenner: kgV(4, 6) = 12");
    expect(bruchRechnen({ z: 2, n: 3 }, "·", { z: 3, n: 4 })!.ergebnis).toEqual({ z: 1, n: 2 });
    expect(bruchRechnen({ z: 3, n: 4 }, ":", { z: 1, n: 2 })!.ergebnis).toEqual({ z: 3, n: 2 });
    expect(bruchRechnen({ z: 1, n: 2 }, "−", { z: 3, n: 4 })!.ergebnis).toEqual({ z: -1, n: 4 });
    expect(bruchRechnen({ z: 1, n: 2 }, ":", { z: 0, n: 1 })).toBeNull();
    expect(gemischt({ z: 7, n: 3 })).toBe("2 1/3");
  });
});

describe("Wurzeln und Gleichungen", () => {
  it("simplifies roots", () => {
    expect(wurzelVereinfachen(72)).toEqual({ aussen: 6, innen: 2 });
    expect(wurzelVereinfachen(49)).toEqual({ aussen: 7, innen: 1 });
    expect(wurzelVereinfachen(54, 3)).toEqual({ aussen: 3, innen: 2 });
  });
  it("solves quadratics", () => {
    const q = quadratisch(1, -5, 6)!;
    expect(q.loesungen).toEqual([2, 3]);
    expect(q.diskriminante).toBe(1);
    expect(q.scheitel).toEqual({ x: 2.5, y: -0.25 });
    expect(quadratisch(2, 4, 2)!.loesungen).toEqual([-1]);
    expect(quadratisch(1, 0, 1)!.loesungen).toEqual([]);
    expect(quadratisch(2, -8, 6)!.pq).toEqual({ p: -4, q: 3 });
    expect(quadratisch(0, 1, 1)).toBeNull();
  });
});

describe("Römische Zahlen", () => {
  it("converts both ways", () => {
    expect(inRoemisch(2026)!.text).toBe("MMXXVI");
    expect(inRoemisch(1994)!.text).toBe("MCMXCIV");
    expect(ausRoemisch("MCMXCIV")).toBe(1994);
    expect(ausRoemisch("mmxxvi")).toBe(2026);
    expect(ausRoemisch("IIII")).toBeNull();
    expect(ausRoemisch("IC")).toBeNull();
    expect(inRoemisch(4000)).toBeNull();
  });
});

describe("Statistik und Kombinatorik", () => {
  it("parses German number lists", () => {
    expect(parseZahlenliste("3,5; 4; 7")).toEqual([3.5, 4, 7]);
    expect(parseZahlenliste("3,5 4 7")).toEqual([3.5, 4, 7]);
    expect(parseZahlenliste("1,2,3")).toEqual([1, 2, 3]);
    expect(parseZahlenliste("1, 2, 3")).toEqual([1, 2, 3]);
  });
  it("computes statistics", () => {
    const s = statistik([2, 4, 4, 4, 5, 5, 7, 9])!;
    expect(s.mittel).toBe(5);
    expect(s.median).toBe(4.5);
    expect(s.modus).toEqual([4]);
    expect(s.sdPop).toBe(2);
    expect(s.spannweite).toBe(7);
  });
  it("binomial coefficient and factorial", () => {
    expect(nUeberK(49, 6)).toBe(BigInt(13983816));
    expect(nUeberK(5, 2)).toBe(BigInt(10));
    expect(fakultaet(10)).toBe(BigInt(3628800));
  });
});
