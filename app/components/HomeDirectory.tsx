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
import RecentToolsWidget from "./RecentToolsWidget";
import { useRouter } from "next/navigation";
import { DecorativeIcon } from "./siteIcons";
import { calculatorPages } from "../converter/calculatorPages";
import { categoryPages } from "../converter/categoryPages";
import { conversionPages } from "../converter/conversionPages";
import { englishCalculatorPages } from "../converter/localizedCalculatorPages";
import { englishCategoryPages } from "../converter/localizedCategoryPages";
import { englishConversionPages } from "../converter/localizedConversionPages";
import { homeCategoryOrder } from "../converter/homeCategoryOrder";
import { unitPages } from "../converter/unitPages";

type Locale = "tr" | "en";

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
  href: string;
  label: string;
  formula: string;
  description: string;
};

type HomeSecondaryCategory = {
  id: string;
  href: string;
  label: string;
};

type HomePopularUnit = {
  id: string;
  href: string;
  label: string;
  category: HomeCategoryIconName;
};

type HomeData = {
  conversions: HomeConversion[];
  categories: HomeCategoryCard[];
  secondaryCategories: HomeSecondaryCategory[];
  engineeringCalculators: HomeEngineeringCalculator[];
  popularConversions: HomeConversion[];
  popularUnits: HomePopularUnit[];
  allConversionsHref: string;
  allConversionsLabel: string;
  engineeringHubHref: string;
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

const copy = {
  tr: {
    eyebrow: "Teknik birim dönüşümleri",
    title: "Doğru dönüşüme hızlıca gidin",
    description:
      "Arama ile sayfayı açın veya fiziksel büyüklüğe göre kategori seçin.",
    searchLabel: "Dönüşüm ara",
    searchPlaceholder: "Örnek: metre kilometre, kg lb, psi bar",
    searchHint:
      "Birim adı, sembol veya dönüşüm çifti yazarak ilgili sayfayı bulun.",
    searchResultsLabel: "Arama sonuçları",
    searchEmpty: "Eşleşen dönüşüm bulunamadı.",
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
    eyebrow: "Technical unit conversions",
    title: "Open the right converter quickly",
    description:
      "Use search for a direct page or browse by physical quantity.",
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
                        : kind === "isi"
                          ? Fire
                          : kind === "ayakkabi"
                            ? Sneaker
                            : kind === "mutfak"
                              ? CookingPot
                              : kind === "tarif"
                                ? NotePencil
                                : kind === "altin_ayar"
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
    id === "isi-enerjisi"
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

  const categoryCards = homeCategoryOrder.flatMap((sourceCategory) => {
    const categoryPage =
      locale === "tr"
        ? categoryPages.find((page) => page.category === sourceCategory)
        : englishCategoryPages.find(
            (page) => page.category === sourceCategory
          );

    const categoryCopy = strings.categoryCards[sourceCategory];
    const categoryConversions = sortByPreference(
      conversions.filter(
        (conversion) => conversion.category === sourceCategory
      )
    ).slice(0, 2);

    if (!categoryPage || categoryConversions.length === 0) {
      return [];
    }

    return [
      {
        id: sourceCategory,
        iconKey: sourceCategory,
        name: categoryCopy.name,
        symbol: categoryCopy.symbol,
        description: categoryCopy.description,
        href:
          locale === "tr"
            ? `/kategoriler/${categoryPage.slug}`
            : `/en/categories/${categoryPage.slug}`,
        links: categoryConversions.map((conversion) => ({
          id: conversion.id,
          href: conversion.href,
          label: conversion.label,
        })),
      },
    ];
  });

  const allCategoryCards =
    locale === "tr"
      ? [
          ...categoryCards,
          {
            id: "ayakkabi",
            iconKey: "ayakkabi" as const,
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
            iconKey: "mutfak" as const,
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
            iconKey: "tarif" as const,
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
            iconKey: "tarihi" as const,
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
        ]
      : locale === "en"
        ? [
            ...categoryCards,
            {
              id: "historical",
              iconKey: "tarihi" as const,
              name: "Historical Units",
              symbol: "HIST",
              description:
                "Explore Byzantine, Ottoman and early Turkic units such as arshin, okka, dirham, endaze and the Byzantine foot with modern metric equivalents.",
              href: "/en/historical-units",
              links: [
                {
                  id: "historical-arshin-meter",
                  href: "/en/arshin-to-meters",
                  label: "Arshin to meter",
                },
                {
                  id: "historical-okka-gram",
                  href: "/en/okka-to-grams",
                  label: "Okka to gram",
                },
              ],
            },
          ]
        : categoryCards;

  const secondaryCategories: HomeSecondaryCategory[] = categoryPages
    .filter(
      (page) =>
        !(homeCategoryOrder as readonly string[]).includes(page.category)
    )
    .flatMap((page) => {
      if (locale === "tr") {
        return [
          {
            id: page.category,
            href: `/kategoriler/${page.slug}`,
            label: page.title,
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
      : [];

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
      : engineeringSourceSlugs
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
          }));

  return {
    conversions,
    categories: allCategoryCards,
    secondaryCategories,
    engineeringCalculators,
    popularConversions,
    popularUnits,
    allConversionsHref:
      locale === "tr" ? "/tum-birimler" : "/en/all-conversions",
    allConversionsLabel:
      locale === "tr" ? "Tüm dönüşümler" : "All conversions",
    engineeringHubHref:
      locale === "tr"
        ? "/muhendislik-hesaplayicilari"
        : "/en/engineering-calculators",
      engineeringHubLabel: strings.engineeringHubLabel,
    stats: {
      activeCategories: allCategoryCards.length,
      conversions: conversions.length,
      engineering: engineeringCalculators.length,
    },
  };
}

const homeData = {
  tr: createHomeData("tr"),
  en: createHomeData("en"),
} as const;

export default function HomeDirectory({
  locale,
}: {
  locale: Locale;
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
    ? data.conversions
        .filter((conversion) =>
          conversion.searchText.includes(normalizedQuery)
        )
        .slice(0, 8)
    : [];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchResults[0]) {
      router.push(searchResults[0].href);
    }
  }

  return (
    <main className="directory-home" lang={locale === "en" ? "en" : undefined}>
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
                              {strings.searchCategoryPrefix}: {result.categoryLabel} ·{" "}
                              {result.description}
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

      <RecentToolsWidget locale={locale} />

      <div className="directory-shell directory-content">
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
                <Link
                  className="directory-card-stretch"
                  href={calculator.href}
                  aria-label={calculator.label}
                />

                <div className="directory-card-body directory-card-body-icon">
                  <EngineeringCalculatorIcon id={calculator.id} />
                  <h3 className="home-category-title">{calculator.label}</h3>
                </div>
              </article>
            ))}

            <article className="directory-home-card directory-tool-card directory-home-card-more">
              <Link
                className="directory-card-stretch"
                href={data.engineeringHubHref}
                aria-label={strings.moreCalculatorsCardLabel}
              />

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
      </div>
    </main>
  );
}
