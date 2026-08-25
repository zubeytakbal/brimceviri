import {
  convertCalculatorAreaFromSI,
  convertCalculatorLengthToSI,
  convertCurrentToSI,
  convertVoltageToSI,
  inferCalculatorAreaUnit,
  type CalculatorAreaUnit,
  type CalculatorLengthUnit,
  type CurrentUnit,
  type VoltageUnit,
} from "./engineeringCalculatorUnits";
import {
  formatEngineeringValue,
  parseCalculatorNumber,
  type CalculatorLocale,
} from "./pressureForceArea";
import {
  CONDUCTOR_RESISTIVITY,
  getPhaseFactor,
  roundUpToStandardCrossSection,
  type ConductorMaterial,
  type ElectricalSystemType,
} from "./electricalConductor";

export type { ElectricalSystemType } from "./electricalConductor";

export type CableSizeInput = {
  sourceVoltageValue: string;
  sourceVoltageUnit: VoltageUnit;
  currentValue: string;
  currentUnit: CurrentUnit;
  lengthValue: string;
  lengthUnit: CalculatorLengthUnit;
  allowedDropPercentValue: string;
  material: ConductorMaterial;
  systemType: ElectricalSystemType;
  locale: CalculatorLocale;
};

export type CableSizeResult = {
  error: string | null;
  requiredValue: number | null;
  requiredDisplay: string;
  requiredUnit: CalculatorAreaUnit;
  standardCrossSectionMm2: number | null;
  allowedDropVoltValue: number | null;
  allowedDropVoltDisplay: string;
  resistivity: number | null;
  siValue: number | null;
  siUnit: "m²";
  formulaDisplay: string;
};

const messages = {
  tr: {
    missing:
      "Gerilim, akim, uzunluk ve izin verilen gerilim dusumu degerlerini girin.",
    invalid: "Gecerli sayisal degerler girin.",
    voltagePositive: "Kaynak gerilimi sifirdan buyuk olmalidir.",
    currentPositive: "Akim sifirdan buyuk olmalidir.",
    lengthPositive: "Kablo uzunlugu sifirdan buyuk olmalidir.",
    percentRange:
      "Izin verilen gerilim dusumu 0 ile 100 arasinda bir yuzde degeri olmalidir.",
  },
  en: {
    missing:
      "Enter the voltage, current, length and allowable voltage-drop values.",
    invalid: "Enter valid numeric values.",
    voltagePositive: "Source voltage must be greater than zero.",
    currentPositive: "Current must be greater than zero.",
    lengthPositive: "Cable length must be greater than zero.",
    percentRange:
      "Allowable voltage drop must be a percentage between 0 and 100.",
  },
  de: {
    missing:
      "Geben Sie Spannung, Strom, Leitungslange und zulassigen Spannungsfall ein.",
    invalid: "Geben Sie gultige Zahlenwerte ein.",
    voltagePositive: "Die Versorgungsspannung muss grosser als null sein.",
    currentPositive: "Der Strom muss grosser als null sein.",
    lengthPositive: "Die Leitungslange muss grosser als null sein.",
    percentRange:
      "Der zulassige Spannungsfall muss ein Prozentwert zwischen 0 und 100 sein.",
  },
} as const;

function emptyResult(error: string): CableSizeResult {
  return {
    error,
    requiredValue: null,
    requiredDisplay: "",
    requiredUnit: "mm²",
    standardCrossSectionMm2: null,
    allowedDropVoltValue: null,
    allowedDropVoltDisplay: "",
    resistivity: null,
    siValue: null,
    siUnit: "m²",
    formulaDisplay: "",
  };
}

export function solveCableSize({
  sourceVoltageValue,
  sourceVoltageUnit,
  currentValue,
  currentUnit,
  lengthValue,
  lengthUnit,
  allowedDropPercentValue,
  material,
  systemType,
  locale,
}: CableSizeInput): CableSizeResult {
  const strings = messages[locale];
  const sourceVoltage = parseCalculatorNumber(sourceVoltageValue);
  const current = parseCalculatorNumber(currentValue);
  const length = parseCalculatorNumber(lengthValue);
  const allowedDropPercent = parseCalculatorNumber(allowedDropPercentValue);
  const rawValues = [
    sourceVoltageValue,
    currentValue,
    lengthValue,
    allowedDropPercentValue,
  ];
  const parsedValues = [sourceVoltage, current, length, allowedDropPercent];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return emptyResult(strings.invalid);
  }

  if (
    sourceVoltage === null ||
    current === null ||
    length === null ||
    allowedDropPercent === null
  ) {
    return emptyResult(strings.missing);
  }

  if (sourceVoltage <= 0) {
    return emptyResult(strings.voltagePositive);
  }

  if (current <= 0) {
    return emptyResult(strings.currentPositive);
  }

  if (length <= 0) {
    return emptyResult(strings.lengthPositive);
  }

  if (allowedDropPercent <= 0 || allowedDropPercent > 100) {
    return emptyResult(strings.percentRange);
  }

  const sourceVoltageInVolt = convertVoltageToSI(
    sourceVoltage,
    sourceVoltageUnit
  );
  const currentInAmpere = convertCurrentToSI(current, currentUnit);
  const lengthInMetre = convertCalculatorLengthToSI(length, lengthUnit);
  const resistivity = CONDUCTOR_RESISTIVITY[material];
  const phaseFactor = getPhaseFactor(systemType);

  const allowedDropVolt = (sourceVoltageInVolt * allowedDropPercent) / 100;
  const requiredMm2 =
    (phaseFactor * currentInAmpere * lengthInMetre * resistivity) /
    allowedDropVolt;
  const requiredM2 = requiredMm2 / 1_000_000;
  const resultUnit = inferCalculatorAreaUnit(requiredM2);
  const resultValue = convertCalculatorAreaFromSI(requiredM2, resultUnit);
  const standardCrossSectionMm2 = roundUpToStandardCrossSection(requiredMm2);

  const phaseFactorLabel = systemType === "three-phase" ? "√3" : "2";

  return {
    error: null,
    requiredValue: resultValue,
    requiredDisplay: formatEngineeringValue(resultValue, locale),
    requiredUnit: resultUnit,
    standardCrossSectionMm2,
    allowedDropVoltValue: allowedDropVolt,
    allowedDropVoltDisplay: formatEngineeringValue(allowedDropVolt, locale),
    resistivity,
    siValue: requiredM2,
    siUnit: "m²",
    formulaDisplay:
      `A = k x I x L x ρ / ΔU\n` +
      `A = ${phaseFactorLabel} x ${formatEngineeringValue(current, locale)} ${currentUnit} x ` +
      `${formatEngineeringValue(length, locale)} ${lengthUnit} x ${formatEngineeringValue(resistivity, locale)} Ω·mm²/m / ` +
      `${formatEngineeringValue(allowedDropVolt, locale)} V\n` +
      `A = ${formatEngineeringValue(resultValue, locale)} ${resultUnit}`,
  };
}
