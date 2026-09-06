export const SUPPORTED_LOCALES = ["tr", "en", "de", "ar", "uz", "bn"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";

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
};

export const LOCALE_DEFINITIONS: Record<Locale, LocaleDefinition> = {
  tr: {
    code: "tr",
    htmlLang: "tr",
    dir: "ltr",
    openGraphLocale: "tr_TR",
    pathPrefix: "",
    homePath: "/",
    label: "Turkce",
    switcherLabel: "Turkce",
    switcherCurrentLabel: "TR - Turkce",
    switcherAriaLabel: "Dil secin",
    switcherOptionsLabel: "Dil secenekleri",
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
  },
  ar: {
    code: "ar",
    htmlLang: "ar",
    dir: "rtl",
    openGraphLocale: "ar_AR",
    pathPrefix: "/ar",
    homePath: "/ar",
    label: "العربية",
    switcherLabel: "العربية",
    switcherCurrentLabel: "AR - العربية",
    switcherAriaLabel: "اختر اللغة",
    switcherOptionsLabel: "خيارات اللغة",
  },
  uz: {
    code: "uz",
    htmlLang: "uz",
    dir: "ltr",
    openGraphLocale: "uz_UZ",
    pathPrefix: "/uz",
    homePath: "/uz",
    label: "O'zbekcha",
    switcherLabel: "O'zbekcha",
    switcherCurrentLabel: "UZ - O'zbekcha",
    switcherAriaLabel: "Tilni tanlang",
    switcherOptionsLabel: "Til tanlovlari",
  },
  bn: {
    code: "bn",
    htmlLang: "bn",
    dir: "ltr",
    openGraphLocale: "bn_BD",
    pathPrefix: "/bn",
    homePath: "/bn",
    label: "বাংলা",
    switcherLabel: "বাংলা",
    switcherCurrentLabel: "BN - বাংলা",
    switcherAriaLabel: "ভাষা নির্বাচন করুন",
    switcherOptionsLabel: "ভাষার বিকল্প",
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
