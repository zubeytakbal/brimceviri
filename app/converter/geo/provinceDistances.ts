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

/**
 * Güzergâh üzerindeki il merkezleri: KGM mesafe cetvelinden, A → il1 → il2 → … → B zincirinin
 * toplamı doğrudan mesafeyi en fazla %2 (+5 km) aşacak şekilde en çok ili kapsayan zincir.
 * Alternatif güzergâhlar (ör. Konya mı Ankara mı) karışmasın diye tek bir zincir seçilir.
 */
export function routeStops(from: TurkeyProvince, to: TurkeyProvince): { province: TurkeyProvince; fromStart: number }[] {
  const direct = roadKm(from, to);
  const limit = direct * 1.02 + 5;
  const cands = turkeyProvinces
    .filter((p) => p.plate !== from.plate && p.plate !== to.plate && roadKm(from, p) + roadKm(p, to) <= limit)
    .sort((x, y) => roadKm(from, x) - roadKm(from, y));
  // best[i]: i ile biten en uzun zincir (il sayısı) ve o zincirin A'dan i'ye uzunluğu
  const best = cands.map((p) => ({ count: 1, len: roadKm(from, p), prev: -1 }));
  for (let i = 0; i < cands.length; i++) {
    for (let j = 0; j < i; j++) {
      const len = best[j].len + roadKm(cands[j], cands[i]);
      if (len + roadKm(cands[i], to) > limit) continue;
      if (best[j].count + 1 > best[i].count || (best[j].count + 1 === best[i].count && len < best[i].len)) {
        best[i] = { count: best[j].count + 1, len, prev: j };
      }
    }
  }
  let end = -1;
  for (let i = 0; i < cands.length; i++) {
    if (best[i].len + roadKm(cands[i], to) > limit) continue;
    if (end < 0 || best[i].count > best[end].count || (best[i].count === best[end].count && best[i].len < best[end].len)) end = i;
  }
  const chain: number[] = [];
  for (let i = end; i >= 0; i = best[i].prev) chain.unshift(i);
  return chain.map((i) => ({ province: cands[i], fromStart: roadKm(from, cands[i]) }));
}
