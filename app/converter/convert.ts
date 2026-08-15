import {
  KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT,
  KILOGRAM_PER_CUBIC_METRE_UNIT,
  METRE_PER_SECOND_SQUARED_UNIT,
} from "./engineeringUnits";

const SQUARE_SUFFIX = "\u00B2";
const CUBIC_SUFFIX = "\u00B3";
const MICRO_SIGN = "\u00B5";

const squareMetreUnit = `m${SQUARE_SUFFIX}`;
const squareCentimetreUnit = `cm${SQUARE_SUFFIX}`;
const squareMillimetreUnit = `mm${SQUARE_SUFFIX}`;
const squareKilometreUnit = `km${SQUARE_SUFFIX}`;
const squareFootUnit = `ft${SQUARE_SUFFIX}`;
const squareInchUnit = `in${SQUARE_SUFFIX}`;
const cubicMetreUnit = `m${CUBIC_SUFFIX}`;
const cubicCentimetreUnit = `cm${CUBIC_SUFFIX}`;
const cubicFootUnit = `ft${CUBIC_SUFFIX}`;
const cubicInchUnit = `in${CUBIC_SUFFIX}`;
const gramPerCubicCentimetreUnit = `g/cm${CUBIC_SUFFIX}`;
const poundPerCubicFootUnit = `lb/ft${CUBIC_SUFFIX}`;
const poundPerCubicInchUnit = `lb/in${CUBIC_SUFFIX}`;
const footPerSecondSquaredUnit = `ft/s${SQUARE_SUFFIX}`;
const metrePerMinuteSquaredUnit = `m/min${SQUARE_SUFFIX}`;
const footPerMinuteSquaredUnit = `ft/min${SQUARE_SUFFIX}`;
const degreePerSecondUnit = `\u00B0/s`;
const degreePerMinuteUnit = `\u00B0/min`;
const degreePerHourUnit = `\u00B0/h`;
const newtonMetreUnit = `N\u00B7m`;
const kilonewtonMetreUnit = `kN\u00B7m`;
const poundFootUnit = `lb\u00B7ft`;
const kilogramMetrePerSecondUnit = `kg\u00B7m/s`;
const newtonSecondUnit = `N\u00B7s`;
const poundFootPerSecondUnit = `lb\u00B7ft/s`;
const pascalSecondUnit = `Pa\u00B7s`;
const millipascalSecondUnit = `mPa\u00B7s`;
const squareMetrePerSecondUnit = `${squareMetreUnit}/s`;
const squareMillimetrePerSecondUnit = `${squareMillimetreUnit}/s`;
const cubicMetrePerSecondUnit = `${cubicMetreUnit}/s`;
const cubicMetrePerHourUnit = `${cubicMetreUnit}/h`;
const wattPerMetreKelvinUnit = `W/m\u00B7K`;
const kilowattPerMetreKelvinUnit = `kW/m\u00B7K`;
const wattPerCentimetreKelvinUnit = `W/cm\u00B7K`;
const btuPerHourFootFahrenheitUnit = `Btu/h\u00B7ft\u00B7\u00B0F`;
const wattPerSquareMetreUnit = `W/${squareMetreUnit}`;
const kilowattPerSquareMetreUnit = `kW/${squareMetreUnit}`;
const caloriePerSquareCentimetreSecondUnit =
  `cal/${squareCentimetreUnit}\u00B7s`;
const joulePerKilogramKelvinUnit = `J/kg\u00B7K`;
const kilojoulePerKilogramKelvinUnit = `kJ/kg\u00B7K`;
const caloriePerGramKelvinUnit = `cal/g\u00B7K`;
const btuPerPoundFahrenheitUnit = `Btu/lb\u00B7\u00B0F`;
const ohmUnit = `\u03A9`;
const kiloOhmUnit = `k\u03A9`;
const megaOhmUnit = `M\u03A9`;
const microfaradUnit = `${MICRO_SIGN}F`;
const microhenryUnit = `${MICRO_SIGN}H`;
const microcoulombUnit = `${MICRO_SIGN}C`;
const microweberUnit = `${MICRO_SIGN}Wb`;
const micrometreUnit = `${MICRO_SIGN}m`;

