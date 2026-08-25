export const germanStaticPaths = {
  home: "/de",
  units: "/de/einheiten",
  allConversions: "/de/alle-umrechnungen",
  engineeringHub: "/de/ingenieurrechner",
  electricalEngineeringHub: "/de/ingenieurrechner/elektrorechner",
  about: "/de/uber-uns",
  contact: "/de/kontakt",
  privacy: "/de/datenschutz",
  terms: "/de/nutzungsbedingungen",
} as const;

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

