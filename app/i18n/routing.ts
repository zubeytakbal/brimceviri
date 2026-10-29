import {
  DEFAULT_LOCALE,
  getLocaleDefinition,
  normalizePathname,
  SUPPORTED_LOCALES,
  type Locale,
} from "./config";
import {
  getLocalizedSlugEntries,
  type RouteCollectionKey,
} from "./contentRegistry";

export type StaticRouteKey =
  | "home"
  | "units"
  | "allConversions"
  | "otherConversions"
  | "historicalUnits"
  | "shoeSize"
  | "kitchenMeasures"
  | "recipeConverter"
  | "ringSize"
  | "engineeringHub"
  | "electricalEngineeringHub"
  | "professions"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "developerApi"
  | "paintCalculator"
  | "tileCalculator"
  | "brickCalculator"
  | "dateCalculator"
  | "vatCalculator"
  | "bmiCalculator"
  | "pregnancyCalculator"
  | "lengthComparison"
  | "weightComparison"
  | "paceCalculator"
  | "acCapacityCalculator"
  | "electricityConsumptionCalculator"
  | "sleepCalculator";

type LocalePathMap = Partial<Record<Locale, string>>;

const staticRouteTranslations: Record<StaticRouteKey, LocalePathMap> = {
  home: {
    tr: "/",
    en: "/en",
    de: "/de",
    ar: "/ar",
    uz: "/uz",
    bn: "/bn",
    hi: "/hi",
    fr: "/fr",
    es: "/es",
    "es-419": "/es-419",
    pt: "/pt",
    it: "/it",
    nl: "/nl",
    ru: "/ru",
    sv: "/sv",
    no: "/no",
    da: "/da",
  },
  units: {
    tr: "/birimler",
    en: "/en/units",
    de: "/de/einheiten",
    ar: "/ar/unit-guides",
    uz: "/uz/birliklar",
    hi: "/hi/unit-guides",
  },
  allConversions: {
    tr: "/tum-birimler",
    en: "/en/all-conversions",
    de: "/de/alle-umrechnungen",
    ar: "/ar/all-conversions",
    uz: "/tum-birimler",
    ru: "/ru/categories",
    hi: "/hi/categories",
  },
  otherConversions: {
    tr: "/diger-donusumler",
    en: "/en/other-conversions",
    de: "/de/weitere-umrechnungen",
    ar: "/ar/other-conversions",
    uz: "/uz/turkumlar",
  },
  historicalUnits: {
    tr: "/tarihi-olcu-birimleri",
    en: "/en/historical-units",
    de: "/de/historische-masseinheiten",
    ar: "/ar/historical-units",
    uz: "/uz/tarixiy-olchov-birliklari",
    nl: "/nl/historical-units",
    sv: "/sv/historical-units",
    no: "/no/historical-units",
    da: "/da/historical-units",
  },
  shoeSize: {
    tr: "/ayakkabi-numarasi-cevirme",
    en: "/en/shoe-size-converter",
    de: "/de/schuhgroessen-umrechner",
    ar: "/ar/shoe-size-converter",
    uz: "/uz/oyoq-kiyim-olchami",
    nl: "/nl/shoe-size-converter",
    sv: "/sv/shoe-size-converter",
    no: "/no/shoe-size-converter",
    da: "/da/shoe-size-converter",
  },
  kitchenMeasures: {
    tr: "/mutfak-olculeri-cevirici",
    en: "/en/kitchen-measurement-converter",
    de: "/de/kuechenmass-umrechner",
    ar: "/ar/kitchen-measurement-converter",
    uz: "/uz/oshxona-olchovlari",
    nl: "/nl/kitchen-measurement-converter",
    sv: "/sv/kitchen-measurement-converter",
    no: "/no/kitchen-measurement-converter",
    da: "/da/kitchen-measurement-converter",
  },
  recipeConverter: {
    tr: "/tarif-cevirici",
    en: "/en/recipe-converter",
    de: "/de/rezept-umrechner",
    ar: "/ar/recipe-converter",
    uz: "/uz/retsept-aylantirgich",
    nl: "/nl/recipe-converter",
    sv: "/sv/recipe-converter",
    no: "/no/recipe-converter",
    da: "/da/recipe-converter",
  },
  ringSize: {
    tr: "/yuzuk-olcusu-cevirici",
    en: "/en/ring-size-converter",
    de: "/de/ringgroessen-umrechner",
    ar: "/ar/ring-size-converter",
  },
  engineeringHub: {
    tr: "/muhendislik-hesaplayicilari",
    en: "/en/engineering-calculators",
    de: "/de/ingenieurrechner",
    ar: "/ar/engineering-calculators",
    uz: "/muhendislik-hesaplayicilari",
  },
  electricalEngineeringHub: {
    tr: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
    en: "/en/engineering-calculators/electrical-calculators",
    de: "/de/ingenieurrechner/elektrorechner",
    ar: "/ar/engineering-calculators/electrical-calculators",
  },
  professions: {
    tr: "/meslekler",
  },
  about: {
    tr: "/hakkimizda",
    en: "/en/about",
    de: "/de/uber-uns",
    ar: "/ar/about",
    uz: "/uz/about",
  },
  contact: {
    tr: "/iletisim",
    en: "/en/contact",
    de: "/de/kontakt",
    ar: "/ar/contact",
    uz: "/uz/contact",
  },
  privacy: {
    tr: "/gizlilik",
    en: "/en/privacy",
    de: "/de/datenschutz",
    ar: "/ar/privacy",
    uz: "/uz/privacy",
  },
  terms: {
    tr: "/kullanim-kosullari",
    en: "/en/terms",
    de: "/de/nutzungsbedingungen",
    ar: "/ar/terms",
    uz: "/uz/terms",
  },
  developerApi: {
    tr: "/gelistirici-api",
  },
  paintCalculator: {
    tr: "/boya-hesaplama",
    de: "/de/farbrechner",
    ar: "/ar/paint-calculator",
  },
  tileCalculator: {
    tr: "/fayans-hesaplama",
    de: "/de/fliesenrechner",
    ar: "/ar/tile-calculator",
  },
  brickCalculator: {
    tr: "/tugla-hesaplama",
    de: "/de/ziegelrechner",
    ar: "/ar/brick-calculator",
  },
  dateCalculator: {
    tr: "/yas-hesaplama",
    de: "/de/altersrechner",
    ar: "/ar/age-calculator",
  },
  vatCalculator: {
    tr: "/kdv-hesaplama",
    de: "/de/mehrwertsteuer-rechner",
    ar: "/ar/vat-calculator",
  },
  bmiCalculator: {
    tr: "/bmi-hesaplama",
    de: "/de/bmi-rechner",
    ar: "/ar/bmi-calculator",
  },
  pregnancyCalculator: {
    tr: "/gebelik-haftasi-hesaplama",
    de: "/de/schwangerschaftswochen-rechner",
    ar: "/ar/pregnancy-week-calculator",
  },
  lengthComparison: {
    tr: "/uzunluk-karsilastirma",
    de: "/de/laengenvergleich",
    ar: "/ar/length-comparison",
  },
  weightComparison: {
    tr: "/agirlik-karsilastirma",
    de: "/de/gewichtsvergleich",
    ar: "/ar/weight-comparison",
  },
  paceCalculator: {
    tr: "/kosu-pace-hesaplama",
    de: "/de/lauftempo-rechner",
    ar: "/ar/running-pace-calculator",
  },
  acCapacityCalculator: {
    tr: "/klima-btu-hesaplama",
    de: "/de/klima-btu-rechner",
    ar: "/ar/ac-btu-calculator",
  },
  electricityConsumptionCalculator: {
    tr: "/elektrik-tuketimi-hesaplama",
    de: "/de/stromverbrauch-rechner",
    ar: "/ar/electricity-consumption-calculator",
  },
  sleepCalculator: {
    tr: "/uyku-hesaplama",
    de: "/de/schlafrechner",
    ar: "/ar/sleep-calculator",
  },
};

