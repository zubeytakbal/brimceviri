import {
  convertCurrentFromSI,
  convertPowerToSI,
  convertVoltageToSI,
  inferCurrentUnit,
  type CurrentUnit,
  type PowerUnit,
  type VoltageUnit,
} from "./engineeringCalculatorUnits";
import { parseCalculatorNumber } from "./pressureForceArea";
import { formatUzValue } from "./pressureForceAreaUz";
import type { ElectricalSystemType } from "./kwToAmp";

export type KwToAmpUzInput = {
  powerValue: string;
  powerUnit: PowerUnit;
  voltageValue: string;
  voltageUnit: VoltageUnit;
  powerFactorValue: string;
  efficiencyValue: string;
  systemType: ElectricalSystemType;
};

export type KwToAmpUzResult = {
  error: string | null;
  currentValue: number | null;
  currentDisplay: string;
  currentUnit: CurrentUnit;
  siValue: number | null;
  siUnit: "A";
  formulaDisplay: string;
  apparentPowerValue: number | null;
  apparentPowerDisplay: string;
  apparentPowerUnit: PowerUnit;
  normalizedPowerFactor: number | null;
  normalizedEfficiency: number | null;
};

const ROOT_THREE = Math.sqrt(3);

const messages = {
  missing: "Quvvat va kuchlanish qiymatlarini kiriting.",
  invalid: "To'g'ri raqamli qiymatlar kiriting.",
  powerPositive: "Quvvat noldan katta bo'lishi kerak.",
  voltagePositive: "Kuchlanish noldan katta bo'lishi kerak.",
  powerFactorRange:
    "Quvvat koeffitsienti 0 va 1 orasida yoki 0 va 100 orasidagi foiz qiymati bo'lishi kerak.",
  efficiencyRange:
    "Samaradorlik 0 va 1 orasida yoki 0 va 100 orasidagi foiz qiymati bo'lishi kerak.",
};

function normalizeFactor(value: number | null) {
  if (value === null) {
    return null;
  }

  if (value > 1 && value <= 100) {
    return value / 100;
  }

  return value;
}

function emptyResult(
  error: string,
  normalizedPowerFactor: number | null = null,
  normalizedEfficiency: number | null = null
): KwToAmpUzResult {
  return {
    error,
    currentValue: null,
    currentDisplay: "",
    currentUnit: "A",
    siValue: null,
    siUnit: "A",
    formulaDisplay: "",
    apparentPowerValue: null,
    apparentPowerDisplay: "",
    apparentPowerUnit: "kW",
    normalizedPowerFactor,
    normalizedEfficiency,
  };
}

export function solveKwToAmpUz({
  powerValue,
  powerUnit,
  voltageValue,
  voltageUnit,
  powerFactorValue,
  efficiencyValue,
  systemType,
}: KwToAmpUzInput): KwToAmpUzResult {
  const power = parseCalculatorNumber(powerValue);
  const voltage = parseCalculatorNumber(voltageValue);
  const powerFactor = parseCalculatorNumber(powerFactorValue);
  const efficiency = parseCalculatorNumber(efficiencyValue);
  const rawValues = [powerValue, voltageValue, powerFactorValue, efficiencyValue];
  const parsedValues = [power, voltage, powerFactor, efficiency];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return emptyResult(messages.invalid);
  }

  if (power === null || voltage === null) {
    return emptyResult(messages.missing);
  }

  if (power <= 0) {
    return emptyResult(messages.powerPositive);
  }

  if (voltage <= 0) {
    return emptyResult(messages.voltagePositive);
  }

  const normalizedPowerFactor =
    systemType === "dc" ? 1 : normalizeFactor(powerFactor ?? 1);
  const normalizedEfficiency = normalizeFactor(efficiency ?? 1);

  if (
    normalizedPowerFactor === null ||
    normalizedPowerFactor <= 0 ||
    normalizedPowerFactor > 1
  ) {
    return emptyResult(messages.powerFactorRange);
  }

  if (
    normalizedEfficiency === null ||
    normalizedEfficiency <= 0 ||
    normalizedEfficiency > 1
  ) {
    return emptyResult(messages.efficiencyRange, normalizedPowerFactor, null);
  }

  const powerInWatt = convertPowerToSI(power, powerUnit);
  const voltageInVolt = convertVoltageToSI(voltage, voltageUnit);
  const denominator =
    systemType === "three-phase"
      ? ROOT_THREE * voltageInVolt * normalizedPowerFactor * normalizedEfficiency
      : systemType === "single-phase"
        ? voltageInVolt * normalizedPowerFactor * normalizedEfficiency
        : voltageInVolt * normalizedEfficiency;
  const currentInAmpere = powerInWatt / denominator;
  const resultUnit = inferCurrentUnit(currentInAmpere);
  const resultValue = convertCurrentFromSI(currentInAmpere, resultUnit);
  const apparentPowerInWatt =
    powerInWatt / (normalizedEfficiency * (systemType === "dc" ? 1 : normalizedPowerFactor));

  return {
    error: null,
    currentValue: resultValue,
    currentDisplay: formatUzValue(resultValue),
    currentUnit: resultUnit,
    siValue: currentInAmpere,
    siUnit: "A",
    formulaDisplay:
      systemType === "three-phase"
        ? `I = P / (√3 x V x cos φ x η)\n` +
          `I = ${formatUzValue(power)} ${powerUnit} / (1,732 x ${formatUzValue(voltage)} ${voltageUnit} x ${formatUzValue(normalizedPowerFactor)} x ${formatUzValue(normalizedEfficiency)})\n` +
          `I = ${formatUzValue(resultValue)} ${resultUnit}`
        : systemType === "single-phase"
          ? `I = P / (V x cos φ x η)\n` +
            `I = ${formatUzValue(power)} ${powerUnit} / (${formatUzValue(voltage)} ${voltageUnit} x ${formatUzValue(normalizedPowerFactor)} x ${formatUzValue(normalizedEfficiency)})\n` +
            `I = ${formatUzValue(resultValue)} ${resultUnit}`
          : `I = P / (V x η)\n` +
            `I = ${formatUzValue(power)} ${powerUnit} / (${formatUzValue(voltage)} ${voltageUnit} x ${formatUzValue(normalizedEfficiency)})\n` +
            `I = ${formatUzValue(resultValue)} ${resultUnit}`,
    apparentPowerValue: apparentPowerInWatt / 1000,
    apparentPowerDisplay: formatUzValue(apparentPowerInWatt / 1000),
    apparentPowerUnit: "kW",
    normalizedPowerFactor,
    normalizedEfficiency,
  };
}
