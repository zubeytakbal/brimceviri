"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowsInSimple,
  Barbell,
  Clock,
  Coins,
  CookingPot,
  Cylinder,
  Drop,
  Fire,
  Flame,
  Gauge,
  Hammer,
  HardDrives,
  Lightning,
  NotePencil,
  Plug,
  Ruler,
  Scroll,
  Sneaker,
  Square,
  Thermometer,
  Waveform,
  Waves,
  Wind,
} from "@phosphor-icons/react";
import { useDeferredValue, useId, useState } from "react";
import NotificationBell from "./NotificationBell";
import ProfessionPreferenceWidget from "./ProfessionPreferenceWidget";
import RecentToolsWidget from "./RecentToolsWidget";
import { useRouter } from "next/navigation";
import { DecorativeIcon, getCategoryIconName, type SiteIconName } from "./siteIcons";
import { calculatorPages } from "../converter/calculatorPages";
import { calculatorSearchIndex } from "../converter/calculatorSearchIndex";
import { categoryPages } from "../converter/categoryPages";
import { conversionPages } from "../converter/conversionPages";
import { englishCalculatorPages } from "../converter/localizedCalculatorPages";
import { englishCategoryPages } from "../converter/localizedCategoryPages";
import { englishConversionPages } from "../converter/localizedConversionPages";
import { englishUnitPages } from "../converter/localizedUnitPages";
import { englishEverydayCalculatorGroups } from "../i18n/englishEverydayCalculatorGroups";
import { englishChemistryCalculatorCount, englishDecisionSavingsCalculatorCount, englishEverydayCalculatorCount } from "../i18n/englishCalculatorHubs";
import { englishAppliedStemCalculatorCount, englishLiveCalculatorCount, englishToolRegistry, getEnglishToolDomain, getEnglishToolsByDomain } from "../i18n/englishToolRegistry";
import { uzbekCategoryPages } from "../converter/localizedUzbekCategoryPages";
import { uzbekConversionPages } from "../converter/localizedUzbekConversionPages";
import { uzbekUnitPages } from "../converter/localizedUzbekUnitPages";
import { germanCalculatorPages } from "../converter/localizedGermanCalculatorPages";
import { germanCategoryPages } from "../converter/localizedGermanCategoryPages";
import { germanConversionPages } from "../converter/localizedGermanConversionPages";
import { germanUnitPages } from "../converter/localizedGermanUnitPages";
import { germanStaticPaths } from "../i18n/germanRoutes";
import { homeCategoryOrder } from "../converter/homeCategoryOrder";
import { englishHomeCategoryOrder, getEnglishCategoryPresentation } from "../i18n/englishCategoryPresentation";
import type { SiteNotification } from "../converter/siteNotifications";
import { unitPages } from "../converter/unitPages";

type Locale = "tr" | "en" | "uz" | "de";

const englishDecisionSavingsHomeTools = getEnglishToolsByDomain("decision-savings");

const englishProductAreas = [
  { id: "conversions", href: "/en/all-conversions", title: "Unit Conversions", description: "Accurate unit conversions and practical unit guides.", icon: "allConversions" as const },
  { id: "everyday", href: "/en/everyday-calculators", title: "Everyday Calculators", description: "Home projects, transport, routines and practical planning.", icon: "numberBaseCalculator" as const },
  { id: "business", href: "/en/business-calculators", title: "Business Calculators", description: "Break-even, gross margin, markup and advertising-return checks.", icon: "numberBaseCalculator" as const },
  { id: "finance", href: "/en/finance-calculators", title: "Finance Calculators", description: "Mortgage, loan and compound-growth planning estimates.", icon: "numberBaseCalculator" as const },
  { id: "automotive", href: "/en/automotive-calculators", title: "Automotive Calculators", description: "Tires, fuel use, EV charging and vehicle running-cost planning.", icon: "fuelConsumptionCalculator" as const },
  { id: "data-computing", href: "/en/data-computing-calculators", title: "Data & Computing", description: "Number bases, pixels, video bitrate and data-storage tools.", icon: "numberBaseCalculator" as const },
  { id: "fitness", href: "/en/fitness-calculators", title: "Fitness Calculators", description: "One-rep max and running-pace training estimates.", icon: "oneRepMaxCalculator" as const },
  { id: "decision-savings", href: "/en/decision-savings-calculators", title: "Decision & Savings", description: "Energy, cost and payback comparisons using your own inputs.", icon: "solarPanelPaybackCalculator" as const },
  { id: "applied-stem", href: "/en/applied-stem", title: "Engineering & STEM", description: "Focused engineering, chemistry and science tools with clear units.", icon: "chemistryCalculator" as const },
] as const;

type HomeConversion = {
  id: string;
  sourceSlug: string;
  href: string;
  label: string;
  description: string;
  category: string;
  categoryLabel: string;
  searchText: string;
};

/** Arama sonuçları için ortak, hafifletilmiş tip — hem dönüşüm sayfalarını
 * (HomeConversion) hem de hesaplayıcı sayfalarını (birim dönüşümü olmayan,
 * category/sourceSlug gibi dönüşüme özgü alanları taşımayan araçlar) aynı
 * arama kutusunda birlikte listeleyebilmek için. */
type HomeSearchable = {
  id: string;
  href: string;
  label: string;
  description?: string;
  categoryLabel: string;
  searchText: string;
};

type HomeCategoryIconName =
  | "uzunluk"
  | "alan"
  | "zaman"
  | "hiz"
  | "kutle"
  | "basinc"
  | "sicaklik"
  | "hacim"
  | "enerji"
  | "veri"
  | "isi"
  | "elektrik"
  | "ayakkabi"
  | "mutfak"
  | "tarif"
  | "altin_ayar"
  | "gumus_ayar"
  | "yogunluk"
  | "kuvvet"
  | "debi"
  | "tork"
  | "momentum"
  | "viskozite_dinamik"
  | "tarihi";

type HomeCategoryCard = {
  id: string;
  iconKey: HomeCategoryIconName;
  name: string;
  symbol: string;
  description: string;
  href: string;
  links: Array<{
    id: string;
    href: string;
    label: string;
  }>;
};

type HomeEngineeringCalculator = {
  id: string;
  href?: string;
  label: string;
  formula: string;
  description: string;
};

type HomeSecondaryCategory = {
  id: string;
  href: string;
  label: string;
  iconName: SiteIconName;
};

type HomePopularUnit = {
  id: string;
  href: string;
  label: string;
  category: HomeCategoryIconName;
};

type HomeData = {
  conversions: HomeConversion[];
  searchables: HomeSearchable[];
  categories: HomeCategoryCard[];
  secondaryCategories: HomeSecondaryCategory[];
  engineeringCalculators: HomeEngineeringCalculator[];
  popularConversions: HomeConversion[];
  popularUnits: HomePopularUnit[];
  allConversionsHref: string;
  allConversionsLabel: string;
  engineeringHubHref?: string;
  engineeringHubLabel: string;
  stats: {
    activeCategories: number;
    conversions: number;
    engineering: number;
  };
};

const preferredSourceSlugs = [
  // kilometrekare-metrekare, GSC'de poz. 7,4 ile sayfa 1 esiginde --
  // anasayfadan ekstra ic link vererek son bir itme icin one alindi
  // (2026-08-26).
  "kilometrekare-metrekare",
  "metre-kilometre",
  "kilometre-metre",
  "metre-santimetre",
  "metre-fit",
  "kilogram-gram",
  "kilogram-pound",
  "psi-bar",
  "kilopascal-bar",
];

// GSC'de sayfa 1 esiginde (poz. ~6-13) kalan birim rehberi sayfalari --
// anasayfadan ekstra ic link vermek icin one alindi (2026-08-26).
const preferredUnitSlugs = [
  "miliamper",
  "bar",
  "miligram",
  "yarda",
  "fahrenhayt",
];

const uzbekSecondaryCategoryDrafts: Record<
  string,
  { label: string; iconName: SiteIconName }
> = {
  kan_sekeri: {
    label: "Qondagi glyukoza birliklari",
    iconName: "doctorHub",
  },
  vitamin_d: {
    label: "D vitamini birliklari",
    iconName: "solarPanelPaybackCalculator",
  },
};

