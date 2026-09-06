// Kimyasal formul ayristirici -- "H2O", "Fe2O3", "Al2(SO4)3" gibi
// formulleri element+sayi ciftlerine ayirip periyodik tablo verisinden
// molar kutleyi hesaplar. Ic ice parantezleri destekler.

import { periodicTable } from "./periodicTableData";

const atomicMassBySymbol = new Map(
  periodicTable.map((element) => [element.symbol, element.atomicMass])
);

const nameBySymbol = new Map(
  periodicTable.map((element) => [element.symbol, element.nameTr])
);

export type FormulaComposition = {
  symbol: string;
  nameTr: string;
  count: number;
};

export type ParsedFormulaResult = {
  molarMass: number;
  composition: FormulaComposition[];
};

export function parseMolecularFormula(
  rawFormula: string
): ParsedFormulaResult | null {
  const formula = rawFormula.trim();

  if (!formula) {
    return null;
  }

  let index = 0;

  function parseCount(): number {
    let digits = "";

    while (index < formula.length && /[0-9]/.test(formula[index])) {
      digits += formula[index];
      index += 1;
    }

    return digits ? Number(digits) : 1;
  }

  function parseGroup(): Map<string, number> | null {
    const counts = new Map<string, number>();

    while (index < formula.length && formula[index] !== ")") {
      const char = formula[index];

      if (char === "(") {
        index += 1;
        const subCounts = parseGroup();

        if (!subCounts || formula[index] !== ")") {
          return null;
        }

        index += 1;
        const multiplier = parseCount();

        for (const [symbol, count] of subCounts) {
          counts.set(symbol, (counts.get(symbol) ?? 0) + count * multiplier);
        }

        continue;
      }

      if (!/[A-Z]/.test(char)) {
        return null;
      }

      let symbol = char;
      index += 1;

      while (index < formula.length && /[a-z]/.test(formula[index])) {
        symbol += formula[index];
        index += 1;
      }

      if (!atomicMassBySymbol.has(symbol)) {
        return null;
      }

      const count = parseCount();
      counts.set(symbol, (counts.get(symbol) ?? 0) + count);
    }

    return counts;
  }

  const parsed = parseGroup();

  if (!parsed || index !== formula.length || parsed.size === 0) {
    return null;
  }

  let molarMass = 0;
  const composition: FormulaComposition[] = [];

  for (const [symbol, count] of parsed) {
    const atomicMass = atomicMassBySymbol.get(symbol);

    if (atomicMass === undefined) {
      return null;
    }

    molarMass += atomicMass * count;
    composition.push({
      symbol,
      nameTr: nameBySymbol.get(symbol) ?? symbol,
      count,
    });
  }

  return { molarMass, composition };
}
