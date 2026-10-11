// İsveççe, Norveççe ve Danca yakıt tüketimi çeviricisi.
// İsveç ve Norveç tüketimi "liter per mil" (1 mil = 10 km) ile, Danimarka ise
// "km/l" ile söyler; sayfalar bu yüzden ülkenin kendi ölçüsünden başlar.
import type { FaqItem } from "../faqSchema";
import type { NordicLocale } from "../time/nordicWeek";

export const NORDIC_FUEL_PATHS: Record<NordicLocale, string> = {
  sv: "/sv/liter-per-mil",
  no: "/no/liter-per-mil",
  da: "/da/km-per-liter",
};

export type FuelUnit = "lmil" | "l100" | "kml" | "mpgUs" | "mpgUk";
export type EnergyUnit = "kwhMil" | "kwh100" | "whKm";

// Tüm birimler l/100 km üzerinden çevrilir. mpg katsayıları: 1 US gal = 3,785411784 L,
// 1 UK gal = 4,54609 L, 1 mi = 1,609344 km.
const MPG_US = 235.214583;
const MPG_UK = 282.480936;

export function toL100(value: number, unit: FuelUnit): number {
  switch (unit) {
    case "lmil":
      return value * 10;
    case "l100":
      return value;
    case "kml":
      return 100 / value;
    case "mpgUs":
      return MPG_US / value;
    case "mpgUk":
      return MPG_UK / value;
  }
}

export function fromL100(l100: number, unit: FuelUnit): number {
  switch (unit) {
    case "lmil":
      return l100 / 10;
    case "l100":
      return l100;
    case "kml":
      return 100 / l100;
    case "mpgUs":
      return MPG_US / l100;
    case "mpgUk":
      return MPG_UK / l100;
  }
}

/** kWh/100 km üzerinden. */
export function toKwh100(value: number, unit: EnergyUnit): number {
  return unit === "kwhMil" ? value * 10 : unit === "whKm" ? value / 10 : value;
}

export function fromKwh100(kwh100: number, unit: EnergyUnit): number {
  return unit === "kwhMil" ? kwh100 / 10 : unit === "whKm" ? kwh100 * 10 : kwh100;
}

/** Sayfadaki tablolar: ülkenin kendi ölçüsünden başlar. */
export const FUEL_TABLE: Record<NordicLocale, { unit: FuelUnit; values: number[] }> = {
  sv: { unit: "lmil", values: [0.3, 0.4, 0.45, 0.5, 0.55, 0.6, 0.7, 0.8, 0.9, 1, 1.2, 1.5] },
  no: { unit: "lmil", values: [0.3, 0.4, 0.45, 0.5, 0.55, 0.6, 0.7, 0.8, 0.9, 1, 1.2, 1.5] },
  da: { unit: "kml", values: [8, 10, 12, 14, 15, 16, 18, 20, 22, 25, 28, 30] },
};

export const ENERGY_TABLE: Record<NordicLocale, { unit: EnergyUnit; values: number[] }> = {
  sv: { unit: "kwhMil", values: [1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.5, 3] },
  no: { unit: "kwhMil", values: [1.2, 1.4, 1.5, 1.6, 1.8, 2, 2.2, 2.5, 3] },
  da: { unit: "kwh100", values: [12, 14, 15, 16, 18, 20, 22, 25, 30] },
};

export const NUMBER_LOCALE: Record<NordicLocale, string> = { sv: "sv-SE", no: "nb-NO", da: "da-DK" };

export function formatNumber(locale: NordicLocale, value: number, digits = 2) {
  return value.toLocaleString(NUMBER_LOCALE[locale], { maximumFractionDigits: digits });
}

type Copy = {
  metaTitle: string;
  description: string;
  crumb: string;
  h1: string;
  intro: string;
  /** Yolculuk maliyetinde mesafe birimi: sv/no mil, da km. */
  distanceUnit: "mil" | "km";
  defaultFuelUnit: FuelUnit;
  defaultEnergyUnit: EnergyUnit;
  unitLabels: Record<FuelUnit | EnergyUnit, string>;
  modeConvert: string;
  modeTrip: string;
  modeEv: string;
  value: string;
  unit: string;
  invalid: string;
  distance: string;
  consumption: string;
  fuelPrice: string;
  electricityPrice: string;
  litres: string;
  energy: string;
  cost: string;
  costPerDistance: string;
  currency: string;
  priceNote: string;
  tableTitle: string;
  evTableTitle: string;
  sections: Array<{ id: string; title: string; paragraphs: string[] }>;
  faq: FaqItem[];
};

