import OtherCategoriesPage from "../../components/OtherCategoriesPage";
import { arabicStandaloneTools } from "../../i18n/arabicStandaloneTools";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "أدوات إضافية بالعربية",
  description:
    "استعرض الحاسبات والأدوات التي أصبحت متاحة بالعربية حاليا ضمن هذا القسم.",
  path: "/ar/other-conversions",
  turkishPath: "/diger-donusumler",
  englishPath: "/en/other-conversions",
  germanPath: "/de/weitere-umrechnungen",
});

export default function ArabicOtherConversionsPage() {
  return (
    <OtherCategoriesPage
      conversions={[]}
      categories={[]}
      locale="ar"
      alternateLink={{
        href: "/diger-donusumler",
        hrefLang: "tr",
        label: "عرض النسخة التركية الكاملة",
      }}
      tools={arabicStandaloneTools.map((tool) => ({
        id: tool.slug,
        href: tool.arabicPath,
        title: tool.title,
        description: tool.cardDescription,
        iconName: tool.iconName,
      }))}
    />
  );
}
