import {
  calculatorUnitSymbols,
  convertCalculatorAreaFromSI,
  convertCalculatorAreaToSI,
  convertCalculatorLengthFromSI,
  convertCalculatorLengthToSI,
  convertPowerFromSI,
  convertPowerToSI,
  convertTemperatureDifferenceFromSI,
  convertTemperatureDifferenceToSI,
  convertThermalConductivityFromSI,
  convertThermalConductivityToSI,
  inferCalculatorAreaUnit,
  inferCalculatorLengthUnit,
  inferPowerUnit,
  type CalculatorAreaUnit,
  type CalculatorLengthUnit,
  type PowerUnit,
  type TemperatureDifferenceUnit,
  type ThermalConductivityUnit,
} from "./engineeringCalculatorUnits";
import { parseCalculatorNumber } from "./pressureForceArea";
import { formatUzValue } from "./pressureForceAreaUz";
import type { HeatConductionTarget } from "./heatConduction";

export type HeatConductionUzInput = {
  target: HeatConductionTarget;
  powerValue: string;
  powerUnit: PowerUnit;
  thermalConductivityValue: string;
  thermalConductivityUnit: ThermalConductivityUnit;
  areaValue: string;
  areaUnit: CalculatorAreaUnit;
  temperatureDifferenceValue: string;
  temperatureDifferenceUnit: TemperatureDifferenceUnit;
  lengthValue: string;
  lengthUnit: CalculatorLengthUnit;
};

export type HeatConductionUzResult = {
  error: string | null;
  resultValue: number | null;
  resultDisplay: string;
  resultUnit: string;
  siValue: number | null;
  siUnit: string;
  formulaDisplay: string;
};

const messages = {
  missing: "Hisoblash uchun kerakli to'rtta qiymatni kiriting.",
  invalid: "To'g'ri raqamli qiymatlar kiriting.",
  conductivityPositive: "Issiqlik o'tkazuvchanligi noldan katta bo'lishi kerak.",
  areaPositive: "Maydon noldan katta bo'lishi kerak.",
  lengthPositive: "Qalinlik noldan katta bo'lishi kerak.",
  temperatureDifferenceNonZero:
    "Teskari hisoblash uchun harorat farqi nolga teng bo'lishi mumkin emas.",
  powerNonZero: "Qalinlik hisobi uchun issiqlik o'tish tezligi nolga teng bo'lishi mumkin emas.",
  nonPhysicalConductivity: "Bu qiymatlar fizik jihatdan ma'noli o'tkazuvchanlik bermaydi.",
  nonPhysicalArea: "Bu qiymatlar fizik jihatdan ma'noli maydon bermaydi.",
  nonPhysicalLength: "Bu qiymatlar fizik jihatdan ma'noli qalinlik bermaydi.",
};

