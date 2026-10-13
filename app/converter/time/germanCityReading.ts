// Stadtseite: Luftlinie, Tageslänge und drei Uhrzeiten aus den Stadtdaten.
import { formatTime } from "./cityFacts";
import { cityNameDe } from "./germanWorld";
import { sunTimes } from "./solar";
import { differenceMinutes, offsetMinutes } from "./timezones";
import { worldCities, type WorldCity } from "./worldCities";

const BERLIN_ZONE = "Europe/Berlin";
const EARTH_KM = 6371.0088;

function formatDe(value: number, digits: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: digits });
}

function localYmd(timeZone: string, date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const read = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { year: read("year"), month: read("month"), day: read("day") };
}

function airKm(a: WorldCity, b: WorldCity) {
  const r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r;
  const dLon = (b.lon - a.lon) * r;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

function clock(minutes: number) {
  const norm = ((minutes % 1440) + 1440) % 1440;
  const text = `${String(Math.floor(norm / 60)).padStart(2, "0")}:${String(norm % 60).padStart(2, "0")} Uhr`;
  return minutes >= 1440 ? `${text} am Folgetag` : minutes < 0 ? `${text} am Vortag` : text;
}

function addDays(ymd: { year: number; month: number; day: number }, days: number) {
  const date = new Date(Date.UTC(ymd.year, ymd.month - 1, ymd.day + days));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

function dateLabel(ymd: { year: number; month: number; day: number }) {
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(ymd.year, ymd.month - 1, ymd.day)),
  );
}

function daylight(city: WorldCity, ymd: { year: number; month: number; day: number }) {
  const sun = sunTimes(ymd.year, ymd.month, ymd.day, city.lat, city.lon);
  if (sun.kind === "normal") {
    return { label: `${sun.dayLengthMinutes} Minuten`, minutes: sun.dayLengthMinutes, sun };
  }
  const polarDay = sun.kind === "polar-day";
  return { label: polarDay ? "Mitternachtssonne" : "Polarnacht", minutes: polarDay ? 24 * 60 : 0, sun };
}

export type GermanCityReading = {
  heading: string;
  paragraphs: string[];
};

export function buildGermanCityReading(city: WorldCity, now: Date): GermanCityReading {
  const berlin = worldCities.find((item) => item.en === "berlin")!;
  const name = cityNameDe(city);
  const other =
    city.en === berlin.en
      ? worldCities
          .filter((item) => item.en !== city.en)
          .map((item) => ({ item, km: airKm(city, item) }))
          .sort((a, b) => a.km - b.km)[0]
      : { item: berlin, km: airKm(city, berlin) };
  const ymd = localYmd(city.timeZone, now);
  const here = daylight(city, ymd);
  const there = daylight(other.item, ymd);
  const date = dateLabel(ymd);
  const coming = [1, 2, 3].map((offset) => {
    const day = addDays(ymd, offset);
    return `${name} am ${dateLabel(day)}: ${daylight(city, day).label}`;
  });
  const diff = differenceMinutes(BERLIN_ZONE, city.timeZone, now);
  const berlinOffset = offsetMinutes(BERLIN_ZONE, now);
  const clocks = [8, 12, 18].map((hour) =>
    clock(hour * 60 - berlinOffset + offsetMinutes(city.timeZone, now)),
  );
  const lat = `${formatDe(Math.abs(city.lat), 2)}° ${city.lat >= 0 ? "Nord" : "Süd"}`;
  const lon = `${formatDe(Math.abs(city.lon), 2)}° ${city.lon >= 0 ? "Ost" : "West"}`;
  const km = formatDe(other.km, other.km < 10 ? 1 : 0);
  const otherName = cityNameDe(other.item);
  const sunText =
    here.sun.kind === "normal"
      ? `Sonnenaufgang in ${name} ${formatTime(here.sun.sunrise, city.timeZone, "de")}, Sonnenuntergang ${formatTime(here.sun.sunset, city.timeZone, "de")}`
      : `${name}: ${here.label}`;
  const ahead = diff > 0 ? "vor" : diff < 0 ? "hinter" : "gleichauf mit";

  return {
    heading: `${name} in Zahlen`,
    paragraphs: [
      `${name} liegt bei ${lat}, ${lon}. ${name}–${otherName}: ${km} km Luftlinie.`,
      `${name} am ${date}: ${here.label} Tageslicht. ${otherName} am ${date}: ${there.label}. Unterschied ${formatDe(Math.abs(here.minutes - there.minutes), 0)} Minuten. ${sunText}. ${coming.join(". ")}.`,
      `Berlin 08:00, 12:00 und 18:00 Uhr sind in ${name} ${clocks[0]}, ${clocks[1]} und ${clocks[2]}. ${name} liegt ${formatDe(Math.abs(diff), 0)} Minuten ${ahead} Berlin.`,
    ],
  };
}

export function germanCityReadingPlain(city: WorldCity, now: Date) {
  const reading = buildGermanCityReading(city, now);
  return [reading.heading, ...reading.paragraphs].join(" ");
}
