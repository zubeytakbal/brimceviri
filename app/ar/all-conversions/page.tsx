import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { arabicStandaloneTools } from "../../i18n/arabicStandaloneTools";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "كل التحويلات",
  description:
    "بوابة عربية تجمع أدوات التحويل والحسابات العملية، مع وصول سريع إلى مكتبات الوحدات والتحويلات المتاحة حاليا داخل الموقع.",
  path: "/ar/all-conversions",
  turkishPath: "/tum-birimler",
  englishPath: "/en/all-conversions",
  germanPath: "/de/alle-umrechnungen",
});

const primaryLibraries = [
  {
    href: "/ar/categories/length",
    title: "تحويلات الطول",
    description: "المتر والكيلومتر والسنتيمتر والقدم والبوصة والميل وغيرها.",
  },
  {
    href: "/ar/categories/mass",
    title: "تحويلات الكتلة",
    description: "الكيلوغرام والغرام والطن والرطل والأونصة ووحدات تاريخية مختارة.",
  },
  {
    href: "/ar/categories/pressure",
    title: "تحويلات الضغط",
    description: "Pascal وkPa وbar وPSI وmmHg ووحدات هندسية مرتبطة.",
  },
  {
    href: "/ar/categories/area",
    title: "تحويلات المساحة",
    description: "المتر المربع والهكتار والقدم المربع ووحدات الأراضي الشائعة.",
  },
  {
    href: "/ar/categories/volume",
    title: "تحويلات الحجم",
    description: "اللتر والملليلتر والمتر المكعب ووحدات السعة اليومية والتقنية.",
  },
  {
    href: "/ar/categories/temperature",
    title: "تحويلات الحرارة",
    description: "سيلسيوس وفهرنهايت وكلفن مع الصيغ الأساسية بين المقاييس.",
  },
  {
    href: "/ar/categories/speed",
    title: "تحويلات السرعة",
    description: "كم/س وم/ث وmph ووحدات مستخدمة في النقل والهندسة.",
  },
  {
    href: "/ar/categories/data-storage",
    title: "تحويلات تخزين البيانات",
    description: "بايت وكيلوبايت وميغابايت وغيغابايت مع الفرق بين 1000 و1024.",
  },
];

export default function ArabicAllConversionsPage() {
  const highlightedTools = arabicStandaloneTools
    .slice()
    .sort((left, right) => right.priority - left.priority)
    .slice(0, 8);

  return (
    <StaticPageLayout
      locale="ar"
      breadcrumbAriaLabel="مسار التنقل"
      breadcrumbs={[
        { href: "/ar", label: "الرئيسية" },
        { label: "كل التحويلات" },
      ]}
      title="كل التحويلات"
      description="هذه الصفحة تجمع المسارات الأهم داخل الموقع: الأدوات الجاهزة بالعربية، ومكتبات التحويل الواسعة، والدخول السريع إلى أدلة الوحدات."
      alternateLink={{
        href: "/tum-birimler",
        hrefLang: "tr",
        label: "عرض النسخة التركية",
      }}
      sections={[
        {
          heading: "أدوات متاحة مباشرة بالعربية",
          content: (
            <ul className="related-conversion-list">
              {highlightedTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={tool.arabicPath}>
                    <strong>{tool.title}</strong>
                    {" - "}
                    {tool.cardDescription}
                  </Link>
                </li>
              ))}
            </ul>
          ),
        },
        {
          heading: "مكتبات التحويل الأساسية",
          content: (
            <>
              <p>
                التحويلات التفصيلية الكاملة داخل الموقع متاحة حاليا
                عبر المكتبات التالية. اختر المجال الأقرب لما تبحث
                عنه ثم انتقل إلى صفحة التحويل المناسبة.
              </p>
              <ul className="related-conversion-list">
                {primaryLibraries.map((library) => (
                  <li key={library.href}>
                    <Link href={library.href}>
                      <strong>{library.title}</strong>
                      {" - "}
                      {library.description}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          heading: "مسارات مفيدة مرتبطة",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/ar/unit-guides">دليل الوحدات</Link>
              </li>
              <li>
                <Link href="/ar/historical-units">وحدات القياس التاريخية</Link>
              </li>
              <li>
                <Link href="/ar/other-conversions">أدوات إضافية</Link>
              </li>
              <li>
                <Link href="/ar/all-conversions">مكتبة التحويل الكاملة بالعربية</Link>
              </li>
            </ul>
          ),
        },
        {
          heading: "كيف تستخدم هذه الصفحة؟",
          content: (
            <>
              <p>
                إذا كنت تريد أداة جاهزة بالعربية اليوم، ابدأ من
                القسم الأول. وإذا كنت تبحث عن مكتبة تحويل أوسع
                حسب الفئة، فالقسم الثاني هو الطريق الأسرع.
              </p>
              <p>
                بهذه الطريقة تبقى الواجهة العربية منظمة وواضحة من
                دون كسر الوصول إلى المحتوى الأوسع الموجود بالفعل
                داخل الموقع.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
