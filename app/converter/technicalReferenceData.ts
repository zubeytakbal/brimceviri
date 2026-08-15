export type TechnicalReferenceLocale = "tr" | "en";

export type TechnicalReferenceSource = {
  id: string;
  label: string;
  url: string;
  accessedOn: string;
  updatedOn?: string;
  conditions: Record<TechnicalReferenceLocale, string>;
};

export type TechnicalReferencePoint = {
  temperatureC: number;
  value: number;
};

export type PressureReferenceRow = {
  symbol: string;
  trName: string;
  enName: string;
  pascalValue: number;
  exact: boolean;
  note: Record<TechnicalReferenceLocale, string>;
};

export const TECHNICAL_REFERENCE_ACCESSED_ON = "2026-08-15";

export const waterAtAtmosphericPressureQueryUrl =
  "https://webbook.nist.gov/cgi/fluid.cgi?Action=Data&Wide=on&ID=C7732185&Type=IsoBar&Digits=8&P=0.101325&THigh=100&TLow=0&TInc=10&RefState=DEF&TUnit=C&PUnit=MPa&DUnit=kg%2Fm3&HUnit=kJ%2Fkg&WUnit=m%2Fs&VisUnit=Pa*s&STUnit=N%2Fm";

export const waterDensityByTemperature: ReadonlyArray<TechnicalReferencePoint> =
  [
    { temperatureC: 0.01, value: 999.84376 },
    { temperatureC: 10.01, value: 999.70159 },
    { temperatureC: 20.01, value: 998.20509 },
    { temperatureC: 30.01, value: 995.64643 },
    { temperatureC: 40.01, value: 992.21253 },
    { temperatureC: 50.01, value: 988.03052 },
    { temperatureC: 60.01, value: 983.19068 },
    { temperatureC: 70.01, value: 977.75892 },
    { temperatureC: 80.01, value: 971.78417 },
    { temperatureC: 90.01, value: 965.30286 },
    { temperatureC: 99.974296, value: 958.3675 },
  ] as const;

export const waterDynamicViscosityByTemperature: ReadonlyArray<TechnicalReferencePoint> =
  [
    { temperatureC: 0.01, value: 0.001791132 },
    { temperatureC: 10.01, value: 0.0013055238 },
    { temperatureC: 20.01, value: 0.0010013508 },
    { temperatureC: 30.01, value: 0.00079705209 },
    { temperatureC: 40.01, value: 0.00065260604 },
    { temperatureC: 50.01, value: 0.00054642453 },
    { temperatureC: 60.01, value: 0.00046596462 },
    { temperatureC: 70.01, value: 0.00040349286 },
    { temperatureC: 80.01, value: 0.00035400643 },
    { temperatureC: 90.01, value: 0.00031413938 },
    { temperatureC: 99.974296, value: 0.00028165796 },
  ] as const;

export const pressureReferenceRows: ReadonlyArray<PressureReferenceRow> = [
  {
    symbol: "Pa",
    trName: "Pascal",
    enName: "Pascal",
    pascalValue: 1,
    exact: true,
    note: {
      tr: "SI türetilmiş basınç birimi",
      en: "SI derived pressure unit",
    },
  },
  {
    symbol: "kPa",
    trName: "Kilopascal",
    enName: "Kilopascal",
    pascalValue: 1_000,
    exact: true,
    note: {
      tr: "HVAC, tesisat ve genel mühendislik",
      en: "HVAC, piping and general engineering",
    },
  },
  {
    symbol: "MPa",
    trName: "Megapascal",
    enName: "Megapascal",
    pascalValue: 1_000_000,
    exact: true,
    note: {
      tr: "Malzeme ve yüksek basınç sistemleri",
      en: "Materials and high-pressure systems",
    },
  },
  {
    symbol: "bar",
    trName: "Bar",
    enName: "Bar",
    pascalValue: 100_000,
    exact: true,
    note: {
      tr: "Endüstriyel proses ve kompresörler",
      en: "Industrial process work and compressors",
    },
  },
  {
    symbol: "mbar",
    trName: "Milibar",
    enName: "Millibar",
    pascalValue: 100,
    exact: true,
    note: {
      tr: "Meteoroloji ve düşük basınç göstergeleri",
      en: "Meteorology and low-pressure gauges",
    },
  },
  {
    symbol: "atm",
    trName: "Standart atmosfer",
    enName: "Standard atmosphere",
    pascalValue: 101_325,
    exact: true,
    note: {
      tr: "Standart referans atmosfer basıncı",
      en: "Standard reference atmospheric pressure",
    },
  },
  {
    symbol: "psi",
    trName: "Pound-force/inçkare",
    enName: "Pound-force per square inch",
    pascalValue: 6_894.757293168,
    exact: false,
    note: {
      tr: "Lastikler ve Anglo-Amerikan ekipmanlar",
      en: "Tires and Anglo-American equipment",
    },
  },
  {
    symbol: "mmHg",
    trName: "Milimetre cıva",
    enName: "Millimeter of mercury",
    pascalValue: 133.322387415,
    exact: false,
    note: {
      tr: "Tıbbi ölçümler ve manometreler",
      en: "Medical measurements and manometers",
    },
  },
  {
    symbol: "kgf/cm²",
    trName: "Kilogram-kuvvet / santimetrekare",
    enName: "Kilogram-force per square centimeter",
    pascalValue: 98_066.5,
    exact: false,
    note: {
      tr: "Eski teknik çizimler ve bazı proses göstergeleri",
      en: "Legacy technical drawings and some process gauges",
    },
  },
] as const;

