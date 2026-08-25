import {
  convertCurrentFromSI,
  convertPowerToSI,
  convertVoltageToSI,
  inferCurrentUnit,
  type CurrentUnit,
  type PowerUnit,
  type VoltageUnit,
} from "./engineeringCalculatorUnits";
import {
  formatEngineeringValue,
  parseCalculatorNumber,
  type CalculatorLocale,
} from "./pressureForceArea";

export type MotorPhaseType = "single-phase" | "three-phase";

export type MotorCurrentInput = {
  powerValue: string;
  powerUnit: PowerUnit;
  voltageValue: string;
  voltageUnit: VoltageUnit;
  powerFactorValue: string;
  efficiencyValue: string;
  marginValue: string;
  phaseType: MotorPhaseType;
  locale: CalculatorLocale;
};

export type MotorCurrentResult = {
  error: string | null;
  flaValue: number | null;
  flaDisplay: string;
  flaUnit: CurrentUnit;
  designValue: number | null;
  designDisplay: string;
  designUnit: CurrentUnit;
  siValue: number | null;
  siUnit: "A";
  formulaDisplay: string;
  normalizedPowerFactor: number | null;
  normalizedEfficiency: number | null;
  normalizedMargin: number | null;
};

const ROOT_THREE = Math.sqrt(3);

const messages = {
  tr: {
    missing: "Motor gucu ve gerilim degerlerini girin.",
    invalid: "Gecerli sayisal degerler girin.",
    powerPositive: "Motor gucu sifirdan buyuk olmalidir.",
    voltagePositive: "Gerilim sifirdan buyuk olmalidir.",
    powerFactorRange:
      "Guc faktoru 0 ile 1 arasinda veya 0 ile 100 arasinda bir yuzde degeri olmalidir.",
    efficiencyRange:
      "Verim 0 ile 1 arasinda veya 0 ile 100 arasinda bir yuzde degeri olmalidir.",
    marginRange: "Emniyet payi 0 ile 100 arasinda bir yuzde olmalidir.",
  },
  en: {
    missing: "Enter the motor power and voltage values.",
    invalid: "Enter valid numeric values.",
    powerPositive: "Motor power must be greater than zero.",
    voltagePositive: "Voltage must be greater than zero.",
    powerFactorRange:
      "Power factor must be between 0 and 1, or entered as a percentage between 0 and 100.",
    efficiencyRange:
      "Efficiency must be between 0 and 1, or entered as a percentage between 0 and 100.",
    marginRange: "Design margin must be a percentage between 0 and 100.",
  },
  de: {
    missing: "Geben Sie Motorleistung und Spannung ein.",
    invalid: "Geben Sie gultige Zahlenwerte ein.",
    powerPositive: "Die Motorleistung muss grosser als null sein.",
    voltagePositive: "Die Spannung muss grosser als null sein.",
    powerFactorRange:
      "Der Leistungsfaktor muss zwischen 0 und 1 liegen oder als Prozentwert zwischen 0 und 100 eingegeben werden.",
    efficiencyRange:
      "Der Wirkungsgrad muss zwischen 0 und 1 liegen oder als Prozentwert zwischen 0 und 100 eingegeben werden.",
    marginRange: "Die Reserve muss ein Prozentwert zwischen 0 und 100 sein.",
  },
} as const;

function normalizeFactor(value: number | null) {
  if (value === null) {
    return null;
  }

  if (value > 1 && value <= 100) {
    return value / 100;
  }

  return value;
}

function formatFactor(value: number, locale: CalculatorLocale) {
  return formatEngineeringValue(value, locale);
}

function emptyResult(
  error: string,
  normalizedPowerFactor: number | null = null,
  normalizedEfficiency: number | null = null,
  normalizedMargin: number | null = null
): MotorCurrentResult {
  return {
    error,
    flaValue: null,
    flaDisplay: "",
    flaUnit: "A",
    designValue: null,
    designDisplay: "",
    designUnit: "A",
    siValue: null,
    siUnit: "A",
    formulaDisplay: "",
    normalizedPowerFactor,
    normalizedEfficiency,
    normalizedMargin,
  };
}

