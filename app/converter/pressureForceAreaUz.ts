import {
  convertAreaFromSI,
  convertAreaToSI,
  convertForceFromSI,
  convertForceToSI,
  convertPressureFromSI,
  convertPressureToSI,
  inferAreaUnit,
  inferForceUnit,
  inferPressureUnit,
  type AreaUnit,
  type ForceUnit,
  type PressureUnit,
} from "./engineeringUnits";
import { parseCalculatorNumber } from "./pressureForceArea";

export type CalculationTargetUz = "pressure" | "force" | "area";

export type PressureForceAreaUzInput = {
  target: CalculationTargetUz;
  pressureValue: string;
  pressureUnit: PressureUnit;
  forceValue: string;
  forceUnit: ForceUnit;
  areaValue: string;
  areaUnit: AreaUnit;
};

export type PressureForceAreaUzResult = {
  error: string | null;
  resultValue: number | null;
  resultDisplay: string;
  resultUnit: PressureUnit | ForceUnit | AreaUnit;
  compositeValue: number | null;
  compositeDisplay: string;
  compositeUnit: string;
  formulaDisplay: string;
  siValue: number | null;
  siValueDisplay: string;
  siUnit: "Pa" | "N" | "m²";
};

const messages = {
  missing: "Hisoblash uchun kerakli ikkita qiymatni kiriting.",
  invalid: "To'g'ri raqamli qiymatlar kiriting.",
  areaPositive: "Maydon noldan katta bo'lishi kerak.",
  pressureNonZero: "Maydonni hisoblashda bosim nolga teng bo'lishi mumkin emas.",
  areaResult: "Bu qiymatlar manfiy yoki noaniq maydon hosil qiladi.",
};

export function formatUzValue(value: number) {
  if (!Number.isFinite(value)) {
    return "";
  }

  if (
    value !== 0 &&
    (Math.abs(value) >= 1e12 || Math.abs(value) < 0.000001)
  ) {
    return value.toExponential(10);
  }

  return Number(value.toPrecision(12)).toLocaleString("uz-UZ", {
    maximumFractionDigits: 12,
  });
}

function getPressureCompositeUnit(forceUnit: ForceUnit, areaUnit: AreaUnit) {
  return `${forceUnit}/${areaUnit}`;
}

function getForceCompositeUnit(pressureUnit: PressureUnit, areaUnit: AreaUnit) {
  return `${pressureUnit}·${areaUnit}`;
}

function getAreaCompositeUnit(forceUnit: ForceUnit, pressureUnit: PressureUnit) {
  return `${forceUnit}/${pressureUnit}`;
}

type QuantitySymbols = {
  resultUnit: PressureUnit | ForceUnit | AreaUnit;
  compositeUnit: string;
  siUnit: "Pa" | "N" | "m²";
};

function createEmptyResult(
  error: string,
  symbols: QuantitySymbols
): PressureForceAreaUzResult {
  return {
    error,
    resultValue: null,
    resultDisplay: "",
    resultUnit: symbols.resultUnit,
    compositeValue: null,
    compositeDisplay: "",
    compositeUnit: symbols.compositeUnit,
    formulaDisplay: "",
    siValue: null,
    siValueDisplay: "",
    siUnit: symbols.siUnit,
  };
}

