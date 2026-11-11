export const SUPPORTED_LOCALES = ["tr", "en", "de"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";

/** Sayfalari yayinda olan diller (dil menusu ve alt bilgi). */
export const PUBLISHED_LOCALES: readonly Locale[] = SUPPORTED_LOCALES;

export type LocaleDefinition = {
  code: Locale;
  htmlLang: string;
  dir: "ltr" | "rtl";
  openGraphLocale: string;
  pathPrefix: string;
  homePath: string;
  label: string;
  switcherLabel: string;
  switcherCurrentLabel: string;
  switcherAriaLabel: string;
  switcherOptionsLabel: string;
  switcherSearchPlaceholder: string;
  switcherEmptyLabel: string;
};

export const LOCALE_DEFINITIONS: Record<Locale, LocaleDefinition> = {
  tr: {
    code: "tr",
    htmlLang: "tr",
    dir: "ltr",
    openGraphLocale: "tr_TR",
    pathPrefix: "",
    homePath: "/",
    label: "Türkçe",
    switcherLabel: "Türkçe",
    switcherCurrentLabel: "TR - Türkçe",
    switcherAriaLabel: "Dil seçin",
    switcherOptionsLabel: "Dil seçenekleri",
    switcherSearchPlaceholder: "Dil ara",
    switcherEmptyLabel: "Eşleşen dil bulunamadı",
  },
  en: {
    code: "en",
    htmlLang: "en",
    dir: "ltr",
    openGraphLocale: "en_US",
    pathPrefix: "/en",
    homePath: "/en",
    label: "English",
    switcherLabel: "English",
    switcherCurrentLabel: "EN - English",
    switcherAriaLabel: "Select language",
    switcherOptionsLabel: "Language options",
    switcherSearchPlaceholder: "Search language",
    switcherEmptyLabel: "No matching language found",
  },
  de: {
    code: "de",
    htmlLang: "de",
    dir: "ltr",
    openGraphLocale: "de_DE",
    pathPrefix: "/de",
    homePath: "/de",
    label: "Deutsch",
    switcherLabel: "Deutsch",
    switcherCurrentLabel: "DE - Deutsch",
    switcherAriaLabel: "Sprache auswahlen",
    switcherOptionsLabel: "Sprachoptionen",
    switcherSearchPlaceholder: "Sprache suchen",
    switcherEmptyLabel: "Keine passende Sprache gefunden",
  },

};

export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const normalizedPath = normalizePathname(pathname);
  const [firstSegment] = normalizedPath
    .split("/")
    .filter(Boolean);

  if (firstSegment && isLocale(firstSegment)) {
    return firstSegment;
  }

  return DEFAULT_LOCALE;
}

export function getLocaleDefinition(locale: Locale) {
  return LOCALE_DEFINITIONS[locale];
}
