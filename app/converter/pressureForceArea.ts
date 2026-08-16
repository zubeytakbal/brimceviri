import {
  areaUnitDefinitions,
  convertAreaFromSI,
  convertAreaToSI,
  convertForceFromSI,
  convertForceToSI,
  convertPressureFromSI,
  convertPressureToSI,
  findAreaUnit,
  findForceUnit,
  findPressureUnit,
  forceUnitDefinitions,
  inferAreaUnit,
  inferForceUnit,
  inferPressureUnit,
  pressureUnitDefinitions,
  type AreaUnit,
  type ForceUnit,
  type PressureUnit,
} from "./engineeringUnits";

export type CalculatorLocale = "tr" | "en" | "de";
export type CalculationTarget =
  | "pressure"
  | "force"
  | "area";

export type PressureForceAreaInput = {
  target: CalculationTarget;
  pressureValue: string;
  pressureUnit: PressureUnit;
  forceValue: string;
  forceUnit: ForceUnit;
  areaValue: string;
  areaUnit: AreaUnit;
  locale: CalculatorLocale;
};

export type PressureForceAreaResult = {
  error: string | null;
  resultValue: number | null;
  resultDisplay: string;
  resultUnit: PressureUnit | ForceUnit | AreaUnit;
  compositeValue: number | null;
  compositeDisplay: string;
  compositeUnit: string;
  formulaDisplay: string;
  siValue: number | null;
  siValueDisplay: string;
  siUnit: "Pa" | "N" | "m²";
};

type QuantitySymbols = {
  resultUnit: PressureUnit | ForceUnit | AreaUnit;
  compositeUnit: string;
  siUnit: "Pa" | "N" | "m²";
};

type ConsistencyCheckFailure = {
  kind: "pressure" | "force" | "area";
  pair: string;
  message: string;
};

export type ConsistencyCheckSummary = {
  total: number;
  passed: number;
  failed: ConsistencyCheckFailure[];
};

