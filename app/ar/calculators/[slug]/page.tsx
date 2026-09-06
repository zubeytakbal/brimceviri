import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeatConductionPage from "../../../components/calculators/HeatConductionPage";
import HeatEnergyPage from "../../../components/calculators/HeatEnergyPage";
import HydrostaticPressurePage from "../../../components/calculators/HydrostaticPressurePage";
import OhmsLawPage from "../../../components/calculators/OhmsLawPage";
import PressureForceAreaPage from "../../../components/calculators/PressureForceAreaPage";
import ReynoldsNumberPage from "../../../components/calculators/ReynoldsNumberPage";
import { englishCalculatorPages } from "../../../converter/localizedCalculatorPages";
import { germanCalculatorPages } from "../../../converter/localizedGermanCalculatorPages";
import { buildSiteUrl } from "../../../siteConfig";
import { buildArabicMetadata } from "../../seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const arabicCalculatorCopy = {
  "pressure-force-area": {
    title: "حاسبة الضغط والقوة والمساحة",
    description:
      "احسب الضغط أو القوة أو المساحة مع واجهة عربية وروابط SEO مهيأة للمسار العربي.",
    breadcrumbName: "حاسبة الضغط والقوة والمساحة",
  },
  "hydrostatic-pressure": {
    title: "حاسبة الضغط الهيدروستاتيكي",
    description:
      "احسب فرق الضغط الهيدروستاتيكي أو الكثافة أو العمق أو عجلة الجاذبية داخل المسار العربي.",
    breadcrumbName: "حاسبة الضغط الهيدروستاتيكي",
  },
  "heat-energy": {
    title: "حاسبة الطاقة الحرارية",
    description:
      "احسب الطاقة الحرارية أو الكتلة أو الحرارة النوعية أو فرق الحرارة بواجهة عربية.",
    breadcrumbName: "حاسبة الطاقة الحرارية",
  },
  "heat-conduction": {
    title: "حاسبة التوصيل الحراري",
    description:
      "احسب معدل انتقال الحرارة أو الموصلية أو المساحة أو السمك داخل الصفحة العربية.",
    breadcrumbName: "حاسبة التوصيل الحراري",
  },
  "reynolds-number": {
    title: "حاسبة عدد رينولدز",
    description:
      "احسب عدد رينولدز أو السرعة أو القطر المميز مع تجربة عربية متوافقة مع SEO.",
    breadcrumbName: "حاسبة عدد رينولدز",
  },
  "ohms-law": {
    title: "حاسبة قانون أوم",
    description:
      "احسب الجهد أو التيار أو المقاومة مع واجهة عربية على مسار `/ar/calculators`.",
    breadcrumbName: "حاسبة قانون أوم",
  },
} as const;

type ArabicCalculatorSlug = keyof typeof arabicCalculatorCopy;

export const dynamicParams = false;

export function generateStaticParams() {
  return englishCalculatorPages.map((page) => ({
    slug: page.slug,
  }));
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const englishPage = englishCalculatorPages.find(
    (page) => page.slug === slug
  );

  if (!englishPage) {
    return {
      title: "الصفحة غير موجودة",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const arabicCopy =
    arabicCalculatorCopy[slug as ArabicCalculatorSlug];
  const germanPage = germanCalculatorPages.find(
    (page) => page.sourceSlug === englishPage.sourceSlug
  );

  return buildArabicMetadata({
    title: arabicCopy.title,
    description: arabicCopy.description,
    path: `/ar/calculators/${slug}`,
    turkishPath: `/hesaplayicilar/${englishPage.sourceSlug}`,
    englishPath: `/en/calculators/${englishPage.slug}`,
    germanPath: germanPage
      ? `/de/rechner/${germanPage.slug}`
      : undefined,
  });
}

export default async function ArabicCalculatorPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const englishPage = englishCalculatorPages.find(
    (page) => page.slug === slug
  );

  if (!englishPage) {
    notFound();
  }

  const arabicCopy =
    arabicCalculatorCopy[slug as ArabicCalculatorSlug];
  const structuredData = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "الرئيسية",
              item: buildSiteUrl("/ar"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "الحاسبات",
              item: buildSiteUrl("/ar/engineering-calculators"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: arabicCopy.breadcrumbName,
              item: buildSiteUrl(`/ar/calculators/${slug}`),
            },
          ],
        }),
      }}
    />
  );

  switch (slug) {
    case "pressure-force-area":
      return (
        <PressureForceAreaPage
          locale="ar"
          structuredData={structuredData}
        />
      );
    case "hydrostatic-pressure":
      return (
        <HydrostaticPressurePage
          locale="ar"
          structuredData={structuredData}
        />
      );
    case "heat-energy":
      return (
        <HeatEnergyPage
          locale="ar"
          structuredData={structuredData}
        />
      );
    case "heat-conduction":
      return (
        <HeatConductionPage
          locale="ar"
          structuredData={structuredData}
        />
      );
    case "reynolds-number":
      return (
        <ReynoldsNumberPage
          locale="ar"
          structuredData={structuredData}
        />
      );
    case "ohms-law":
      return (
        <OhmsLawPage
          locale="ar"
          structuredData={structuredData}
        />
      );
    default:
      notFound();
  }
}
