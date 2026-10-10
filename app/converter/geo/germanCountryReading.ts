// Deutsche Laenderseite: Flaeche, Luftlinie und Uhrzeit aus den Laenderdaten.
// 850 km/h ist eine angenommene Reisegeschwindigkeit, kein Flugplan.
import { countryByIso3, type WorldCountry } from "./worldCountries";
import { areaRank, offsetMinutes } from "./worldGeo";
import {
  BUNDESLAND_FLAECHEN,
  countriesDe,
  deOf,
  EU_MEMBERS,
  GERMANY,
  hauptstadtKm,
  utcText,
} from "./worldGeoDe";

const KM_PER_MILE = 1.609344;
const SQ_MI_PER_KM2 = 1 / KM_PER_MILE ** 2;
const CRUISE_KMH = 850;

const FRA = countryByIso3("FRA")!;
const AUT = countryByIso3("AUT")!;
const ESP = countryByIso3("ESP")!;
const ITA = countryByIso3("ITA")!;
const POL = countryByIso3("POL")!;
const GBR = countryByIso3("GBR")!;

function formatDe(value: number, digits: number) {
  return value.toLocaleString("de-DE", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  });
}

export function formatGermanArea(area: number) {
  return formatDe(area, Math.abs(area) < 10 ? 2 : 0);
}

function formatPercent(pct: number) {
  if (pct >= 1) return formatDe(pct, 1);
  if (pct >= 0.01) return formatDe(pct, 2);
  return pct.toLocaleString("de-DE", { maximumSignificantDigits: 3 });
}

function uhr(minutes: number) {
  const norm = ((minutes % 1440) + 1440) % 1440;
  const text = `${String(Math.floor(norm / 60)).padStart(2, "0")}:${String(norm % 60).padStart(2, "0")} Uhr`;
  return minutes >= 1440 ? `${text} (am nächsten Tag)` : minutes < 0 ? `${text} (am Vortag)` : text;
}

function dauer(km: number) {
  const hours = km / CRUISE_KMH;
  const minutes = Math.round(hours * 60);
  if (minutes <= 0) return `unter 1 min für ${formatKm(km)} km`;
  const hText = formatDe(hours, hours >= 10 ? 1 : 2);
  return `${hText} h (${formatDe(minutes, 0)} min) für ${formatKm(km)} km`;
}

function naechstesBundesland(area: number) {
  return [...BUNDESLAND_FLAECHEN].sort(
    (a, b) => Math.abs(Math.log(area / a.area)) - Math.abs(Math.log(area / b.area)),
  )[0];
}

function formatKm(km: number) {
  return formatDe(km, km < 10 ? 1 : 0);
}

function mal(name: string, area: number, refName: string, refArea: number) {
  const ratio = area / refArea;
  if (ratio >= 1.05) return `${formatDe(ratio, 2)}-mal ${refName}, ${name}`;
  if (ratio > 0.95) return `${formatGermanArea(area)} km² fast wie ${refName}, ${name}`;
  return `${formatPercent(ratio * 100)} % von ${refName}, ${name}`;
}

