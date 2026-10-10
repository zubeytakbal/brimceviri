// Elementseite: Mol und Atome aus der Tabellenmasse. Die Masse ist der
// gerundete Standardwert; ein anderes Isotop wiegt anders.
import { calculateMol } from "./molCalculator";
import { periodicTable, type PeriodicElement } from "./periodicTableData";
import { elementNamesDeBySymbol } from "./periodicTableDataDe";

const MOLES = [0.5, 1, 2, 10];
const GRAMS = [1, 10, 100, 1000];

function formatDe(value: number, digits = 4) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: digits });
}

function formatSci(value: number) {
  const [mantissa, exponent] = value.toExponential(3).split("e");
  const sup = String(Number(exponent)).replace(
    /[-0-9]/g,
    (ch) => "⁻⁰¹²³⁴⁵⁶⁷⁸⁹"["-0123456789".indexOf(ch)],
  );
  return `${Number(mantissa).toLocaleString("de-DE", { maximumFractionDigits: 3 })} × 10${sup}`;
}

function molOf(massGrams: number, molarMass: number) {
  const result = calculateMol({ target: "moles", massGrams, molarMass, moles: 0 });
  if (!result) throw new Error(`Molrechnung für ${molarMass} g/mol fehlgeschlagen`);
  return result;
}

function massOf(moles: number, molarMass: number) {
  const result = calculateMol({ target: "mass", massGrams: 0, molarMass, moles });
  if (!result) throw new Error(`Molrechnung für ${molarMass} g/mol fehlgeschlagen`);
  return result;
}

export type GermanElementReading = {
  heading: string;
  paragraphs: string[];
  headers: [string, string];
  rows: { label: string; value: string }[];
};

export function buildGermanElementReading(element: PeriodicElement): GermanElementReading {
  const name = elementNamesDeBySymbol[element.symbol] ?? element.symbol;
  const mass = element.atomicMass;
  const massText = formatDe(mass, 4);
  const previous = periodicTable.find((item) => item.atomicNumber === element.atomicNumber - 1);
  const next = periodicTable.find((item) => item.atomicNumber === element.atomicNumber + 1);
  const ten = molOf(10, mass);
  const before = previous
    ? `Direkt vor ${name} steht ${elementNamesDeBySymbol[previous.symbol] ?? previous.symbol} (${previous.symbol}, ${previous.atomicNumber}).`
    : `${name} ist das erste Element der Tabelle.`;
  const after = next
    ? `Direkt nach ${name} steht ${elementNamesDeBySymbol[next.symbol] ?? next.symbol} (${next.symbol}, ${next.atomicNumber}).`
    : `${name} ist das letzte Element der Tabelle.`;

  const rows = [
    ...MOLES.map((moles) => {
      const result = massOf(moles, mass);
      return {
        label: `${formatDe(moles, 1)} mol ${name}`,
        value: `${formatDe(result.massGrams)} g ${element.symbol}, etwa ${formatSci(result.particleCount)} Atome`,
      };
    }),
    ...GRAMS.map((grams) => {
      const result = molOf(grams, mass);
      return {
        label: `${formatDe(grams, 0)} g ${name}`,
        value: `${formatDe(result.moles)} mol ${element.symbol}, etwa ${formatSci(result.particleCount)} Atome`,
      };
    }),
  ];

  return {
    heading: `${name}: Mol, Gramm und Atome`,
    paragraphs: [
      `${name} (${element.symbol}) hat die Ordnungszahl ${element.atomicNumber} und die Atommasse ${massText} u. Ein Mol ${name} wiegt ${massText} g, denn M von ${name} ist ${massText} g/mol.`,
      `Stoffmenge von ${name}: n = m / M. Für 10 g ${name} ist n = 10 / ${massText} = ${formatDe(ten.moles)} mol ${element.symbol}. Die Masse ${massText} u für ${name} ist der gerundete Tabellenwert. Ein anderes Isotop von ${name} wiegt anders.`,
      `${before} ${after}`,
    ],
    headers: ["Vorgabe", `Ergebnis für ${name}`],
    rows,
  };
}

export function germanElementReadingPlain(element: PeriodicElement) {
  const reading = buildGermanElementReading(element);
  return [
    reading.heading,
    ...reading.paragraphs,
    reading.headers.join(" "),
    ...reading.rows.flatMap((row) => [row.label, row.value]),
  ].join(" ");
}
