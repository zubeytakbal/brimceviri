import {
  getLocaleDefinition,
  SUPPORTED_LOCALES,
  type Locale,
} from "./config";
import { getLocalizedCategorySummaries } from "./contentRegistry";
import {
  getCollectionBasePath,
  getStaticPath,
  type StaticRouteKey,
} from "./routing";

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
  Record<(typeof navCategoryOrder)[number], string>
> = {
  tr: {
    uzunluk: "Uzunluk",
    alan: "Alan",
    hacim: "Hacim",
    kutle: "Kutle",
    sicaklik: "Sicaklik",
    zaman: "Zaman",
    hiz: "Hiz",
    basinc: "Basinc",
    enerji: "Enerji ve Guc",
    veri: "Veri Depolama",
    elektrik: "Elektrik",
    yogunluk: "Yogunluk",
    kuvvet: "Kuvvet",
    debi: "Debi",
    tork: "Tork",
    momentum: "Momentum",
    viskozite_dinamik: "Viskozite",
    elektrik_direnc: "Direnc",
    kapasitans: "Kapasitans",
    enduktans: "Enduktans",
    elektrik_yuk: "Elektrik Yuku",
    altin_ayar: "Altin Ayar",
    gumus_ayar: "Gumus Ayar",
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
    uzunluk: "Lange",
    alan: "Flache",
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
    viskozite_dinamik: "Viskositat",
    elektrik_direnc: "Widerstand",
    kapasitans: "Kapazitat",
    enduktans: "Induktivitat",
    elektrik_yuk: "Elektrische Ladung",
    altin_ayar: "Goldkarat",
    gumus_ayar: "Silberfeingehalt",
  },
  ar: {
    uzunluk: "الطول",
    alan: "المساحة",
    hacim: "الحجم",
    kutle: "الكتلة",
    sicaklik: "الحرارة",
    zaman: "الزمن",
    hiz: "السرعة",
    basinc: "الضغط",
    enerji: "الطاقة والقدرة",
    veri: "تخزين البيانات",
    elektrik: "الكهرباء",
    yogunluk: "الكثافة",
    kuvvet: "القوة",
    debi: "معدل التدفق",
    tork: "عزم الدوران",
    momentum: "الزخم",
    viskozite_dinamik: "اللزوجة",
    elektrik_direnc: "المقاومة",
    kapasitans: "السعة",
    enduktans: "المحاثة",
    elektrik_yuk: "الشحنة الكهربائية",
    altin_ayar: "عيار الذهب",
    gumus_ayar: "عيار الفضة",
  },
  uz: {
    uzunluk: "Uzunlik",
    alan: "Yuza",
    hacim: "Hajm",
    kutle: "Massa",
    sicaklik: "Harorat",
    zaman: "Vaqt",
    hiz: "Tezlik",
    basinc: "Bosim",
    enerji: "Energiya",
    veri: "Ma'lumot Hajmi",
    elektrik: "Elektr",
    yogunluk: "Zichlik",
    kuvvet: "Kuch",
    debi: "Sarf",
    tork: "Tork",
    momentum: "Impuls",
    viskozite_dinamik: "Qovushqoqlik",
    elektrik_direnc: "Qarshilik",
    kapasitans: "Sig'im",
    enduktans: "Induktivlik",
    elektrik_yuk: "Elektr Zaryadi",
    altin_ayar: "Oltin Karati",
    gumus_ayar: "Kumush Karati",
  },
  bn: {
    uzunluk: "দৈর্ঘ্য",
    alan: "ক্ষেত্রফল",
    hacim: "আয়তন",
    kutle: "ভর",
    sicaklik: "তাপমাত্রা",
    zaman: "সময়",
    hiz: "গতি",
    basinc: "চাপ",
    enerji: "শক্তি",
    veri: "ডেটা স্টোরেজ",
    elektrik: "বিদ্যুৎ",
    yogunluk: "ঘনত্ব",
    kuvvet: "বল",
    debi: "প্রবাহ হার",
    tork: "টর্ক",
    momentum: "ভরবেগ",
    viskozite_dinamik: "সান্দ্রতা",
    elektrik_direnc: "রোধ",
    kapasitans: "ধারকত্ব",
    enduktans: "আবেশ",
    elektrik_yuk: "তড়িৎ আধান",
    altin_ayar: "স্বর্ণের ক্যারেট",
    gumus_ayar: "রূপার মান",
  },
};

