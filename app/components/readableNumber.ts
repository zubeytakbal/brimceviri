import { formatNumber } from "../converter/fx/fxMath";

export type SiteNumberLocale =
  | "tr"
  | "en"
  | "de"
  | "ar"
  | "uz"
  | "bn"
  | "fr"
  | "es"
 
  | "pt"
  | "it"
  | "nl"
  | "ru"
  | "sv"
  | "no"
  | "da";

const intlLocales: Record<SiteNumberLocale, string> = {
  tr: "tr-TR",
  en: "en-US",
  de: "de-DE",
  ar: "ar",
  uz: "uz-UZ",
  bn: "bn-BD",
  fr: "fr-FR",
  es: "es-ES",
  pt: "pt-BR",
  it: "it-IT",
  nl: "nl-NL",
  ru: "ru-RU",
  sv: "sv-SE",
  no: "nb-NO",
  da: "da-DK",
};

export function intlLocaleFor(locale: SiteNumberLocale) {
  return intlLocales[locale] ?? "en-US";
}

// "Tum birimler" paneli icin okunur sayi: bilimsel gosterim yalnizca
// gercekten asiri buyuk/kucuk degerlerde; aksi halde 7 anlamli basamak.
export function formatReadableNumber(
  value: number,
  locale: SiteNumberLocale
) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  const intlLocale = intlLocaleFor(locale);
  const absoluteValue = Math.abs(value);

  if (absoluteValue === 0) {
    return formatNumber(0, intlLocale);
  }

  if (absoluteValue >= 1e15 || absoluteValue < 1e-9) {
    return formatNumber(value, intlLocale, {
      maximumSignificantDigits: 6,
      notation: "scientific",
    });
  }

  return formatNumber(value, intlLocale, {
    maximumSignificantDigits: 7,
  });
}