export function convert(
  category: string,
  value: number,
  from: string,
  to: string
): number {
  if (!Number.isFinite(value)) {
    return NaN;
  }

  if (category === "alan") {
    const t: Record<string, number> = {
      [squareMetreUnit]: 1,
      [squareCentimetreUnit]: 0.0001,
      [squareMillimetreUnit]: 0.000001,
      [squareKilometreUnit]: 1_000_000,
      ha: 10_000,
      [squareFootUnit]: 0.092903,
      [squareInchUnit]: 0.00064516,
      ac: 4046.8564224,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "uzunluk") {
    const t: Record<string, number> = {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      [micrometreUnit]: 0.000001,
      nm: 1e-9,
      ft: 0.3048,
      in: 0.0254,
      yd: 0.9144,
      mi: 1609.344,
      nmi: 1852,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "hacim") {
    const t: Record<string, number> = {
      [cubicMetreUnit]: 1,
      L: 0.001,
      mL: 0.000001,
      [cubicCentimetreUnit]: 0.000001,
      [cubicFootUnit]: 0.0283168,
      [cubicInchUnit]: 0.0000163871,
      gal: 0.00378541,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "kutle") {
    const t: Record<string, number> = {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      ton: 1000,
      lb: 0.45359237,
      oz: 0.028349523125,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "yogunluk") {
    const t: Record<string, number> = {
      [KILOGRAM_PER_CUBIC_METRE_UNIT]: 1,
      [gramPerCubicCentimetreUnit]: 1000,
      "g/mL": 1000,
      "kg/L": 1000,
      "g/L": 1,
      "mg/L": 0.001,
      [poundPerCubicFootUnit]: 16.01846337,
      [poundPerCubicInchUnit]: 27679.90471,
      "lb/gal (US)": 119.826427,
      [`slug/ft${CUBIC_SUFFIX}`]: 515.378818,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "hiz") {
    const t: Record<string, number> = {
      "m/s": 1,
      "km/h": 1000 / 3600,
      "km/s": 1000,
      mph: 1609.344 / 3600,
      knot: 1852 / 3600,
      "ft/s": 0.3048,
      "m/min": 1 / 60,
      "km/min": 1000 / 60,
      "cm/s": 0.01,
      c: 299792458,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "ivme") {
    const g0 = 9.80665;
    const t: Record<string, number> = {
      [METRE_PER_SECOND_SQUARED_UNIT]: 1,
      [`cm/s${SQUARE_SUFFIX}`]: 0.01,
      [`mm/s${SQUARE_SUFFIX}`]: 0.001,
      [`km/s${SQUARE_SUFFIX}`]: 1000,
      [footPerSecondSquaredUnit]: 0.3048,
      [`in/s${SQUARE_SUFFIX}`]: 0.0254,
      [metrePerMinuteSquaredUnit]: 1 / 3600,
      [footPerMinuteSquaredUnit]: 0.3048 / 3600,
      gal: 0.01,
      g0,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "zaman") {
    const t: Record<string, number> = {
      s: 1,
      ms: 0.001,
      min: 60,
      h: 3600,
      day: 86400,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "acisal_hiz") {
    const t: Record<string, number> = {
      "rad/s": 1,
      "rad/min": 1 / 60,
      "rad/h": 1 / 3600,
      rpm: (2 * Math.PI) / 60,
      Hz: 2 * Math.PI,
      [degreePerSecondUnit]: Math.PI / 180,
      [degreePerMinuteUnit]: Math.PI / (180 * 60),
      [degreePerHourUnit]: Math.PI / (180 * 3600),
    };
    return (value * t[from]) / t[to];
  }

  if (category === "kuvvet") {
    const t: Record<string, number> = {
      N: 1,
      kN: 1000,
      dyn: 0.00001,
      lbf: 4.4482216,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "tork") {
    const t: Record<string, number> = {
      [newtonMetreUnit]: 1,
      [kilonewtonMetreUnit]: 1000,
      [poundFootUnit]: 1.355817948,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "momentum") {
    const t: Record<string, number> = {
      [kilogramMetrePerSecondUnit]: 1,
      [newtonSecondUnit]: 1,
      [poundFootPerSecondUnit]: 0.138255,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "basinc") {
    const t: Record<string, number> = {
      Pa: 1,
      kPa: 1000,
      bar: 100000,
      mbar: 100,
      atm: 101325,
      at: 98066.5,
      psi: 6894.757293168,
      mmHg: 133.322387415,
      mmH2O: 9.80665,
      [KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT]: 98066.5,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "viskozite_dinamik") {
    const t: Record<string, number> = {
      [pascalSecondUnit]: 1,
      [millipascalSecondUnit]: 0.001,
      P: 0.1,
      cP: 0.001,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "viskozite_kinematik") {
    const t: Record<string, number> = {
      [squareMetrePerSecondUnit]: 1,
      [squareMillimetrePerSecondUnit]: 0.000001,
      cSt: 0.000001,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "debi_hacimsel") {
    const t: Record<string, number> = {
      [cubicMetrePerSecondUnit]: 1,
      "L/s": 0.001,
      [cubicMetrePerHourUnit]: 1 / 3600,
      "L/min": 0.001 / 60,
      cfm: 0.0283168 / 60,
      gpm: 0.00378541 / 60,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "debi_kutlesel") {
    const t: Record<string, number> = {
      "kg/s": 1,
      "kg/h": 1 / 3600,
      "g/s": 0.001,
      "g/h": 0.001 / 3600,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "enerji") {
    const t: Record<string, number> = {
      J: 1,
      kJ: 1000,
      MJ: 1_000_000,
      Wh: 3600,
      kWh: 3_600_000,
      W: 1,
      kW: 1000,
      cal: 4.184,
      kcal: 4184,
      Btu: 1055.056,
      th: 1.05506e8,
      "quad BTU": 1.05506e18,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "guc") {
    const t: Record<string, number> = {
      W: 1,
      kW: 1000,
      MW: 1_000_000,
      hp: 745.7,
      HP: 745.7,
      CV: 735.49875,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "sicaklik") {
    if (from === "C" && to === "F") return (value * 9) / 5 + 32;
    if (from === "F" && to === "C") return ((value - 32) * 5) / 9;
    if (from === "C" && to === "K") return value + 273.15;
    if (from === "K" && to === "C") return value - 273.15;
    if (from === "F" && to === "K") return ((value - 32) * 5) / 9 + 273.15;
    if (from === "K" && to === "F") return ((value - 273.15) * 9) / 5 + 32;
    return value;
  }

  if (category === "debi") {
    const t: Record<string, number> = {
      [cubicMetrePerHourUnit]: 1 / 3600,
      "L/min": 0.001 / 60,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "elektrik") {
    const t: Record<string, number> = {
      V: 1,
      kV: 1000,
      A: 1,
      mA: 0.001,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "isil_iletkenlik") {
    const t: Record<string, number> = {
      [wattPerMetreKelvinUnit]: 1,
      [kilowattPerMetreKelvinUnit]: 1000,
      [wattPerCentimetreKelvinUnit]: 100,
      [btuPerHourFootFahrenheitUnit]: 1.730735,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "isi_akisi") {
    const t: Record<string, number> = {
      [wattPerSquareMetreUnit]: 1,
      [kilowattPerSquareMetreUnit]: 1000,
      [caloriePerSquareCentimetreSecondUnit]: 41840,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "ozgul_isi") {
    const t: Record<string, number> = {
      [joulePerKilogramKelvinUnit]: 1,
      [kilojoulePerKilogramKelvinUnit]: 1000,
      [caloriePerGramKelvinUnit]: 4.184,
      [btuPerPoundFahrenheitUnit]: 4186.8,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "elektrik_direnc") {
    const t: Record<string, number> = {
      [ohmUnit]: 1,
      [kiloOhmUnit]: 1000,
      [megaOhmUnit]: 1_000_000,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "elektrik_gerilim") {
    const t: Record<string, number> = {
      V: 1,
      kV: 1000,
      mV: 0.001,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "elektrik_akim") {
    const t: Record<string, number> = {
      A: 1,
      mA: 0.001,
      kA: 1000,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "kapasitans") {
    const t: Record<string, number> = {
      F: 1,
      mF: 0.001,
      [microfaradUnit]: 0.000001,
      nF: 1e-9,
      pF: 1e-12,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "enduktans") {
    const t: Record<string, number> = {
      H: 1,
      mH: 0.001,
      [microhenryUnit]: 0.000001,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "elektrik_yuk") {
    const t: Record<string, number> = {
      C: 1,
      mC: 0.001,
      [microcoulombUnit]: 0.000001,
      nC: 1e-9,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "manyetik_alan") {
    const t: Record<string, number> = {
      "A/m": 1,
      "kA/m": 1000,
      Oe: 79.5775,
    };
    return (value * t[from]) / t[to];
  }

  if (category === "manyetik_aki") {
    const t: Record<string, number> = {
      Wb: 1,
      mWb: 0.001,
      [microweberUnit]: 0.000001,
      nWb: 1e-9,
      weber: 1,
    };
    return (value * t[from]) / t[to];
  }

  return value;
}
