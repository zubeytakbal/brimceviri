// İspanyolca çevirme sayfasına çifte özgü örnekler. Sayılar convert() sonucudur.
// Uzun birim adları birçok sayfada ortak olduğu için örnek satırı sembol ve sonuç taşır.
import { convert } from "./convert";
import { unitRegistry } from "./unitRegistry";

export type SpanishConversionInput = {
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
  exampleValues: number[];
};

export type SpanishConversionReading = {
  heading: string;
  paragraphs: string[];
};

const LINEAR_EXTRAS = [2, 3, 4, 7, 8, 15, 40, 75, 250, 500, 1000];
const TEMPERATURE_EXTRAS = [-40, -10, 0, 10, 20, 25, 32, 37, 98.6, 100, 180, 212];

function formatEs(value: number) {
  if (!Number.isFinite(value)) return "";
  if (value !== 0 && (Math.abs(value) >= 1_000_000_000 || Math.abs(value) < 0.000001)) {
    return value.toExponential(8);
  }
  return Number(value.toPrecision(12)).toLocaleString("es-ES", {
    maximumFractionDigits: 12,
  });
}

function purityOf(category: string, symbol: string) {
  return unitRegistry.find((unit) => unit.category === category && unit.symbol === symbol)?.siFactor;
}

function sameText(left: number, right: number) {
  return formatEs(left) === formatEs(right);
}

function label(name: string, symbol: string) {
  const words = name.split(/\s+/).filter(Boolean);
  return words.length <= 2 ? `${name} (${symbol})` : symbol;
}

function valuesFor(page: SpanishConversionInput) {
  const extras = page.category === "sicaklik" ? TEMPERATURE_EXTRAS : LINEAR_EXTRAS;
  const seen = new Set<string>();
  const values: number[] = [];
  for (const value of [...page.exampleValues, ...extras]) {
    if (!Number.isFinite(value)) continue;
    const result = convert(page.category, value, page.fromUnit, page.toUnit);
    if (!Number.isFinite(result)) continue;
    const key = formatEs(value);
    if (seen.has(key)) continue;
    seen.add(key);
    values.push(value);
    if (values.length >= 16) break;
  }
  return values;
}

function line(page: SpanishConversionInput, value: number, fromUnit: string, toUnit: string) {
  const result = convert(page.category, value, fromUnit, toUnit);
  const back = convert(page.category, result, toUnit, fromUnit);
  if (!Number.isFinite(back)) {
    return `El valor ${formatEs(value)} ${fromUnit} equivale a ${formatEs(result)} ${toUnit} (${fromUnit} a ${toUnit})`;
  }
  return `El valor ${formatEs(value)} ${fromUnit} equivale a ${formatEs(result)} ${toUnit} (${fromUnit} a ${toUnit}). Al revés, ${formatEs(result)} ${toUnit} devuelve ${formatEs(back)} ${fromUnit}`;
}

function factorSentence(page: SpanishConversionInput, sample: number) {
  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);
  const result = convert(page.category, sample, page.fromUnit, page.toUnit);
  const { fromUnit, toUnit } = page;
  if (factor > 0 && factor < 1) {
    const divisor = 1 / factor;
    if (sameText(sample / divisor, result)) {
      return `${fromUnit} a ${toUnit} se divide entre ${formatEs(divisor)}. ${formatEs(sample)} ${fromUnit} ÷ ${formatEs(divisor)} = ${formatEs(result)} ${toUnit}.`;
    }
  }
  if (factor >= 1 && sameText(sample * factor, result)) {
    return `${fromUnit} a ${toUnit} se multiplica por ${formatEs(factor)}. ${formatEs(sample)} ${fromUnit} × ${formatEs(factor)} = ${formatEs(result)} ${toUnit}.`;
  }
  return `${formatEs(1)} ${fromUnit} = ${formatEs(factor)} ${toUnit}. ${formatEs(sample)} ${fromUnit} = ${formatEs(result)} ${toUnit}.`;
}

function temperatureSentence(page: SpanishConversionInput, values: number[]) {
  const { fromUnit, toUnit, category } = page;
  const anchorText = values
    .slice(0, 3)
    .map((value) => `${formatEs(value)} ${fromUnit} equivale a ${formatEs(convert(category, value, fromUnit, toUnit))} ${toUnit}`)
    .join(", ");
  const freezeFrom = convert(category, 0, "C", fromUnit);
  const boilFrom = convert(category, 100, "C", fromUnit);
  const freezeTo = convert(category, 0, "C", toUnit);
  const boilTo = convert(category, 100, "C", toUnit);
  const lines = [
    `No hay un solo factor entre ${fromUnit} y ${toUnit}. ${anchorText}.`,
    `El agua se congela a ${formatEs(freezeFrom)} ${fromUnit}, que se escribe ${formatEs(freezeTo)} ${toUnit}. El agua hierve a ${formatEs(boilFrom)} ${fromUnit}, que se escribe ${formatEs(boilTo)} ${toUnit}.`,
  ];
  const cold = convert(category, -40, fromUnit, toUnit);
  if (sameText(cold, -40)) lines.push(`${formatEs(-40)} ${fromUnit} y ${formatEs(-40)} ${toUnit} son el mismo valor.`);
  return lines.join(" ");
}