export function parseCalculatorNumber(value: string) {
  const normalizedValue = value
    .trim()
    .replace(/\s+/g, "")
    .replace(",", ".");

  if (
    !normalizedValue ||
    normalizedValue === "-" ||
    normalizedValue === "."
  ) {
    return null;
  }

  if (normalizedValue.split(".").length > 2) {
    return null;
  }

  const parsedValue = Number(normalizedValue);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

export function formatEngineeringValue(
  value: number,
  locale: CalculatorLocale
) {
  if (!Number.isFinite(value)) {
    return "";
  }

  if (
    value !== 0 &&
    (Math.abs(value) >= 1e12 ||
      Math.abs(value) < 0.000001)
  ) {
    return value.toExponential(10);
  }

  return Number(value.toPrecision(12)).toLocaleString(
    locale === "tr" ? "tr-TR" : locale === "de" ? "de-DE" : "en-US",
    {
      maximumFractionDigits: 12,
    }
  );
}

function getMessages(locale: CalculatorLocale) {
  return {
    tr: {
      missing: "Hesaplama için gerekli iki değeri girin.",
      invalid: "Geçerli sayısal değerler girin.",
      areaPositive: "Alan sıfırdan büyük olmalıdır.",
      pressureNonZero:
        "Alan hesaplamak için basınç sıfır olamaz.",
      areaResult:
        "Bu girişlerle negatif veya tanımsız alan oluşuyor.",
    },
    en: {
      missing: "Enter the two values required for the calculation.",
      invalid: "Enter valid numeric values.",
      areaPositive: "Area must be greater than zero.",
      pressureNonZero:
        "Pressure cannot be zero when solving for area.",
      areaResult:
        "These inputs would produce a negative or undefined area.",
    },
    de: {
      missing: "Geben Sie die beiden für die Berechnung nötigen Werte ein.",
      invalid: "Geben Sie gültige Zahlenwerte ein.",
      areaPositive: "Die Fläche muss größer als null sein.",
      pressureNonZero:
        "Der Druck darf beim Lösen nach der Fläche nicht null sein.",
      areaResult:
        "Diese Eingaben würden zu einer negativen oder undefinierten Fläche führen.",
    },
  }[locale];
}

function getPressureCompositeUnit(
  forceUnit: ForceUnit,
  areaUnit: AreaUnit
) {
  return `${forceUnit}/${areaUnit}`;
}

function getForceCompositeUnit(
  pressureUnit: PressureUnit,
  areaUnit: AreaUnit
) {
  return `${pressureUnit}·${areaUnit}`;
}

function getAreaCompositeUnit(
  forceUnit: ForceUnit,
  pressureUnit: PressureUnit
) {
  return `${forceUnit}/${pressureUnit}`;
}

function convertPressureToCompositeUnits(
  valueInPa: number,
  forceUnit: ForceUnit,
  areaUnit: AreaUnit
) {
  const forceFactor = findForceUnit(forceUnit)?.factorToSI ?? 1;
  const areaFactor = findAreaUnit(areaUnit)?.factorToSI ?? 1;
  return valueInPa / (forceFactor / areaFactor);
}

function convertForceToCompositeUnits(
  valueInNewton: number,
  pressureUnit: PressureUnit,
  areaUnit: AreaUnit
) {
  const pressureFactor =
    findPressureUnit(pressureUnit)?.factorToSI ?? 1;
  const areaFactor = findAreaUnit(areaUnit)?.factorToSI ?? 1;
  return valueInNewton / (pressureFactor * areaFactor);
}

function convertAreaToCompositeUnits(
  valueInSquareMetre: number,
  forceUnit: ForceUnit,
  pressureUnit: PressureUnit
) {
  const forceFactor = findForceUnit(forceUnit)?.factorToSI ?? 1;
  const pressureFactor =
    findPressureUnit(pressureUnit)?.factorToSI ?? 1;
  return valueInSquareMetre / (forceFactor / pressureFactor);
}

function createEmptyResult(
  error: string,
  symbols: QuantitySymbols
): PressureForceAreaResult {
  return {
    error,
    resultValue: null,
    resultDisplay: "",
    resultUnit: symbols.resultUnit,
    compositeValue: null,
    compositeDisplay: "",
    compositeUnit: symbols.compositeUnit,
    formulaDisplay: "",
    siValue: null,
    siValueDisplay: "",
    siUnit: symbols.siUnit,
  };
}

function createPressureResult({
  locale,
  forceValue,
  forceUnit,
  areaValue,
  areaUnit,
  resultInPa,
}: {
  locale: CalculatorLocale;
  forceValue: number;
  forceUnit: ForceUnit;
  areaValue: number;
  areaUnit: AreaUnit;
  resultInPa: number;
}): PressureForceAreaResult {
  const resultUnit = inferPressureUnit(
    forceUnit,
    areaUnit,
    resultInPa
  );
  const resultValue = convertPressureFromSI(
    resultInPa,
    resultUnit
  );
  const compositeUnit = getPressureCompositeUnit(
    forceUnit,
    areaUnit
  );
  const compositeValue = convertPressureToCompositeUnits(
    resultInPa,
    forceUnit,
    areaUnit
  );

  return {
    error: null,
    resultValue,
    resultDisplay: formatEngineeringValue(resultValue, locale),
    resultUnit,
    compositeValue,
    compositeDisplay: formatEngineeringValue(
      compositeValue,
      locale
    ),
    compositeUnit,
    formulaDisplay:
      `P = F / A\n` +
      `P = ${formatEngineeringValue(
        forceValue,
        locale
      )} ${forceUnit} / ${formatEngineeringValue(
        areaValue,
        locale
      )} ${areaUnit}\n` +
      `P = ${formatEngineeringValue(
        compositeValue,
        locale
      )} ${compositeUnit}\n` +
      `P = ${formatEngineeringValue(
        resultValue,
        locale
      )} ${resultUnit}`,
    siValue: resultInPa,
    siValueDisplay: formatEngineeringValue(resultInPa, locale),
    siUnit: "Pa",
  };
}

function createForceResult({
  locale,
  pressureValue,
  pressureUnit,
  areaValue,
  areaUnit,
  resultInNewton,
}: {
  locale: CalculatorLocale;
  pressureValue: number;
  pressureUnit: PressureUnit;
  areaValue: number;
  areaUnit: AreaUnit;
  resultInNewton: number;
}): PressureForceAreaResult {
  const resultUnit = inferForceUnit(
    pressureUnit,
    areaUnit,
    resultInNewton
  );
  const resultValue = convertForceFromSI(
    resultInNewton,
    resultUnit
  );
  const compositeUnit = getForceCompositeUnit(
    pressureUnit,
    areaUnit
  );
  const compositeValue = convertForceToCompositeUnits(
    resultInNewton,
    pressureUnit,
    areaUnit
  );

  return {
    error: null,
    resultValue,
    resultDisplay: formatEngineeringValue(resultValue, locale),
    resultUnit,
    compositeValue,
    compositeDisplay: formatEngineeringValue(
      compositeValue,
      locale
    ),
    compositeUnit,
    formulaDisplay:
      `F = P × A\n` +
      `F = ${formatEngineeringValue(
        pressureValue,
        locale
      )} ${pressureUnit} × ${formatEngineeringValue(
        areaValue,
        locale
      )} ${areaUnit}\n` +
      `F = ${formatEngineeringValue(
        compositeValue,
        locale
      )} ${compositeUnit}\n` +
      `F = ${formatEngineeringValue(
        resultValue,
        locale
      )} ${resultUnit}`,
    siValue: resultInNewton,
    siValueDisplay: formatEngineeringValue(resultInNewton, locale),
    siUnit: "N",
  };
}

function createAreaResult({
  locale,
  forceValue,
  forceUnit,
  pressureValue,
  pressureUnit,
  resultInSquareMetre,
}: {
  locale: CalculatorLocale;
  forceValue: number;
  forceUnit: ForceUnit;
  pressureValue: number;
  pressureUnit: PressureUnit;
  resultInSquareMetre: number;
}): PressureForceAreaResult {
  const resultUnit = inferAreaUnit(
    forceUnit,
    pressureUnit,
    resultInSquareMetre
  );
  const resultValue = convertAreaFromSI(
    resultInSquareMetre,
    resultUnit
  );
  const compositeUnit = getAreaCompositeUnit(
    forceUnit,
    pressureUnit
  );
  const compositeValue = convertAreaToCompositeUnits(
    resultInSquareMetre,
    forceUnit,
    pressureUnit
  );

  return {
    error: null,
    resultValue,
    resultDisplay: formatEngineeringValue(resultValue, locale),
    resultUnit,
    compositeValue,
    compositeDisplay: formatEngineeringValue(
      compositeValue,
      locale
    ),
    compositeUnit,
    formulaDisplay:
      `A = F / P\n` +
      `A = ${formatEngineeringValue(
        forceValue,
        locale
      )} ${forceUnit} / ${formatEngineeringValue(
        pressureValue,
        locale
      )} ${pressureUnit}\n` +
      `A = ${formatEngineeringValue(
        compositeValue,
        locale
      )} ${compositeUnit}\n` +
      `A = ${formatEngineeringValue(
        resultValue,
        locale
      )} ${resultUnit}`,
    siValue: resultInSquareMetre,
    siValueDisplay: formatEngineeringValue(
      resultInSquareMetre,
      locale
    ),
    siUnit: "m²",
  };
}

export function solvePressureForceArea({
  target,
  pressureValue,
  pressureUnit,
  forceValue,
  forceUnit,
  areaValue,
  areaUnit,
  locale,
}: PressureForceAreaInput): PressureForceAreaResult {
  const pressure = parseCalculatorNumber(pressureValue);
  const force = parseCalculatorNumber(forceValue);
  const area = parseCalculatorNumber(areaValue);
  const messages = getMessages(locale);
  const rawValues = [pressureValue, forceValue, areaValue];
  const parsedValues = [pressure, force, area];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return createEmptyResult(messages.invalid, {
      resultUnit:
        target === "pressure"
          ? "Pa"
          : target === "force"
            ? "N"
            : "m²",
      compositeUnit:
        target === "pressure"
          ? getPressureCompositeUnit(forceUnit, areaUnit)
          : target === "force"
            ? getForceCompositeUnit(pressureUnit, areaUnit)
            : getAreaCompositeUnit(forceUnit, pressureUnit),
      siUnit:
        target === "pressure"
          ? "Pa"
          : target === "force"
            ? "N"
            : "m²",
    });
  }

  if (target === "pressure") {
    if (force === null || area === null) {
      return createEmptyResult(messages.missing, {
        resultUnit: "Pa",
        compositeUnit: getPressureCompositeUnit(forceUnit, areaUnit),
        siUnit: "Pa",
      });
    }

    const forceInN = convertForceToSI(force, forceUnit);
    const areaInM2 = convertAreaToSI(area, areaUnit);

    if (areaInM2 <= 0) {
      return createEmptyResult(messages.areaPositive, {
        resultUnit: "Pa",
        compositeUnit: getPressureCompositeUnit(forceUnit, areaUnit),
        siUnit: "Pa",
      });
    }

    const pressureInPa = forceInN / areaInM2;

    return createPressureResult({
      locale,
      forceValue: force,
      forceUnit,
      areaValue: area,
      areaUnit,
      resultInPa: pressureInPa,
    });
  }

  if (target === "force") {
    if (pressure === null || area === null) {
      return createEmptyResult(messages.missing, {
        resultUnit: "N",
        compositeUnit: getForceCompositeUnit(pressureUnit, areaUnit),
        siUnit: "N",
      });
    }

    const pressureInPa = convertPressureToSI(
      pressure,
      pressureUnit
    );
    const areaInM2 = convertAreaToSI(area, areaUnit);

    if (areaInM2 <= 0) {
      return createEmptyResult(messages.areaPositive, {
        resultUnit: "N",
        compositeUnit: getForceCompositeUnit(pressureUnit, areaUnit),
        siUnit: "N",
      });
    }

    const forceInN = pressureInPa * areaInM2;

    return createForceResult({
      locale,
      pressureValue: pressure,
      pressureUnit,
      areaValue: area,
      areaUnit,
      resultInNewton: forceInN,
    });
  }

  if (force === null || pressure === null) {
    return createEmptyResult(messages.missing, {
      resultUnit: "m²",
      compositeUnit: getAreaCompositeUnit(forceUnit, pressureUnit),
      siUnit: "m²",
    });
  }

  const forceInN = convertForceToSI(force, forceUnit);
  const pressureInPa = convertPressureToSI(
    pressure,
    pressureUnit
  );

  if (pressureInPa === 0) {
    return createEmptyResult(messages.pressureNonZero, {
      resultUnit: "m²",
      compositeUnit: getAreaCompositeUnit(forceUnit, pressureUnit),
      siUnit: "m²",
    });
  }

  const areaInM2 = forceInN / pressureInPa;

  if (areaInM2 <= 0) {
    return createEmptyResult(messages.areaResult, {
      resultUnit: "m²",
      compositeUnit: getAreaCompositeUnit(forceUnit, pressureUnit),
      siUnit: "m²",
    });
  }

  return createAreaResult({
    locale,
    forceValue: force,
    forceUnit,
    pressureValue: pressure,
    pressureUnit,
    resultInSquareMetre: areaInM2,
  });
}

