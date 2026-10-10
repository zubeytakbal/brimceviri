// Ingilizce ulke sayfasi: yuzolcumu, baskent, saat ve sinir. Sayilar bu
// listedeki ulke kaydindan ve buyuk daire hesabindan gelir.
import { areaRank, nearestCountries, neighborsOf, offsetMinutes, TURKEY } from "./worldGeo";
import { worldCountries, type WorldCountry } from "./worldCountries";
import {
  capitalDistanceKm,
  currencyNameEn,
  enOf,
  GBR,
  USA,
  utcOffsetText,
} from "./worldGeoEn";

const num = (n: number, digits = 0) =>
  n.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });

function withThe(name: string) {
  return /^(United|Netherlands|Philippines|Bahamas|Gambia|Maldives|Marshall|Solomon|Central African|Dominican Republic|Czech|Comoros|Seychelles|Republic of the|DR )/.test(
    name,
  )
    ? `the ${name}`
    : name;
}

function coord(value: number, positive: string, negative: string) {
  return `${Math.abs(value).toFixed(2)}°${value >= 0 ? positive : negative}`;
}

function ratioText(ratio: number) {
  if (ratio >= 1.05) return `${num(ratio, ratio >= 10 ? 1 : 2)} times`;
  if (ratio > 0.95) return "about the same size as";
  const pct = ratio * 100;
  const digits = pct >= 1 ? 1 : pct >= 0.01 ? 2 : pct >= 0.0001 ? 4 : 6;
  return `${num(pct, digits)}% of`;
}

function clockAt(minutes: number) {
  const norm = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(norm / 60);
  const m = norm % 60;
  const text = `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${h < 12 ? "a.m." : "p.m."}`;
  return minutes >= 1440 ? `${text} the next day` : minutes < 0 ? `${text} the previous day` : text;
}

function hours(km: number) {
  const h = km / 850;
  return h >= 10 ? num(h, 0) : num(h, 1);
}

export function countryReadingParagraphs(country: WorldCountry, now: Date) {
  const e = enOf(country);
  const name = country.nameEn;
  const the = withThe(name);
  const The = the.charAt(0).toUpperCase() + the.slice(1);
  const capital = e.capital.split(" (")[0];
  const rank = areaRank(country);
  const sqmi = country.area * 0.386102;
  const acres = country.area * 247.105;
  const miles = (km: number) => km * 0.621371;
  const refs = [USA, GBR].filter((ref) => ref.iso3 !== country.iso3);
  const comparisons = refs
    .map((ref) => {
      const label = ref.iso3 === "USA" ? "the US" : "the UK";
      return `${ratioText(country.area / ref.area)} ${label}`;
    })
    .join(" and ");
  const distances = refs.map((ref) => {
    const km = capitalDistanceKm(country, ref);
    const place = ref.iso3 === "USA" ? "Washington" : "London";
    return `${capital} to ${place} is ${num(km)} km (${num(miles(km))} mi), about ${hours(km)} h at 850 km/h`;
  });
  const offset = offsetMinutes(country.tz, now);
  const noon = 12 * 60;
  const newYork = clockAt(noon + offsetMinutes("America/New_York", now) - offset);
  const london = clockAt(noon + offsetMinutes("Europe/London", now) - offset);
  const money = country.currencies.map((code) => `${currencyNameEn(code)} (${code})`).join(" and ");
  const neighbors = neighborsOf(country).map((item) => item.nameEn);
  const border =
    neighbors.length === 0
      ? `${name} has no land border`
      : neighbors.length === 1
        ? `${name} borders only ${neighbors[0]}`
        : `${name} borders ${neighbors.slice(0, -1).join(", ")} and ${neighbors[neighbors.length - 1]}`;
  const coast = country.landlocked ? `${name} is landlocked` : `${name} has a coastline`;
  const languages = e.languages.length ? `${name} official languages: ${e.languages.join(", ")}` : "";
  const demonym = e.demonym ? `${e.demonym} is the demonym for ${name}` : "";
  const membership = country.unMember ? `${name} UN membership: yes` : `${name} UN membership: no`;
  const nearest = nearestCountries(country, 5)
    .map((item) => `${enOf(item.country).capital.split(" (")[0]} ${num(item.km)} km`)
    .join(", ");
  const ankaraKm = country.iso3 === "TUR" ? null : capitalDistanceKm(country, TURKEY);
  const dial = country.phone.replace("+", "");

  return [
    `${The} covers ${num(country.area)} km², about ${num(sqmi)} square miles and ${num(acres)} acres, and ranks ${rank} among ${worldCountries.length}. ${name}, ${num(country.area)} km², is ${comparisons}.`,
    `${capital} sits at ${coord(country.capLat, "N", "S")}, ${coord(country.capLon, "E", "W")}. ${distances.join(". ")}. ${
      ankaraKm === null
        ? ""
        : `${capital} to Ankara is ${num(ankaraKm)} km (${num(miles(ankaraKm))} mi), about ${hours(ankaraKm)} h at 850 km/h. `
    }${name}: rough cruise estimate, not a timetable. ${e.note ? `${name}: ${e.note}` : ""}`.trim(),
    `${name} uses ${money}. Call ${country.phone} and use the domain ${country.tld || country.iso2.toLowerCase()}. ${capital} follows ${country.tz.replaceAll("_", " ")}, ${utcOffsetText(offset)}. ${capital} noon is ${newYork} in New York. ${capital} noon is ${london} in London.`,
    [border, coast, languages, demonym, `ISO codes ${country.iso2} and ${country.iso3} identify ${name}`, membership, e.subregion ? `${name} is in ${e.subregion}` : ""]
      .filter(Boolean)
      .join(". ") + ".",
    `${name}'s ${num(country.area)} km² equals ${num(country.area * 100)} hectares and ${num(country.area * 1_000_000)} m². ${capital} nearby capitals: ${nearest}. ${
      country.iso3 === "USA"
        ? `Call ${country.phone} inside ${name}.`
        : `Dial 011 ${dial} for ${name} from the United States, or 00 ${dial} for ${name}.`
    }`,
  ];
}

export function countryReadingPlain(country: WorldCountry, now: Date) {
  return countryReadingParagraphs(country, now).join(" ");
}
