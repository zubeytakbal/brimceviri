import {
  chooseBestEngineeringUnit,
  normalizeEngineeringUnitSymbol,
  SQUARE_SUFFIX,
  type EngineeringUnitDefinition,
  type EngineeringUnitGroup,
} from "./engineeringUnits";

export type CalculatorLocale = "tr" | "en" | "de";

export type CalculatorQuantity =
  | "energy"
  | "mass"
  | "specificHeat"
  | "temperatureDifference"
  | "power"
  | "thermalConductivity"
  | "area"
  | "length"
  | "density"
  | "speed"
  | "diameter"
  | "viscosity";

const DEGREE_CELSIUS_UNIT = "\u00B0C";
const DEGREE_FAHRENHEIT_UNIT = "\u00B0F";
const MIDDLE_DOT = "\u00B7";
const SQUARE_METRE_UNIT = `m${SQUARE_SUFFIX}` as const;
const SQUARE_CENTIMETRE_UNIT = `cm${SQUARE_SUFFIX}` as const;
const SQUARE_MILLIMETRE_UNIT = `mm${SQUARE_SUFFIX}` as const;
const SQUARE_INCH_UNIT = `in${SQUARE_SUFFIX}` as const;
const SQUARE_FOOT_UNIT = `ft${SQUARE_SUFFIX}` as const;
const SQUARE_KILOMETRE_UNIT = `km${SQUARE_SUFFIX}` as const;
const MICROMETRE_UNIT = "\u00B5m" as const;
const KILOGRAM_PER_CUBIC_METRE_UNIT = "kg/m\u00B3" as const;
const GRAM_PER_CUBIC_CENTIMETRE_UNIT = "g/cm\u00B3" as const;
const GRAM_PER_LITRE_UNIT = "g/L" as const;
const POUND_PER_CUBIC_FOOT_UNIT = "lb/ft\u00B3" as const;
const POUND_PER_CUBIC_INCH_UNIT = "lb/in\u00B3" as const;
const JOULE_PER_KILOGRAM_KELVIN_UNIT =
  `J/(kg${MIDDLE_DOT}K)` as const;
const JOULE_PER_GR_CELSIUS_UNIT =
  `J/(g${MIDDLE_DOT}${DEGREE_CELSIUS_UNIT})` as const;
const KILOJOULE_PER_KILOGRAM_KELVIN_UNIT =
  `kJ/(kg${MIDDLE_DOT}K)` as const;
const KILOJOULE_PER_KILOGRAM_CELSIUS_UNIT =
  `kJ/(kg${MIDDLE_DOT}${DEGREE_CELSIUS_UNIT})` as const;
const CALORIE_PER_GR_CELSIUS_UNIT =
  `cal/(g${MIDDLE_DOT}${DEGREE_CELSIUS_UNIT})` as const;
const BTU_PER_POUND_FAHRENHEIT_UNIT =
  `Btu/(lb${MIDDLE_DOT}${DEGREE_FAHRENHEIT_UNIT})` as const;
const WATT_PER_METRE_KELVIN_UNIT =
  `W/(m${MIDDLE_DOT}K)` as const;
const WATT_PER_METRE_CELSIUS_UNIT =
  `W/(m${MIDDLE_DOT}${DEGREE_CELSIUS_UNIT})` as const;
const MILLIWATT_PER_METRE_KELVIN_UNIT =
  `mW/(m${MIDDLE_DOT}K)` as const;
const BTU_PER_HOUR_FOOT_FAHRENHEIT_UNIT =
  `Btu/(h${MIDDLE_DOT}ft${MIDDLE_DOT}${DEGREE_FAHRENHEIT_UNIT})` as const;
const PASCAL_SECOND_UNIT = `Pa${MIDDLE_DOT}s` as const;
const MILLIPASCAL_SECOND_UNIT = `mPa${MIDDLE_DOT}s` as const;
const POISE_UNIT = "P" as const;

