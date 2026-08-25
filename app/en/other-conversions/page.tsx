import type { Metadata } from "next";
import OtherCategoriesPage from "../../components/OtherCategoriesPage";
import { getCategoryIconName } from "../../components/siteIcons";
import { homeCategoryOrder } from "../../converter/homeCategoryOrder";
import { englishCategoryPages } from "../../converter/localizedCategoryPages";
import { englishConversionPages } from "../../converter/localizedConversionPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Other Conversions",
  description:
    "Explore engineering and scientific conversion categories that sit outside the main homepage groups, including density, force, torque, momentum and viscosity.",
  alternates: {
    canonical: "/en/other-conversions",
    languages: {
      tr: "/diger-donusumler",
      en: "/en/other-conversions",
      "x-default": "/diger-donusumler",
    },
  },
  openGraph: {
    title: "Other Conversions",
    description:
      "Explore density, force, torque, momentum, viscosity and other technical conversion categories.",
    url: buildSiteUrl("/en/other-conversions"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Other Conversions | BirimCeviri.app",
    description:
      "Explore density, force, torque, momentum, viscosity and other technical conversion categories.",
  },
};

function normalizeSearchTextServer(value: string) {
  return value
    .toLocaleLowerCase("en-US")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export default function EnglishOtherConversionsPage() {
  const secondaryCategoryPages = englishCategoryPages.filter(
    (page) =>
      !(homeCategoryOrder as readonly string[]).includes(page.category)
  );

  const secondaryCategorySet = new Set(
    secondaryCategoryPages.map((page) => page.category)
  );

  const conversions = englishConversionPages
    .filter((page) => secondaryCategorySet.has(page.category))
    .map((page) => ({
      id: page.slug,
      href: `/en/${page.slug}`,
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
    href: `/en/categories/${page.slug}`,
    title: page.title,
    description: page.description,
    iconName: getCategoryIconName(page.category),
  }));

  const tools = [
    {
      id: "ayakkabi",
      href: "/en/shoe-size-converter",
      title: "Shoe Size Converter",
      description:
        "Convert shoe sizes between EU, US and UK systems with brand-based size tables.",
      iconName: "shoeSize" as const,
    },
    {
      id: "mutfak",
      href: "/en/kitchen-measurement-converter",
      title: "Kitchen Measurement Converter",
      description:
        "Convert cups, tablespoons and teaspoons to grams by ingredient density.",
      iconName: "kitchenMeasures" as const,
    },
    {
      id: "tarif",
      href: "/en/recipe-converter",
      title: "Recipe Converter",
      description:
        "Paste your recipe, pick a multiplier, and get every amount scaled with automatic gram equivalents.",
      iconName: "recipe" as const,
    },
    {
      id: "yuzuk",
      href: "/en/ring-size-converter",
      title: "Ring Size Converter",
      description:
        "Convert ring sizes between diameter (mm), European, US and UK systems.",
      iconName: "ringSize" as const,
    },
  ];

  return (
    <OtherCategoriesPage
      conversions={conversions}
      categories={categories}
      tools={tools}
      locale="en"
      alternateLink={{
        href: "/diger-donusumler",
        hrefLang: "tr",
        label: "View the Turkish version",
      }}
    />
  );
}