export function solvePressureForceAreaUz({
  target,
  pressureValue,
  pressureUnit,
  forceValue,
  forceUnit,
  areaValue,
  areaUnit,
}: PressureForceAreaUzInput): PressureForceAreaUzResult {
  const pressure = parseCalculatorNumber(pressureValue);
  const force = parseCalculatorNumber(forceValue);
  const area = parseCalculatorNumber(areaValue);
  const rawValues = [pressureValue, forceValue, areaValue];
  const parsedValues = [pressure, force, area];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return createEmptyResult(messages.invalid, {
      resultUnit: target === "pressure" ? "Pa" : target === "force" ? "N" : "m²",
      compositeUnit:
        target === "pressure"
          ? getPressureCompositeUnit(forceUnit, areaUnit)
          : target === "force"
            ? getForceCompositeUnit(pressureUnit, areaUnit)
            : getAreaCompositeUnit(forceUnit, pressureUnit),
      siUnit: target === "pressure" ? "Pa" : target === "force" ? "N" : "m²",
    });
  }

  if (target === "pressure") {
    if (force === null || area === null) {
      return createEmptyResult(messages.missing, {
        resultUnit: "Pa",
        compositeUnit: getPressureCompositeUnit(forceUnit, areaUnit),
        siUnit: "Pa",
      });
    }

    const forceInN = convertForceToSI(force, forceUnit);
    const areaInM2 = convertAreaToSI(area, areaUnit);

    if (areaInM2 <= 0) {
      return createEmptyResult(messages.areaPositive, {
        resultUnit: "Pa",
        compositeUnit: getPressureCompositeUnit(forceUnit, areaUnit),
        siUnit: "Pa",
      });
    }

    const pressureInPa = forceInN / areaInM2;
    const resultUnit = inferPressureUnit(forceUnit, areaUnit, pressureInPa);
    const resultValue = convertPressureFromSI(pressureInPa, resultUnit);
    const compositeUnit = getPressureCompositeUnit(forceUnit, areaUnit);
    const compositeValue = pressureInPa / (convertForceToSI(1, forceUnit) / convertAreaToSI(1, areaUnit));

    return {
      error: null,
      resultValue,
      resultDisplay: formatUzValue(resultValue),
      resultUnit,
      compositeValue,
      compositeDisplay: formatUzValue(compositeValue),
      compositeUnit,
      formulaDisplay:
        `P = F / A\n` +
        `P = ${formatUzValue(force)} ${forceUnit} / ${formatUzValue(area)} ${areaUnit}\n` +
        `P = ${formatUzValue(compositeValue)} ${compositeUnit}\n` +
        `P = ${formatUzValue(resultValue)} ${resultUnit}`,
      siValue: pressureInPa,
      siValueDisplay: formatUzValue(pressureInPa),
      siUnit: "Pa",
    };
  }

  if (target === "force") {
    if (pressure === null || area === null) {
      return createEmptyResult(messages.missing, {
        resultUnit: "N",
        compositeUnit: getForceCompositeUnit(pressureUnit, areaUnit),
        siUnit: "N",
      });
    }

    const pressureInPa = convertPressureToSI(pressure, pressureUnit);
    const areaInM2 = convertAreaToSI(area, areaUnit);

    if (areaInM2 <= 0) {
      return createEmptyResult(messages.areaPositive, {
        resultUnit: "N",
        compositeUnit: getForceCompositeUnit(pressureUnit, areaUnit),
        siUnit: "N",
      });
    }

    const forceInN = pressureInPa * areaInM2;
    const resultUnit = inferForceUnit(pressureUnit, areaUnit, forceInN);
    const resultValue = convertForceFromSI(forceInN, resultUnit);
    const compositeUnit = getForceCompositeUnit(pressureUnit, areaUnit);
    const compositeValue = forceInN / (convertPressureToSI(1, pressureUnit) * convertAreaToSI(1, areaUnit));

    return {
      error: null,
      resultValue,
      resultDisplay: formatUzValue(resultValue),
      resultUnit,
      compositeValue,
      compositeDisplay: formatUzValue(compositeValue),
      compositeUnit,
      formulaDisplay:
        `F = P × A\n` +
        `F = ${formatUzValue(pressure)} ${pressureUnit} × ${formatUzValue(area)} ${areaUnit}\n` +
        `F = ${formatUzValue(compositeValue)} ${compositeUnit}\n` +
        `F = ${formatUzValue(resultValue)} ${resultUnit}`,
      siValue: forceInN,
      siValueDisplay: formatUzValue(forceInN),
      siUnit: "N",
    };
  }

  if (force === null || pressure === null) {
    return createEmptyResult(messages.missing, {
      resultUnit: "m²",
      compositeUnit: getAreaCompositeUnit(forceUnit, pressureUnit),
      siUnit: "m²",
    });
  }

  const forceInN = convertForceToSI(force, forceUnit);
  const pressureInPa = convertPressureToSI(pressure, pressureUnit);

  if (pressureInPa === 0) {
    return createEmptyResult(messages.pressureNonZero, {
      resultUnit: "m²",
      compositeUnit: getAreaCompositeUnit(forceUnit, pressureUnit),
      siUnit: "m²",
    });
  }

  const areaInM2 = forceInN / pressureInPa;

  if (areaInM2 <= 0) {
    return createEmptyResult(messages.areaResult, {
      resultUnit: "m²",
      compositeUnit: getAreaCompositeUnit(forceUnit, pressureUnit),
      siUnit: "m²",
    });
  }

  const resultUnit = inferAreaUnit(forceUnit, pressureUnit, areaInM2);
  const resultValue = convertAreaFromSI(areaInM2, resultUnit);
  const compositeUnit = getAreaCompositeUnit(forceUnit, pressureUnit);
  const compositeValue = areaInM2 / (convertForceToSI(1, forceUnit) / convertPressureToSI(1, pressureUnit));

  return {
    error: null,
    resultValue,
    resultDisplay: formatUzValue(resultValue),
    resultUnit,
    compositeValue,
    compositeDisplay: formatUzValue(compositeValue),
    compositeUnit,
    formulaDisplay:
      `A = F / P\n` +
      `A = ${formatUzValue(force)} ${forceUnit} / ${formatUzValue(pressure)} ${pressureUnit}\n` +
      `A = ${formatUzValue(compositeValue)} ${compositeUnit}\n` +
      `A = ${formatUzValue(resultValue)} ${resultUnit}`,
    siValue: areaInM2,
    siValueDisplay: formatUzValue(areaInM2),
    siUnit: "m²",
  };
}
