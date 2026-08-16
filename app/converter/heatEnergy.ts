import {
  calculatorUnitSymbols,
  convertCalculatorMassFromSI,
  convertCalculatorMassToSI,
  convertHeatEnergyFromSI,
  convertHeatEnergyToSI,
  convertSpecificHeatFromSI,
  convertSpecificHeatToSI,
  convertTemperatureDifferenceFromSI,
  convertTemperatureDifferenceToSI,
  inferCalculatorMassUnit,
  inferHeatEnergyUnit,
  inferSpecificHeatUnit,
  type CalculatorMassUnit,
  type HeatEnergyUnit,
  type SpecificHeatUnit,
  type TemperatureDifferenceUnit,
} from "./engineeringCalculatorUnits";
import {
  formatEngineeringValue,
  parseCalculatorNumber,
  type CalculatorLocale,
} from "./pressureForceArea";

export type HeatEnergyTarget =
  | "energy"
  | "mass"
  | "specificHeat"
  | "temperatureDifference";

export type HeatEnergyInput = {
  target: HeatEnergyTarget;
  energyValue: string;
  energyUnit: HeatEnergyUnit;
  massValue: string;
  massUnit: CalculatorMassUnit;
  specificHeatValue: string;
  specificHeatUnit: SpecificHeatUnit;
  temperatureDifferenceValue: string;
  temperatureDifferenceUnit: TemperatureDifferenceUnit;
  locale: CalculatorLocale;
};

export type HeatEnergyResult = {
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
    missing: "Hesaplama için gerekli üç değeri girin.",
    invalid: "Geçerli sayısal değerler girin.",
    massPositive: "Kütle sıfırdan büyük olmalıdır.",
    specificHeatPositive:
      "Özgül ısı sıfırdan büyük olmalıdır.",
    temperatureDifferenceNonZero:
      "Ters hesaplama için sıcaklık farkı sıfır olamaz.",
    nonPhysicalMass:
      "Bu girdiler fiziksel olarak anlamlı bir kütle üretmiyor.",
    nonPhysicalSpecificHeat:
      "Bu girdiler fiziksel olarak anlamlı bir özgül ısı üretmiyor.",
  },
  en: {
    missing: "Enter the three values required for the calculation.",
    invalid: "Enter valid numeric values.",
    massPositive: "Mass must be greater than zero.",
    specificHeatPositive:
      "Specific heat must be greater than zero.",
    temperatureDifferenceNonZero:
      "A reverse calculation requires a non-zero temperature difference.",
    nonPhysicalMass:
      "These inputs do not produce a physically meaningful mass.",
    nonPhysicalSpecificHeat:
      "These inputs do not produce a physically meaningful specific heat.",
  },
  de: {
    missing:
      "Geben Sie die drei für die Berechnung erforderlichen Werte ein.",
    invalid: "Geben Sie gültige numerische Werte ein.",
    massPositive: "Die Masse muss größer als null sein.",
    specificHeatPositive:
      "Die spezifische Wärmekapazität muss größer als null sein.",
    temperatureDifferenceNonZero:
      "Für eine Rückwärtsberechnung darf die Temperaturdifferenz nicht null sein.",
    nonPhysicalMass:
      "Diese Eingaben ergeben keine physikalisch sinnvolle Masse.",
    nonPhysicalSpecificHeat:
      "Diese Eingaben ergeben keine physikalisch sinnvolle spezifische Wärmekapazität.",
  },
} as const;

