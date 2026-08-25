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
  return getElectricalStaticParams("en");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getElectricalCalculatorByLocalizedSlug("en", slug);

  if (!item) {
    return {
      title: "Page not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${item.titles.en} | ${SITE_NAME}`,
    description: item.descriptions.en,
    robots: {
      index: isLiveElectricalCalculator(item.sourceSlug),
      follow: true,
    },
    alternates: {
      canonical: getElectricalCalculatorPath("en", item.sourceSlug) ?? undefined,
      languages: {
        tr: getElectricalCalculatorPath("tr", item.sourceSlug) ?? undefined,
        en: getElectricalCalculatorPath("en", item.sourceSlug) ?? undefined,
        de: getElectricalCalculatorPath("de", item.sourceSlug) ?? undefined,
      },
    },
    openGraph: {
      title: item.titles.en,
      description: item.descriptions.en,
      url: buildSiteUrl(
        getElectricalCalculatorPath("en", item.sourceSlug) ?? "/en"
      ),
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function EnglishPlannedElectricalCalculatorPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const item = getElectricalCalculatorByLocalizedSlug("en", slug);

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
          name: "Home",
          item: buildSiteUrl("/en"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Electrical Calculators",
          item: buildSiteUrl(
            "/en/engineering-calculators/electrical-calculators"
          ),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.en,
          item: buildSiteUrl(
            getElectricalCalculatorPath("en", item.sourceSlug) ?? "/en"
          ),
        },
      ],
    };

    return (
      <KwToAmpPage
        locale="en"
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
          name: "Home",
          item: buildSiteUrl("/en"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Electrical Calculators",
          item: buildSiteUrl(
            "/en/engineering-calculators/electrical-calculators"
          ),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.en,
          item: buildSiteUrl(
            getElectricalCalculatorPath("en", item.sourceSlug) ?? "/en"
          ),
        },
      ],
    };

    return (
      <AmpToKwPage
        locale="en"
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
          name: "Home",
          item: buildSiteUrl("/en"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Electrical Calculators",
          item: buildSiteUrl(
            "/en/engineering-calculators/electrical-calculators"
          ),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.en,
          item: buildSiteUrl(
            getElectricalCalculatorPath("en", item.sourceSlug) ?? "/en"
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
      <VoltageDropPage locale="en" structuredData={structuredData} />
    ) : (
      <CableSizePage locale="en" structuredData={structuredData} />
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
          name: "Home",
          item: buildSiteUrl("/en"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Electrical Calculators",
          item: buildSiteUrl(
            "/en/engineering-calculators/electrical-calculators"
          ),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.en,
          item: buildSiteUrl(
            getElectricalCalculatorPath("en", item.sourceSlug) ?? "/en"
          ),
        },
      ],
    };

    return (
      <MotorCurrentPage
        locale="en"
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
      locale="en"
      sourceSlug={item.sourceSlug}
    />
  );
}
