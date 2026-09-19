// حساب أوقات الصلاة واتجاه القبلة اعتمادًا على معادلات وضع الشمس الفلكية
// القياسية (زاوية ميل الشمس ومعادلة الزمن، حسب تقريب NOAA/Spencer) وموقع
// المستخدم (خط العرض وخط الطول والفارق الزمني عن UTC). هذه هي نفس الطريقة
// العامة التي تعتمدها تطبيقات مواقيت الصلاة المعروفة، وتُعتبر دقيقة بما
// يكفي (فرق دقيقة أو أقل عادة) للاستخدام العملي اليومي.

import { calculateGreatCircle } from "./greatCircleCalculator";

export type CalculationMethodId =
  | "mwl"
  | "egyptian"
  | "ummAlQura"
  | "isna"
  | "karachi";

export type CalculationMethod = {
  id: CalculationMethodId;
  label: string;
  fajrAngle: number;
  ishaAngle: number | null;
  ishaMinutesAfterMaghrib: number | null;
};

export const calculationMethods: CalculationMethod[] = [
  {
    id: "mwl",
    label: "رابطة العالم الإسلامي",
    fajrAngle: 18,
    ishaAngle: 17,
    ishaMinutesAfterMaghrib: null,
  },
  {
    id: "egyptian",
    label: "الهيئة المصرية العامة للمساحة",
    fajrAngle: 19.5,
    ishaAngle: 17.5,
    ishaMinutesAfterMaghrib: null,
  },
  {
    id: "ummAlQura",
    label: "جامعة أم القرى (مكة المكرمة)",
    fajrAngle: 18.5,
    ishaAngle: null,
    ishaMinutesAfterMaghrib: 90,
  },
  {
    id: "isna",
    label: "الجمعية الإسلامية لأمريكا الشمالية (ISNA)",
    fajrAngle: 15,
    ishaAngle: 15,
    ishaMinutesAfterMaghrib: null,
  },
  {
    id: "karachi",
    label: "جامعة العلوم الإسلامية، كراتشي",
    fajrAngle: 18,
    ishaAngle: 18,
    ishaMinutesAfterMaghrib: null,
  },
];

export type AsrMethod = "standard" | "hanafi";

export type PrayerTimesInput = {
  year: number;
  month: number;
  day: number;
  latitude: number;
  longitude: number;
  utcOffsetHours: number;
  method: CalculationMethodId;
  asrMethod: AsrMethod;
};

export type PrayerTimesResult = {
  fajr: number;
  sunrise: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
};

const KAABA_LATITUDE = 21.4225;
const KAABA_LONGITUDE = 39.8262;

function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}

function toDegrees(rad: number) {
  return (rad * 180) / Math.PI;
}

function dayOfYear(year: number, month: number, day: number) {
  const start = Date.UTC(year, 0, 1);
  const current = Date.UTC(year, month - 1, day);
  return Math.round((current - start) / 86_400_000) + 1;
}

function sunPosition(year: number, month: number, day: number) {
  const n = dayOfYear(year, month, day);
  const daysInYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;
  const gamma = ((2 * Math.PI) / daysInYear) * (n - 1 + 12 / 24);

  const equationOfTimeMinutes =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  const declinationRad =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  return { equationOfTimeMinutes, declinationRad };
}

function hourAngleForAltitude(
  altitudeDeg: number,
  latitudeRad: number,
  declinationRad: number
): number | null {
  const altitudeRad = toRadians(altitudeDeg);
  const cosH =
    (Math.sin(altitudeRad) - Math.sin(latitudeRad) * Math.sin(declinationRad)) /
    (Math.cos(latitudeRad) * Math.cos(declinationRad));

  if (cosH < -1 || cosH > 1) {
    return null;
  }

  return toDegrees(Math.acos(cosH));
}

export function computePrayerTimes(
  input: PrayerTimesInput
): PrayerTimesResult | null {
  const { year, month, day, latitude, longitude, utcOffsetHours, method, asrMethod } = input;

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    Math.abs(latitude) > 90 ||
    Math.abs(longitude) > 180
  ) {
    return null;
  }

  const methodConfig = calculationMethods.find((item) => item.id === method);
  if (!methodConfig) {
    return null;
  }

  const { equationOfTimeMinutes, declinationRad } = sunPosition(year, month, day);
  const latitudeRad = toRadians(latitude);

  const solarNoonUtc = 12 - longitude / 15 - equationOfTimeMinutes / 60;
  const dhuhrLocal = solarNoonUtc + utcOffsetHours;

  const sunriseSunsetAngle = -0.833;
  const hSunriseSunset = hourAngleForAltitude(sunriseSunsetAngle, latitudeRad, declinationRad);
  const hFajr = hourAngleForAltitude(-methodConfig.fajrAngle, latitudeRad, declinationRad);

  const shadowFactor = asrMethod === "hanafi" ? 2 : 1;
  const asrAltitudeRad = Math.atan(
    1 / (shadowFactor + Math.tan(Math.abs(latitudeRad - declinationRad)))
  );
  const hAsr = hourAngleForAltitude(toDegrees(asrAltitudeRad), latitudeRad, declinationRad);

  if (hSunriseSunset === null || hFajr === null || hAsr === null) {
    return null;
  }

  const sunrise = dhuhrLocal - hSunriseSunset / 15;
  const maghrib = dhuhrLocal + hSunriseSunset / 15;
  const fajr = dhuhrLocal - hFajr / 15;
  const asr = dhuhrLocal + hAsr / 15;

  let isha: number;
  if (methodConfig.ishaMinutesAfterMaghrib !== null) {
    isha = maghrib + methodConfig.ishaMinutesAfterMaghrib / 60;
  } else {
    const hIsha = hourAngleForAltitude(
      -(methodConfig.ishaAngle ?? 17),
      latitudeRad,
      declinationRad
    );
    if (hIsha === null) {
      return null;
    }
    isha = dhuhrLocal + hIsha / 15;
  }

  return {
    fajr,
    sunrise,
    dhuhr: dhuhrLocal,
    asr,
    maghrib,
    isha,
  };
}

