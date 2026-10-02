import { lightWindows, sunTimes } from "./solar";
import {
  differenceMinutes,
  formatInZone,
  formatUtcOffset,
  isDst,
  localDateParts,
  nextTransition,
  observesDst,
  offsetMinutes,
  timeZoneLongName,
} from "./timezones";
import { cityNameDe, cityPathDe, citySlugDe } from "./germanWorld";
import { cityNameNordic, cityPathNordic, citySlugNordic } from "./nordicWorld";
import { referenceCitySlugs, worldCities, type WorldCity } from "./worldCities";

// Sehir sayfalari icin sunucuda hesaplanan gercek veriler (ISR ile tazelenir).

export type Lang = "tr" | "en" | "de" | "sv" | "no" | "da";
const LOCALE: Record<Lang, string> = { tr: "tr-TR", en: "en-US", de: "de-DE", sv: "sv-SE", no: "nb-NO", da: "da-DK" };

const isNordic = (lang: Lang): lang is "sv" | "no" | "da" => lang === "sv" || lang === "no" || lang === "da";

export function cityName(city: WorldCity, lang: Lang) {
  if (isNordic(lang)) return cityNameNordic(lang, city);
  return lang === "tr" ? city.nameTr : lang === "de" ? cityNameDe(city) : city.nameEn;
}

export function citySlug(city: WorldCity, lang: Lang) {
  if (isNordic(lang)) return citySlugNordic(lang, city);
  return lang === "tr" ? city.tr : lang === "de" ? citySlugDe(city) : city.en;
}

export function cityPath(city: WorldCity, lang: Lang) {
  if (isNordic(lang)) return cityPathNordic(lang, city);
  return lang === "tr" ? `/dunya-saatleri/${city.tr}` : lang === "de" ? cityPathDe(city) : `/en/world-clock/${city.en}`;
}

// Fark ifadesi: [saat tekil, saat çoğul, dakika, ileride, geride, aynı saat]
const DIFF_WORDS: Record<"sv" | "no" | "da", [string, string, string, string, string, string]> = {
  sv: ["timme", "timmar", "minuter", "före", "efter", "samma tid"],
  no: ["time", "timer", "minutter", "foran", "bak", "samme tid"],
  da: ["time", "timer", "minutter", "foran", "bagud", "samme tid"],
};

/** "7 saat geride", "3 saat 30 dakika ileride", "aynı saat" */
export function describeDifference(minutes: number, lang: Lang) {
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (isNordic(lang)) {
    const [one, many, min, ahead, behind, same] = DIFF_WORDS[lang];
    if (minutes === 0) return same;
    const amount = [h ? `${h} ${h === 1 ? one : many}` : "", m ? `${m} ${min}` : ""].filter(Boolean).join(" ");
    return `${amount} ${minutes > 0 ? ahead : behind}`;
  }
  if (minutes === 0) return lang === "tr" ? "aynı saat" : lang === "de" ? "gleiche Uhrzeit" : "the same time";
  if (lang === "de") {
    const amount = [h ? `${h} Stunde${h === 1 ? "" : "n"}` : "", m ? `${m} Minuten` : ""].filter(Boolean).join(" ");
    return `${amount} ${minutes > 0 ? "voraus" : "zurück"}`;
  }
  if (lang === "tr") {
    const amount = [h ? `${h} saat` : "", m ? `${m} dakika` : ""].filter(Boolean).join(" ");
    return `${amount} ${minutes > 0 ? "ileride" : "geride"}`;
  }
  const amount = [h ? `${h} hour${h === 1 ? "" : "s"}` : "", m ? `${m} minutes` : ""].filter(Boolean).join(" ");
  return `${amount} ${minutes > 0 ? "ahead" : "behind"}`;
}

export function formatTime(date: Date, timeZone: string, lang: Lang) {
  return formatInZone(date, timeZone, LOCALE[lang], { hour: "2-digit", minute: "2-digit", hour12: lang === "en" });
}

export function formatDate(date: Date, timeZone: string, lang: Lang, withWeekday = true) {
  return formatInZone(date, timeZone, LOCALE[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withWeekday ? { weekday: "long" as const } : {}),
  });
}

function formatDayLength(minutes: number, lang: Lang) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return DAY_LENGTH[lang](h, m);
}

const DAY_LENGTH: Record<Lang, (h: number, m: number) => string> = {
  tr: (h, m) => `${h} sa ${m} dk`,
  en: (h, m) => `${h} h ${m} min`,
  de: (h, m) => `${h} Std. ${m} Min.`,
  sv: (h, m) => `${h} tim ${m} min`,
  no: (h, m) => `${h} t ${m} min`,
  da: (h, m) => `${h} t. ${m} min.`,
};

/** [gün batmaz, gün doğmaz] */
const POLAR: Record<Lang, [string, string]> = {
  tr: ["Gün batmaz", "Gün doğmaz"],
  en: ["Sun never sets", "Sun never rises"],
  de: ["Mitternachtssonne", "Polarnacht"],
  sv: ["Midnattssol", "Polarnatt"],
  no: ["Midnattssol", "Mørketid"],
  da: ["Midnatssol", "Polarnat"],
};

