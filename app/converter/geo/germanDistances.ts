// Entfernungen zwischen deutschen Großstädten (Luftlinie, Großkreis auf der Kugel).
import { germanCities, type GermanCity } from "./germanCities";

const R = 6371.0088; // mittlerer Erdradius (IUGG) in km
const rad = Math.PI / 180;

export function luftlinieKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Anfangskurs von a nach b in Grad (0 = Norden, im Uhrzeigersinn). */
export function kurs(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const y = Math.sin((b.lon - a.lon) * rad) * Math.cos(b.lat * rad);
  const x = Math.cos(a.lat * rad) * Math.sin(b.lat * rad) - Math.sin(a.lat * rad) * Math.cos(b.lat * rad) * Math.cos((b.lon - a.lon) * rad);
  return (Math.atan2(y, x) / rad + 360) % 360;
}

const RICHTUNGEN = ["Norden", "Nordosten", "Osten", "Südosten", "Süden", "Südwesten", "Westen", "Nordwesten"];
const ADJ = ["nördlich", "nordöstlich", "östlich", "südöstlich", "südlich", "südwestlich", "westlich", "nordwestlich"];

export const himmelsrichtung = (grad: number) => RICHTUNGEN[Math.round(grad / 45) % 8];
export const lageAdjektiv = (grad: number) => ADJ[Math.round(grad / 45) % 8];

export function mittelpunkt(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const [la1, lo1, la2, lo2] = [a.lat * rad, a.lon * rad, b.lat * rad, b.lon * rad];
  const bx = Math.cos(la2) * Math.cos(lo2 - lo1);
  const by = Math.cos(la2) * Math.sin(lo2 - lo1);
  const lat = Math.atan2(Math.sin(la1) + Math.sin(la2), Math.sqrt((Math.cos(la1) + bx) ** 2 + by ** 2));
  const lon = lo1 + Math.atan2(by, Math.cos(la1) + bx);
  return { lat: lat / rad, lon: lon / rad };
}

export const findGermanCity = (id: string) => germanCities.find((c) => c.id === id) ?? null;

export function entfernungenAb(city: GermanCity) {
  return germanCities
    .filter((c) => c.id !== city.id)
    .map((c) => ({ city: c, km: luftlinieKm(city, c), grad: kurs(city, c) }))
    .sort((x, y) => x.km - y.km);
}

/** Nächstgelegene Großstadt zu einem Punkt. */
export function naechsteStadt(p: { lat: number; lon: number }) {
  return germanCities.map((c) => ({ city: c, km: luftlinieKm(p, c) })).sort((x, y) => x.km - y.km)[0];
}

/* ---------------- Seiten ---------------- */

/** Meistgesuchte Startpunkte, auf der Übersichtsseite hervorgehoben. */
export const ENTFERNUNG_HUBS = ["berlin", "hamburg", "muenchen", "koeln", "frankfurt-am-main"] as const;

export const entfernungStadtPath = (c: GermanCity) => `/de/entfernung/${c.id}`;

/** Einzelne Strecken stehen im Rechner der Stadtseite: /de/entfernung/koeln?nach=essen. */
export const entfernungStreckePath = (a: GermanCity, b: GermanCity) => `/de/entfernung/${a.id}?nach=${b.id}#rechner`;