export function formatHourDecimal(hourDecimal: number) {
  const normalized = ((hourDecimal % 24) + 24) % 24;
  const hours = Math.floor(normalized);
  const minutes = Math.round((normalized - hours) * 60);

  const carriedHours = minutes === 60 ? (hours + 1) % 24 : hours;
  const carriedMinutes = minutes === 60 ? 0 : minutes;

  return `${String(carriedHours).padStart(2, "0")}:${String(carriedMinutes).padStart(2, "0")}`;
}

export type QiblaResult = {
  bearingDeg: number;
  distanceKm: number;
};

export function computeQibla(latitude: number, longitude: number): QiblaResult | null {
  const result = calculateGreatCircle({
    lat1Deg: latitude,
    lon1Deg: longitude,
    lat2Deg: KAABA_LATITUDE,
    lon2Deg: KAABA_LONGITUDE,
  });

  if (!result) {
    return null;
  }

  return {
    bearingDeg: result.initialBearingDeg,
    distanceKm: result.distanceKm,
  };
}

export function bearingToArabicDirection(bearingDeg: number) {
  const directions = [
    "الشمال",
    "الشمال الشرقي",
    "الشرق",
    "الجنوب الشرقي",
    "الجنوب",
    "الجنوب الغربي",
    "الغرب",
    "الشمال الغربي",
  ];
  const index = Math.round(bearingDeg / 45) % 8;
  return directions[index];
}

export type PresetCity = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  utcOffsetHours: number;
};

export const prayerTimesPresetCities: PresetCity[] = [
  { id: "mecca", name: "مكة المكرمة", latitude: 21.4225, longitude: 39.8262, utcOffsetHours: 3 },
  { id: "medina", name: "المدينة المنورة", latitude: 24.5247, longitude: 39.5692, utcOffsetHours: 3 },
  { id: "riyadh", name: "الرياض", latitude: 24.7136, longitude: 46.6753, utcOffsetHours: 3 },
  { id: "jeddah", name: "جدة", latitude: 21.4858, longitude: 39.1925, utcOffsetHours: 3 },
  { id: "cairo", name: "القاهرة", latitude: 30.0444, longitude: 31.2357, utcOffsetHours: 2 },
  { id: "alexandria", name: "الإسكندرية", latitude: 31.2001, longitude: 29.9187, utcOffsetHours: 2 },
  { id: "dubai", name: "دبي", latitude: 25.2048, longitude: 55.2708, utcOffsetHours: 4 },
  { id: "abudhabi", name: "أبوظبي", latitude: 24.4539, longitude: 54.3773, utcOffsetHours: 4 },
  { id: "doha", name: "الدوحة", latitude: 25.2854, longitude: 51.531, utcOffsetHours: 3 },
  { id: "kuwait", name: "الكويت", latitude: 29.3759, longitude: 47.9774, utcOffsetHours: 3 },
  { id: "manama", name: "المنامة", latitude: 26.2285, longitude: 50.586, utcOffsetHours: 3 },
  { id: "muscat", name: "مسقط", latitude: 23.588, longitude: 58.3829, utcOffsetHours: 4 },
  { id: "amman", name: "عمّان", latitude: 31.9454, longitude: 35.9284, utcOffsetHours: 3 },
  { id: "baghdad", name: "بغداد", latitude: 33.3152, longitude: 44.3661, utcOffsetHours: 3 },
  { id: "damascus", name: "دمشق", latitude: 33.5138, longitude: 36.2765, utcOffsetHours: 3 },
  { id: "beirut", name: "بيروت", latitude: 33.8938, longitude: 35.5018, utcOffsetHours: 2 },
  { id: "jerusalem", name: "القدس", latitude: 31.7683, longitude: 35.2137, utcOffsetHours: 2 },
  { id: "gaza", name: "غزة", latitude: 31.5017, longitude: 34.4668, utcOffsetHours: 2 },
  { id: "sanaa", name: "صنعاء", latitude: 15.3694, longitude: 44.191, utcOffsetHours: 3 },
  { id: "khartoum", name: "الخرطوم", latitude: 15.5007, longitude: 32.5599, utcOffsetHours: 2 },
  { id: "rabat", name: "الرباط", latitude: 34.0209, longitude: -6.8416, utcOffsetHours: 1 },
  { id: "casablanca", name: "الدار البيضاء", latitude: 33.5731, longitude: -7.5898, utcOffsetHours: 1 },
  { id: "algiers", name: "الجزائر العاصمة", latitude: 36.7538, longitude: 3.0588, utcOffsetHours: 1 },
  { id: "tunis", name: "تونس", latitude: 36.8065, longitude: 10.1815, utcOffsetHours: 1 },
  { id: "tripoli", name: "طرابلس", latitude: 32.8872, longitude: 13.1913, utcOffsetHours: 2 },
];
