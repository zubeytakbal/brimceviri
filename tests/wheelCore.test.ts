import { describe, expect, it } from "vitest";
import {
  drawParticipants,
  indexAtPointer,
  landingRotation,
  listFingerprint,
  parseEntries,
  pickWeighted,
  sliceArcs,
  splitTeams,
  TAU,
} from "../app/components/wheel/wheelCore";

// Deterministik rastgele: testler tekrarlanabilir olsun diye.
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

describe("parseEntries", () => {
  it("bos satirlari atlar, *N agirligini okur", () => {
    expect(parseEntries("Ali\n\n  Ayşe *3 \nPizza*120\n*2")).toEqual([
      { label: "Ali", weight: 1 },
      { label: "Ayşe", weight: 3 },
      { label: "Pizza*120", weight: 1 },
      { label: "*2", weight: 1 },
    ]);
  });
});

describe("dilim ve ibre", () => {
  const entries = parseEntries("A\nB *2\nC");
  it("dilimler agirlikla orantili ve tam turu kaplar", () => {
    const arcs = sliceArcs(entries);
    expect(arcs[1][1] - arcs[1][0]).toBeCloseTo(TAU / 2);
    expect(arcs[2][1]).toBeCloseTo(TAU);
  });
  it("cark her zaman secilen kazananin uzerinde durur", () => {
    const random = seeded(7);
    let rot = 0;
    for (let i = 0; i < 500; i++) {
      const winner = pickWeighted(entries, random);
      rot = landingRotation(entries, winner, rot, 5, random);
      expect(indexAtPointer(entries, rot)).toBe(winner);
    }
  });
});

describe("pickWeighted", () => {
  it("agirliga gore secer", () => {
    const entries = parseEntries("A\nB *3");
    const random = seeded(42);
    let b = 0;
    for (let i = 0; i < 20000; i++) if (pickWeighted(entries, random) === 1) b++;
    expect(b / 20000).toBeGreaterThan(0.73);
    expect(b / 20000).toBeLessThan(0.77);
  });
});

describe("splitTeams", () => {
  it("herkesi bir kez ve dengeli dagitir", () => {
    const teams = splitTeams(["a", "b", "c", "d", "e", "f", "g"], 3, seeded(1));
    expect(teams.map((t) => t.length).sort()).toEqual([2, 2, 3]);
    expect(teams.flat().sort()).toEqual(["a", "b", "c", "d", "e", "f", "g"]);
  });
});

describe("cekilis", () => {
  const text = "@ayse.kaya harika\n@Mehmet katılıyorum\n@ayse.kaya yine ben\n@dukkanim başladı\nmehmet tekrar";
  it("ilk kelimeyi alir, @ ve tekrarlari temizler, harictekileri cikarir", () => {
    expect(drawParticipants(text, { unique: true, stripAt: true, exclude: "@dukkanim", locale: "tr-TR" })).toEqual(["ayse.kaya", "Mehmet"]);
  });
  it("parmak izi sira bagimsiz, liste degisince degisir", async () => {
    const a = await listFingerprint(["b", "a", "c"], "tr-TR");
    expect(a).toMatch(/^[0-9A-F]{4} [0-9A-F]{4} [0-9A-F]{4}$/);
    expect(await listFingerprint(["c", "b", "a"], "tr-TR")).toBe(a);
    expect(await listFingerprint(["a", "b", "d"], "tr-TR")).not.toBe(a);
  });
});
