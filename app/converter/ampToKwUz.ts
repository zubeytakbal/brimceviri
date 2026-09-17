import {
  convertCurrentToSI,
  convertPowerFromSI,
  convertVoltageToSI,
  inferPowerUnit,
  type CurrentUnit,
  type PowerUnit,
  type VoltageUnit,
} from "./engineeringCalculatorUnits";
import { parseCalculatorNumber } from "./pressureForceArea";
import { formatUzValue } from "./pressureForceAreaUz";
import type { ElectricalSystemType } from "./ampToKw";

export type AmpToKwUzInput = {
  currentValue: string;
  currentUnit: CurrentUnit;
  voltageValue: string;
  voltageUnit: VoltageUnit;
  powerFactorValue: string;
  efficiencyValue: string;
  systemType: ElectricalSystemType;
};

export type AmpToKwUzResult = {
  error: string | null;
  powerValue: number | null;
  powerDisplay: string;
  powerUnit: PowerUnit;
  siValue: number | null;
  siUnit: "W";
  formulaDisplay: string;
  apparentPowerValue: number | null;
  apparentPowerDisplay: string;
  apparentPowerUnit: PowerUnit;
  normalizedPowerFactor: number | null;
  normalizedEfficiency: number | null;
};

const ROOT_THREE = Math.sqrt(3);

const messages = {
  missing: "Tok va kuchlanish qiymatlarini kiriting.",
  invalid: "To'g'ri raqamli qiymatlar kiriting.",
  currentPositive: "Tok noldan katta bo'lishi kerak.",
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
): AmpToKwUzResult {
  return {
    error,
    powerValue: null,
    powerDisplay: "",
    powerUnit: "kW",
    siValue: null,
    siUnit: "W",
    formulaDisplay: "",
    apparentPowerValue: null,
    apparentPowerDisplay: "",
    apparentPowerUnit: "kW",
    normalizedPowerFactor,
    normalizedEfficiency,
  };
}

export function solveAmpToKwUz({
  currentValue,
  currentUnit,
  voltageValue,
  voltageUnit,
  powerFactorValue,
  efficiencyValue,
  systemType,
}: AmpToKwUzInput): AmpToKwUzResult {
  const current = parseCalculatorNumber(currentValue);
  const voltage = parseCalculatorNumber(voltageValue);
  const powerFactor = parseCalculatorNumber(powerFactorValue);
  const efficiency = parseCalculatorNumber(efficiencyValue);
  const rawValues = [currentValue, voltageValue, powerFactorValue, efficiencyValue];
  const parsedValues = [current, voltage, powerFactor, efficiency];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return emptyResult(messages.invalid);
  }

  if (current === null || voltage === null) {
    return emptyResult(messages.missing);
  }

  if (current <= 0) {
    return emptyResult(messages.currentPositive);
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

  const currentInAmpere = convertCurrentToSI(current, currentUnit);
  const voltageInVolt = convertVoltageToSI(voltage, voltageUnit);
  const apparentPowerInWatt =
    systemType === "three-phase"
      ? ROOT_THREE * voltageInVolt * currentInAmpere
      : voltageInVolt * currentInAmpere;
  const powerInWatt =
    systemType === "dc"
      ? apparentPowerInWatt * normalizedEfficiency
      : apparentPowerInWatt * normalizedPowerFactor * normalizedEfficiency;
  const resultUnit = inferPowerUnit(powerInWatt);
  const resultValue = convertPowerFromSI(powerInWatt, resultUnit);

  return {
    error: null,
    powerValue: resultValue,
    powerDisplay: formatUzValue(resultValue),
    powerUnit: resultUnit,
    siValue: powerInWatt,
    siUnit: "W",
    formulaDisplay:
      systemType === "three-phase"
        ? `P = √3 x V x I x cos φ x η\n` +
          `P = 1,732 x ${formatUzValue(voltage)} ${voltageUnit} x ${formatUzValue(current)} ${currentUnit} x ${formatUzValue(normalizedPowerFactor)} x ${formatUzValue(normalizedEfficiency)}\n` +
          `P = ${formatUzValue(resultValue)} ${resultUnit}`
        : systemType === "single-phase"
          ? `P = V x I x cos φ x η\n` +
            `P = ${formatUzValue(voltage)} ${voltageUnit} x ${formatUzValue(current)} ${currentUnit} x ${formatUzValue(normalizedPowerFactor)} x ${formatUzValue(normalizedEfficiency)}\n` +
            `P = ${formatUzValue(resultValue)} ${resultUnit}`
          : `P = V x I x η\n` +
            `P = ${formatUzValue(voltage)} ${voltageUnit} x ${formatUzValue(current)} ${currentUnit} x ${formatUzValue(normalizedEfficiency)}\n` +
            `P = ${formatUzValue(resultValue)} ${resultUnit}`,
    apparentPowerValue: apparentPowerInWatt / 1000,
    apparentPowerDisplay: formatUzValue(apparentPowerInWatt / 1000),
    apparentPowerUnit: "kW",
    normalizedPowerFactor,
    normalizedEfficiency,
  };
}
