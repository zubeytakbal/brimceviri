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
  ar: {
    missing: "أدخل القيم الأربع المطلوبة للحساب.",
    invalid: "أدخل قيما رقمية صحيحة.",
    conductivityPositive:
      "يجب أن تكون الموصلية الحرارية أكبر من الصفر.",
    areaPositive: "يجب أن تكون المساحة أكبر من الصفر.",
    lengthPositive: "يجب أن يكون السمك أكبر من الصفر.",
    temperatureDifferenceNonZero:
      "يتطلب الحساب العكسي فرقا حراريا غير صفري.",
    powerNonZero:
      "يتطلب حساب السمك معدل انتقال حرارة غير صفري.",
    nonPhysicalConductivity:
      "هذه القيم لا تعطي موصلية ذات معنى فيزيائي.",
    nonPhysicalArea:
      "هذه القيم لا تعطي مساحة ذات معنى فيزيائي.",
    nonPhysicalLength:
      "هذه القيم لا تعطي سماكة ذات معنى فيزيائي.",
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

export type ConductivityPreset = {
  id: string;
  label: string;
  value: string;
};

// Bu on ayarlar hem "use client" hesaplayici bileseninde (dropdown) hem de
// sunucu tarafinda render edilen sayfada (gorunur referans tablosu) kullanilir
// -- bu yuzden client bilesenden ayri, duz bir modulde tutuluyor.
export const conductivityPresets: Record<
  CalculatorLocale,
  ConductivityPreset[]
> = {
  tr: [
    { id: "custom", label: "Özel değer", value: "" },
    { id: "copper", label: "Bakır", value: "401" },
    { id: "aluminum", label: "Alüminyum", value: "205" },
    { id: "steel", label: "Çelik", value: "50" },
    { id: "glass", label: "Cam", value: "1.05" },
    { id: "concrete", label: "Beton", value: "1.4" },
    { id: "wood", label: "Ahşap", value: "0.13" },
    { id: "air", label: "Hava", value: "0.026" },
    { id: "glassWool", label: "Cam Yünü", value: "0.035" },
    { id: "rockWool", label: "Taş Yünü", value: "0.04" },
    { id: "eps", label: "EPS (Genişletilmiş Polistiren)", value: "0.038" },
    { id: "xps", label: "XPS (Ekstrüde Polistiren)", value: "0.035" },
    { id: "pur", label: "Poliüretan Köpük (PUR)", value: "0.028" },
  ],
  en: [
    { id: "custom", label: "Custom", value: "" },
    { id: "copper", label: "Copper", value: "401" },
    { id: "aluminum", label: "Aluminum", value: "205" },
    { id: "steel", label: "Steel", value: "50" },
    { id: "glass", label: "Glass", value: "1.05" },
    { id: "concrete", label: "Concrete", value: "1.4" },
    { id: "wood", label: "Wood", value: "0.13" },
    { id: "air", label: "Air", value: "0.026" },
    { id: "glassWool", label: "Glass Wool", value: "0.035" },
    { id: "rockWool", label: "Rock Wool", value: "0.04" },
    { id: "eps", label: "EPS (Expanded Polystyrene)", value: "0.038" },
    { id: "xps", label: "XPS (Extruded Polystyrene)", value: "0.035" },
    { id: "pur", label: "Polyurethane Foam (PUR)", value: "0.028" },
  ],
  de: [
    { id: "custom", label: "Benutzerdefiniert", value: "" },
    { id: "copper", label: "Kupfer", value: "401" },
    { id: "aluminum", label: "Aluminium", value: "205" },
    { id: "steel", label: "Stahl", value: "50" },
    { id: "glass", label: "Glas", value: "1.05" },
    { id: "concrete", label: "Beton", value: "1.4" },
    { id: "wood", label: "Holz", value: "0.13" },
    { id: "air", label: "Luft", value: "0.026" },
    { id: "glassWool", label: "Glaswolle", value: "0.035" },
    { id: "rockWool", label: "Steinwolle", value: "0.04" },
    { id: "eps", label: "EPS (expandiertes Polystyrol)", value: "0.038" },
    { id: "xps", label: "XPS (extrudiertes Polystyrol)", value: "0.035" },
    { id: "pur", label: "Polyurethanschaum (PUR)", value: "0.028" },
  ],
  ar: [
    { id: "custom", label: "قيمة مخصصة", value: "" },
    { id: "copper", label: "نحاس", value: "401" },
    { id: "aluminum", label: "ألمنيوم", value: "205" },
    { id: "steel", label: "فولاذ", value: "50" },
    { id: "glass", label: "زجاج", value: "1.05" },
    { id: "concrete", label: "خرسانة", value: "1.4" },
    { id: "wood", label: "خشب", value: "0.13" },
    { id: "air", label: "هواء", value: "0.026" },
    { id: "glassWool", label: "صوف زجاجي", value: "0.035" },
    { id: "rockWool", label: "صوف صخري", value: "0.04" },
    { id: "eps", label: "EPS (بوليسترين موسع)", value: "0.038" },
    { id: "xps", label: "XPS (بوليسترين مبثوق)", value: "0.035" },
    { id: "pur", label: "رغوة بولي يوريثان (PUR)", value: "0.028" },
  ],
};
