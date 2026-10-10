import { describe, expect, it } from "vitest";
import { germanElementArticles } from "../app/converter/germanElementArticles";
import {
  buildGermanElementReading,
  germanElementReadingPlain,
} from "../app/converter/germanElementReading";
import { calculateMol } from "../app/converter/molCalculator";
import { periodicTable } from "../app/converter/periodicTableData";
import { elementNamesDeBySymbol } from "../app/converter/periodicTableDataDe";

function uniqueChars(texts: string[], limit: number) {
  const pages = texts.map((text) => text.toLowerCase().split(/\s+/).filter(Boolean));
  const freq = new Map<string, number>();
  for (const words of pages) {
    const set = new Set<string>();
    for (let i = 0; i + 6 <= words.length; i++) set.add(words.slice(i, i + 6).join(" "));
    for (const gram of set) freq.set(gram, (freq.get(gram) ?? 0) + 1);
  }
  return pages.map((words) => {
    const own = new Uint8Array(words.length).fill(1);
    for (let i = 0; i + 6 <= words.length; i++) {
      if ((freq.get(words.slice(i, i + 6).join(" ")) ?? 0) >= limit) own.fill(0, i, i + 6);
    }
    let chars = 0;
    words.forEach((word, index) => {
      if (own[index]) chars += word.length + 1;
    });
    return chars;
  });
}

describe("German element reading", () => {
  it("converts hydrogen with the mol calculator", () => {
    const hydrogen = periodicTable[0];
    const text = germanElementReadingPlain(hydrogen);
    const ten = calculateMol({
      target: "moles",
      massGrams: 10,
      molarMass: hydrogen.atomicMass,
      moles: 0,
    })!;
    expect(hydrogen.symbol).toBe("H");
    expect(text).toContain("Wasserstoff (H) hat die Ordnungszahl 1 und die Atommasse 1,008 u");
    expect(text).toContain(`10 / 1,008 = ${ten.moles.toLocaleString("de-DE", { maximumFractionDigits: 4 })} mol H`);
    expect(text).toContain("Wasserstoff ist das erste Element der Tabelle.");
    expect(text).toContain("Direkt nach Wasserstoff steht Helium (He, 2).");
    expect(text).toContain("1 mol Wasserstoff");
    expect(text).not.toContain("diabetes");
  });

  it("names the neighbor of oganesson", () => {
    const last = periodicTable.find((element) => element.atomicNumber === 118)!;
    const text = germanElementReadingPlain(last);
    expect(last.symbol).toBe("Og");
    expect(text).toContain("Oganesson ist das letzte Element der Tabelle.");
    expect(text).toContain(
      `Direkt vor Oganesson steht ${elementNamesDeBySymbol.Ts} (Ts, 117).`,
    );
  });

  it("uses a different mass for every element", () => {
    const texts = periodicTable.map((element) => germanElementReadingPlain(element));
    const limit = Math.max(3, Math.ceil(texts.length * 0.02));
    const scores = uniqueChars(texts, limit);
    expect(Math.min(...scores)).toBeGreaterThan(500);
    expect(new Set(texts).size).toBe(periodicTable.length);
    const iron = periodicTable.find((element) => element.symbol === "Fe")!;
    const reading = buildGermanElementReading(iron);
    expect(reading.rows).toHaveLength(8);
    expect(reading.heading).toBe("Eisen: Mol, Gramm und Atome");
    expect(germanElementArticles.length).toBeGreaterThan(90);
  });
});
