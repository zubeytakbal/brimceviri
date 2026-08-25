import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KwToAmpPage from "../../../../components/calculators/KwToAmpPage";
import AmpToKwPage from "../../../../components/calculators/AmpToKwPage";
import VoltageDropPage from "../../../../components/calculators/VoltageDropPage";
import CableSizePage from "../../../../components/calculators/CableSizePage";
import MotorCurrentPage from "../../../../components/calculators/MotorCurrentPage";
import PlannedElectricalCalculatorPage from "../../../../components/PlannedElectricalCalculatorPage";
import {
  getElectricalCalculatorByLocalizedSlug,
  getElectricalCalculatorPath,
  getElectricalStaticParams,
  isLiveElectricalCalculator,
} from "../../../../converter/engineeringHubs";
import { SITE_NAME, buildSiteUrl } from "../../../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getElectricalStaticParams("de");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getElectricalCalculatorByLocalizedSlug("de", slug);

  if (!item) {
    return {
      title: "Seite nicht gefunden",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${item.titles.de} | ${SITE_NAME}`,
    description: item.descriptions.de,
    robots: {
      index: isLiveElectricalCalculator(item.sourceSlug),
      follow: true,
    },
    alternates: {
      canonical: getElectricalCalculatorPath("de", item.sourceSlug) ?? undefined,
      languages: {
        tr: getElectricalCalculatorPath("tr", item.sourceSlug) ?? undefined,
        en: getElectricalCalculatorPath("en", item.sourceSlug) ?? undefined,
        de: getElectricalCalculatorPath("de", item.sourceSlug) ?? undefined,
      },
    },
    openGraph: {
      title: item.titles.de,
      description: item.descriptions.de,
      url: buildSiteUrl(
        getElectricalCalculatorPath("de", item.sourceSlug) ?? "/de"
      ),
      siteName: SITE_NAME,
      locale: "de_DE",
      type: "website",
    },
  };
}

export default async function GermanPlannedElectricalCalculatorPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const item = getElectricalCalculatorByLocalizedSlug("de", slug);

  if (!item) {
    notFound();
  }

  if (item.sourceSlug === "kw-to-amper-hesaplama") {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Startseite",
          item: buildSiteUrl("/de"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Elektrorechner",
          item: buildSiteUrl("/de/ingenieurrechner/elektrorechner"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.de,
          item: buildSiteUrl(
            getElectricalCalculatorPath("de", item.sourceSlug) ?? "/de"
          ),
        },
      ],
    };

    return (
      <KwToAmpPage
        locale="de"
        structuredData={
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbSchema).replace(
                /</g,
                "\\u003c"
              ),
            }}
          />
        }
      />
    );
  }

  if (item.sourceSlug === "amper-to-kw-hesaplama") {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Startseite",
          item: buildSiteUrl("/de"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Elektrorechner",
          item: buildSiteUrl("/de/ingenieurrechner/elektrorechner"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.de,
          item: buildSiteUrl(
            getElectricalCalculatorPath("de", item.sourceSlug) ?? "/de"
          ),
        },
      ],
    };

    return (
      <AmpToKwPage
        locale="de"
        structuredData={
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbSchema).replace(
                /</g,
                "\\u003c"
              ),
            }}
          />
        }
      />
    );
  }

  if (
    item.sourceSlug === "gerilim-dusumu-hesaplama" ||
    item.sourceSlug === "kablo-kesiti-hesaplama"
  ) {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Startseite",
          item: buildSiteUrl("/de"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Elektrorechner",
          item: buildSiteUrl("/de/ingenieurrechner/elektrorechner"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.de,
          item: buildSiteUrl(
            getElectricalCalculatorPath("de", item.sourceSlug) ?? "/de"
          ),
        },
      ],
    };
    const structuredData = (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
    );

    return item.sourceSlug === "gerilim-dusumu-hesaplama" ? (
      <VoltageDropPage locale="de" structuredData={structuredData} />
    ) : (
      <CableSizePage locale="de" structuredData={structuredData} />
    );
  }

  if (item.sourceSlug === "motor-akimi-hesaplama") {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Startseite",
          item: buildSiteUrl("/de"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Elektrorechner",
          item: buildSiteUrl("/de/ingenieurrechner/elektrorechner"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.de,
          item: buildSiteUrl(
            getElectricalCalculatorPath("de", item.sourceSlug) ?? "/de"
          ),
        },
      ],
    };

    return (
      <MotorCurrentPage
        locale="de"
        structuredData={
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbSchema).replace(
                /</g,
                "\\u003c"
              ),
            }}
          />
        }
      />
    );
  }

  return (
    <PlannedElectricalCalculatorPage
      locale="de"
      sourceSlug={item.sourceSlug}
    />
  );
}
