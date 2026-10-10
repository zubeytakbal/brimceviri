// Bilesik sayfasi: molar kutleden mol ve kutle ornekleri, element paylari.
import type { CompoundProfile } from "./compoundsHub";
import { periodicTable } from "./periodicTableData";

const tr = (value: number, digits = 4) =>
  value.toLocaleString("tr-TR", { maximumFractionDigits: digits });

function contribution(symbol: string, count: number) {
  const element = periodicTable.find((item) => item.symbol === symbol);
  return (element?.atomicMass ?? 0) * count;
}

const MOLES = [0.5, 1, 2, 5, 10, 25];
const GRAMS = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000];

export type CompoundReading = {
  heading: string;
  paragraphs: string[];
  headers: string[];
  rows: string[][];
};

export function buildCompoundReading(compound: CompoundProfile): CompoundReading {
  const name = compound.nameTr;
  const formula = compound.formula;
  const mass = compound.molarMass;
  const shares = compound.composition.map((item) => {
    const grams = contribution(item.symbol, item.count);
    const percent = mass > 0 ? (grams / mass) * 100 : 0;
    return `${item.count} × ${item.nameTr} (${item.symbol}) ${name} içinde ${tr(grams)} g/mol, yüzde ${tr(percent, 2)}`;
  });

  const moleRows = MOLES.map((mole) => [`${tr(mole, 1)} mol ${formula}`, `${tr(mole * mass)} g ${name}`]);
  const gramRows = GRAMS.map((gram) => [`${tr(gram, 0)} g ${name}`, `${tr(gram / mass)} mol ${formula}`]);

  return {
    heading: `${name} mol hesabı`,
    paragraphs: [
      `${name} (${formula}) molar kütlesi ${tr(mass)} g/mol. 1 mol ${formula} ${tr(mass)} gram ${name} eder. 10 gram ${name} ${tr(10 / mass)} mol ${formula} tutar.`,
      shares.join(". ") + ".",
      `Paylar ${formula} için yaklaşık yüzde 100 eder. ${name} değeri standart atom ağırlıklarının toplamıdır; izotopça zenginleştirilmiş ${formula} örneğinde kütle değişir.`,
    ],
    headers: [`${formula} miktarı`, `${name} karşılığı`],
    rows: [...moleRows, ...gramRows],
  };
}

export function compoundReadingPlain(compound: CompoundProfile) {
  const reading = buildCompoundReading(compound);
  return [reading.heading, ...reading.paragraphs, reading.headers.join(" "), ...reading.rows.map((row) => row.join(" "))].join(" ");
}
