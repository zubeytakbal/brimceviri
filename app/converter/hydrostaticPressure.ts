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
import {
  formatEngineeringValue,
  parseCalculatorNumber,
  type CalculatorLocale,
} from "./pressureForceArea";

export type HydrostaticTarget =
  | "pressure"
  | "density"
  | "depth"
  | "gravity";

export type HydrostaticPressureInput = {
  target: HydrostaticTarget;
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
  locale: CalculatorLocale;
};

export type HydrostaticSecondaryResult = {
  label: string;
  value: number;
  display: string;
  unit: string;
  siValue: number;
  siDisplay: string;
  siUnit: string;
};

export type HydrostaticPressureResult = {
  error: string | null;
  resultValue: number | null;
  resultDisplay: string;
  resultUnit: string;
  siValue: number | null;
  siValueDisplay: string;
  siUnit: string;
  formulaDisplay: string;
  secondaryResult: HydrostaticSecondaryResult | null;
};

const hydrostaticMessages = {
  tr: {
    missing: "Hesaplama için gerekli üç değeri girin.",
    invalid: "Geçerli sayısal değerler girin.",
    densityPositive: "Yoğunluk sıfırdan büyük olmalıdır.",
    gravityPositive: "Yerçekimi ivmesi sıfırdan büyük olmalıdır.",
    depthPositive: "Derinlik sıfırdan büyük olmalıdır.",
    pressureNonZero:
      "Basınç farkı sıfır olduğunda ters hesaplama yapılamaz.",
    absolutePressure: "Mutlak basınç",
  },
  en: {
    missing: "Enter the three values required for the calculation.",
    invalid: "Enter valid numeric values.",
    densityPositive: "Density must be greater than zero.",
    gravityPositive:
      "Gravitational acceleration must be greater than zero.",
    depthPositive: "Depth must be greater than zero.",
    pressureNonZero:
      "Reverse calculations require a non-zero pressure difference.",
    absolutePressure: "Absolute pressure",
  },
  de: {
    missing:
      "Geben Sie die drei für die Berechnung erforderlichen Werte ein.",
    invalid: "Geben Sie gültige numerische Werte ein.",
    densityPositive: "Die Dichte muss größer als null sein.",
    gravityPositive:
      "Die Erdbeschleunigung muss größer als null sein.",
    depthPositive: "Die Tiefe muss größer als null sein.",
    pressureNonZero:
      "Bei einer Druckdifferenz von null ist keine Rückwärtsberechnung möglich.",
    absolutePressure: "Absoluter Druck",
  },
} as const;

const densitySiUnit = KILOGRAM_PER_CUBIC_METRE_UNIT;
const gravitySiUnit = METRE_PER_SECOND_SQUARED_UNIT;