function createErrorResult(
  error: string,
  resultUnit: string,
  siUnit: string
): HeatConductionUzResult {
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

export function solveHeatConductionUz({
  target,
  powerValue,
  powerUnit,
  thermalConductivityValue,
  thermalConductivityUnit,
  areaValue,
  areaUnit,
  temperatureDifferenceValue,
  temperatureDifferenceUnit,
  lengthValue,
  lengthUnit,
}: HeatConductionUzInput): HeatConductionUzResult {
  const power = parseCalculatorNumber(powerValue);
  const thermalConductivity = parseCalculatorNumber(thermalConductivityValue);
  const area = parseCalculatorNumber(areaValue);
  const temperatureDifference = parseCalculatorNumber(temperatureDifferenceValue);
  const length = parseCalculatorNumber(lengthValue);
  const rawValues = [
    powerValue,
    thermalConductivityValue,
    areaValue,
    temperatureDifferenceValue,
    lengthValue,
  ];
  const parsedValues = [power, thermalConductivity, area, temperatureDifference, length];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return createErrorResult(messages.invalid, "W", "W");
  }

  if (target === "power") {
    if (
      thermalConductivity === null ||
      area === null ||
      temperatureDifference === null ||
      length === null
    ) {
      return createErrorResult(messages.missing, "W", "W");
    }

    if (thermalConductivity <= 0) {
      return createErrorResult(messages.conductivityPositive, "W", "W");
    }

    if (area <= 0) {
      return createErrorResult(messages.areaPositive, "W", "W");
    }

    if (length <= 0) {
      return createErrorResult(messages.lengthPositive, "W", "W");
    }

    const conductivityInSI = convertThermalConductivityToSI(
      thermalConductivity,
      thermalConductivityUnit
    );
    const areaInSI = convertCalculatorAreaToSI(area, areaUnit);
    const deltaTInSI = convertTemperatureDifferenceToSI(
      temperatureDifference,
      temperatureDifferenceUnit
    );
    const lengthInSI = convertCalculatorLengthToSI(length, lengthUnit);
    const powerInSI = (conductivityInSI * areaInSI * deltaTInSI) / lengthInSI;
    const resultUnit = inferPowerUnit(powerInSI);
    const resultValue = convertPowerFromSI(powerInSI, resultUnit);

    return {
      error: null,
      resultValue,
      resultDisplay: formatUzValue(resultValue),
      resultUnit,
      siValue: powerInSI,
      siUnit: "W",
      formulaDisplay:
        `Q̇ = k × A × ΔT / L\n` +
        `Q̇ = ${formatUzValue(thermalConductivity)} ${thermalConductivityUnit} × ${formatUzValue(area)} ${areaUnit} × ${formatUzValue(temperatureDifference)} ${temperatureDifferenceUnit} / ${formatUzValue(length)} ${lengthUnit}\n` +
        `Q̇ = ${formatUzValue(resultValue)} ${resultUnit}`,
    };
  }

  if (target === "thermalConductivity") {
    if (
      power === null ||
      area === null ||
      temperatureDifference === null ||
      length === null
    ) {
      return createErrorResult(
        messages.missing,
        calculatorUnitSymbols.wattPerMetreKelvin,
        calculatorUnitSymbols.wattPerMetreKelvin
      );
    }

    if (area <= 0) {
      return createErrorResult(
        messages.areaPositive,
        calculatorUnitSymbols.wattPerMetreKelvin,
        calculatorUnitSymbols.wattPerMetreKelvin
      );
    }

    if (length <= 0) {
      return createErrorResult(
        messages.lengthPositive,
        calculatorUnitSymbols.wattPerMetreKelvin,
        calculatorUnitSymbols.wattPerMetreKelvin
      );
    }

    if (temperatureDifference === 0) {
      return createErrorResult(
        messages.temperatureDifferenceNonZero,
        calculatorUnitSymbols.wattPerMetreKelvin,
        calculatorUnitSymbols.wattPerMetreKelvin
      );
    }

    const powerInSI = convertPowerToSI(power, powerUnit);
    const areaInSI = convertCalculatorAreaToSI(area, areaUnit);
    const deltaTInSI = convertTemperatureDifferenceToSI(
      temperatureDifference,
      temperatureDifferenceUnit
    );
    const lengthInSI = convertCalculatorLengthToSI(length, lengthUnit);
    const conductivityInSI = (powerInSI * lengthInSI) / (areaInSI * deltaTInSI);

    if (conductivityInSI <= 0) {
      return createErrorResult(
        messages.nonPhysicalConductivity,
        calculatorUnitSymbols.wattPerMetreKelvin,
        calculatorUnitSymbols.wattPerMetreKelvin
      );
    }

    const resultValue = convertThermalConductivityFromSI(
      conductivityInSI,
      calculatorUnitSymbols.wattPerMetreKelvin
    );

    return {
      error: null,
      resultValue,
      resultDisplay: formatUzValue(resultValue),
      resultUnit: calculatorUnitSymbols.wattPerMetreKelvin,
      siValue: conductivityInSI,
      siUnit: calculatorUnitSymbols.wattPerMetreKelvin,
      formulaDisplay:
        `k = Q̇ × L / (A × ΔT)\n` +
        `k = ${formatUzValue(power)} ${powerUnit} × ${formatUzValue(length)} ${lengthUnit} / (${formatUzValue(area)} ${areaUnit} × ${formatUzValue(temperatureDifference)} ${temperatureDifferenceUnit})\n` +
        `k = ${formatUzValue(resultValue)} ${calculatorUnitSymbols.wattPerMetreKelvin}`,
    };
  }

  if (target === "area") {
    if (
      power === null ||
      thermalConductivity === null ||
      temperatureDifference === null ||
      length === null
    ) {
      return createErrorResult(
        messages.missing,
        calculatorUnitSymbols.squareMetre,
        calculatorUnitSymbols.squareMetre
      );
    }

    if (thermalConductivity <= 0) {
      return createErrorResult(
        messages.conductivityPositive,
        calculatorUnitSymbols.squareMetre,
        calculatorUnitSymbols.squareMetre
      );
    }

    if (length <= 0) {
      return createErrorResult(
        messages.lengthPositive,
        calculatorUnitSymbols.squareMetre,
        calculatorUnitSymbols.squareMetre
      );
    }

    if (temperatureDifference === 0) {
      return createErrorResult(
        messages.temperatureDifferenceNonZero,
        calculatorUnitSymbols.squareMetre,
        calculatorUnitSymbols.squareMetre
      );
    }

    const powerInSI = convertPowerToSI(power, powerUnit);
    const conductivityInSI = convertThermalConductivityToSI(
      thermalConductivity,
      thermalConductivityUnit
    );
    const deltaTInSI = convertTemperatureDifferenceToSI(
      temperatureDifference,
      temperatureDifferenceUnit
    );
    const lengthInSI = convertCalculatorLengthToSI(length, lengthUnit);
    const areaInSI = (powerInSI * lengthInSI) / (conductivityInSI * deltaTInSI);

    if (areaInSI <= 0) {
      return createErrorResult(
        messages.nonPhysicalArea,
        calculatorUnitSymbols.squareMetre,
        calculatorUnitSymbols.squareMetre
      );
    }

    const resultUnit = inferCalculatorAreaUnit(areaInSI);
    const resultValue = convertCalculatorAreaFromSI(areaInSI, resultUnit);

    return {
      error: null,
      resultValue,
      resultDisplay: formatUzValue(resultValue),
      resultUnit,
      siValue: areaInSI,
      siUnit: calculatorUnitSymbols.squareMetre,
      formulaDisplay:
        `A = Q̇ × L / (k × ΔT)\n` +
        `A = ${formatUzValue(power)} ${powerUnit} × ${formatUzValue(length)} ${lengthUnit} / (${formatUzValue(thermalConductivity)} ${thermalConductivityUnit} × ${formatUzValue(temperatureDifference)} ${temperatureDifferenceUnit})\n` +
        `A = ${formatUzValue(resultValue)} ${resultUnit}`,
    };
  }

  if (target === "temperatureDifference") {
    if (
      power === null ||
      thermalConductivity === null ||
      area === null ||
      length === null
    ) {
      return createErrorResult(
        messages.missing,
        calculatorUnitSymbols.degreeCelsius,
        "K"
      );
    }

    if (thermalConductivity <= 0) {
      return createErrorResult(
        messages.conductivityPositive,
        calculatorUnitSymbols.degreeCelsius,
        "K"
      );
    }

    if (area <= 0) {
      return createErrorResult(
        messages.areaPositive,
        calculatorUnitSymbols.degreeCelsius,
        "K"
      );
    }

    if (length <= 0) {
      return createErrorResult(
        messages.lengthPositive,
        calculatorUnitSymbols.degreeCelsius,
        "K"
      );
    }

    const powerInSI = convertPowerToSI(power, powerUnit);
    const conductivityInSI = convertThermalConductivityToSI(
      thermalConductivity,
      thermalConductivityUnit
    );
    const areaInSI = convertCalculatorAreaToSI(area, areaUnit);
    const lengthInSI = convertCalculatorLengthToSI(length, lengthUnit);
    const deltaTInSI = (powerInSI * lengthInSI) / (conductivityInSI * areaInSI);
    const resultValue = convertTemperatureDifferenceFromSI(
      deltaTInSI,
      calculatorUnitSymbols.degreeCelsius
    );

    return {
      error: null,
      resultValue,
      resultDisplay: formatUzValue(resultValue),
      resultUnit: calculatorUnitSymbols.degreeCelsius,
      siValue: deltaTInSI,
      siUnit: "K",
      formulaDisplay:
        `ΔT = Q̇ × L / (k × A)\n` +
        `ΔT = ${formatUzValue(power)} ${powerUnit} × ${formatUzValue(length)} ${lengthUnit} / (${formatUzValue(thermalConductivity)} ${thermalConductivityUnit} × ${formatUzValue(area)} ${areaUnit})\n` +
        `ΔT = ${formatUzValue(resultValue)} ${calculatorUnitSymbols.degreeCelsius}`,
    };
  }

  if (power === null || thermalConductivity === null || area === null || temperatureDifference === null) {
    return createErrorResult(messages.missing, "m", "m");
  }

  if (thermalConductivity <= 0) {
    return createErrorResult(messages.conductivityPositive, "m", "m");
  }

  if (area <= 0) {
    return createErrorResult(messages.areaPositive, "m", "m");
  }

  if (power === 0) {
    return createErrorResult(messages.powerNonZero, "m", "m");
  }

  const powerInSI = convertPowerToSI(power, powerUnit);
  const conductivityInSI = convertThermalConductivityToSI(
    thermalConductivity,
    thermalConductivityUnit
  );
  const areaInSI = convertCalculatorAreaToSI(area, areaUnit);
  const deltaTInSI = convertTemperatureDifferenceToSI(
    temperatureDifference,
    temperatureDifferenceUnit
  );
  const lengthInSI = (conductivityInSI * areaInSI * deltaTInSI) / powerInSI;

  if (lengthInSI <= 0) {
    return createErrorResult(messages.nonPhysicalLength, "m", "m");
  }

  const resultUnit = inferCalculatorLengthUnit(lengthInSI);
  const resultValue = convertCalculatorLengthFromSI(lengthInSI, resultUnit);

  return {
    error: null,
    resultValue,
    resultDisplay: formatUzValue(resultValue),
    resultUnit,
    siValue: lengthInSI,
    siUnit: "m",
    formulaDisplay:
      `L = k × A × ΔT / Q̇\n` +
      `L = ${formatUzValue(thermalConductivity)} ${thermalConductivityUnit} × ${formatUzValue(area)} ${areaUnit} × ${formatUzValue(temperatureDifference)} ${temperatureDifferenceUnit} / ${formatUzValue(power)} ${powerUnit}\n` +
      `L = ${formatUzValue(resultValue)} ${resultUnit}`,
  };
}

export type ConductivityPresetUz = {
  id: string;
  label: string;
  value: string;
};

export const conductivityPresetsUz: ConductivityPresetUz[] = [
  { id: "custom", label: "O'zgacha qiymat", value: "" },
  { id: "copper", label: "Mis", value: "401" },
  { id: "aluminum", label: "Alyuminiy", value: "205" },
  { id: "steel", label: "Po'lat", value: "50" },
  { id: "glass", label: "Shisha", value: "1.05" },
  { id: "concrete", label: "Beton", value: "1.4" },
  { id: "wood", label: "Yog'och", value: "0.13" },
  { id: "air", label: "Havo", value: "0.026" },
  { id: "glassWool", label: "Shisha Jun", value: "0.035" },
  { id: "rockWool", label: "Tosh Jun", value: "0.04" },
  { id: "eps", label: "EPS (Kengaytirilgan Polistirol)", value: "0.038" },
  { id: "xps", label: "XPS (Ekstrudirlangan Polistirol)", value: "0.035" },
  { id: "pur", label: "Poliuretan Ko'pik (PUR)", value: "0.028" },
];
