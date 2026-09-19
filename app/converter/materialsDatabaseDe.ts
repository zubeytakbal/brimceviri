import type { MaterialCategory } from "./materialsDatabase";

export const materialCategoryLabelsDe: Record<MaterialCategory, string> = {
  metal: "Metalle",
  sivi: "Flüssigkeiten und Chemikalien",
  gaz: "Gase",
  plastik: "Kunststoffe",
  "yapi-malzemesi": "Baumaterialien",
  ahsap: "Holzarten",
  gida: "Lebensmittel und Küchenmaterialien",
};

export const materialNamesDe: Record<string, string> = {
  // Gase
  hidrojen: "Wasserstoff",
  helyum: "Helium",
  metan: "Methan",
  "amonyak-gaz": "Ammoniak (Gas)",
  neon: "Neon",
  hava: "Luft",
  azot: "Stickstoff",
  oksijen: "Sauerstoff",
  argon: "Argon",
  propan: "Propan",
  karbondioksit: "Kohlendioxid",
  butan: "Butan",
  klor: "Chlor",

  // Flüssigkeiten und Chemikalien
  benzin: "Benzin",
  aseton: "Aceton",
  etanol: "Ethanol (Ethylalkohol)",
  gazyagi: "Kerosin (Petroleum)",
  dizel: "Diesel",
  "motor-yagi": "Motoröl",
  benzen: "Benzol",
  zeytinyagi: "Olivenöl",
  "bitkisel-yag": "Pflanzenöl",
  "hindistan-cevizi-yagi": "Kokosöl",
  su: "Wasser",
  "deniz-suyu": "Meerwasser",
  "fren-hidroligi": "Bremsflüssigkeit",
  antifriz: "Frostschutzmittel",
  gliserin: "Glycerin",
  civa: "Quecksilber",

  // Lebensmittel und Küchenmaterialien
  un: "Mehl",
  tereyagi: "Butter",
  buz: "Eis",
  sarap: "Wein",
  bira: "Bier",
  sirke: "Essig",
  yogurt: "Joghurt",
  sut: "Milch",
  "portakal-suyu": "Orangensaft",
  "elma-suyu": "Apfelsaft",
  kan: "Blut",
  seker: "Kristallzucker",
  "pirinc-tahil": "Reis (Korn)",
  tuz: "Speisesalz",
  pekmez: "Traubensirup (Pekmez)",
  bal: "Honig",

  // Kunststoffe
  polipropilen: "Polypropylen (PP)",
  ldpe: "Polyethylen niedriger Dichte (LDPE)",
  hdpe: "Polyethylen hoher Dichte (HDPE)",
  naylon: "Nylon",
  akrilik: "Acryl (Plexiglas)",
  polikarbonat: "Polycarbonat",
  polistiren: "Polystyrol (PS)",
  abs: "ABS-Kunststoff",
  pet: "PET-Kunststoff",
  pvc: "PVC",
  teflon: "Teflon (PTFE)",

  // Holzarten
  balsa: "Balsaholz",
  sedir: "Zeder",
  kavak: "Pappel",
  "cam-agaci": "Holz (Kiefer)",
  maun: "Mahagoni",
  "ceviz-agaci": "Walnussholz",
  tik: "Teakholz",
  hus: "Birkenholz",
  kayin: "Buchenholz",
  "mese-agaci": "Holz (Eiche)",

  // Baumaterialien
  "cimento-tozu": "Zementpulver",
  kum: "Sand",
  cakil: "Kies",
  tugla: "Ziegelstein",
  alci: "Gips",
  asfalt: "Asphalt",
  kumtasi: "Sandstein",
  beton: "Beton",
  cam: "Glas",
  kirectasi: "Kalkstein",
  mermer: "Marmor",
  granit: "Granit",
  bazalt: "Basalt",

  // Metalle
  magnezyum: "Magnesium",
  aluminyum: "Aluminium",
  titanyum: "Titan",
  vanadyum: "Vanadium",
  antimon: "Antimon",
  cinko: "Zink",
  krom: "Chrom",
  "dokme-demir": "Gusseisen",
  kalay: "Zinn",
  celik: "Stahl",
  demir: "Eisen",
  "paslanmaz-celik": "Edelstahl",
  "pirinc-alasim": "Messing (Legierung)",
  kadmiyum: "Cadmium",
  niyobyum: "Niob",
  bronz: "Bronze",
  kobalt: "Kobalt",
  nikel: "Nickel",
  bakir: "Kupfer",
  bizmut: "Wismut",
  molibden: "Molybdän",
  gumus: "Silber",
  kursun: "Blei",
  paladyum: "Palladium",
  tungsten: "Wolfram",
  altin: "Gold",
  uranyum: "Uran",
  platin: "Platin",
};

