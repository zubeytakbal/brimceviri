// Bengalce çevirme sayfasına çifte özgü örnekler. Sayılar convert() sonucudur.
// Uzun birim adları birçok sayfada ortak olduğu için örnek satırı sembol ve sonuç taşır.
import { convert } from "./convert";
import { unitRegistry } from "./unitRegistry";

export type BengaliConversionInput = {
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
  exampleValues: number[];
};

export type BengaliConversionReading = {
  heading: string;
  paragraphs: string[];
};

const LINEAR_EXTRAS = [2, 3, 4, 7, 8, 15, 40, 75, 250, 500, 1000];
const TEMPERATURE_EXTRAS = [-40, -10, 0, 10, 20, 25, 32, 37, 98.6, 100, 180, 212];

function formatBn(value: number) {
  if (!Number.isFinite(value)) return "";
  if (value !== 0 && (Math.abs(value) >= 1_000_000_000 || Math.abs(value) < 0.000001)) {
    return value.toExponential(8);
  }
  return Number(value.toPrecision(12)).toLocaleString("bn-BD", {
    maximumFractionDigits: 12,
  });
}

function purityOf(category: string, symbol: string) {
  return unitRegistry.find((unit) => unit.category === category && unit.symbol === symbol)?.siFactor;
}

function sameText(left: number, right: number) {
  return formatBn(left) === formatBn(right);
}

function label(name: string, symbol: string) {
  const words = name.split(/\s+/).filter(Boolean);
  return words.length <= 2 ? `${name} (${symbol})` : symbol;
}

function valuesFor(page: BengaliConversionInput) {
  const extras = page.category === "sicaklik" ? TEMPERATURE_EXTRAS : LINEAR_EXTRAS;
  const seen = new Set<string>();
  const values: number[] = [];
  for (const value of [...page.exampleValues, ...extras]) {
    if (!Number.isFinite(value)) continue;
    const result = convert(page.category, value, page.fromUnit, page.toUnit);
    if (!Number.isFinite(result)) continue;
    const key = formatBn(value);
    if (seen.has(key)) continue;
    seen.add(key);
    values.push(value);
    if (values.length >= 16) break;
  }
  return values;
}

function line(page: BengaliConversionInput, value: number, fromUnit: string, toUnit: string) {
  const result = convert(page.category, value, fromUnit, toUnit);
  const back = convert(page.category, result, toUnit, fromUnit);
  if (!Number.isFinite(back)) {
    return `মান ${formatBn(value)} ${fromUnit} হয় ${formatBn(result)} ${toUnit} (${fromUnit} থেকে ${toUnit})`;
  }
  return `মান ${formatBn(value)} ${fromUnit} হয় ${formatBn(result)} ${toUnit} (${fromUnit} থেকে ${toUnit})। উল্টো ${formatBn(result)} ${toUnit} ফেরত দেয় ${formatBn(back)} ${fromUnit}`;
}

function factorSentence(page: BengaliConversionInput, sample: number) {
  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);
  const result = convert(page.category, sample, page.fromUnit, page.toUnit);
  const { fromUnit, toUnit } = page;
  if (factor > 0 && factor < 1) {
    const divisor = 1 / factor;
    if (sameText(sample / divisor, result)) {
      return `${fromUnit} কে ${toUnit} এ নিতে ${formatBn(divisor)} দিয়ে ভাগ করতে হয়। ${formatBn(sample)} ${fromUnit} ÷ ${formatBn(divisor)} = ${formatBn(result)} ${toUnit}।`;
    }
  }
  if (factor >= 1 && sameText(sample * factor, result)) {
    return `${fromUnit} কে ${toUnit} এ নিতে ${formatBn(factor)} দিয়ে গুণ করতে হয়। ${formatBn(sample)} ${fromUnit} × ${formatBn(factor)} = ${formatBn(result)} ${toUnit}।`;
  }
  return `${formatBn(1)} ${fromUnit} = ${formatBn(factor)} ${toUnit}। ${formatBn(sample)} ${fromUnit} = ${formatBn(result)} ${toUnit}।`;
}

