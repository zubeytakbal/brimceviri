import {
  convertCurrentFromSI,
  convertCurrentToSI,
  convertResistanceFromSI,
  convertResistanceToSI,
  convertVoltageFromSI,
  convertVoltageToSI,
  inferCurrentUnit,
  inferResistanceUnit,
  inferVoltageUnit,
  type CurrentUnit,
  type ResistanceUnit,
  type VoltageUnit,
} from "./engineeringCalculatorUnits";
import { parseCalculatorNumber } from "./pressureForceArea";
import type { OhmsLawTarget } from "./ohmsLaw";

export type OhmsLawUzInput = {
  target: OhmsLawTarget;
  voltageValue: string;
  voltageUnit: VoltageUnit;
  currentValue: string;
  currentUnit: CurrentUnit;
  resistanceValue: string;
  resistanceUnit: ResistanceUnit;
};

export type OhmsLawUzResult = {
  error: string | null;
  resultValue: number | null;
  resultDisplay: string;
  resultUnit: string;
  siValue: number | null;
  siUnit: string;
  formulaDisplay: string;
};

const messages = {
  missing: "Hisoblash uchun kerakli ikkita qiymatni kiriting.",
  invalid: "To'g'ri raqamli qiymatlar kiriting.",
  currentNonZero: "Bu hisoblash uchun tok nolga teng bo'lishi mumkin emas.",
  resistanceNonZero:
    "Bu hisoblash uchun qarshilik nolga teng bo'lishi mumkin emas.",
  resistancePositive: "Qarshilik noldan katta bo'lishi kerak.",
};

function formatUzValue(value: number) {
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

function createErrorResult(
  error: string,
  resultUnit: string,
  siUnit: string
): OhmsLawUzResult {
  return {
    error,
    resultValue: null,
    resultDisplay: "",
    resultUnit,
    siValue: null,
    siUnit,
    formulaDisplay: "",
  };
}

export function solveOhmsLawUz({
  target,
  voltageValue,
  voltageUnit,
  currentValue,
  currentUnit,
  resistanceValue,
  resistanceUnit,
}: OhmsLawUzInput): OhmsLawUzResult {
  const voltage = parseCalculatorNumber(voltageValue);
  const current = parseCalculatorNumber(currentValue);
  const resistance = parseCalculatorNumber(resistanceValue);
  const rawValues = [voltageValue, currentValue, resistanceValue];
  const parsedValues = [voltage, current, resistance];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return createErrorResult(messages.invalid, "V", "V");
  }

  if (target === "voltage") {
    if (current === null || resistance === null) {
      return createErrorResult(messages.missing, "V", "V");
    }

    if (resistance <= 0) {
      return createErrorResult(messages.resistancePositive, "V", "V");
    }

    const currentInSI = convertCurrentToSI(current, currentUnit);
    const resistanceInSI = convertResistanceToSI(resistance, resistanceUnit);
    const voltageInSI = currentInSI * resistanceInSI;
    const resultUnit = inferVoltageUnit(voltageInSI);
    const resultValue = convertVoltageFromSI(voltageInSI, resultUnit);

    return {
      error: null,
      resultValue,
      resultDisplay: formatUzValue(resultValue),
      resultUnit,
      siValue: voltageInSI,
      siUnit: "V",
      formulaDisplay:
        `V = I × R\n` +
        `V = ${formatUzValue(current)} ${currentUnit} × ` +
        `${formatUzValue(resistance)} ${resistanceUnit}\n` +
        `V = ${formatUzValue(resultValue)} ${resultUnit}`,
    };
  }

  if (target === "current") {
    if (voltage === null || resistance === null) {
      return createErrorResult(messages.missing, "A", "A");
    }

    if (resistance === 0) {
      return createErrorResult(messages.resistanceNonZero, "A", "A");
    }

    const voltageInSI = convertVoltageToSI(voltage, voltageUnit);
    const resistanceInSI = convertResistanceToSI(resistance, resistanceUnit);
    const currentInSI = voltageInSI / resistanceInSI;
    const resultUnit = inferCurrentUnit(currentInSI);
    const resultValue = convertCurrentFromSI(currentInSI, resultUnit);

    return {
      error: null,
      resultValue,
      resultDisplay: formatUzValue(resultValue),
      resultUnit,
      siValue: currentInSI,
      siUnit: "A",
      formulaDisplay:
        `I = V / R\n` +
        `I = ${formatUzValue(voltage)} ${voltageUnit} / ` +
        `${formatUzValue(resistance)} ${resistanceUnit}\n` +
        `I = ${formatUzValue(resultValue)} ${resultUnit}`,
    };
  }

  if (voltage === null || current === null) {
    return createErrorResult(messages.missing, "Ω", "Ω");
  }

  if (current === 0) {
    return createErrorResult(messages.currentNonZero, "Ω", "Ω");
  }

  const voltageInSI = convertVoltageToSI(voltage, voltageUnit);
  const currentInSI = convertCurrentToSI(current, currentUnit);
  const resistanceInSI = voltageInSI / currentInSI;
  const resultUnit = inferResistanceUnit(resistanceInSI);
  const resultValue = convertResistanceFromSI(resistanceInSI, resultUnit);

  return {
    error: null,
    resultValue,
    resultDisplay: formatUzValue(resultValue),
    resultUnit,
    siValue: resistanceInSI,
    siUnit: "Ω",
    formulaDisplay:
      `R = V / I\n` +
      `R = ${formatUzValue(voltage)} ${voltageUnit} / ` +
      `${formatUzValue(current)} ${currentUnit}\n` +
      `R = ${formatUzValue(resultValue)} ${resultUnit}`,
  };
}

export { formatUzValue };
