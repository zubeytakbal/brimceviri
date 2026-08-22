import {
  convertDiameterFromSI,
  convertDiameterToSI,
  convertReynoldsDensityToSI,
  convertSpeedFromSI,
  convertSpeedToSI,
  convertViscosityToSI,
  inferDiameterUnit,
  type DiameterUnit,
  type ReynoldsDensityUnit,
  type SpeedUnit,
  type ViscosityUnit,
} from "./engineeringCalculatorUnits";
import {
  formatEngineeringValue,
  parseCalculatorNumber,
  type CalculatorLocale,
} from "./pressureForceArea";

export type ReynoldsTarget =
  | "reynolds"
  | "velocity"
  | "diameter";

export type ReynoldsInput = {
  target: ReynoldsTarget;
  reynoldsValue: string;
  densityValue: string;
  densityUnit: ReynoldsDensityUnit;
  velocityValue: string;
  velocityUnit: SpeedUnit;
  diameterValue: string;
  diameterUnit: DiameterUnit;
  viscosityValue: string;
  viscosityUnit: ViscosityUnit;
  locale: CalculatorLocale;
};

export type ReynoldsResult = {
  error: string | null;
  resultValue: number | null;
  resultDisplay: string;
  resultUnit: string;
  siValue: number | null;
  siUnit: string;
  formulaDisplay: string;
  interpretation: {
    title: string;
    body: string;
  } | null;
};

const messages = {
  tr: {
    missing: "Hesaplama için gerekli dört değeri girin.",
    invalid: "Geçerli sayısal değerler girin.",
    densityPositive: "Yoğunluk sıfırdan büyük olmalıdır.",
    velocityPositive: "Hız sıfırdan büyük olmalıdır.",
    diameterPositive: "Karakteristik çap sıfırdan büyük olmalıdır.",
    viscosityPositive:
      "Dinamik viskozite sıfırdan büyük olmalıdır.",
    reynoldsPositive:
      "Ters hesaplama için Reynolds sayısı sıfırdan büyük olmalıdır.",
    interpretationPrefix:
      "Bu sınıflandırma boru içi akış için yaklaşık bir rehberdir.",
    laminar: "Laminer akış",
    transition: "Geçiş bölgesi",
    turbulent: "Türbülanslı akış",
  },
  en: {
    missing: "Enter the four values required for the calculation.",
    invalid: "Enter valid numeric values.",
    densityPositive: "Density must be greater than zero.",
    velocityPositive: "Velocity must be greater than zero.",
    diameterPositive:
      "Characteristic diameter must be greater than zero.",
    viscosityPositive:
      "Dynamic viscosity must be greater than zero.",
    reynoldsPositive:
      "A reverse calculation requires a Reynolds number greater than zero.",
    interpretationPrefix:
      "This classification is an approximate guide for internal pipe flow.",
    laminar: "Laminar flow",
    transition: "Transition regime",
    turbulent: "Turbulent flow",
  },
  de: {
    missing:
      "Geben Sie die vier für die Berechnung erforderlichen Werte ein.",
    invalid: "Geben Sie gültige numerische Werte ein.",
    densityPositive: "Die Dichte muss größer als null sein.",
    velocityPositive: "Die Geschwindigkeit muss größer als null sein.",
    diameterPositive:
      "Der charakteristische Durchmesser muss größer als null sein.",
    viscosityPositive:
      "Die dynamische Viskosität muss größer als null sein.",
    reynoldsPositive:
      "Für eine Rückwärtsberechnung muss die Reynolds-Zahl größer als null sein.",
    interpretationPrefix:
      "Diese Klassifizierung ist ein ungefährer Leitfaden für die Rohrströmung.",
    laminar: "Laminare Strömung",
    transition: "Übergangsbereich",
    turbulent: "Turbulente Strömung",
  },
} as const;

function createErrorResult(
  error: string,
  resultUnit: string,
  siUnit: string
): ReynoldsResult {
  return {
    error,
    resultValue: null,
    resultDisplay: "",
    resultUnit,
    siValue: null,
    siUnit,
    formulaDisplay: "",
    interpretation: null,
  };
}

function formatValue(
  value: number,
  locale: CalculatorLocale
) {
  return formatEngineeringValue(value, locale);
}

function getInterpretation(
  reynolds: number,
  locale: CalculatorLocale
) {
  const strings = messages[locale];

  if (reynolds < 2300) {
    return {
      title: strings.laminar,
      body: `${strings.interpretationPrefix} Re < 2300.`,
    };
  }

  if (reynolds <= 4000) {
    return {
      title: strings.transition,
      body: `${strings.interpretationPrefix} 2300 ≤ Re ≤ 4000.`,
    };
  }

  return {
    title: strings.turbulent,
    body: `${strings.interpretationPrefix} Re > 4000.`,
  };
}

