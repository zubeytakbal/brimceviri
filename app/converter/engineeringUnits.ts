export type EngineeringUnitGroup =
  | "si"
  | "metric"
  | "imperial";

export type EngineeringQuantity =
  | "pressure"
  | "force"
  | "area"
  | "density"
  | "depth"
  | "gravity";

export type EngineeringUnitDefinition<
  TSymbol extends string = string,
> = {
  symbol: TSymbol;
  trName: string;
  enName: string;
  factorToSI: number;
  group: EngineeringUnitGroup;
  typicalUseTr: string;
  typicalUseEn: string;
};

const MICRO_SIGN = "\u00B5";
export const SQUARE_SUFFIX = "\u00B2";
export const CUBIC_SUFFIX = "\u00B3";
export const SQUARE_METRE_UNIT = `m${SQUARE_SUFFIX}` as const;
export const CUBIC_METRE_UNIT = `m${CUBIC_SUFFIX}` as const;
export const KILOGRAM_PER_CUBIC_METRE_UNIT =
  `kg/${CUBIC_METRE_UNIT}` as const;
export const METRE_PER_SECOND_SQUARED_UNIT =
  `m/s${SQUARE_SUFFIX}` as const;
export const CENTIMETRE_PER_SECOND_SQUARED_UNIT =
  `cm/s${SQUARE_SUFFIX}` as const;
export const FOOT_PER_SECOND_SQUARED_UNIT =
  `ft/s${SQUARE_SUFFIX}` as const;

const MICRO_PASCAL_UNIT = `${MICRO_SIGN}Pa` as const;
const MICRO_NEWTON_UNIT = `${MICRO_SIGN}N` as const;
const MICRO_METRE_UNIT = `${MICRO_SIGN}m` as const;
const SQUARE_MICROMETRE_UNIT =
  `${MICRO_METRE_UNIT}${SQUARE_SUFFIX}` as const;
const SQUARE_MILLIMETRE_UNIT = `mm${SQUARE_SUFFIX}` as const;
const SQUARE_CENTIMETRE_UNIT = `cm${SQUARE_SUFFIX}` as const;
const SQUARE_DECIMETRE_UNIT = `dm${SQUARE_SUFFIX}` as const;
const SQUARE_KILOMETRE_UNIT = `km${SQUARE_SUFFIX}` as const;
const SQUARE_INCH_UNIT = `in${SQUARE_SUFFIX}` as const;
const SQUARE_FOOT_UNIT = `ft${SQUARE_SUFFIX}` as const;
const SQUARE_YARD_UNIT = `yd${SQUARE_SUFFIX}` as const;
export const KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT =
  `kgf/cm${SQUARE_SUFFIX}` as const;
const GRAM_PER_CUBIC_METRE_UNIT = `g/${CUBIC_METRE_UNIT}` as const;
const GRAM_PER_CUBIC_CENTIMETRE_UNIT =
  `g/cm${CUBIC_SUFFIX}` as const;
const POUND_PER_CUBIC_FOOT_UNIT =
  `lb/ft${CUBIC_SUFFIX}` as const;
const POUND_PER_CUBIC_INCH_UNIT =
  `lb/in${CUBIC_SUFFIX}` as const;

export function normalizeEngineeringUnitSymbol(symbol: string) {
  return symbol.replace(/\u00C2(?=[\u00B2\u00B3\u00B5])/g, "");
}