// Ana sayfadaki asosiy kategoriya kartlariga qo'shimcha, homeCategoryOrder'da
// bo'lmagan "iskelet" kartlar -- yangi til qo'shilganda bu jadvalga bitta
// yozuv qo'shish yetarli: Record<Locale, ...> bo'lgani uchun biror til
// unutilsa TypeScript kompilyatsiya vaqtida xato beradi (jim qolib ketmaydi).
const extraCategoryCardsByLocale: Record<Locale, HomeCategoryCard[]> = {
  tr: [
    {
      id: "ayakkabi",
      iconKey: "ayakkabi",
      name: "Ayakkabı Numarası",
      symbol: "TR",
      description:
        "TR/AB, ABD ve İngiltere ayakkabı numaralarını çevirin; Nike, Adidas, Puma, New Balance ve Converse marka tablolarını görün.",
      href: "/ayakkabi-numarasi-cevirme",
      links: [
        {
          id: "ayakkabi-erkek",
          href: "/ayakkabi-numarasi-cevirme",
          label: "Erkek numara tablosu",
        },
        {
          id: "ayakkabi-kadin",
          href: "/ayakkabi-numarasi-cevirme",
          label: "Kadın numara tablosu",
        },
      ],
    },
    {
      id: "mutfak",
      iconKey: "mutfak",
      name: "Mutfak Ölçüleri",
      symbol: "g",
      description:
        "Su bardağı, yemek kaşığı ve çay kaşığının gram karşılığını malzemeye göre hesaplayın; un, şeker, bal ve daha fazlası için ölçü tablosu.",
      href: "/mutfak-olculeri-cevirici",
      links: [
        {
          id: "mutfak-un-gram",
          href: "/mutfak-olculeri-cevirici",
          label: "Bardak → Gram",
        },
        {
          id: "mutfak-kasik-gram",
          href: "/mutfak-olculeri-cevirici",
          label: "Yemek Kaşığı → Gram",
        },
      ],
    },
    {
      id: "tarif",
      iconKey: "tarif",
      name: "Tarif Çevirici",
      symbol: "2x",
      description:
        "Tarifini yapıştır, çarpanı seç: tüm malzeme miktarları ölçeklenir ve bilinen malzemelerde gram karşılığı otomatik hesaplanır.",
      href: "/tarif-cevirici",
      links: [
        {
          id: "tarif-olcekle",
          href: "/tarif-cevirici",
          label: "Tarifi Ölçekle",
        },
        {
          id: "tarif-gram",
          href: "/tarif-cevirici",
          label: "Bardağı Grama Çevir",
        },
      ],
    },
    {
      id: "tarihi",
      iconKey: "tarihi",
      name: "Tarihi Ölçü Birimleri",
      symbol: "HIST",
      description:
        "Bizans, Osmanlı ve eski Türk dönemlerinden kalma arşın, okka, dirhem, endaze ve Bizans ayağı gibi birimleri metreye ve grama çevirin.",
      href: "/tarihi-olcu-birimleri",
      links: [
        {
          id: "tarihi-arsin-metre",
          href: "/arsin-metre",
          label: "Arşın → Metre",
        },
        {
          id: "tarihi-okka-gram",
          href: "/okka-gram",
          label: "Okka → Gram",
        },
      ],
    },
  ],
  en: [
    {
      id: "shoe-size",
      iconKey: "ayakkabi",
      name: "Shoe Size Converter",
      symbol: "EU",
      description:
        "Compare EU, US and UK shoe sizes with general and brand-specific size charts.",
      href: "/en/shoe-size-converter",
      links: [
        {
          id: "shoe-size-chart",
          href: "/en/shoe-size-converter",
          label: "EU, US and UK size chart",
        },
      ],
    },
    {
      id: "kitchen-measures",
      iconKey: "mutfak",
      name: "Kitchen Measurement Converter",
      symbol: "g",
      description:
        "Convert cups, tablespoons and teaspoons to grams by ingredient density.",
      href: "/en/kitchen-measurement-converter",
      links: [
        {
          id: "kitchen-cups-to-grams",
          href: "/en/kitchen-measurement-converter",
          label: "Cups to grams",
        },
      ],
    },
    {
      id: "recipe-converter",
      iconKey: "tarif",
      name: "Recipe Converter",
      symbol: "2×",
      description:
        "Scale a recipe and convert known ingredient measures to grams automatically.",
      href: "/en/recipe-converter",
      links: [
        {
          id: "recipe-scaler",
          href: "/en/recipe-converter",
          label: "Scale a recipe",
        },
      ],
    },
    {
      id: "historical",
      iconKey: "tarihi",
      name: "Historical Units",
      symbol: "HIST",
      description:
        "Explore Byzantine, Ottoman and early Turkic units such as arshin, okka, dirham, endaze and the Byzantine foot with modern metric equivalents.",
      href: "/en/historical-units",
      links: [
        {
          id: "historical-arshin-meter",
          href: "/en/historical-units",
          label: "Historical length units",
        },
        {
          id: "historical-okka-gram",
          href: "/en/historical-units",
          label: "Historical mass units",
        },
      ],
    },
  ],
  uz: [
    {
      id: "ayakkabi",
      iconKey: "ayakkabi",
      name: "Oyoq Kiyim O'lchami",
      symbol: "EU",
      description:
        "Yevropa (EU), AQSH va Angliya oyoq kiyim o'lchamlarini aylantiring; Nike, Adidas, Puma, New Balance va Converse jadvallarini ko'ring.",
      href: "/uz/oyoq-kiyim-olchami",
      links: [
        {
          id: "ayakkabi-erkek",
          href: "/uz/oyoq-kiyim-olchami",
          label: "Erkaklar o'lcham jadvali",
        },
        {
          id: "ayakkabi-kadin",
          href: "/uz/oyoq-kiyim-olchami",
          label: "Ayollar o'lcham jadvali",
        },
      ],
    },
    {
      id: "mutfak",
      iconKey: "mutfak",
      name: "Oshxona O'lchovlari",
      symbol: "g",
      description:
        "Stakan, osh qoshiq va choy qoshiqning gramm ekvivalentini mahsulotga qarab hisoblang; un, shakar, asal va boshqalar uchun o'lchov jadvali.",
      href: "/uz/oshxona-olchovlari",
      links: [
        {
          id: "mutfak-un-gram",
          href: "/uz/oshxona-olchovlari",
          label: "Stakan → Gramm",
        },
        {
          id: "mutfak-kasik-gram",
          href: "/uz/oshxona-olchovlari",
          label: "Osh qoshiq → Gramm",
        },
      ],
    },
    {
      id: "tarif",
      iconKey: "tarif",
      name: "Retsept Aylantirgich",
      symbol: "2x",
      description:
        "Retseptni joylashtiring, ko'paytiruvchini tanlang: barcha mahsulot miqdorlari o'zgaradi, ma'lum mahsulotlarda gramm ekvivalenti avtomatik hisoblanadi.",
      href: "/uz/retsept-aylantirgich",
      links: [
        {
          id: "tarif-olcekle",
          href: "/uz/retsept-aylantirgich",
          label: "Retseptni o'lchash",
        },
        {
          id: "tarif-gram",
          href: "/uz/retsept-aylantirgich",
          label: "Stakanni Grammga aylantirish",
        },
      ],
    },
    {
      id: "tarihi",
      iconKey: "tarihi",
      name: "Tarixiy O'lchov Birliklari",
      symbol: "HIST",
      description:
        "Buxoro, Xiva va Qo'qon xonliklaridan qolgan gaz, chaqirim, tosh, farsah, qadam, miskal, pud, qadoq, dirham va botmon kabi birliklarni metr va grammga aylantiring.",
      href: "/uz/tarixiy-olchov-birliklari",
      links: [
        {
          id: "tarihi-gaz-metr",
          href: "/uz/gaz-dan-metrga",
          label: "Gaz → Metr",
        },
        {
          id: "tarihi-miskal-gramm",
          href: "/uz/miskal-dan-grammga",
          label: "Miskal → Gramm",
        },
      ],
    },
  ],
  de: [
    {
      id: "shoe-size",
      iconKey: "ayakkabi",
      name: "Schuhgrößen-Umrechner",
      symbol: "EU",
      description:
        "Vergleichen Sie EU-, US- und UK-Schuhgrößen mit allgemeinen und markenspezifischen Größentabellen.",
      href: "/de/schuhgroessen-umrechner",
      links: [
        {
          id: "shoe-size-chart",
          href: "/de/schuhgroessen-umrechner",
          label: "EU-, US- und UK-Größentabelle",
        },
      ],
    },
    {
      id: "kitchen-measures",
      iconKey: "mutfak",
      name: "Küchenmaß-Umrechner",
      symbol: "g",
      description:
        "Rechnen Sie Tassen, Esslöffel und Teelöffel je nach Zutat in Gramm um.",
      href: "/de/kuechenmass-umrechner",
      links: [
        {
          id: "kitchen-cups-to-grams",
          href: "/de/kuechenmass-umrechner",
          label: "Tassen in Gramm",
        },
      ],
    },
    {
      id: "recipe-converter",
      iconKey: "tarif",
      name: "Rezept-Umrechner",
      symbol: "2×",
      description:
        "Skalieren Sie ein Rezept und rechnen Sie bekannte Zutatenmengen automatisch in Gramm um.",
      href: "/de/rezept-umrechner",
      links: [
        {
          id: "recipe-scaler",
          href: "/de/rezept-umrechner",
          label: "Rezept skalieren",
        },
      ],
    },
    {
      id: "historical",
      iconKey: "tarihi",
      name: "Historische Maßeinheiten",
      symbol: "HIST",
      description:
        "Entdecken Sie byzantinische, osmanische und alttürkische Einheiten wie Arschin, Okka, Dirham, Endaze und den byzantinischen Fuß mit modernen metrischen Entsprechungen.",
      href: "/de/historische-masseinheiten",
      links: [
        {
          id: "historical-arshin-meter",
          href: "/de/historische-masseinheiten",
          label: "Historische Längeneinheiten",
        },
        {
          id: "historical-okka-gram",
          href: "/de/historische-masseinheiten",
          label: "Historische Masseeinheiten",
        },
      ],
    },
  ],
};

