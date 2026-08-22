import {
  convertCurrentFromSI,
  convertCurrentToSI,
  convertResistanceFromSI,
  convertResistanceToSI,
  convertVoltageFromSI,
  convertVoltageToSI,
  inferCurrentUnit,
  inferResistanceUnit,
  inferVoltageUnit,
  type CurrentUnit,
  type ResistanceUnit,
  type VoltageUnit,
} from "./engineeringCalculatorUnits";
import {
  formatEngineeringValue,
  parseCalculatorNumber,
  type CalculatorLocale,
} from "./pressureForceArea";

export type OhmsLawTarget = "voltage" | "current" | "resistance";

export type OhmsLawInput = {
  target: OhmsLawTarget;
  voltageValue: string;
  voltageUnit: VoltageUnit;
  currentValue: string;
  currentUnit: CurrentUnit;
  resistanceValue: string;
  resistanceUnit: ResistanceUnit;
  locale: CalculatorLocale;
};

export type OhmsLawResult = {
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
    missing: "Hesaplama için gerekli iki değeri girin.",
    invalid: "Geçerli sayısal değerler girin.",
    currentNonZero:
      "Bu hesaplama için akım sıfır olamaz.",
    resistanceNonZero:
      "Bu hesaplama için direnç sıfır olamaz.",
    resistancePositive:
      "Direnç sıfırdan büyük olmalıdır.",
  },
  en: {
    missing: "Enter the two values required for the calculation.",
    invalid: "Enter valid numeric values.",
    currentNonZero:
      "Current cannot be zero for this calculation.",
    resistanceNonZero:
      "Resistance cannot be zero for this calculation.",
    resistancePositive:
      "Resistance must be greater than zero.",
  },
  de: {
    missing:
      "Geben Sie die zwei für die Berechnung erforderlichen Werte ein.",
    invalid: "Geben Sie gültige numerische Werte ein.",
    currentNonZero:
      "Der Strom darf für diese Berechnung nicht null sein.",
    resistanceNonZero:
      "Der Widerstand darf für diese Berechnung nicht null sein.",
    resistancePositive:
      "Der Widerstand muss größer als null sein.",
  },
} as const;

function createErrorResult(
  error: string,
  resultUnit: string,
  siUnit: string
): OhmsLawResult {
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

function formatValue(value: number, locale: CalculatorLocale) {
  return formatEngineeringValue(value, locale);
}

export function solveOhmsLaw({
  target,
  voltageValue,
  voltageUnit,
  currentValue,
  currentUnit,
  resistanceValue,
  resistanceUnit,
  locale,
}: OhmsLawInput): OhmsLawResult {
  const strings = messages[locale];
  const voltage = parseCalculatorNumber(voltageValue);
  const current = parseCalculatorNumber(currentValue);
  const resistance = parseCalculatorNumber(resistanceValue);
  const rawValues = [voltageValue, currentValue, resistanceValue];
  const parsedValues = [voltage, current, resistance];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return createErrorResult(strings.invalid, "V", "V");
  }

  if (target === "voltage") {
    if (current === null || resistance === null) {
      return createErrorResult(strings.missing, "V", "V");
    }

    if (resistance <= 0) {
      return createErrorResult(strings.resistancePositive, "V", "V");
    }

    const currentInSI = convertCurrentToSI(current, currentUnit);
    const resistanceInSI = convertResistanceToSI(
      resistance,
      resistanceUnit
    );
    const voltageInSI = currentInSI * resistanceInSI;
    const resultUnit = inferVoltageUnit(voltageInSI);
    const resultValue = convertVoltageFromSI(voltageInSI, resultUnit);

    return {
      error: null,
      resultValue,
      resultDisplay: formatValue(resultValue, locale),
      resultUnit,
      siValue: voltageInSI,
      siUnit: "V",
      formulaDisplay:
        `V = I × R\n` +
        `V = ${formatValue(current, locale)} ${currentUnit} × ` +
        `${formatValue(resistance, locale)} ${resistanceUnit}\n` +
        `V = ${formatValue(resultValue, locale)} ${resultUnit}`,
    };
  }

  if (target === "current") {
    if (voltage === null || resistance === null) {
      return createErrorResult(strings.missing, "A", "A");
    }

    if (resistance === 0) {
      return createErrorResult(strings.resistanceNonZero, "A", "A");
    }

    const voltageInSI = convertVoltageToSI(voltage, voltageUnit);
    const resistanceInSI = convertResistanceToSI(
      resistance,
      resistanceUnit
    );
    const currentInSI = voltageInSI / resistanceInSI;
    const resultUnit = inferCurrentUnit(currentInSI);
    const resultValue = convertCurrentFromSI(currentInSI, resultUnit);

    return {
      error: null,
      resultValue,
      resultDisplay: formatValue(resultValue, locale),
      resultUnit,
      siValue: currentInSI,
      siUnit: "A",
      formulaDisplay:
        `I = V / R\n` +
        `I = ${formatValue(voltage, locale)} ${voltageUnit} / ` +
        `${formatValue(resistance, locale)} ${resistanceUnit}\n` +
        `I = ${formatValue(resultValue, locale)} ${resultUnit}`,
    };
  }

  if (voltage === null || current === null) {
    return createErrorResult(strings.missing, "Ω", "Ω");
  }

  if (current === 0) {
    return createErrorResult(strings.currentNonZero, "Ω", "Ω");
  }

  const voltageInSI = convertVoltageToSI(voltage, voltageUnit);
  const currentInSI = convertCurrentToSI(current, currentUnit);
  const resistanceInSI = voltageInSI / currentInSI;
  const resultUnit = inferResistanceUnit(resistanceInSI);
  const resultValue = convertResistanceFromSI(
    resistanceInSI,
    resultUnit
  );

  return {
    error: null,
    resultValue,
    resultDisplay: formatValue(resultValue, locale),
    resultUnit,
    siValue: resistanceInSI,
    siUnit: "Ω",
    formulaDisplay:
      `R = V / I\n` +
      `R = ${formatValue(voltage, locale)} ${voltageUnit} / ` +
      `${formatValue(current, locale)} ${currentUnit}\n` +
      `R = ${formatValue(resultValue, locale)} ${resultUnit}`,
  };
}
