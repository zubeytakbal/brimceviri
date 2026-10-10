// Arapça çevirme sayfasına çifte özgü örnekler. Sayılar convert() sonucudur.
// Uzun birim adları birçok sayfada ortak olduğu için örnek satırı sembol ve sonuç taşır.
import { convert } from "./convert";
import { unitRegistry } from "./unitRegistry";

export type ArabicConversionInput = {
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
  exampleValues: number[];
};

export type ArabicConversionReading = {
  heading: string;
  paragraphs: string[];
};

const LINEAR_EXTRAS = [2, 3, 4, 7, 8, 15, 40, 75, 250, 500, 1000];
const TEMPERATURE_EXTRAS = [-40, -10, 0, 10, 20, 25, 32, 37, 98.6, 100, 180, 212];

function formatAr(value: number) {
  if (!Number.isFinite(value)) return "";
  const absoluteValue = Math.abs(value);
  if (absoluteValue !== 0 && (absoluteValue >= 1_000_000_000 || absoluteValue < 0.000001)) {
    return new Intl.NumberFormat("ar", { maximumSignificantDigits: 8, notation: "scientific" }).format(value);
  }
  return new Intl.NumberFormat("ar", { maximumSignificantDigits: 12 }).format(Number(value.toPrecision(12)));
}

function purityOf(category: string, symbol: string) {
  return unitRegistry.find((unit) => unit.category === category && unit.symbol === symbol)?.siFactor;
}

function sameText(left: number, right: number) {
  return formatAr(left) === formatAr(right);
}

function label(name: string, symbol: string) {
  const words = name.split(/\s+/).filter(Boolean);
  return words.length <= 2 ? `${name} (${symbol})` : symbol;
}

function valuesFor(page: ArabicConversionInput) {
  const extras = page.category === "sicaklik" ? TEMPERATURE_EXTRAS : LINEAR_EXTRAS;
  const seen = new Set<string>();
  const values: number[] = [];
  for (const value of [...page.exampleValues, ...extras]) {
    if (!Number.isFinite(value)) continue;
    const result = convert(page.category, value, page.fromUnit, page.toUnit);
    if (!Number.isFinite(result)) continue;
    const key = formatAr(value);
    if (seen.has(key)) continue;
    seen.add(key);
    values.push(value);
    if (values.length >= 16) break;
  }
  return values;
}

function line(page: ArabicConversionInput, value: number, fromUnit: string, toUnit: string) {
  const result = convert(page.category, value, fromUnit, toUnit);
  const back = convert(page.category, result, toUnit, fromUnit);
  return `القيمة ${formatAr(value)} ${fromUnit} تقابل ${formatAr(result)} ${toUnit} (${fromUnit} إلى ${toUnit}). عكس ${formatAr(result)} ${toUnit} يعيد ${formatAr(back)} ${fromUnit}`;
}

function factorSentence(page: ArabicConversionInput, sample: number) {
  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);
  const result = convert(page.category, sample, page.fromUnit, page.toUnit);
  const { fromUnit, toUnit } = page;
  if (factor > 0 && factor < 1) {
    const divisor = 1 / factor;
    if (sameText(sample / divisor, result)) {
      return `${fromUnit} إلى ${toUnit} يُقسم على ${formatAr(divisor)}. ${formatAr(sample)} ${fromUnit} ÷ ${formatAr(divisor)} يساوي ${formatAr(result)} ${toUnit}.`;
    }
  }
  if (factor >= 1 && sameText(sample * factor, result)) {
    return `${fromUnit} إلى ${toUnit} يُضرب في ${formatAr(factor)}. ${formatAr(sample)} ${fromUnit} × ${formatAr(factor)} يساوي ${formatAr(result)} ${toUnit}.`;
  }
  return `${formatAr(1)} ${fromUnit} يساوي ${formatAr(factor)} ${toUnit}. ${formatAr(sample)} ${fromUnit} يساوي ${formatAr(result)} ${toUnit}.`;
}

function temperatureSentence(page: ArabicConversionInput, values: number[]) {
  const { fromUnit, toUnit, category } = page;
  const anchors = values.slice(0, 3);
  const anchorText = anchors
    .map((value) => `${formatAr(value)} ${fromUnit} يساوي ${formatAr(convert(category, value, fromUnit, toUnit))} ${toUnit}`)
    .join("، و");
  const freezeFrom = convert(category, 0, "C", fromUnit);
  const boilFrom = convert(category, 100, "C", fromUnit);
  const freezeTo = convert(category, 0, "C", toUnit);
  const boilTo = convert(category, 100, "C", toUnit);
  const lines = [
    `لا يوجد معامل ضرب واحد بين ${fromUnit} و${toUnit}. ${anchorText}.`,
    `تجمد الماء ${formatAr(freezeFrom)} ${fromUnit} ويُكتب ${formatAr(freezeTo)} ${toUnit}. غليان الماء ${formatAr(boilFrom)} ${fromUnit} ويُكتب ${formatAr(boilTo)} ${toUnit}.`,
  ];
  const cold = convert(category, -40, fromUnit, toUnit);
  if (sameText(cold, -40)) lines.push(`عند ${formatAr(-40)} يتساوى ${fromUnit} مع ${toUnit}.`);
  return lines.join(" ");
}