const copy = {
  tr: {
    eyebrow: "Birim çeviri ve dönüşümü",
    title: "Doğru dönüşüme hızlıca gidin",
    description:
      "Arama ile sayfayı açın veya fiziksel büyüklüğe göre kategori seçin.",
    searchLabel: "Dönüşüm veya hesaplayıcı ara",
    searchPlaceholder: "Örnek: metre kilometre, bmi, delta, kdv",
    searchHint:
      "Birim adı, dönüşüm çifti veya bir hesaplayıcının adını (BMI, delta, KDV vb.) yazarak ilgili sayfayı bulun.",
    searchResultsLabel: "Arama sonuçları",
    searchEmpty: "Eşleşen dönüşüm veya hesaplayıcı bulunamadı.",
    searchEnterHint: "İlk sonucu açmak için Enter kullanabilirsiniz.",
    searchCategoryPrefix: "Kategori",
    openLabel: "Aç",
    stats: {
      activeCategories: "kategori",
      conversions: "dönüşüm sayfası",
      engineering: "hesaplayıcı",
    },
    categoriesTitle: "Birim dönüşümleri",
    categoriesDescription:
      "Her kart ilgili kategori sayfasına gider ve 1-2 gerçek dönüşüm örneği gösterir.",
    categoryAction: "Kategori sayfasını aç",
    categoriesFooterLink: "Tüm dönüşümleri görüntüle",
    moreCategoriesCardLabel: "Diğer Dönüşümler",
    secondaryCategoriesTitle: "Diğer Dönüşüm Kategorileri",
    categoryCards: {
      uzunluk: {
        name: "Uzunluk",
        symbol: "m",
        description:
          "Metre, santimetre, kilometre, inç ve fit dönüşümlerini açın.",
      },
      alan: {
        name: "Alan",
        symbol: "m\u00B2",
        description:
          "Metrekare, hektar ve fitkare dönüşümlerini açın.",
      },
      hacim: {
        name: "Hacim",
        symbol: "L",
        description:
          "Litre, mililitre ve metreküp dönüşümlerini açın.",
      },
      kutle: {
        name: "Kütle",
        symbol: "kg",
        description:
          "Kilogram, gram, ton, pound ve ons dönüşümlerine gidin.",
      },
      sicaklik: {
        name: "Sıcaklık",
        symbol: "\u00B0C",
        description:
          "Santigrat, Fahrenheit ve Kelvin dönüşümlerini açın.",
      },
      zaman: {
        name: "Zaman",
        symbol: "s",
        description:
          "Saniye, dakika ve saat dönüşümlerini açın.",
      },
      hiz: {
        name: "Hız",
        symbol: "km/h",
        description:
          "km/saat, m/s ve mph tabanlı hız dönüşümlerini açın.",
      },
      basinc: {
        name: "Basınç",
        symbol: "Pa",
        description:
          "Pascal, bar, psi, atm ve mmHg araçlarını inceleyin.",
      },
      enerji: {
        name: "Enerji ve güç",
        symbol: "W",
        description:
          "Joule, kilovatsaat, watt ve kilowatt dönüşümlerini açın.",
      },
      veri: {
        name: "Veri Depolama",
        symbol: "GB",
        description:
          "Bayt, kilobayt, megabayt, gigabayt ve terabayt dönüşümlerini açın.",
      },
      elektrik: {
        name: "Elektrik",
        symbol: "V",
        description:
          "Volt, kilovolt, amper ve miliamper dönüşümlerini açın.",
      },
      altin_ayar: {
        name: "Altın Ayar",
        symbol: "24K",
        description:
          "24, 22, 18 ve 14 ayar altın arasında gram dönüşümü yapın.",
      },
      gumus_ayar: {
        name: "Gümüş Ayar",
        symbol: "925",
        description:
          "999, 925 (sterlin), 900 ve 800 ayar gümüş arasında gram dönüşümü yapın.",
      },
    },
    popularTitle: "Popüler dönüşümler",
    popularDescription:
      "Sık kullanılan gerçek dönüşüm sayfalarına doğrudan gidin.",
    popularUnitsTitle: "Sık aranan birimler",
    popularUnitsDescription:
      "Bu birimlerin tanımını, tarihçesini ve dönüşümlerini incele.",
    engineeringTitle: "Mühendislik hesaplayıcıları",
    engineeringDescription:
      "Basınç, akışkanlar ve ısı transferi için mevcut teknik araçlar.",
    engineeringHubLabel: "Tüm mühendislik hesaplayıcıları",
    moreCalculatorsCardLabel: "Diğer Hesaplayıcılar",
  },
  en: {
    eyebrow: "Free online unit converter",
    title: "Unit Converter",
    description:
      "Convert length, weight, temperature, volume and 30+ other quantities instantly. Search for a conversion or browse by category.",
    searchLabel: "Search conversions",
    searchPlaceholder: "Example: meter kilometer, kg lb, psi bar",
    searchHint:
      "Search by unit name, symbol or conversion pair to open the right page.",
    searchResultsLabel: "Search results",
    searchEmpty: "No matching conversion pages found.",
    searchEnterHint: "Press Enter to open the first result.",
    searchCategoryPrefix: "Category",
    openLabel: "Open",
    stats: {
      activeCategories: "categories",
      conversions: "conversion pages",
      engineering: "calculators",
    },
    categoriesTitle: "Unit conversions",
    categoriesDescription:
      "Each card opens a live category page and surfaces one or two real conversion examples.",
    categoryAction: "Open category page",
    categoriesFooterLink: "View all conversions",
    moreCategoriesCardLabel: "More Conversions",
    secondaryCategoriesTitle: "More conversion categories",
    categoryCards: {
      uzunluk: {
        name: "Length",
        symbol: "m",
        description:
          "Open meter, centimeter, kilometer, inch and foot conversions.",
      },
      alan: {
        name: "Area",
        symbol: "m\u00B2",
        description:
          "Open square meter, hectare and square foot conversions.",
      },
      hacim: {
        name: "Volume",
        symbol: "L",
        description:
          "Open liter, milliliter and cubic meter conversions.",
      },
      kutle: {
        name: "Mass",
        symbol: "kg",
        description:
          "Jump to kilogram, gram, tonne, pound and ounce tools.",
      },
      sicaklik: {
        name: "Temperature",
        symbol: "\u00B0C",
        description:
          "Open Celsius, Fahrenheit and Kelvin conversions.",
      },
      zaman: {
        name: "Time",
        symbol: "s",
        description:
          "Open second, minute and hour conversions.",
      },
      hiz: {
        name: "Speed",
        symbol: "km/h",
        description:
          "Open km/h, m/s and mph based speed conversions.",
      },
      basinc: {
        name: "Pressure",
        symbol: "Pa",
        description:
          "Browse pascal, bar, psi, atm and mmHg converters.",
      },
      enerji: {
        name: "Energy and power",
        symbol: "W",
        description:
          "Open joule, kilowatt-hour, watt and kilowatt conversions.",
      },
      veri: {
        name: "Data Storage",
        symbol: "GB",
        description:
          "Open byte, kilobyte, megabyte, gigabyte and terabyte conversions.",
      },
      elektrik: {
        name: "Electricity",
        symbol: "V",
        description:
          "Open voltage and current conversion tools.",
      },
      altin_ayar: {
        name: "Gold Karat",
        symbol: "24K",
        description:
          "Convert gold weight between 24K, 22K, 18K and 14K purity.",
      },
      gumus_ayar: {
        name: "Silver Purity",
        symbol: "925",
        description:
          "Convert silver weight between 999, 925 (sterling), 900 and 800 purity.",
      },
    },
    popularTitle: "Popular conversions",
    popularDescription:
      "Open frequently used live conversion pages directly from here.",
    popularUnitsTitle: "Frequently searched units",
    popularUnitsDescription:
      "Read the definition, history and conversions for these units.",
    engineeringTitle: "Engineering calculators",
    engineeringDescription:
      "Current technical tools for pressure, fluids and heat transfer.",
    engineeringHubLabel: "All engineering calculators",
    moreCalculatorsCardLabel: "More Calculators",
  },
  uz: {
    eyebrow: "Birlik aylantirish",
    title: "To'g'ri konverterni tezda oching",
    description:
      "Qidiruv orqali sahifani oching yoki fizik miqdorga qarab turkumni tanlang.",
    searchLabel: "Aylantirish yoki kalkulyator qidirish",
    searchPlaceholder: "Masalan: metr kilometr, kg funt, psi bar",
    searchHint:
      "Birlik nomi, aylantirish jufti yoki kalkulyator nomini yozib kerakli sahifani toping.",
    searchResultsLabel: "Qidiruv natijalari",
    searchEmpty: "Mos aylantirish yoki kalkulyator topilmadi.",
    searchEnterHint: "Birinchi natijani ochish uchun Enter tugmasini bosing.",
    searchCategoryPrefix: "Turkum",
    openLabel: "Ochish",
    stats: {
      activeCategories: "turkum",
      conversions: "aylantirish sahifasi",
      engineering: "kalkulyator",
    },
    categoriesTitle: "Birlik aylantirishlari",
    categoriesDescription:
      "Har bir karta tegishli turkum sahifasiga o'tadi va 1-2 haqiqiy aylantirish namunasini ko'rsatadi.",
    categoryAction: "Turkum sahifasini ochish",
    categoriesFooterLink: "Barcha aylantirishlarni ko'rish",
    moreCategoriesCardLabel: "Boshqa Aylantirishlar",
    secondaryCategoriesTitle: "Boshqa Aylantirish Turkumlari",
    categoryCards: {
      uzunluk: {
        name: "Uzunlik",
        symbol: "m",
        description:
          "Metr, santimetr, kilometr, dyum va fut aylantirishlarini oching.",
      },
      alan: {
        name: "Yuza",
        symbol: "m²",
        description:
          "Kvadrat metr, gektar va kvadrat fut aylantirishlarini oching.",
      },
      hacim: {
        name: "Hajm",
        symbol: "L",
        description:
          "Litr, millilitr va kub metr aylantirishlarini oching.",
      },
      kutle: {
        name: "Massa",
        symbol: "kg",
        description:
          "Kilogramm, gramm, tonna, funt va untsiya asboblariga o'ting.",
      },
      sicaklik: {
        name: "Harorat",
        symbol: "°C",
        description:
          "Selsiy, Farengeyt va Kelvin aylantirishlarini oching.",
      },
      zaman: {
        name: "Vaqt",
        symbol: "s",
        description:
          "Soniya, daqiqa va soat aylantirishlarini oching.",
      },
      hiz: {
        name: "Tezlik",
        symbol: "km/soat",
        description:
          "km/soat, m/s va milya/soat asosidagi tezlik aylantirishlarini oching.",
      },
      basinc: {
        name: "Bosim",
        symbol: "Pa",
        description:
          "Paskal, bar, psi, atm va mmHg vositalarini ko'ring.",
      },
      enerji: {
        name: "Energiya va quvvat",
        symbol: "W",
        description:
          "Joul, kilovattsoat, vatt va kilovatt aylantirishlarini oching.",
      },
      veri: {
        name: "Ma'lumot Hajmi",
        symbol: "GB",
        description:
          "Bayt, kilobayt, megabayt, gigabayt va terabayt aylantirishlarini oching.",
      },
      elektrik: {
        name: "Elektr",
        symbol: "V",
        description:
          "Kuchlanish va tok aylantirish vositalarini oching.",
      },
      altin_ayar: {
        name: "Oltin Karati",
        symbol: "24K",
        description:
          "24, 22, 18 va 14 karat oltin orasida og'irlikni aylantiring.",
      },
      gumus_ayar: {
        name: "Kumush Ayar",
        symbol: "925",
        description:
          "999, 925 (sterling), 900 va 800 ayar kumush orasida og'irlikni aylantiring.",
      },
    },
    popularTitle: "Mashhur aylantirishlar",
    popularDescription:
      "Tez-tez ishlatiladigan haqiqiy aylantirish sahifalarini shu yerdan to'g'ridan-to'g'ri oching.",
    popularUnitsTitle: "Ko'p qidiriladigan birliklar",
    popularUnitsDescription:
      "Ushbu birliklarning ta'rifi, tarixi va aylantirishlarini o'qing.",
    engineeringTitle: "Muhandislik kalkulyatorlari",
    engineeringDescription:
      "Bosim, suyuqliklar va issiqlik almashinuvi uchun mavjud texnik vositalar.",
    engineeringHubLabel: "Barcha muhandislik kalkulyatorlari",
    moreCalculatorsCardLabel: "Boshqa Kalkulyatorlar",
  },
  de: {
    eyebrow: "Technische Einheitenumrechnung",
    title: "Die passende Umrechnung schnell finden",
    description:
      "Nutzen Sie die Suche für eine direkte Seite oder wählen Sie eine Kategorie nach physikalischer Größe.",
    searchLabel: "Umrechnung oder Rechner suchen",
    searchPlaceholder: "Beispiel: Meter Kilometer, kg Pfund, psi bar",
    searchHint:
      "Suchen Sie nach Einheitenname, Symbol oder Umrechnungspaar, um die passende Seite direkt zu öffnen.",
    searchResultsLabel: "Suchergebnisse",
    searchEmpty: "Keine passende Umrechnung oder Rechner gefunden.",
    searchEnterHint: "Drücken Sie Enter, um das erste Ergebnis zu öffnen.",
    searchCategoryPrefix: "Kategorie",
    openLabel: "Öffnen",
    stats: {
      activeCategories: "Kategorien",
      conversions: "Umrechnungsseiten",
      engineering: "Rechner",
    },
    categoriesTitle: "Einheitenumrechnungen",
    categoriesDescription:
      "Jede Karte öffnet eine echte Kategorieseite und zeigt ein bis zwei reale Umrechnungsbeispiele.",
    categoryAction: "Kategorieseite öffnen",
    categoriesFooterLink: "Alle Umrechnungen ansehen",
    moreCategoriesCardLabel: "Weitere Umrechnungen",
    secondaryCategoriesTitle: "Weitere Umrechnungskategorien",
    categoryCards: {
      uzunluk: {
        name: "Länge",
        symbol: "m",
        description:
          "Öffnen Sie Meter-, Zentimeter-, Kilometer-, Zoll- und Fuß-Umrechnungen.",
      },
      alan: {
        name: "Fläche",
        symbol: "m²",
        description:
          "Öffnen Sie Quadratmeter-, Hektar- und Quadratfuß-Umrechnungen.",
      },
      hacim: {
        name: "Volumen",
        symbol: "L",
        description:
          "Öffnen Sie Liter-, Milliliter- und Kubikmeter-Umrechnungen.",
      },
      kutle: {
        name: "Masse",
        symbol: "kg",
        description:
          "Wechseln Sie zu Kilogramm-, Gramm-, Tonnen-, Pfund- und Unzen-Werkzeugen.",
      },
      sicaklik: {
        name: "Temperatur",
        symbol: "°C",
        description:
          "Öffnen Sie Celsius-, Fahrenheit- und Kelvin-Umrechnungen.",
      },
      zaman: {
        name: "Zeit",
        symbol: "s",
        description:
          "Öffnen Sie Sekunden-, Minuten- und Stunden-Umrechnungen.",
      },
      hiz: {
        name: "Geschwindigkeit",
        symbol: "km/h",
        description:
          "Öffnen Sie km/h-, m/s- und mph-basierte Geschwindigkeitsumrechnungen.",
      },
      basinc: {
        name: "Druck",
        symbol: "Pa",
        description:
          "Durchsuchen Sie Pascal-, Bar-, psi-, atm- und mmHg-Umrechner.",
      },
      enerji: {
        name: "Energie und Leistung",
        symbol: "W",
        description:
          "Öffnen Sie Joule-, Kilowattstunden-, Watt- und Kilowatt-Umrechnungen.",
      },
      veri: {
        name: "Datenspeicher",
        symbol: "GB",
        description:
          "Öffnen Sie Byte-, Kilobyte-, Megabyte-, Gigabyte- und Terabyte-Umrechnungen.",
      },
      elektrik: {
        name: "Elektrizität",
        symbol: "V",
        description:
          "Öffnen Sie Spannungs- und Stromstärke-Umrechnungswerkzeuge.",
      },
      altin_ayar: {
        name: "Goldkarat",
        symbol: "24K",
        description:
          "Rechnen Sie Goldgewicht zwischen 24K, 22K, 18K und 14K Reinheit um.",
      },
      gumus_ayar: {
        name: "Silberreinheit",
        symbol: "925",
        description:
          "Rechnen Sie Silbergewicht zwischen 999, 925 (Sterling), 900 und 800 Feingehalt um.",
      },
    },
    popularTitle: "Beliebte Umrechnungen",
    popularDescription:
      "Öffnen Sie häufig genutzte, echte Umrechnungsseiten direkt von hier aus.",
    popularUnitsTitle: "Häufig gesuchte Einheiten",
    popularUnitsDescription:
      "Lesen Sie Definition, Geschichte und Umrechnungen dieser Einheiten.",
    engineeringTitle: "Ingenieurrechner",
    engineeringDescription:
      "Aktuelle technische Werkzeuge für Druck, Strömung und Wärmeübertragung.",
    engineeringHubLabel: "Alle Ingenieurrechner",
    moreCalculatorsCardLabel: "Weitere Rechner",
  },
} as const;

