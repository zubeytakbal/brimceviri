// İsveççe, Norveççe ve Danca dünya saati için şehir, ülke ve bölge adları.
// Listede olmayan şehirler İngilizce adıyla kalır (New York, London, Tokyo...).
import type { NordicLocale } from "./nordicWeek";
import { citySlugDe } from "./germanWorld";
import { worldCities, type WorldCity } from "./worldCities";

type Names = Partial<Record<NordicLocale, string>>;

const CITY: Record<string, Names> = {
  brussels: { sv: "Bryssel", no: "Brussel", da: "Bruxelles" },
  rome: { sv: "Rom", no: "Roma", da: "Rom" },
  milan: { sv: "Milano", no: "Milano", da: "Milano" },
  vienna: { sv: "Wien", no: "Wien", da: "Wien" },
  zurich: { sv: "Zürich", no: "Zürich", da: "Zürich" },
  copenhagen: { sv: "Köpenhamn", no: "København", da: "København" },
  helsinki: { sv: "Helsingfors" },
  lisbon: { sv: "Lissabon", no: "Lisboa", da: "Lissabon" },
  athens: { sv: "Aten", no: "Athen", da: "Athen" },
  warsaw: { sv: "Warszawa", no: "Warszawa", da: "Warszawa" },
  prague: { sv: "Prag", no: "Praha", da: "Prag" },
  bucharest: { sv: "Bukarest", no: "Bucuresti", da: "Bukarest" },
  belgrade: { sv: "Belgrad", no: "Beograd", da: "Beograd" },
  moscow: { sv: "Moskva", no: "Moskva", da: "Moskva" },
  mecca: { sv: "Mecka", no: "Mekka", da: "Mekka" },
  "kuwait-city": { sv: "Kuwait", no: "Kuwait by" },
  baghdad: { sv: "Bagdad", no: "Bagdad", da: "Bagdad" },
  tehran: { sv: "Teheran", no: "Teheran", da: "Teheran" },
  cairo: { sv: "Kairo", no: "Kairo", da: "Kairo" },
  beijing: { sv: "Peking" },
  kathmandu: { sv: "Katmandu" },
  tashkent: { sv: "Tasjkent", no: "Tasjkent", da: "Tasjkent" },
  bishkek: { sv: "Bisjkek", no: "Bisjkek", da: "Bisjkek" },
  ashgabat: { sv: "Asjchabad", no: "Asjkhabad", da: "Asjkhabad" },
  algiers: { sv: "Alger", no: "Alger", da: "Algier" },
  "addis-ababa": { sv: "Addis Abeba", no: "Addis Abeba", da: "Addis Abeba" },
  "mexico-city": { no: "Mexico by" },
  havana: { sv: "Havanna", no: "Havanna" },
  montreal: { sv: "Montréal", no: "Montréal", da: "Montréal" },
};

