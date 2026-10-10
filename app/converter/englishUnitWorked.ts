// Ingilizce birim rehberi: ceviriciyle ayni katsayidan hesaplanmis tablo.
// Altin/gumus safliktir (kutle degil), sicaklikta tek carpim yoktur.
import { convert } from "./convert";
import {
  englishDisplaySymbol,
  englishUnitInSentence,
  formatEnglishShort,
  pluralizeEnglishUnitName,
} from "./englishUnitDisplay";
import { unitRegistry } from "./unitRegistry";

export type EnglishUnitWorked = {
  heading: string;
  paragraphs: string[];
  headers: string[];
  rows: string[][];
  notes: string[];
};

const QUANTITIES = [0.1, 0.25, 0.5, 1, 2, 3, 5, 10, 15, 25, 50, 75, 100, 250, 500, 1000];

const PREFERRED: Record<string, string[]> = {
  uzunluk: ["m", "cm", "km", "ft", "in", "mi", "mm"],
  alan: ["m²", "ha", "acre", "ft²", "km²"],
  hacim: ["L", "mL", "m³", "gal", "imp gal", "ft³"],
  kutle: ["kg", "g", "lb", "oz", "t"],
  hiz: ["km/h", "m/s", "mph", "knot"],
  basinc: ["bar", "Pa", "kPa", "psi", "atm"],
  enerji: ["J", "kJ", "cal", "kcal", "kWh", "Wh"],
  guc: ["W", "kW", "hp"],
  zaman: ["s", "min", "h", "d"],
  frekans: ["Hz", "kHz", "MHz"],
  veri: ["B", "KB", "MB", "GB", "GiB", "bit"],
  kuvvet: ["N", "lbf", "kgf"],
  tork: ["N·m", "lbf·ft"],
  yogunluk: ["kg/m³", "g/cm³", "lb/ft³"],
  aci: ["°", "rad", "grad"],
  elektrik: ["V", "mV", "kV", "A", "mA", "kA"],
  kan_sekeri: ["mmol/L", "mg/dL"],
  vitamin_d: ["nmol/L", "ng/mL"],
};

type UnitInput = { category: string; unit: string; name: string; symbol: string };

const fmt = (value: number) => formatEnglishShort(value);

function registryEntry(category: string, symbol: string) {
  return unitRegistry.find((entry) => entry.category === category && entry.symbol === symbol);
}

function refLabel(category: string, symbol: string) {
  const name = registryEntry(category, symbol)?.en?.name;
  return name ? englishUnitInSentence(name) : englishDisplaySymbol(category, symbol);
}

function amountLabel(value: number, name: string) {
  const label = Math.abs(value) === 1 ? name : pluralizeEnglishUnitName(name);
  return `${fmt(value)} ${label}`;
}

function finitePositive(category: string, value: number, from: string, to: string) {
  const result = convert(category, value, from, to);
  return Number.isFinite(result) && result > 0 ? result : null;
}

function referenceSymbols(category: string, unit: string) {
  const available = new Set(
    unitRegistry.filter((entry) => entry.category === category && entry.symbol !== unit).map((entry) => entry.symbol),
  );
  const ordered = [
    ...(PREFERRED[category] ?? []).filter((symbol) => available.has(symbol)),
    ...unitRegistry
      .filter((entry) => entry.category === category && entry.symbol !== unit)
      .map((entry) => entry.symbol)
      .filter((symbol) => !(PREFERRED[category] ?? []).includes(symbol)),
  ];
  const picked: string[] = [];
  for (const symbol of ordered) {
    if (picked.includes(symbol)) continue;
    if (finitePositive(category, 1, unit, symbol) === null) continue;
    picked.push(symbol);
    if (picked.length === 3) break;
  }
  return picked;
}

function linearWorked(page: UnitInput, refs: string[]): EnglishUnitWorked {
  const one = refs.map((symbol) => finitePositive(page.category, 1, page.unit, symbol)!);
  const intro = `1 ${page.name} equals ${one
    .map((value, index) => `${fmt(value)} ${refLabel(page.category, refs[index])}`)
    .join(", ")
    .replace(/, ([^,]*)$/, " and $1")}.`;
  const headers = [page.name, ...refs.map((symbol) => `${page.name} in ${refLabel(page.category, symbol)}`)];
  const rows = QUANTITIES.map((quantity) => {
    const amount = amountLabel(quantity, page.name);
    return [
      amount,
      ...refs.map((symbol) => `${fmt(finitePositive(page.category, quantity, page.unit, symbol)!)} ${refLabel(page.category, symbol)} (${amount})`),
    ];
  });
  const notes = refs.map((symbol) => {
    const back = finitePositive(page.category, 1, symbol, page.unit);
    return back === null ? "" : `1 ${refLabel(page.category, symbol)} equals ${fmt(back)} ${page.name}.`;
  }).filter(Boolean);

  const entry = registryEntry(page.category, page.unit);
  if (page.category === "veri" && entry?.siFactor !== undefined) {
    notes.push(`${page.name} is ${fmt(entry.siFactor)} bytes in this converter. Decimal bytes use powers of 1,000; kibibytes and gibibytes use powers of 1,024.`);
  }
  if (page.unit === "cal" || page.unit === "kcal") {
    const joule = finitePositive(page.category, 1, page.unit, "J");
    if (joule !== null) {
      notes.push(
        page.unit === "cal"
          ? `1 ${page.name} here is the thermochemical calorie, ${fmt(joule)} J, not a food Calorie. A food Calorie is the kilocalorie.`
          : `1 ${page.name} is ${fmt(joule)} J, the food Calorie.`,
      );
    }
  }
  if (page.category === "kan_sekeri" || page.category === "vitamin_d") {
    notes.push(`${page.name} only converts the reported number. ${page.name} does not interpret a laboratory result.`);
  }
  if (page.unit === "kWh") {
    const joule = finitePositive(page.category, 1, page.unit, "J");
    if (joule !== null) notes.push(`1 ${page.name} equals ${fmt(joule)} J, which is 3.6 MJ.`);
  }

  return {
    heading: `${page.name} conversions`,
    paragraphs: [intro, `Every row uses that same ${page.name} factor. 10 ${pluralizeEnglishUnitName(page.name)} is ten times 1 ${page.name}.`],
    headers,
    rows,
    notes,
  };
}