function HomeCategoryIcon({
  kind,
}: {
  kind: HomeCategoryIconName;
}) {
  const Icon =
    kind === "uzunluk"
      ? Ruler
      : kind === "alan"
        ? Square
        : kind === "hacim"
          ? Cylinder
          : kind === "kutle"
            ? Barbell
            : kind === "sicaklik"
              ? Thermometer
              : kind === "zaman"
                ? Clock
                : kind === "hiz"
                  ? Gauge
                  : kind === "basinc"
                    ? ArrowsInSimple
                    : kind === "enerji"
                      ? Lightning
                      : kind === "veri"
                        ? HardDrives
                        : kind === "yogunluk"
                          ? Drop
                          : kind === "kuvvet"
                            ? Hammer
                            : kind === "debi"
                              ? Waves
                              : kind === "tork"
                                ? Barbell
                                : kind === "momentum"
                                  ? ArrowsInSimple
                                  : kind === "viskozite_dinamik"
                                    ? Wind
                                    : kind === "isi"
                                      ? Fire
                                      : kind === "ayakkabi"
                            ? Sneaker
                            : kind === "mutfak"
                              ? CookingPot
                              : kind === "tarif"
                                ? NotePencil
                                : kind === "altin_ayar" || kind === "gumus_ayar"
                                  ? Coins
                                  : kind === "tarihi"
                                    ? Scroll
                                    : Plug;

  return (
    <span className={`home-category-icon-box is-${kind}`} aria-hidden="true">
      <Icon className="home-category-icon-svg" size={42} weight="duotone" />
    </span>
  );
}

