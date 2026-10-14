// Güneş açısından türeyen geometri: gölge boyu, gölgeden yükseklik, karşı bina engeli ve
// panelin güneşe dik bakması için gereken eğim. Güneş konumu solar.ts (NOAA) ile hesaplanır.
import { sunPosition, sunTimes } from "./solar";
import { TR_OFFSET_MIN } from "./sunYear";

const rad = Math.PI / 180;

/** Yatay zemindeki gölge boyu; güneş ufkun altındaysa null. */
export function shadowLength(height: number, elevationDeg: number): number | null {
  if (elevationDeg <= 0) return null;
  return height / Math.tan(elevationDeg * rad);
}

/** Gölge boyu ve güneş yüksekliğinden cismin boyu. */
export function heightFromShadow(shadow: number, elevationDeg: number): number | null {
  if (elevationDeg <= 0) return null;
  return shadow * Math.tan(elevationDeg * rad);
}

/** Referans çubuk yöntemi: aynı anda ölçülen gölgelerin oranı (güneş açısı gerekmez). */
export function heightByReference(stickHeight: number, stickShadow: number, objectShadow: number) {
  return (objectShadow * stickHeight) / stickShadow;
}

const DIRS = ["K", "KKD", "KD", "DKD", "D", "DGD", "GD", "GGD", "G", "GGB", "GB", "BGB", "B", "BKB", "KB", "KKB"];
const DIR_NAMES: Record<string, string> = { K: "kuzey", D: "doğu", G: "güney", B: "batı", KD: "kuzeydoğu", GD: "güneydoğu", GB: "güneybatı", KB: "kuzeybatı" };
/** Azimutu 16 yönlü pusula kısaltmasına çevirir (K, KKD, KD, …). */
export const compass = (az: number) => DIRS[Math.round((((az % 360) + 360) % 360) / 22.5) % 16];
/** Ana ve ara yönlerin adı; ara-ara yönlerde kısaltmayı döndürür. */
export const compassName = (az: number) => DIR_NAMES[compass(az)] ?? compass(az);

/** Türkiye saatiyle (UTC+3) verilen yerel tarih ve saatin Date karşılığı. */
export const trDate = (y: number, m: number, d: number, hour: number, minute = 0) => new Date(Date.UTC(y, m - 1, d, hour, minute) - TR_OFFSET_MIN * 60000);

export type HourRow = { date: Date; elevation: number; azimuth: number; shadow: number | null };

/** Doğuştan batışa saat başı güneş konumu ve `height` boyundaki cismin gölgesi. */
export function hourlySun(y: number, m: number, d: number, lat: number, lon: number, height: number): HourRow[] {
  const rows: HourRow[] = [];
  for (let h = 0; h < 24; h++) {
    const date = trDate(y, m, d, h);
    const p = sunPosition(date, lat, lon);
    if (p.elevation > 0) rows.push({ date, elevation: p.elevation, azimuth: p.azimuth, shadow: shadowLength(height, p.elevation) });
  }
  return rows;
}

/** Öğle anında güneş yüksekliği (derece). */
export function noonElevation(y: number, m: number, d: number, lat: number, lon: number) {
  const s = sunTimes(y, m, d, lat, lon);
  return sunPosition(s.solarNoon, lat, lon).elevation;
}

export const FACADES = [
  { id: "G", label: "Güney", az: 180 },
  { id: "GD", label: "Güneydoğu", az: 135 },
  { id: "GB", label: "Güneybatı", az: 225 },
  { id: "D", label: "Doğu", az: 90 },
  { id: "B", label: "Batı", az: 270 },
  { id: "K", label: "Kuzey", az: 0 },
] as const;

/**
 * Pencerenin önünde, cepheye paralel uzanan (uzun) bir engel varken güneşin pencereye ulaştığı süre.
 * `obstacleAbove`: engelin pencere seviyesinden yüksekliği (m), `distance`: cepheler arası mesafe (m),
 * `facadeAz`: cephenin baktığı yön (azimut). Güneş cephenin önündeyse (açı farkı < 90°) ve
 * yüksekliği atan(h·cosΔ / d) değerini aşıyorsa pencere güneş alır. 5 dakikalık adımlarla taranır.
 */
export function directSunMinutes(y: number, m: number, d: number, lat: number, lon: number, facadeAz: number, obstacleAbove: number, distance: number) {
  let minutes = 0;
  let first: Date | null = null;
  let last: Date | null = null;
  for (let t = 0; t < 1440; t += 5) {
    const date = trDate(y, m, d, 0, t);
    const p = sunPosition(date, lat, lon);
    if (p.elevation <= 0) continue;
    const delta = ((((p.azimuth - facadeAz) % 360) + 540) % 360) - 180;
    if (Math.abs(delta) >= 90) continue;
    const need = obstacleAbove <= 0 ? 0 : Math.atan((obstacleAbove * Math.cos(delta * rad)) / distance) / rad;
    if (p.elevation > need) {
      minutes += 5;
      first ??= date;
      last = date;
    }
  }
  return { minutes, first, last };
}

/** Panelin öğle güneşine dik bakması için gereken eğim (yataydan, derece): 90° − öğle yüksekliği. */
export const perpendicularTilt = (noonElevationDeg: number) => 90 - noonElevationDeg;
