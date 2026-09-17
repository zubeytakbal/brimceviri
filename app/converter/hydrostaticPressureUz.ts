import {
  convertDensityFromSI,
  convertDensityToSI,
  convertDepthFromSI,
  convertDepthToSI,
  convertGravityToSI,
  KILOGRAM_PER_CUBIC_METRE_UNIT,
  METRE_PER_SECOND_SQUARED_UNIT,
  convertPressureFromSI,
  convertPressureToSI,
  type DensityUnit,
  type DepthUnit,
  type GravityUnit,
  type PressureUnit,
} from "./engineeringUnits";
import { parseCalculatorNumber } from "./pressureForceArea";
import { formatUzValue } from "./pressureForceAreaUz";

export type HydrostaticTargetUz = "pressure" | "density" | "depth" | "gravity";

export type HydrostaticPressureUzInput = {
  target: HydrostaticTargetUz;
  pressureValue: string;
  pressureUnit: PressureUnit;
  densityValue: string;
  densityUnit: DensityUnit;
  gravityValue: string;
  gravityUnit: GravityUnit;
  depthValue: string;
  depthUnit: DepthUnit;
  includeSurfacePressure: boolean;
  surfacePressureValue: string;
  surfacePressureUnit: PressureUnit;
};

export type HydrostaticSecondaryResultUz = {
  label: string;
  value: number;
  display: string;
  unit: string;
  siValue: number;
  siDisplay: string;
  siUnit: string;
};

export type HydrostaticPressureUzResult = {
  error: string | null;
  resultValue: number | null;
  resultDisplay: string;
  resultUnit: string;
  siValue: number | null;
  siValueDisplay: string;
  siUnit: string;
  formulaDisplay: string;
  secondaryResult: HydrostaticSecondaryResultUz | null;
};

const messages = {
  missing: "Hisoblash uchun kerakli uchta qiymatni kiriting.",
  invalid: "To'g'ri raqamli qiymatlar kiriting.",
  densityPositive: "Zichlik noldan katta bo'lishi kerak.",
  gravityPositive: "Tortishish tezlanishi noldan katta bo'lishi kerak.",
  depthPositive: "Chuqurlik noldan katta bo'lishi kerak.",
  pressureNonZero: "Bosim farqi nolga teng bo'lganda teskari hisoblash bajarilmaydi.",
  absolutePressure: "Mutlaq bosim",
};

const densitySiUnit = KILOGRAM_PER_CUBIC_METRE_UNIT;
const gravitySiUnit = METRE_PER_SECOND_SQUARED_UNIT;

function createErrorResult(
  error: string,
  resultUnit: string,
  siUnit: string
): HydrostaticPressureUzResult {
  return {
    error,
    resultValue: null,
    resultDisplay: "",
    resultUnit,
    siValue: null,
    siValueDisplay: "",
    siUnit,
    formulaDisplay: "",
    secondaryResult: null,
  };
}

function chooseHydrostaticPressureUnit(valueInPa: number): PressureUnit {
  const magnitude = Math.abs(valueInPa);

  if (magnitude < 1e3) {
    return "Pa";
  }

  if (magnitude < 1e6) {
    return "kPa";
  }

  if (magnitude < 1e9) {
    return "MPa";
  }

  return "GPa";
}

