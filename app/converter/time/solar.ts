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
