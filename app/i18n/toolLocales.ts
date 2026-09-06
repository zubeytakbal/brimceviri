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
