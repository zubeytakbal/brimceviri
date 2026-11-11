import { eskiHref, guncelHref } from "../converter/guncelHref";
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
  | "about"
  | "contact"
  | "privacy"
  | "terms"
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
  | "sleepCalculator"
  | "fuelConsumptionCalculator"
  | "wallpaperCalculator"
  | "movingBoxCalculator"
  | "laminateCalculator"
  | "naturalGasCalculator"
  | "evChargingCalculator";

type LocalePathMap = Partial<Record<Locale, string>>;

const staticRouteTranslations: Record<StaticRouteKey, LocalePathMap> = {
  home: {
    tr: "/",
    en: "/en",
    de: "/de",
  },
  units: {
    en: "/en/units",
    de: "/de/einheiten",
  },
  allConversions: {
    tr: "/tum-birimler",
    en: "/en/all-conversions",
    de: "/de/alle-umrechnungen",
  },
  otherConversions: {
    tr: "/diger-donusumler",
    en: "/en/other-conversions",
    de: "/de/weitere-umrechnungen",
  },
  historicalUnits: {
    tr: "/tarihi-olcu-birimleri",
    en: "/en/historical-units",
    de: "/de/historische-masseinheiten",
  },
  shoeSize: {
    tr: "/ayakkabi-numarasi-cevirme",
    en: "/en/shoe-size-converter",
    de: "/de/schuhgroessen-umrechner",
  },
  kitchenMeasures: {
    tr: "/mutfak-olculeri-cevirici",
    en: "/en/kitchen-measurement-converter",
    de: "/de/kuechenmass-umrechner",
  },
  recipeConverter: {
    tr: "/mutfak-olculeri-cevirici",
    en: "/en/recipe-converter",
    de: "/de/rezept-umrechner",
  },
  ringSize: {
    tr: "/yuzuk-olcusu-cevirici",
    en: "/en/ring-size-converter",
    de: "/de/ringgroessen-umrechner",
  },
  engineeringHub: {
    tr: "/muhendislik-hesaplayicilari",
    en: "/en/engineering-calculators",
    de: "/de/ingenieurrechner",
  },
  electricalEngineeringHub: {
    tr: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
    en: "/en/engineering-calculators/electrical-calculators",
    de: "/de/ingenieurrechner/elektrorechner",
  },
  about: {
    tr: "/hakkimizda",
    en: "/en/about",
    de: "/de/uber-uns",
  },
  contact: {
    tr: "/iletisim",
    en: "/en/contact",
    de: "/de/kontakt",
  },
  privacy: {
    tr: "/gizlilik",
    en: "/en/privacy",
    de: "/de/datenschutz",
  },
  terms: {
    tr: "/kullanim-kosullari",
    en: "/en/terms",
    de: "/de/nutzungsbedingungen",
  },
  paintCalculator: {
    tr: "/boya-hesaplama",
    de: "/de/farbrechner",
  },
  tileCalculator: {
    tr: "/fayans-hesaplama",
    de: "/de/fliesenrechner",
  },
  brickCalculator: {
    tr: "/tugla-hesaplama",
    de: "/de/ziegelrechner",
  },
  dateCalculator: {
    tr: "/yas-hesaplama",
    de: "/de/altersrechner",
  },
  vatCalculator: {
    tr: "/kdv-hesaplama",
    de: "/de/mehrwertsteuer-rechner",
  },
  bmiCalculator: {
    tr: "/bmi-hesaplama",
    de: "/de/bmi-rechner",
  },
  pregnancyCalculator: {
    tr: "/gebelik-haftasi-hesaplama",
    de: "/de/schwangerschaftswochen-rechner",
  },
  lengthComparison: {
    tr: "/uzunluk-karsilastirma",
    de: "/de/laengenvergleich",
  },
  weightComparison: {
    tr: "/agirlik-karsilastirma",
    de: "/de/gewichtsvergleich",
  },
  paceCalculator: {
    tr: "/kosu-pace-hesaplama",
    de: "/de/lauftempo-rechner",
  },
  acCapacityCalculator: {
    tr: "/klima-btu-hesaplama",
    de: "/de/klima-btu-rechner",
  },
  electricityConsumptionCalculator: {
    tr: "/elektrik-tuketimi-hesaplama",
    de: "/de/stromverbrauch-rechner",
  },
  sleepCalculator: {
    tr: "/uyku-hesaplama",
    de: "/de/schlafrechner",
  },
  fuelConsumptionCalculator: {
    tr: "/yakit-tuketimi-hesaplama",
    de: "/de/kraftstoffverbrauchsrechner",
  },
  wallpaperCalculator: {
    tr: "/duvar-kagidi-hesaplama",
    de: "/de/tapetenrechner",
  },
  movingBoxCalculator: {
    tr: "/tasinma-kutusu-hesaplama",
    de: "/de/umzugskartons-rechner",
  },
  laminateCalculator: {
    tr: "/parke-hesaplama",
    de: "/de/laminatrechner",
  },
  naturalGasCalculator: {
    tr: "/dogalgaz-tuketimi-hesaplama",
    de: "/de/erdgaskosten-rechner",
  },
  evChargingCalculator: {
    tr: "/elektrikli-arac-sarj-hesaplama",
    de: "/de/e-auto-laderechner",
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
  },
  categories: {
    tr: "/kategoriler/",
    en: "/en/categories/",
    de: "/de/kategorien/",
  },
  calculators: {
    tr: "/hesaplayicilar/",
    en: "/en/calculators/",
    de: "/de/rechner/",
  },
  conversions: {
    tr: "/",
    en: "/en/",
    de: "/de/",
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
  const path = resolveLanguagePathLegacy(eskiHref(normalizePathname(pathname)), targetLocale);
  return targetLocale === "tr" ? guncelHref(path) : path;
}

function resolveLanguagePathLegacy(pathname: string, targetLocale: Locale) {
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

// Yeni yapiya tasinan Turkce sayfalar (/uzunluk/santimetre-inc) dil eslemelerinde eski
// adresleriyle (/santimetre-inc) tanimli; giriste eski adrese, Turkce cikista yeni adrese cevrilir.
function resolveLanguagePathOrNull(pathname: string, targetLocale: Locale): string | null {
  const path = resolveLanguagePathOrNullLegacy(eskiHref(normalizePathname(pathname)), targetLocale);
  return path && targetLocale === "tr" ? guncelHref(path) : path;
}

function resolveLanguagePathOrNullLegacy(
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

function toHreflangCode(locale: Locale): string {
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

// Ana sayfalar icin hreflang: ana sayfasi olan her dil (ru icin sayfa yok).
// Onceden her ana sayfa farkli bir alt kume listeliyordu (nl hic yoktu).
export function buildHomeLanguageAlternates() {
  const paths: Partial<Record<Locale, string>> = {};
  for (const locale of SUPPORTED_LOCALES) {
    paths[locale] = locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
  }
  return buildLanguageAlternates(paths);
}
