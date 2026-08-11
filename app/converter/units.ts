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

const kilogramPerCubicLitreUnit = `kg/L`;
const gramPerCubicCentimetreUnit = `g/cm${CUBIC_SUFFIX}`;
const poundPerCubicFootUnit = `lb/ft${CUBIC_SUFFIX}`;
const poundPerCubicInchUnit = `lb/in${CUBIC_SUFFIX}`;

const centimetrePerSecondSquaredUnit = `cm/s${SQUARE_SUFFIX}`;
const millimetrePerSecondSquaredUnit = `mm/s${SQUARE_SUFFIX}`;
const kilometrePerSecondSquaredUnit = `km/s${SQUARE_SUFFIX}`;
const inchPerSecondSquaredUnit = `in/s${SQUARE_SUFFIX}`;
const minuteSquaredSuffix = `min${SQUARE_SUFFIX}`;
const footPerMinuteSquaredUnit = `ft/${minuteSquaredSuffix}`;
const metrePerMinuteSquaredUnit = `m/${minuteSquaredSuffix}`;

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

export const units: Record<string, string[]> = {
  alan: [
    squareMetreUnit,
    squareCentimetreUnit,
    squareMillimetreUnit,
    squareKilometreUnit,
    "ha",
    squareFootUnit,
    squareInchUnit,
    "ac",
  ],

  uzunluk: [
    "m",
    "km",
    "cm",
    "mm",
    micrometreUnit,
    "nm",
    "ft",
    "in",
    "yd",
    "mi",
    "nmi",
  ],

  hacim: [
    cubicMetreUnit,
    "L",
    "mL",
    cubicCentimetreUnit,
    cubicFootUnit,
    cubicInchUnit,
    "gal",
  ],

  kutle: ["kg", "g", "mg", "ton", "lb", "oz"],

  yogunluk: [
    KILOGRAM_PER_CUBIC_METRE_UNIT,
    gramPerCubicCentimetreUnit,
    "g/mL",
    kilogramPerCubicLitreUnit,
    "g/L",
    "mg/L",
    poundPerCubicFootUnit,
    poundPerCubicInchUnit,
    "lb/gal (US)",
    `slug/ft${CUBIC_SUFFIX}`,
  ],

  hiz: [
    "m/s",
    "km/h",
    "km/s",
    "mph",
    "knot",
    "ft/s",
    "m/min",
    "km/min",
    "cm/s",
    "c",
  ],

  ivme: [
    METRE_PER_SECOND_SQUARED_UNIT,
    centimetrePerSecondSquaredUnit,
    millimetrePerSecondSquaredUnit,
    kilometrePerSecondSquaredUnit,
    `ft/s${SQUARE_SUFFIX}`,
    inchPerSecondSquaredUnit,
    metrePerMinuteSquaredUnit,
    footPerMinuteSquaredUnit,
    "gal",
    "g0",
  ],

  zaman: ["s", "ms", "min", "h", "day"],

  acisal_hiz: [
    "rad/s",
    "rad/min",
    "rad/h",
    "rpm",
    "Hz",
    degreePerSecondUnit,
    degreePerMinuteUnit,
    degreePerHourUnit,
  ],

  kuvvet: ["N", "kN", "dyn", "lbf"],

  tork: [newtonMetreUnit, kilonewtonMetreUnit, poundFootUnit],

  momentum: [
    kilogramMetrePerSecondUnit,
    newtonSecondUnit,
    poundFootPerSecondUnit,
  ],

  basinc: [
    "Pa",
    "kPa",
    "bar",
    "mbar",
    "atm",
    "at",
    "psi",
    "mmHg",
    "mmH2O",
    KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT,
  ],

  viskozite_dinamik: [pascalSecondUnit, millipascalSecondUnit, "P", "cP"],

  viskozite_kinematik: [
    squareMetrePerSecondUnit,
    squareMillimetrePerSecondUnit,
    "cSt",
  ],

  debi_hacimsel: [
    cubicMetrePerSecondUnit,
    "L/s",
    cubicMetrePerHourUnit,
    "L/min",
    "cfm",
    "gpm",
  ],

  debi_kutlesel: ["kg/s", "kg/h", "g/s", "g/h"],

  enerji: [
    "J",
    "kJ",
    "MJ",
    "Wh",
    "kWh",
    "cal",
    "kcal",
    "Btu",
    "th",
    "quad BTU",
  ],

  guc: ["W", "kW", "MW", "hp", "HP", "CV"],

  sicaklik: ["C", "F", "K"],

  isil_iletkenlik: [
    wattPerMetreKelvinUnit,
    kilowattPerMetreKelvinUnit,
    wattPerCentimetreKelvinUnit,
    btuPerHourFootFahrenheitUnit,
  ],

  isi_akisi: [
    wattPerSquareMetreUnit,
    kilowattPerSquareMetreUnit,
    caloriePerSquareCentimetreSecondUnit,
  ],

  ozgul_isi: [
    joulePerKilogramKelvinUnit,
    kilojoulePerKilogramKelvinUnit,
    caloriePerGramKelvinUnit,
    btuPerPoundFahrenheitUnit,
  ],

  elektrik_direnc: [ohmUnit, kiloOhmUnit, megaOhmUnit],

  elektrik_gerilim: ["V", "kV", "mV"],

  elektrik_akim: ["A", "mA", "kA"],

  kapasitans: ["F", "mF", microfaradUnit, "nF", "pF"],

  enduktans: ["H", "mH", microhenryUnit],

  elektrik_yuk: ["C", "mC", microcoulombUnit, "nC"],

  manyetik_alan: ["A/m", "kA/m", "Oe"],

  manyetik_aki: ["Wb", "mWb", microweberUnit, "nWb", "weber"],
};