function temperatureSentence(page: BengaliConversionInput, values: number[]) {
  const { fromUnit, toUnit, category } = page;
  const anchorText = values
    .slice(0, 3)
    .map((value) => `${formatBn(value)} ${fromUnit} হয় ${formatBn(convert(category, value, fromUnit, toUnit))} ${toUnit}`)
    .join(", ");
  const freezeFrom = convert(category, 0, "C", fromUnit);
  const boilFrom = convert(category, 100, "C", fromUnit);
  const freezeTo = convert(category, 0, "C", toUnit);
  const boilTo = convert(category, 100, "C", toUnit);
  const lines = [
    `${fromUnit} আর ${toUnit} এর মধ্যে একটি গুণক নেই। ${anchorText}।`,
    `পানি জমে ${formatBn(freezeFrom)} ${fromUnit} এ, যা ${formatBn(freezeTo)} ${toUnit}। পানি ফোটে ${formatBn(boilFrom)} ${fromUnit} এ, যা ${formatBn(boilTo)} ${toUnit}।`,
  ];
  const cold = convert(category, -40, fromUnit, toUnit);
  if (sameText(cold, -40)) lines.push(`${formatBn(-40)} ${fromUnit} আর ${formatBn(-40)} ${toUnit} একই মান।`);
  return lines.join(" ");
}

function puritySentence(page: BengaliConversionInput) {
  const { category, fromUnit, toUnit } = page;
  const share = purityOf(category, fromUnit);
  const pure = share === undefined ? NaN : 10 * share;
  const equivalent = convert(category, 10, fromUnit, toUnit);
  return `${fromUnit} বিশুদ্ধতার মাপ, দাঁড়িপাল্লার ওজন নয়। ${formatBn(10)} ${fromUnit} দাঁড়িপাল্লায় ${formatBn(10)} থাকে, খাঁটি ধাতু ${formatBn(pure)} গ্রাম। ${toUnit} এ সমকক্ষ ${formatBn(equivalent)}।`;
}

function dataSentence(page: BengaliConversionInput) {
  const { fromUnit, toUnit, category } = page;
  const fromBytes = convert(category, 1, fromUnit, "B");
  const toBytes = convert(category, 1, toUnit, "B");
  const one = convert(category, 1, fromUnit, toUnit);
  return `${fromUnit} হল ${formatBn(fromBytes)} বাইট, ${toUnit} হল ${formatBn(toBytes)} বাইট। ${formatBn(1)} ${fromUnit} = ${formatBn(one)} ${toUnit}। ব্যবধান ${formatBn(Math.abs(fromBytes - toBytes))} বাইট।`;
}

function energySentence(page: BengaliConversionInput) {
  const { fromUnit, toUnit, category } = page;
  const lines: string[] = [];
  if (fromUnit === "cal" || toUnit === "cal" || fromUnit === "kcal" || toUnit === "kcal") {
    const chemical = convert("enerji", 1, "cal", "J");
    const food = convert("enerji", 1, "kcal", "J");
    lines.push(
      `${fromUnit} থেকে ${toUnit}: রাসায়নিক ক্যালোরি ${formatBn(chemical)} জুল, খাদ্য ক্যালোরি ${formatBn(food)} জুল। ${formatBn(1)} ${fromUnit} = ${formatBn(oneOf(page))} ${toUnit}।`,
    );
  }
  if (fromUnit === "kWh" || toUnit === "kWh") {
    const joule = convert("enerji", 1, "kWh", "J");
    const mega = convert("enerji", 1, "kWh", "MJ");
    lines.push(
      `${fromUnit} থেকে ${toUnit}: এক কিলোওয়াট-ঘণ্টা ${formatBn(joule)} জুল, অর্থাৎ ${formatBn(mega)} মেগাজুল। ${formatBn(1)} ${fromUnit} = ${formatBn(convert(category, 1, fromUnit, toUnit))} ${toUnit}।`,
    );
  }
  return lines.join(" ");
}

