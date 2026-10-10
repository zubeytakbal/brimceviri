// Deutsche Laenderseiten (/de/laender): Hilfsfunktionen mit Bezug auf Deutschland.
import { fxPairsDe } from "../fx/fxContentDe";
import {
  countryByIso3,
  worldCountries,
  type WorldCountry,
} from "./worldCountries";
import { worldCountriesDe, type WorldCountryDe } from "./worldCountriesDe";
import { offsetMinutes } from "./worldGeo";

export const GERMANY = countryByIso3("DEU")!;

/** Laender mit deutscher Seite (ohne Nordzypern). */
export const countriesDe = worldCountries.filter(
  (c) => worldCountriesDe[c.iso3],
);

export function deOf(country: WorldCountry): WorldCountryDe {
  return worldCountriesDe[country.iso3];
}

export function findCountryDe(id: string) {
  return countriesDe.find((c) => deOf(c).id === id) ?? null;
}

export function countryPathDe(country: WorldCountry) {
  const de = worldCountriesDe[country.iso3];
  return de ? `/de/laender/${de.id}` : null;
}

let currencyNames: Intl.DisplayNames | null = null;
export function currencyNameDe(code: string) {
  try {
    currencyNames ??= new Intl.DisplayNames("de", { type: "currency" });
    return currencyNames.of(code) ?? code;
  } catch {
    return code;
  }
}

/** Waehrungsrechner-Seite Euro → Landeswaehrung, falls vorhanden. */
export function fxPathDe(code: string) {
  const pair = fxPairsDe.find((p) => p.from === "EUR" && p.to === code);
  return pair ? "/de/waehrungsrechner" : null;
}

/** Zeitverschiebung in Minuten: Land minus Deutschland. */
export function zeitverschiebung(country: WorldCountry, date: Date) {
  return offsetMinutes(country.tz, date) - offsetMinutes("Europe/Berlin", date);
}

function dauer(minutes: number) {
  const a = Math.abs(minutes);
  const h = Math.floor(a / 60);
  const m = a % 60;
  if (!h) return `${m} Minuten`;
  return `${h} ${h === 1 ? "Stunde" : "Stunden"}${m ? ` ${m} Minuten` : ""}`;
}

export function zeitverschiebungKurz(minutes: number) {
  if (minutes === 0) return "±0 Std.";
  const a = Math.abs(minutes);
  return `${minutes > 0 ? "+" : "−"}${Math.floor(a / 60)}${a % 60 ? `:${String(a % 60).padStart(2, "0")}` : ""} Std.`;
}

export function zeitverschiebungText(minutes: number) {
  if (minutes === 0) return "gleiche Uhrzeit wie in Deutschland";
  return `${dauer(minutes)} ${minutes > 0 ? "später" : "früher"} als in Deutschland`;
}

export function utcText(minutes: number) {
  if (minutes === 0) return "UTC±0";
  const a = Math.abs(minutes);
  return `UTC${minutes > 0 ? "+" : "−"}${Math.floor(a / 60)}${a % 60 ? `:${String(a % 60).padStart(2, "0")}` : ""}`;
}

/** Luftlinie zwischen den Hauptstaedten (km). */
export function hauptstadtKm(a: WorldCountry, b: WorldCountry) {
  const r = Math.PI / 180;
  const dLat = (b.capLat - a.capLat) * r;
  const dLon = (b.capLon - a.capLon) * r;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.capLat * r) * Math.cos(b.capLat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371.0088 * Math.asin(Math.min(1, Math.sqrt(h)));
}

// Stand 2026: Bulgarien ist seit 1. Januar 2026 Mitglied der Eurozone; Bulgarien und Rumänien seit 1. Januar 2025 voll im Schengen-Raum.
export const EU_MEMBERS = [
  "AUT",
  "BEL",
  "BGR",
  "HRV",
  "CYP",
  "CZE",
  "DNK",
  "EST",
  "FIN",
  "FRA",
  "DEU",
  "GRC",
  "HUN",
  "IRL",
  "ITA",
  "LVA",
  "LTU",
  "LUX",
  "MLT",
  "NLD",
  "POL",
  "PRT",
  "ROU",
  "SVK",
  "SVN",
  "ESP",
  "SWE",
];
export const EUROZONE = [
  "AUT",
  "BEL",
  "BGR",
  "HRV",
  "CYP",
  "EST",
  "FIN",
  "FRA",
  "DEU",
  "GRC",
  "IRL",
  "ITA",
  "LVA",
  "LTU",
  "LUX",
  "MLT",
  "NLD",
  "PRT",
  "SVK",
  "SVN",
  "ESP",
];
export const SCHENGEN = [
  "AUT",
  "BEL",
  "BGR",
  "HRV",
  "CZE",
  "DNK",
  "EST",
  "FIN",
  "FRA",
  "DEU",
  "GRC",
  "HUN",
  "ISL",
  "ITA",
  "LVA",
  "LIE",
  "LTU",
  "LUX",
  "MLT",
  "NLD",
  "NOR",
  "POL",
  "PRT",
  "ROU",
  "SVK",
  "SVN",
  "ESP",
  "SWE",
  "CHE",
];

