// Tam denklem metni ayristirici -- "2H2O -> 2H2 + O2" gibi kullanicinin
// yazdigi bir denklemi reaktan/urun taraflarina, her birini de
// katsayi+formul ciftlerine ayirir. Molar kutle hesaplamasi icin
// molecularFormulaParser ile birlikte kullanilir.

export type EquationTerm = {
  coefficient: number;
  formula: string;
};

export type ParsedEquation = {
  reactants: EquationTerm[];
  products: EquationTerm[];
};

const ARROW_PATTERN = /->|→|=/;

function parseSide(side: string): EquationTerm[] | null {
  const terms = side
    .split("+")
    .map((term) => term.trim())
    .filter((term) => term.length > 0);

  if (terms.length === 0) {
    return null;
  }

  const result: EquationTerm[] = [];

  for (const term of terms) {
    const match = term.match(/^(\d*)\s*(.+)$/);

    if (!match) {
      return null;
    }

    const coefficient = match[1] ? Number(match[1]) : 1;
    const formula = match[2].trim();

    if (!formula) {
      return null;
    }

    result.push({ coefficient, formula });
  }

  return result;
}

export function parseEquationString(equation: string): ParsedEquation | null {
  const trimmed = equation.trim();

  if (!trimmed) {
    return null;
  }

  const parts = trimmed.split(ARROW_PATTERN);

  if (parts.length !== 2) {
    return null;
  }

  const reactants = parseSide(parts[0]);
  const products = parseSide(parts[1]);

  if (!reactants || !products) {
    return null;
  }

  return { reactants, products };
}
