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
import {
  formatEngineeringValue,
  parseCalculatorNumber,
  type CalculatorLocale,
} from "./pressureForceArea";

export type HeatConductionTarget =
  | "power"
  | "thermalConductivity"
  | "area"
  | "temperatureDifference"
  | "length";

export type HeatConductionInput = {
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
  locale: CalculatorLocale;
};

export type HeatConductionResult = {
  error: string | null;
  resultValue: number | null;
  resultDisplay: string;
  resultUnit: string;
  siValue: number | null;
  siUnit: string;
  formulaDisplay: string;
};

const messages = {
  tr: {
    missing: "Hesaplama için gerekli dört değeri girin.",
    invalid: "Geçerli sayısal değerler girin.",
    conductivityPositive:
      "Isıl iletkenlik sıfırdan büyük olmalıdır.",
    areaPositive: "Alan sıfırdan büyük olmalıdır.",
    lengthPositive: "Kalınlık sıfırdan büyük olmalıdır.",
    temperatureDifferenceNonZero:
      "Ters hesaplama için sıcaklık farkı sıfır olamaz.",
    powerNonZero:
      "Kalınlık hesabı için ısı geçiş hızı sıfır olamaz.",
    nonPhysicalConductivity:
      "Bu girdiler fiziksel olarak anlamlı bir iletkenlik üretmiyor.",
    nonPhysicalArea:
      "Bu girdiler fiziksel olarak anlamlı bir alan üretmiyor.",
    nonPhysicalLength:
      "Bu girdiler fiziksel olarak anlamlı bir kalınlık üretmiyor.",
  },
  en: {
    missing: "Enter the four values required for the calculation.",
    invalid: "Enter valid numeric values.",
    conductivityPositive:
      "Thermal conductivity must be greater than zero.",
    areaPositive: "Area must be greater than zero.",
    lengthPositive: "Thickness must be greater than zero.",
    temperatureDifferenceNonZero:
      "A reverse calculation requires a non-zero temperature difference.",
    powerNonZero:
      "Thickness calculations require a non-zero heat-transfer rate.",
    nonPhysicalConductivity:
      "These inputs do not produce a physically meaningful conductivity.",
    nonPhysicalArea:
      "These inputs do not produce a physically meaningful area.",
    nonPhysicalLength:
      "These inputs do not produce a physically meaningful thickness.",
  },
  de: {
    missing:
      "Geben Sie die vier für die Berechnung erforderlichen Werte ein.",
    invalid: "Geben Sie gültige numerische Werte ein.",
    conductivityPositive:
      "Die Wärmeleitfähigkeit muss größer als null sein.",
    areaPositive: "Die Fläche muss größer als null sein.",
    lengthPositive: "Die Dicke muss größer als null sein.",
    temperatureDifferenceNonZero:
      "Für eine Rückwärtsberechnung darf die Temperaturdifferenz nicht null sein.",
    powerNonZero:
      "Für die Berechnung der Dicke darf die Wärmestromrate nicht null sein.",
    nonPhysicalConductivity:
      "Diese Eingaben ergeben keine physikalisch sinnvolle Leitfähigkeit.",
    nonPhysicalArea:
      "Diese Eingaben ergeben keine physikalisch sinnvolle Fläche.",
    nonPhysicalLength:
      "Diese Eingaben ergeben keine physikalisch sinnvolle Dicke.",
  },
} as const;

