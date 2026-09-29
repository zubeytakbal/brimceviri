// Deutsche Namen für Weltuhr und Zeitzonenrechner (Städte, Länder, Zeitzonen-Kürzel).
import { abbreviationZones } from "./timeZoneOptions";
import { worldCities, type WorldCity } from "./worldCities";

const CITY_DE: Record<string, string> = {
  brussels: "Brüssel",
  rome: "Rom",
  milan: "Mailand",
  vienna: "Wien",
  zurich: "Zürich",
  copenhagen: "Kopenhagen",
  lisbon: "Lissabon",
  athens: "Athen",
  warsaw: "Warschau",
  prague: "Prag",
  bucharest: "Bukarest",
  belgrade: "Belgrad",
  kyiv: "Kyjiw",
  moscow: "Moskau",
  baku: "Baku",
  tbilisi: "Tiflis",
  riyadh: "Riad",
  mecca: "Mekka",
  "kuwait-city": "Kuwait-Stadt",
  baghdad: "Bagdad",
  tehran: "Teheran",
  cairo: "Kairo",
  tokyo: "Tokio",
  beijing: "Peking",
  singapore: "Singapur",
  "new-delhi": "Neu-Delhi",
  tashkent: "Taschkent",
  bishkek: "Bischkek",
  ashgabat: "Aschgabat",
  taipei: "Taipeh",
  algiers: "Algier",
  "addis-ababa": "Addis Abeba",
  "mexico-city": "Mexiko-Stadt",
  havana: "Havanna",
};

const COUNTRY_DE: Record<string, string> = {
  Türkiye: "Türkei",
  "United Kingdom": "Vereinigtes Königreich",
  France: "Frankreich",
  Germany: "Deutschland",
  Netherlands: "Niederlande",
  Belgium: "Belgien",
  Spain: "Spanien",
  Italy: "Italien",
  Austria: "Österreich",
  Switzerland: "Schweiz",
  Sweden: "Schweden",
  Norway: "Norwegen",
  Denmark: "Dänemark",
  Finland: "Finnland",
  Ireland: "Irland",
  Portugal: "Portugal",
  Greece: "Griechenland",
  Poland: "Polen",
  Czechia: "Tschechien",
  Hungary: "Ungarn",
  Romania: "Rumänien",
  Bulgaria: "Bulgarien",
  Serbia: "Serbien",
  Ukraine: "Ukraine",
  Russia: "Russland",
  Azerbaijan: "Aserbaidschan",
  Georgia: "Georgien",
  "United Arab Emirates": "Vereinigte Arabische Emirate",
  "Saudi Arabia": "Saudi-Arabien",
  Qatar: "Katar",
  Kuwait: "Kuwait",
  Iraq: "Irak",
  Iran: "Iran",
  Jordan: "Jordanien",
  Lebanon: "Libanon",
  Egypt: "Ägypten",
  Japan: "Japan",
  "South Korea": "Südkorea",
  China: "China",
  "Hong Kong (China)": "Hongkong (China)",
  Singapore: "Singapur",
  Thailand: "Thailand",
  Indonesia: "Indonesien",
  Philippines: "Philippinen",
  Malaysia: "Malaysia",
  India: "Indien",
  Pakistan: "Pakistan",
  Bangladesh: "Bangladesch",
  Nepal: "Nepal",
  Uzbekistan: "Usbekistan",
  Kazakhstan: "Kasachstan",
  Kyrgyzstan: "Kirgisistan",
  Turkmenistan: "Turkmenistan",
  Afghanistan: "Afghanistan",
  Taiwan: "Taiwan",
  Australia: "Australien",
  "New Zealand": "Neuseeland",
  Nigeria: "Nigeria",
  Kenya: "Kenia",
  "South Africa": "Südafrika",
  Morocco: "Marokko",
  Tunisia: "Tunesien",
  Algeria: "Algerien",
  Ethiopia: "Äthiopien",
  "United States": "USA",
  Canada: "Kanada",
  Mexico: "Mexiko",
  Brazil: "Brasilien",
  Argentina: "Argentinien",
  Chile: "Chile",
  Peru: "Peru",
  Colombia: "Kolumbien",
  Venezuela: "Venezuela",
  Cuba: "Kuba",
  "United States (Hawaii)": "USA (Hawaii)",
  "United States (Alaska)": "USA (Alaska)",
};

const ZONE_DE: Record<string, string> = {
  utc: "UTC (Koordinierte Weltzeit)",
  gmt: "GMT (Greenwich Mean Time)",
  trt: "TRT (Türkei)",
  et: "ET (US-Ostküste: EST/EDT)",
  ct: "CT (USA Mitte: CST/CDT)",
  mt: "MT (USA Rocky Mountains: MST/MDT)",
  pt: "PT (US-Westküste: PST/PDT)",
  uk: "Großbritannien (GMT/BST)",
  cet: "MEZ/MESZ (Mitteleuropäische Zeit)",
  eet: "OEZ/OESZ (Osteuropäische Zeit)",
  msk: "MSK (Moskauer Zeit)",
  gst: "GST (Golf, Dubai)",
  ist: "IST (Indien)",
  "cst-china": "CST (China)",
  jst: "JST (Japan)",
  aet: "AET (Australien Ost: AEST/AEDT)",
};

export function cityNameDe(city: WorldCity) {
  return CITY_DE[city.en] ?? city.nameEn;
}

export function countryNameDe(city: WorldCity) {
  return COUNTRY_DE[city.countryEn] ?? city.countryEn;
}

export const regionNamesDe: Record<string, string> = {
  turkey: "Türkei",
  europe: "Europa",
  asia: "Asien",
  "middle-east": "Naher Osten",
  africa: "Afrika",
  oceania: "Ozeanien",
  americas: "Amerika",
};

/** Optionen für den Zeitzonenrechner (Kürzel und Städte). */
export function germanZoneOptions() {
  return [
    ...abbreviationZones.map((z) => ({ id: z.id, label: ZONE_DE[z.id] ?? z.en, timeZone: z.timeZone, group: z.group })),
    ...worldCities
      .map((c) => ({ id: c.en, label: `${cityNameDe(c)} (${countryNameDe(c)})`, timeZone: c.timeZone, group: "city" as const }))
      .sort((a, b) => a.label.localeCompare(b.label, "de")),
  ];
}

function slugifyDe(text: string) {
  return text
    .toLocaleLowerCase("de")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Deutscher URL-Teil einer Stadt: aus dem deutschen Namen, sonst der bestehende Bezeichner. */
export function citySlugDe(city: WorldCity) {
  return CITY_DE[city.en] ? slugifyDe(CITY_DE[city.en]) : city.en;
}

export function findCityDe(slug: string) {
  return worldCities.find((c) => citySlugDe(c) === slug) ?? null;
}

export function cityPathDe(city: WorldCity) {
  return `/de/uhrzeit/${citySlugDe(city)}`;
}