function temperatureWorked(page: UnitInput): EnglishUnitWorked {
  const others = ["C", "F", "K"].filter((symbol) => symbol !== page.unit);
  const anchors = [-40, -30, -17.78, -10, 0, 10, 20, 25, 32, 37, 50, 75, 98.6, 100, 180, 212];
  const headers = [page.name, ...others.map((symbol) => `${page.name} to ${englishDisplaySymbol("sicaklik", symbol)}`)];
  const rows = anchors.map((celsius) => {
    const input = convert("sicaklik", celsius, "C", page.unit);
    return [
      amountLabel(input, page.name),
      ...others.map((symbol) => {
        const output = fmt(convert("sicaklik", celsius, "C", symbol));
        const mark = englishDisplaySymbol("sicaklik", symbol);
        return `${output} ${mark} from ${fmt(input)} ${page.name}`;
      }),
    ];
  });
  const notes = [
    `${page.name} has no single multiply factor, because the zero of ${page.name} is not the zero of the other scales.`,
  ];
  if (page.unit === "C" || page.unit === "F") {
    notes.push(`−40 ${englishDisplaySymbol("sicaklik", "C")} and −40 ${englishDisplaySymbol("sicaklik", "F")} are the same temperature.`);
  }
  if (Math.abs(convert("sicaklik", 0, page.unit, "K")) < 1e-6) {
    notes.push(`0 ${page.name} is absolute zero, the same point as 0 K.`);
  }
  const freezing = convert("sicaklik", 0, "C", page.unit);
  const boiling = convert("sicaklik", 100, "C", page.unit);
  notes.push(
    `Water freezes at ${fmt(freezing)} ${page.name} and boils at ${fmt(boiling)} ${page.name} under standard conditions.`,
  );
  return {
    heading: `${page.name} conversions`,
    paragraphs: [
      `${fmt(freezing)} ${page.name} is the freezing point of water, and ${fmt(boiling)} ${page.name} is the boiling point.`,
    ],
    headers,
    rows,
    notes,
  };
}

function purityWorked(page: UnitInput, metal: "gold" | "silver"): EnglishUnitWorked {
  const entry = registryEntry(page.category, page.unit);
  const factor = entry?.siFactor ?? 1;
  const others = referenceSymbols(page.category, page.unit).slice(0, 2);
  const masses = [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 40, 50, 75, 100, 250, 500];
  const headers = [
    `${page.name} piece`,
    `Pure ${metal} in ${page.name}`,
    ...others.map((symbol) => `${refLabel(page.category, symbol)} matching ${page.name}`),
  ];
  const rows = masses.map((mass) => [
    `${fmt(mass)} g ${page.name}`,
    `${fmt(mass * factor)} g pure ${metal} in ${fmt(mass)} g ${page.name}`,
    ...others.map((symbol) => {
      const equivalent = finitePositive(page.category, mass, page.unit, symbol);
      const label = refLabel(page.category, symbol);
      return equivalent === null ? "—" : `${fmt(equivalent)} g ${label} matches ${fmt(mass)} g ${page.name}`;
    }),
  ]);
  return {
    heading: `${page.name} purity`,
    paragraphs: [
      `${page.name} is ${fmt(factor * 100)}% ${metal} by weight. 10 g of ${page.name} still weighs 10 g and holds ${fmt(10 * factor)} g of pure ${metal}.`,
    ],
    headers,
    rows,
    notes: [
      `The ${page.name} column is the piece on the scale. The pure-${metal} column is the ${metal} inside that piece, not a second weight.`,
    ],
  };
}

export function buildEnglishUnitWorked(page: UnitInput): EnglishUnitWorked {
  if (page.category === "sicaklik") return temperatureWorked(page);
  if (page.category === "altin_ayar") return purityWorked(page, "gold");
  if (page.category === "gumus_ayar") return purityWorked(page, "silver");
  const refs = referenceSymbols(page.category, page.unit);
  if (refs.length === 0) {
    return {
      heading: `${page.name} conversions`,
      paragraphs: [`${page.name} (${page.symbol}) is listed in ${page.category.replaceAll("_", " ")}.`],
      headers: [],
      rows: [],
      notes: [],
    };
  }
  return linearWorked(page, refs);
}

export function englishUnitWorkedPlain(worked: EnglishUnitWorked) {
  return [
    worked.heading,
    ...worked.paragraphs,
    worked.headers.join(" "),
    ...worked.rows.map((row) => row.join(" ")),
    ...worked.notes,
  ]
    .filter(Boolean)
    .join(" ");
}
