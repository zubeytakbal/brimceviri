import { describe, expect, it } from "vitest";
import { solveBeam, type BeamLoad, type Support } from "../app/converter/mechanics/beam";

const L = 6;
const EI = 2.1e11 * 2.772e-5; // IPE 220 Iy ile çelik
const P = 10_000;
const w = 5_000;
const rel = (a: number, b: number) => Math.abs(a / b - 1);

describe("kiriş tablo formülleri", () => {
  const cases: Array<[string, Support, BeamLoad[], number, number]> = [
    ["basit, ortada tekil", "simple", [{ kind: "point", P, a: L / 2 }], (P * L) / 4, (P * L ** 3) / (48 * EI)],
    ["basit, yayılı", "simple", [{ kind: "udl", w }], (w * L * L) / 8, (5 * w * L ** 4) / (384 * EI)],
    ["konsol, uçta tekil", "cantilever", [{ kind: "point", P, a: L }], P * L, (P * L ** 3) / (3 * EI)],
    ["konsol, yayılı", "cantilever", [{ kind: "udl", w }], (w * L * L) / 2, (w * L ** 4) / (8 * EI)],
    ["ankastre, ortada tekil", "fixed", [{ kind: "point", P, a: L / 2 }], (P * L) / 8, (P * L ** 3) / (192 * EI)],
    ["ankastre, yayılı", "fixed", [{ kind: "udl", w }], (w * L * L) / 12, (w * L ** 4) / (384 * EI)],
  ];
  it.each(cases)("%s", (_n, support, loads, mMax, vMax) => {
    const r = solveBeam({ support, L, EI, loads });
    expect(rel(Math.abs(r.maxMoment), mMax)).toBeLessThan(1e-6);
    expect(rel(Math.abs(r.maxDeflection), vMax)).toBeLessThan(1e-5);
  });

  it("basit mesnet, eksantrik tekil yük: tablo formülü", () => {
    const a = 4;
    const b = L - a;
    const r = solveBeam({ support: "simple", L, EI, loads: [{ kind: "point", P, a }] });
    expect(rel(r.maxMoment, (P * a * b) / L)).toBeLessThan(1e-9);
    const vMax = (P * b * (L * L - b * b) ** 1.5) / (9 * Math.sqrt(3) * L * EI);
    expect(rel(r.maxDeflection, vMax)).toBeLessThan(1e-5);
  });
});

describe("denge ve EI·v'' = −M (her mesnet ve yük için)", () => {
  const loadsList: BeamLoad[][] = [[{ kind: "point", P, a: 1.7 }], [{ kind: "point", P, a: 4.4 }], [{ kind: "udl", w }], [{ kind: "udl", w }, { kind: "point", P, a: 2.5 }]];
  for (const support of ["simple", "cantilever", "fixed"] as Support[]) {
    for (const loads of loadsList) {
      it(`${support} ${loads.map((l) => l.kind).join("+")}`, () => {
        const r = solveBeam({ support, L, EI, loads });
        const total = loads.reduce((s, l) => s + (l.kind === "udl" ? l.w * L : l.P), 0);
        expect(rel(r.R1 + r.R2, total)).toBeLessThan(1e-9);
        // Sınır koşulları
        expect(Math.abs(r.v(0))).toBeLessThan(1e-12);
        if (support !== "cantilever") expect(Math.abs(r.v(L))).toBeLessThan(1e-12);
        // Sol uç momenti fonksiyonla uyumlu
        expect(Math.abs(r.M(0) - r.M1)).toBeLessThan(1e-6 * total * L);
        // Sonlu farkla eğrilik
        const h = 1e-3;
        for (const x of [0.37, 1.1, 2.9, 3.3, 5.2]) {
          if (loads.some((l) => l.kind === "point" && Math.abs(l.a - x) < 0.01)) continue;
          const curv = (r.v(x + h) - 2 * r.v(x) + r.v(x - h)) / (h * h);
          expect(Math.abs(EI * curv + r.M(x))).toBeLessThan(1e-4 * total * L);
        }
      });
    }
  }
});