/** Flaeche der Bundeslaender in km² (Statistisches Bundesamt, gerundet). */
export const BUNDESLAND_FLAECHEN: Array<{ name: string; area: number }> = [
  { name: "Bayern", area: 70542 },
  { name: "Niedersachsen", area: 47710 },
  { name: "Baden-Württemberg", area: 35748 },
  { name: "Nordrhein-Westfalen", area: 34112 },
  { name: "Brandenburg", area: 29654 },
  { name: "Mecklenburg-Vorpommern", area: 23295 },
  { name: "Hessen", area: 21116 },
  { name: "Sachsen-Anhalt", area: 20467 },
  { name: "Rheinland-Pfalz", area: 19858 },
  { name: "Sachsen", area: 18450 },
  { name: "Thüringen", area: 16202 },
  { name: "Schleswig-Holstein", area: 15804 },
  { name: "Saarland", area: 2571 },
  { name: "Berlin", area: 891 },
  { name: "Hamburg", area: 755 },
  { name: "Bremen", area: 420 },
];

/** Bundesland mit aehnlicher Flaeche (±20 %), nur fuer kleinere Laender. */
export function aehnlichesBundesland(area: number) {
  if (area > 85000) return null;
  const best = [...BUNDESLAND_FLAECHEN].sort(
    (a, b) =>
      Math.abs(Math.log(area / a.area)) - Math.abs(Math.log(area / b.area)),
  )[0];
  const ratio = area / best.area;
  return ratio >= 0.8 && ratio <= 1.25 ? best : null;
}

const num = (n: number, digits = 0) =>
  n.toLocaleString("de-DE", { maximumFractionDigits: digits });

export function groessenvergleich(country: WorldCountry) {
  const r = country.area / GERMANY.area;
  if (r >= 1.05) return `etwa ${num(r, 1)}-mal so groß wie Deutschland`;
  if (r > 0.95) return "etwa so groß wie Deutschland";
  const pct = r * 100;
  const text =
    pct >= 0.01
      ? num(pct, pct >= 1 ? 1 : 2)
      : pct.toLocaleString("de-DE", { maximumSignificantDigits: 2 });
  return `etwa ${text} % der Fläche Deutschlands`;
}

/** Hinweis zu Steckdosen aus Sicht eines Reisenden mit deutschen Geraeten (Typ C/F, 230 V). */
export function steckdosenHinweis(
  plugTypes: string[],
  voltage: [number, number],
) {
  const lowVoltage = voltage[0] < 200;
  let text: string;
  if (plugTypes.includes("F"))
    text =
      "Deutsche Stecker (Schuko, Typ F, und Eurostecker, Typ C) passen, ein Reiseadapter ist nicht nötig.";
  else if (plugTypes.includes("E"))
    text =
      "Eurostecker (Typ C) passen. Viele deutsche Schukostecker haben einen Hybridkontakt und passen ebenfalls in Typ-E-Steckdosen.";
  else if (plugTypes.includes("C"))
    text =
      "Flache Eurostecker (Typ C) passen meist, für Schukostecker (Typ F) wird ein Reiseadapter benötigt.";
  else
    text = `Deutsche Stecker passen nicht, ein Reiseadapter für Typ ${plugTypes.join("/")} wird benötigt.`;
  if (lowVoltage)
    text += ` Die Netzspannung ist niedriger als in Deutschland (${voltage[0]}${voltage[1] !== voltage[0] ? `–${voltage[1]}` : ""} V); Netzteile mit „100–240 V“ funktionieren, andere Geräte brauchen einen Spannungswandler.`;
  return text;
}
