// Ingilizce ulke sayfalari icin yardimcilar.
import { countryByIso3, worldCountries, type WorldCountry } from "./worldCountries";
import { worldCountriesEn, type WorldCountryEn } from "./worldCountriesEn";
import { offsetMinutes } from "./worldGeo";

export function enOf(country: WorldCountry): WorldCountryEn {
  return worldCountriesEn[country.iso3];
}

export function findCountryEn(id: string) {
  return worldCountries.find((c) => enOf(c).id === id) ?? null;
}

export function countryPathEn(country: WorldCountry) {
  return `/en/countries/${enOf(country).id}`;
}

let currencyNames: Intl.DisplayNames | null = null;
export function currencyNameEn(code: string) {
  try {
    currencyNames ??= new Intl.DisplayNames("en", { type: "currency" });
    return currencyNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export function utcOffsetText(minutes: number) {
  if (minutes === 0) return "UTC±0";
  const a = Math.abs(minutes);
  return `UTC${minutes > 0 ? "+" : "−"}${Math.floor(a / 60)}${a % 60 ? `:${String(a % 60).padStart(2, "0")}` : ""}`;
}

export function utcOffsetOf(country: WorldCountry, date: Date) {
  return offsetMinutes(country.tz, date);
}

/** Iki ulkenin baskentleri arasindaki buyuk daire mesafesi (km). */
export function capitalDistanceKm(a: WorldCountry, b: WorldCountry) {
  const r = Math.PI / 180;
  const dLat = (b.capLat - a.capLat) * r;
  const dLon = (b.capLon - a.capLon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.capLat * r) * Math.cos(b.capLat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371.0088 * Math.asin(Math.min(1, Math.sqrt(h)));
}

export const USA = countryByIso3("USA")!;
export const GBR = countryByIso3("GBR")!;
