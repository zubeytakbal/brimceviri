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
    "Entdecken Sie technische Kategorien wie Dichte, Kraft, Drehmoment, Impuls und Viskosität außerhalb der Hauptgruppen.",
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
      "Entdecken Sie Dichte, Kraft, Drehmoment, Impuls, Viskosität und weitere technische Umrechnungen.",
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
      title: "Schuhgrößen Umrechner",
      description:
        "Vergleichen Sie EU-, US- und UK-Schuhgrößen mit allgemeinen und markenbezogenen Tabellen.",
      iconName: "shoeSize" as const,
    },
    {
      id: "kueche",
      href: "/de/kuechenmass-umrechner",
      title: "Küchenmaß Umrechner",
      description:
        "Rechnen Sie Tassen, Esslöffel und Teelöffel per Zutat in Gramm um.",
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
      title: "Ringgrößen Umrechner",
      description:
        "Vergleichen Sie Durchmesser, Umfang sowie US- und UK-Ringgrößen.",
      iconName: "ringSize" as const,
    },
    ...germanStandaloneTools.map((tool) => ({
      id: tool.slug,
      href: tool.germanPath,
      title: tool.title,
      description: tool.cardDescription,
      iconName: tool.iconName as SiteIconName,
    })),
    {
      id: "werkstoffeigenschaften",
      href: "/de/werkstoffeigenschaften",
      title: "Werkstoffeigenschaften (Dichte, Wärmeleitfähigkeit...)",
      description:
        "Über 100 Metalle, Flüssigkeiten, Kunststoffe, Holzarten und Baumaterialien — Dichte und technische Eigenschaften ansehen, mit Live-Umrechner.",
      iconName: "materialsHubCalculator" as const,
      group: "Technische Referenztools",
    },
    {
      id: "chemische-verbindungen",
      href: "/de/chemische-verbindungen",
      title: "Chemische Verbindungen (Molare Masse)",
      description:
        "Molare Masse und atomare Zusammensetzung gängiger chemischer Verbindungen ansehen und eigene Stoffmengenberechnungen durchführen.",
      iconName: "chemistryCalculator" as const,
      group: "Technische Referenztools",
    },
    {
      id: "materialgewicht",
      href: "/de/materialgewicht-berechnen",
      title: "Tabelle der Materialdichten und Gewichtsberechnung",
      description:
        "Material auswählen und aus dem Volumen das Gewicht berechnen, oder umgekehrt.",
      iconName: "materialWeightCalculator" as const,
      group: "Technische Referenztools",
    },
    {
      id: "periodensystem",
      href: "/de/periodensystem",
      title: "Periodensystem (Alle 118 Elemente)",
      description:
        "Ordnungszahl, Atommasse und Kategorie jedes Elements ansehen, mit Stoffmengenrechner auf jeder Elementseite.",
      iconName: "chemistryCalculator" as const,
      group: "Technische Referenztools",
    },
    {
      id: "elementrangliste",
      href: "/de/elementrangliste",
      title: "Elementrangliste (Schwerste/Leichteste)",
      description:
        "Alle 118 Elemente nach Atommasse, Ordnungszahl oder Name sortieren.",
      iconName: "chemistryCalculator" as const,
      group: "Technische Referenztools",
    },
    {
      id: "atommasse-berechnen",
      href: "/de/atommasse-berechnen",
      title: "Atommasse berechnen",
      description:
        "Aus Isotopmassen und natürlichen Häufigkeiten die durchschnittliche Atommasse berechnen.",
      iconName: "chemistryCalculator" as const,
      group: "Technische Referenztools",
    },
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
