import {
  convertCurrentToSI,
  convertPowerFromSI,
  convertVoltageToSI,
  inferPowerUnit,
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

export type AmpToKwInput = {
  currentValue: string;
  currentUnit: CurrentUnit;
  voltageValue: string;
  voltageUnit: VoltageUnit;
  powerFactorValue: string;
  efficiencyValue: string;
  systemType: ElectricalSystemType;
  locale: CalculatorLocale;
};

export type AmpToKwResult = {
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
  tr: {
    missing: "Akım ve gerilim değerlerini girin.",
    invalid: "Geçerli sayısal değerler girin.",
    currentPositive: "Akım sıfırdan büyük olmalıdır.",
    voltagePositive: "Gerilim sıfırdan büyük olmalıdır.",
    powerFactorRange:
      "Güç faktörü 0 ile 1 arasında veya 0 ile 100 arasında bir yüzde değeri olmalıdır.",
    efficiencyRange:
      "Verim 0 ile 1 arasında veya 0 ile 100 arasında bir yüzde değeri olmalıdır.",
  },
  en: {
    missing: "Enter the current and voltage values.",
    invalid: "Enter valid numeric values.",
    currentPositive: "Current must be greater than zero.",
    voltagePositive: "Voltage must be greater than zero.",
    powerFactorRange:
      "Power factor must be between 0 and 1, or entered as a percentage between 0 and 100.",
    efficiencyRange:
      "Efficiency must be between 0 and 1, or entered as a percentage between 0 and 100.",
  },
  de: {
    missing: "Geben Sie Strom- und Spannungswerte ein.",
    invalid: "Geben Sie gültige Zahlenwerte ein.",
    currentPositive: "Der Strom muss größer als null sein.",
    voltagePositive: "Die Spannung muss größer als null sein.",
    powerFactorRange:
      "Der Leistungsfaktor muss zwischen 0 und 1 liegen oder als Prozentwert zwischen 0 und 100 eingegeben werden.",
    efficiencyRange:
      "Der Wirkungsgrad muss zwischen 0 und 1 liegen oder als Prozentwert zwischen 0 und 100 eingegeben werden.",
  },
  ar: {
    missing: "أدخل قيم التيار والجهد.",
    invalid: "أدخل قيما رقمية صحيحة.",
    currentPositive: "يجب أن يكون التيار أكبر من الصفر.",
    voltagePositive: "يجب أن يكون الجهد أكبر من الصفر.",
    powerFactorRange:
      "يجب أن يكون معامل القدرة بين 0 و1 أو كنسبة مئوية بين 0 و100.",
    efficiencyRange:
      "يجب أن تكون الكفاءة بين 0 و1 أو كنسبة مئوية بين 0 و100.",
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
  normalizedEfficiency: number | null = null
): AmpToKwResult {
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

export function solveAmpToKw({
  currentValue,
  currentUnit,
  voltageValue,
  voltageUnit,
  powerFactorValue,
  efficiencyValue,
  systemType,
  locale,
}: AmpToKwInput): AmpToKwResult {
  const strings = messages[locale];
  const current = parseCalculatorNumber(currentValue);
  const voltage = parseCalculatorNumber(voltageValue);
  const powerFactor = parseCalculatorNumber(powerFactorValue);
  const efficiency = parseCalculatorNumber(efficiencyValue);
  const rawValues = [
    currentValue,
    voltageValue,
    powerFactorValue,
    efficiencyValue,
  ];
  const parsedValues = [current, voltage, powerFactor, efficiency];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return emptyResult(strings.invalid);
  }

  if (current === null || voltage === null) {
    return emptyResult(strings.missing);
  }

  if (current <= 0) {
    return emptyResult(strings.currentPositive);
  }

  if (voltage <= 0) {
    return emptyResult(strings.voltagePositive);
  }

  const normalizedPowerFactor =
    systemType === "dc" ? 1 : normalizeFactor(powerFactor ?? 1);
  const normalizedEfficiency = normalizeFactor(efficiency ?? 1);

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
    powerDisplay: formatEngineeringValue(resultValue, locale),
    powerUnit: resultUnit,
    siValue: powerInWatt,
    siUnit: "W",
    formulaDisplay:
      systemType === "three-phase"
        ? `P = sqrt(3) x V x I x cos phi x eta\n` +
          `P = 1.732 x ${formatEngineeringValue(voltage, locale)} ${voltageUnit} x ` +
          `${formatEngineeringValue(current, locale)} ${currentUnit} x ` +
          `${formatFactor(normalizedPowerFactor, locale)} x ` +
          `${formatFactor(normalizedEfficiency, locale)}\n` +
          `P = ${formatEngineeringValue(resultValue, locale)} ${resultUnit}`
        : systemType === "single-phase"
          ? `P = V x I x cos phi x eta\n` +
            `P = ${formatEngineeringValue(voltage, locale)} ${voltageUnit} x ` +
            `${formatEngineeringValue(current, locale)} ${currentUnit} x ` +
            `${formatFactor(normalizedPowerFactor, locale)} x ` +
            `${formatFactor(normalizedEfficiency, locale)}\n` +
            `P = ${formatEngineeringValue(resultValue, locale)} ${resultUnit}`
          : `P = V x I x eta\n` +
            `P = ${formatEngineeringValue(voltage, locale)} ${voltageUnit} x ` +
            `${formatEngineeringValue(current, locale)} ${currentUnit} x ` +
            `${formatFactor(normalizedEfficiency, locale)}\n` +
            `P = ${formatEngineeringValue(resultValue, locale)} ${resultUnit}`,
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
