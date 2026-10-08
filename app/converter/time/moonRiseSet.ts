// Ay dogusu / batisi ve anlik konumu. Ay'in konumu Astronomical Almanac dusuk
// hassasiyetli formulleriyle (boylam ~0,3°, enlem ~0,2°) hesaplanir; dogus/batis
// anlari 10 dakikalik taramayla bulunup ikiye bolmeyle inceltilir. Tipik dogruluk
// birkac dakikadir.

const rad = Math.PI / 180;
const DAY = 86400000;

const sinD = (deg: number) => Math.sin(deg * rad);
const cosD = (deg: number) => Math.cos(deg * rad);

function julian(date: Date) {
  return date.getTime() / DAY + 2440587.5;
}

/** Yer merkezli ekvatoral koordinatlar (derece) ve yatay paralaks (derece). */
export function moonEquatorial(date: Date) {
  const T = (julian(date) - 2451545) / 36525;
  const lambda =
    218.32 +
    481267.881 * T +
    6.29 * sinD(135.0 + 477198.87 * T) -
    1.27 * sinD(259.3 - 413335.36 * T) +
    0.66 * sinD(235.7 + 890534.22 * T) +
    0.21 * sinD(269.9 + 954397.74 * T) -
    0.19 * sinD(357.5 + 35999.05 * T) -
    0.11 * sinD(186.5 + 966404.03 * T);
  const beta =
    5.13 * sinD(93.3 + 483202.02 * T) +
    0.28 * sinD(228.2 + 960400.89 * T) -
    0.28 * sinD(318.3 + 6003.15 * T) -
    0.17 * sinD(217.6 - 407332.21 * T);
  const parallax =
    0.9508 +
    0.0518 * cosD(135.0 + 477198.87 * T) +
    0.0095 * cosD(259.3 - 413335.36 * T) +
    0.0078 * cosD(235.7 + 890534.22 * T) +
    0.0028 * cosD(269.9 + 954397.74 * T);
  const eps = 23.4393 - 0.013 * T;
  const l = cosD(beta) * cosD(lambda);
  const m = cosD(eps) * cosD(beta) * sinD(lambda) - sinD(eps) * sinD(beta);
  const n = sinD(eps) * cosD(beta) * sinD(lambda) + cosD(eps) * sinD(beta);
  const ra = Math.atan2(m, l) / rad;
  const dec = Math.asin(n) / rad;
  return { ra, dec, parallax };
}

/** Yerel ufka gore yukseklik ve azimut (derece; azimut kuzeyden saat yonunde). */
export function moonHorizontal(date: Date, lat: number, lon: number) {
  const { ra, dec, parallax } = moonEquatorial(date);
  const d = julian(date) - 2451545;
  const lst = 280.46061837 + 360.98564736629 * d + lon;
  const H = lst - ra;
  const sinAlt = sinD(lat) * sinD(dec) + cosD(lat) * cosD(dec) * cosD(H);
  const altitude = Math.asin(sinAlt) / rad;
  const azimuth = (Math.atan2(sinD(H), cosD(H) * sinD(lat) - (Math.tan(dec * rad) * cosD(lat))) / rad + 180 + 360) % 360;
  return { altitude, azimuth, parallax };
}

// Dogus/batis esigi: Ay merkezinin yer merkezli yuksekligi h0 = 0,7275·π − 0,5667°
// (paralaks, kirilma ve Ay yaricapi dahil; Meeus, Astronomical Algorithms bolum 15).
function riseOffset(date: Date, lat: number, lon: number) {
  const { altitude, parallax } = moonHorizontal(date, lat, lon);
  return altitude - (0.7275 * parallax - 0.5667);
}

export type MoonDayEvents = {
  rise: Date | null;
  set: Date | null;
  transit: Date | null;
  transitAltitude: number | null;
  /** Gun boyunca hic dogup batmiyorsa: hep ufkun ustunde / altinda. */
  always: "up" | "down" | null;
};

/** [start, start + 24 saat) araligindaki ay dogusu, batisi ve en yuksek noktasi. */
export function moonEventsForDay(start: Date, lat: number, lon: number): MoonDayEvents {
  const step = 10 * 60000;
  const t0 = start.getTime();
  let rise: Date | null = null;
  let set: Date | null = null;
  let transit: Date | null = null;
  let transitAltitude = -Infinity;
  let prevT = t0;
  let prev = riseOffset(start, lat, lon);
  const startUp = prev > 0;
  for (let t = t0 + step; t <= t0 + DAY; t += step) {
    const cur = riseOffset(new Date(t), lat, lon);
    if ((prev <= 0 && cur > 0 && !rise) || (prev > 0 && cur <= 0 && !set)) {
      let lo = prevT;
      let hi = t;
      for (let i = 0; i < 20; i += 1) {
        const mid = (lo + hi) / 2;
        const v = riseOffset(new Date(mid), lat, lon);
        if (v > 0 === prev > 0) lo = mid;
        else hi = mid;
      }
      const at = new Date(Math.round((lo + hi) / 2));
      if (prev <= 0) rise = at;
      else set = at;
    }
    const alt = moonHorizontal(new Date(t), lat, lon).altitude;
    if (alt > transitAltitude) {
      transitAltitude = alt;
      transit = new Date(t);
    }
    prevT = t;
    prev = cur;
  }
  // En yuksek noktayi dakikaya incelt.
  if (transit) {
    for (let t = transit.getTime() - step; t <= transit.getTime() + step; t += 60000) {
      const alt = moonHorizontal(new Date(t), lat, lon).altitude;
      if (alt >= transitAltitude) {
        transitAltitude = alt;
        transit = new Date(t);
      }
    }
  }
  const always = !rise && !set ? (startUp ? "up" : "down") : null;
  const above = transitAltitude > 0;
  return { rise, set, transit: above ? transit : null, transitAltitude: above ? transitAltitude : null, always };
}

/** Pusula yonu (8 yon). */
export function compassPoint(azimuth: number, lang: "tr" | "en") {
  const tr = ["kuzey", "kuzeydoğu", "doğu", "güneydoğu", "güney", "güneybatı", "batı", "kuzeybatı"];
  const en = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];
  const i = Math.round(azimuth / 45) % 8;
  return (lang === "tr" ? tr : en)[i];
}
