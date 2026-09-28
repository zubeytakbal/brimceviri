// Iller arasi karayolu (KGM) ve kus ucusu mesafe hesaplari.
import { KGM_DISTANCES } from "./kgmDistances";
import { turkeyProvinces, type TurkeyProvince } from "./turkeyProvinces";

const R = 6371.0088;

export function airKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function roadKm(a: TurkeyProvince, b: TurkeyProvince) {
  return KGM_DISTANCES[a.plate - 1][b.plate - 1];
}

/** Ortalama hizla surus suresi (dakika). */
export function driveMinutes(km: number, avgKmh: number) {
  return (km / avgKmh) * 60;
}

export function durationText(minutes: number) {
  const m = Math.round(minutes);
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (!h) return `${r} dk`;
  return r ? `${h} sa ${r} dk` : `${h} sa`;
}

export type DistanceRow = { province: TurkeyProvince; road: number; air: number };

/** Bir ilden diger 80 ile mesafeler, karayoluna gore sirali. */
export function distancesFrom(origin: TurkeyProvince): DistanceRow[] {
  return turkeyProvinces
    .filter((p) => p.plate !== origin.plate)
    .map((p) => ({ province: p, road: roadKm(origin, p), air: airKm(origin, p) }))
    .sort((x, y) => x.road - y.road);
}

/** Varsayilan ortalama hiz: sehirlerarasi yolculukta molasiz ortalama (otoyol + devlet yolu karisik). */
export const DEFAULT_AVG_KMH = 85;
