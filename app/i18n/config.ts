export const SUPPORTED_LOCALES = ["tr", "en", "de", "ar", "uz", "bn", "fr", "es", "es-419", "pt"] as const;

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
    label: "Turkce",
    switcherLabel: "Turkce",
    switcherCurrentLabel: "TR - Turkce",
    switcherAriaLabel: "Dil secin",
    switcherOptionsLabel: "Dil secenekleri",
    switcherSearchPlaceholder: "Dil ara",
    switcherEmptyLabel: "Eslesen dil bulunamadi",
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
    switcherSearchPlaceholder: "ابحث عن لغة",
    switcherEmptyLabel: "لا توجد لغة مطابقة",
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
    switcherSearchPlaceholder: "Til qidirish",
    switcherEmptyLabel: "Mos til topilmadi",
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
    switcherSearchPlaceholder: "ভাষা খুঁজুন",
    switcherEmptyLabel: "কোনো মিল পাওয়া যায়নি",
  },
  fr: {
    code: "fr",
    htmlLang: "fr",
    dir: "ltr",
    openGraphLocale: "fr_FR",
    pathPrefix: "/fr",
    homePath: "/fr",
    label: "Francais",
    switcherLabel: "Francais",
    switcherCurrentLabel: "FR - Francais",
    switcherAriaLabel: "Choisir la langue",
    switcherOptionsLabel: "Options de langue",
    switcherSearchPlaceholder: "Rechercher une langue",
    switcherEmptyLabel: "Aucune langue correspondante",
  },
  es: {
    code: "es",
    htmlLang: "es",
    dir: "ltr",
    openGraphLocale: "es_ES",
    pathPrefix: "/es",
    homePath: "/es",
    label: "Espanol",
    switcherLabel: "Espanol",
    switcherCurrentLabel: "ES - Espanol",
    switcherAriaLabel: "Seleccionar idioma",
    switcherOptionsLabel: "Opciones de idioma",
    switcherSearchPlaceholder: "Buscar idioma",
    switcherEmptyLabel: "No se encontro ningun idioma",
  },
  "es-419": {
    code: "es-419",
    htmlLang: "es-419",
    dir: "ltr",
    openGraphLocale: "es_LA",
    pathPrefix: "/es-419",
    homePath: "/es-419",
    label: "Espanol (Latinoamerica)",
    switcherLabel: "Espanol (Latinoamerica)",
    switcherCurrentLabel: "ES-419 - Espanol (Latinoamerica)",
    switcherAriaLabel: "Seleccionar idioma",
    switcherOptionsLabel: "Opciones de idioma",
    switcherSearchPlaceholder: "Buscar idioma",
    switcherEmptyLabel: "No se encontro ningun idioma",
  },
  pt: {
    code: "pt",
    htmlLang: "pt-BR",
    dir: "ltr",
    openGraphLocale: "pt_BR",
    pathPrefix: "/pt",
    homePath: "/pt",
    label: "Portugues",
    switcherLabel: "Portugues",
    switcherCurrentLabel: "PT - Portugues",
    switcherAriaLabel: "Selecionar idioma",
    switcherOptionsLabel: "Opcoes de idioma",
    switcherSearchPlaceholder: "Buscar idioma",
    switcherEmptyLabel: "Nenhum idioma encontrado",
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
