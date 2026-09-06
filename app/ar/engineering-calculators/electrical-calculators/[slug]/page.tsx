import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AmpToKwPage from "../../../../components/calculators/AmpToKwPage";
import CableSizePage from "../../../../components/calculators/CableSizePage";
import KwToAmpPage from "../../../../components/calculators/KwToAmpPage";
import MotorCurrentPage from "../../../../components/calculators/MotorCurrentPage";
import VoltageDropPage from "../../../../components/calculators/VoltageDropPage";
import {
  getElectricalCalculatorByLocalizedSlug,
  getElectricalCalculatorPath,
  getElectricalStaticParams,
  isLiveElectricalCalculator,
} from "../../../../converter/engineeringHubs";
import { buildSiteUrl } from "../../../../siteConfig";
import { buildArabicMetadata } from "../../../seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const arabicElectricalCopy = {
  "kw-to-amper-hesaplama": {
    title: "تحويل kW إلى أمبير",
    description:
      "احسب تيار الخط من القدرة والجهد ومعامل القدرة والكفاءة داخل الصفحة العربية.",
  },
  "amper-to-kw-hesaplama": {
    title: "تحويل أمبير إلى kW",
    description:
      "احسب القدرة التقريبية من التيار والجهد ضمن مسار الحاسبات الكهربائية العربي.",
  },
  "gerilim-dusumu-hesaplama": {
    title: "حاسبة هبوط الجهد",
    description:
      "احسب هبوط الجهد ونسبته والجهد عند نهاية الخط بواجهة عربية.",
  },
  "kablo-kesiti-hesaplama": {
    title: "حاسبة مقطع الكابل",
    description:
      "احسب الحد الأدنى لمقطع الموصل مع توصية بالمقطع القياسي داخل المسار العربي.",
  },
  "motor-akimi-hesaplama": {
    title: "حاسبة تيار المحرك",
    description:
      "احسب تيار الحمل الكامل وتيار التصميم للمحرك بواجهة عربية.",
  },
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return getElectricalStaticParams("ar");
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getElectricalCalculatorByLocalizedSlug("ar", slug);

  if (!item) {
    return {
      title: "الصفحة غير موجودة",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const arabicCopy =
    arabicElectricalCopy[
      item.sourceSlug as keyof typeof arabicElectricalCopy
    ];

  return {
    ...buildArabicMetadata({
      title: arabicCopy?.title ?? item.titles.en,
      description: arabicCopy?.description ?? item.descriptions.en,
      path: `/ar/engineering-calculators/electrical-calculators/${slug}`,
      turkishPath:
        getElectricalCalculatorPath("tr", item.sourceSlug) ??
        "/muhendislik-hesaplayicilari/elektrik-hesaplari",
      englishPath:
        getElectricalCalculatorPath("en", item.sourceSlug) ?? undefined,
      germanPath:
        getElectricalCalculatorPath("de", item.sourceSlug) ?? undefined,
    }),
    robots: {
      index: isLiveElectricalCalculator(item.sourceSlug),
      follow: true,
    },
  };
}

export default async function ArabicElectricalCalculatorPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const item = getElectricalCalculatorByLocalizedSlug("ar", slug);

  if (!item || !isLiveElectricalCalculator(item.sourceSlug)) {
    notFound();
  }

  const title =
    arabicElectricalCopy[
      item.sourceSlug as keyof typeof arabicElectricalCopy
    ]?.title ?? item.titles.en;

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
              name: "الحاسبات الهندسية",
              item: buildSiteUrl("/ar/engineering-calculators"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "الحاسبات الكهربائية",
              item: buildSiteUrl(
                "/ar/engineering-calculators/electrical-calculators"
              ),
            },
            {
              "@type": "ListItem",
              position: 4,
              name: title,
              item: buildSiteUrl(
                `/ar/engineering-calculators/electrical-calculators/${slug}`
              ),
            },
          ],
        }),
      }}
    />
  );

  switch (item.sourceSlug) {
    case "kw-to-amper-hesaplama":
      return <KwToAmpPage locale="ar" structuredData={structuredData} />;
    case "amper-to-kw-hesaplama":
      return <AmpToKwPage locale="ar" structuredData={structuredData} />;
    case "gerilim-dusumu-hesaplama":
      return <VoltageDropPage locale="ar" structuredData={structuredData} />;
    case "kablo-kesiti-hesaplama":
      return <CableSizePage locale="ar" structuredData={structuredData} />;
    case "motor-akimi-hesaplama":
      return <MotorCurrentPage locale="ar" structuredData={structuredData} />;
    default:
      notFound();
  }
}