function nearestCapitals(country: WorldCountry, count: number) {
  return countriesDe
    .filter((item) => item.iso3 !== country.iso3)
    .map((item) => ({ country: item, km: hauptstadtKm(country, item) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count);
}

export type GermanCountryReading = {
  heading: string;
  intro: string;
  rows: { label: string; value: string }[];
  shape: string;
  nearest: string;
  clock: string;
  method: string;
};

export function buildGermanCountryReading(country: WorldCountry, now: Date): GermanCountryReading {
  const de = deOf(country);
  const name = de.name;
  const cap = de.capital.split(",")[0];
  const isDe = country.iso3 === "DEU";
  const area = country.area;
  const rank = areaRank(country);
  const total = countriesDe.length;
  const ha = area * 100;
  const m2 = area * 1_000_000;
  const sqmi = area * SQ_MI_PER_KM2;
  const bundesland = naechstesBundesland(area);
  const reference = country.iso3 === "FRA" ? AUT : FRA;
  const refDe = deOf(reference);
  const euArea = countriesDe
    .filter((item) => EU_MEMBERS.includes(item.iso3))
    .reduce((sum, item) => sum + item.area, 0);
  const abroad = nearestCapitals(country, 1)[0];
  const berlinKm = isDe ? abroad.km : hauptstadtKm(GERMANY, country);
  const berlinCap = isDe ? deOf(abroad.country).capital.split(",")[0] : cap;
  const berlinName = isDe ? deOf(abroad.country).name : name;
  const miles = berlinKm / KM_PER_MILE;
  const nautical = berlinKm / 1.852;
  const side = Math.sqrt(area);
  const radius = Math.sqrt(area / Math.PI);
  const offset = offsetMinutes(country.tz, now);
  const berlinClock = uhr(12 * 60 + offsetMinutes("Europe/Berlin", now) - offset);
  const newYorkClock = uhr(12 * 60 + offsetMinutes("America/New_York", now) - offset);
  const nearest = nearestCapitals(country, 5);
  const extraRefs = [ESP, ITA, POL]
    .filter((item) => item.iso3 !== country.iso3 && item.iso3 !== reference.iso3)
    .slice(0, 2);
  const anchors = [GBR, AUT, ESP].filter((item) => item.iso3 !== country.iso3).slice(0, 2);
  const factor = formatDe(SQ_MI_PER_KM2, 6);
  const kmText = formatKm(berlinKm);
  const sideText = formatDe(side, side < 10 ? 2 : 1);
  const radiusText = formatDe(radius, radius < 10 ? 2 : 1);

  const rows: { label: string; value: string }[] = [
    { label: "Hektar", value: `${formatGermanArea(ha)} ha, ${name}` },
    { label: "Ar", value: `${formatDe(area * 10_000, 0)} a, ${name}` },
    { label: "Quadratmeter", value: `${formatDe(m2, 0)} m², ${name}` },
    { label: "Quadratmeilen", value: `${formatDe(sqmi, sqmi < 10 ? 2 : 0)} mi², ${name}` },
    { label: "Flächenrang", value: `Platz ${rank} von ${total}, ${name}` },
    ...(isDe ? [] : [{ label: "Deutschland", value: mal(name, area, "Deutschland", GERMANY.area) }]),
    { label: bundesland.name, value: mal(name, area, bundesland.name, bundesland.area) },
    { label: refDe.name, value: mal(name, area, refDe.name, reference.area) },
    ...extraRefs.map((item) => {
      const extra = deOf(item);
      return { label: extra.name, value: mal(name, area, extra.name, item.area) };
    }),
    {
      label: "EU-Summe",
      value: `${formatPercent((area / euArea) * 100)} % von ${formatGermanArea(euArea)} km², ${name}`,
    },
    {
      label: "Luftlinie",
      value: `${kmText} km Berlin–${berlinCap}, ${berlinName}`,
    },
    { label: "Meilen", value: `${formatDe(miles, miles < 10 ? 1 : 0)} Meilen, ${name}` },
    { label: "Seemeilen", value: `${formatDe(nautical, nautical < 10 ? 1 : 0)} sm, ${name}` },
    { label: "850 km/h", value: `${dauer(berlinKm)}, ${name}` },
    ...anchors.map((item) => {
      const other = deOf(item);
      const city = other.capital.split(",")[0];
      const km = hauptstadtKm(country, item);
      return { label: city, value: `${formatKm(km)} km ${cap}–${city}, ${name}` };
    }),
    {
      label: "Koordinaten",
      value: `${formatDe(Math.abs(country.capLat), 2)}° ${country.capLat >= 0 ? "Nord" : "Süd"}, ${formatDe(Math.abs(country.capLon), 2)}° ${country.capLon >= 0 ? "Ost" : "West"}, ${cap}`,
    },
    { label: "Vorwahl", value: `${country.phone}, ${name}` },
    { label: "Domain", value: `${country.tld}, ${name}` },
  ];

  const nearestText = nearest
    .map((item) => {
      const other = deOf(item.country);
      const city = other.capital.split(",")[0];
      return `${cap}–${city} ${formatKm(item.km)} km`;
    })
    .join(", ");

  return {
    heading: `${name} in Zahlen`,
    intro: `${name}, ${formatGermanArea(area)} km², Hauptstadt ${cap}.`,
    rows,
    shape: `Quadratseite ${sideText} km und Kreisradius ${radiusText} km sind flächengleich mit ${name}, nicht die Landesgrenze.`,
    nearest: `Nächste Hauptstädte ab ${cap}: ${nearestText}.`,
    clock: isDe
      ? `Berlin um 12:00: New York ${newYorkClock}, ${name} ${utcText(offset)}.`
      : `${cap} um 12:00: Berlin ${berlinClock}, New York ${newYorkClock}, ${name} ${utcText(offset)}.`,
    method: `${name}: 1 km² = 100 ha = 10.000 a = 1.000.000 m² = ${factor} mi², Seemeile = 1,852 km. Luftlinie ÷ ${CRUISE_KMH} km/h ist kein Flugplan. Die EU-Summe zählt die EU-Staaten dieser Liste, ${name}.`,
  };
}

export function germanCountryReadingPlain(country: WorldCountry, now: Date) {
  const reading = buildGermanCountryReading(country, now);
  return [
    reading.heading,
    reading.intro,
    ...reading.rows.flatMap((row) => [row.label, row.value]),
    reading.shape,
    reading.nearest,
    reading.clock,
    reading.method,
  ].join(" ");
}