const siteHeaderCopy: Record<Locale, SiteHeaderCopy> = {
  tr: {
    navAriaLabel: "Ana menu",
    menuLabel: "Menu",
    conversionsLabel: "Donusumler",
  },
  en: {
    navAriaLabel: "Main navigation",
    menuLabel: "Menu",
    conversionsLabel: "Conversions",
  },
  de: {
    navAriaLabel: "Hauptnavigation",
    menuLabel: "Menu",
    conversionsLabel: "Kategorien",
  },
  ar: {
    navAriaLabel: "التنقل الرئيسي",
    menuLabel: "القائمة",
    conversionsLabel: "الأدوات",
  },
  uz: {
    navAriaLabel: "Asosiy navigatsiya",
    menuLabel: "Menyu",
    conversionsLabel: "O'zgartirishlar",
  },
  bn: {
    navAriaLabel: "প্রধান নেভিগেশন",
    menuLabel: "মেনু",
    conversionsLabel: "রূপান্তর",
  },
};

const footerCopy: Record<Locale, FooterCopy> = {
  tr: {
    navAriaLabel: "Alt menu",
    pagesHeading: "Sayfalar",
    languagesHeading: "Diller",
    categoriesHeading: "Kategoriler",
    description:
      "Teknik donusum araclari, muhendislik hesaplayicilari ve birim rehberleri pratik basvuru amaciyla hazirlanmistir.",
    disclaimer:
      "Kritik muhendislik, saglik veya guvenlik kararlarinda sonuclari profesyonel kaynaklarla dogrulayin.",
    browserProcessingNote:
      "Hesaplayici girisleri bu sitedeki hesaplama akislarinda tarayici icinde islenir.",
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
    navAriaLabel: "Fussnavigation",
    pagesHeading: "Seiten",
    languagesHeading: "Sprachen",
    categoriesHeading: "Kategorien",
    description:
      "Technische Umrechnungstools und Einheitenleitfaden fur den schnellen praktischen Einsatz.",
    disclaimer:
      "Prufen Sie kritische Werte bei technischen, gesundheitlichen oder sicherheitsrelevanten Entscheidungen immer mit fachlichen Quellen.",
    browserProcessingNote:
      "Eingegebene Werte werden fur die Rechenablaufe direkt im Browser verarbeitet.",
  },
  ar: {
    navAriaLabel: "تنقل التذييل",
    pagesHeading: "الصفحات",
    languagesHeading: "اللغات",
    categoriesHeading: "الأدوات",
    description:
      "نسخة عربية تتوسع تدريجيًا لأدوات التحويل والحسابات العملية دون كسر بنية الموقع.",
    disclaimer:
      "في القرارات الهندسية أو الصحية أو المتعلقة بالسلامة، يُفضّل دائمًا التحقق من النتائج عبر مصادر متخصصة.",
    browserProcessingNote:
      "تُعالج مدخلات الحاسبات داخل المتصفح أثناء تنفيذ عمليات الحساب في هذا الموقع.",
  },
  uz: {
    navAriaLabel: "Pastki navigatsiya",
    pagesHeading: "Sahifalar",
    languagesHeading: "Tillar",
    categoriesHeading: "Turkumlar",
    description:
      "Amaliy foydalanish uchun tayyorlangan texnik o'zgartirish vositalari va birlik qo'llanmalari.",
    disclaimer:
      "Muhandislik, sog'liq yoki xavfsizlik bilan bog'liq muhim qarorlarda natijalarni professional manbalar bilan tekshiring.",
    browserProcessingNote:
      "Kalkulyator kiritmalari ushbu saytdagi hisoblash jarayonlarida brauzer ichida qayta ishlanadi.",
  },
  bn: {
    navAriaLabel: "ফুটার নেভিগেশন",
    pagesHeading: "পৃষ্ঠাসমূহ",
    languagesHeading: "ভাষাসমূহ",
    categoriesHeading: "বিভাগসমূহ",
    description:
      "ব্যবহারিক রেফারেন্সের জন্য তৈরি প্রযুক্তিগত রূপান্তর টুল এবং একক গাইড।",
    disclaimer:
      "গুরুত্বপূর্ণ প্রকৌশল, স্বাস্থ্য বা নিরাপত্তা সংক্রান্ত সিদ্ধান্তে ফলাফল পেশাদার সূত্র দিয়ে যাচাই করুন।",
    browserProcessingNote:
      "এই সাইটের হিসাব প্রবাহে ক্যালকুলেটরের ইনপুট ব্রাউজারেই প্রক্রিয়া করা হয়।",
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
    engineeringHub: "Hesaplayicilar",
    units: "Birim Rehberi",
    allConversions: "Tum Donusumler",
    professions: "Mesleklere Gore",
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
  ar: {
    home: "الرئيسية",
    engineeringHub: "الحاسبات",
    units: "دليل الوحدات",
    allConversions: "كل التحويلات",
    professions: "المهن",
  },
  uz: {
    home: "Bosh sahifa",
    engineeringHub: "Kalkulyatorlar",
    units: "Birliklar Qo'llanmasi",
    allConversions: "Barcha O'zgartirishlar",
    professions: "Kasblar",
  },
  bn: {
    home: "হোম",
    engineeringHub: "ক্যালকুলেটর",
    units: "একক গাইড",
    allConversions: "সব রূপান্তর",
    professions: "পেশা",
  },
};

const footerLinksByLocale: Record<
  Locale,
  Array<{ key: StaticRouteKey; label: string }>
> = {
  tr: [
    { key: "home", label: "Ana Sayfa" },
    { key: "units", label: "Birim Rehberi" },
    { key: "allConversions", label: "Tum Donusumler" },
    { key: "professions", label: "Mesleklere Gore" },
    { key: "developerApi", label: "Gelistirici API'si" },
    { key: "about", label: "Hakkimizda" },
    { key: "contact", label: "Iletisim" },
    { key: "privacy", label: "Gizlilik" },
    { key: "terms", label: "Kullanim Kosullari" },
  ],
  en: [
    { key: "home", label: "Home" },
    { key: "units", label: "Unit Guide" },
    { key: "allConversions", label: "All Conversions" },
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
    { key: "about", label: "Uber uns" },
    { key: "contact", label: "Kontakt" },
    { key: "privacy", label: "Datenschutz" },
    { key: "terms", label: "Nutzungsbedingungen" },
  ],
  ar: [
    { key: "home", label: "الرئيسية" },
    { key: "units", label: "دليل الوحدات" },
    { key: "allConversions", label: "كل التحويلات" },
    { key: "engineeringHub", label: "الحاسبات" },
    { key: "about", label: "من نحن" },
    { key: "contact", label: "اتصل بنا" },
    { key: "privacy", label: "الخصوصية" },
    { key: "terms", label: "الشروط" },
  ],
  uz: [{ key: "home", label: "Bosh sahifa" }],
  bn: [{ key: "home", label: "হোম" }],
};

export function getSiteHeaderCopy(locale: Locale) {
  return siteHeaderCopy[locale];
}

export function getSiteFooterCopy(locale: Locale) {
  return footerCopy[locale];
}

export function getTopLevelLinks(locale: Locale): LinkDefinition[] {
  const labels = topLevelLabelMap[locale];

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
    ...(locale === "tr"
      ? [
          {
            href: getStaticPath(locale, "professions"),
            label: labels.professions,
          },
        ]
      : []),
  ];
}

