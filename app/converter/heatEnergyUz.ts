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
import { parseCalculatorNumber } from "./pressureForceArea";
import { formatUzValue } from "./pressureForceAreaUz";
import type { HeatEnergyTarget } from "./heatEnergy";

export type HeatEnergyUzInput = {
  target: HeatEnergyTarget;
  energyValue: string;
  energyUnit: HeatEnergyUnit;
  massValue: string;
  massUnit: CalculatorMassUnit;
  specificHeatValue: string;
  specificHeatUnit: SpecificHeatUnit;
  temperatureDifferenceValue: string;
  temperatureDifferenceUnit: TemperatureDifferenceUnit;
};

export type HeatEnergyUzResult = {
  error: string | null;
  resultValue: number | null;
  resultDisplay: string;
  resultUnit: string;
  siValue: number | null;
  siUnit: string;
  formulaDisplay: string;
};

const messages = {
  missing: "Hisoblash uchun kerakli uchta qiymatni kiriting.",
  invalid: "To'g'ri raqamli qiymatlar kiriting.",
  massPositive: "Massa noldan katta bo'lishi kerak.",
  specificHeatPositive: "Solishtirma issiqlik noldan katta bo'lishi kerak.",
  temperatureDifferenceNonZero:
    "Teskari hisoblash uchun harorat farqi nolga teng bo'lishi mumkin emas.",
  nonPhysicalMass: "Bu qiymatlar fizik jihatdan ma'noli massa bermaydi.",
  nonPhysicalSpecificHeat:
    "Bu qiymatlar fizik jihatdan ma'noli solishtirma issiqlik bermaydi.",
};

