import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import HeatConductionPage from "../../../components/calculators/HeatConductionPage";
import HeatEnergyPage from "../../../components/calculators/HeatEnergyPage";
import HydrostaticPressurePage from "../../../components/calculators/HydrostaticPressurePage";
import OhmsLawPage from "../../../components/calculators/OhmsLawPage";
import PressureForceAreaPage from "../../../components/calculators/PressureForceAreaPage";
import ReynoldsNumberPage from "../../../components/calculators/ReynoldsNumberPage";
import { findEnglishCalculatorPageByTurkishSlug } from "../../../converter/localizedCalculatorPages";
import {
  findGermanCalculatorPage,
  germanCalculatorPages,
} from "../../../converter/localizedGermanCalculatorPages";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type CalculatorRenderer = (structuredData: ReactElement) => ReactElement;

const calculatorRenderers: Record<string, CalculatorRenderer> = {
  "basinc-kuvvet-alan": (structuredData) => (
    <PressureForceAreaPage locale="de" structuredData={structuredData} />
  ),
  "hidrostatik-basinc": (structuredData) => (
    <HydrostaticPressurePage locale="de" structuredData={structuredData} />
  ),
  "isi-enerjisi": (structuredData) => (
    <HeatEnergyPage locale="de" structuredData={structuredData} />
  ),
  "isi-iletimi": (structuredData) => (
    <HeatConductionPage locale="de" structuredData={structuredData} />
  ),
  "reynolds-sayisi": (structuredData) => (
    <ReynoldsNumberPage locale="de" structuredData={structuredData} />
  ),
  "ohm-yasasi": (structuredData) => (
    <OhmsLawPage locale="de" structuredData={structuredData} />
  ),
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return germanCalculatorPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const germanPage = findGermanCalculatorPage(slug);

  if (!germanPage) {
    return {
      title: "Rechner nicht gefunden",
    };
  }

  const englishPage = findEnglishCalculatorPageByTurkishSlug(
    germanPage.sourceSlug
  );

  return {
    title: germanPage.title,
    description: germanPage.description,
    alternates: {
      canonical: `/de/rechner/${germanPage.slug}`,
      languages: {
        tr: `/hesaplayicilar/${germanPage.sourceSlug}`,
        en: englishPage
          ? `/en/calculators/${englishPage.slug}`
          : "/en/engineering-calculators",
        de: `/de/rechner/${germanPage.slug}`,
        "x-default": `/hesaplayicilar/${germanPage.sourceSlug}`,
      },
    },
    openGraph: {
      title: germanPage.title,
      description: germanPage.description,
      url: buildSiteUrl(`/de/rechner/${germanPage.slug}`),
      siteName: "BirimCeviri.app",
      locale: "de_DE",
      type: "article",
    },
  };
}

export default async function GermanCalculatorPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const germanPage = findGermanCalculatorPage(slug);

  if (!germanPage) {
    notFound();
  }

  const renderer = calculatorRenderers[germanPage.sourceSlug];

  if (!renderer) {
    notFound();
  }

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
        name: germanPage.title,
        item: buildSiteUrl(`/de/rechner/${germanPage.slug}`),
      },
    ],
  };

  return renderer(
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(breadcrumbSchema),
      }}
    />
  );
}