function EngineeringCalculatorIcon({ id }: { id: string }) {
  const Icon =
    id === "electrical-calculators"
      ? Lightning
      : id === "mechanics-materials"
      ? Hammer
      : id === "fluids-piping"
        ? Drop
        : id === "heat-transfer"
          ? Flame
          : id === "dimensionless-numbers"
            ? Gauge
            : id === "isi-enerjisi"
              ? Flame
              : id === "isi-iletimi"
                ? Wind
                : id === "reynolds-sayisi"
                  ? Drop
                  : id === "hidrostatik-basinc"
                    ? Waves
                    : id === "ohm-yasasi"
                      ? Waveform
                      : id === "basinc-kuvvet-alan"
                        ? Hammer
                        : Gauge;

  return (
    <span className={`home-category-icon-box is-calc-${id}`} aria-hidden="true">
      <Icon className="home-category-icon-svg" size={42} weight="duotone" />
    </span>
  );
}

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0131/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sortByPreference<T extends { sourceSlug: string }>(items: T[]) {
  return [...items].sort((left, right) => {
    const leftIndex = preferredSourceSlugs.indexOf(left.sourceSlug);
    const rightIndex = preferredSourceSlugs.indexOf(right.sourceSlug);

    const safeLeft =
      leftIndex === -1 ? preferredSourceSlugs.length : leftIndex;
    const safeRight =
      rightIndex === -1 ? preferredSourceSlugs.length : rightIndex;

    return safeLeft - safeRight;
  });
}

