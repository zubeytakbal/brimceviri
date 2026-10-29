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

  if (locale === "hi") {
    return "hi-IN";
  }

  if (locale === "fr") {
    return "fr-FR";
  }

  if (locale === "es") {
    return "es-ES";
  }

  if (locale === "es-419") {
    return "es-419";
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
  return value.toLocaleString(getIntlLocale(locale), options);
}

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

  return date.toLocaleDateString(getIntlLocale(locale), options);
}