function puritySentence(page: SpanishConversionInput) {
  const { category, fromUnit, toUnit } = page;
  const share = purityOf(category, fromUnit);
  const pure = share === undefined ? NaN : 10 * share;
  const equivalent = convert(category, 10, fromUnit, toUnit);
  return `${fromUnit} mide la pureza, no el peso en la balanza. ${formatEs(10)} ${fromUnit} siguen pesando ${formatEs(10)} y contienen ${formatEs(pure)} gramos de metal puro. El equivalente en ${toUnit} es ${formatEs(equivalent)}.`;
}

function dataSentence(page: SpanishConversionInput) {
  const { fromUnit, toUnit, category } = page;
  const fromBytes = convert(category, 1, fromUnit, "B");
  const toBytes = convert(category, 1, toUnit, "B");
  const one = convert(category, 1, fromUnit, toUnit);
  return `${fromUnit} son ${formatEs(fromBytes)} bytes y ${toUnit} son ${formatEs(toBytes)} bytes. ${formatEs(1)} ${fromUnit} = ${formatEs(one)} ${toUnit}. La diferencia es ${formatEs(Math.abs(fromBytes - toBytes))} bytes.`;
}

function energySentence(page: SpanishConversionInput) {
  const { fromUnit, toUnit, category } = page;
  const lines: string[] = [];
  if (fromUnit === "cal" || toUnit === "cal" || fromUnit === "kcal" || toUnit === "kcal") {
    const chemical = convert("enerji", 1, "cal", "J");
    const food = convert("enerji", 1, "kcal", "J");
    lines.push(
      `${fromUnit} a ${toUnit}: la caloría termoquímica vale ${formatEs(chemical)} julios y la caloría alimentaria vale ${formatEs(food)} julios. ${formatEs(1)} ${fromUnit} = ${formatEs(convert(category, 1, fromUnit, toUnit))} ${toUnit}.`,
    );
  }
  if (fromUnit === "kWh" || toUnit === "kWh") {
    const joule = convert("enerji", 1, "kWh", "J");
    const mega = convert("enerji", 1, "kWh", "MJ");
    lines.push(
      `${fromUnit} a ${toUnit}: un kilovatio-hora son ${formatEs(joule)} julios, es decir ${formatEs(mega)} megajulios. ${formatEs(1)} ${fromUnit} = ${formatEs(convert(category, 1, fromUnit, toUnit))} ${toUnit}.`,
    );
  }
  return lines.join(" ");
}

function labSentence(page: SpanishConversionInput) {
  const one = convert(page.category, 1, page.fromUnit, page.toUnit);
  return `${page.fromUnit} a ${page.toUnit} solo convierte el número: ${formatEs(1)} ${page.fromUnit} = ${formatEs(one)} ${page.toUnit}. No interpreta un análisis.`;
}

export function buildSpanishConversionReading(page: SpanishConversionInput): SpanishConversionReading {
  const heading = `Cálculo de ${label(page.fromName, page.fromUnit)} a ${label(page.toName, page.toUnit)}`;
  const one = convert(page.category, 1, page.fromUnit, page.toUnit);
  if (!Number.isFinite(one)) {
    return {
      heading,
      paragraphs: [`${page.fromUnit} y ${page.toUnit} no son la misma magnitud, así que aquí no hay factor.`],
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
  if (page.category === "kan_sekeri" || page.category === "vitamin_d") paragraphs.push(labSentence(page));

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
    paragraphs.push(
      `De ${formatEs(low)} ${page.fromUnit} a ${formatEs(high)} ${page.fromUnit} el resultado abarca ${formatEs(span)} ${page.toUnit}.`,
    );
  }

  const forth = convert(page.category, sample, page.fromUnit, page.toUnit);
  const back = convert(page.category, forth, page.toUnit, page.fromUnit);
  if (Number.isFinite(back)) {
    paragraphs.push(
      `${formatEs(sample)} ${page.fromUnit} pasa a ${formatEs(forth)} ${page.toUnit} y vuelve a ${formatEs(back)} ${page.fromUnit}.`,
    );
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
          return `El doble de ${formatEs(value)} ${page.fromUnit} es ${formatEs(value * 2)} ${page.fromUnit} y da ${formatEs(twice)} ${page.toUnit}, el doble de ${formatEs(once)} ${page.toUnit}`;
        })
        .join(". ")}.`,
    );
  }

  return { heading, paragraphs };
}

export function spanishConversionReadingPlain(reading: SpanishConversionReading) {
  return [reading.heading, ...reading.paragraphs].join(" ");
}
