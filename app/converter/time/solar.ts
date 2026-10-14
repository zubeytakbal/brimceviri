// Gun dogumu / gun batimi ve gunesin konumu: NOAA Solar Calculator formulleri (Meeus,
// "Astronomical Algorithms" temelli). Olay anlari, gunesin o andaki konumuyla yinelemeli
// cozulur. Atmosferik kirilma ve gunes diski icin zenit 90.833°. PyEphem ile 81 il ve tum
// yil icin karsilastirildi (tests/solar.test.ts); fark 1 dakikanin altinda.
// Gundonumu ve ekinokslar: Meeus bolum 27 (Tablo 27.B ve 27.C), dogruluk ~1 dakika.

const rad = Math.PI / 180;
const deg = 180 / Math.PI;
const DAY_MS = 86400000;

export type SunTimes =
  | { kind: "normal"; sunrise: Date; sunset: Date; solarNoon: Date; dayLengthMinutes: number }
  | { kind: "polar-day" | "polar-night"; solarNoon: Date };

/** Verilen andaki (UTC ms) gunes deklinasyonu (radyan) ve zaman denklemi (dakika). */
function solarParams(ms: number) {
  const T = (ms / DAY_MS + 2440587.5 - 2451545) / 36525;
  const L0 = (((280.46646 + T * (36000.76983 + 0.0003032 * T)) % 360) + 360) % 360;
  const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
  const C =
    Math.sin(M * rad) * (1.914602 - T * (0.004817 + 0.000014 * T)) + Math.sin(2 * M * rad) * (0.019993 - 0.000101 * T) + Math.sin(3 * M * rad) * 0.000289;
  const omega = 125.04 - 1934.136 * T;
  const lambda = L0 + C - 0.00569 - 0.00478 * Math.sin(omega * rad);
  const eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
  const eps = eps0 + 0.00256 * Math.cos(omega * rad);
  const decl = Math.asin(Math.sin(eps * rad) * Math.sin(lambda * rad));
  const y = Math.tan((eps / 2) * rad) ** 2;
  const eqTime =
    4 *
    deg *
    (y * Math.sin(2 * L0 * rad) -
      2 * e * Math.sin(M * rad) +
      4 * e * y * Math.sin(M * rad) * Math.cos(2 * L0 * rad) -
      0.5 * y * y * Math.sin(4 * L0 * rad) -
      1.25 * e * e * Math.sin(2 * M * rad));
  return { decl, eqTime };
}

const dayBase = (year: number, month: number, day: number) => Date.UTC(year, month - 1, day);

function solarNoonMs(base: number, lon: number) {
  let t = base + (720 - 4 * lon) * 60000;
  for (let i = 0; i < 2; i++) t = base + (720 - 4 * lon - solarParams(t).eqTime) * 60000;
  return t;
}

/** Gunes merkezinin `zenith` derecelik zenit acisinda oldugu sabah/aksam ani; o gun yasanmiyorsa null. */
function eventMs(base: number, lat: number, lon: number, zenith: number, morning: boolean): number | null {
  let t = solarNoonMs(base, lon);
  for (let i = 0; i < 3; i++) {
    const { decl, eqTime } = solarParams(t);
    const cosH = Math.cos(zenith * rad) / (Math.cos(lat * rad) * Math.cos(decl)) - Math.tan(lat * rad) * Math.tan(decl);
    if (cosH > 1 || cosH < -1) return null;
    const H = Math.acos(cosH) * deg;
    t = base + (720 - 4 * lon - eqTime + (morning ? -4 : 4) * H) * 60000;
  }
  return t;
}

/** year/month/day: yerel takvim gunu; lat/lon derece (dogu +). */
export function sunTimes(year: number, month: number, day: number, lat: number, lon: number): SunTimes {
  const base = dayBase(year, month, day);
  const noon = solarNoonMs(base, lon);
  const solarNoon = new Date(noon);
  const rise = eventMs(base, lat, lon, 90.833, true);
  const set = eventMs(base, lat, lon, 90.833, false);
  if (rise === null || set === null) {
    // Ogle aninda gunes ufkun ustundeyse kutup gunduzu, altindaysa kutup gecesi.
    const { decl } = solarParams(noon);
    const noonElevation = 90 - Math.abs(lat - decl * deg);
    return { kind: noonElevation > -0.833 ? "polar-day" : "polar-night", solarNoon };
  }
  return { kind: "normal", sunrise: new Date(rise), sunset: new Date(set), solarNoon, dayLengthMinutes: Math.round((set - rise) / 60000) };
}

