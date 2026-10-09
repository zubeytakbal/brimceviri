import type { Locale } from "./config";

export function getIntlLocale(locale: Locale) {
  if (locale === "ar") {
    return "ar";
  }

  if (locale === "de") {
    return "de-DE";
  }

  if (locale === "en") {
    return "en-US";
  }

  if (locale === "uz") {
    return "uz-UZ";
  }

  if (locale === "bn") {
    return "bn-BD";
  }

  if (locale === "fr") {
    return "fr-FR";
  }

  if (locale === "es") {
    return "es-ES";
  }

  if (locale === "pt") {
    return "pt-BR";
  }

  if (locale === "it") {
    return "it-IT";
  }

  if (locale === "nl") {
    return "nl-NL";
  }

  if (locale === "ru") {
    return "ru-RU";
  }

  if (locale === "sv") {
    return "sv-SE";
  }

  if (locale === "no") {
    return "nb-NO";
  }

  if (locale === "da") {
    return "da-DK";
  }

  return "tr-TR";
}

export function formatLocalizedNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
) {
  // Some browsers (e.g. Chromium builds without full ICU data) have no Uzbek number
  // format and fall back to en-US, which breaks hydration of server-rendered output.
  // Uzbek uses a non-breaking space for grouping and a decimal comma, so format with
  // en-US everywhere and swap the separators for identical server and client text.
  if (locale === "uz") {
    return value
      .toLocaleString("en-US", options)
      .replace(/[,.]/g, (c) => (c === "," ? "\u00a0" : ","));
  }
  return value.toLocaleString(getIntlLocale(locale), options);
}

const UZ_MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
const UZ_WEEKDAYS = ["yakshanba", "dushanba", "seshanba", "chorshanba", "payshanba", "juma", "shanba"];

export function formatLocalizedDate(
  isoDate: string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
) {
  const date = new Date(`${isoDate}T00:00:00`);

  // Same reason as formatLocalizedNumber: build Uzbek dates by hand ("15-mart, 2026",
  // as Node's ICU writes them) so server and browser output match.
  if (locale === "uz" && options.month === "long" && options.day && options.year) {
    const day = `${date.getDate()}-${UZ_MONTHS[date.getMonth()]}, ${date.getFullYear()}`;
    return options.weekday ? `${UZ_WEEKDAYS[date.getDay()]}, ${day}` : day;
  }

  return date.toLocaleDateString(getIntlLocale(locale), options);
}