function createErrorResult(
  error: string,
  resultUnit: string,
  siUnit: string
): HydrostaticPressureResult {
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

function chooseHydrostaticPressureUnit(
  valueInPa: number
): PressureUnit {
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

export function solveHydrostaticPressure({
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
  locale,
}: HydrostaticPressureInput): HydrostaticPressureResult {
  const strings = hydrostaticMessages[locale];
  const pressure = parseCalculatorNumber(pressureValue);
  const density = parseCalculatorNumber(densityValue);
  const gravity = parseCalculatorNumber(gravityValue);
  const depth = parseCalculatorNumber(depthValue);
  const surfacePressure = parseCalculatorNumber(
    surfacePressureValue
  );

  const rawValues = [
    pressureValue,
    densityValue,
    gravityValue,
    depthValue,
    surfacePressureValue,
  ];
  const parsedValues = [
    pressure,
    density,
    gravity,
    depth,
    surfacePressure,
  ];

  if (
    parsedValues.some(
      (value, index) =>
        rawValues[index].trim() && value === null
    )
  ) {
    return createErrorResult(strings.invalid, "Pa", "Pa");
  }

  if (target === "pressure") {
    if (density === null || gravity === null || depth === null) {
      return createErrorResult(strings.missing, "Pa", "Pa");
    }

    if (density <= 0) {
      return createErrorResult(
        strings.densityPositive,
        "Pa",
        "Pa"
      );
    }

    if (gravity <= 0) {
      return createErrorResult(
        strings.gravityPositive,
        "Pa",
        "Pa"
      );
    }

    if (depth <= 0) {
      return createErrorResult(
        strings.depthPositive,
        "Pa",
        "Pa"
      );
    }

    const densityInSI = convertDensityToSI(density, densityUnit);
    const gravityInSI = convertGravityToSI(gravity, gravityUnit);
    const depthInSI = convertDepthToSI(depth, depthUnit);
    const deltaPressureInPa =
      densityInSI * gravityInSI * depthInSI;
    const deltaUnit =
      chooseHydrostaticPressureUnit(deltaPressureInPa);
    const deltaDisplayValue = convertPressureFromSI(
      deltaPressureInPa,
      deltaUnit
    );

    const secondaryResult =
      includeSurfacePressure && surfacePressure !== null
        ? (() => {
            const absolutePressureInPa =
              convertPressureToSI(
                surfacePressure,
                surfacePressureUnit
              ) + deltaPressureInPa;
            const absoluteUnit =
              chooseHydrostaticPressureUnit(
                absolutePressureInPa
              );
            const absoluteDisplayValue = convertPressureFromSI(
              absolutePressureInPa,
              absoluteUnit
            );

            return {
              label: strings.absolutePressure,
              value: absoluteDisplayValue,
              display: formatEngineeringValue(
                absoluteDisplayValue,
                locale
              ),
              unit: absoluteUnit,
              siValue: absolutePressureInPa,
              siDisplay: formatEngineeringValue(
                absolutePressureInPa,
                locale
              ),
              siUnit: "Pa",
            };
          })()
        : null;

    return {
      error: null,
      resultValue: deltaDisplayValue,
      resultDisplay: formatEngineeringValue(
        deltaDisplayValue,
        locale
      ),
      resultUnit: deltaUnit,
      siValue: deltaPressureInPa,
      siValueDisplay: formatEngineeringValue(
        deltaPressureInPa,
        locale
      ),
      siUnit: "Pa",
      formulaDisplay:
        `ΔP = ρ × g × h\n` +
        `ΔP = ${formatEngineeringValue(
          density,
          locale
        )} ${densityUnit} × ${formatEngineeringValue(
          gravity,
          locale
        )} ${gravityUnit} × ${formatEngineeringValue(
          depth,
          locale
        )} ${depthUnit}\n` +
        `ΔP = ${formatEngineeringValue(
          deltaDisplayValue,
          locale
        )} ${deltaUnit}` +
        (secondaryResult
          ? `\nP_abs = ${formatEngineeringValue(
              surfacePressure ?? 0,
              locale
            )} ${surfacePressureUnit} + ${formatEngineeringValue(
              deltaDisplayValue,
              locale
            )} ${deltaUnit}\nP_abs = ${secondaryResult.display} ${secondaryResult.unit}`
          : ""),
      secondaryResult,
    };
  }

  if (target === "density") {
    if (pressure === null || gravity === null || depth === null) {
      return createErrorResult(
        strings.missing,
        densitySiUnit,
        densitySiUnit
      );
    }

    if (gravity <= 0) {
      return createErrorResult(
        strings.gravityPositive,
        densitySiUnit,
        densitySiUnit
      );
    }

    if (depth <= 0) {
      return createErrorResult(
        strings.depthPositive,
        densitySiUnit,
        densitySiUnit
      );
    }

    const pressureInPa = convertPressureToSI(
      pressure,
      pressureUnit
    );

    if (pressureInPa === 0) {
      return createErrorResult(
        strings.pressureNonZero,
        densitySiUnit,
        densitySiUnit
      );
    }

    const gravityInSI = convertGravityToSI(gravity, gravityUnit);
    const depthInSI = convertDepthToSI(depth, depthUnit);
    const densityInSI =
      pressureInPa / (gravityInSI * depthInSI);
    const densityDisplayValue = convertDensityFromSI(
      densityInSI,
      densitySiUnit
    );

    return {
      error: null,
      resultValue: densityDisplayValue,
      resultDisplay: formatEngineeringValue(
        densityDisplayValue,
        locale
      ),
      resultUnit: densitySiUnit,
      siValue: densityInSI,
      siValueDisplay: formatEngineeringValue(
        densityInSI,
        locale
      ),
      siUnit: densitySiUnit,
      formulaDisplay:
        `ρ = ΔP / (g × h)\n` +
        `ρ = ${formatEngineeringValue(
          pressure,
          locale
        )} ${pressureUnit} / (${formatEngineeringValue(
          gravity,
          locale
        )} ${gravityUnit} × ${formatEngineeringValue(
          depth,
          locale
        )} ${depthUnit})\n` +
        `ρ = ${formatEngineeringValue(
          densityDisplayValue,
          locale
        )} ${densitySiUnit}`,
      secondaryResult: null,
    };
  }

  if (target === "depth") {
    if (
      pressure === null ||
      density === null ||
      gravity === null
    ) {
      return createErrorResult(strings.missing, "m", "m");
    }

    if (density <= 0) {
      return createErrorResult(strings.densityPositive, "m", "m");
    }

    if (gravity <= 0) {
      return createErrorResult(strings.gravityPositive, "m", "m");
    }

    const pressureInPa = convertPressureToSI(
      pressure,
      pressureUnit
    );

    if (pressureInPa === 0) {
      return createErrorResult(strings.pressureNonZero, "m", "m");
    }

    const densityInSI = convertDensityToSI(density, densityUnit);
    const gravityInSI = convertGravityToSI(gravity, gravityUnit);
    const depthInSI = pressureInPa / (densityInSI * gravityInSI);
    const depthDisplayValue = convertDepthFromSI(
      depthInSI,
      "m"
    );

    return {
      error: null,
      resultValue: depthDisplayValue,
      resultDisplay: formatEngineeringValue(
        depthDisplayValue,
        locale
      ),
      resultUnit: "m",
      siValue: depthInSI,
      siValueDisplay: formatEngineeringValue(depthInSI, locale),
      siUnit: "m",
      formulaDisplay:
        `h = ΔP / (ρ × g)\n` +
        `h = ${formatEngineeringValue(
          pressure,
          locale
        )} ${pressureUnit} / (${formatEngineeringValue(
          density,
          locale
        )} ${densityUnit} × ${formatEngineeringValue(
          gravity,
          locale
        )} ${gravityUnit})\n` +
        `h = ${formatEngineeringValue(
          depthDisplayValue,
          locale
        )} m`,
      secondaryResult: null,
    };
  }

  if (
    pressure === null ||
    density === null ||
    depth === null
  ) {
    return createErrorResult(
      strings.missing,
      gravitySiUnit,
      gravitySiUnit
    );
  }

  if (density <= 0) {
    return createErrorResult(
      strings.densityPositive,
      gravitySiUnit,
      gravitySiUnit
    );
  }

  if (depth <= 0) {
    return createErrorResult(
      strings.depthPositive,
      gravitySiUnit,
      gravitySiUnit
    );
  }

  const pressureInPa = convertPressureToSI(pressure, pressureUnit);

  if (pressureInPa === 0) {
    return createErrorResult(
      strings.pressureNonZero,
      gravitySiUnit,
      gravitySiUnit
    );
  }

  const densityInSI = convertDensityToSI(density, densityUnit);
  const depthInSI = convertDepthToSI(depth, depthUnit);
  const gravityInSI = pressureInPa / (densityInSI * depthInSI);

  return {
    error: null,
    resultValue: gravityInSI,
    resultDisplay: formatEngineeringValue(gravityInSI, locale),
    resultUnit: gravitySiUnit,
    siValue: gravityInSI,
    siValueDisplay: formatEngineeringValue(gravityInSI, locale),
    siUnit: gravitySiUnit,
    formulaDisplay:
      `g = ΔP / (ρ × h)\n` +
      `g = ${formatEngineeringValue(
        pressure,
        locale
      )} ${pressureUnit} / (${formatEngineeringValue(
        density,
        locale
      )} ${densityUnit} × ${formatEngineeringValue(
        depth,
        locale
      )} ${depthUnit})\n` +
      `g = ${formatEngineeringValue(
        gravityInSI,
        locale
      )} ${gravitySiUnit}`,
    secondaryResult: null,
  };
}
