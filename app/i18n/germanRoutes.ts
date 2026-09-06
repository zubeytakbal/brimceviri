import { germanStandaloneTools } from "./germanStandaloneTools";

export const germanStaticPaths = {
  home: "/de",
  units: "/de/einheiten",
  allConversions: "/de/alle-umrechnungen",
  otherConversions: "/de/weitere-umrechnungen",
  historicalUnits: "/de/historische-masseinheiten",
  shoeSize: "/de/schuhgroessen-umrechner",
  kitchenMeasures: "/de/kuechenmass-umrechner",
  recipeConverter: "/de/rezept-umrechner",
  ringSize: "/de/ringgroessen-umrechner",
  engineeringHub: "/de/ingenieurrechner",
  electricalEngineeringHub: "/de/ingenieurrechner/elektrorechner",
  about: "/de/uber-uns",
  contact: "/de/kontakt",
  privacy: "/de/datenschutz",
  terms: "/de/nutzungsbedingungen",
} as const;

export const germanStandaloneToolPaths = Object.fromEntries(
  germanStandaloneTools.map((tool) => [tool.slug, tool.germanPath])
) as Record<string, string>;

export const germanCalculatorSlugMap = {
  "basinc-kuvvet-alan": "druck-kraft-flaeche",
  "hidrostatik-basinc": "hydrostatischer-druck",
  "isi-enerjisi": "waermeenergie",
  "isi-iletimi": "waermeleitung",
  "reynolds-sayisi": "reynolds-zahl",
  "ohm-yasasi": "ohms-law",
} as const;

export const germanCategorySlugMap = {
  alan: "flaeche",
  hacim: "volumen",
  uzunluk: "laenge",
  kutle: "masse",
  sicaklik: "temperatur",
  zaman: "zeit",
  hiz: "geschwindigkeit",
  basinc: "druck",
  enerji: "energie",
  debi: "durchfluss",
  elektrik: "elektrizitaet",
  yogunluk: "dichte",
  kuvvet: "kraft",
  tork: "drehmoment",
  aci: "winkel",
  frekans: "frequenz",
  debi_hacimsel: "volumenstrom",
  debi_kutlesel: "massenstrom",
  manyetik_alan: "magnetfeldstaerke",
  manyetik_aki: "magnetischer-fluss",
  viskozite_kinematik: "kinematische-viskositaet",
  isil_iletkenlik: "waermeleitfaehigkeit",
  isi_akisi: "waermestromdichte",
  ozgul_isi: "spezifische-waermekapazitaet",
  ivme: "beschleunigung",
  acisal_hiz: "winkelgeschwindigkeit",
  guc: "leistung",
  momentum: "impuls",
  viskozite_dinamik: "viskositaet",
  veri: "datenspeicher",
  elektrik_direnc: "elektrischer-widerstand",
  kapasitans: "kapazitaet",
  enduktans: "induktivitaet",
  elektrik_yuk: "elektrische-ladung",
  altin_ayar: "goldkarat",
} as const;

export function getGermanCalculatorSlug(
  sourceSlug: string
): string | undefined {
  return germanCalculatorSlugMap[
    sourceSlug as keyof typeof germanCalculatorSlugMap
  ];
}

export function getGermanCategorySlug(
  category: string
): string | undefined {
  return germanCategorySlugMap[
    category as keyof typeof germanCategorySlugMap
  ];
}
