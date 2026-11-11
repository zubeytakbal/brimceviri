import {
  getLocaleDefinition,
  PUBLISHED_LOCALES,
  type Locale,
} from "./config";
import { getLocalizedCategorySummaries } from "./contentRegistry";
import {
  getCollectionBasePath,
  getStaticPath,
  type StaticRouteKey,
} from "./routing";
import { englishCalculatorMenuLinks } from "./englishCalculatorHubs";
import { englishConversionMenuCategoryOrder } from "./englishCategoryPresentation";
import { findCategoryPageByCategory } from "../converter/categoryPages";
import {
  TURKISH_TOOL_HUB_PATH,
  turkishCalculatorMenu,
  turkishEngineeringMenu,
  turkishGeoMenu,
  turkishTimeMenu,
} from "./turkishToolDirectory";
import {
  GERMAN_TOOL_HUB_PATH,
  germanCalculatorMenu,
  germanTimeMenu,
} from "./germanToolDirectory";

type SiteHeaderCopy = {
  navAriaLabel: string;
  menuLabel: string;
  conversionsLabel: string;
};

type FooterCopy = {
  navAriaLabel: string;
  pagesHeading: string;
  languagesHeading: string;
  categoriesHeading: string;
  description: string;
  disclaimer: string;
  browserProcessingNote: string;
};

type LinkDefinition = {
  href: string;
  label: string;
};

const navCategoryOrder = [
  "uzunluk",
  "alan",
  "hacim",
  "kutle",
  "sicaklik",
  "zaman",
  "hiz",
  "basinc",
  "enerji",
  "veri",
  "elektrik",
  "yogunluk",
  "kuvvet",
  "debi",
  "tork",
  "momentum",
  "viskozite_dinamik",
  "elektrik_direnc",
  "kapasitans",
  "enduktans",
  "elektrik_yuk",
  "altin_ayar",
  "gumus_ayar",
] as const;

const categoryLabels: Record<
  Locale,
  Record<(typeof navCategoryOrder)[number], string> & Record<string, string>
> = {
  tr: {
    uzunluk: "Uzunluk",
    alan: "Alan",
    hacim: "Hacim",
    kutle: "Kütle",
    sicaklik: "Sıcaklık",
    zaman: "Zaman",
    hiz: "Hız",
    basinc: "Basınç",
    enerji: "Enerji ve Güç",
    veri: "Veri Depolama",
    elektrik: "Elektrik",
    yogunluk: "Yoğunluk",
    kuvvet: "Kuvvet",
    debi: "Debi",
    tork: "Tork",
    momentum: "Momentum",
    viskozite_dinamik: "Viskozite",
    elektrik_direnc: "Direnç",
    kapasitans: "Kapasitans",
    enduktans: "Endüktans",
    elektrik_yuk: "Elektrik Yükü",
    altin_ayar: "Altın Ayar",
    gumus_ayar: "Gümüş Ayar",
  },
  en: {
    uzunluk: "Length",
    alan: "Area",
    hacim: "Volume",
    kutle: "Mass",
    sicaklik: "Temperature",
    zaman: "Time",
    hiz: "Speed",
    basinc: "Pressure",
    enerji: "Energy and Power",
    veri: "Data Storage",
    elektrik: "Electricity",
    yogunluk: "Density",
    kuvvet: "Force",
    debi: "Flow Rate",
    tork: "Torque",
    momentum: "Momentum",
    viskozite_dinamik: "Viscosity",
    elektrik_direnc: "Resistance",
    kapasitans: "Capacitance",
    enduktans: "Inductance",
    elektrik_yuk: "Electric Charge",
    altin_ayar: "Gold Purity",
    gumus_ayar: "Silver Purity",
  },
  de: {
    uzunluk: "Länge",
    alan: "Fläche",
    hacim: "Volumen",
    kutle: "Masse",
    sicaklik: "Temperatur",
    zaman: "Zeit",
    hiz: "Geschwindigkeit",
    basinc: "Druck",
    enerji: "Energie und Leistung",
    veri: "Datenspeicher",
    elektrik: "Elektrik",
    yogunluk: "Dichte",
    kuvvet: "Kraft",
    debi: "Volumenstrom",
    tork: "Drehmoment",
    momentum: "Impuls",
    viskozite_dinamik: "Viskosität",
    elektrik_direnc: "Widerstand",
    kapasitans: "Kapazität",
    enduktans: "Induktivität",
    elektrik_yuk: "Elektrische Ladung",
    altin_ayar: "Goldkarat",
    gumus_ayar: "Silberfeingehalt",
  },
};

