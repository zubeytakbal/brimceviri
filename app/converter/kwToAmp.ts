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

export type ElectricalSystemType =
  | "single-phase"
  | "three-phase"
  | "dc";

export type KwToAmpInput = {
  powerValue: string;
  powerUnit: PowerUnit;
  voltageValue: string;
  voltageUnit: VoltageUnit;
  powerFactorValue: string;
  efficiencyValue: string;
  systemType: ElectricalSystemType;
  locale: CalculatorLocale;
};

export type KwToAmpResult = {
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
  tr: {
    missing: "Guc ve gerilim degerlerini girin.",
    invalid: "Gecerli sayisal degerler girin.",
    powerPositive: "Guc sifirdan buyuk olmalidir.",
    voltagePositive: "Gerilim sifirdan buyuk olmalidir.",
    powerFactorRange:
      "Guc faktoru 0 ile 1 arasinda veya 0 ile 100 arasinda bir yuzde degeri olmalidir.",
    efficiencyRange:
      "Verim 0 ile 1 arasinda veya 0 ile 100 arasinda bir yuzde degeri olmalidir.",
  },
  en: {
    missing: "Enter the power and voltage values.",
    invalid: "Enter valid numeric values.",
    powerPositive: "Power must be greater than zero.",
    voltagePositive: "Voltage must be greater than zero.",
    powerFactorRange:
      "Power factor must be between 0 and 1, or entered as a percentage between 0 and 100.",
    efficiencyRange:
      "Efficiency must be between 0 and 1, or entered as a percentage between 0 and 100.",
  },
  de: {
    missing: "Geben Sie Leistungs- und Spannungswerte ein.",
    invalid: "Geben Sie gultige Zahlenwerte ein.",
    powerPositive: "Die Leistung muss grosser als null sein.",
    voltagePositive: "Die Spannung muss grosser als null sein.",
    powerFactorRange:
      "Der Leistungsfaktor muss zwischen 0 und 1 liegen oder als Prozentwert zwischen 0 und 100 eingegeben werden.",
    efficiencyRange:
      "Der Wirkungsgrad muss zwischen 0 und 1 liegen oder als Prozentwert zwischen 0 und 100 eingegeben werden.",
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

export function solveKwToAmp({
  powerValue,
  powerUnit,
  voltageValue,
  voltageUnit,
  powerFactorValue,
  efficiencyValue,
  systemType,
  locale,
}: KwToAmpInput): KwToAmpResult {
  const strings = messages[locale];
  const power = parseCalculatorNumber(powerValue);
  const voltage = parseCalculatorNumber(voltageValue);
  const powerFactor = parseCalculatorNumber(powerFactorValue);
  const efficiency = parseCalculatorNumber(efficiencyValue);
  const rawValues = [
    powerValue,
    voltageValue,
    powerFactorValue,
    efficiencyValue,
  ];
  const parsedValues = [power, voltage, powerFactor, efficiency];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return {
      error: strings.invalid,
      currentValue: null,
      currentDisplay: "",
      currentUnit: "A",
      siValue: null,
      siUnit: "A",
      formulaDisplay: "",
      apparentPowerValue: null,
      apparentPowerDisplay: "",
      apparentPowerUnit: "kW",
      normalizedPowerFactor: null,
      normalizedEfficiency: null,
    };
  }

  if (power === null || voltage === null) {
    return {
      error: strings.missing,
      currentValue: null,
      currentDisplay: "",
      currentUnit: "A",
      siValue: null,
      siUnit: "A",
      formulaDisplay: "",
      apparentPowerValue: null,
      apparentPowerDisplay: "",
      apparentPowerUnit: "kW",
      normalizedPowerFactor: null,
      normalizedEfficiency: null,
    };
  }

  if (power <= 0) {
    return {
      error: strings.powerPositive,
      currentValue: null,
      currentDisplay: "",
      currentUnit: "A",
      siValue: null,
      siUnit: "A",
      formulaDisplay: "",
      apparentPowerValue: null,
      apparentPowerDisplay: "",
      apparentPowerUnit: "kW",
      normalizedPowerFactor: null,
      normalizedEfficiency: null,
    };
  }

  if (voltage <= 0) {
    return {
      error: strings.voltagePositive,
      currentValue: null,
      currentDisplay: "",
      currentUnit: "A",
      siValue: null,
      siUnit: "A",
      formulaDisplay: "",
      apparentPowerValue: null,
      apparentPowerDisplay: "",
      apparentPowerUnit: "kW",
      normalizedPowerFactor: null,
      normalizedEfficiency: null,
    };
  }

  const normalizedPowerFactor =
    systemType === "dc"
      ? 1
      : normalizeFactor(powerFactor ?? 1);
  const normalizedEfficiency = normalizeFactor(efficiency ?? 1);

  if (
    normalizedPowerFactor === null ||
    normalizedPowerFactor <= 0 ||
    normalizedPowerFactor > 1
  ) {
    return {
      error: strings.powerFactorRange,
      currentValue: null,
      currentDisplay: "",
      currentUnit: "A",
      siValue: null,
      siUnit: "A",
      formulaDisplay: "",
      apparentPowerValue: null,
      apparentPowerDisplay: "",
      apparentPowerUnit: "kW",
      normalizedPowerFactor: null,
      normalizedEfficiency: null,
    };
  }

  if (
    normalizedEfficiency === null ||
    normalizedEfficiency <= 0 ||
    normalizedEfficiency > 1
  ) {
    return {
      error: strings.efficiencyRange,
      currentValue: null,
      currentDisplay: "",
      currentUnit: "A",
      siValue: null,
      siUnit: "A",
      formulaDisplay: "",
      apparentPowerValue: null,
      apparentPowerDisplay: "",
      apparentPowerUnit: "kW",
      normalizedPowerFactor: normalizedPowerFactor,
      normalizedEfficiency: null,
    };
  }

  const powerInWatt = convertPowerToSI(power, powerUnit);
  const voltageInVolt = convertVoltageToSI(voltage, voltageUnit);
  const denominator =
    systemType === "three-phase"
      ? ROOT_THREE *
        voltageInVolt *
        normalizedPowerFactor *
        normalizedEfficiency
      : systemType === "single-phase"
        ? voltageInVolt *
          normalizedPowerFactor *
          normalizedEfficiency
        : voltageInVolt * normalizedEfficiency;
  const currentInAmpere = powerInWatt / denominator;
  const resultUnit = inferCurrentUnit(currentInAmpere);
  const resultValue = convertCurrentFromSI(
    currentInAmpere,
    resultUnit
  );
  const apparentPowerInWatt =
    powerInWatt /
    (normalizedEfficiency *
      (systemType === "dc" ? 1 : normalizedPowerFactor));

  return {
    error: null,
    currentValue: resultValue,
    currentDisplay: formatEngineeringValue(resultValue, locale),
    currentUnit: resultUnit,
    siValue: currentInAmpere,
    siUnit: "A",
    formulaDisplay:
      systemType === "three-phase"
        ? `I = P / (sqrt(3) x V x cos phi x eta)\n` +
          `I = ${formatEngineeringValue(power, locale)} ${powerUnit} / ` +
          `(1.732 x ${formatEngineeringValue(voltage, locale)} ${voltageUnit} x ` +
          `${formatFactor(normalizedPowerFactor, locale)} x ` +
          `${formatFactor(normalizedEfficiency, locale)})\n` +
          `I = ${formatEngineeringValue(resultValue, locale)} ${resultUnit}`
        : systemType === "single-phase"
          ? `I = P / (V x cos phi x eta)\n` +
            `I = ${formatEngineeringValue(power, locale)} ${powerUnit} / ` +
            `(${formatEngineeringValue(voltage, locale)} ${voltageUnit} x ` +
            `${formatFactor(normalizedPowerFactor, locale)} x ` +
            `${formatFactor(normalizedEfficiency, locale)})\n` +
            `I = ${formatEngineeringValue(resultValue, locale)} ${resultUnit}`
          : `I = P / (V x eta)\n` +
            `I = ${formatEngineeringValue(power, locale)} ${powerUnit} / ` +
            `(${formatEngineeringValue(voltage, locale)} ${voltageUnit} x ` +
            `${formatFactor(normalizedEfficiency, locale)})\n` +
            `I = ${formatEngineeringValue(resultValue, locale)} ${resultUnit}`,
    apparentPowerValue: apparentPowerInWatt / 1000,
    apparentPowerDisplay: formatEngineeringValue(
      apparentPowerInWatt / 1000,
      locale
    ),
    apparentPowerUnit: "kW",
    normalizedPowerFactor,
    normalizedEfficiency,
  };
}