export const pressureUnitDefinitions = [
  {
    symbol: "nPa",
    trName: "Nanopascal",
    enName: "Nanopascal",
    factorToSI: 1e-9,
    group: "si",
    typicalUseTr: "Aşırı düşük diferansiyel basınçlar ve deneysel ölçümler",
    typicalUseEn: "Extremely small differential pressures and experimental measurements",
  },
  {
    symbol: MICRO_PASCAL_UNIT,
    trName: "Mikropascal",
    enName: "Micropascal",
    factorToSI: 1e-6,
    group: "si",
    typicalUseTr: "Akustik ve hassas sensör uygulamaları",
    typicalUseEn: "Acoustics and precision sensor applications",
  },
  {
    symbol: "mPa",
    trName: "Millipascal",
    enName: "Millipascal",
    factorToSI: 1e-3,
    group: "si",
    typicalUseTr: "Çok düşük basınç farkları ve laboratuvar cihazları",
    typicalUseEn: "Very small pressure differences and laboratory instruments",
  },
  {
    symbol: "Pa",
    trName: "Pascal",
    enName: "Pascal",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI basınç birimi ve bilimsel hesaplar",
    typicalUseEn: "Base SI pressure unit and scientific calculations",
  },
  {
    symbol: "hPa",
    trName: "Hektopascal",
    enName: "Hectopascal",
    factorToSI: 100,
    group: "si",
    typicalUseTr: "Meteoroloji ve atmosfer basıncı raporları",
    typicalUseEn: "Meteorology and atmospheric pressure reporting",
  },
  {
    symbol: "kPa",
    trName: "Kilopascal",
    enName: "Kilopascal",
    factorToSI: 1e3,
    group: "si",
    typicalUseTr: "Yapı, HVAC ve genel mühendislik ölçümleri",
    typicalUseEn: "Building, HVAC and general engineering measurements",
  },
  {
    symbol: "MPa",
    trName: "Megapascal",
    enName: "Megapascal",
    factorToSI: 1e6,
    group: "si",
    typicalUseTr: "Malzeme dayanımı ve yüksek basınçlı sistemler",
    typicalUseEn: "Material strength and higher-pressure systems",
  },
  {
    symbol: "GPa",
    trName: "Gigapascal",
    enName: "Gigapascal",
    factorToSI: 1e9,
    group: "si",
    typicalUseTr: "Elastisite modülü ve ileri malzeme mühendisliği",
    typicalUseEn: "Elastic modulus and advanced materials engineering",
  },
  {
    symbol: "TPa",
    trName: "Terapascal",
    enName: "Terapascal",
    factorToSI: 1e12,
    group: "si",
    typicalUseTr: "Kuramsal malzeme modelleri ve aşırı rijitlik hesapları",
    typicalUseEn: "Theoretical material models and extreme stiffness calculations",
  },
  {
    symbol: "mbar",
    trName: "Millibar",
    enName: "Millibar",
    factorToSI: 100,
    group: "metric",
    typicalUseTr: "Eski meteoroloji ve proses göstergeleri",
    typicalUseEn: "Legacy meteorology and process gauges",
  },
  {
    symbol: "bar",
    trName: "Bar",
    enName: "Bar",
    factorToSI: 100000,
    group: "metric",
    typicalUseTr: "Kompresör, hidrolik, pnömatik ve endüstri",
    typicalUseEn: "Compressors, hydraulics, pneumatics and industry",
  },
  {
    symbol: "atm",
    trName: "Standart atmosfer",
    enName: "Standard atmosphere",
    factorToSI: 101325,
    group: "metric",
    typicalUseTr: "Referans atmosfer basıncı ve laboratuvar kullanımı",
    typicalUseEn: "Reference atmospheric pressure and laboratory work",
  },
  {
    symbol: "at",
    trName: "Teknik atmosfer",
    enName: "Technical atmosphere",
    factorToSI: 98066.5,
    group: "metric",
    typicalUseTr: "Eski teknik dokümanlar ve bazı mekanik tablolar",
    typicalUseEn: "Legacy technical documents and some mechanical tables",
  },
  {
    symbol: KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT,
    trName: "Kilogram-kuvvet/santimetrekare",
    enName: "Kilogram-force per square centimeter",
    factorToSI: 98066.5,
    group: "metric",
    typicalUseTr: "Pompa, kazan ve analog göstergelerde eski kullanım",
    typicalUseEn: "Legacy pump, boiler and analog gauge usage",
  },
  {
    symbol: "Torr",
    trName: "Torr",
    enName: "Torr",
    factorToSI: 133.32236842105263,
    group: "metric",
    typicalUseTr: "Vakum teknolojisi ve laboratuvar basınçları",
    typicalUseEn: "Vacuum technology and laboratory pressures",
  },
  {
    symbol: "mmHg",
    trName: "Milimetre cıva",
    enName: "Millimeter of mercury",
    factorToSI: 133.322387415,
    group: "metric",
    typicalUseTr: "Tıbbi ölçümler ve manometre okumaları",
    typicalUseEn: "Medical measurements and manometer readings",
  },
  {
    symbol: "mmH₂O",
    trName: "Milimetre su sütunu",
    enName: "Millimeter of water column",
    factorToSI: 9.80665,
    group: "metric",
    typicalUseTr: "Düşük diferansiyel basınç ve havalandırma sistemleri",
    typicalUseEn: "Low differential pressure and ventilation systems",
  },
  {
    symbol: "cmH₂O",
    trName: "Santimetre su sütunu",
    enName: "Centimeter of water column",
    factorToSI: 98.0665,
    group: "metric",
    typicalUseTr: "Solunum cihazları ve düşük basınç uygulamaları",
    typicalUseEn: "Respiratory devices and low-pressure applications",
  },
  {
    symbol: "psi",
    trName: "Pound-force/inçkare",
    enName: "Pound-force per square inch",
    factorToSI: 6894.757293168,
    group: "imperial",
    typicalUseTr: "Lastik, hidrolik ve Anglo-Amerikan ekipmanlar",
    typicalUseEn: "Tires, hydraulics and Anglo-American equipment",
  },
  {
    symbol: "ksi",
    trName: "Kilopound-force/inçkare",
    enName: "Kilopound-force per square inch",
    factorToSI: 6894757.293168,
    group: "imperial",
    typicalUseTr: "Malzeme dayanımı ve yapısal mühendislik",
    typicalUseEn: "Material strength and structural engineering",
  },
  {
    symbol: "psf",
    trName: "Pound-force/fitkare",
    enName: "Pound-force per square foot",
    factorToSI: 47.88025898033584,
    group: "imperial",
    typicalUseTr: "Yapı yükleri ve HVAC diferansiyel basınçları",
    typicalUseEn: "Building loads and HVAC differential pressures",
  },
  {
    symbol: "inHg",
    trName: "İnç cıva sütunu",
    enName: "Inch of mercury",
    factorToSI: 3386.389,
    group: "imperial",
    typicalUseTr: "Barometreler, havacılık ve motor vakumu",
    typicalUseEn: "Barometers, aviation and engine vacuum",
  },
  {
    symbol: "inH₂O",
    trName: "İnç su sütunu",
    enName: "Inch of water column",
    factorToSI: 249.08891,
    group: "imperial",
    typicalUseTr: "Gaz hatları ve düşük basınçlı hava sistemleri",
    typicalUseEn: "Gas lines and low-pressure air systems",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const forceUnitDefinitions = [
  {
    symbol: "nN",
    trName: "Nanonewton",
    enName: "Nanonewton",
    factorToSI: 1e-9,
    group: "si",
    typicalUseTr: "Nanoölçekli kuvvetler ve yüzey etkileşimleri",
    typicalUseEn: "Nanoscale forces and surface interactions",
  },
  {
    symbol: MICRO_NEWTON_UNIT,
    trName: "Mikronewton",
    enName: "Micronewton",
    factorToSI: 1e-6,
    group: "si",
    typicalUseTr: "Mikromekanik ve hassas sensör uygulamaları",
    typicalUseEn: "Micromechanics and precision sensor work",
  },
  {
    symbol: "mN",
    trName: "Millinewton",
    enName: "Millinewton",
    factorToSI: 1e-3,
    group: "si",
    typicalUseTr: "Laboratuvar cihazları ve küçük aktüatörler",
    typicalUseEn: "Laboratory instruments and small actuators",
  },
  {
    symbol: "N",
    trName: "Newton",
    enName: "Newton",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI kuvvet birimi ve genel mühendislik",
    typicalUseEn: "Base SI force unit and general engineering",
  },
  {
    symbol: "kN",
    trName: "Kilonewton",
    enName: "Kilonewton",
    factorToSI: 1e3,
    group: "si",
    typicalUseTr: "Yapı elemanları, presler ve taşıyıcı sistemler",
    typicalUseEn: "Structural members, presses and load-bearing systems",
  },
  {
    symbol: "MN",
    trName: "Meganewton",
    enName: "Meganewton",
    factorToSI: 1e6,
    group: "si",
    typicalUseTr: "Büyük hidrolik presler ve ağır altyapı yükleri",
    typicalUseEn: "Large hydraulic presses and heavy infrastructure loads",
  },
  {
    symbol: "GN",
    trName: "Giganewton",
    enName: "Giganewton",
    factorToSI: 1e9,
    group: "si",
    typicalUseTr: "Çok büyük yapısal yükler ve teorik karşılaştırmalar",
    typicalUseEn: "Very large structural loads and theoretical comparisons",
  },
  {
    symbol: "dyn",
    trName: "Dyn",
    enName: "Dyne",
    factorToSI: 0.00001,
    group: "metric",
    typicalUseTr: "CGS sistemi ve eski bilimsel kaynaklar",
    typicalUseEn: "CGS system and legacy scientific references",
  },
  {
    symbol: "gf",
    trName: "Gram-kuvvet",
    enName: "Gram-force",
    factorToSI: 0.00980665,
    group: "metric",
    typicalUseTr: "Küçük mekanik ölçümler ve eski kataloglar",
    typicalUseEn: "Small mechanical measurements and older catalogs",
  },
  {
    symbol: "kgf",
    trName: "Kilogram-kuvvet",
    enName: "Kilogram-force",
    factorToSI: 9.80665,
    group: "metric",
    typicalUseTr: "Pres yükleri ve eski mekanik çizelgeler",
    typicalUseEn: "Press loads and legacy mechanical charts",
  },
  {
    symbol: "ozf",
    trName: "Ons-kuvvet",
    enName: "Ounce-force",
    factorToSI: 0.278013850953781,
    group: "imperial",
    typicalUseTr: "Küçük yaylar ve hafif yük ölçümleri",
    typicalUseEn: "Small springs and light load measurements",
  },
  {
    symbol: "lbf",
    trName: "Pound-force",
    enName: "Pound-force",
    factorToSI: 4.4482216152605,
    group: "imperial",
    typicalUseTr: "Makine parçaları, çekme testleri ve Anglo sistemler",
    typicalUseEn: "Machine parts, tension tests and Imperial systems",
  },
  {
    symbol: "kip",
    trName: "Kip",
    enName: "Kip",
    factorToSI: 4448.2216152605,
    group: "imperial",
    typicalUseTr: "Çelik yapılar ve ABD yapısal mühendisliği",
    typicalUseEn: "Steel structures and US structural engineering",
  },
  {
    symbol: "tonf US",
    trName: "Kısa ton-kuvvet",
    enName: "Short ton-force",
    factorToSI: 8896.443230521,
    group: "imperial",
    typicalUseTr: "Ağır ekipman ve ABD endüstri yükleri",
    typicalUseEn: "Heavy equipment and US industrial loads",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const areaUnitDefinitions = [
  {
    symbol: SQUARE_MICROMETRE_UNIT,
    trName: "Mikrometrekare",
    enName: "Square micrometer",
    factorToSI: 1e-12,
    group: "si",
    typicalUseTr: "Mikro yüzeyler ve ince film uygulamaları",
    typicalUseEn: "Microsurfaces and thin-film applications",
  },
  {
    symbol: SQUARE_MILLIMETRE_UNIT,
    trName: "Milimetrekare",
    enName: "Square millimeter",
    factorToSI: 1e-6,
    group: "si",
    typicalUseTr: "Kesit alanları, cıvata ve kablo hesapları",
    typicalUseEn: "Cross-sections, bolts and cable calculations",
  },
  {
    symbol: SQUARE_CENTIMETRE_UNIT,
    trName: "Santimetrekare",
    enName: "Square centimeter",
    factorToSI: 1e-4,
    group: "si",
    typicalUseTr: "Küçük temas yüzeyleri ve laboratuvar örnekleri",
    typicalUseEn: "Small contact areas and laboratory samples",
  },
  {
    symbol: SQUARE_DECIMETRE_UNIT,
    trName: "Desimetrekare",
    enName: "Square decimeter",
    factorToSI: 1e-2,
    group: "si",
    typicalUseTr: "Kaplama ve yüzey alanı hesapları",
    typicalUseEn: "Surface coverage and area calculations",
  },
  {
    symbol: SQUARE_METRE_UNIT,
    trName: "Metrekare",
    enName: "Square meter",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI alan birimi ve genel hesaplar",
    typicalUseEn: "Base SI area unit and general calculations",
  },
  {
    symbol: "ha",
    trName: "Hektar",
    enName: "Hectare",
    factorToSI: 10000,
    group: "si",
    typicalUseTr: "Arazi, tarım ve büyük açık alanlar",
    typicalUseEn: "Land, agriculture and large open areas",
  },
  {
    symbol: SQUARE_KILOMETRE_UNIT,
    trName: "Kilometrekare",
    enName: "Square kilometer",
    factorToSI: 1000000,
    group: "si",
    typicalUseTr: "Coğrafi bölgeler ve geniş yüzeyler",
    typicalUseEn: "Geographic regions and large surfaces",
  },
  {
    symbol: SQUARE_INCH_UNIT,
    trName: "İnçkare",
    enName: "Square inch",
    factorToSI: 0.00064516,
    group: "imperial",
    typicalUseTr: "Küçük makine parçaları ve psi tabanlı hesaplar",
    typicalUseEn: "Small machine parts and psi-based calculations",
  },
  {
    symbol: SQUARE_FOOT_UNIT,
    trName: "Fitkare",
    enName: "Square foot",
    factorToSI: 0.09290304,
    group: "imperial",
    typicalUseTr: "Mimari alanlar ve hafif yapı uygulamaları",
    typicalUseEn: "Architectural floor areas and light construction",
  },
  {
    symbol: SQUARE_YARD_UNIT,
    trName: "Yardakare",
    enName: "Square yard",
    factorToSI: 0.83612736,
    group: "imperial",
    typicalUseTr: "Tekstil ve açık alan kaplama ölçüleri",
    typicalUseEn: "Textiles and outdoor coverage measurements",
  },
  {
    symbol: "ac",
    trName: "Acre",
    enName: "Acre",
    factorToSI: 4046.8564224,
    group: "imperial",
    typicalUseTr: "Arazi ve emlak ölçüleri",
    typicalUseEn: "Land and real-estate measurements",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const densityUnitDefinitions = [
  {
    symbol: KILOGRAM_PER_CUBIC_METRE_UNIT,
    trName: "Kilogram/metreküp",
    enName: "Kilogram per cubic meter",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI yoğunluk birimi ve mühendislik hesapları",
    typicalUseEn: "Base SI density unit and engineering calculations",
  },
  {
    symbol: GRAM_PER_CUBIC_METRE_UNIT,
    trName: "Gram/metreküp",
    enName: "Gram per cubic meter",
    factorToSI: 0.001,
    group: "si",
    typicalUseTr: "Çok düşük yoğunluklu gaz veya aerosol karşılaştırmaları",
    typicalUseEn: "Very low-density gas or aerosol comparisons",
  },
  {
    symbol: "g/L",
    trName: "Gram/litre",
    enName: "Gram per liter",
    factorToSI: 1,
    group: "metric",
    typicalUseTr: "Çözelti ve akışkan karışımı anlatımları",
    typicalUseEn: "Solutions and fluid-mixture descriptions",
  },
  {
    symbol: "kg/L",
    trName: "Kilogram/litre",
    enName: "Kilogram per liter",
    factorToSI: 1000,
    group: "metric",
    typicalUseTr: "Sıvı yoğunluklarını pratik ölçekte ifade etmek için",
    typicalUseEn: "Practical expression of liquid densities",
  },
  {
    symbol: "g/mL",
    trName: "Gram/mililitre",
    enName: "Gram per milliliter",
    factorToSI: 1000,
    group: "metric",
    typicalUseTr: "Kimya ve laboratuvar yoğunluk bildirimleri",
    typicalUseEn: "Chemistry and laboratory density reporting",
  },
  {
    symbol: GRAM_PER_CUBIC_CENTIMETRE_UNIT,
    trName: "Gram/santimetreküp",
    enName: "Gram per cubic centimeter",
    factorToSI: 1000,
    group: "metric",
    typicalUseTr: "Sıvılar ve katılar için yaygın mühendislik gösterimi",
    typicalUseEn: "Common engineering expression for liquids and solids",
  },
  {
    symbol: POUND_PER_CUBIC_FOOT_UNIT,
    trName: "Pound/kübik fit",
    enName: "Pound per cubic foot",
    factorToSI: 16.01846337396,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD akışkan ve yapı uygulamaları",
    typicalUseEn: "Imperial/US fluid and construction applications",
  },
  {
    symbol: POUND_PER_CUBIC_INCH_UNIT,
    trName: "Pound/kübik inç",
    enName: "Pound per cubic inch",
    factorToSI: 27679.9047102,
    group: "imperial",
    typicalUseTr: "Yüksek yoğunluklu malzemeler için İngiliz/ABD gösterimi",
    typicalUseEn: "Imperial/US expression for high-density materials",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const depthUnitDefinitions = [
  {
    symbol: MICRO_METRE_UNIT,
    trName: "Mikrometre",
    enName: "Micrometer",
    factorToSI: 0.000001,
    group: "si",
    typicalUseTr: "Mikrokanallar ve hassas sıvı sütunu farklılıkları",
    typicalUseEn: "Microchannels and precision liquid-column differences",
  },
  {
    symbol: "mm",
    trName: "Milimetre",
    enName: "Millimeter",
    factorToSI: 0.001,
    group: "si",
    typicalUseTr: "Küçük manometre yükseklikleri ve laboratuvar ölçümleri",
    typicalUseEn: "Small manometer heights and laboratory measurements",
  },
  {
    symbol: "cm",
    trName: "Santimetre",
    enName: "Centimeter",
    factorToSI: 0.01,
    group: "si",
    typicalUseTr: "Masaüstü deneyler ve kısa sıvı sütunları",
    typicalUseEn: "Bench experiments and short liquid columns",
  },
  {
    symbol: "m",
    trName: "Metre",
    enName: "Meter",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Tank, kuyu ve genel mühendislik derinlikleri",
    typicalUseEn: "Tank, well and general engineering depths",
  },
  {
    symbol: "km",
    trName: "Kilometre",
    enName: "Kilometer",
    factorToSI: 1000,
    group: "si",
    typicalUseTr: "Çok büyük jeofizik derinlik farkları",
    typicalUseEn: "Very large geophysical depth differences",
  },
  {
    symbol: "in",
    trName: "İnç",
    enName: "Inch",
    factorToSI: 0.0254,
    group: "imperial",
    typicalUseTr: "Küçük kolon yükseklikleri ve cihaz boyutları",
    typicalUseEn: "Small column heights and device dimensions",
  },
  {
    symbol: "ft",
    trName: "Fit",
    enName: "Foot",
    factorToSI: 0.3048,
    group: "imperial",
    typicalUseTr: "Dalış, depolama ve saha ölçüleri",
    typicalUseEn: "Diving, storage and field measurements",
  },
  {
    symbol: "yd",
    trName: "Yarda",
    enName: "Yard",
    factorToSI: 0.9144,
    group: "imperial",
    typicalUseTr: "Kısa saha mesafeleri ve açık alan ölçüleri",
    typicalUseEn: "Short field distances and open-area measurements",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export const gravityUnitDefinitions = [
  {
    symbol: METRE_PER_SECOND_SQUARED_UNIT,
    trName: "Metre/saniyekare",
    enName: "Meter per second squared",
    factorToSI: 1,
    group: "si",
    typicalUseTr: "Temel SI ivme birimi",
    typicalUseEn: "Base SI acceleration unit",
  },
  {
    symbol: CENTIMETRE_PER_SECOND_SQUARED_UNIT,
    trName: "Santimetre/saniyekare",
    enName: "Centimeter per second squared",
    factorToSI: 0.01,
    group: "si",
    typicalUseTr: "CGS temelli ivme anlatımları",
    typicalUseEn: "CGS-based acceleration reporting",
  },
  {
    symbol: FOOT_PER_SECOND_SQUARED_UNIT,
    trName: "Fit/saniyekare",
    enName: "Foot per second squared",
    factorToSI: 0.3048,
    group: "imperial",
    typicalUseTr: "İngiliz/ABD mühendislik hesapları",
    typicalUseEn: "Imperial/US engineering calculations",
  },
  {
    symbol: "Gal",
    trName: "Gal",
    enName: "Gal",
    factorToSI: 0.01,
    group: "metric",
    typicalUseTr: "Jeofizik ve gravimetri çalışmaları",
    typicalUseEn: "Geophysics and gravimetry work",
  },
  {
    symbol: "g₀",
    trName: "Standart yerçekimi",
    enName: "Standard gravity",
    factorToSI: 9.80665,
    group: "metric",
    typicalUseTr: "Dünya standart yerçekimi referansı",
    typicalUseEn: "Standard Earth gravity reference",
  },
] as const satisfies readonly EngineeringUnitDefinition<string>[];

export type PressureUnit =
  (typeof pressureUnitDefinitions)[number]["symbol"];
export type ForceUnit =
  (typeof forceUnitDefinitions)[number]["symbol"];
export type AreaUnit =
  (typeof areaUnitDefinitions)[number]["symbol"];
export type DensityUnit =
  (typeof densityUnitDefinitions)[number]["symbol"];
export type DepthUnit =
  (typeof depthUnitDefinitions)[number]["symbol"];
export type GravityUnit =
  (typeof gravityUnitDefinitions)[number]["symbol"];

export type EngineeringUnitLocale = "tr" | "en";

const engineeringGroupLabels: Record<
  EngineeringUnitLocale,
  Record<EngineeringUnitGroup, string>
> = {
  tr: {
    si: "SI birimleri",
    metric: "Metrik ve mühendislik",
    imperial: "İngiliz/ABD birimleri",
  },
  en: {
    si: "SI units",
    metric: "Metric and engineering",
    imperial: "Imperial/US units",
  },
};

const engineeringGroupOrder: EngineeringUnitGroup[] = [
  "si",
  "metric",
  "imperial",
];

type EngineeringUnitCollection = {
  pressure: typeof pressureUnitDefinitions;
  force: typeof forceUnitDefinitions;
  area: typeof areaUnitDefinitions;
  density: typeof densityUnitDefinitions;
  depth: typeof depthUnitDefinitions;
  gravity: typeof gravityUnitDefinitions;
};

const engineeringUnitsByQuantity: EngineeringUnitCollection = {
  pressure: pressureUnitDefinitions,
  force: forceUnitDefinitions,
  area: areaUnitDefinitions,
  density: densityUnitDefinitions,
  depth: depthUnitDefinitions,
  gravity: gravityUnitDefinitions,
};

const preferredPressureAutoUnits = [
  "nPa",
  MICRO_PASCAL_UNIT,
  "mPa",
  "Pa",
  "kPa",
  "MPa",
  "GPa",
  "TPa",
] as const satisfies readonly PressureUnit[];

const preferredForceAutoUnits = [
  "nN",
  MICRO_NEWTON_UNIT,
  "mN",
  "N",
  "kN",
  "MN",
  "GN",
] as const satisfies readonly ForceUnit[];

const preferredAreaAutoUnits = [
  SQUARE_MICROMETRE_UNIT,
  SQUARE_MILLIMETRE_UNIT,
  SQUARE_CENTIMETRE_UNIT,
  SQUARE_DECIMETRE_UNIT,
  SQUARE_METRE_UNIT,
  "ha",
  SQUARE_KILOMETRE_UNIT,
] as const satisfies readonly AreaUnit[];

const preferredDensityAutoUnits = [
  GRAM_PER_CUBIC_METRE_UNIT,
  "g/L",
  KILOGRAM_PER_CUBIC_METRE_UNIT,
  GRAM_PER_CUBIC_CENTIMETRE_UNIT,
  "kg/L",
  "g/mL",
  POUND_PER_CUBIC_FOOT_UNIT,
  POUND_PER_CUBIC_INCH_UNIT,
] as const satisfies readonly DensityUnit[];

const preferredDepthAutoUnits = [
  MICRO_METRE_UNIT,
  "mm",
  "cm",
  "m",
  "km",
] as const satisfies readonly DepthUnit[];

const preferredPressurePairUnits: Record<string, PressureUnit> = {
  [`N|${SQUARE_METRE_UNIT}`]: "Pa",
  [`kN|${SQUARE_METRE_UNIT}`]: "kPa",
  [`MN|${SQUARE_METRE_UNIT}`]: "MPa",
  [`N|${SQUARE_MILLIMETRE_UNIT}`]: "MPa",
  [`kN|${SQUARE_MILLIMETRE_UNIT}`]: "GPa",
  [`lbf|${SQUARE_INCH_UNIT}`]: "psi",
  [`kip|${SQUARE_INCH_UNIT}`]: "ksi",
  [`lbf|${SQUARE_FOOT_UNIT}`]: "psf",
  [`kgf|${SQUARE_CENTIMETRE_UNIT}`]:
    KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT,
};

const preferredForcePairUnits: Record<string, ForceUnit> = {
  [`psi|${SQUARE_INCH_UNIT}`]: "lbf",
  [`ksi|${SQUARE_INCH_UNIT}`]: "kip",
  [
    `${KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT}|${SQUARE_CENTIMETRE_UNIT}`
  ]: "kgf",
};

const preferredAreaPairUnits: Record<string, AreaUnit> = {
  "lbf|psi": SQUARE_INCH_UNIT,
  "kip|ksi": SQUARE_INCH_UNIT,
  [
    `kgf|${KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT}`
  ]: SQUARE_CENTIMETRE_UNIT,
};

function getPreferredPressureUnits() {
  return preferredPressureAutoUnits.map((symbol) =>
    mustFindPressureUnit(symbol)
  );
}

function getPreferredForceUnits() {
  return preferredForceAutoUnits.map((symbol) =>
    mustFindForceUnit(symbol)
  );
}

function getPreferredAreaUnits() {
  return preferredAreaAutoUnits.map((symbol) =>
    mustFindAreaUnit(symbol)
  );
}

function getPreferredDensityUnits() {
  return preferredDensityAutoUnits.map((symbol) =>
    mustFindDensityUnit(symbol)
  );
}

function getPreferredDepthUnits() {
  return preferredDepthAutoUnits.map((symbol) =>
    mustFindDepthUnit(symbol)
  );
}

export function getEngineeringUnits<
  TQuantity extends EngineeringQuantity,
>(quantity: TQuantity): EngineeringUnitCollection[TQuantity] {
  return engineeringUnitsByQuantity[quantity];
}

export function formatEngineeringUnitName(
  unit: EngineeringUnitDefinition,
  locale: EngineeringUnitLocale
) {
  return `${locale === "tr" ? unit.trName : unit.enName} (${unit.symbol})`;
}

export function getEngineeringUnitGroups(
  quantity: EngineeringQuantity,
  locale: EngineeringUnitLocale
) {
  const units = getEngineeringUnits(quantity);

  return engineeringGroupOrder
    .map((group) => ({
      group,
      label: engineeringGroupLabels[locale][group],
      units: units.filter((unit) => unit.group === group),
    }))
    .filter((group) => group.units.length > 0);
}

export function findPressureUnit(symbol: PressureUnit | string) {
  const normalizedSymbol = normalizeEngineeringUnitSymbol(symbol);
  return pressureUnitDefinitions.find(
    (unit) => unit.symbol === normalizedSymbol
  );
}

export function findForceUnit(symbol: ForceUnit | string) {
  const normalizedSymbol = normalizeEngineeringUnitSymbol(symbol);
  return forceUnitDefinitions.find(
    (unit) => unit.symbol === normalizedSymbol
  );
}

export function findAreaUnit(symbol: AreaUnit | string) {
  const normalizedSymbol = normalizeEngineeringUnitSymbol(symbol);
  return areaUnitDefinitions.find(
    (unit) => unit.symbol === normalizedSymbol
  );
}

export function findDensityUnit(symbol: DensityUnit | string) {
  const normalizedSymbol = normalizeEngineeringUnitSymbol(symbol);
  return densityUnitDefinitions.find(
    (unit) => unit.symbol === normalizedSymbol
  );
}

export function findDepthUnit(symbol: DepthUnit | string) {
  const normalizedSymbol = normalizeEngineeringUnitSymbol(symbol);
  return depthUnitDefinitions.find(
    (unit) => unit.symbol === normalizedSymbol
  );
}

export function findGravityUnit(symbol: GravityUnit | string) {
  const normalizedSymbol = normalizeEngineeringUnitSymbol(symbol);
  return gravityUnitDefinitions.find(
    (unit) => unit.symbol === normalizedSymbol
  );
}

function mustFindPressureUnit(symbol: PressureUnit) {
  const unit = findPressureUnit(symbol);

  if (!unit) {
    throw new Error(`Unknown pressure unit: ${symbol}`);
  }

  return unit;
}

function mustFindForceUnit(symbol: ForceUnit) {
  const unit = findForceUnit(symbol);

  if (!unit) {
    throw new Error(`Unknown force unit: ${symbol}`);
  }

  return unit;
}

function mustFindAreaUnit(symbol: AreaUnit) {
  const unit = findAreaUnit(symbol);

  if (!unit) {
    throw new Error(`Unknown area unit: ${symbol}`);
  }

  return unit;
}

function mustFindDensityUnit(symbol: DensityUnit) {
  const unit = findDensityUnit(symbol);

  if (!unit) {
    throw new Error(`Unknown density unit: ${symbol}`);
  }

  return unit;
}

function mustFindDepthUnit(symbol: DepthUnit) {
  const unit = findDepthUnit(symbol);

  if (!unit) {
    throw new Error(`Unknown depth unit: ${symbol}`);
  }

  return unit;
}

function mustFindGravityUnit(symbol: GravityUnit) {
  const unit = findGravityUnit(symbol);

  if (!unit) {
    throw new Error(`Unknown gravity unit: ${symbol}`);
  }

  return unit;
}

function absoluteValue(value: number) {
  return Math.abs(value);
}

export function convertPressureToSI(
  value: number,
  unit: PressureUnit
) {
  return value * mustFindPressureUnit(unit).factorToSI;
}

export function convertForceToSI(
  value: number,
  unit: ForceUnit
) {
  return value * mustFindForceUnit(unit).factorToSI;
}

export function convertAreaToSI(
  value: number,
  unit: AreaUnit
) {
  return value * mustFindAreaUnit(unit).factorToSI;
}

export function convertPressureFromSI(
  valueInPa: number,
  resultUnit: PressureUnit
) {
  return valueInPa / mustFindPressureUnit(resultUnit).factorToSI;
}

export function convertForceFromSI(
  valueInNewton: number,
  resultUnit: ForceUnit
) {
  return valueInNewton / mustFindForceUnit(resultUnit).factorToSI;
}

export function convertAreaFromSI(
  valueInSquareMetre: number,
  resultUnit: AreaUnit
) {
  return valueInSquareMetre / mustFindAreaUnit(resultUnit).factorToSI;
}

export function convertDensityToSI(
  value: number,
  unit: DensityUnit
) {
  return value * mustFindDensityUnit(unit).factorToSI;
}

export function convertDensityFromSI(
  valueInKgPerCubicMetre: number,
  unit: DensityUnit
) {
  return (
    valueInKgPerCubicMetre /
    mustFindDensityUnit(unit).factorToSI
  );
}

export function convertDepthToSI(
  value: number,
  unit: DepthUnit
) {
  return value * mustFindDepthUnit(unit).factorToSI;
}

export function convertDepthFromSI(
  valueInMetres: number,
  unit: DepthUnit
) {
  return valueInMetres / mustFindDepthUnit(unit).factorToSI;
}

export function convertGravityToSI(
  value: number,
  unit: GravityUnit
) {
  return value * mustFindGravityUnit(unit).factorToSI;
}

export function convertGravityFromSI(
  valueInMetresPerSecondSquared: number,
  unit: GravityUnit
) {
  return (
    valueInMetresPerSecondSquared /
    mustFindGravityUnit(unit).factorToSI
  );
}

export function chooseBestEngineeringUnit<
  TSymbol extends string,
>(
  valueInSI: number,
  candidateUnits: ReadonlyArray<EngineeringUnitDefinition<TSymbol>>,
  defaultUnit: TSymbol
): TSymbol {
  if (valueInSI === 0) {
    return defaultUnit;
  }

  const magnitude = absoluteValue(valueInSI);
  const targetPreferred = 100;
  const inRangeCandidates = candidateUnits
    .map((unit, index) => {
      const displayMagnitude = magnitude / unit.factorToSI;

      return {
        index,
        symbol: unit.symbol,
        displayMagnitude,
        logDistanceToPreferred: Math.abs(
          Math.log10(displayMagnitude) - Math.log10(targetPreferred)
        ),
        logDistanceToOne: Math.abs(
          Math.log10(displayMagnitude)
        ),
      };
    })
    .filter(
      (candidate) =>
        candidate.displayMagnitude >= 1 &&
        candidate.displayMagnitude < 1000
    )
    .sort((left, right) => {
      if (
        left.logDistanceToPreferred !==
        right.logDistanceToPreferred
      ) {
        return (
          left.logDistanceToPreferred -
          right.logDistanceToPreferred
        );
      }

      return left.index - right.index;
    });

  if (inRangeCandidates[0]) {
    return inRangeCandidates[0].symbol;
  }

  const nearestCandidate = candidateUnits
    .map((unit, index) => {
      const displayMagnitude = magnitude / unit.factorToSI;

      return {
        index,
        symbol: unit.symbol,
        logDistanceToOne: Math.abs(
          Math.log10(displayMagnitude)
        ),
      };
    })
    .sort((left, right) => {
      if (left.logDistanceToOne !== right.logDistanceToOne) {
        return left.logDistanceToOne - right.logDistanceToOne;
      }

      return left.index - right.index;
    })[0];

  return nearestCandidate?.symbol ?? defaultUnit;
}

export function inferPressureUnit(
  forceUnit: ForceUnit,
  areaUnit: AreaUnit,
  valueInPa: number
): PressureUnit {
  const preferredUnit =
    preferredPressurePairUnits[`${forceUnit}|${areaUnit}`];

  if (preferredUnit) {
    return preferredUnit;
  }

  return chooseBestEngineeringUnit(
    valueInPa,
    getPreferredPressureUnits(),
    "Pa"
  );
}

export function inferForceUnit(
  pressureUnit: PressureUnit,
  areaUnit: AreaUnit,
  valueInNewton: number
): ForceUnit {
  const preferredUnit =
    preferredForcePairUnits[`${pressureUnit}|${areaUnit}`];

  if (preferredUnit) {
    return preferredUnit;
  }

  return chooseBestEngineeringUnit(
    valueInNewton,
    getPreferredForceUnits(),
    "N"
  );
}

export function inferAreaUnit(
  forceUnit: ForceUnit,
  pressureUnit: PressureUnit,
  valueInSquareMetre: number
): AreaUnit {
  const preferredUnit =
    preferredAreaPairUnits[`${forceUnit}|${pressureUnit}`];

  if (preferredUnit) {
    return preferredUnit;
  }

  return chooseBestEngineeringUnit(
    valueInSquareMetre,
    getPreferredAreaUnits(),
    SQUARE_METRE_UNIT
  );
}

export function inferDensityUnit(valueInKgPerCubicMetre: number) {
  return chooseBestEngineeringUnit(
    valueInKgPerCubicMetre,
    getPreferredDensityUnits(),
    KILOGRAM_PER_CUBIC_METRE_UNIT
  );
}

export function inferDepthUnit(valueInMetres: number) {
  return chooseBestEngineeringUnit(
    valueInMetres,
    getPreferredDepthUnits(),
    "m"
  );
}
