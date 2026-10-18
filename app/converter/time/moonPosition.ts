// Ay'ın yer merkezli ekliptik boylamı ve Dünya'ya uzaklığı: Jean Meeus, Astronomical Algorithms (2. baskı), bölüm 47,
// Tablo 47.A'nın 60 terimi. Doğruluk boylamda yaklaşık 10″, uzaklıkta birkaç kilometredir (kitaptaki örnek 47.a testte).
// Burçlar tropikal zodyaktır: görünür ekliptik boylamın 30°'lik dilimleri (0° Koç noktası = ilkbahar ekinoksu).

const rad = Math.PI / 180;
const DAY = 86400000;
/** 2026 civarı ΔT = TD − UT ≈ 69 s. */
const DELTA_T = 69;

// [D, M, M', F, Σl (1e-6 derece), Σr (0,001 km)]
const TERMS: ReadonlyArray<readonly [number, number, number, number, number, number]> = [
  [0, 0, 1, 0, 6288774, -20905355], [2, 0, -1, 0, 1274027, -3699111], [2, 0, 0, 0, 658314, -2955968],
  [0, 0, 2, 0, 213618, -569925], [0, 1, 0, 0, -185116, 48888], [0, 0, 0, 2, -114332, -3149],
  [2, 0, -2, 0, 58793, 246158], [2, -1, -1, 0, 57066, -152138], [2, 0, 1, 0, 53322, -170733],
  [2, -1, 0, 0, 45758, -204586], [0, 1, -1, 0, -40923, -129620], [1, 0, 0, 0, -34720, 108743],
  [0, 1, 1, 0, -30383, 104755], [2, 0, 0, -2, 15327, 10321], [0, 0, 1, 2, -12528, 0],
  [0, 0, 1, -2, 10980, 79661], [4, 0, -1, 0, 10675, -34782], [0, 0, 3, 0, 10034, -23210],
  [4, 0, -2, 0, 8548, -21636], [2, 1, -1, 0, -7888, 24208], [2, 1, 0, 0, -6766, 30824],
  [1, 0, -1, 0, -5163, -8379], [1, 1, 0, 0, 4987, -16675], [2, -1, 1, 0, 4036, -12831],
  [2, 0, 2, 0, 3994, -10445], [4, 0, 0, 0, 3861, -11650], [2, 0, -3, 0, 3665, 14403],
  [0, 1, -2, 0, -2689, -7003], [2, 0, -1, 2, -2602, 0], [2, -1, -2, 0, 2390, 10056],
  [1, 0, 1, 0, -2348, 6322], [2, -2, 0, 0, 2236, -9884], [0, 1, 2, 0, -2120, 5751],
  [0, 2, 0, 0, -2069, 0], [2, -2, -1, 0, 2048, -4950], [2, 0, 1, -2, -1773, 4130],
  [2, 0, 0, 2, -1595, 0], [4, -1, -1, 0, 1215, -3958], [0, 0, 2, 2, -1110, 0],
  [3, 0, -1, 0, -892, 3258], [2, 1, 1, 0, -810, 2616], [4, -1, -2, 0, 759, -1897],
  [0, 2, -1, 0, -713, -2117], [2, 2, -1, 0, -700, 2354], [2, 1, -2, 0, 691, 0],
  [2, -1, 0, -2, 596, 0], [4, 0, 1, 0, 549, -1423], [0, 0, 4, 0, 537, -1117],
  [4, -1, 0, 0, 520, -1571], [1, 0, -2, 0, -487, -1739], [2, 1, 0, -2, -399, 0],
  [0, 0, 2, -2, -381, -4421], [1, 1, 1, 0, 351, 0], [3, 0, -2, 0, -340, 0],
  [4, 0, -3, 0, 330, 0], [2, -1, 2, 0, 327, 0], [0, 2, 1, 0, -323, 1165],
  [1, 1, -1, 0, 299, 0], [2, 0, 3, 0, 294, 0], [2, 0, -1, -2, 0, 8752],
];

const norm = (deg: number) => ((deg % 360) + 360) % 360;

/** Julian Efemeris Günü (TD) üzerinden geometrik boylam (derece), görünür boylam ve uzaklık (km). */
export function moonPositionJde(jde: number) {
  const T = (jde - 2451545) / 36525;
  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + (T * T * T) / 538841 - (T * T * T * T) / 65194000;
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + (T * T * T) / 545868 - (T * T * T * T) / 113065000;
  const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T + (T * T * T) / 24490000;
  const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + (T * T * T) / 69699 - (T * T * T * T) / 14712000;
  const F = 93.272095 + 483202.0175233 * T - 0.0036539 * T * T - (T * T * T) / 3526000 + (T * T * T * T) / 863310000;
  const A1 = 119.75 + 131.849 * T;
  const A2 = 53.09 + 479264.29 * T;
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  let sl = 0;
  let sr = 0;
  for (const [d, m, mp, f, l, r] of TERMS) {
    const arg = (d * D + m * M + mp * Mp + f * F) * rad;
    const e = m === 0 ? 1 : Math.abs(m) === 1 ? E : E * E;
    sl += l * e * Math.sin(arg);
    sr += r * e * Math.cos(arg);
  }
  sl += 3958 * Math.sin(A1 * rad) + 1962 * Math.sin((Lp - F) * rad) + 318 * Math.sin(A2 * rad);
  const longitude = norm(Lp + sl / 1e6);
  const omega = 125.04452 - 1934.136261 * T;
  const nutation = (-17.2 * Math.sin(omega * rad)) / 3600;
  return { longitude, apparentLongitude: norm(longitude + nutation), distance: 385000.56 + sr / 1000 };
}

const jdeOf = (date: Date) => date.getTime() / DAY + 2440587.5 + DELTA_T / 86400;

/** Belirli bir andaki görünür ekliptik boylam (derece) ve yer merkezli uzaklık (km). */
export function moonPosition(date: Date) {
  const p = moonPositionJde(jdeOf(date));
  return { longitude: p.apparentLongitude, distance: p.distance };
}

export const ZODIAC_TR = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"] as const;
export const ZODIAC_EN = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"] as const;

export const signIndex = (longitude: number) => Math.floor(norm(longitude) / 30) % 12;

/** Ay'ın bulunduğu burç ve bir sonraki burca geçiş anı (Ay bir burçta yaklaşık 2,5 gün kalır). */
export function moonSign(date: Date) {
  const start = moonPosition(date).longitude;
  const sign = signIndex(start);
  const boundary = ((sign + 1) * 30) % 360;
  const ahead = (t: number) => norm(moonPosition(new Date(t)).longitude - boundary + 180) - 180; // <0: sınırdan önce
  let lo = date.getTime();
  let hi = lo + 4 * DAY;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (ahead(mid) < 0) lo = mid;
    else hi = mid;
  }
  return { sign, longitude: start, next: (sign + 1) % 12, ingress: new Date(hi) };
}

/** Bir tarih aralığındaki burç geçişleri. */
export function signIngresses(from: Date, to: Date) {
  const out: Array<{ sign: number; at: Date }> = [];
  let t = from;
  while (t < to) {
    const s = moonSign(t);
    if (s.ingress >= to) break;
    out.push({ sign: s.next, at: s.ingress });
    t = new Date(s.ingress.getTime() + 60000);
  }
  return out;
}