function createHomeData(locale: Locale): HomeData {
  const strings = copy[locale];

  const conversions =
    locale === "tr"
      ? conversionPages.map((page) => ({
          id: page.slug,
          sourceSlug: page.slug,
          href: `/${page.slug}`,
          label: `${page.fromName} → ${page.toName}`,
          description: `${page.fromUnit} → ${page.toUnit}`,
          category: page.category,
          categoryLabel: strings.categoryCards[
            page.category as keyof typeof strings.categoryCards
          ]?.name ?? page.category,
          searchText: normalizeSearchText(
            [
              page.fromName,
              page.toName,
              page.fromUnit,
              page.toUnit,
              page.slug,
              strings.categoryCards[
                page.category as keyof typeof strings.categoryCards
              ]?.name ?? page.category,
            ].join(" ")
          ),
        }))
      : locale === "uz"
        ? uzbekConversionPages.map((page) => ({
            id: page.slug,
            sourceSlug: page.sourceSlug,
            href: `/uz/${page.slug}`,
            label: `${page.fromName} → ${page.toName}`,
            description: `${page.fromUnit} → ${page.toUnit}`,
            category: page.category,
            categoryLabel:
              strings.categoryCards[
                page.category as keyof typeof strings.categoryCards
              ]?.name ?? page.categoryName,
            searchText: normalizeSearchText(
              [
                page.fromName,
                page.toName,
                page.fromUnit,
                page.toUnit,
                page.slug,
                page.sourceSlug,
                page.categoryName,
              ].join(" ")
            ),
          }))
        : locale === "de"
          ? germanConversionPages.map((page) => ({
              id: page.slug,
              sourceSlug: page.sourceSlug,
              href: `/de/${page.slug}`,
              label: `${page.fromName} → ${page.toName}`,
              description: `${page.fromUnit} → ${page.toUnit}`,
              category: page.category,
              categoryLabel:
                strings.categoryCards[
                  page.category as keyof typeof strings.categoryCards
                ]?.name ?? page.categoryName,
              searchText: normalizeSearchText(
                [
                  page.fromName,
                  page.toName,
                  page.fromUnit,
                  page.toUnit,
                  page.slug,
                  page.sourceSlug,
                  page.categoryName,
                ].join(" ")
              ),
            }))
          : englishConversionPages.map((page) => ({
            id: page.slug,
            sourceSlug: page.sourceSlug,
            href: `/en/${page.slug}`,
            label: `${page.fromName} → ${page.toName}`,
            description: `${page.fromUnit} → ${page.toUnit}`,
            category: page.category,
            categoryLabel:
              strings.categoryCards[
                page.category as keyof typeof strings.categoryCards
              ]?.name ?? page.categoryName,
            searchText: normalizeSearchText(
              [
                page.fromName,
                page.toName,
                page.fromUnit,
                page.toUnit,
                page.slug,
                page.sourceSlug,
                page.categoryName,
              ].join(" ")
            ),
          }));

  const primaryCategoryOrder = locale === "en" ? englishHomeCategoryOrder : homeCategoryOrder;

  const categoryCards = primaryCategoryOrder.flatMap((sourceCategory) => {
    const categoryPage =
      locale === "tr"
        ? categoryPages.find((page) => page.category === sourceCategory)
        : locale === "uz"
          ? uzbekCategoryPages.find(
              (page) => page.category === sourceCategory
            )
          : locale === "de"
            ? germanCategoryPages.find(
                (page) => page.category === sourceCategory
              )
            : englishCategoryPages.find(
                (page) => page.category === sourceCategory
              );

    const englishPresentation = locale === "en" ? getEnglishCategoryPresentation(sourceCategory) : undefined;
    const categoryCopy = strings.categoryCards[sourceCategory as keyof typeof strings.categoryCards] ?? englishPresentation?.homeCard ?? {
      name: categoryPage?.title ?? sourceCategory,
      symbol: "",
      description: categoryPage?.description ?? "",
    };
    const categoryConversions = sortByPreference(
      conversions.filter(
        (conversion) => conversion.category === sourceCategory
      )
    ).slice(0, 2);

    // Ozbekcha uchun: hali haqiqiy ma'lumot (birlik/aylantirish) bo'lmagan
    // turkumlar ham "iskelet" sifatida karta bo'lib ko'rinishi kerak --
    // bo'sh, lekin ko'rinadigan holda (keyinchalik to'ldiriladi).
    if ((!categoryPage || categoryConversions.length === 0) && locale === "uz") {
      return [
        {
          id: sourceCategory,
          iconKey: sourceCategory as HomeCategoryIconName,
          name: categoryCopy.name,
          symbol: categoryCopy.symbol,
          description: categoryCopy.description,
          href: categoryPage ? `/uz/turkumlar/${categoryPage.slug}` : "/uz/turkumlar",
          links: [],
        },
      ];
    }

    if (!categoryPage || categoryConversions.length === 0) {
      return [];
    }

    return [
      {
        id: sourceCategory,
        iconKey: sourceCategory as HomeCategoryIconName,
        name: categoryCopy.name,
        symbol: categoryCopy.symbol,
        description: categoryCopy.description,
        href:
          locale === "tr"
            ? `/kategoriler/${categoryPage.slug}`
            : locale === "uz"
              ? `/uz/turkumlar/${categoryPage.slug}`
              : locale === "de"
                ? `/de/kategorien/${categoryPage.slug}`
                : `/en/categories/${categoryPage.slug}`,
        links: categoryConversions.map((conversion) => ({
          id: conversion.id,
          href: conversion.href,
          label: conversion.label,
        })),
      },
    ];
  });

  const allCategoryCards = [
    ...categoryCards,
    ...extraCategoryCardsByLocale[locale],
  ];

  const secondaryCategories: HomeSecondaryCategory[] = categoryPages
    .filter(
      (page) =>
        !((locale === "en" ? englishHomeCategoryOrder : homeCategoryOrder) as readonly string[]).includes(page.category)
    )
    .flatMap((page) => {
      if (locale === "tr") {
        return [
          {
            id: page.category,
            href: `/kategoriler/${page.slug}`,
            label: page.title,
            iconName: getCategoryIconName(page.category),
          },
        ];
      }

      if (locale === "uz") {
        const uzbekPage = uzbekCategoryPages.find(
          (item) => item.category === page.category
        );
        const draft = uzbekSecondaryCategoryDrafts[page.category];

        if (!uzbekPage && !draft) {
          return [];
        }

        return [
          {
            id: page.category,
            href: uzbekPage
              ? `/uz/turkumlar/${uzbekPage.slug}`
              : "/uz/turkumlar",
            label: uzbekPage?.title ?? draft!.label,
            iconName: uzbekPage
              ? getCategoryIconName(page.category)
              : draft!.iconName,
          },
        ];
      }

      if (locale === "de") {
        const germanPage = germanCategoryPages.find(
          (item) => item.category === page.category
        );

        if (!germanPage) {
          return [];
        }

        return [
          {
            id: page.category,
            href: `/de/kategorien/${germanPage.slug}`,
            label: germanPage.title,
            iconName: getCategoryIconName(page.category),
          },
        ];
      }

      const englishPage = englishCategoryPages.find(
        (item) => item.category === page.category
      );

      if (!englishPage) {
        return [];
      }

      return [
        {
          id: page.category,
          href: `/en/categories/${englishPage.slug}`,
          label: englishPage.title,
          iconName: getCategoryIconName(page.category),
        },
      ];
    });

  const preferredPopularConversions = preferredSourceSlugs.flatMap((slug) => {
    const conversion = conversions.find(
      (item) => item.sourceSlug === slug
    );

    return conversion ? [conversion] : [];
  });

  const popularConversions = [
    ...preferredPopularConversions,
    ...conversions.filter(
      (conversion) =>
        !preferredPopularConversions.some(
          (preferred) => preferred.id === conversion.id
        )
    ),
  ].slice(0, 6);

  const popularUnits: HomePopularUnit[] =
    locale === "tr"
      ? preferredUnitSlugs.flatMap((slug) => {
          const unitPage = unitPages.find((page) => page.slug === slug);

          return unitPage
            ? [
                {
                  id: unitPage.slug,
                  href: `/birimler/${unitPage.slug}`,
                  label: unitPage.name,
                  category: unitPage.category as HomeCategoryIconName,
                },
              ]
            : [];
        })
      : locale === "uz"
        ? preferredUnitSlugs.flatMap((slug) => {
            const unitPage = uzbekUnitPages.find(
              (page) => page.sourceSlug === slug
            );

            return unitPage
              ? [
                  {
                    id: unitPage.slug,
                    href: `/uz/birliklar/${unitPage.slug}`,
                    label: unitPage.name,
                    category: unitPage.category as HomeCategoryIconName,
                  },
                ]
              : [];
          })
        : locale === "de"
          ? preferredUnitSlugs.flatMap((slug) => {
              const unitPage = germanUnitPages.find(
                (page) => page.sourceSlug === slug
              );

              return unitPage
                ? [
                    {
                      id: unitPage.slug,
                      href: `/de/einheiten/${unitPage.slug}`,
                      label: unitPage.name,
                      category: unitPage.category as HomeCategoryIconName,
                    },
                  ]
                : [];
            })
          : preferredUnitSlugs.flatMap((slug) => {
            const unitPage = englishUnitPages.find(
              (page) => page.sourceSlug === slug
            );

            return unitPage
              ? [
                  {
                    id: unitPage.slug,
                    href: `/en/units/${unitPage.slug}`,
                    label: unitPage.name,
                    category: unitPage.category as HomeCategoryIconName,
                  },
                ]
              : [];
          });

  const engineeringSourceSlugs = [
    "basinc-kuvvet-alan",
    "hidrostatik-basinc",
    "isi-enerjisi",
    "isi-iletimi",
    "reynolds-sayisi",
    "ohm-yasasi",
  ] as const;

  const engineeringCalculators =
    locale === "tr"
      ? engineeringSourceSlugs
          .map((slug) => calculatorPages.find((page) => page.slug === slug))
          .filter(
            (page): page is (typeof calculatorPages)[number] => Boolean(page)
          )
          .map((page) => ({
            id: page.slug,
            href: `/hesaplayicilar/${page.slug}`,
            label: page.shortTitle,
            formula: page.formula,
            description: page.description,
          }))
      : locale === "uz"
        ? [
            {
              id: "basinc-kuvvet-alan",
              href: "/uz/bosim-kuch-maydon-hisoblash",
              label: "Bosim, kuch va yuza",
              formula: "P = F / A",
              description: "Bosim, kuch va yuzani hisoblash.",
            },
            {
              id: "hidrostatik-basinc",
              href: "/uz/gidrostatik-bosim-hisoblash",
              label: "Gidrostatik bosim",
              formula: "ΔP = ρgh",
              description: "Gidrostatik bosimni hisoblash.",
            },
            {
              id: "isi-enerjisi",
              href: "/uz/issiqlik-energiyasi-hisoblash",
              label: "Issiqlik energiyasi",
              formula: "Q = m × c × ΔT",
              description: "Issiqlik energiyasini hisoblash.",
            },
            {
              id: "isi-iletimi",
              href: "/uz/issiqlik-otkazuvchanligi-hisoblash",
              label: "Issiqlik o‘tkazilishi",
              formula: "Q̇ = k × A × ΔT / L",
              description: "Issiqlik o‘tkazilishini hisoblash.",
            },
            {
              id: "reynolds-sayisi",
              href: "/uz/reynolds-soni-hisoblash",
              label: "Reynolds soni",
              formula: "Re = ρ × v × D / μ",
              description: "Reynolds sonini hisoblash.",
            },
            {
              id: "ohm-yasasi",
              href: "/uz/om-qonuni-hisoblash",
              label: "Om qonuni",
              formula: "V = I × R",
              description: "Om qonuni bo‘yicha kuchlanish, tok va qarshilikni hisoblash.",
            },
          ]
        : locale === "de"
          ? engineeringSourceSlugs
              .map((slug) =>
                germanCalculatorPages.find((page) => page.sourceSlug === slug)
              )
              .filter(
                (page): page is (typeof germanCalculatorPages)[number] =>
                  Boolean(page)
              )
              .map((page) => ({
                id: page.slug,
                href: `/de/rechner/${page.slug}`,
                label: page.shortTitle,
                formula: page.formula,
                description: page.description,
              }))
          : [
            ...engineeringSourceSlugs
              .map((slug) =>
                englishCalculatorPages.find((page) => page.sourceSlug === slug)
              )
              .filter(
                (page): page is (typeof englishCalculatorPages)[number] =>
                  Boolean(page)
              )
              .map((page) => ({
                id: page.slug,
                href: `/en/calculators/${page.slug}`,
                label: page.shortTitle,
                formula: page.formula,
                description: page.description,
              })),
            {
              id: "electrical-calculators",
              href: "/en/engineering-calculators/electrical-calculators",
              label: "Electrical Calculators",
              formula: "P = V × I",
              description:
                "Cable sizing, voltage drop, power-current conversion and motor-current checks.",
            },
            {
              id: "fluids-piping",
              href: "/en/engineering-calculators/fluids-piping",
              label: "Fluids & Piping",
              formula: "Q = A × v",
              description:
                "Pipe flow, pressure-drop and pump-power checks for fluid systems.",
            },
            {
              id: "heat-transfer",
              href: "/en/engineering-calculators/heat-transfer",
              label: "Heat Transfer",
              formula: "Q̇ = U A ΔT",
              description:
                "Thermal resistance, heat loss, radiation and convection calculations.",
            },
            {
              id: "dimensionless-numbers",
              href: "/en/engineering-calculators/dimensionless-numbers",
              label: "Dimensionless Numbers",
              formula: "Re = ρvD / μ",
              description:
                "Flow and heat-transfer groups for correlation and regime screening.",
            },
            {
              id: "mechanics-materials",
              href: "/en/engineering-calculators/mechanics-materials",
              label: "Mechanics & Materials",
              formula: "σ = F / A",
              description:
                "Stress, beam deflection, torsion, buckling and section-property checks.",
            },
          ];

  // Ana sayfanın arama kutusu hem dönüşüm sayfalarını hem de site
  // genelindeki hesaplayıcı sayfalarını (matematik, kimya, mühendislik,
  // günlük) tek bir listede aratabilsin diye ikisi birleştirilir — henüz
  // İngilizce karşılığı olmayan hesaplayıcılar bulunduğundan bu birleşik
  // arama şimdilik sadece "tr" için etkin.
  const calculatorSearchables: HomeSearchable[] =
    locale === "tr"
      ? calculatorSearchIndex.map((entry) => ({
          id: entry.id,
          href: entry.href,
          label: entry.label,
          categoryLabel: entry.categoryLabel,
          searchText: normalizeSearchText(
            `${entry.label} ${entry.categoryLabel}`
          ),
        }))
      : locale === "en"
        ? [
            ...englishToolRegistry.map((tool) => ({
              id: tool.id,
              href: tool.href,
              label: tool.title,
              description: tool.description,
              categoryLabel: getEnglishToolDomain(tool.domain)?.label ?? "Calculator",
              searchText: normalizeSearchText(tool.searchTerms),
            })),
          ]
        : [];

  // Arama, tek tek birim çifti sayfalarının (conversions) yanında genel
  // kategori özet sayfalarını da (örn. "Yoğunluk Dönüşümleri") göstersin —
  // bu sayfalar özellikle çoğu kategorinin tek bir birim çifti sayfası
  // bulunan (yogunluk, viskozite, tork, aci vb.) durumlarda tek anlamlı
  // sonuç oluyor; homeCategoryOrder'da olmayıp anasayfada kart almayan
  // kategoriler için de aramanın tek keşif yolu bu.
  const categoryOverviewSearchables: HomeSearchable[] =
    locale === "tr"
      ? categoryPages.map((page) => ({
          id: `kategori-${page.category}`,
          href: `/kategoriler/${page.slug}`,
          label: page.title,
          description: page.description,
          categoryLabel: "Dönüşüm Kategorisi",
          searchText: normalizeSearchText(
            `${page.title} ${page.category} ${page.description}`
          ),
        }))
      : locale === "uz"
        ? uzbekCategoryPages.map((page) => ({
            id: `turkum-${page.category}`,
            href: `/uz/turkumlar/${page.slug}`,
            label: page.title,
            description: page.description,
            categoryLabel: "Birlik turkumi",
            searchText: normalizeSearchText(
              `${page.title} ${page.category} ${page.description}`
            ),
          }))
        : locale === "de"
          ? germanCategoryPages.map((page) => ({
              id: `kategorie-${page.category}`,
              href: `/de/kategorien/${page.slug}`,
              label: page.title,
              description: page.description,
              categoryLabel: "Umrechnungskategorie",
              searchText: normalizeSearchText(
                `${page.title} ${page.category} ${page.description}`
              ),
            }))
          : englishCategoryPages.map((page) => ({
            id: `category-${page.category}`,
            href: `/en/categories/${page.slug}`,
            label: page.title,
            description: page.description,
            categoryLabel: "Conversion category",
            searchText: normalizeSearchText(
              `${page.title} ${page.category} ${page.description}`
            ),
          }));

  // Kategori özet sayfaları önce gelir: bir sorgu hem genel bir kategoriye
  // hem tek tek birim çiftlerine denk düştüğünde (örn. "yoğunluk"), asıl
  // aranan büyük ihtimalle genel sayfadır — 8 sonuçluk kesme noktasında
  // dar birim çiftlerinin genel sayfayı listeden itmesini engeller.
  const searchables: HomeSearchable[] = [
    ...categoryOverviewSearchables,
    ...conversions.map((conversion) => ({
      id: conversion.id,
      href: conversion.href,
      label: conversion.label,
      description: conversion.description,
      categoryLabel: conversion.categoryLabel,
      searchText: conversion.searchText,
    })),
    ...calculatorSearchables,
  ];

  return {
    conversions,
    searchables,
    categories: allCategoryCards,
    secondaryCategories,
    engineeringCalculators,
    popularConversions,
    popularUnits,
    allConversionsHref:
      locale === "tr"
        ? "/tum-birimler"
        : locale === "uz"
          ? "/uz/turkumlar"
          : locale === "de"
            ? germanStaticPaths.allConversions
            : "/en/all-conversions",
    allConversionsLabel:
      locale === "tr"
        ? "Tüm dönüşümler"
        : locale === "uz"
          ? "Barcha turkumlar"
          : locale === "de"
            ? "Alle Umrechnungen"
            : "All conversions",
    engineeringHubHref:
      locale === "tr"
        ? "/muhendislik-hesaplayicilari"
        : locale === "uz"
          ? "/uz/muhandislik-hisoblagichlari"
          : locale === "de"
            ? germanStaticPaths.engineeringHub
            : "/en/engineering-calculators",
      engineeringHubLabel: strings.engineeringHubLabel,
    stats: {
      activeCategories: allCategoryCards.length,
      conversions: conversions.length,
      engineering:
        locale === "en"
          ? englishLiveCalculatorCount
          : engineeringCalculators.length,
    },
  };
}

