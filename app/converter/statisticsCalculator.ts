export interface StatisticsResult {
  values: number[];
  count: number;
  sum: number;
  mean: number;
  median: number;
  modes: number[];
  min: number;
  max: number;
  range: number;
  populationVariance: number;
  populationStdDev: number;
  sampleVariance: number | null;
  sampleStdDev: number | null;
}

export type StatisticsOutcome =
  | { success: true; result: StatisticsResult }
  | { success: false; message: string };

/** Virgul, bosluk, noktali virgul veya yeni satirla ayrilmis sayilari
 * ayristirir. Virgul iki farkli rolde kullanilabildiginden (liste ayiraci
 * "65, 70" ya da Turkce ondalik ayirici "1,5") once bosluk/noktali virgul/
 * yeni satir olup olmadigina bakilir: varsa bunlar asil ayirici kabul
 * edilir ve her token icindeki kalan virgul ondalik noktasi sayilir (orn.
 * "1,5 2,5" -> [1.5, 2.5]); yoksa (tek satirda sadece virgulle ayrilmis
 * bir liste, orn. Excel'den yapistirilan "65,70,70") virgul liste ayirici
 * olarak ele alinir. */
function parseNumberList(raw: string): number[] {
  const trimmed = raw.trim();
  if (!trimmed) {
    return [];
  }

  const hasWhitespaceSeparator = /[\s;]/.test(trimmed);

  const tokens = hasWhitespaceSeparator
    ? trimmed
        .split(/[\s;]+/)
        .map((token) => token.replace(/^,+|,+$/g, ""))
        .map((token) => token.replace(",", "."))
    : trimmed.split(",").map((token) => token.trim());

  return tokens
    .map((token) => token.trim())
    .filter((token) => token !== "")
    .map((token) => Number(token))
    .filter((value) => Number.isFinite(value));
}

export function calculateStatistics(raw: string): StatisticsOutcome {
  const values = parseNumberList(raw);

  if (values.length === 0) {
    return { success: false, message: "En az bir sayı gir." };
  }

  const count = values.length;
  const sum = values.reduce((total, value) => total + value, 0);
  const mean = sum / count;

  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(count / 2);
  const median =
    count % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];

  const frequency = new Map<number, number>();
  for (const value of values) {
    frequency.set(value, (frequency.get(value) ?? 0) + 1);
  }
  const maxFrequency = Math.max(...frequency.values());
  const modes =
    maxFrequency > 1
      ? [...frequency.entries()]
          .filter(([, freq]) => freq === maxFrequency)
          .map(([value]) => value)
          .sort((left, right) => left - right)
      : [];

  const min = sorted[0];
  const max = sorted[count - 1];
  const range = max - min;

  const squaredDiffs = values.map((value) => (value - mean) ** 2);
  const populationVariance =
    squaredDiffs.reduce((total, value) => total + value, 0) / count;
  const populationStdDev = Math.sqrt(populationVariance);

  const sampleVariance =
    count > 1
      ? squaredDiffs.reduce((total, value) => total + value, 0) / (count - 1)
      : null;
  const sampleStdDev = sampleVariance !== null ? Math.sqrt(sampleVariance) : null;

  return {
    success: true,
    result: {
      values,
      count,
      sum,
      mean,
      median,
      modes,
      min,
      max,
      range,
      populationVariance,
      populationStdDev,
      sampleVariance,
      sampleStdDev,
    },
  };
}