function createErrorResult(
  error: string,
  resultUnit: string,
  siUnit: string
): HeatEnergyResult {
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

export function solveHeatEnergy({
  target,
  energyValue,
  energyUnit,
  massValue,
  massUnit,
  specificHeatValue,
  specificHeatUnit,
  temperatureDifferenceValue,
  temperatureDifferenceUnit,
  locale,
}: HeatEnergyInput): HeatEnergyResult {
  const strings = messages[locale];
  const energy = parseCalculatorNumber(energyValue);
  const mass = parseCalculatorNumber(massValue);
  const specificHeat = parseCalculatorNumber(
    specificHeatValue
  );
  const temperatureDifference = parseCalculatorNumber(
    temperatureDifferenceValue
  );
  const rawValues = [
    energyValue,
    massValue,
    specificHeatValue,
    temperatureDifferenceValue,
  ];
  const parsedValues = [
    energy,
    mass,
    specificHeat,
    temperatureDifference,
  ];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return createErrorResult(strings.invalid, "J", "J");
  }

  if (target === "energy") {
    if (
      mass === null ||
      specificHeat === null ||
      temperatureDifference === null
    ) {
      return createErrorResult(strings.missing, "J", "J");
    }

    if (mass <= 0) {
      return createErrorResult(
        strings.massPositive,
        "J",
        "J"
      );
    }

    if (specificHeat <= 0) {
      return createErrorResult(
        strings.specificHeatPositive,
        "J",
        "J"
      );
    }

    const massInSI = convertCalculatorMassToSI(mass, massUnit);
    const specificHeatInSI = convertSpecificHeatToSI(
      specificHeat,
      specificHeatUnit
    );
    const deltaTInSI = convertTemperatureDifferenceToSI(
      temperatureDifference,
      temperatureDifferenceUnit
    );
    const energyInSI =
      massInSI * specificHeatInSI * deltaTInSI;
    const resultUnit = inferHeatEnergyUnit(energyInSI);
    const resultValue = convertHeatEnergyFromSI(
      energyInSI,
      resultUnit
    );

    return {
      error: null,
      resultValue,
      resultDisplay: formatValue(resultValue, locale),
      resultUnit,
      siValue: energyInSI,
      siUnit: "J",
      formulaDisplay:
        `Q = m × c × ΔT\n` +
        `Q = ${formatValue(mass, locale)} ${massUnit} × ` +
        `${formatValue(specificHeat, locale)} ${specificHeatUnit} × ` +
        `${formatValue(temperatureDifference, locale)} ${temperatureDifferenceUnit}\n` +
        `Q = ${formatValue(resultValue, locale)} ${resultUnit}`,
    };
  }

  if (target === "mass") {
    if (
      energy === null ||
      specificHeat === null ||
      temperatureDifference === null
    ) {
      return createErrorResult(strings.missing, "kg", "kg");
    }

    if (specificHeat <= 0) {
      return createErrorResult(
        strings.specificHeatPositive,
        "kg",
        "kg"
      );
    }

    if (temperatureDifference === 0) {
      return createErrorResult(
        strings.temperatureDifferenceNonZero,
        "kg",
        "kg"
      );
    }

    const energyInSI = convertHeatEnergyToSI(energy, energyUnit);
    const specificHeatInSI = convertSpecificHeatToSI(
      specificHeat,
      specificHeatUnit
    );
    const deltaTInSI = convertTemperatureDifferenceToSI(
      temperatureDifference,
      temperatureDifferenceUnit
    );
    const massInSI =
      energyInSI / (specificHeatInSI * deltaTInSI);

    if (massInSI <= 0) {
      return createErrorResult(
        strings.nonPhysicalMass,
        "kg",
        "kg"
      );
    }

    const resultUnit = inferCalculatorMassUnit(massInSI);
    const resultValue = convertCalculatorMassFromSI(
      massInSI,
      resultUnit
    );

    return {
      error: null,
      resultValue,
      resultDisplay: formatValue(resultValue, locale),
      resultUnit,
      siValue: massInSI,
      siUnit: "kg",
      formulaDisplay:
        `m = Q / (c × ΔT)\n` +
        `m = ${formatValue(energy, locale)} ${energyUnit} / (` +
        `${formatValue(specificHeat, locale)} ${specificHeatUnit} × ` +
        `${formatValue(temperatureDifference, locale)} ${temperatureDifferenceUnit})\n` +
        `m = ${formatValue(resultValue, locale)} ${resultUnit}`,
    };
  }

  if (target === "specificHeat") {
    if (
      energy === null ||
      mass === null ||
      temperatureDifference === null
    ) {
      return createErrorResult(
        strings.missing,
        calculatorUnitSymbols.joulePerKilogramKelvin,
        calculatorUnitSymbols.joulePerKilogramKelvin
      );
    }

    if (mass <= 0) {
      return createErrorResult(
        strings.massPositive,
        calculatorUnitSymbols.joulePerKilogramKelvin,
        calculatorUnitSymbols.joulePerKilogramKelvin
      );
    }

    if (temperatureDifference === 0) {
      return createErrorResult(
        strings.temperatureDifferenceNonZero,
        calculatorUnitSymbols.joulePerKilogramKelvin,
        calculatorUnitSymbols.joulePerKilogramKelvin
      );
    }

    const energyInSI = convertHeatEnergyToSI(energy, energyUnit);
    const massInSI = convertCalculatorMassToSI(mass, massUnit);
    const deltaTInSI = convertTemperatureDifferenceToSI(
      temperatureDifference,
      temperatureDifferenceUnit
    );
    const specificHeatInSI =
      energyInSI / (massInSI * deltaTInSI);

    if (specificHeatInSI <= 0) {
      return createErrorResult(
        strings.nonPhysicalSpecificHeat,
        calculatorUnitSymbols.joulePerKilogramKelvin,
        calculatorUnitSymbols.joulePerKilogramKelvin
      );
    }

    const resultUnit = inferSpecificHeatUnit(specificHeatInSI);
    const resultValue = convertSpecificHeatFromSI(
      specificHeatInSI,
      resultUnit
    );

    return {
      error: null,
      resultValue,
      resultDisplay: formatValue(resultValue, locale),
      resultUnit,
      siValue: specificHeatInSI,
      siUnit: calculatorUnitSymbols.joulePerKilogramKelvin,
      formulaDisplay:
        `c = Q / (m × ΔT)\n` +
        `c = ${formatValue(energy, locale)} ${energyUnit} / (` +
        `${formatValue(mass, locale)} ${massUnit} × ` +
        `${formatValue(temperatureDifference, locale)} ${temperatureDifferenceUnit})\n` +
        `c = ${formatValue(resultValue, locale)} ${resultUnit}`,
    };
  }

  if (
    energy === null ||
    mass === null ||
    specificHeat === null
  ) {
    return createErrorResult(
      strings.missing,
      calculatorUnitSymbols.degreeCelsius,
      "K"
    );
  }

  if (mass <= 0) {
    return createErrorResult(
      strings.massPositive,
      calculatorUnitSymbols.degreeCelsius,
      "K"
    );
  }

  if (specificHeat <= 0) {
    return createErrorResult(
      strings.specificHeatPositive,
      calculatorUnitSymbols.degreeCelsius,
      "K"
    );
  }

  const energyInSI = convertHeatEnergyToSI(energy, energyUnit);
  const massInSI = convertCalculatorMassToSI(mass, massUnit);
  const specificHeatInSI = convertSpecificHeatToSI(
    specificHeat,
    specificHeatUnit
  );
  const deltaTInSI = energyInSI / (massInSI * specificHeatInSI);
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
      `ΔT = Q / (m × c)\n` +
      `ΔT = ${formatValue(energy, locale)} ${energyUnit} / (` +
      `${formatValue(mass, locale)} ${massUnit} × ` +
      `${formatValue(specificHeat, locale)} ${specificHeatUnit})\n` +
      `ΔT = ${formatValue(resultValue, locale)} ${calculatorUnitSymbols.degreeCelsius}`,
  };
}
