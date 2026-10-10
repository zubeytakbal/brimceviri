// Element sayfasi: atom kutlesinden mol karsiligi. Kutle tablodaki standart
// atom agirligidir, yaklasik degerdir.
import { categoryLabels, periodicTable, type PeriodicElement } from "./periodicTableData";

const tr = (value: number, digits = 4) =>
  value.toLocaleString("tr-TR", { maximumFractionDigits: digits });

const MOLES = [0.5, 1, 2, 5, 10, 25, 50, 100];
const GRAMS = [1, 5, 10, 25, 50, 100, 250, 1000];

export type ElementReading = {
  heading: string;
  paragraphs: string[];
  headers: string[];
  rows: string[][];
};

export function buildElementReading(element: PeriodicElement): ElementReading {
  const name = element.nameTr;
  const mass = element.atomicMass;
  const previous = periodicTable.find((item) => item.atomicNumber === element.atomicNumber - 1);
  const next = periodicTable.find((item) => item.atomicNumber === element.atomicNumber + 1);
  const neighbors = [
    previous ? `${name} öncesinde ${previous.nameTr} (${previous.symbol}, ${previous.atomicNumber})` : `${name} tablonun ilk elementidir`,
    next ? `${name} sonrasında ${next.nameTr} (${next.symbol}, ${next.atomicNumber})` : `${name} tablonun son elementidir`,
  ];
  const group =
    element.group === null ? `${name} lantanit veya aktinit serisinde` : `${name} ${element.group}. grupta`;
  const category = categoryLabels[element.category].toLocaleLowerCase("tr");

  return {
    heading: `${name} mol karşılığı`,
    paragraphs: [
      `${name} (${element.symbol}) atom numarası ${element.atomicNumber}, atom kütlesi ${tr(mass)} u. 1 mol ${name} yaklaşık ${tr(mass)} gram eder. 10 gram ${name} yaklaşık ${tr(10 / mass)} mol tutar.`,
      `${name} kategorisi ${category}, ${name} ${element.period}. periyotta. ${group}. ${neighbors.join(". ")}.`,
      `${name} için ${tr(mass)} u yuvarlanmıştır. ${name} izotopu değişirse kütle de değişir.`,
    ],
    headers: [`${name} miktarı`, `${element.symbol} karşılığı`],
    rows: [
      ...MOLES.map((mole) => [`${tr(mole, 1)} mol ${name}`, `${tr(mole * mass)} g ${element.symbol}`]),
      ...GRAMS.map((gram) => [`${tr(gram, 0)} g ${name}`, `${tr(gram / mass)} mol ${element.symbol}`]),
    ],
  };
}

export function elementReadingPlain(element: PeriodicElement) {
  const reading = buildElementReading(element);
  return [reading.heading, ...reading.paragraphs, reading.headers.join(" "), ...reading.rows.map((row) => row.join(" "))].join(" ");
}