function isFinitePositiveOrNegative(value: number) {
  return Number.isFinite(value) && !Number.isNaN(value);
}

function isWithinTolerance(
  left: number,
  right: number,
  tolerance = 1e-12
) {
  if (left === right) {
    return true;
  }

  const baseline = Math.max(1, Math.abs(left), Math.abs(right));
  return Math.abs(left - right) <= baseline * tolerance;
}

export function runPressureForceAreaConsistencyChecks(): ConsistencyCheckSummary {
  const failures: ConsistencyCheckFailure[] = [];

  for (const forceUnit of forceUnitDefinitions) {
    for (const areaUnit of areaUnitDefinitions) {
      const pressureInPa =
        convertForceToSI(1, forceUnit.symbol) /
        convertAreaToSI(1, areaUnit.symbol);
      const resultUnit = inferPressureUnit(
        forceUnit.symbol,
        areaUnit.symbol,
        pressureInPa
      );
      const displayValue = convertPressureFromSI(
        pressureInPa,
        resultUnit
      );
      const roundTrip = convertPressureToSI(
        displayValue,
        resultUnit
      );

      if (!isFinitePositiveOrNegative(displayValue)) {
        failures.push({
          kind: "pressure",
          pair: `${forceUnit.symbol}/${areaUnit.symbol}`,
          message: "Result is not finite.",
        });
        continue;
      }

      if (!findPressureUnit(resultUnit)) {
        failures.push({
          kind: "pressure",
          pair: `${forceUnit.symbol}/${areaUnit.symbol}`,
          message: "Chosen result unit is not defined.",
        });
        continue;
      }

      if (!isWithinTolerance(pressureInPa, roundTrip)) {
        failures.push({
          kind: "pressure",
          pair: `${forceUnit.symbol}/${areaUnit.symbol}`,
          message: "SI round-trip mismatch.",
        });
      }
    }
  }

  for (const pressureUnit of pressureUnitDefinitions) {
    for (const areaUnit of areaUnitDefinitions) {
      const forceInN =
        convertPressureToSI(1, pressureUnit.symbol) *
        convertAreaToSI(1, areaUnit.symbol);
      const resultUnit = inferForceUnit(
        pressureUnit.symbol,
        areaUnit.symbol,
        forceInN
      );
      const displayValue = convertForceFromSI(
        forceInN,
        resultUnit
      );
      const roundTrip = convertForceToSI(displayValue, resultUnit);

      if (!isFinitePositiveOrNegative(displayValue)) {
        failures.push({
          kind: "force",
          pair: `${pressureUnit.symbol}·${areaUnit.symbol}`,
          message: "Result is not finite.",
        });
        continue;
      }

      if (!findForceUnit(resultUnit)) {
        failures.push({
          kind: "force",
          pair: `${pressureUnit.symbol}·${areaUnit.symbol}`,
          message: "Chosen result unit is not defined.",
        });
        continue;
      }

      if (!isWithinTolerance(forceInN, roundTrip)) {
        failures.push({
          kind: "force",
          pair: `${pressureUnit.symbol}·${areaUnit.symbol}`,
          message: "SI round-trip mismatch.",
        });
      }
    }
  }

  for (const forceUnit of forceUnitDefinitions) {
    for (const pressureUnit of pressureUnitDefinitions) {
      const areaInM2 =
        convertForceToSI(1, forceUnit.symbol) /
        convertPressureToSI(1, pressureUnit.symbol);
      const resultUnit = inferAreaUnit(
        forceUnit.symbol,
        pressureUnit.symbol,
        areaInM2
      );
      const displayValue = convertAreaFromSI(
        areaInM2,
        resultUnit
      );
      const roundTrip = convertAreaToSI(displayValue, resultUnit);

      if (!isFinitePositiveOrNegative(displayValue)) {
        failures.push({
          kind: "area",
          pair: `${forceUnit.symbol}/${pressureUnit.symbol}`,
          message: "Result is not finite.",
        });
        continue;
      }

      if (!findAreaUnit(resultUnit)) {
        failures.push({
          kind: "area",
          pair: `${forceUnit.symbol}/${pressureUnit.symbol}`,
          message: "Chosen result unit is not defined.",
        });
        continue;
      }

      if (!isWithinTolerance(areaInM2, roundTrip)) {
        failures.push({
          kind: "area",
          pair: `${forceUnit.symbol}/${pressureUnit.symbol}`,
          message: "SI round-trip mismatch.",
        });
      }
    }
  }

  const total =
    forceUnitDefinitions.length * areaUnitDefinitions.length +
    pressureUnitDefinitions.length * areaUnitDefinitions.length +
    forceUnitDefinitions.length * pressureUnitDefinitions.length;

  return {
    total,
    passed: total - failures.length,
    failed: failures,
  };
}