export const waterDensitySources: ReadonlyArray<TechnicalReferenceSource> = [
  {
    id: "nist-water-query",
    label: "NIST Chemistry WebBook - Thermophysical Properties of Fluid Systems (water query)",
    url: waterAtAtmosphericPressureQueryUrl,
    accessedOn: TECHNICAL_REFERENCE_ACCESSED_ON,
    conditions: {
      tr: "0.101325 MPa izobar, sıvı dalı, sıcaklık 0.01 °C ile 99.97 °C aralığı, çıktı birimleri kg/m³ ve Pa·s.",
      en: "0.101325 MPa isobar, liquid branch, temperatures from 0.01 °C to 99.97 °C, output units kg/m³ and Pa·s.",
    },
  },
  {
    id: "iapws-water-density",
    label: "IAPWS-95 release page",
    url: "https://iapws.org/documents/release/IAPWS-95",
    accessedOn: TECHNICAL_REFERENCE_ACCESSED_ON,
    updatedOn: "2018-12-21",
    conditions: {
      tr: "NIST tablosunun temel aldığı termodinamik formülasyon; kararlı akışkan bölgesi için geçerlidir.",
      en: "Underlying thermodynamic formulation used by NIST; valid for the stable fluid region.",
    },
  },
] as const;

export const waterViscositySources: ReadonlyArray<TechnicalReferenceSource> = [
  {
    id: "nist-water-query",
    label: "NIST Chemistry WebBook - Thermophysical Properties of Fluid Systems (water query)",
    url: waterAtAtmosphericPressureQueryUrl,
    accessedOn: TECHNICAL_REFERENCE_ACCESSED_ON,
    conditions: {
      tr: "0.101325 MPa izobar, sıvı dalı, sıcaklık 0.01 °C ile 99.97 °C aralığı, çıktı birimleri kg/m³ ve Pa·s.",
      en: "0.101325 MPa isobar, liquid branch, temperatures from 0.01 °C to 99.97 °C, output units kg/m³ and Pa·s.",
    },
  },
  {
    id: "iapws-water-viscosity",
    label: "IAPWS Formulation 2008 for the Viscosity of Ordinary Water Substance",
    url: "https://iapws.org/documents/release/viscosity",
    accessedOn: TECHNICAL_REFERENCE_ACCESSED_ON,
    updatedOn: "2018-05-29",
    conditions: {
      tr: "Suyun viskozitesi için resmi IAPWS formülasyonu; sıvı ve buhar fazları için geçerlilik sınırları dokümanda tanımlanır.",
      en: "Official IAPWS formulation for the viscosity of water; validity limits for liquid and vapor phases are defined in the document.",
    },
  },
] as const;

export const pressureReferenceSources: ReadonlyArray<TechnicalReferenceSource> = [
  {
    id: "nist-si-b8",
    label: "NIST Guide to the SI, Appendix B.8",
    url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8",
    accessedOn: TECHNICAL_REFERENCE_ACCESSED_ON,
    conditions: {
      tr: "Standart ve konvansiyonel basınç birimi dönüşüm katsayıları; tam ve yaklaşık katsayılar NIST gösterimine göre okunmalıdır.",
      en: "Standard and conventional pressure-unit conversion factors; exact and approximate factors should be interpreted per the NIST notation.",
    },
  },
  {
    id: "bipm-si-brochure",
    label: "BIPM SI Brochure, 9th edition",
    url: "https://www.bipm.org/en/publications/si-brochure",
    accessedOn: TECHNICAL_REFERENCE_ACCESSED_ON,
    conditions: {
      tr: "SI birim sisteminin güncel çerçevesi ve basınç için pascal tanımı.",
      en: "Current SI framework and the definition of the pascal for pressure.",
    },
  },
] as const;

export const reynoldsRegimeSources: ReadonlyArray<TechnicalReferenceSource> = [
  {
    id: "openstax-viscosity-turbulence",
    label: "OpenStax University Physics Volume 1, 14.7 Viscosity and Turbulence",
    url: "https://openstax.org/books/university-physics-volume-1/pages/14-7-viscosity-and-turbulence",
    accessedOn: TECHNICAL_REFERENCE_ACCESSED_ON,
    conditions: {
      tr: "Boru içi akış için Reynolds sayısının yorumu ve suyun temsilî viskozite değerleri.",
      en: "Interpretation of Reynolds number for internal flow and representative viscosity values for water.",
    },
  },
  {
    id: "nasa-llis-transition",
    label: "NASA LLIS lesson on tubing and Reynolds transition",
    url: "https://llis.nasa.gov/lesson/712",
    accessedOn: TECHNICAL_REFERENCE_ACCESSED_ON,
    conditions: {
      tr: "Re ≈ 2300 civarındaki geçiş hassasiyetine dikkat çeken uygulama notu; bu sayfadaki 2300-4000 bandı yaygın mühendislik yaklaşımı olarak sunulur.",
      en: "Application note highlighting transition sensitivity near Re ≈ 2300; the 2300-4000 band on this page is presented as a common engineering convention.",
    },
  },
] as const;