export const heatEnergyUnitDefinitions = [
  {
    symbol: "J",
    trName: "Joule",
    enName: "Joule",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI enerji birimi",
    typicalUseEn: "Base SI energy unit",
  },
  {
    symbol: "kJ",
    trName: "Kilojoule",
    enName: "Kilojoule",
    factorToSI: 1000,
    group: "si",
    typicalUseTr: "Mühendislik ısı hesapları",
    typicalUseEn: "Engineering heat calculations",
  },
  {
    symbol: "MJ",
    trName: "Megajoule",
    enName: "Megajoule",
    factorToSI: 1_000_000,
    group: "si",
    typicalUseTr: "Büyük enerji aktarımları",
    typicalUseEn: "Large energy transfers",
  },
  {
    symbol: "GJ",
    trName: "Gigajoule",
    enName: "Gigajoule",
    factorToSI: 1_000_000_000,
    group: "si",
    typicalUseTr: "Çok büyük enerji bütçeleri",
    typicalUseEn: "Very large energy budgets",
  },
  {
    symbol: "Wh",
    trName: "Watt-saat",
    enName: "Watt-hour",
    factorToSI: 3600,
    group: "metric",
    typicalUseTr: "Küçük elektriksel enerji miktarları",
    typicalUseEn: "Small electrical energy quantities",
  },
  {
    symbol: "kWh",
    trName: "Kilowatt-saat",
    enName: "Kilowatt-hour",
    factorToSI: 3_600_000,
    group: "metric",
    typicalUseTr: "Elektrik tüketimi ve depolama kapasitesi",
    typicalUseEn: "Electricity consumption and storage capacity",
  },
  {
    symbol: "cal",
    trName: "Kalori",
    enName: "Calorie",
    factorToSI: 4.184,
    group: "metric",
    typicalUseTr: "Eski ısı ve laboratuvar hesapları",
    typicalUseEn: "Legacy heat and laboratory calculations",
  },
  {
    symbol: "kcal",
    trName: "Kilokalori",
    enName: "Kilocalorie",
    factorToSI: 4184,
    group: "metric",
    typicalUseTr: "Pratik ısı enerjisi gösterimleri",
    typicalUseEn: "Practical heat-energy notation",
  },
  {
    symbol: "Btu",
    trName: "British thermal unit",
    enName: "British thermal unit",
    factorToSI: 1055.05585262,
    group: "imperial",
    typicalUseTr: "HVAC ve Anglo-Amerikan ısı hesapları",
    typicalUseEn: "HVAC and Anglo-American heat calculations",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const calculatorMassUnitDefinitions = [
  {
    symbol: "mg",
    trName: "Miligram",
    enName: "Milligram",
    factorToSI: 0.000001,
    group: "si",
    typicalUseTr: "Çok küçük numune kütleleri",
    typicalUseEn: "Very small sample masses",
  },
  {
    symbol: "g",
    trName: "Gram",
    enName: "Gram",
    factorToSI: 0.001,
    group: "si",
    typicalUseTr: "Küçük numune kütleleri",
    typicalUseEn: "Small sample masses",
  },
  {
    symbol: "kg",
    trName: "Kilogram",
    enName: "Kilogram",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI kütle birimi",
    typicalUseEn: "Base SI mass unit",
  },
  {
    symbol: "t",
    trName: "Ton",
    enName: "Tonne",
    factorToSI: 1000,
    group: "si",
    typicalUseTr: "Büyük kütleler ve toplu malzeme",
    typicalUseEn: "Large masses and bulk materials",
  },
  {
    symbol: "oz",
    trName: "Ons",
    enName: "Ounce",
    factorToSI: 0.028349523125,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD küçük kütle ölçüleri",
    typicalUseEn: "Imperial/US small mass measurements",
  },
  {
    symbol: "lb",
    trName: "Pound",
    enName: "Pound",
    factorToSI: 0.45359237,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD kütle ölçüleri",
    typicalUseEn: "Imperial/US mass measurements",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const specificHeatUnitDefinitions = [
  {
    symbol: JOULE_PER_KILOGRAM_KELVIN_UNIT,
    trName: "Joule/kilogram-kelvin",
    enName: "Joule per kilogram-kelvin",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI özgül ısı birimi",
    typicalUseEn: "Base SI specific-heat unit",
  },
  {
    symbol: JOULE_PER_GR_CELSIUS_UNIT,
    trName: "Joule/gram-santigrat derece",
    enName: "Joule per gram-degree Celsius",
    factorToSI: 1000,
    group: "metric",
    typicalUseTr: "Laboratuvar ve malzeme tabloları",
    typicalUseEn: "Laboratory and material tables",
  },
  {
    symbol: KILOJOULE_PER_KILOGRAM_KELVIN_UNIT,
    trName: "Kilojoule/kilogram-kelvin",
    enName: "Kilojoule per kilogram-kelvin",
    factorToSI: 1000,
    group: "metric",
    typicalUseTr: "Pratik mühendislik raporları",
    typicalUseEn: "Practical engineering reports",
  },
  {
    symbol: KILOJOULE_PER_KILOGRAM_CELSIUS_UNIT,
    trName: "Kilojoule/kilogram-santigrat derece",
    enName: "Kilojoule per kilogram-degree Celsius",
    factorToSI: 1000,
    group: "metric",
    typicalUseTr: "Sıcaklık farkı °C ile verilen raporlar",
    typicalUseEn: "Reports using °C temperature differences",
  },
  {
    symbol: CALORIE_PER_GR_CELSIUS_UNIT,
    trName: "Kalori/gram-santigrat derece",
    enName: "Calorie per gram-degree Celsius",
    factorToSI: 4184,
    group: "metric",
    typicalUseTr: "Eski termal özellik çizelgeleri",
    typicalUseEn: "Legacy thermal-property charts",
  },
  {
    symbol: BTU_PER_POUND_FAHRENHEIT_UNIT,
    trName: "Btu/pound-Fahrenheit derece",
    enName: "Btu per pound-degree Fahrenheit",
    factorToSI: 4186.800584851108,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD termal özellik tabloları",
    typicalUseEn: "Imperial/US thermal-property tables",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const temperatureDifferenceUnitDefinitions = [
  {
    symbol: "K",
    trName: "Kelvin farkı",
    enName: "Kelvin difference",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "SI sıcaklık farkı",
    typicalUseEn: "SI temperature difference",
  },
  {
    symbol: DEGREE_CELSIUS_UNIT,
    trName: "Santigrat derece farkı",
    enName: "Degree Celsius difference",
    factorToSI: 1,
    group: "metric",
    typicalUseTr: "Pratik sıcaklık farkı gösterimi",
    typicalUseEn: "Practical temperature-difference notation",
  },
  {
    symbol: DEGREE_FAHRENHEIT_UNIT,
    trName: "Fahrenheit derece farkı",
    enName: "Degree Fahrenheit difference",
    factorToSI: 5 / 9,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD sıcaklık farkı gösterimi",
    typicalUseEn: "Imperial/US temperature-difference notation",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const powerUnitDefinitions = [
  {
    symbol: "W",
    trName: "Watt",
    enName: "Watt",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI ısı geçiş hızı birimi",
    typicalUseEn: "Base SI heat-transfer-rate unit",
  },
  {
    symbol: "kW",
    trName: "Kilowatt",
    enName: "Kilowatt",
    factorToSI: 1000,
    group: "si",
    typicalUseTr: "Daha büyük ısı yükleri",
    typicalUseEn: "Larger heat loads",
  },
  {
    symbol: "MW",
    trName: "Megawatt",
    enName: "Megawatt",
    factorToSI: 1_000_000,
    group: "si",
    typicalUseTr: "Çok büyük ısı geçişleri",
    typicalUseEn: "Very large heat-transfer rates",
  },
  {
    symbol: "kcal/h",
    trName: "Kilokalori/saat",
    enName: "Kilocalorie per hour",
    factorToSI: 4184 / 3600,
    group: "metric",
    typicalUseTr: "Eski ısı yükü ve proses hesapları",
    typicalUseEn: "Legacy heat-load and process calculations",
  },
  {
    symbol: "Btu/h",
    trName: "Btu/saat",
    enName: "Btu per hour",
    factorToSI: 0.2930710701722222,
    group: "imperial",
    typicalUseTr: "HVAC ve İngiliz/ABD ısı yükleri",
    typicalUseEn: "HVAC and Imperial/US heat loads",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const thermalConductivityUnitDefinitions = [
  {
    symbol: WATT_PER_METRE_KELVIN_UNIT,
    trName: "Watt/metre-kelvin",
    enName: "Watt per meter-kelvin",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI ısıl iletkenlik birimi",
    typicalUseEn: "Base SI thermal-conductivity unit",
  },
  {
    symbol: WATT_PER_METRE_CELSIUS_UNIT,
    trName: "Watt/metre-santigrat derece",
    enName: "Watt per meter-degree Celsius",
    factorToSI: 1,
    group: "metric",
    typicalUseTr: "ΔT ifadesi °C olan pratik gösterim",
    typicalUseEn: "Practical notation with °C temperature differences",
  },
  {
    symbol: MILLIWATT_PER_METRE_KELVIN_UNIT,
    trName: "Miliwatt/metre-kelvin",
    enName: "Milliwatt per meter-kelvin",
    factorToSI: 0.001,
    group: "metric",
    typicalUseTr: "Düşük iletkenlikli malzemeler",
    typicalUseEn: "Low-conductivity materials",
  },
  {
    symbol: BTU_PER_HOUR_FOOT_FAHRENHEIT_UNIT,
    trName: "Btu/saat-fit-Fahrenheit derece",
    enName: "Btu per hour-foot-degree Fahrenheit",
    factorToSI: 1.73073466637139,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD ısıl iletkenlik tabloları",
    typicalUseEn: "Imperial/US thermal-conductivity tables",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const calculatorAreaUnitDefinitions = [
  {
    symbol: SQUARE_MILLIMETRE_UNIT,
    trName: "Milimetrekare",
    enName: "Square millimeter",
    factorToSI: 1e-6,
    group: "si",
    typicalUseTr: "Küçük kesit ve yüzeyler",
    typicalUseEn: "Small sections and surfaces",
  },
  {
    symbol: SQUARE_CENTIMETRE_UNIT,
    trName: "Santimetrekare",
    enName: "Square centimeter",
    factorToSI: 1e-4,
    group: "si",
    typicalUseTr: "Orta ölçekli deney yüzeyleri",
    typicalUseEn: "Medium-scale test surfaces",
  },
  {
    symbol: SQUARE_METRE_UNIT,
    trName: "Metrekare",
    enName: "Square meter",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI alan birimi",
    typicalUseEn: "Base SI area unit",
  },
  {
    symbol: SQUARE_KILOMETRE_UNIT,
    trName: "Kilometrekare",
    enName: "Square kilometer",
    factorToSI: 1_000_000,
    group: "si",
    typicalUseTr: "Çok büyük yüzeyler",
    typicalUseEn: "Very large surfaces",
  },
  {
    symbol: SQUARE_INCH_UNIT,
    trName: "İnçkare",
    enName: "Square inch",
    factorToSI: 0.00064516,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD küçük yüzey alanları",
    typicalUseEn: "Imperial/US small surface areas",
  },
  {
    symbol: SQUARE_FOOT_UNIT,
    trName: "Fitkare",
    enName: "Square foot",
    factorToSI: 0.09290304,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD yüzey alanları",
    typicalUseEn: "Imperial/US surface areas",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const calculatorLengthUnitDefinitions = [
  {
    symbol: "mm",
    trName: "Milimetre",
    enName: "Millimeter",
    factorToSI: 0.001,
    group: "si",
    typicalUseTr: "İnce tabakalar ve küçük çaplar",
    typicalUseEn: "Thin layers and small diameters",
  },
  {
    symbol: "cm",
    trName: "Santimetre",
    enName: "Centimeter",
    factorToSI: 0.01,
    group: "si",
    typicalUseTr: "Kısa boyutlar",
    typicalUseEn: "Short dimensions",
  },
  {
    symbol: "m",
    trName: "Metre",
    enName: "Meter",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI uzunluk birimi",
    typicalUseEn: "Base SI length unit",
  },
  {
    symbol: "km",
    trName: "Kilometre",
    enName: "Kilometer",
    factorToSI: 1000,
    group: "si",
    typicalUseTr: "Çok büyük mesafeler ve uzun katmanlar",
    typicalUseEn: "Very large distances and long layers",
  },
  {
    symbol: "in",
    trName: "İnç",
    enName: "Inch",
    factorToSI: 0.0254,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD kalınlık ölçüleri",
    typicalUseEn: "Imperial/US thickness measurements",
  },
  {
    symbol: "ft",
    trName: "Fit",
    enName: "Foot",
    factorToSI: 0.3048,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD uzunluk ölçüleri",
    typicalUseEn: "Imperial/US length measurements",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const reynoldsDensityUnitDefinitions = [
  {
    symbol: KILOGRAM_PER_CUBIC_METRE_UNIT,
    trName: "Kilogram/metreküp",
    enName: "Kilogram per cubic meter",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI yoğunluk birimi",
    typicalUseEn: "Base SI density unit",
  },
  {
    symbol: GRAM_PER_CUBIC_CENTIMETRE_UNIT,
    trName: "Gram/santimetreküp",
    enName: "Gram per cubic centimeter",
    factorToSI: 1000,
    group: "metric",
    typicalUseTr: "Sıvılar için pratik yoğunluk gösterimi",
    typicalUseEn: "Practical density notation for liquids",
  },
  {
    symbol: GRAM_PER_LITRE_UNIT,
    trName: "Gram/litre",
    enName: "Gram per liter",
    factorToSI: 1,
    group: "metric",
    typicalUseTr: "Gazlar ve seyreltik karışımlar",
    typicalUseEn: "Gases and dilute mixtures",
  },
  {
    symbol: POUND_PER_CUBIC_FOOT_UNIT,
    trName: "Pound/fitküp",
    enName: "Pound per cubic foot",
    factorToSI: 16.01846337396014,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD yoğunluk tabloları",
    typicalUseEn: "Imperial/US density tables",
  },
  {
    symbol: POUND_PER_CUBIC_INCH_UNIT,
    trName: "Pound/inçküp",
    enName: "Pound per cubic inch",
    factorToSI: 27679.904710191,
    group: "imperial",
    typicalUseTr: "Çok yoğun malzemeler için İngiliz/ABD gösterimi",
    typicalUseEn: "Imperial/US notation for very dense materials",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const speedUnitDefinitions = [
  {
    symbol: "mm/s",
    trName: "Milimetre/saniye",
    enName: "Millimeter per second",
    factorToSI: 0.001,
    group: "si",
    typicalUseTr: "Çok düşük akış hızları",
    typicalUseEn: "Very low flow velocities",
  },
  {
    symbol: "cm/s",
    trName: "Santimetre/saniye",
    enName: "Centimeter per second",
    factorToSI: 0.01,
    group: "si",
    typicalUseTr: "Düşük akış hızları ve laboratuvar düzenekleri",
    typicalUseEn: "Low velocities and laboratory setups",
  },
  {
    symbol: "m/s",
    trName: "Metre/saniye",
    enName: "Meter per second",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI hız birimi",
    typicalUseEn: "Base SI velocity unit",
  },
  {
    symbol: "km/h",
    trName: "Kilometre/saat",
    enName: "Kilometer per hour",
    factorToSI: 1 / 3.6,
    group: "metric",
    typicalUseTr: "Pratik akış ve saha hızları",
    typicalUseEn: "Practical flow and field velocities",
  },
  {
    symbol: "ft/s",
    trName: "Fit/saniye",
    enName: "Foot per second",
    factorToSI: 0.3048,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD akış hesapları",
    typicalUseEn: "Imperial/US flow calculations",
  },
  {
    symbol: "mph",
    trName: "Mil/saat",
    enName: "Mile per hour",
    factorToSI: 0.44704,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD saha hızları",
    typicalUseEn: "Imperial/US field velocities",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const diameterUnitDefinitions = [
  {
    symbol: MICROMETRE_UNIT,
    trName: "Mikrometre",
    enName: "Micrometer",
    factorToSI: 0.000001,
    group: "si",
    typicalUseTr: "Mikrokanal ve çok küçük karakteristik uzunluklar",
    typicalUseEn: "Microchannels and very small characteristic lengths",
  },
  {
    symbol: "mm",
    trName: "Milimetre",
    enName: "Millimeter",
    factorToSI: 0.001,
    group: "si",
    typicalUseTr: "Küçük boru ve kanal çapları",
    typicalUseEn: "Small pipe and channel diameters",
  },
  {
    symbol: "cm",
    trName: "Santimetre",
    enName: "Centimeter",
    factorToSI: 0.01,
    group: "si",
    typicalUseTr: "Orta ölçekli boru çapları",
    typicalUseEn: "Medium-scale pipe diameters",
  },
  {
    symbol: "m",
    trName: "Metre",
    enName: "Meter",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI karakteristik uzunluk birimi",
    typicalUseEn: "Base SI characteristic-length unit",
  },
  {
    symbol: "in",
    trName: "İnç",
    enName: "Inch",
    factorToSI: 0.0254,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD boru ölçüleri",
    typicalUseEn: "Imperial/US pipe sizes",
  },
  {
    symbol: "ft",
    trName: "Fit",
    enName: "Foot",
    factorToSI: 0.3048,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD büyük kanal boyutları",
    typicalUseEn: "Imperial/US large duct sizes",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const viscosityUnitDefinitions = [
  {
    symbol: PASCAL_SECOND_UNIT,
    trName: "Pascal-saniye",
    enName: "Pascal-second",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI dinamik viskozite birimi",
    typicalUseEn: "Base SI dynamic-viscosity unit",
  },
  {
    symbol: MILLIPASCAL_SECOND_UNIT,
    trName: "Millipascal-saniye",
    enName: "Millipascal-second",
    factorToSI: 0.001,
    group: "metric",
    typicalUseTr: "Sıvılar için pratik mühendislik kullanımı",
    typicalUseEn: "Practical engineering use for liquids",
  },
  {
    symbol: POISE_UNIT,
    trName: "Poise",
    enName: "Poise",
    factorToSI: 0.1,
    group: "metric",
    typicalUseTr: "CGS tabanlı akışkan verileri",
    typicalUseEn: "CGS-based fluid-property data",
  },
  {
    symbol: "cP",
    trName: "Centipoise",
    enName: "Centipoise",
    factorToSI: 0.001,
    group: "metric",
    typicalUseTr: "Laboratuvar ve akışkan tabloları",
    typicalUseEn: "Laboratory and fluid-property tables",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export type HeatEnergyUnit =
  (typeof heatEnergyUnitDefinitions)[number]["symbol"];
export type CalculatorMassUnit =
  (typeof calculatorMassUnitDefinitions)[number]["symbol"];
export type SpecificHeatUnit =
  (typeof specificHeatUnitDefinitions)[number]["symbol"];
export type TemperatureDifferenceUnit =
  (typeof temperatureDifferenceUnitDefinitions)[number]["symbol"];
export type PowerUnit =
  (typeof powerUnitDefinitions)[number]["symbol"];
export type ThermalConductivityUnit =
  (typeof thermalConductivityUnitDefinitions)[number]["symbol"];
export type CalculatorAreaUnit =
  (typeof calculatorAreaUnitDefinitions)[number]["symbol"];
export type CalculatorLengthUnit =
  (typeof calculatorLengthUnitDefinitions)[number]["symbol"];
export type ReynoldsDensityUnit =
  (typeof reynoldsDensityUnitDefinitions)[number]["symbol"];
export type SpeedUnit =
  (typeof speedUnitDefinitions)[number]["symbol"];
export type DiameterUnit =
  (typeof diameterUnitDefinitions)[number]["symbol"];
export type ViscosityUnit =
  (typeof viscosityUnitDefinitions)[number]["symbol"];

type CalculatorUnitCollection = {
  energy: typeof heatEnergyUnitDefinitions;
  mass: typeof calculatorMassUnitDefinitions;
  specificHeat: typeof specificHeatUnitDefinitions;
  temperatureDifference: typeof temperatureDifferenceUnitDefinitions;
  power: typeof powerUnitDefinitions;
  thermalConductivity: typeof thermalConductivityUnitDefinitions;
  area: typeof calculatorAreaUnitDefinitions;
  length: typeof calculatorLengthUnitDefinitions;
  density: typeof reynoldsDensityUnitDefinitions;
  speed: typeof speedUnitDefinitions;
  diameter: typeof diameterUnitDefinitions;
  viscosity: typeof viscosityUnitDefinitions;
};

const calculatorUnitsByQuantity: CalculatorUnitCollection = {
  energy: heatEnergyUnitDefinitions,
  mass: calculatorMassUnitDefinitions,
  specificHeat: specificHeatUnitDefinitions,
  temperatureDifference: temperatureDifferenceUnitDefinitions,
  power: powerUnitDefinitions,
  thermalConductivity: thermalConductivityUnitDefinitions,
  area: calculatorAreaUnitDefinitions,
  length: calculatorLengthUnitDefinitions,
  density: reynoldsDensityUnitDefinitions,
  speed: speedUnitDefinitions,
  diameter: diameterUnitDefinitions,
  viscosity: viscosityUnitDefinitions,
};

const groupOrder: EngineeringUnitGroup[] = [
  "si",
  "metric",
  "imperial",
];

const groupLabels: Record<
  CalculatorLocale,
  Record<EngineeringUnitGroup, string>
> = {
  tr: {
    si: "SI birimleri",
    metric: "Metrik ve pratik",
    imperial: "İngiliz/ABD birimleri",
  },
  en: {
    si: "SI units",
    metric: "Metric and practical",
    imperial: "Imperial/US units",
  },
  de: {
    si: "SI-Einheiten",
    metric: "Metrische und praktische Einheiten",
    imperial: "Imperiale/US-Einheiten",
  },
};

const preferredHeatEnergyUnits = [
  "J",
  "kJ",
  "MJ",
  "GJ",
] as const satisfies readonly HeatEnergyUnit[];

const preferredMassUnits = [
  "mg",
  "g",
  "kg",
  "t",
] as const satisfies readonly CalculatorMassUnit[];

const preferredSpecificHeatUnits = [
  JOULE_PER_KILOGRAM_KELVIN_UNIT,
  KILOJOULE_PER_KILOGRAM_CELSIUS_UNIT,
  JOULE_PER_GR_CELSIUS_UNIT,
  KILOJOULE_PER_KILOGRAM_KELVIN_UNIT,
  CALORIE_PER_GR_CELSIUS_UNIT,
  BTU_PER_POUND_FAHRENHEIT_UNIT,
] as const satisfies readonly SpecificHeatUnit[];

const preferredPowerUnits = [
  "W",
  "kW",
  "MW",
] as const satisfies readonly PowerUnit[];

const preferredAreaUnits = [
  SQUARE_MILLIMETRE_UNIT,
  SQUARE_CENTIMETRE_UNIT,
  SQUARE_METRE_UNIT,
  SQUARE_INCH_UNIT,
  SQUARE_FOOT_UNIT,
  SQUARE_KILOMETRE_UNIT,
] as const satisfies readonly CalculatorAreaUnit[];

const preferredLengthUnits = [
  "mm",
  "cm",
  "m",
  "in",
  "ft",
  "km",
] as const satisfies readonly CalculatorLengthUnit[];

const preferredDiameterUnits = [
  MICROMETRE_UNIT,
  "mm",
  "cm",
  "m",
  "in",
  "ft",
] as const satisfies readonly DiameterUnit[];

function getUnits<TQuantity extends CalculatorQuantity>(
  quantity: TQuantity
): CalculatorUnitCollection[TQuantity] {
  return calculatorUnitsByQuantity[quantity];
}

function getNormalizedUnit<TSymbol extends string>(
  symbol: TSymbol | string
) {
  return normalizeEngineeringUnitSymbol(symbol);
}

export function formatCalculatorUnitName(
  unit: EngineeringUnitDefinition,
  locale: CalculatorLocale
) {
  const unitName =
    locale === "tr"
      ? unit.trName
      : unit.enName;

  return `${unitName} (${unit.symbol})`;
}

export function getCalculatorUnitGroups(
  quantity: CalculatorQuantity,
  locale: CalculatorLocale
) {
  const units = getUnits(quantity);

  return groupOrder
    .map((group) => ({
      group,
      label: groupLabels[locale][group],
      units: units.filter((unit) => unit.group === group),
    }))
    .filter((group) => group.units.length > 0);
}

function findUnit<TUnit extends string>(
  symbol: TUnit | string,
  units: readonly EngineeringUnitDefinition<TUnit>[]
) {
  const normalizedSymbol = getNormalizedUnit(symbol);
  return units.find((unit) => unit.symbol === normalizedSymbol);
}

function mustFindUnit<TUnit extends string>(
  symbol: TUnit,
  units: readonly EngineeringUnitDefinition<TUnit>[],
  unitName: string
) {
  const unit = findUnit(symbol, units);

  if (!unit) {
    throw new Error(`Unknown ${unitName} unit: ${symbol}`);
  }

  return unit;
}

export function findHeatEnergyUnit(symbol: HeatEnergyUnit | string) {
  return findUnit(symbol, heatEnergyUnitDefinitions);
}

export function findCalculatorMassUnit(
  symbol: CalculatorMassUnit | string
) {
  return findUnit(symbol, calculatorMassUnitDefinitions);
}

export function findSpecificHeatUnit(
  symbol: SpecificHeatUnit | string
) {
  return findUnit(symbol, specificHeatUnitDefinitions);
}

export function findTemperatureDifferenceUnit(
  symbol: TemperatureDifferenceUnit | string
) {
  return findUnit(symbol, temperatureDifferenceUnitDefinitions);
}

export function findPowerUnit(symbol: PowerUnit | string) {
  return findUnit(symbol, powerUnitDefinitions);
}

export function findThermalConductivityUnit(
  symbol: ThermalConductivityUnit | string
) {
  return findUnit(symbol, thermalConductivityUnitDefinitions);
}

export function findCalculatorAreaUnit(
  symbol: CalculatorAreaUnit | string
) {
  return findUnit(symbol, calculatorAreaUnitDefinitions);
}

export function findCalculatorLengthUnit(
  symbol: CalculatorLengthUnit | string
) {
  return findUnit(symbol, calculatorLengthUnitDefinitions);
}

export function findReynoldsDensityUnit(
  symbol: ReynoldsDensityUnit | string
) {
  return findUnit(symbol, reynoldsDensityUnitDefinitions);
}

export function findSpeedUnit(symbol: SpeedUnit | string) {
  return findUnit(symbol, speedUnitDefinitions);
}

export function findDiameterUnit(symbol: DiameterUnit | string) {
  return findUnit(symbol, diameterUnitDefinitions);
}

export function findViscosityUnit(symbol: ViscosityUnit | string) {
  return findUnit(symbol, viscosityUnitDefinitions);
}

export function convertHeatEnergyToSI(
  value: number,
  unit: HeatEnergyUnit
) {
  return value * mustFindUnit(unit, heatEnergyUnitDefinitions, "heat energy").factorToSI;
}

export function convertHeatEnergyFromSI(
  valueInJoule: number,
  unit: HeatEnergyUnit
) {
  return valueInJoule / mustFindUnit(unit, heatEnergyUnitDefinitions, "heat energy").factorToSI;
}

export function convertCalculatorMassToSI(
  value: number,
  unit: CalculatorMassUnit
) {
  return value * mustFindUnit(unit, calculatorMassUnitDefinitions, "mass").factorToSI;
}

export function convertCalculatorMassFromSI(
  valueInKilogram: number,
  unit: CalculatorMassUnit
) {
  return valueInKilogram / mustFindUnit(unit, calculatorMassUnitDefinitions, "mass").factorToSI;
}

export function convertSpecificHeatToSI(
  value: number,
  unit: SpecificHeatUnit
) {
  return value * mustFindUnit(unit, specificHeatUnitDefinitions, "specific heat").factorToSI;
}

export function convertSpecificHeatFromSI(
  valueInJoulePerKilogramKelvin: number,
  unit: SpecificHeatUnit
) {
  return valueInJoulePerKilogramKelvin / mustFindUnit(unit, specificHeatUnitDefinitions, "specific heat").factorToSI;
}

export function convertTemperatureDifferenceToSI(
  value: number,
  unit: TemperatureDifferenceUnit
) {
  return (
    value *
    mustFindUnit(
      unit,
      temperatureDifferenceUnitDefinitions,
      "temperature difference"
    ).factorToSI
  );
}

export function convertTemperatureDifferenceFromSI(
  valueInKelvinDifference: number,
  unit: TemperatureDifferenceUnit
) {
  return (
    valueInKelvinDifference /
    mustFindUnit(
      unit,
      temperatureDifferenceUnitDefinitions,
      "temperature difference"
    ).factorToSI
  );
}

export function convertPowerToSI(
  value: number,
  unit: PowerUnit
) {
  return value * mustFindUnit(unit, powerUnitDefinitions, "power").factorToSI;
}

export function convertPowerFromSI(
  valueInWatt: number,
  unit: PowerUnit
) {
  return valueInWatt / mustFindUnit(unit, powerUnitDefinitions, "power").factorToSI;
}

export function convertThermalConductivityToSI(
  value: number,
  unit: ThermalConductivityUnit
) {
  return value * mustFindUnit(unit, thermalConductivityUnitDefinitions, "thermal conductivity").factorToSI;
}

export function convertThermalConductivityFromSI(
  valueInWattPerMetreKelvin: number,
  unit: ThermalConductivityUnit
) {
  return valueInWattPerMetreKelvin / mustFindUnit(unit, thermalConductivityUnitDefinitions, "thermal conductivity").factorToSI;
}

export function convertCalculatorAreaToSI(
  value: number,
  unit: CalculatorAreaUnit
) {
  return value * mustFindUnit(unit, calculatorAreaUnitDefinitions, "area").factorToSI;
}

export function convertCalculatorAreaFromSI(
  valueInSquareMetre: number,
  unit: CalculatorAreaUnit
) {
  return valueInSquareMetre / mustFindUnit(unit, calculatorAreaUnitDefinitions, "area").factorToSI;
}

export function convertCalculatorLengthToSI(
  value: number,
  unit: CalculatorLengthUnit
) {
  return value * mustFindUnit(unit, calculatorLengthUnitDefinitions, "length").factorToSI;
}

export function convertCalculatorLengthFromSI(
  valueInMetre: number,
  unit: CalculatorLengthUnit
) {
  return valueInMetre / mustFindUnit(unit, calculatorLengthUnitDefinitions, "length").factorToSI;
}

export function convertReynoldsDensityToSI(
  value: number,
  unit: ReynoldsDensityUnit
) {
  return value * mustFindUnit(unit, reynoldsDensityUnitDefinitions, "density").factorToSI;
}

export function convertReynoldsDensityFromSI(
  valueInKilogramPerCubicMetre: number,
  unit: ReynoldsDensityUnit
) {
  return valueInKilogramPerCubicMetre / mustFindUnit(unit, reynoldsDensityUnitDefinitions, "density").factorToSI;
}

export function convertSpeedToSI(
  value: number,
  unit: SpeedUnit
) {
  return value * mustFindUnit(unit, speedUnitDefinitions, "speed").factorToSI;
}

export function convertSpeedFromSI(
  valueInMetresPerSecond: number,
  unit: SpeedUnit
) {
  return valueInMetresPerSecond / mustFindUnit(unit, speedUnitDefinitions, "speed").factorToSI;
}

export function convertDiameterToSI(
  value: number,
  unit: DiameterUnit
) {
  return value * mustFindUnit(unit, diameterUnitDefinitions, "diameter").factorToSI;
}

export function convertDiameterFromSI(
  valueInMetre: number,
  unit: DiameterUnit
) {
  return valueInMetre / mustFindUnit(unit, diameterUnitDefinitions, "diameter").factorToSI;
}

export function convertViscosityToSI(
  value: number,
  unit: ViscosityUnit
) {
  return value * mustFindUnit(unit, viscosityUnitDefinitions, "viscosity").factorToSI;
}

export function convertViscosityFromSI(
  valueInPascalSecond: number,
  unit: ViscosityUnit
) {
  return valueInPascalSecond / mustFindUnit(unit, viscosityUnitDefinitions, "viscosity").factorToSI;
}

function getPreferredHeatEnergyUnits() {
  return preferredHeatEnergyUnits.map((symbol) =>
    mustFindUnit(symbol, heatEnergyUnitDefinitions, "heat energy")
  );
}

function getPreferredMassUnits() {
  return preferredMassUnits.map((symbol) =>
    mustFindUnit(symbol, calculatorMassUnitDefinitions, "mass")
  );
}

function getPreferredSpecificHeatUnits() {
  return preferredSpecificHeatUnits.map((symbol) =>
    mustFindUnit(symbol, specificHeatUnitDefinitions, "specific heat")
  );
}

function getPreferredPowerUnits() {
  return preferredPowerUnits.map((symbol) =>
    mustFindUnit(symbol, powerUnitDefinitions, "power")
  );
}

function getPreferredAreaUnits() {
  return preferredAreaUnits.map((symbol) =>
    mustFindUnit(symbol, calculatorAreaUnitDefinitions, "area")
  );
}

function getPreferredLengthUnits() {
  return preferredLengthUnits.map((symbol) =>
    mustFindUnit(symbol, calculatorLengthUnitDefinitions, "length")
  );
}

function getPreferredDiameterUnits() {
  return preferredDiameterUnits.map((symbol) =>
    mustFindUnit(symbol, diameterUnitDefinitions, "diameter")
  );
}

export function inferHeatEnergyUnit(valueInJoule: number) {
  return chooseBestEngineeringUnit(
    valueInJoule,
    getPreferredHeatEnergyUnits(),
    "J"
  );
}

export function inferCalculatorMassUnit(valueInKilogram: number) {
  return chooseBestEngineeringUnit(
    valueInKilogram,
    getPreferredMassUnits(),
    "kg"
  );
}

export function inferSpecificHeatUnit(
  valueInJoulePerKilogramKelvin: number
) {
  return chooseBestEngineeringUnit(
    valueInJoulePerKilogramKelvin,
    getPreferredSpecificHeatUnits(),
    JOULE_PER_KILOGRAM_KELVIN_UNIT
  );
}

export function inferPowerUnit(valueInWatt: number) {
  return chooseBestEngineeringUnit(
    valueInWatt,
    getPreferredPowerUnits(),
    "W"
  );
}

export function inferCalculatorAreaUnit(valueInSquareMetre: number) {
  return chooseBestEngineeringUnit(
    valueInSquareMetre,
    getPreferredAreaUnits(),
    SQUARE_METRE_UNIT
  );
}

export function inferCalculatorLengthUnit(valueInMetre: number) {
  return chooseBestEngineeringUnit(
    valueInMetre,
    getPreferredLengthUnits(),
    "m"
  );
}

export function inferDiameterUnit(valueInMetre: number) {
  return chooseBestEngineeringUnit(
    valueInMetre,
    getPreferredDiameterUnits(),
    "m"
  );
}

export const calculatorUnitSymbols = {
  degreeCelsius: DEGREE_CELSIUS_UNIT,
  degreeFahrenheit: DEGREE_FAHRENHEIT_UNIT,
  squareInch: SQUARE_INCH_UNIT,
  squareMetre: SQUARE_METRE_UNIT,
  squareCentimetre: SQUARE_CENTIMETRE_UNIT,
  squareMillimetre: SQUARE_MILLIMETRE_UNIT,
  squareFoot: SQUARE_FOOT_UNIT,
  squareKilometre: SQUARE_KILOMETRE_UNIT,
  micrometre: MICROMETRE_UNIT,
  kilogramPerCubicMetre: KILOGRAM_PER_CUBIC_METRE_UNIT,
  gramPerCubicCentimetre: GRAM_PER_CUBIC_CENTIMETRE_UNIT,
  gramPerLitre: GRAM_PER_LITRE_UNIT,
  poundPerCubicFoot: POUND_PER_CUBIC_FOOT_UNIT,
  poundPerCubicInch: POUND_PER_CUBIC_INCH_UNIT,
  joulePerKilogramKelvin: JOULE_PER_KILOGRAM_KELVIN_UNIT,
  joulePerGramCelsius: JOULE_PER_GR_CELSIUS_UNIT,
  kilojoulePerKilogramKelvin:
    KILOJOULE_PER_KILOGRAM_KELVIN_UNIT,
  kilojoulePerKilogramCelsius:
    KILOJOULE_PER_KILOGRAM_CELSIUS_UNIT,
  caloriePerGramCelsius: CALORIE_PER_GR_CELSIUS_UNIT,
  btuPerPoundFahrenheit: BTU_PER_POUND_FAHRENHEIT_UNIT,
  wattPerMetreKelvin: WATT_PER_METRE_KELVIN_UNIT,
  wattPerMetreCelsius: WATT_PER_METRE_CELSIUS_UNIT,
  milliwattPerMetreKelvin: MILLIWATT_PER_METRE_KELVIN_UNIT,
  btuPerHourFootFahrenheit: BTU_PER_HOUR_FOOT_FAHRENHEIT_UNIT,
  pascalSecond: PASCAL_SECOND_UNIT,
  millipascalSecond: MILLIPASCAL_SECOND_UNIT,
  poise: POISE_UNIT,
} as const;