const homeData = {
  tr: createHomeData("tr"),
  en: createHomeData("en"),
  uz: createHomeData("uz"),
  de: createHomeData("de"),
} as const;

export default function HomeDirectory({
  locale,
  notifications = [],
}: {
  locale: Locale;
  notifications?: SiteNotification[];
}) {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");

  const deferredQuery = useDeferredValue(query);
  const strings = copy[locale];
  const data = homeData[locale];
  const normalizedQuery = normalizeSearchText(deferredQuery);

  const searchResults = normalizedQuery
    ? data.searchables
        .filter((item) => item.searchText.includes(normalizedQuery))
        .slice(0, 8)
    : [];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchResults[0]) {
      router.push(searchResults[0].href);
    }
  }

  return (
    <main className="directory-home" lang={locale === "en" ? "en" : locale === "de" ? "de" : undefined}>
      <section className="directory-hero">
        <div className="directory-shell">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">{strings.eyebrow}</p>
            <h1>{strings.title}</h1>
            <p className="directory-lead">{strings.description}</p>
          </div>

          <div className="directory-hero-panel">
            <form className="directory-search" onSubmit={handleSubmit} role="search">
              <label htmlFor={inputId}>{strings.searchLabel}</label>

              <div className="directory-search-field">
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  placeholder={strings.searchPlaceholder}
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby={`${inputId}-hint`}
                  aria-controls={resultsId}
                  onChange={(event) => setQuery(event.target.value)}
                />

                <button type="submit">
                  <DecorativeIcon
                    className="directory-button-icon"
                    name="search"
                    size={18}
                  />
                  {strings.openLabel}
                </button>
              </div>

              <p className="directory-search-hint" id={`${inputId}-hint`}>
                {strings.searchHint}
              </p>

              {query.trim() ? (
                <div className="directory-search-results-wrap">
                  <div className="directory-search-results-head">
                    <strong>{strings.searchResultsLabel}</strong>
                    <span>{strings.searchEnterHint}</span>
                  </div>

                  {searchResults.length > 0 ? (
                    <ul className="directory-search-results" id={resultsId}>
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <Link href={result.href}>
                            <span>{result.label}</span>
                            <small>
                              {strings.searchCategoryPrefix}: {result.categoryLabel}
                              {result.description ? <> · {result.description}</> : null}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="directory-search-empty">{strings.searchEmpty}</p>
                  )}
                </div>
              ) : null}
            </form>

            <dl className="directory-stats">
              <div>
                <dt>{strings.stats.activeCategories}</dt>
                <dd>{data.stats.activeCategories}</dd>
              </div>

              <div>
                <dt>{strings.stats.conversions}</dt>
                <dd>{data.stats.conversions}</dd>
              </div>

              <div>
                <dt>{strings.stats.engineering}</dt>
                <dd>{data.stats.engineering}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {(locale === "tr" || locale === "en" || locale === "uz" || locale === "de") && (
        <NotificationBell
          notifications={notifications}
          locale={locale}
          showWhenEmpty={locale === "uz"}
        />
      )}
      {locale === "tr" && <ProfessionPreferenceWidget />}
      <RecentToolsWidget locale={locale} />

      <div className="directory-shell directory-content">
        {locale === "en" && (
          <section className="directory-section" id="calculator-areas">
            <header className="directory-section-header">
              <div>
                <h2>Explore calculation tools</h2>
                <p>Start with a clear task area, then open a focused tool with its units and assumptions visible.</p>
              </div>
            </header>

            <div className="directory-tool-grid">
              {englishProductAreas.map((area) => {
                const count =
                  area.id === "conversions"
                    ? data.stats.activeCategories
                    : area.id === "everyday"
                      ? englishEverydayCalculatorCount
                      : area.id === "decision-savings"
                        ? englishDecisionSavingsCalculatorCount
                        : englishAppliedStemCalculatorCount;

                return (
                  <article className="directory-home-card directory-tool-card" key={area.id}>
                    <Link className="directory-card-stretch" href={area.href} aria-label={area.title} />
                    <div className="directory-card-body directory-card-body-icon">
                      <span className="home-category-icon-box" aria-hidden="true">
                        <DecorativeIcon name={area.icon} size={42} className="home-category-icon-svg" />
                      </span>
                      <div>
                        <h3 className="home-category-title">{area.title}</h3>
                        <p>{area.description}</p>
                        <small>{count} {area.id === "conversions" ? "categories" : "available tools"}</small>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>{strings.categoriesTitle}</h2>
              <p>{strings.categoriesDescription}</p>
            </div>

            <Link className="directory-section-link" href={data.allConversionsHref}>
              <DecorativeIcon
                className="directory-link-icon"
                name="allConversions"
                size={18}
              />
              {data.allConversionsLabel}
            </Link>
          </header>

          <div className="directory-home-category-grid">
            {data.categories.map((category) => (
              <article className="directory-home-card" key={category.id}>
                <Link
                  className="directory-card-stretch"
                  href={category.href}
                  aria-label={`${category.name} ${strings.categoryAction}`}
                />

                <div className="directory-card-body directory-card-body-icon">
                  <HomeCategoryIcon kind={category.iconKey} />
                  <h3 className="home-category-title">{category.name}</h3>
                </div>
              </article>
            ))}

            {data.secondaryCategories.length > 0 && (
              <article className="directory-home-card directory-home-card-more">
                <Link
                  className="directory-card-stretch"
                  href={
                    locale === "tr"
                      ? "/diger-donusumler"
                      : data.allConversionsHref
                  }
                  aria-label={strings.moreCategoriesCardLabel}
                />

                <div className="directory-card-body directory-more-card-body">
                  <ArrowRight
                    className="directory-more-arrow"
                    size={56}
                    weight="regular"
                    aria-hidden="true"
                  />

                  <span className="directory-more-label">
                    {strings.moreCategoriesCardLabel}
                  </span>
                </div>
              </article>
            )}
          </div>

          {data.secondaryCategories.length > 0 && (
            <div className="directory-secondary-categories">
              <h3>{strings.secondaryCategoriesTitle}</h3>
              <div className="directory-home-category-grid">
                {data.secondaryCategories.slice(0, 8).map((category) => (
                  <article className="directory-home-card" key={category.id}>
                    <Link
                      className="directory-card-stretch"
                      href={category.href}
                      aria-label={category.label}
                    />

                    <div className="directory-card-body directory-card-body-icon">
                      <span className="home-category-icon-box" aria-hidden="true">
                        <DecorativeIcon
                          name={category.iconName}
                          size={42}
                          className="home-category-icon-svg"
                        />
                      </span>
                      <h3 className="home-category-title">{category.label}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="directory-section-footer">
            <Link
              className="directory-section-link"
              href={data.allConversionsHref}
            >
              <DecorativeIcon
                className="directory-link-icon"
                name="allConversions"
                size={18}
              />
              {strings.categoriesFooterLink}
            </Link>
          </div>
        </section>

        <section className="directory-section">
          <header className="directory-section-header">
            <div>
              <h2>{strings.popularTitle}</h2>
              <p>{strings.popularDescription}</p>
            </div>

            <Link className="directory-section-link" href={data.allConversionsHref}>
              <DecorativeIcon
                className="directory-link-icon"
                name="allConversions"
                size={18}
              />
              {data.allConversionsLabel}
            </Link>
          </header>

          <ul className="directory-popular-list">
            {data.popularConversions.map((conversion) => (
              <li key={conversion.id}>
                <Link href={conversion.href}>
                  <span className="directory-conversion-title">
                    {conversion.label}
                  </span>
                  <small>{conversion.description}</small>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {data.popularUnits.length > 0 && (
          <section className="directory-section">
            <header className="directory-section-header">
              <div>
                <h2>{strings.popularUnitsTitle}</h2>
                <p>{strings.popularUnitsDescription}</p>
              </div>
            </header>

            <div className="directory-tool-grid">
              {data.popularUnits.map((unit) => (
                <article className="directory-home-card directory-tool-card" key={unit.id}>
                  <Link
                    className="directory-card-stretch"
                    href={unit.href}
                    aria-label={unit.label}
                  />

                  <div className="directory-card-body directory-card-body-icon">
                    <HomeCategoryIcon kind={unit.category} />
                    <h3 className="home-category-title">{unit.label}</h3>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {data.engineeringCalculators.length > 0 && (
        <section
          className="directory-section"
          id={locale === "tr" ? "muhendislik-hesaplayicilari" : "engineering-calculators"}
        >
          <header className="directory-section-header">
            <div>
              <h2>{strings.engineeringTitle}</h2>
              <p>{strings.engineeringDescription}</p>
            </div>
          </header>

          <div className="directory-tool-grid">
            {data.engineeringCalculators.map((calculator) => (
              <article className="directory-home-card directory-tool-card" key={calculator.id}>
                {calculator.href ? (
                  <Link
                    className="directory-card-stretch"
                    href={calculator.href}
                    aria-label={calculator.label}
                  />
                ) : null}

                <div className="directory-card-body directory-card-body-icon">
                  <EngineeringCalculatorIcon id={calculator.id} />
                  <h3 className="home-category-title">{calculator.label}</h3>
                </div>
              </article>
            ))}

            <article className="directory-home-card directory-tool-card directory-home-card-more">
              {data.engineeringHubHref ? (
                <Link
                  className="directory-card-stretch"
                  href={data.engineeringHubHref}
                  aria-label={strings.moreCalculatorsCardLabel}
                />
              ) : null}

              <div className="directory-card-body directory-more-card-body">
                <ArrowRight
                  className="directory-more-arrow"
                  size={56}
                  weight="regular"
                  aria-hidden="true"
                />

                <span className="directory-more-label">
                  {strings.moreCalculatorsCardLabel}
                </span>
              </div>
            </article>
          </div>
        </section>
        )}

        {locale === "tr" && (
          <section className="directory-section" id="bilim-hesaplayicilari">
            <header className="directory-section-header">
              <div>
                <h2>Bilim hesaplayıcıları</h2>
                <p>
                  Kimya, fizik ve diğer fen derslerine yönelik
                  hesaplayıcılar.
                </p>
              </div>
            </header>

            <div className="directory-tool-grid">
              <article className="directory-home-card directory-tool-card">
                <Link
                  className="directory-card-stretch"
                  href="/bilim-hesaplayicilari/kimya"
                  aria-label="Kimya"
                />

                <div className="directory-card-body directory-card-body-icon">
                  <span className="home-category-icon-box" aria-hidden="true">
                    <DecorativeIcon
                      name="chemistryCalculator"
                      size={42}
                      className="home-category-icon-svg"
                    />
                  </span>
                  <h3 className="home-category-title">Kimya</h3>
                </div>
              </article>

              <article className="directory-home-card directory-tool-card">
                <Link
                  className="directory-card-stretch"
                  href="/bilim-hesaplayicilari/matematik"
                  aria-label="Matematik"
                />

                <div className="directory-card-body directory-card-body-icon">
                  <span className="home-category-icon-box" aria-hidden="true">
                    <DecorativeIcon
                      name="mathCalculator"
                      size={42}
                      className="home-category-icon-svg"
                    />
                  </span>
                  <h3 className="home-category-title">Matematik</h3>
                </div>
              </article>

              <article className="directory-home-card directory-tool-card">
                <Link
                  className="directory-card-stretch"
                  href="/bilim-hesaplayicilari/geometri"
                  aria-label="Geometri"
                />

                <div className="directory-card-body directory-card-body-icon">
                  <span className="home-category-icon-box" aria-hidden="true">
                    <DecorativeIcon
                      name="geometryCalculator"
                      size={42}
                      className="home-category-icon-svg"
                    />
                  </span>
                  <h3 className="home-category-title">Geometri</h3>
                </div>
              </article>

              <article className="directory-home-card directory-tool-card">
                <Link
                  className="directory-card-stretch"
                  href="/bilim-hesaplayicilari/biyoloji"
                  aria-label="Biyoloji"
                />

                <div className="directory-card-body directory-card-body-icon">
                  <span className="home-category-icon-box" aria-hidden="true">
                    <DecorativeIcon
                      name="biologyCalculator"
                      size={42}
                      className="home-category-icon-svg"
                    />
                  </span>
                  <h3 className="home-category-title">Biyoloji</h3>
                </div>
              </article>

              <article className="directory-home-card directory-tool-card directory-home-card-more">
                <Link
                  className="directory-card-stretch"
                  href="/bilim-hesaplayicilari"
                  aria-label="Diğer Bilim Hesaplayıcıları"
                />

                <div className="directory-card-body directory-more-card-body">
                  <ArrowRight
                    className="directory-more-arrow"
                    size={56}
                    weight="regular"
                    aria-hidden="true"
                  />

                  <span className="directory-more-label">
                    Diğer Bilim Hesaplayıcıları
                  </span>
                </div>
              </article>
            </div>
          </section>
        )}

        {locale === "en" && (
          <section className="directory-section" id="everyday-calculators">
            <header className="directory-section-header">
              <div>
                <h2>Everyday calculators</h2>
                <p>Practical tools for home projects, routines, transport and personal planning.</p>
              </div>
              <Link className="directory-section-link" href="/en/everyday-calculators">View all {englishEverydayCalculatorCount} tools</Link>
            </header>
            <div className="directory-tool-grid">
              {englishEverydayCalculatorGroups.map((group) => (
                <article className="directory-home-card directory-tool-card" key={group.id}>
                  <Link className="directory-card-stretch" href={`/en/everyday-calculators#${group.id}`} aria-label={group.title} />
                  <div className="directory-card-body directory-card-body-icon">
                    <span className="home-category-icon-box" aria-hidden="true"><DecorativeIcon name="numberBaseCalculator" size={42} className="home-category-icon-svg" /></span>
                    <div><h3 className="home-category-title">{group.title}</h3><p>{group.tools.length} tools</p></div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {locale === "en" && (
          <section className="directory-section" id="decision-savings-calculators">
            <header className="directory-section-header">
              <div>
                <h2>Decision &amp; savings calculators</h2>
                <p>Compare recurring costs and simple payback using your own prices and assumptions.</p>
              </div>
              <Link className="directory-section-link" href="/en/decision-savings-calculators">View all {englishDecisionSavingsCalculatorCount} tools</Link>
            </header>
            <div className="directory-tool-grid">
              {englishDecisionSavingsHomeTools.map((tool) => <article className="directory-home-card directory-tool-card" key={tool.id}><Link className="directory-card-stretch" href={tool.href} aria-label={tool.title} /><div className="directory-card-body directory-card-body-icon"><span className="home-category-icon-box" aria-hidden="true"><DecorativeIcon name="evChargingCalculator" size={42} className="home-category-icon-svg" /></span><div><h3 className="home-category-title">{tool.title}</h3><p>{tool.description}</p></div></div></article>)}
            </div>
          </section>
        )}

        {locale === "en" && (
          <section className="directory-section" id="chemistry-calculators">
            <header className="directory-section-header">
              <div>
                <h2>Chemistry calculators</h2>
                  <p>Solution chemistry, reaction calculations, equilibrium and electrochemistry.</p>
              </div>
            </header>

            <div className="directory-tool-grid">
              <article className="directory-home-card directory-tool-card">
                <Link
                  className="directory-card-stretch"
                  href="/en/chemistry-calculators"
                  aria-label="Browse chemistry calculators"
                />
                <div className="directory-card-body directory-card-body-icon">
                  <span className="home-category-icon-box" aria-hidden="true">
                    <DecorativeIcon
                      name="numberBaseCalculator"
                      size={42}
                      className="home-category-icon-svg"
                    />
                  </span>
                  <div>
                    <h3>Chemistry Calculators</h3>
                    <p>{englishChemistryCalculatorCount} available tools</p>
                  </div>
                </div>
              </article>
            </div>
          </section>
        )}

        {locale === "en" && (
          <section className="directory-section" id="science-calculators">
            <header className="directory-section-header">
              <div>
                <h2>Science calculators</h2>
                <p>Focused learning tools for mathematics, physics, biology and chemistry.</p>
              </div>
              <Link className="directory-section-link" href="/en/science-calculators">Open science center</Link>
            </header>
            <div className="directory-tool-grid">
              {[
                { href: "/en/mathematics-calculators", label: "Mathematics", icon: "mathCalculator" as const },
                { href: "/en/physics-calculators", label: "Physics", icon: "physicsCalculator" as const },
                { href: "/en/biology-calculators", label: "Biology", icon: "biologyCalculator" as const },
                { href: "/en/chemistry-calculators", label: "Chemistry", icon: "chemistryCalculator" as const },
              ].map((subject) => <article className="directory-home-card directory-tool-card" key={subject.href}><Link className="directory-card-stretch" href={subject.href} aria-label={subject.label} /><div className="directory-card-body directory-card-body-icon"><span className="home-category-icon-box" aria-hidden="true"><DecorativeIcon name={subject.icon} size={42} className="home-category-icon-svg" /></span><h3 className="home-category-title">{subject.label}</h3></div></article>)}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