function createErrorResult(
  error: string,
  resultUnit: string,
  siUnit: string
): HeatEnergyUzResult {
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

export function solveHeatEnergyUz({
  target,
  energyValue,
  energyUnit,
  massValue,
  massUnit,
  specificHeatValue,
  specificHeatUnit,
  temperatureDifferenceValue,
  temperatureDifferenceUnit,
}: HeatEnergyUzInput): HeatEnergyUzResult {
  const energy = parseCalculatorNumber(energyValue);
  const mass = parseCalculatorNumber(massValue);
  const specificHeat = parseCalculatorNumber(specificHeatValue);
  const temperatureDifference = parseCalculatorNumber(temperatureDifferenceValue);
  const rawValues = [
    energyValue,
    massValue,
    specificHeatValue,
    temperatureDifferenceValue,
  ];
  const parsedValues = [energy, mass, specificHeat, temperatureDifference];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return createErrorResult(messages.invalid, "J", "J");
  }

  if (target === "energy") {
    if (mass === null || specificHeat === null || temperatureDifference === null) {
      return createErrorResult(messages.missing, "J", "J");
    }

    if (mass <= 0) {
      return createErrorResult(messages.massPositive, "J", "J");
    }

    if (specificHeat <= 0) {
      return createErrorResult(messages.specificHeatPositive, "J", "J");
    }

    const massInSI = convertCalculatorMassToSI(mass, massUnit);
    const specificHeatInSI = convertSpecificHeatToSI(specificHeat, specificHeatUnit);
    const deltaTInSI = convertTemperatureDifferenceToSI(
      temperatureDifference,
      temperatureDifferenceUnit
    );
    const energyInSI = massInSI * specificHeatInSI * deltaTInSI;
    const resultUnit = inferHeatEnergyUnit(energyInSI);
    const resultValue = convertHeatEnergyFromSI(energyInSI, resultUnit);

    return {
      error: null,
      resultValue,
      resultDisplay: formatUzValue(resultValue),
      resultUnit,
      siValue: energyInSI,
      siUnit: "J",
      formulaDisplay:
        `Q = m × c × ΔT\n` +
        `Q = ${formatUzValue(mass)} ${massUnit} × ${formatUzValue(specificHeat)} ${specificHeatUnit} × ${formatUzValue(temperatureDifference)} ${temperatureDifferenceUnit}\n` +
        `Q = ${formatUzValue(resultValue)} ${resultUnit}`,
    };
  }

  if (target === "mass") {
    if (energy === null || specificHeat === null || temperatureDifference === null) {
      return createErrorResult(messages.missing, "kg", "kg");
    }

    if (specificHeat <= 0) {
      return createErrorResult(messages.specificHeatPositive, "kg", "kg");
    }

    if (temperatureDifference === 0) {
      return createErrorResult(messages.temperatureDifferenceNonZero, "kg", "kg");
    }

    const energyInSI = convertHeatEnergyToSI(energy, energyUnit);
    const specificHeatInSI = convertSpecificHeatToSI(specificHeat, specificHeatUnit);
    const deltaTInSI = convertTemperatureDifferenceToSI(
      temperatureDifference,
      temperatureDifferenceUnit
    );
    const massInSI = energyInSI / (specificHeatInSI * deltaTInSI);

    if (massInSI <= 0) {
      return createErrorResult(messages.nonPhysicalMass, "kg", "kg");
    }

    const resultUnit = inferCalculatorMassUnit(massInSI);
    const resultValue = convertCalculatorMassFromSI(massInSI, resultUnit);

    return {
      error: null,
      resultValue,
      resultDisplay: formatUzValue(resultValue),
      resultUnit,
      siValue: massInSI,
      siUnit: "kg",
      formulaDisplay:
        `m = Q / (c × ΔT)\n` +
        `m = ${formatUzValue(energy)} ${energyUnit} / (${formatUzValue(specificHeat)} ${specificHeatUnit} × ${formatUzValue(temperatureDifference)} ${temperatureDifferenceUnit})\n` +
        `m = ${formatUzValue(resultValue)} ${resultUnit}`,
    };
  }

  if (target === "specificHeat") {
    if (energy === null || mass === null || temperatureDifference === null) {
      return createErrorResult(
        messages.missing,
        calculatorUnitSymbols.joulePerKilogramKelvin,
        calculatorUnitSymbols.joulePerKilogramKelvin
      );
    }

    if (mass <= 0) {
      return createErrorResult(
        messages.massPositive,
        calculatorUnitSymbols.joulePerKilogramKelvin,
        calculatorUnitSymbols.joulePerKilogramKelvin
      );
    }

    if (temperatureDifference === 0) {
      return createErrorResult(
        messages.temperatureDifferenceNonZero,
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
    const specificHeatInSI = energyInSI / (massInSI * deltaTInSI);

    if (specificHeatInSI <= 0) {
      return createErrorResult(
        messages.nonPhysicalSpecificHeat,
        calculatorUnitSymbols.joulePerKilogramKelvin,
        calculatorUnitSymbols.joulePerKilogramKelvin
      );
    }

    const resultUnit = inferSpecificHeatUnit(specificHeatInSI);
    const resultValue = convertSpecificHeatFromSI(specificHeatInSI, resultUnit);

    return {
      error: null,
      resultValue,
      resultDisplay: formatUzValue(resultValue),
      resultUnit,
      siValue: specificHeatInSI,
      siUnit: calculatorUnitSymbols.joulePerKilogramKelvin,
      formulaDisplay:
        `c = Q / (m × ΔT)\n` +
        `c = ${formatUzValue(energy)} ${energyUnit} / (${formatUzValue(mass)} ${massUnit} × ${formatUzValue(temperatureDifference)} ${temperatureDifferenceUnit})\n` +
        `c = ${formatUzValue(resultValue)} ${resultUnit}`,
    };
  }

  if (energy === null || mass === null || specificHeat === null) {
    return createErrorResult(
      messages.missing,
      calculatorUnitSymbols.degreeCelsius,
      "K"
    );
  }

  if (mass <= 0) {
    return createErrorResult(
      messages.massPositive,
      calculatorUnitSymbols.degreeCelsius,
      "K"
    );
  }

  if (specificHeat <= 0) {
    return createErrorResult(
      messages.specificHeatPositive,
      calculatorUnitSymbols.degreeCelsius,
      "K"
    );
  }

  const energyInSI = convertHeatEnergyToSI(energy, energyUnit);
  const massInSI = convertCalculatorMassToSI(mass, massUnit);
  const specificHeatInSI = convertSpecificHeatToSI(specificHeat, specificHeatUnit);
  const deltaTInSI = energyInSI / (massInSI * specificHeatInSI);
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
      `ΔT = Q / (m × c)\n` +
      `ΔT = ${formatUzValue(energy)} ${energyUnit} / (${formatUzValue(mass)} ${massUnit} × ${formatUzValue(specificHeat)} ${specificHeatUnit})\n` +
      `ΔT = ${formatUzValue(resultValue)} ${calculatorUnitSymbols.degreeCelsius}`,
  };
}
