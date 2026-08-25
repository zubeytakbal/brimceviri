import type { Metadata } from "next";
import OtherCategoriesPage from "../components/OtherCategoriesPage";
import { getCategoryIconName } from "../components/siteIcons";
import { categoryPages } from "../converter/categoryPages";
import { conversionPages } from "../converter/conversionPages";
import { homeCategoryOrder } from "../converter/homeCategoryOrder";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Di\u011fer D\u00f6n\u00fc\u015f\u00fcmler",
  description:
    "Yo\u011funluk, kuvvet, tork, momentum ve viskozite gibi ana sayfada yer almayan m\u00fchendislik ve bilim birim kategorilerini ke\u015ffedin.",
  alternates: {
    canonical: "/diger-donusumler",
    languages: {
      tr: "/diger-donusumler",
      en: "/en/other-conversions",
      "x-default": "/diger-donusumler",
    },
  },
  openGraph: {
    title: "Di\u011fer D\u00f6n\u00fc\u015f\u00fcmler",
    description:
      "Yo\u011funluk, kuvvet, tork, momentum ve viskozite gibi m\u00fchendislik ve bilim birim kategorilerini ke\u015ffedin.",
    url: buildSiteUrl("/diger-donusumler"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function normalizeSearchTextServer(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0131/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export default function DigerDonusumlerPage() {
  const secondaryCategoryPages = categoryPages.filter(
    (page) =>
      !(homeCategoryOrder as readonly string[]).includes(page.category)
  );

  const secondaryCategorySet = new Set(
    secondaryCategoryPages.map((page) => page.category)
  );

  const conversions = conversionPages
    .filter((page) => secondaryCategorySet.has(page.category))
    .map((page) => ({
      id: page.slug,
      href: `/${page.slug}`,
      label: `${page.fromName} -> ${page.toName}`,
      description: `${page.fromUnit} -> ${page.toUnit}`,
      searchText: normalizeSearchTextServer(
        [
          page.fromName,
          page.toName,
          page.fromUnit,
          page.toUnit,
          page.slug,
        ].join(" ")
      ),
    }));

  const categories = secondaryCategoryPages.map((page) => ({
    id: page.category,
    href: `/kategoriler/${page.slug}`,
    title: page.title,
    description: page.description,
    iconName: getCategoryIconName(page.category),
  }));

  const tools = [
    {
      id: "ayakkabi",
      href: "/ayakkabi-numarasi-cevirme",
      title: "Ayakkabı Numarası Çevirici",
      description:
        "TR/AB, ABD ve İngiltere ayakkabı numaralarını marka bazlı tablolarla çevirin.",
      iconName: "shoeSize" as const,
    },
    {
      id: "mutfak",
      href: "/mutfak-olculeri-cevirici",
      title: "Mutfak Ölçüleri Çevirici",
      description:
        "Bardak, yemek kaşığı ve çay kaşığının gram karşılığını malzemeye göre hesaplayın.",
      iconName: "kitchenMeasures" as const,
    },
    {
      id: "tarif",
      href: "/tarif-cevirici",
      title: "Tarif Çevirici",
      description:
        "Tarifini yapıştır, çarpanı seç: tüm malzeme miktarları ölçeklenir ve gram karşılıkları otomatik hesaplanır.",
      iconName: "recipe" as const,
    },
    {
      id: "yuzuk",
      href: "/yuzuk-olcusu-cevirici",
      title: "Yüzük Ölçüsü Çevirici",
      description:
        "Yüzük ölçüsünü TR, Avrupa, ABD ve İngiltere sistemleri arasında çevirin.",
      iconName: "ringSize" as const,
    },
  ];

  return (
    <OtherCategoriesPage
      conversions={conversions}
      categories={categories}
      tools={tools}
      locale="tr"
      alternateLink={{
        href: "/en/other-conversions",
        hrefLang: "en",
        label: "View the English version",
      }}
    />
  );
}
