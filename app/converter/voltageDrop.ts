import {
  convertCalculatorAreaToSI,
  convertCalculatorLengthToSI,
  convertCurrentToSI,
  convertVoltageFromSI,
  convertVoltageToSI,
  inferVoltageUnit,
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
  type ConductorMaterial,
  type ElectricalSystemType,
} from "./electricalConductor";

export type { ElectricalSystemType } from "./electricalConductor";

export type VoltageDropInput = {
  sourceVoltageValue: string;
  sourceVoltageUnit: VoltageUnit;
  currentValue: string;
  currentUnit: CurrentUnit;
  lengthValue: string;
  lengthUnit: CalculatorLengthUnit;
  crossSectionValue: string;
  crossSectionUnit: CalculatorAreaUnit;
  material: ConductorMaterial;
  systemType: ElectricalSystemType;
  locale: CalculatorLocale;
};

export type VoltageDropResult = {
  error: string | null;
  dropValue: number | null;
  dropDisplay: string;
  dropUnit: VoltageUnit;
  dropPercent: number | null;
  endVoltageValue: number | null;
  endVoltageDisplay: string;
  endVoltageUnit: VoltageUnit;
  resistivity: number | null;
  siValue: number | null;
  siUnit: "V";
  formulaDisplay: string;
  isSevere: boolean;
};

const messages = {
  tr: {
    missing: "Gerilim, akim, uzunluk ve kesit degerlerini girin.",
    invalid: "Gecerli sayisal degerler girin.",
    voltagePositive: "Kaynak gerilimi sifirdan buyuk olmalidir.",
    currentPositive: "Akim sifirdan buyuk olmalidir.",
    lengthPositive: "Kablo uzunlugu sifirdan buyuk olmalidir.",
    crossSectionPositive: "Iletken kesiti sifirdan buyuk olmalidir.",
  },
  en: {
    missing: "Enter the voltage, current, length and cross-section values.",
    invalid: "Enter valid numeric values.",
    voltagePositive: "Source voltage must be greater than zero.",
    currentPositive: "Current must be greater than zero.",
    lengthPositive: "Cable length must be greater than zero.",
    crossSectionPositive: "Conductor cross-section must be greater than zero.",
  },
  de: {
    missing:
      "Geben Sie Spannung, Strom, Leitungslange und Querschnitt ein.",
    invalid: "Geben Sie gultige Zahlenwerte ein.",
    voltagePositive: "Die Versorgungsspannung muss grosser als null sein.",
    currentPositive: "Der Strom muss grosser als null sein.",
    lengthPositive: "Die Leitungslange muss grosser als null sein.",
    crossSectionPositive:
      "Der Leiterquerschnitt muss grosser als null sein.",
  },
} as const;

function emptyResult(error: string): VoltageDropResult {
  return {
    error,
    dropValue: null,
    dropDisplay: "",
    dropUnit: "V",
    dropPercent: null,
    endVoltageValue: null,
    endVoltageDisplay: "",
    endVoltageUnit: "V",
    resistivity: null,
    siValue: null,
    siUnit: "V",
    formulaDisplay: "",
    isSevere: false,
  };
}

export function solveVoltageDrop({
  sourceVoltageValue,
  sourceVoltageUnit,
  currentValue,
  currentUnit,
  lengthValue,
  lengthUnit,
  crossSectionValue,
  crossSectionUnit,
  material,
  systemType,
  locale,
}: VoltageDropInput): VoltageDropResult {
  const strings = messages[locale];
  const sourceVoltage = parseCalculatorNumber(sourceVoltageValue);
  const current = parseCalculatorNumber(currentValue);
  const length = parseCalculatorNumber(lengthValue);
  const crossSection = parseCalculatorNumber(crossSectionValue);
  const rawValues = [
    sourceVoltageValue,
    currentValue,
    lengthValue,
    crossSectionValue,
  ];
  const parsedValues = [sourceVoltage, current, length, crossSection];

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
    crossSection === null
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

  if (crossSection <= 0) {
    return emptyResult(strings.crossSectionPositive);
  }

  const sourceVoltageInVolt = convertVoltageToSI(
    sourceVoltage,
    sourceVoltageUnit
  );
  const currentInAmpere = convertCurrentToSI(current, currentUnit);
  const lengthInMetre = convertCalculatorLengthToSI(length, lengthUnit);
  const crossSectionInMm2 =
    convertCalculatorAreaToSI(crossSection, crossSectionUnit) * 1_000_000;

  const resistivity = CONDUCTOR_RESISTIVITY[material];
  const phaseFactor = getPhaseFactor(systemType);

  const dropInVolt =
    (phaseFactor * currentInAmpere * lengthInMetre * resistivity) /
    crossSectionInMm2;
  const dropPercent = (dropInVolt / sourceVoltageInVolt) * 100;
  const endVoltageInVolt = sourceVoltageInVolt - dropInVolt;

  const dropUnit = inferVoltageUnit(dropInVolt);
  const dropValue = convertVoltageFromSI(dropInVolt, dropUnit);
  const endVoltageUnit = inferVoltageUnit(Math.max(endVoltageInVolt, 0));
  const endVoltageValue = convertVoltageFromSI(
    endVoltageInVolt,
    endVoltageUnit
  );

  const phaseFactorLabel =
    systemType === "three-phase" ? "√3" : "2";

  return {
    error: null,
    dropValue,
    dropDisplay: formatEngineeringValue(dropValue, locale),
    dropUnit,
    dropPercent,
    endVoltageValue,
    endVoltageDisplay: formatEngineeringValue(endVoltageValue, locale),
    endVoltageUnit,
    resistivity,
    siValue: dropInVolt,
    siUnit: "V",
    formulaDisplay:
      `ΔU = k x I x L x ρ / A\n` +
      `ΔU = ${phaseFactorLabel} x ${formatEngineeringValue(current, locale)} ${currentUnit} x ` +
      `${formatEngineeringValue(length, locale)} ${lengthUnit} x ${formatEngineeringValue(resistivity, locale)} Ω·mm²/m / ` +
      `${formatEngineeringValue(crossSection, locale)} ${crossSectionUnit}\n` +
      `ΔU = ${formatEngineeringValue(dropValue, locale)} ${dropUnit}`,
    isSevere: dropPercent >= 5,
  };
}
