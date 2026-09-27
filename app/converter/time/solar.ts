// Gun dogumu / gun batimi (NOAA sadelestirilmis algoritmasi). Atmosferik kirilma
// ve gunes diski icin zenit 90.833°. Dogruluk tipik olarak ±1-2 dakika.

const rad = Math.PI / 180;

export type SunTimes =
  | { kind: "normal"; sunrise: Date; sunset: Date; solarNoon: Date; dayLengthMinutes: number }
  | { kind: "polar-day" | "polar-night"; solarNoon: Date };

/** year/month/day: yerel takvim gunu; lat/lon derece (dogu +). */
export function sunTimes(year: number, month: number, day: number, lat: number, lon: number): SunTimes {
  const dayOfYear = Math.round((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 0)) / 86400000);
  const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1);
  const eqTime =
    229.18 *
    (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma) - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));
  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);
  const base = Date.UTC(year, month - 1, day);
  const noonMinutes = 720 - 4 * lon - eqTime;
  const solarNoon = new Date(base + noonMinutes * 60000);
  const cosH = Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(decl)) - Math.tan(lat * rad) * Math.tan(decl);
  if (cosH > 1) return { kind: "polar-night", solarNoon };
  if (cosH < -1) return { kind: "polar-day", solarNoon };
  const hourAngle = Math.acos(cosH) / rad;
  const sunrise = new Date(base + (noonMinutes - 4 * hourAngle) * 60000);
  const sunset = new Date(base + (noonMinutes + 4 * hourAngle) * 60000);
  return { kind: "normal", sunrise, sunset, solarNoon, dayLengthMinutes: Math.round(8 * hourAngle) };
}

/** Gunesin ufka gore yuksekligi `elevation` derece oldugu sabah ve aksam anlari. */
export function sunAtElevation(year: number, month: number, day: number, lat: number, lon: number, elevation: number) {
  const dayOfYear = Math.round((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 0)) / 86400000);
  const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1);
  const eqTime =
    229.18 *
    (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma) - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));
  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);
  const zenith = 90 - elevation;
  const cosH = Math.cos(zenith * rad) / (Math.cos(lat * rad) * Math.cos(decl)) - Math.tan(lat * rad) * Math.tan(decl);
  if (cosH > 1 || cosH < -1) return null;
  const hourAngle = Math.acos(cosH) / rad;
  const base = Date.UTC(year, month - 1, day);
  const noonMinutes = 720 - 4 * lon - eqTime;
  return { morning: new Date(base + (noonMinutes - 4 * hourAngle) * 60000), evening: new Date(base + (noonMinutes + 4 * hourAngle) * 60000) };
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