const siteHeaderCopy: Record<Locale, SiteHeaderCopy> = {
  tr: {
    navAriaLabel: "Ana menü",
    menuLabel: "Menü",
    conversionsLabel: "Dönüşümler",
  },
  en: {
    navAriaLabel: "Main navigation",
    menuLabel: "Menu",
    conversionsLabel: "Conversions",
  },
  de: {
    navAriaLabel: "Hauptnavigation",
    menuLabel: "Menü",
    conversionsLabel: "Kategorien",
  },
};

const footerCopy: Record<Locale, FooterCopy> = {
  tr: {
    navAriaLabel: "Alt menü",
    pagesHeading: "Sayfalar",
    languagesHeading: "Diller",
    categoriesHeading: "Kategoriler",
    description:
      "Teknik dönüşüm araçları, mühendislik hesaplayıcıları ve birim rehberleri pratik başvuru amacıyla hazırlanmıştır.",
    disclaimer:
      "Kritik mühendislik, sağlık veya güvenlik kararlarında sonuçları profesyonel kaynaklarla doğrulayın.",
    browserProcessingNote:
      "Hesaplayıcı girişleri bu sitedeki hesaplama akışlarında tarayıcı içinde işlenir.",
  },
  en: {
    navAriaLabel: "Footer navigation",
    pagesHeading: "Pages",
    languagesHeading: "Languages",
    categoriesHeading: "Categories",
    description:
      "Technical conversion tools, engineering calculators and unit guides prepared for practical reference.",
    disclaimer:
      "For engineering, health or safety decisions, verify critical values with professional sources.",
    browserProcessingNote:
      "Calculator inputs are processed in the browser for calculation flows on this site.",
  },
  de: {
    navAriaLabel: "Fußnavigation",
    pagesHeading: "Seiten",
    languagesHeading: "Sprachen",
    categoriesHeading: "Kategorien",
    description:
      "Technische Umrechnungstools und Einheitenleitfaden für den schnellen praktischen Einsatz.",
    disclaimer:
      "Prüfen Sie kritische Werte bei technischen, gesundheitlichen oder sicherheitsrelevanten Entscheidungen immer mit fachlichen Quellen.",
    browserProcessingNote:
      "Eingegebene Werte werden für die Rechenabläufe direkt im Browser verarbeitet.",
  },
};

const topLevelLabelMap: Record<
  Locale,
  Record<
    "home" | "engineeringHub" | "units" | "allConversions" | "professions",
    string
  >
> = {
  tr: {
    home: "Ana Sayfa",
    engineeringHub: "Hesaplayıcılar",
    units: "Birim Rehberi",
    allConversions: "Tüm Dönüşümler",
    professions: "Mesleklere Göre",
  },
  en: {
    home: "Home",
    engineeringHub: "Calculators",
    units: "Unit Guide",
    allConversions: "All Conversions",
    professions: "Professions",
  },
  de: {
    home: "Startseite",
    engineeringHub: "Rechner",
    units: "Einheitenleitfaden",
    allConversions: "Alle Umrechnungen",
    professions: "Berufe",
  },
};

const footerLinksByLocale: Record<
  Locale,
  Array<{ key: StaticRouteKey; label: string }>