function oneOf(page: BengaliConversionInput) {
  return convert(page.category, 1, page.fromUnit, page.toUnit);
}

export function buildBengaliConversionReading(page: BengaliConversionInput): BengaliConversionReading {
  const heading = `হিসাব: ${label(page.fromName, page.fromUnit)} থেকে ${label(page.toName, page.toUnit)}`;
  const one = oneOf(page);
  if (!Number.isFinite(one)) {
    return {
      heading,
      paragraphs: [`${page.fromUnit} আর ${page.toUnit} একই রাশি নয়, তাই এখানে গুণক নেই।`],
    };
  }

  const values = valuesFor(page);
  const sample = values.find((value) => value !== 1) ?? values[0] ?? 1;
  const paragraphs: string[] = [];

  if (page.category === "sicaklik") paragraphs.push(temperatureSentence(page, values));
  else if (page.category === "altin_ayar" || page.category === "gumus_ayar") paragraphs.push(puritySentence(page));
  else paragraphs.push(factorSentence(page, sample));

  if (page.category === "veri") paragraphs.push(dataSentence(page));
  if (page.category === "enerji") {
    const energy = energySentence(page);
    if (energy) paragraphs.push(energy);
  }

  const forward = values.map((value) => line(page, value, page.fromUnit, page.toUnit));
  paragraphs.push(`${forward.slice(0, 7).join("। ")}।`);
  if (forward.length > 7) paragraphs.push(`${forward.slice(7).join("। ")}।`);

  const reversePicks = [values[0], values[Math.floor(values.length / 2)], values[values.length - 1]].filter(
    (value, index, list): value is number => value !== undefined && list.indexOf(value) === index,
  );
  paragraphs.push(`${reversePicks.map((value) => line(page, value, page.toUnit, page.fromUnit)).join("। ")}।`);

  const low = Math.min(...values);
  const high = Math.max(...values);
  if (low !== high) {
    const span = Math.abs(
      convert(page.category, high, page.fromUnit, page.toUnit) - convert(page.category, low, page.fromUnit, page.toUnit),
    );
    paragraphs.push(
      `${formatBn(low)} ${page.fromUnit} থেকে ${formatBn(high)} ${page.fromUnit} পর্যন্ত ফল দাঁড়ায় ${formatBn(span)} ${page.toUnit}।`,
    );
  }

  const forth = convert(page.category, sample, page.fromUnit, page.toUnit);
  const back = convert(page.category, forth, page.toUnit, page.fromUnit);
  if (Number.isFinite(back)) {
    paragraphs.push(`${formatBn(sample)} ${page.fromUnit} হয়ে ${formatBn(forth)} ${page.toUnit}, ফিরে ${formatBn(back)} ${page.fromUnit}।`);
  }

  const doubled = values
    .filter((value) => value !== 0)
    .slice(0, 4)
    .filter((value) =>
      sameText(
        convert(page.category, value * 2, page.fromUnit, page.toUnit),
        convert(page.category, value, page.fromUnit, page.toUnit) * 2,
      ),
    );
  if (doubled.length) {
    paragraphs.push(
      `${doubled
        .map((value) => {
          const once = convert(page.category, value, page.fromUnit, page.toUnit);
          const twice = convert(page.category, value * 2, page.fromUnit, page.toUnit);
          return `দ্বিগুণ ${formatBn(value)} ${page.fromUnit} হল ${formatBn(value * 2)} ${page.fromUnit}, ফল ${formatBn(twice)} ${page.toUnit}, যা ${formatBn(once)} ${page.toUnit} এর দ্বিগুণ`;
        })
        .join("। ")}।`,
    );
  }

  return { heading, paragraphs };
}

export function bengaliConversionReadingPlain(reading: BengaliConversionReading) {
  return [reading.heading, ...reading.paragraphs].join(" ");
}