export const materialVariabilityNotesDe: Record<string, string> = {
  dizel:
    "Der Viskositätswert hängt von der Temperatur und dem Kraftstoffstandard ab; der angegebene Wert ist ein typischer Näherungswert.",
  "motor-yagi":
    "Die Viskosität hängt stark vom SAE-Grad des Öls (z. B. 5W-30, 10W-40) und der Temperatur ab; der angegebene Wert ist ein Näherungswert für ein typisches Mehrbereichsöl bei 40°C.",
  "fren-hidroligi":
    "Die Viskosität hängt von der DOT-Klasse (z. B. DOT3, DOT4, DOT5) ab; der angegebene Wert ist ein Näherungswert für eine typische DOT3/4-Bremsflüssigkeit.",
  antifriz:
    "Die Viskosität hängt vom Mischungsverhältnis mit Wasser und der Temperatur ab; der angegebene Wert ist ein Näherungswert für eine typische 50%-Mischung.",
  bira: "Die Viskosität ist temperaturabhängig; sie kann im Bereich von 2-90°C zwischen etwa 1-4 mPa·s variieren.",
  "portakal-suyu":
    "Die Viskosität ist sehr empfindlich gegenüber Konzentration (°Brix) und Temperatur; sie kann zwischen etwa 2-15 mPa·s liegen.",
  pekmez:
    "Die Viskosität ist sehr empfindlich gegenüber dem Wassergehalt und der Temperatur; bei Raumtemperatur kann sie zwischen etwa 1.000-5.000 mPa·s liegen.",
  bal: "Die Viskosität ist sehr empfindlich gegenüber dem Feuchtigkeitsgehalt und der Temperatur; bei Raumtemperatur kann sie zwischen etwa 2.000-10.000 mPa·s liegen.",
  polipropilen:
    "Die Wärmeleitfähigkeit ist temperaturabhängig; sie kann zwischen etwa 0,1-0,3 W/(m·K) liegen.",
  ldpe: "Die Werte für Wärmeleitfähigkeit und Elastizitätsmodul können je nach Herstellungsverfahren und Zusatzstoffen variieren; die angegebenen Werte dienen als allgemeine Referenz.",
  polistiren:
    "Die Werte für Wärmeleitfähigkeit und Elastizitätsmodul gelten für festes (allgemeines) Polystyrol; geschäumte (EPS) oder extrudierte (XPS) Schaumformen haben eine deutlich niedrigere Wärmeleitfähigkeit.",
  maun: "Der Elastizitätsmodul von Holz kann je nach Feuchtigkeitsgehalt, Wachstumsbedingungen und Faserrichtung erheblich variieren; der angegebene Wert ist ein typischer Durchschnitt in Faserrichtung.",
  "ceviz-agaci":
    "Der Elastizitätsmodul von Holz kann je nach Feuchtigkeitsgehalt, Wachstumsbedingungen und Faserrichtung erheblich variieren; der angegebene Wert ist ein typischer Durchschnitt in Faserrichtung.",
  tik: "Der Elastizitätsmodul von Holz kann je nach Feuchtigkeitsgehalt, Wachstumsbedingungen und Faserrichtung erheblich variieren; der angegebene Wert ist ein typischer Durchschnitt in Faserrichtung.",
  hus: "Der Elastizitätsmodul von Holz kann je nach Feuchtigkeitsgehalt, Wachstumsbedingungen und Faserrichtung erheblich variieren; der angegebene Wert ist ein typischer Durchschnitt in Faserrichtung.",
  kayin:
    "Der Elastizitätsmodul von Holz kann je nach Feuchtigkeitsgehalt, Wachstumsbedingungen und Faserrichtung erheblich variieren; der angegebene Wert ist ein typischer Durchschnitt in Faserrichtung.",
  "cimento-tozu":
    "Die Wärmeleitfähigkeit von losem Pulver hängt von der Schüttdichte und der Feuchtigkeit ab; der angegebene Wert ist ein Näherungswert für trockenes, loses Pulver.",
};