export const NORDIC_FUEL_COPY: Record<NordicLocale, Copy> = {
  sv: {
    metaTitle: "Liter per mil till liter/100 km – bränsleförbrukning",
    description: "Räkna om bränsleförbrukning mellan liter per mil, l/100 km, km/l och mpg. Beräkna kostnaden för en resa och elbilens förbrukning i kWh/mil.",
    crumb: "Liter per mil",
    h1: "Liter per mil – räkna om bränsleförbrukning",
    intro: "I Sverige anges bilens förbrukning oftast i liter per mil, medan biltester och tillverkare använder liter per 100 km. Skriv in ett värde så räknar verktyget om det till alla vanliga enheter, eller räkna ut vad en resa kostar.",
    distanceUnit: "mil",
    defaultFuelUnit: "lmil",
    defaultEnergyUnit: "kwhMil",
    unitLabels: { lmil: "liter/mil", l100: "liter/100 km", kml: "km/liter", mpgUs: "mpg (USA)", mpgUk: "mpg (Storbritannien)", kwhMil: "kWh/mil", kwh100: "kWh/100 km", whKm: "Wh/km" },
    modeConvert: "Räkna om",
    modeTrip: "Resekostnad",
    modeEv: "Elbil",
    value: "Värde",
    unit: "Enhet",
    invalid: "Skriv ett tal större än noll.",
    distance: "Sträcka (mil)",
    consumption: "Förbrukning (liter/mil)",
    fuelPrice: "Bränslepris (kr/liter)",
    electricityPrice: "Elpris (kr/kWh)",
    litres: "Bränsle",
    energy: "Energi",
    cost: "Kostnad",
    costPerDistance: "Kostnad per mil",
    currency: "kr",
    priceNote: "Skriv in det pris du själv betalar. Verktyget hämtar inga aktuella priser.",
    tableTitle: "Omräkningstabell: liter per mil",
    evTableTitle: "Elbil: kWh per mil",
    sections: [
      {
        id: "mil",
        title: "Hur lång är en mil?",
        paragraphs: [
          "En svensk mil är i dag exakt 10 kilometer. Den gamla svenska milen var 36 000 fot, ungefär 10,7 km. När Sverige gick över till metersystemet (obligatoriskt från 1889) avrundades milen till 10 km, och den används fortfarande i vardagsspråket.",
          "En mil ska inte förväxlas med den engelska milen (mile), som är 1,609 km. När en svensk säger att något ligger fem mil bort menar hen 50 km.",
        ],
      },
      {
        id: "formel",
        title: "Så räknar du om",
        paragraphs: [
          "Eftersom en mil är 10 km gäller: liter per mil × 10 = liter per 100 km. En bil som drar 0,6 liter per mil förbrukar alltså 6 liter per 100 km.",
          "Till km per liter räknar du 10 ÷ liter per mil. 0,5 liter per mil motsvarar 20 km per liter.",
          "Begagnade bilar annonseras ofta med mätarställning i mil. 15 000 mil på mätaren betyder 150 000 km.",
        ],
      },
      {
        id: "elbil",
        title: "Elbilens förbrukning i kWh per mil",
        paragraphs: [
          "För elbilar anges förbrukningen i kWh per mil eller kWh per 100 km. Omräkningen är densamma: kWh per mil × 10 = kWh per 100 km. 1,8 kWh per mil är 18 kWh per 100 km, eller 180 Wh per km.",
          "Kostnaden per mil får du genom att multiplicera förbrukningen med elpriset. Vid 1,8 kWh per mil och 2 kr per kWh kostar varje mil 3,60 kr.",
        ],
      },
    ],
    faq: [
      { question: "Hur många liter per 100 km är 0,5 liter per mil?", answer: "0,5 liter per mil är 5 liter per 100 km. Multiplicera liter per mil med 10." },
      { question: "Vad är skillnaden mellan mil och mile?", answer: "En svensk mil är 10 km. En engelsk mile är 1,609 km. Därför är en svensk mil drygt sex engelska miles." },
      { question: "Hur räknar jag om km per liter till liter per mil?", answer: "Dela 10 med antalet km per liter. 20 km per liter blir 10 ÷ 20 = 0,5 liter per mil." },
      { question: "Hur räknar jag ut vad en resa kostar?", answer: "Sträcka i mil × förbrukning i liter per mil × literpriset. 30 mil med 0,6 liter per mil och 20 kr per liter blir 30 × 0,6 × 20 = 360 kr." },
    ],
  },
  no: {
    metaTitle: "Liter per mil til liter/100 km – drivstofforbruk",
    description: "Regn om drivstofforbruk mellom liter per mil, l/100 km, km/l og mpg. Beregn hva en tur koster, og elbilens forbruk i kWh/mil.",
    crumb: "Liter per mil",
    h1: "Liter per mil – regn om drivstofforbruk",
    intro: "I Norge snakker vi gjerne om forbruk i liter per mil, mens bilprodusenter og tester oppgir liter per 100 km. Skriv inn et tall, så regner verktøyet det om til alle vanlige enheter, eller regn ut hva en tur koster.",
    distanceUnit: "mil",
    defaultFuelUnit: "lmil",
    defaultEnergyUnit: "kwhMil",
    unitLabels: { lmil: "liter/mil", l100: "liter/100 km", kml: "km/liter", mpgUs: "mpg (USA)", mpgUk: "mpg (Storbritannia)", kwhMil: "kWh/mil", kwh100: "kWh/100 km", whKm: "Wh/km" },
    modeConvert: "Regn om",
    modeTrip: "Turkostnad",
    modeEv: "Elbil",
    value: "Verdi",
    unit: "Enhet",
    invalid: "Skriv inn et tall større enn null.",
    distance: "Strekning (mil)",
    consumption: "Forbruk (liter/mil)",
    fuelPrice: "Drivstoffpris (kr/liter)",
    electricityPrice: "Strømpris (kr/kWh)",
    litres: "Drivstoff",
    energy: "Energi",
    cost: "Kostnad",
    costPerDistance: "Kostnad per mil",
    currency: "kr",
    priceNote: "Skriv inn prisen du selv betaler. Verktøyet henter ingen aktuelle priser.",
    tableTitle: "Omregningstabell: liter per mil",
    evTableTitle: "Elbil: kWh per mil",
    sections: [
      {
        id: "mil",
        title: "Hvor lang er en mil?",
        paragraphs: [
          "I dagligtale betyr en mil i Norge 10 kilometer. Den gamle norske milen var 18 000 alen, omtrent 11,3 km. Metersystemet ble innført ved lov i 1875, og milen lever videre som et rundt tall på 10 km.",
          "En mil må ikke forveksles med den engelske milen (mile), som er 1,609 km. Når noen sier at hytta ligger tre mil unna, mener de 30 km.",
        ],
      },
      {
        id: "formel",
        title: "Slik regner du om",
        paragraphs: [
          "Siden en mil er 10 km, gjelder: liter per mil × 10 = liter per 100 km. En bil som bruker 0,6 liter per mil, bruker altså 6 liter per 100 km.",
          "Til km per liter regner du 10 ÷ liter per mil. 0,5 liter per mil tilsvarer 20 km per liter.",
        ],
      },
      {
        id: "elbil",
        title: "Elbilens forbruk i kWh per mil",
        paragraphs: [
          "For elbiler oppgis forbruket i kWh per mil eller kWh per 100 km. Omregningen er den samme: kWh per mil × 10 = kWh per 100 km. 2 kWh per mil er 20 kWh per 100 km, eller 200 Wh per km.",
          "Kostnaden per mil finner du ved å gange forbruket med strømprisen. Ved 2 kWh per mil og 1,50 kr per kWh koster hver mil 3 kr.",
        ],
      },
    ],
    faq: [
      { question: "Hvor mange liter per 100 km er 0,5 liter per mil?", answer: "0,5 liter per mil er 5 liter per 100 km. Gang liter per mil med 10." },
      { question: "Hva er forskjellen på mil og mile?", answer: "En norsk mil er 10 km i dagligtale. En engelsk mile er 1,609 km, så en mil er litt over seks engelske miles." },
      { question: "Hvordan regner jeg om km per liter til liter per mil?", answer: "Del 10 på antall km per liter. 20 km per liter blir 10 ÷ 20 = 0,5 liter per mil." },
      { question: "Hvordan regner jeg ut hva en tur koster?", answer: "Strekning i mil × forbruk i liter per mil × literprisen. 40 mil med 0,6 liter per mil og 22 kr per liter blir 40 × 0,6 × 22 = 528 kr." },
    ],
  },
  da: {
    metaTitle: "Km/l til liter/100 km – omregn brændstofforbrug",
    description: "Omregn brændstofforbrug mellem km/l, liter pr. 100 km og mpg. Beregn prisen for en køretur og elbilens forbrug i kWh/100 km.",
    crumb: "Km pr. liter",
    h1: "Km pr. liter – omregn brændstofforbrug",
    intro: "I Danmark angives en bils forbrug traditionelt i kilometer pr. liter (km/l), mens det meste af Europa bruger liter pr. 100 km. Indtast et tal, så omregner værktøjet det til alle almindelige enheder, eller beregn hvad en køretur koster.",
    distanceUnit: "km",
    defaultFuelUnit: "kml",
    defaultEnergyUnit: "kwh100",
    unitLabels: { lmil: "liter/mil (sv/no)", l100: "liter/100 km", kml: "km/liter", mpgUs: "mpg (USA)", mpgUk: "mpg (Storbritannien)", kwhMil: "kWh/mil (sv/no)", kwh100: "kWh/100 km", whKm: "Wh/km" },
    modeConvert: "Omregn",
    modeTrip: "Turpris",
    modeEv: "Elbil",
    value: "Værdi",
    unit: "Enhed",
    invalid: "Skriv et tal større end nul.",
    distance: "Afstand (km)",
    consumption: "Forbrug (km/l)",
    fuelPrice: "Brændstofpris (kr./liter)",
    electricityPrice: "Elpris (kr./kWh)",
    litres: "Brændstof",
    energy: "Energi",
    cost: "Pris",
    costPerDistance: "Pris pr. km",
    currency: "kr.",
    priceNote: "Indtast den pris, du selv betaler. Værktøjet henter ingen aktuelle priser.",
    tableTitle: "Omregningstabel: km pr. liter",
    evTableTitle: "Elbil: kWh pr. 100 km",
    sections: [
      {
        id: "kml",
        title: "Km/l og liter pr. 100 km",
        paragraphs: [
          "Km pr. liter fortæller, hvor langt bilen kører på én liter. Jo højere tal, jo mere økonomisk er bilen. Liter pr. 100 km fortæller det modsatte: hvor meget brændstof der bruges på en fast strækning. Her er et lavt tal godt.",
          "Omregningen går begge veje med samme formel: liter pr. 100 km = 100 ÷ km/l. En bil, der kører 20 km/l, bruger 5 liter pr. 100 km.",
        ],
      },
      {
        id: "mil",
        title: "Danske mil, svenske og norske mil",
        paragraphs: [
          "I Sverige og Norge tales der om forbrug i liter pr. mil, hvor en mil er 10 km. 0,5 liter pr. mil er derfor 5 liter pr. 100 km, eller 20 km/l.",
          "Den gamle danske mil var 24 000 alen, cirka 7,5 km. Den forsvandt ud af brug, da Danmark indførte metersystemet (lov fra 1907).",
        ],
      },
      {
        id: "elbil",
        title: "Elbilens forbrug",
        paragraphs: [
          "For elbiler angives forbruget i kWh pr. 100 km eller Wh pr. km. 16 kWh pr. 100 km er det samme som 160 Wh pr. km, og bilen kører så 100 ÷ 16 = 6,25 km pr. kWh.",
          "Prisen pr. km får du ved at gange forbruget pr. km med elprisen. Ved 16 kWh pr. 100 km og 2,50 kr. pr. kWh koster hver kilometer 0,40 kr.",
        ],
      },
    ],
    faq: [
      { question: "Hvor mange liter pr. 100 km er 20 km/l?", answer: "20 km/l svarer til 5 liter pr. 100 km. Regn 100 ÷ 20." },
      { question: "Hvorfor bruger Danmark km/l?", answer: "Km/l er den traditionelle danske måde at angive forbrug på og bruges stadig i bilannoncer og i daglig tale. Fabrikanter og tests i EU angiver liter pr. 100 km." },
      { question: "Hvad er liter pr. mil i Sverige og Norge?", answer: "En svensk og norsk mil er 10 km. Liter pr. mil × 10 = liter pr. 100 km, så 0,6 liter pr. mil er 6 liter pr. 100 km eller cirka 16,7 km/l." },
      { question: "Hvordan beregner jeg prisen for en køretur?", answer: "Afstand i km ÷ km/l × literprisen. 300 km med 20 km/l og 14 kr. pr. liter giver 300 ÷ 20 × 14 = 210 kr." },
    ],
  },
};