> = {
  tr: [
    { key: "home", label: "Ana Sayfa" },
    { key: "units", label: "Birim Rehberi" },
    { key: "allConversions", label: "Tüm Dönüşümler" },
    { key: "about", label: "Hakkımızda" },
    { key: "contact", label: "İletişim" },
    { key: "privacy", label: "Gizlilik" },
    { key: "terms", label: "Kullanım Koşulları" },
  ],
  en: [
    { key: "home", label: "Home" },
    { key: "units", label: "Unit Guide" },
    { key: "allConversions", label: "All Conversions" },
    { key: "engineeringHub", label: "Engineering Calculators" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
    { key: "privacy", label: "Privacy" },
    { key: "terms", label: "Terms" },
  ],
  de: [
    { key: "home", label: "Startseite" },
    { key: "units", label: "Einheitenleitfaden" },
    { key: "allConversions", label: "Alle Umrechnungen" },
    { key: "engineeringHub", label: "Ingenieurrechner" },
    { key: "about", label: "Über uns" },
    { key: "contact", label: "Kontakt" },
    { key: "privacy", label: "Datenschutz" },
    { key: "terms", label: "Nutzungsbedingungen" },
  ],
};

export function getSiteHeaderCopy(locale: Locale) {
  return siteHeaderCopy[locale];
}

export function getSiteFooterCopy(locale: Locale) {
  return footerCopy[locale];
}

export function getTopLevelLinks(locale: Locale): LinkDefinition[] {
  const labels = topLevelLabelMap[locale];

  // İngilizcede birim rehberi ve tüm dönüşümler "Conversions" menüsünün altında.
  if (locale === "en") {
    return [
      { href: getStaticPath(locale, "home"), label: labels.home },
      { href: getStaticPath(locale, "otherConversions"), label: "Other Tools" },
    ];
  }


  // Türkçede hesaplayıcılar, birim rehberi ve tüm dönüşümler açılır
  // menülerin içinde (getMenuGroups); üst satırda yalnızca bunlar kalır.
  // Almancada da rechner, birim rehberi ve tüm dönüşümler açılır menülerde.
  if (locale === "de") {
    return [{ href: "/de", label: labels.home }];
  }

  if (locale === "tr") {
    return [
      { href: "/", label: labels.home },
    ];
  }

  return [
    {
      href: getStaticPath(locale, "home"),
      label: labels.home,
    },
    {
      href: getStaticPath(locale, "engineeringHub"),
      label: labels.engineeringHub,
    },
    {
      href: getStaticPath(locale, "units"),
      label: labels.units,
    },
    {
      href: getStaticPath(locale, "allConversions"),
      label: labels.allConversions,
    },
  ];
}

export function getCalculatorMenuLinks(locale: Locale): LinkDefinition[] {
  return locale === "en" ? englishCalculatorMenuLinks : [];
}

export function getCategoryMenuLinks(locale: Locale) {
  const categorySummaries = getLocalizedCategorySummaries(locale);
  const basePath = getCollectionBasePath(locale, "categories").slice(
    0,
    -1
  );

  const menuCategoryOrder = locale === "en" ? englishConversionMenuCategoryOrder : navCategoryOrder;

  const links = menuCategoryOrder.flatMap((category) => {
    const summary = categorySummaries.find(
      (item) => item.category === category
    );

    if (!summary) {
      return [];
    }

    return [
      {
        href: `${basePath}/${summary.slug}`,
        label: categoryLabels[locale][category],
      },
    ];
  });


  links.push({
    href: getStaticPath(locale, "shoeSize"),
    label:
      locale === "en"
        ? "Shoe Size"
        : locale === "de"
          ? "Schuhgrößen"
          : "Ayakkabı Numarası",
  });
  links.push({
    href: getStaticPath(locale, "kitchenMeasures"),
    label:
      locale === "en"
        ? "Kitchen Measures"
        : locale === "de"
          ? "Küchenmaße"
          : "Mutfak Ölçüleri",
  });
  links.push({
    href: getStaticPath(locale, "recipeConverter"),
    label:
      locale === "en"
        ? "Recipe Converter"
        : locale === "de"
          ? "Rezept-Umrechner"
          : "Tarif Çevirici",
  });

  return links;
}

export function getCategoryFooterLinks(locale: Locale) {
  const basePath = getCollectionBasePath(locale, "categories").slice(
    0,
    -1
  );

  return getLocalizedCategorySummaries(locale).map((summary) => ({
    href: `${basePath}/${summary.slug}`,
    label:
      summary.title,
  }));
}

export function getFooterLinks(locale: Locale) {
  return footerLinksByLocale[locale].map((link) => ({
    href: getStaticPath(locale, link.key),
    label: link.label,
  }));
}

export function getFooterLanguageLinks() {
  return PUBLISHED_LOCALES.map((locale) => ({
    locale,
    href: getLocaleDefinition(locale).homePath,
    label: getLocaleDefinition(locale).switcherLabel,
  }));
}

export type MenuGroup = {
  id: string;
  label: string;
  links: LinkDefinition[];
  /** Açılır menünün altındaki "Tümü →" bağlantıları. */
  footer?: LinkDefinition[];
};

// Türkçe "Dönüşümler" menüsünde yalnızca çok aranan kategoriler; geri
// kalanlar (momentum, endüktans...) "Tüm dönüşümler" sayfasından erişilir.
const turkishMenuCategories = [
  "uzunluk",
  "alan",
  "hacim",
  "kutle",
  "sicaklik",
  "zaman",
  "hiz",
  "basinc",
  "enerji",
  "veri",
  "elektrik",
  "altin_ayar",
] as const;

function getTurkishMenuGroups(): MenuGroup[] {
  const conversionLinks: LinkDefinition[] = turkishMenuCategories.flatMap((category) => {
    const page = findCategoryPageByCategory(category);
    return page ? [{ href: `/kategoriler/${page.slug}`, label: categoryLabels.tr[category] }] : [];
  });

  return [
    {
      id: "conversions",
      label: "Dönüşümler",
      links: [
        ...conversionLinks,
        { href: "/mutfak-olculeri-cevirici", label: "Mutfak Ölçüleri" },
        { href: "/ayakkabi-numarasi-cevirme", label: "Ayakkabı Numarası" },
      ],
      footer: [
        { href: "/tum-birimler", label: "Tüm dönüşümler →" },
      ],
    },
    {
      id: "calculators",
      label: "Hesaplamalar",
      links: turkishCalculatorMenu,
      footer: [
        { href: TURKISH_TOOL_HUB_PATH, label: "Tüm hesaplamalar →" },
      ],
    },
    {
      id: "engineering",
      label: "Mühendislik",
      links: turkishEngineeringMenu,
      footer: [{ href: "/muhendislik-hesaplayicilari", label: "Tüm mühendislik hesaplayıcıları →" }],
    },
    {
      id: "geo",
      label: "Dünya ve Coğrafya",
      links: turkishGeoMenu,
    },
    {
      id: "time",
      label: "Tarih & Saat",
      links: turkishTimeMenu,
      footer: [
      ],
    },
  ];
}

function getGermanMenuGroups(): MenuGroup[] {
  const summaries = getLocalizedCategorySummaries("de");
  const basePath = getCollectionBasePath("de", "categories").slice(0, -1);
  const conversionLinks: LinkDefinition[] = turkishMenuCategories.flatMap((category) => {
    const summary = summaries.find((item) => item.category === category);
    return summary ? [{ href: `${basePath}/${summary.slug}`, label: categoryLabels.de[category] }] : [];
  });

  return [
    {
      id: "conversions",
      label: "Umrechnungen",
      links: [
        ...conversionLinks,
        { href: "/de/kuechenmass-umrechner", label: "Küchenmaße" },
        { href: "/de/schuhgroessen-umrechner", label: "Schuhgrößen" },
      ],
      footer: [
        { href: "/de/alle-umrechnungen", label: "Alle Umrechnungen →" },
        { href: "/de/einheiten", label: "Einheitenleitfaden →" },
      ],
    },
    {
      id: "calculators",
      label: "Rechner",
      links: germanCalculatorMenu,
      footer: [{ href: GERMAN_TOOL_HUB_PATH, label: "Alle Rechner →" }],
    },
    {
      id: "time",
      label: "Kalender & Uhr",
      links: germanTimeMenu,
    },
  ];
}

// İngilizce menü: dönüşümler, hesaplayıcılar ve tarih/saat hesaplayıcıları.
const englishTimeMenu: LinkDefinition[] = [
  { href: "/en/time-zone-converter", label: "Time Zone Converter" },
  { href: "/en/days-between-dates", label: "Days Between Dates" },
  { href: "/en/date-calculator", label: "Date Calculator" },
  { href: "/en/age-calculator", label: "Age Calculator" },
  { href: "/en/week-number", label: "Week Number" },
  { href: "/en/business-day-calculator", label: "Business Days" },
];

function getEnglishMenuGroups(): MenuGroup[] {
  return [
    {
      id: "conversions",
      label: getSiteHeaderCopy("en").conversionsLabel,
      links: getCategoryMenuLinks("en"),
      footer: [
        { href: "/en/all-conversions", label: "All conversions →" },
        { href: "/en/units", label: "Unit guide →" },
      ],
    },
    {
      id: "calculators",
      label: "Calculators",
      links: englishCalculatorMenuLinks,
    },
    { id: "time", label: "Date & Time", links: englishTimeMenu },
  ];
}

/** Üst menüdeki açılır gruplar (masaüstü açılır menü, mobilde akordeon). */
export function getMenuGroups(locale: Locale): MenuGroup[] {
  if (locale === "tr") {
    return getTurkishMenuGroups();
  }

  if (locale === "de") {
    return getGermanMenuGroups();
  }

  if (locale === "en") {
    return getEnglishMenuGroups();
  }

  const groups: MenuGroup[] = [
    {
      id: "conversions",
      label: getSiteHeaderCopy(locale).conversionsLabel,
      links: getCategoryMenuLinks(locale),
    },
  ];

  const calculatorLinks = getCalculatorMenuLinks(locale);
  if (calculatorLinks.length > 0) {
    groups.push({ id: "calculators", label: "Calculators", links: calculatorLinks });
  }

  return groups;
}
