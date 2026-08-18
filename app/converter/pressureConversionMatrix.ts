export const pressureConversionUnits = [
  "Pa",
  "bar",
  "atm",
  "psi",
  "mmHg",
  "kgf/cm²",
] as const;

export type PressureConversionUnitSymbol =
  (typeof pressureConversionUnits)[number];

const pascalValues: Record<PressureConversionUnitSymbol, number> = {
  Pa: 1,
  bar: 100000,
  atm: 101325,
  psi: 6894.757293168,
  mmHg: 133.322387415,
  "kgf/cm²": 98066.5,
};

export type PressureConversionMatrixRow = {
  unit: PressureConversionUnitSymbol;
  values: Record<PressureConversionUnitSymbol, number>;
};

export const pressureConversionMatrix: PressureConversionMatrixRow[] =
  pressureConversionUnits.map((rowUnit) => ({
    unit: rowUnit,
    values: Object.fromEntries(
      pressureConversionUnits.map((colUnit) => [
        colUnit,
        pascalValues[rowUnit] / pascalValues[colUnit],
      ])
    ) as Record<PressureConversionUnitSymbol, number>,
  }));

export function formatPressureFactor(
  value: number,
  locale: "tr" | "en" | "de"
) {
  const localeName =
    locale === "tr" ? "tr-TR" : locale === "de" ? "de-DE" : "en-US";

  return new Intl.NumberFormat(localeName, {
    maximumSignificantDigits: 6,
  }).format(value);
}