function puritySentence(page: ArabicConversionInput) {
  const { category, fromUnit, toUnit } = page;
  const share = purityOf(category, fromUnit);
  const pure = share === undefined ? NaN : 10 * share;
  const equivalent = convert(category, 10, fromUnit, toUnit);
  return `${fromUnit} يصف النقاء لا وزن الميزان. ${formatAr(10)} ${fromUnit} تبقى ${formatAr(10)} ${fromUnit} على الميزان وفيها ${formatAr(pure)} غراماً خالصاً. المقابل من ${toUnit} هو ${formatAr(equivalent)}.`;
}

function dataSentence(page: ArabicConversionInput) {
  const { fromUnit, toUnit, category } = page;
  const fromBytes = convert(category, 1, fromUnit, "B");
  const toBytes = convert(category, 1, toUnit, "B");
  const one = convert(category, 1, fromUnit, toUnit);
  return `${fromUnit} يساوي ${formatAr(fromBytes)} بايت، و${toUnit} يساوي ${formatAr(toBytes)} بايت. ${formatAr(1)} ${fromUnit} يساوي ${formatAr(one)} ${toUnit}. الفرق ${formatAr(Math.abs(fromBytes - toBytes))} بايت.`;
}

function energySentence(page: ArabicConversionInput) {
  const { fromUnit, toUnit, category } = page;
  const lines: string[] = [];
  if (fromUnit === "cal" || toUnit === "cal" || fromUnit === "kcal" || toUnit === "kcal") {
    const chemical = convert("enerji", 1, "cal", "J");
    const food = convert("enerji", 1, "kcal", "J");
    lines.push(
      `${fromUnit} إلى ${toUnit}: السعرة الكيميائية ${formatAr(chemical)} جول، والسعرة الغذائية ${formatAr(food)} جول. ${formatAr(1)} ${fromUnit} يساوي ${formatAr(convert(category, 1, fromUnit, toUnit))} ${toUnit}.`,
    );
  }
  if (fromUnit === "kWh" || toUnit === "kWh") {
    const joule = convert("enerji", 1, "kWh", "J");
    const mega = convert("enerji", 1, "kWh", "MJ");
    lines.push(
      `${fromUnit} إلى ${toUnit}: كيلوواط-ساعة يساوي ${formatAr(joule)} جول، أي ${formatAr(mega)} ميغاجول. ${formatAr(1)} ${fromUnit} يساوي ${formatAr(convert(category, 1, fromUnit, toUnit))} ${toUnit}.`,
    );
  }
  return lines.join(" ");
}

export function buildArabicConversionReading(page: ArabicConversionInput): ArabicConversionReading {
  const heading = `حسابات ${label(page.fromName, page.fromUnit)} إلى ${label(page.toName, page.toUnit)}`;
  const one = convert(page.category, 1, page.fromUnit, page.toUnit);
  if (!Number.isFinite(one)) {
    return {
      heading,
      paragraphs: [`${page.fromUnit} و${page.toUnit} ليستا الكمية نفسها، ولا يُضرب أحدهما في الآخر هنا.`],
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
  paragraphs.push(`${forward.slice(0, 7).join(". ")}.`);
  if (forward.length > 7) paragraphs.push(`${forward.slice(7).join(". ")}.`);

  const reversePicks = [values[0], values[Math.floor(values.length / 2)], values[values.length - 1]].filter(
    (value, index, list): value is number => value !== undefined && list.indexOf(value) === index,
  );
  paragraphs.push(`${reversePicks.map((value) => line(page, value, page.toUnit, page.fromUnit)).join(". ")}.`);

  const low = Math.min(...values);
  const high = Math.max(...values);
  if (low !== high) {
    const span = Math.abs(
      convert(page.category, high, page.fromUnit, page.toUnit) - convert(page.category, low, page.fromUnit, page.toUnit),
    );
    paragraphs.push(`من ${formatAr(low)} ${page.fromUnit} إلى ${formatAr(high)} ${page.fromUnit} يمتد الناتج ${formatAr(span)} ${page.toUnit}.`);
  }

  const forth = convert(page.category, sample, page.fromUnit, page.toUnit);
  const back = convert(page.category, forth, page.toUnit, page.fromUnit);
  if (Number.isFinite(back)) {
    paragraphs.push(`${formatAr(sample)} ${page.fromUnit} إلى ${formatAr(forth)} ${page.toUnit} ثم ${formatAr(back)} ${page.fromUnit}.`);
  }

  const scales = values.filter((value) => value !== 0).slice(0, 4);
  const doubled = scales.filter((value) =>
    sameText(convert(page.category, value * 2, page.fromUnit, page.toUnit), convert(page.category, value, page.fromUnit, page.toUnit) * 2),
  );
  if (doubled.length) {
    paragraphs.push(
      doubled
        .map((value) => {
          const once = convert(page.category, value, page.fromUnit, page.toUnit);
          const twice = convert(page.category, value * 2, page.fromUnit, page.toUnit);
          return `ضعف ${formatAr(value)} ${page.fromUnit} هو ${formatAr(value * 2)} ${page.fromUnit} ويقابل ${formatAr(twice)} ${page.toUnit}، أي ضعف ${formatAr(once)} ${page.toUnit}`;
        })
        .join(". ") + ".",
    );
  }

  return { heading, paragraphs };
}

export function arabicConversionReadingPlain(reading: ArabicConversionReading) {
  return [reading.heading, ...reading.paragraphs].join(" ");
}
