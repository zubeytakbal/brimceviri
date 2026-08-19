import type { Metadata } from "next";
import OtherCategoriesPage from "../components/OtherCategoriesPage";
import { categoryPages } from "../converter/categoryPages";
import { conversionPages } from "../converter/conversionPages";
import { homeCategoryOrder } from "../converter/homeCategoryOrder";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Diğer Dönüşümler",
  description:
    "Yoğunluk, kuvvet, tork, momentum ve viskozite gibi ana sayfada yer almayan mühendislik ve bilim birim kategorilerini keşfedin.",
  alternates: {
    canonical: "/diger-donusumler",
  },
  openGraph: {
    title: "Diğer Dönüşümler",
    description:
      "Yoğunluk, kuvvet, tork, momentum ve viskozite gibi mühendislik ve bilim birim kategorilerini keşfedin.",
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
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
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
      label: `${page.fromName} → ${page.toName}`,
      description: `${page.fromUnit} → ${page.toUnit}`,
      searchText: normalizeSearchTextServer(
        [page.fromName, page.toName, page.fromUnit, page.toUnit, page.slug].join(
          " "
        )
      ),
    }));

  const categories = secondaryCategoryPages.map((page) => ({
    id: page.category,
    href: `/kategoriler/${page.slug}`,
    title: page.title,
    description: page.description,
  }));

  return (
    <OtherCategoriesPage
      conversions={conversions}
      categories={categories}
    />
  );
}