/** [ertesi gün, önceki gün] */
const DAY_NOTE: Record<Lang, [string, string]> = {
  tr: ["ertesi gün", "önceki gün"],
  en: ["next day", "previous day"],
  de: ["Folgetag", "Vortag"],
  sv: ["nästa dag", "föregående dag"],
  no: ["neste dag", "forrige dag"],
  da: ["næste dag", "foregående dag"],
};

export type SunRow = { date: string; sunrise: string; sunset: string; dayLength: string };

export function cityFacts(city: WorldCity, now: Date, lang: Lang) {
  const offset = offsetMinutes(city.timeZone, now);
  const year = Number(formatInZone(now, city.timeZone, "en-US", { year: "numeric" }));
  const dst = observesDst(city.timeZone, year);
  const transition = dst ? nextTransition(city.timeZone, now) : null;

  const sunRows: SunRow[] = [];
  for (let i = 0; i < 7; i += 1) {
    const day = new Date(now.getTime() + i * 86400000);
    const parts = localDateParts(city.timeZone, day);
    const sun = sunTimes(parts.year, parts.month, parts.day, city.lat, city.lon);
    const label = formatInZone(day, city.timeZone, LOCALE[lang], { day: "numeric", month: "long", weekday: "short" });
    if (sun.kind === "normal") {
      sunRows.push({
        date: label,
        sunrise: formatTime(sun.sunrise, city.timeZone, lang),
        sunset: formatTime(sun.sunset, city.timeZone, lang),
        dayLength: formatDayLength(sun.dayLengthMinutes, lang),
      });
    } else {
      const text =
        sun.kind === "polar-day"
          ? POLAR[lang][0]
          : POLAR[lang][1];
      sunRows.push({ date: label, sunrise: text, sunset: text, dayLength: sun.kind === "polar-day" ? "24 h" : "0" });
    }
  }

  const references = referenceCitySlugs
    .filter((slug) => slug !== city.en)
    .map((slug) => worldCities.find((c) => c.en === slug)!)
    .map((ref) => ({
      city: ref,
      utc: formatUtcOffset(offsetMinutes(ref.timeZone, now)),
      difference: describeDifference(differenceMinutes(city.timeZone, ref.timeZone, now), lang),
    }));

  const todayParts = localDateParts(city.timeZone, now);
  const windows = lightWindows(todayParts.year, todayParts.month, todayParts.day, city.lat, city.lon);
  const span = (pair: [Date, Date] | null) => (pair ? `${formatTime(pair[0], city.timeZone, lang)} – ${formatTime(pair[1], city.timeZone, lang)}` : "—");
  const light = {
    morningBlue: span(windows.morningBlue),
    morningGolden: span(windows.morningGolden),
    eveningGolden: span(windows.eveningGolden),
    eveningBlue: span(windows.eveningBlue),
  };

  return {
    light,
    offset,
    utcLabel: formatUtcOffset(offset),
    zoneName: timeZoneLongName(city.timeZone, LOCALE[lang], now),
    observesDst: dst,
    dstNow: dst && isDst(city.timeZone, now),
    transition: transition
      ? {
          date: formatDate(transition.at, city.timeZone, lang),
          // Degisim ani eski saate gore (orn. 02:00) ve yeni saate gore (orn. 01:00).
          time: formatTime(new Date(transition.at.getTime() + (transition.fromMinutes - transition.toMinutes) * 60000), city.timeZone, lang),
          newTime: formatTime(transition.at, city.timeZone, lang),
          forward: transition.toMinutes > transition.fromMinutes,
          newOffset: formatUtcOffset(transition.toMinutes),
        }
      : null,
    diffFromIstanbul: differenceMinutes("Europe/Istanbul", city.timeZone, now),
    today: formatDate(now, city.timeZone, lang),
    sunRows,
    references,
  };
}

/** Istanbul'daki her saat icin sehirdeki saat (mesai cakisma tablosu). */
export function hourMapping(fromZone: string, toZone: string, now: Date, lang: Lang) {
  const diff = differenceMinutes(fromZone, toZone, now);
  return Array.from({ length: 24 }, (_, hour) => {
    const total = hour * 60 + diff;
    const dayShift = Math.floor(total / 1440);
    const minutes = ((total % 1440) + 1440) % 1440;
    const text = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
    const targetHour = Math.floor(minutes / 60);
    return {
      from: `${String(hour).padStart(2, "0")}:00`,
      to: text,
      dayNote:
        dayShift === 0
          ? ""
          : dayShift > 0
            ? DAY_NOTE[lang][0]
            : DAY_NOTE[lang][1],
      overlap: hour >= 9 && hour < 18 && targetHour >= 9 && targetHour < 18,
    };
  });
}

export function nearbyCities(city: WorldCity, limit = 10) {
  return worldCities
    .filter((c) => c.en !== city.en && c.region === city.region)
    .sort((a, b) => Math.hypot(a.lat - city.lat, a.lon - city.lon) - Math.hypot(b.lat - city.lat, b.lon - city.lon))
    .slice(0, limit);
}