/** Gunesin ufka gore yuksekligi `elevation` derece oldugu sabah ve aksam anlari. */
export function sunAtElevation(year: number, month: number, day: number, lat: number, lon: number, elevation: number) {
  const base = dayBase(year, month, day);
  const morning = eventMs(base, lat, lon, 90 - elevation, true);
  const evening = eventMs(base, lat, lon, 90 - elevation, false);
  if (morning === null || evening === null) return null;
  return { morning: new Date(morning), evening: new Date(evening) };
}

export type LightWindows = {
  morningBlue: [Date, Date] | null;
  morningGolden: [Date, Date] | null;
  eveningGolden: [Date, Date] | null;
  eveningBlue: [Date, Date] | null;
};

/**
 * Fotografcilarin kullandigi tanim: mavi saat gunes -6° ile -4° arasi, altin saat
 * -4° ile +6° arasi. Kutup bolgelerinde ilgili aci yasanmiyorsa null.
 */
export function lightWindows(year: number, month: number, day: number, lat: number, lon: number): LightWindows {
  const minus6 = sunAtElevation(year, month, day, lat, lon, -6);
  const minus4 = sunAtElevation(year, month, day, lat, lon, -4);
  const plus6 = sunAtElevation(year, month, day, lat, lon, 6);
  return {
    morningBlue: minus6 && minus4 ? [minus6.morning, minus4.morning] : null,
    morningGolden: minus4 && plus6 ? [minus4.morning, plus6.morning] : null,
    eveningGolden: minus4 && plus6 ? [plus6.evening, minus4.evening] : null,
    eveningBlue: minus6 && minus4 ? [minus4.evening, minus6.evening] : null,
  };
}

export type Twilight = { civil: [Date, Date] | null; nautical: [Date, Date] | null; astronomical: [Date, Date] | null };

/** Sivil (−6°), denizcilik (−12°) ve astronomik (−18°) alacakaranligin sabah baslangici ve aksam bitisi. */
export function twilight(year: number, month: number, day: number, lat: number, lon: number): Twilight {
  const at = (e: number) => {
    const r = sunAtElevation(year, month, day, lat, lon, e);
    return r ? ([r.morning, r.evening] as [Date, Date]) : null;
  };
  return { civil: at(-6), nautical: at(-12), astronomical: at(-18) };
}

/** Zaman denklemi (dakika): gercek gunes zamani − ortalama gunes zamani. */
export function equationOfTimeMinutes(year: number, month: number, day: number) {
  return solarParams(dayBase(year, month, day) + DAY_MS / 2).eqTime;
}

/** Atmosferik kirilma duzeltmesi (derece), NOAA yaklasimi. */
function refraction(elevation: number) {
  if (elevation > 85) return 0;
  const te = Math.tan(elevation * rad);
  let arcsec: number;
  if (elevation > 5) arcsec = 58.1 / te - 0.07 / te ** 3 + 0.000086 / te ** 5;
  else if (elevation > -0.575) arcsec = 1735 + elevation * (-518.2 + elevation * (103.4 + elevation * (-12.79 + elevation * 0.711)));
  else arcsec = -20.772 / te;
  return arcsec / 3600;
}

export type SunPosition = { elevation: number; azimuth: number; declination: number };

/**
 * Verilen anda gunesin ufuktan yuksekligi (kirilma dahil, derece) ve azimutu
 * (kuzeyden saat yonunde, derece).
 */
