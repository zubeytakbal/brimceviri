import type { Metadata } from "next";
import OtherCategoriesPage from "../../components/OtherCategoriesPage";
import {
  getCategoryIconName,
  type SiteIconName,
} from "../../components/siteIcons";
import { homeCategoryOrder } from "../../converter/homeCategoryOrder";
import { germanCategoryPages } from "../../converter/localizedGermanCategoryPages";
import { germanConversionPages } from "../../converter/localizedGermanConversionPages";
import { germanStandaloneTools } from "../../i18n/germanStandaloneTools";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Weitere Umrechnungen",
  description:
    "Entdecken Sie technische Kategorien wie Dichte, Kraft, Drehmoment, Impuls und Viskositaet ausserhalb der Hauptgruppen.",
  alternates: {
    canonical: "/de/weitere-umrechnungen",
    languages: {
      tr: "/diger-donusumler",
      en: "/en/other-conversions",
      de: "/de/weitere-umrechnungen",
      "x-default": "/diger-donusumler",
    },
  },
  openGraph: {
    title: "Weitere Umrechnungen",
    description:
      "Entdecken Sie Dichte, Kraft, Drehmoment, Impuls, Viskositaet und weitere technische Umrechnungen.",
    url: buildSiteUrl("/de/weitere-umrechnungen"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

function normalizeSearchTextServer(value: string) {
  return value
    .toLocaleLowerCase("de-DE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export default function GermanOtherConversionsPage() {
  const secondaryCategoryPages = germanCategoryPages.filter(
    (page) =>
      !(homeCategoryOrder as readonly string[]).includes(page.category)
  );

  const secondaryCategorySet = new Set(
    secondaryCategoryPages.map((page) => page.category)
  );

  const conversions = germanConversionPages
    .filter((page) => secondaryCategorySet.has(page.category))
    .map((page) => ({
      id: page.slug,
      href: `/de/${page.slug}`,
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
    href: `/de/kategorien/${page.slug}`,
    title: page.title,
    description: page.description,
    iconName: getCategoryIconName(page.category) as SiteIconName,
  }));

  const tools = [
    {
      id: "schuh",
      href: "/de/schuhgroessen-umrechner",
      title: "Schuhgroessen Umrechner",
      description:
        "Vergleichen Sie EU-, US- und UK-Schuhgroessen mit allgemeinen und markenbezogenen Tabellen.",
      iconName: "shoeSize" as const,
    },
    {
      id: "kueche",
      href: "/de/kuechenmass-umrechner",
      title: "Kuechenmass Umrechner",
      description:
        "Rechnen Sie Tassen, Essloeffel und Teeloeffel per Zutat in Gramm um.",
      iconName: "kitchenMeasures" as const,
    },
    {
      id: "rezept",
      href: "/de/rezept-umrechner",
      title: "Rezept Umrechner",
      description:
        "Skalieren Sie ein Rezept und erhalten Sie passende Grammwerte fuer erkannte Zutaten.",
      iconName: "recipe" as const,
    },
    {
      id: "ring",
      href: "/de/ringgroessen-umrechner",
      title: "Ringgroessen Umrechner",
      description:
        "Vergleichen Sie Durchmesser, Umfang sowie US- und UK-Ringgroessen.",
      iconName: "ringSize" as const,
    },
    ...germanStandaloneTools.map((tool) => ({
      id: tool.slug,
      href: tool.germanPath,
      title: tool.title,
      description: tool.cardDescription,
      iconName: tool.iconName as SiteIconName,
    })),
  ];

  return (
    <OtherCategoriesPage
      conversions={conversions}
      categories={categories}
      tools={tools}
      locale="de"
      alternateLink={{
        href: "/en/other-conversions",
        hrefLang: "en",
        label: "Englische Version ansehen",
      }}
    />
  );
}