const collectionBasePaths: Record<
  RouteCollectionKey,
  Record<Locale, string>
> = {
  units: {
    tr: "/birimler/",
    en: "/en/units/",
    de: "/de/einheiten/",
    ar: "/ar/unit-guides/",
    uz: "/uz/birliklar/",
    bn: "/bn/unit-guides/",
    hi: "/hi/unit-guides/",
    fr: "/fr/unit-guides/",
    es: "/es/unit-guides/",
    "es-419": "/es-419/unit-guides/",
    pt: "/pt/unit-guides/",
    it: "/it/unit-guides/",
    nl: "/nl/unit-guides/",
    ru: "/ru/unit-guides/",
    sv: "/sv/unit-guides/",
    no: "/no/unit-guides/",
    da: "/da/unit-guides/",
  },
  categories: {
    tr: "/kategoriler/",
    en: "/en/categories/",
    de: "/de/kategorien/",
    ar: "/ar/categories/",
    uz: "/uz/turkumlar/",
    bn: "/bn/categories/",
    hi: "/hi/categories/",
    fr: "/fr/categories/",
    es: "/es/categories/",
    "es-419": "/es-419/categories/",
    pt: "/pt/categories/",
    it: "/it/categories/",
    nl: "/nl/categories/",
    ru: "/ru/categories/",
    sv: "/sv/categories/",
    no: "/no/categories/",
    da: "/da/categories/",
  },
  calculators: {
    tr: "/hesaplayicilar/",
    en: "/en/calculators/",
    de: "/de/rechner/",
    ar: "/ar/calculators/",
    uz: "/uz/kalkulyatorlar/",
    bn: "/bn/calculators/",
    hi: "/hi/calculators/",
    fr: "/fr/calculators/",
    es: "/es/calculators/",
    "es-419": "/es-419/calculators/",
    pt: "/pt/calculators/",
    it: "/it/calculators/",
    nl: "/nl/calculators/",
    ru: "/ru/calculators/",
    sv: "/sv/calculators/",
    no: "/no/calculators/",
    da: "/da/calculators/",
  },
  conversions: {
    tr: "/",
    en: "/en/",
    de: "/de/",
    ar: "/ar/",
    uz: "/uz/",
    bn: "/bn/",
    hi: "/hi/",
    fr: "/fr/",
    es: "/es/",
    "es-419": "/es-419/",
    pt: "/pt/",
    it: "/it/",
    nl: "/nl/",
    ru: "/ru/",
    sv: "/sv/",
    no: "/no/",
    da: "/da/",
  },
};