function createErrorResult(
  error: string,
  resultUnit: string,
  siUnit: string
): HeatConductionResult {
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

function formatValue(
  value: number,
  locale: CalculatorLocale
) {
  return formatEngineeringValue(value, locale);
}

export function solveHeatConduction({
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
  locale,
}: HeatConductionInput): HeatConductionResult {
  const strings = messages[locale];
  const power = parseCalculatorNumber(powerValue);
  const thermalConductivity = parseCalculatorNumber(
    thermalConductivityValue
  );
  const area = parseCalculatorNumber(areaValue);
  const temperatureDifference = parseCalculatorNumber(
    temperatureDifferenceValue
  );
  const length = parseCalculatorNumber(lengthValue);
  const rawValues = [
    powerValue,
    thermalConductivityValue,
    areaValue,
    temperatureDifferenceValue,
    lengthValue,
  ];
  const parsedValues = [
    power,
    thermalConductivity,
    area,
    temperatureDifference,
    length,
  ];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return createErrorResult(strings.invalid, "W", "W");
  }

  if (target === "power") {
    if (
      thermalConductivity === null ||
      area === null ||
      temperatureDifference === null ||
      length === null
    ) {
      return createErrorResult(strings.missing, "W", "W");
    }

    if (thermalConductivity <= 0) {
      return createErrorResult(
        strings.conductivityPositive,
        "W",
        "W"
      );
    }

    if (area <= 0) {
      return createErrorResult(strings.areaPositive, "W", "W");
    }

    if (length <= 0) {
      return createErrorResult(strings.lengthPositive, "W", "W");
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
    const lengthInSI = convertCalculatorLengthToSI(
      length,
      lengthUnit
    );
    const powerInSI =
      (conductivityInSI * areaInSI * deltaTInSI) / lengthInSI;
    const resultUnit = inferPowerUnit(powerInSI);
    const resultValue = convertPowerFromSI(powerInSI, resultUnit);

    return {
      error: null,
      resultValue,
      resultDisplay: formatValue(resultValue, locale),
      resultUnit,
      siValue: powerInSI,
      siUnit: "W",
      formulaDisplay:
        `Q̇ = k × A × ΔT / L\n` +
        `Q̇ = ${formatValue(thermalConductivity, locale)} ${thermalConductivityUnit} × ` +
        `${formatValue(area, locale)} ${areaUnit} × ` +
        `${formatValue(temperatureDifference, locale)} ${temperatureDifferenceUnit} / ` +
        `${formatValue(length, locale)} ${lengthUnit}\n` +
        `Q̇ = ${formatValue(resultValue, locale)} ${resultUnit}`,
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
        strings.missing,
        calculatorUnitSymbols.wattPerMetreKelvin,
        calculatorUnitSymbols.wattPerMetreKelvin
      );
    }

    if (area <= 0) {
      return createErrorResult(
        strings.areaPositive,
        calculatorUnitSymbols.wattPerMetreKelvin,
        calculatorUnitSymbols.wattPerMetreKelvin
      );
    }

    if (length <= 0) {
      return createErrorResult(
        strings.lengthPositive,
        calculatorUnitSymbols.wattPerMetreKelvin,
        calculatorUnitSymbols.wattPerMetreKelvin
      );
    }

    if (temperatureDifference === 0) {
      return createErrorResult(
        strings.temperatureDifferenceNonZero,
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
    const lengthInSI = convertCalculatorLengthToSI(
      length,
      lengthUnit
    );
    const conductivityInSI =
      (powerInSI * lengthInSI) / (areaInSI * deltaTInSI);

    if (conductivityInSI <= 0) {
      return createErrorResult(
        strings.nonPhysicalConductivity,
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
      resultDisplay: formatValue(resultValue, locale),
      resultUnit: calculatorUnitSymbols.wattPerMetreKelvin,
      siValue: conductivityInSI,
      siUnit: calculatorUnitSymbols.wattPerMetreKelvin,
      formulaDisplay:
        `k = Q̇ × L / (A × ΔT)\n` +
        `k = ${formatValue(power, locale)} ${powerUnit} × ${formatValue(length, locale)} ${lengthUnit} / (` +
        `${formatValue(area, locale)} ${areaUnit} × ` +
        `${formatValue(temperatureDifference, locale)} ${temperatureDifferenceUnit})\n` +
        `k = ${formatValue(resultValue, locale)} ${calculatorUnitSymbols.wattPerMetreKelvin}`,
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
        strings.missing,
        calculatorUnitSymbols.squareMetre,
        calculatorUnitSymbols.squareMetre
      );
    }

    if (thermalConductivity <= 0) {
      return createErrorResult(
        strings.conductivityPositive,
        calculatorUnitSymbols.squareMetre,
        calculatorUnitSymbols.squareMetre
      );
    }

    if (length <= 0) {
      return createErrorResult(
        strings.lengthPositive,
        calculatorUnitSymbols.squareMetre,
        calculatorUnitSymbols.squareMetre
      );
    }

    if (temperatureDifference === 0) {
      return createErrorResult(
        strings.temperatureDifferenceNonZero,
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
    const lengthInSI = convertCalculatorLengthToSI(
      length,
      lengthUnit
    );
    const areaInSI =
      (powerInSI * lengthInSI) /
      (conductivityInSI * deltaTInSI);

    if (areaInSI <= 0) {
      return createErrorResult(
        strings.nonPhysicalArea,
        calculatorUnitSymbols.squareMetre,
        calculatorUnitSymbols.squareMetre
      );
    }

    const resultUnit = inferCalculatorAreaUnit(areaInSI);
    const resultValue = convertCalculatorAreaFromSI(
      areaInSI,
      resultUnit
    );

    return {
      error: null,
      resultValue,
      resultDisplay: formatValue(resultValue, locale),
      resultUnit,
      siValue: areaInSI,
      siUnit: calculatorUnitSymbols.squareMetre,
      formulaDisplay:
        `A = Q̇ × L / (k × ΔT)\n` +
        `A = ${formatValue(power, locale)} ${powerUnit} × ${formatValue(length, locale)} ${lengthUnit} / (` +
        `${formatValue(thermalConductivity, locale)} ${thermalConductivityUnit} × ` +
        `${formatValue(temperatureDifference, locale)} ${temperatureDifferenceUnit})\n` +
        `A = ${formatValue(resultValue, locale)} ${resultUnit}`,
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
        strings.missing,
        calculatorUnitSymbols.degreeCelsius,
        "K"
      );
    }

    if (thermalConductivity <= 0) {
      return createErrorResult(
        strings.conductivityPositive,
        calculatorUnitSymbols.degreeCelsius,
        "K"
      );
    }

    if (area <= 0) {
      return createErrorResult(
        strings.areaPositive,
        calculatorUnitSymbols.degreeCelsius,
        "K"
      );
    }

    if (length <= 0) {
      return createErrorResult(
        strings.lengthPositive,
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
    const lengthInSI = convertCalculatorLengthToSI(
      length,
      lengthUnit
    );
    const deltaTInSI =
      (powerInSI * lengthInSI) / (conductivityInSI * areaInSI);
    const resultValue = convertTemperatureDifferenceFromSI(
      deltaTInSI,
      calculatorUnitSymbols.degreeCelsius
    );

    return {
      error: null,
      resultValue,
      resultDisplay: formatValue(resultValue, locale),
      resultUnit: calculatorUnitSymbols.degreeCelsius,
      siValue: deltaTInSI,
      siUnit: "K",
      formulaDisplay:
        `ΔT = Q̇ × L / (k × A)\n` +
        `ΔT = ${formatValue(power, locale)} ${powerUnit} × ${formatValue(length, locale)} ${lengthUnit} / (` +
        `${formatValue(thermalConductivity, locale)} ${thermalConductivityUnit} × ` +
        `${formatValue(area, locale)} ${areaUnit})\n` +
        `ΔT = ${formatValue(resultValue, locale)} ${calculatorUnitSymbols.degreeCelsius}`,
    };
  }

  if (
    power === null ||
    thermalConductivity === null ||
    area === null ||
    temperatureDifference === null
  ) {
    return createErrorResult(
      strings.missing,
      "m",
      "m"
    );
  }

  if (thermalConductivity <= 0) {
    return createErrorResult(strings.conductivityPositive, "m", "m");
  }

  if (area <= 0) {
    return createErrorResult(strings.areaPositive, "m", "m");
  }

  if (power === 0) {
    return createErrorResult(strings.powerNonZero, "m", "m");
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
  const lengthInSI =
    (conductivityInSI * areaInSI * deltaTInSI) / powerInSI;

  if (lengthInSI <= 0) {
    return createErrorResult(strings.nonPhysicalLength, "m", "m");
  }

  const resultUnit = inferCalculatorLengthUnit(lengthInSI);
  const resultValue = convertCalculatorLengthFromSI(
    lengthInSI,
    resultUnit
  );

  return {
    error: null,
    resultValue,
    resultDisplay: formatValue(resultValue, locale),
    resultUnit,
    siValue: lengthInSI,
    siUnit: "m",
    formulaDisplay:
      `L = k × A × ΔT / Q̇\n` +
      `L = ${formatValue(thermalConductivity, locale)} ${thermalConductivityUnit} × ${formatValue(area, locale)} ${areaUnit} × ` +
      `${formatValue(temperatureDifference, locale)} ${temperatureDifferenceUnit} / ${formatValue(power, locale)} ${powerUnit}\n` +
      `L = ${formatValue(resultValue, locale)} ${resultUnit}`,
  };
}