export function sunPosition(date: Date, lat: number, lon: number): SunPosition {
  const ms = date.getTime();
  const { decl, eqTime } = solarParams(ms);
  const utcMinutes = (((ms % DAY_MS) + DAY_MS) % DAY_MS) / 60000;
  const tst = (((utcMinutes + eqTime + 4 * lon) % 1440) + 1440) % 1440;
  const ha = tst / 4 - 180;
  const cosZ = Math.sin(lat * rad) * Math.sin(decl) + Math.cos(lat * rad) * Math.cos(decl) * Math.cos(ha * rad);
  const zenith = Math.acos(Math.min(1, Math.max(-1, cosZ))) * deg;
  const geometric = 90 - zenith;
  const sinZ = Math.sin(zenith * rad);
  let azimuth: number;
  if (sinZ < 1e-9) azimuth = lat > decl * deg ? 180 : 0;
  else {
    const cosAz = Math.min(1, Math.max(-1, (Math.sin(lat * rad) * Math.cos(zenith * rad) - Math.sin(decl)) / (Math.cos(lat * rad) * sinZ)));
    const a = Math.acos(cosAz) * deg;
    azimuth = ha > 0 ? (a + 180) % 360 : (540 - a) % 360;
  }
  return { elevation: geometric + refraction(geometric), azimuth, declination: decl * deg };
}

/* ---------------- Gundonumu ve ekinokslar (Meeus bolum 27) ---------------- */

const PERIODIC: Array<[number, number, number]> = [
  [485, 324.96, 1934.136], [203, 337.23, 32964.467], [199, 342.08, 20.186], [182, 27.85, 445267.112],
  [156, 73.14, 45036.886], [136, 171.52, 22518.443], [77, 222.54, 65928.934], [74, 296.72, 3034.906],
  [70, 243.58, 9037.513], [58, 119.81, 33718.147], [52, 297.17, 150.678], [50, 21.02, 2281.226],
  [45, 247.54, 29929.562], [44, 325.15, 31555.956], [29, 60.93, 4443.417], [18, 155.12, 67555.328],
  [17, 288.79, 4562.452], [16, 198.04, 62894.029], [14, 199.76, 31436.921], [12, 95.39, 14577.848],
  [12, 287.11, 31931.756], [12, 320.81, 34777.259], [9, 227.73, 1222.114], [8, 15.45, 16859.074],
];

// Tablo 27.B (2000–3000 yillari icin ortalama ekinoks/gundonumu, JDE)
const MEAN: Record<"march" | "june" | "september" | "december", number[]> = {
  march: [2451623.80984, 365242.37404, 0.05169, -0.00411, -0.00057],
  june: [2451716.56767, 365241.62603, 0.00325, 0.00888, -0.0003],
  september: [2451810.21715, 365242.01767, -0.11575, 0.00337, 0.00078],
  december: [2451900.05952, 365242.74049, -0.06223, -0.00823, 0.00032],
};

/** TT ile UT arasindaki fark (saniye); 2020'lerde ~69 s. Dakika hassasiyetinde sabit almak yeterli. */
const DELTA_T_SECONDS = 69;

export type Season = "march" | "june" | "september" | "december";

/** Verilen yilin mart ekinoksu, haziran gundonumu, eylul ekinoksu ve aralik gundonumu (UTC). */
export function seasonMoment(year: number, season: Season): Date {
  const Y = (year - 2000) / 1000;
  const [a, b, c, d, e] = MEAN[season];
  const jde0 = a + b * Y + c * Y ** 2 + d * Y ** 3 + e * Y ** 4;
  const T = (jde0 - 2451545) / 36525;
  const W = 35999.373 * T - 2.47;
  const dl = 1 + 0.0334 * Math.cos(W * rad) + 0.0007 * Math.cos(2 * W * rad);
  const S = PERIODIC.reduce((sum, [A, B, C]) => sum + A * Math.cos((B + C * T) * rad), 0);
  const jde = jde0 + (0.00001 * S) / dl;
  return new Date((jde - 2440587.5) * DAY_MS - DELTA_T_SECONDS * 1000);
}

export function seasons(year: number) {
  return {
    march: seasonMoment(year, "march"),
    june: seasonMoment(year, "june"),
    september: seasonMoment(year, "september"),
    december: seasonMoment(year, "december"),
  };
}
