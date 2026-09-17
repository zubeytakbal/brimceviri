import {
  calculatorUnitSymbols,
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
import { parseCalculatorNumber } from "./pressureForceArea";
import { formatUzValue } from "./pressureForceAreaUz";
import type { ReynoldsTarget } from "./reynoldsNumber";

export type ReynoldsUzInput = {
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
};

export type ReynoldsUzResult = {
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
  missing: "Hisoblash uchun kerakli to'rtta qiymatni kiriting.",
  invalid: "To'g'ri raqamli qiymatlar kiriting.",
  densityPositive: "Zichlik noldan katta bo'lishi kerak.",
  velocityPositive: "Tezlik noldan katta bo'lishi kerak.",
  diameterPositive: "Xarakterli diametr noldan katta bo'lishi kerak.",
  viscosityPositive: "Dinamik yopishqoqlik noldan katta bo'lishi kerak.",
  reynoldsPositive: "Teskari hisoblash uchun Reynolds soni noldan katta bo'lishi kerak.",
  interpretationPrefix: "Bu tasnif quvur ichidagi oqim uchun taxminiy qo'llanma.",
  laminar: "Laminar oqim",
  transition: "O'tish zonasi",
  turbulent: "Turbulent oqim",
};

function createErrorResult(
  error: string,
  resultUnit: string,
  siUnit: string
): ReynoldsUzResult {
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

function getInterpretation(reynolds: number) {
  if (reynolds < 2300) {
    return {
      title: messages.laminar,
      body: `${messages.interpretationPrefix} Re < 2300.`,
    };
  }

  if (reynolds <= 4000) {
    return {
      title: messages.transition,
      body: `${messages.interpretationPrefix} 2300 ≤ Re ≤ 4000.`,
    };
  }

  return {
    title: messages.turbulent,
    body: `${messages.interpretationPrefix} Re > 4000.`,
  };
}

export function solveReynoldsNumberUz({
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
}: ReynoldsUzInput): ReynoldsUzResult {
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
  const parsedValues = [reynolds, density, velocity, diameter, viscosity];

  if (
    parsedValues.some(
      (value, index) => rawValues[index].trim() && value === null
    )
  ) {
    return createErrorResult(messages.invalid, "", "");
  }

  if (density !== null && density <= 0) {
    return createErrorResult(messages.densityPositive, "", "");
  }

  if (velocity !== null && velocity <= 0) {
    return createErrorResult(messages.velocityPositive, "", "");
  }

  if (diameter !== null && diameter <= 0) {
    return createErrorResult(messages.diameterPositive, "", "");
  }

  if (viscosity !== null && viscosity <= 0) {
    return createErrorResult(messages.viscosityPositive, "", "");
  }

  if (target === "reynolds") {
    if (density === null || velocity === null || diameter === null || viscosity === null) {
      return createErrorResult(messages.missing, "", "");
    }

    const densityInSI = convertReynoldsDensityToSI(density, densityUnit);
    const velocityInSI = convertSpeedToSI(velocity, velocityUnit);
    const diameterInSI = convertDiameterToSI(diameter, diameterUnit);
    const viscosityInSI = convertViscosityToSI(viscosity, viscosityUnit);
    const reynoldsNumber = (densityInSI * velocityInSI * diameterInSI) / viscosityInSI;

    return {
      error: null,
      resultValue: reynoldsNumber,
      resultDisplay: formatUzValue(reynoldsNumber),
      resultUnit: "",
      siValue: reynoldsNumber,
      siUnit: "1",
      formulaDisplay:
        `Re = ρ × v × D / μ\n` +
        `Re = ${formatUzValue(density)} ${densityUnit} × ${formatUzValue(velocity)} ${velocityUnit} × ${formatUzValue(diameter)} ${diameterUnit} / ${formatUzValue(viscosity)} ${viscosityUnit}\n` +
        `Re = ${formatUzValue(reynoldsNumber)}`,
      interpretation: getInterpretation(reynoldsNumber),
    };
  }

  if (target === "velocity") {
    if (reynolds === null || density === null || diameter === null || viscosity === null) {
      return createErrorResult(messages.missing, "m/s", "m/s");
    }

    if (reynolds <= 0) {
      return createErrorResult(messages.reynoldsPositive, "m/s", "m/s");
    }

    const densityInSI = convertReynoldsDensityToSI(density, densityUnit);
    const diameterInSI = convertDiameterToSI(diameter, diameterUnit);
    const viscosityInSI = convertViscosityToSI(viscosity, viscosityUnit);
    const velocityInSI = (reynolds * viscosityInSI) / (densityInSI * diameterInSI);
    const resultValue = convertSpeedFromSI(velocityInSI, "m/s");

    return {
      error: null,
      resultValue,
      resultDisplay: formatUzValue(resultValue),
      resultUnit: "m/s",
      siValue: velocityInSI,
      siUnit: "m/s",
      formulaDisplay:
        `v = Re × μ / (ρ × D)\n` +
        `v = ${formatUzValue(reynolds)} × ${formatUzValue(viscosity)} ${viscosityUnit} / (${formatUzValue(density)} ${densityUnit} × ${formatUzValue(diameter)} ${diameterUnit})\n` +
        `v = ${formatUzValue(resultValue)} m/s`,
      interpretation: null,
    };
  }

  if (reynolds === null || density === null || velocity === null || viscosity === null) {
    return createErrorResult(messages.missing, "m", "m");
  }

  if (reynolds <= 0) {
    return createErrorResult(messages.reynoldsPositive, "m", "m");
  }

  const densityInSI = convertReynoldsDensityToSI(density, densityUnit);
  const velocityInSI = convertSpeedToSI(velocity, velocityUnit);
  const viscosityInSI = convertViscosityToSI(viscosity, viscosityUnit);
  const diameterInSI = (reynolds * viscosityInSI) / (densityInSI * velocityInSI);
  const resultUnit = inferDiameterUnit(diameterInSI);
  const resultValue = convertDiameterFromSI(diameterInSI, resultUnit);

  return {
    error: null,
    resultValue,
    resultDisplay: formatUzValue(resultValue),
    resultUnit,
    siValue: diameterInSI,
    siUnit: "m",
    formulaDisplay:
      `D = Re × μ / (ρ × v)\n` +
      `D = ${formatUzValue(reynolds)} × ${formatUzValue(viscosity)} ${viscosityUnit} / (${formatUzValue(density)} ${densityUnit} × ${formatUzValue(velocity)} ${velocityUnit})\n` +
      `D = ${formatUzValue(resultValue)} ${resultUnit}`,
    interpretation: null,
  };
}

export type FluidPresetUz = {
  id: string;
  label: string;
  densityValue: string;
  densityUnit: ReynoldsDensityUnit;
  viscosityValue: string;
  viscosityUnit: ViscosityUnit;
};

export const fluidPresetsUz: FluidPresetUz[] = [
  { id: "water", label: "Suv", densityValue: "1000", densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre, viscosityValue: "1", viscosityUnit: calculatorUnitSymbols.millipascalSecond },
  { id: "air", label: "Havo", densityValue: "1.2", densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre, viscosityValue: "0.0181", viscosityUnit: calculatorUnitSymbols.millipascalSecond },
  { id: "seawater", label: "Dengiz Suvi", densityValue: "1025", densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre, viscosityValue: "1.08", viscosityUnit: calculatorUnitSymbols.millipascalSecond },
  { id: "ethanol", label: "Etil Spirt", densityValue: "789", densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre, viscosityValue: "1.2", viscosityUnit: calculatorUnitSymbols.millipascalSecond },
  { id: "olive-oil", label: "Zaytun Yog'i", densityValue: "910", densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre, viscosityValue: "81", viscosityUnit: calculatorUnitSymbols.millipascalSecond },
  { id: "glycerin", label: "Glitserin", densityValue: "1260", densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre, viscosityValue: "1400", viscosityUnit: calculatorUnitSymbols.millipascalSecond },
  { id: "mercury", label: "Simob", densityValue: "13546", densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre, viscosityValue: "1.53", viscosityUnit: calculatorUnitSymbols.millipascalSecond },
  { id: "custom", label: "O'zgacha qiymat", densityValue: "", densityUnit: calculatorUnitSymbols.kilogramPerCubicMetre, viscosityValue: "", viscosityUnit: calculatorUnitSymbols.millipascalSecond },
];