export function solveMotorCurrent({
  powerValue,
  powerUnit,
  voltageValue,
  voltageUnit,
  powerFactorValue,
  efficiencyValue,
  marginValue,
  phaseType,
  locale,
}: MotorCurrentInput): MotorCurrentResult {
  const strings = messages[locale];
  const power = parseCalculatorNumber(powerValue);
  const voltage = parseCalculatorNumber(voltageValue);
  const powerFactor = parseCalculatorNumber(powerFactorValue);
  const efficiency = parseCalculatorNumber(efficiencyValue);
  const margin = parseCalculatorNumber(marginValue);
  const rawValues = [
    powerValue,
    voltageValue,
    powerFactorValue,
    efficiencyValue,
    marginValue,
  ];
  const parsedValues = [power, voltage, powerFactor, efficiency, margin];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return emptyResult(strings.invalid);
  }

  if (power === null || voltage === null) {
    return emptyResult(strings.missing);
  }

  if (power <= 0) {
    return emptyResult(strings.powerPositive);
  }

  if (voltage <= 0) {
    return emptyResult(strings.voltagePositive);
  }

  const normalizedPowerFactor = normalizeFactor(powerFactor ?? 1);
  const normalizedEfficiency = normalizeFactor(efficiency ?? 1);
  const normalizedMargin = normalizeFactor(margin ?? 0);

  if (
    normalizedPowerFactor === null ||
    normalizedPowerFactor <= 0 ||
    normalizedPowerFactor > 1
  ) {
    return emptyResult(strings.powerFactorRange);
  }

  if (
    normalizedEfficiency === null ||
    normalizedEfficiency <= 0 ||
    normalizedEfficiency > 1
  ) {
    return emptyResult(
      strings.efficiencyRange,
      normalizedPowerFactor,
      null
    );
  }

  if (
    normalizedMargin === null ||
    normalizedMargin < 0 ||
    normalizedMargin > 1
  ) {
    return emptyResult(
      strings.marginRange,
      normalizedPowerFactor,
      normalizedEfficiency,
      null
    );
  }

  const powerInWatt = convertPowerToSI(power, powerUnit);
  const voltageInVolt = convertVoltageToSI(voltage, voltageUnit);
  const denominator =
    phaseType === "three-phase"
      ? ROOT_THREE * voltageInVolt * normalizedPowerFactor * normalizedEfficiency
      : voltageInVolt * normalizedPowerFactor * normalizedEfficiency;
  const flaInAmpere = powerInWatt / denominator;
  const designInAmpere = flaInAmpere * (1 + normalizedMargin);

  const flaUnit = inferCurrentUnit(flaInAmpere);
  const flaValue = convertCurrentFromSI(flaInAmpere, flaUnit);
  const designUnit = inferCurrentUnit(designInAmpere);
  const designValue = convertCurrentFromSI(designInAmpere, designUnit);

  return {
    error: null,
    flaValue,
    flaDisplay: formatEngineeringValue(flaValue, locale),
    flaUnit,
    designValue,
    designDisplay: formatEngineeringValue(designValue, locale),
    designUnit,
    siValue: flaInAmpere,
    siUnit: "A",
    formulaDisplay:
      phaseType === "three-phase"
        ? `I = P / (sqrt(3) x V x cos phi x eta)\n` +
          `I = ${formatEngineeringValue(power, locale)} ${powerUnit} / ` +
          `(1.732 x ${formatEngineeringValue(voltage, locale)} ${voltageUnit} x ` +
          `${formatFactor(normalizedPowerFactor, locale)} x ` +
          `${formatFactor(normalizedEfficiency, locale)})\n` +
          `I = ${formatEngineeringValue(flaValue, locale)} ${flaUnit}`
        : `I = P / (V x cos phi x eta)\n` +
          `I = ${formatEngineeringValue(power, locale)} ${powerUnit} / ` +
          `(${formatEngineeringValue(voltage, locale)} ${voltageUnit} x ` +
          `${formatFactor(normalizedPowerFactor, locale)} x ` +
          `${formatFactor(normalizedEfficiency, locale)})\n` +
          `I = ${formatEngineeringValue(flaValue, locale)} ${flaUnit}`,
    normalizedPowerFactor,
    normalizedEfficiency,
    normalizedMargin,
  };
}