export function solveReynoldsNumber({
  target,
  reynoldsValue,
  densityValue,
  densityUnit,
  velocityValue,
  velocityUnit,
  diameterValue,
  diameterUnit,
  viscosityValue,
  viscosityUnit,
  locale,
}: ReynoldsInput): ReynoldsResult {
  const strings = messages[locale];
  const reynolds = parseCalculatorNumber(reynoldsValue);
  const density = parseCalculatorNumber(densityValue);
  const velocity = parseCalculatorNumber(velocityValue);
  const diameter = parseCalculatorNumber(diameterValue);
  const viscosity = parseCalculatorNumber(viscosityValue);
  const rawValues = [
    reynoldsValue,
    densityValue,
    velocityValue,
    diameterValue,
    viscosityValue,
  ];
  const parsedValues = [
    reynolds,
    density,
    velocity,
    diameter,
    viscosity,
  ];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return createErrorResult(strings.invalid, "", "");
  }

  if (density !== null && density <= 0) {
    return createErrorResult(strings.densityPositive, "", "");
  }

  if (velocity !== null && velocity <= 0) {
    return createErrorResult(strings.velocityPositive, "", "");
  }

  if (diameter !== null && diameter <= 0) {
    return createErrorResult(strings.diameterPositive, "", "");
  }

  if (viscosity !== null && viscosity <= 0) {
    return createErrorResult(strings.viscosityPositive, "", "");
  }

  if (target === "reynolds") {
    if (
      density === null ||
      velocity === null ||
      diameter === null ||
      viscosity === null
    ) {
      return createErrorResult(strings.missing, "", "");
    }

    const densityInSI = convertReynoldsDensityToSI(
      density,
      densityUnit
    );
    const velocityInSI = convertSpeedToSI(velocity, velocityUnit);
    const diameterInSI = convertDiameterToSI(
      diameter,
      diameterUnit
    );
    const viscosityInSI = convertViscosityToSI(
      viscosity,
      viscosityUnit
    );
    const reynoldsNumber =
      (densityInSI * velocityInSI * diameterInSI) / viscosityInSI;

    return {
      error: null,
      resultValue: reynoldsNumber,
      resultDisplay: formatValue(reynoldsNumber, locale),
      resultUnit: "",
      siValue: reynoldsNumber,
      siUnit: "1",
      formulaDisplay:
        `Re = ρ × v × D / μ\n` +
        `Re = ${formatValue(density, locale)} ${densityUnit} × ` +
        `${formatValue(velocity, locale)} ${velocityUnit} × ` +
        `${formatValue(diameter, locale)} ${diameterUnit} / ` +
        `${formatValue(viscosity, locale)} ${viscosityUnit}\n` +
        `Re = ${formatValue(reynoldsNumber, locale)}`,
      interpretation: getInterpretation(reynoldsNumber, locale),
    };
  }

  if (target === "velocity") {
    if (
      reynolds === null ||
      density === null ||
      diameter === null ||
      viscosity === null
    ) {
      return createErrorResult(strings.missing, "m/s", "m/s");
    }

    if (reynolds <= 0) {
      return createErrorResult(
        strings.reynoldsPositive,
        "m/s",
        "m/s"
      );
    }

    const densityInSI = convertReynoldsDensityToSI(
      density,
      densityUnit
    );
    const diameterInSI = convertDiameterToSI(
      diameter,
      diameterUnit
    );
    const viscosityInSI = convertViscosityToSI(
      viscosity,
      viscosityUnit
    );
    const velocityInSI =
      (reynolds * viscosityInSI) /
      (densityInSI * diameterInSI);
    const resultValue = convertSpeedFromSI(velocityInSI, "m/s");

    return {
      error: null,
      resultValue,
      resultDisplay: formatValue(resultValue, locale),
      resultUnit: "m/s",
      siValue: velocityInSI,
      siUnit: "m/s",
      formulaDisplay:
        `v = Re × μ / (ρ × D)\n` +
        `v = ${formatValue(reynolds, locale)} × ${formatValue(viscosity, locale)} ${viscosityUnit} / (` +
        `${formatValue(density, locale)} ${densityUnit} × ` +
        `${formatValue(diameter, locale)} ${diameterUnit})\n` +
        `v = ${formatValue(resultValue, locale)} m/s`,
      interpretation: null,
    };
  }

  if (
    reynolds === null ||
    density === null ||
    velocity === null ||
    viscosity === null
  ) {
    return createErrorResult(strings.missing, "m", "m");
  }

  if (reynolds <= 0) {
    return createErrorResult(strings.reynoldsPositive, "m", "m");
  }

  const densityInSI = convertReynoldsDensityToSI(
    density,
    densityUnit
  );
  const velocityInSI = convertSpeedToSI(velocity, velocityUnit);
  const viscosityInSI = convertViscosityToSI(
    viscosity,
    viscosityUnit
  );
  const diameterInSI =
    (reynolds * viscosityInSI) /
    (densityInSI * velocityInSI);
  const resultUnit = inferDiameterUnit(diameterInSI);
  const resultValue = convertDiameterFromSI(
    diameterInSI,
    resultUnit
  );

  return {
    error: null,
    resultValue,
    resultDisplay: formatValue(resultValue, locale),
    resultUnit,
    siValue: diameterInSI,
    siUnit: "m",
    formulaDisplay:
      `D = Re × μ / (ρ × v)\n` +
      `D = ${formatValue(reynolds, locale)} × ${formatValue(viscosity, locale)} ${viscosityUnit} / (` +
      `${formatValue(density, locale)} ${densityUnit} × ` +
      `${formatValue(velocity, locale)} ${velocityUnit})\n` +
      `D = ${formatValue(resultValue, locale)} ${resultUnit}`,
    interpretation: null,
  };
}