export function getStaticPath(locale: Locale, key: StaticRouteKey) {
  return (
    staticRouteTranslations[key][locale] ??
    getLocaleDefinition(locale).homePath
  );
}

export function getStaticRouteTranslations(key: StaticRouteKey) {
  return staticRouteTranslations[key];
}

export function getCollectionBasePath(
  locale: Locale,
  collection: RouteCollectionKey
) {
  return collectionBasePaths[collection][locale];
}

function resolveSourceSlug(pathname: string, collection: RouteCollectionKey) {
  const localesBySpecificity = [...SUPPORTED_LOCALES].sort(
    (leftLocale, rightLocale) =>
      collectionBasePaths[collection][rightLocale].length -
      collectionBasePaths[collection][leftLocale].length
  );

  for (const locale of localesBySpecificity) {
    const prefix = collectionBasePaths[collection][locale];

    if (!pathname.startsWith(prefix)) {
      continue;
    }

    const localizedSlug = pathname.slice(prefix.length);

    if (!localizedSlug) {
      return null;
    }

    const entry = getLocalizedSlugEntries(locale, collection).find(
      (item) => item.slug === localizedSlug
    );

    if (entry) {
      return entry.sourceSlug;
    }
  }

  return null;
}

function getLocalizedSlugForSource(
  locale: Locale,
  collection: RouteCollectionKey,
  sourceSlug: string
) {
  const entry = getLocalizedSlugEntries(locale, collection).find(
    (item) => item.sourceSlug === sourceSlug
  );

  return entry?.slug ?? null;
}