export function getCategoryMenuLinks(locale: Locale) {
  const categorySummaries = getLocalizedCategorySummaries(locale);
  const basePath = getCollectionBasePath(locale, "categories").slice(
    0,
    -1
  );

  const links = navCategoryOrder.flatMap((category) => {
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
          ? "Schuhgroessen"
          : locale === "ar"
            ? "مقاسات الأحذية"
            : locale === "uz"
              ? "Oyoq Kiyim O'lchami"
          : "Ayakkabi Numarasi",
  });
  links.push({
    href: getStaticPath(locale, "kitchenMeasures"),
    label:
      locale === "en"
        ? "Kitchen Measures"
        : locale === "de"
          ? "Kuechenmasse"
          : locale === "ar"
            ? "مقاييس المطبخ"
            : locale === "uz"
              ? "Oshxona O'lchovlari"
          : "Mutfak Olculeri",
  });
  links.push({
    href: getStaticPath(locale, "recipeConverter"),
    label:
      locale === "en"
        ? "Recipe Converter"
        : locale === "de"
          ? "Rezept Umrechner"
          : locale === "ar"
            ? "محول الوصفات"
            : locale === "uz"
              ? "Retsept Aylantirgich"
          : "Tarif Cevirici",
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
      locale === "ar"
        ? categoryLabels.ar[
            summary.category as (typeof navCategoryOrder)[number]
          ] ?? summary.title
        : summary.title,
  }));
}

export function getFooterLinks(locale: Locale) {
  return footerLinksByLocale[locale].map((link) => ({
    href: getStaticPath(locale, link.key),
    label: link.label,
  }));
}

export function getFooterLanguageLinks() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
    href: getLocaleDefinition(locale).homePath,
    label: getLocaleDefinition(locale).switcherLabel,
  }));
}
