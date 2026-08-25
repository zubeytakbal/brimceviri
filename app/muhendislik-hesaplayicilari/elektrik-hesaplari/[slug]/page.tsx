import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KwToAmpPage from "../../../components/calculators/KwToAmpPage";
import AmpToKwPage from "../../../components/calculators/AmpToKwPage";
import VoltageDropPage from "../../../components/calculators/VoltageDropPage";
import CableSizePage from "../../../components/calculators/CableSizePage";
import MotorCurrentPage from "../../../components/calculators/MotorCurrentPage";
import PlannedElectricalCalculatorPage from "../../../components/PlannedElectricalCalculatorPage";
import {
  getElectricalCalculatorByLocalizedSlug,
  getElectricalCalculatorPath,
  getElectricalStaticParams,
  isLiveElectricalCalculator,
} from "../../../converter/engineeringHubs";
import { SITE_NAME, buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getElectricalStaticParams("tr");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getElectricalCalculatorByLocalizedSlug("tr", slug);

  if (!item) {
    return {
      title: "Sayfa bulunamadi",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${item.titles.tr} | ${SITE_NAME}`,
    description: item.descriptions.tr,
    robots: {
      index: isLiveElectricalCalculator(item.sourceSlug),
      follow: true,
    },
    alternates: {
      canonical: getElectricalCalculatorPath("tr", item.sourceSlug) ?? undefined,
      languages: {
        tr: getElectricalCalculatorPath("tr", item.sourceSlug) ?? undefined,
        en: getElectricalCalculatorPath("en", item.sourceSlug) ?? undefined,
        de: getElectricalCalculatorPath("de", item.sourceSlug) ?? undefined,
      },
    },
    openGraph: {
      title: item.titles.tr,
      description: item.descriptions.tr,
      url: buildSiteUrl(
        getElectricalCalculatorPath("tr", item.sourceSlug) ?? "/"
      ),
      siteName: SITE_NAME,
      locale: "tr_TR",
      type: "website",
    },
  };
}

export default async function TurkishPlannedElectricalCalculatorPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const item = getElectricalCalculatorByLocalizedSlug("tr", slug);

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
          name: "Ana Sayfa",
          item: buildSiteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Elektrik Hesaplari",
          item: buildSiteUrl(
            "/muhendislik-hesaplayicilari/elektrik-hesaplari"
          ),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.tr,
          item: buildSiteUrl(
            getElectricalCalculatorPath("tr", item.sourceSlug) ?? "/"
          ),
        },
      ],
    };

    return (
      <KwToAmpPage
        locale="tr"
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
          name: "Ana Sayfa",
          item: buildSiteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Elektrik Hesaplari",
          item: buildSiteUrl(
            "/muhendislik-hesaplayicilari/elektrik-hesaplari"
          ),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.tr,
          item: buildSiteUrl(
            getElectricalCalculatorPath("tr", item.sourceSlug) ?? "/"
          ),
        },
      ],
    };

    return (
      <AmpToKwPage
        locale="tr"
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
          name: "Ana Sayfa",
          item: buildSiteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Elektrik Hesaplari",
          item: buildSiteUrl(
            "/muhendislik-hesaplayicilari/elektrik-hesaplari"
          ),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.tr,
          item: buildSiteUrl(
            getElectricalCalculatorPath("tr", item.sourceSlug) ?? "/"
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
      <VoltageDropPage locale="tr" structuredData={structuredData} />
    ) : (
      <CableSizePage locale="tr" structuredData={structuredData} />
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
          name: "Ana Sayfa",
          item: buildSiteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Elektrik Hesaplari",
          item: buildSiteUrl(
            "/muhendislik-hesaplayicilari/elektrik-hesaplari"
          ),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.titles.tr,
          item: buildSiteUrl(
            getElectricalCalculatorPath("tr", item.sourceSlug) ?? "/"
          ),
        },
      ],
    };

    return (
      <MotorCurrentPage
        locale="tr"
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
      locale="tr"
      sourceSlug={item.sourceSlug}
    />
  );
}