export function resolveLanguagePath(pathname: string, targetLocale: Locale) {
  const normalizedPath = normalizePathname(pathname);

  const staticRouteEntry = Object.entries(staticRouteTranslations).find(
    ([, translations]) =>
      Object.values(translations).includes(normalizedPath)
  );

  if (staticRouteEntry) {
    const [key] = staticRouteEntry as [StaticRouteKey, LocalePathMap];
    return getStaticPath(targetLocale, key);
  }

  const collectionOrder: RouteCollectionKey[] = [
    "units",
    "categories",
    "calculators",
    "conversions",
  ];

  for (const collection of collectionOrder) {
    const sourceSlug = resolveSourceSlug(normalizedPath, collection);

    if (!sourceSlug) {
      continue;
    }

    const localizedSlug = getLocalizedSlugForSource(
      targetLocale,
      collection,
      sourceSlug
    );

    if (!localizedSlug) {
      return getLocaleDefinition(targetLocale).homePath;
    }

    return `${collectionBasePaths[collection][targetLocale]}${localizedSlug}`;
  }

  return getLocaleDefinition(targetLocale).homePath;
}

function resolveLanguagePathOrNull(
  pathname: string,
  targetLocale: Locale
): string | null {
  const normalizedPath = normalizePathname(pathname);

  const staticRouteEntry = Object.entries(staticRouteTranslations).find(
    ([, translations]) =>
      Object.values(translations).includes(normalizedPath)
  );

  if (staticRouteEntry) {
    const [key] = staticRouteEntry as [StaticRouteKey, LocalePathMap];
    return staticRouteTranslations[key][targetLocale] ?? null;
  }

  const collectionOrder: RouteCollectionKey[] = [
    "units",
    "categories",
    "calculators",
    "conversions",
  ];

  for (const collection of collectionOrder) {
    const sourceSlug = resolveSourceSlug(normalizedPath, collection);

    if (!sourceSlug) {
      continue;
    }

    const localizedSlug = getLocalizedSlugForSource(
      targetLocale,
      collection,
      sourceSlug
    );

    if (!localizedSlug) {
      return null;
    }

    return `${collectionBasePaths[collection][targetLocale]}${localizedSlug}`;
  }

  return null;
}

/**
 * Builds a fully symmetric hreflang alternates set for the given path,
 * including every SUPPORTED_LOCALES entry that has a real equivalent page
 * (never falls back to a locale's homepage the way resolveLanguagePath does,
 * since that would produce a misleading hreflang signal).
 */
export function buildFullLanguageAlternates(
  currentPathname: string,
  xDefaultLocale: Locale = DEFAULT_LOCALE
) {
  const paths: Partial<Record<Locale, string>> = {};

  for (const locale of SUPPORTED_LOCALES) {
    const path = resolveLanguagePathOrNull(currentPathname, locale);

    if (path) {
      paths[locale] = path;
    }
  }

  return buildLanguageAlternates(paths, xDefaultLocale);
}

// Ozbekcha icin bolge-ozel hreflang kodu ("uz-UZ") kullaniyoruz --
// Google'a bu icerigin ozellikle Ozbekistondagi Ozbekcha okuyucular
// icin oldugunu bildirir. Ic routing/Locale tipinde hala sade "uz"
// kullaniliyor, sadece disariya cikan hreflang anahtari degisiyor.
function toHreflangCode(locale: Locale): string {
  if (locale === "uz") {
    return "uz-UZ";
  }
  return locale;
}

export function buildLanguageAlternates(
  paths: Partial<Record<Locale, string>>,
  xDefaultLocale: Locale = DEFAULT_LOCALE
) {
  const languages: Record<string, string> = {};

  for (const locale of SUPPORTED_LOCALES) {
    const path = paths[locale];

    if (path) {
      languages[toHreflangCode(locale)] = path;
    }
  }

  const xDefaultPath = paths[xDefaultLocale];

  if (xDefaultPath) {
    languages["x-default"] = xDefaultPath;
  }

  return { languages };
}