const COUNTRY: Record<string, [string, string, string]> = {
  Türkiye: ["Turkiet", "Tyrkia", "Tyrkiet"],
  "United Kingdom": ["Storbritannien", "Storbritannia", "Storbritannien"],
  France: ["Frankrike", "Frankrike", "Frankrig"],
  Germany: ["Tyskland", "Tyskland", "Tyskland"],
  Netherlands: ["Nederländerna", "Nederland", "Nederlandene"],
  Belgium: ["Belgien", "Belgia", "Belgien"],
  Spain: ["Spanien", "Spania", "Spanien"],
  Italy: ["Italien", "Italia", "Italien"],
  Austria: ["Österrike", "Østerrike", "Østrig"],
  Switzerland: ["Schweiz", "Sveits", "Schweiz"],
  Sweden: ["Sverige", "Sverige", "Sverige"],
  Norway: ["Norge", "Norge", "Norge"],
  Denmark: ["Danmark", "Danmark", "Danmark"],
  Finland: ["Finland", "Finland", "Finland"],
  Ireland: ["Irland", "Irland", "Irland"],
  Portugal: ["Portugal", "Portugal", "Portugal"],
  Greece: ["Grekland", "Hellas", "Grækenland"],
  Poland: ["Polen", "Polen", "Polen"],
  Czechia: ["Tjeckien", "Tsjekkia", "Tjekkiet"],
  Hungary: ["Ungern", "Ungarn", "Ungarn"],
  Romania: ["Rumänien", "Romania", "Rumænien"],
  Bulgaria: ["Bulgarien", "Bulgaria", "Bulgarien"],
  Serbia: ["Serbien", "Serbia", "Serbien"],
  Ukraine: ["Ukraina", "Ukraina", "Ukraine"],
  Russia: ["Ryssland", "Russland", "Rusland"],
  Azerbaijan: ["Azerbajdzjan", "Aserbajdsjan", "Aserbajdsjan"],
  Georgia: ["Georgien", "Georgia", "Georgien"],
  "United Arab Emirates": ["Förenade Arabemiraten", "De forente arabiske emirater", "De Forenede Arabiske Emirater"],
  "Saudi Arabia": ["Saudiarabien", "Saudi-Arabia", "Saudi-Arabien"],
  Qatar: ["Qatar", "Qatar", "Qatar"],
  Kuwait: ["Kuwait", "Kuwait", "Kuwait"],
  Iraq: ["Irak", "Irak", "Irak"],
  Iran: ["Iran", "Iran", "Iran"],
  Jordan: ["Jordanien", "Jordan", "Jordan"],
  Lebanon: ["Libanon", "Libanon", "Libanon"],
  Egypt: ["Egypten", "Egypt", "Egypten"],
  Japan: ["Japan", "Japan", "Japan"],
  "South Korea": ["Sydkorea", "Sør-Korea", "Sydkorea"],
  China: ["Kina", "Kina", "Kina"],
  "Hong Kong (China)": ["Hongkong (Kina)", "Hongkong (Kina)", "Hongkong (Kina)"],
  Singapore: ["Singapore", "Singapore", "Singapore"],
  Thailand: ["Thailand", "Thailand", "Thailand"],
  Indonesia: ["Indonesien", "Indonesia", "Indonesien"],
  Philippines: ["Filippinerna", "Filippinene", "Filippinerne"],
  Malaysia: ["Malaysia", "Malaysia", "Malaysia"],
  India: ["Indien", "India", "Indien"],
  Pakistan: ["Pakistan", "Pakistan", "Pakistan"],
  Bangladesh: ["Bangladesh", "Bangladesh", "Bangladesh"],
  Nepal: ["Nepal", "Nepal", "Nepal"],
  Uzbekistan: ["Uzbekistan", "Usbekistan", "Usbekistan"],
  Kazakhstan: ["Kazakstan", "Kasakhstan", "Kasakhstan"],
  Kyrgyzstan: ["Kirgizistan", "Kirgisistan", "Kirgisistan"],
  Turkmenistan: ["Turkmenistan", "Turkmenistan", "Turkmenistan"],
  Afghanistan: ["Afghanistan", "Afghanistan", "Afghanistan"],
  Taiwan: ["Taiwan", "Taiwan", "Taiwan"],
  Australia: ["Australien", "Australia", "Australien"],
  "New Zealand": ["Nya Zeeland", "New Zealand", "New Zealand"],
  Nigeria: ["Nigeria", "Nigeria", "Nigeria"],
  Kenya: ["Kenya", "Kenya", "Kenya"],
  "South Africa": ["Sydafrika", "Sør-Afrika", "Sydafrika"],
  Morocco: ["Marocko", "Marokko", "Marokko"],
  Tunisia: ["Tunisien", "Tunisia", "Tunesien"],
  Algeria: ["Algeriet", "Algerie", "Algeriet"],
  Ethiopia: ["Etiopien", "Etiopia", "Etiopien"],
  "United States": ["USA", "USA", "USA"],
  Canada: ["Kanada", "Canada", "Canada"],
  Mexico: ["Mexiko", "Mexico", "Mexico"],
  Brazil: ["Brasilien", "Brasil", "Brasilien"],
  Argentina: ["Argentina", "Argentina", "Argentina"],
  Chile: ["Chile", "Chile", "Chile"],
  Peru: ["Peru", "Peru", "Peru"],
  Colombia: ["Colombia", "Colombia", "Colombia"],
  Venezuela: ["Venezuela", "Venezuela", "Venezuela"],
  Cuba: ["Kuba", "Cuba", "Cuba"],
  "United States (Hawaii)": ["USA (Hawaii)", "USA (Hawaii)", "USA (Hawaii)"],
  "United States (Alaska)": ["USA (Alaska)", "USA (Alaska)", "USA (Alaska)"],
};

const INDEX: Record<NordicLocale, number> = { sv: 0, no: 1, da: 2 };

export function cityNameNordic(locale: NordicLocale, city: WorldCity) {
  return CITY[city.en]?.[locale] ?? city.nameEn;
}

export function countryNameNordic(locale: NordicLocale, city: WorldCity) {
  return COUNTRY[city.countryEn]?.[INDEX[locale]] ?? city.countryEn;
}

export const NORDIC_REGION_NAMES: Record<NordicLocale, Record<string, string>> = {
  sv: { turkey: "Turkiet", europe: "Europa", "middle-east": "Mellanöstern", asia: "Asien", africa: "Afrika", oceania: "Oceanien", americas: "Amerika" },
  no: { turkey: "Tyrkia", europe: "Europa", "middle-east": "Midtøsten", asia: "Asia", africa: "Afrika", oceania: "Oseania", americas: "Amerika" },
  da: { turkey: "Tyrkiet", europe: "Europa", "middle-east": "Mellemøsten", asia: "Asien", africa: "Afrika", oceania: "Oceanien", americas: "Amerika" },
};

/** Test için: listede çevirisi eksik ülke var mı? */
export const NORDIC_COUNTRY_KEYS = Object.keys(COUNTRY);

/** Şehir sayfası adresleri: /sv/varldsklocka/new-york, /no/verdensklokke/kobenhavn... */
export const NORDIC_WORLD_BASE: Record<NordicLocale, string> = {
  sv: "/sv/varldsklocka",
  no: "/no/verdensklokke",
  da: "/da/verdensur",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/[øö]/g, "o")
    .replace(/[åä]/g, "a")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const citySlugNordic = (locale: NordicLocale, city: WorldCity) => slugify(cityNameNordic(locale, city));

export const cityPathNordic = (locale: NordicLocale, city: WorldCity) => `${NORDIC_WORLD_BASE[locale]}/${citySlugNordic(locale, city)}`;

export function findCityNordic(locale: NordicLocale, slug: string) {
  return worldCities.find((c) => citySlugNordic(locale, c) === slug) ?? null;
}

/** Bir şehrin tüm dillerdeki saat sayfası adresleri (hreflang ve sitemap için). */
export function worldCityPaths(city: WorldCity) {
  return {
    tr: `/dunya-saatleri/${city.tr}`,
    en: `/en/world-clock/${city.en}`,
    de: `/de/uhrzeit/${citySlugDe(city)}`,
    sv: cityPathNordic("sv", city),
    no: cityPathNordic("no", city),
    da: cityPathNordic("da", city),
  };
}