export function solveHydrostaticPressureUz({
  target,
  pressureValue,
  pressureUnit,
  densityValue,
  densityUnit,
  gravityValue,
  gravityUnit,
  depthValue,
  depthUnit,
  includeSurfacePressure,
  surfacePressureValue,
  surfacePressureUnit,
}: HydrostaticPressureUzInput): HydrostaticPressureUzResult {
  const pressure = parseCalculatorNumber(pressureValue);
  const density = parseCalculatorNumber(densityValue);
  const gravity = parseCalculatorNumber(gravityValue);
  const depth = parseCalculatorNumber(depthValue);
  const surfacePressure = parseCalculatorNumber(surfacePressureValue);

  const rawValues = [
    pressureValue,
    densityValue,
    gravityValue,
    depthValue,
    surfacePressureValue,
  ];
  const parsedValues = [pressure, density, gravity, depth, surfacePressure];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return createErrorResult(messages.invalid, "Pa", "Pa");
  }

  if (target === "pressure") {
    if (density === null || gravity === null || depth === null) {
      return createErrorResult(messages.missing, "Pa", "Pa");
    }

    if (density <= 0) {
      return createErrorResult(messages.densityPositive, "Pa", "Pa");
    }

    if (gravity <= 0) {
      return createErrorResult(messages.gravityPositive, "Pa", "Pa");
    }

    if (depth <= 0) {
      return createErrorResult(messages.depthPositive, "Pa", "Pa");
    }

    const densityInSI = convertDensityToSI(density, densityUnit);
    const gravityInSI = convertGravityToSI(gravity, gravityUnit);
    const depthInSI = convertDepthToSI(depth, depthUnit);
    const deltaPressureInPa = densityInSI * gravityInSI * depthInSI;
    const deltaUnit = chooseHydrostaticPressureUnit(deltaPressureInPa);
    const deltaDisplayValue = convertPressureFromSI(deltaPressureInPa, deltaUnit);

    const secondaryResult =
      includeSurfacePressure && surfacePressure !== null
        ? (() => {
            const absolutePressureInPa =
              convertPressureToSI(surfacePressure, surfacePressureUnit) +
              deltaPressureInPa;
            const absoluteUnit = chooseHydrostaticPressureUnit(absolutePressureInPa);
            const absoluteDisplayValue = convertPressureFromSI(
              absolutePressureInPa,
              absoluteUnit
            );

            return {
              label: messages.absolutePressure,
              value: absoluteDisplayValue,
              display: formatUzValue(absoluteDisplayValue),
              unit: absoluteUnit,
              siValue: absolutePressureInPa,
              siDisplay: formatUzValue(absolutePressureInPa),
              siUnit: "Pa",
            };
          })()
        : null;

    return {
      error: null,
      resultValue: deltaDisplayValue,
      resultDisplay: formatUzValue(deltaDisplayValue),
      resultUnit: deltaUnit,
      siValue: deltaPressureInPa,
      siValueDisplay: formatUzValue(deltaPressureInPa),
      siUnit: "Pa",
      formulaDisplay:
        `ΔP = ρ × g × h\n` +
        `ΔP = ${formatUzValue(density)} ${densityUnit} × ${formatUzValue(gravity)} ${gravityUnit} × ${formatUzValue(depth)} ${depthUnit}\n` +
        `ΔP = ${formatUzValue(deltaDisplayValue)} ${deltaUnit}` +
        (secondaryResult
          ? `\nP_mutlaq = ${formatUzValue(surfacePressure ?? 0)} ${surfacePressureUnit} + ${formatUzValue(deltaDisplayValue)} ${deltaUnit}\nP_mutlaq = ${secondaryResult.display} ${secondaryResult.unit}`
          : ""),
      secondaryResult,
    };
  }

  if (target === "density") {
    if (pressure === null || gravity === null || depth === null) {
      return createErrorResult(messages.missing, densitySiUnit, densitySiUnit);
    }

    if (gravity <= 0) {
      return createErrorResult(messages.gravityPositive, densitySiUnit, densitySiUnit);
    }

    if (depth <= 0) {
      return createErrorResult(messages.depthPositive, densitySiUnit, densitySiUnit);
    }

    const pressureInPa = convertPressureToSI(pressure, pressureUnit);

    if (pressureInPa === 0) {
      return createErrorResult(messages.pressureNonZero, densitySiUnit, densitySiUnit);
    }

    const gravityInSI = convertGravityToSI(gravity, gravityUnit);
    const depthInSI = convertDepthToSI(depth, depthUnit);
    const densityInSI = pressureInPa / (gravityInSI * depthInSI);
    const densityDisplayValue = convertDensityFromSI(densityInSI, densitySiUnit);

    return {
      error: null,
      resultValue: densityDisplayValue,
      resultDisplay: formatUzValue(densityDisplayValue),
      resultUnit: densitySiUnit,
      siValue: densityInSI,
      siValueDisplay: formatUzValue(densityInSI),
      siUnit: densitySiUnit,
      formulaDisplay:
        `ρ = ΔP / (g × h)\n` +
        `ρ = ${formatUzValue(pressure)} ${pressureUnit} / (${formatUzValue(gravity)} ${gravityUnit} × ${formatUzValue(depth)} ${depthUnit})\n` +
        `ρ = ${formatUzValue(densityDisplayValue)} ${densitySiUnit}`,
      secondaryResult: null,
    };
  }

  if (target === "depth") {
    if (pressure === null || density === null || gravity === null) {
      return createErrorResult(messages.missing, "m", "m");
    }

    if (density <= 0) {
      return createErrorResult(messages.densityPositive, "m", "m");
    }

    if (gravity <= 0) {
      return createErrorResult(messages.gravityPositive, "m", "m");
    }

    const pressureInPa = convertPressureToSI(pressure, pressureUnit);

    if (pressureInPa === 0) {
      return createErrorResult(messages.pressureNonZero, "m", "m");
    }

    const densityInSI = convertDensityToSI(density, densityUnit);
    const gravityInSI = convertGravityToSI(gravity, gravityUnit);
    const depthInSI = pressureInPa / (densityInSI * gravityInSI);
    const depthDisplayValue = convertDepthFromSI(depthInSI, "m");

    return {
      error: null,
      resultValue: depthDisplayValue,
      resultDisplay: formatUzValue(depthDisplayValue),
      resultUnit: "m",
      siValue: depthInSI,
      siValueDisplay: formatUzValue(depthInSI),
      siUnit: "m",
      formulaDisplay:
        `h = ΔP / (ρ × g)\n` +
        `h = ${formatUzValue(pressure)} ${pressureUnit} / (${formatUzValue(density)} ${densityUnit} × ${formatUzValue(gravity)} ${gravityUnit})\n` +
        `h = ${formatUzValue(depthDisplayValue)} m`,
      secondaryResult: null,
    };
  }

  if (pressure === null || density === null || depth === null) {
    return createErrorResult(messages.missing, gravitySiUnit, gravitySiUnit);
  }

  if (density <= 0) {
    return createErrorResult(messages.densityPositive, gravitySiUnit, gravitySiUnit);
  }

  if (depth <= 0) {
    return createErrorResult(messages.depthPositive, gravitySiUnit, gravitySiUnit);
  }

  const pressureInPa = convertPressureToSI(pressure, pressureUnit);

  if (pressureInPa === 0) {
    return createErrorResult(messages.pressureNonZero, gravitySiUnit, gravitySiUnit);
  }

  const densityInSI = convertDensityToSI(density, densityUnit);
  const depthInSI = convertDepthToSI(depth, depthUnit);
  const gravityInSI = pressureInPa / (densityInSI * depthInSI);

  return {
    error: null,
    resultValue: gravityInSI,
    resultDisplay: formatUzValue(gravityInSI),
    resultUnit: gravitySiUnit,
    siValue: gravityInSI,
    siValueDisplay: formatUzValue(gravityInSI),
    siUnit: gravitySiUnit,
    formulaDisplay:
      `g = ΔP / (ρ × h)\n` +
      `g = ${formatUzValue(pressure)} ${pressureUnit} / (${formatUzValue(density)} ${densityUnit} × ${formatUzValue(depth)} ${depthUnit})\n` +
      `g = ${formatUzValue(gravityInSI)} ${gravitySiUnit}`,
    secondaryResult: null,
  };
}
