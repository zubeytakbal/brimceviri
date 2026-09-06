import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "دليل الوحدات",
  description:
    "صفحة عربية للتعريف بوحدات القياس الأكثر استخداما، مع روابط مباشرة إلى أدلة الوحدات المتاحة ومكتباتها داخل الموقع.",
  path: "/ar/unit-guides",
  turkishPath: "/birimler",
  englishPath: "/en/units",
  germanPath: "/de/einheiten",
});

const keyGuides = [
  { href: "/ar/unit-guides/meter", label: "المتر (Meter)" },
  { href: "/ar/unit-guides/kilometer", label: "الكيلومتر (Kilometer)" },
  { href: "/ar/unit-guides/kilogram", label: "الكيلوغرام (Kilogram)" },
  { href: "/ar/unit-guides/gram", label: "الغرام (Gram)" },
  { href: "/ar/unit-guides/pascal", label: "الباسكال (Pascal)" },
  { href: "/ar/unit-guides/bar", label: "البار (Bar)" },
  { href: "/ar/unit-guides/psi", label: "PSI" },
  { href: "/ar/unit-guides/liter", label: "اللتر (Liter)" },
  { href: "/ar/unit-guides/celsius", label: "سيلسيوس (Celsius)" },
  { href: "/ar/unit-guides/volt", label: "الفولت (Volt)" },
  { href: "/ar/unit-guides/ampere", label: "الأمبير (Ampere)" },
  { href: "/ar/unit-guides/ohm", label: "الأوم (Ohm)" },
];

export default function ArabicUnitGuidesPage() {
  return (
    <StaticPageLayout
      locale="ar"
      breadcrumbAriaLabel="مسار التنقل"
      breadcrumbs={[
        { href: "/ar", label: "الرئيسية" },
        { label: "دليل الوحدات" },
      ]}
      title="دليل الوحدات"
      description="هنا نركز على فهم معنى الوحدة نفسها: رمزها، استخدامها، علاقتها بالنظام الدولي، وأين تظهر في الحياة اليومية أو العمل التقني."
      alternateLink={{
        href: "/birimler",
        hrefLang: "tr",
        label: "عرض النسخة التركية",
      }}
      sections={[
        {
          heading: "ما الذي يقدمه دليل الوحدات؟",
          content: (
            <>
              <p>
                صفحة التحويل تجيب عن سؤال: كم تساوي هذه القيمة بوحدة
                أخرى؟ أما دليل الوحدات فيجيب عن سؤال مختلف: ما هذه
                الوحدة أصلا، وأين تستخدم، وما رمزها، وما علاقتها
                بوحدات القياس الأخرى؟
              </p>
              <p>
                لهذا يفيد الدليل عندما تريد الفهم، لا مجرد الحصول
                على رقم محوّل.
              </p>
            </>
          ),
        },
        {
          heading: "أكثر أدلة الوحدات استخداما",
          content: (
            <ul className="related-conversion-list">
              {keyGuides.map((guide) => (
                <li key={guide.href}>
                  <Link href={guide.href}>{guide.label}</Link>
                </li>
              ))}
            </ul>
          ),
        },
        {
          heading: "مكتبات الأدلة الكاملة",
          content: (
            <>
              <p>
                إذا أردت تصفح مكتبة وحدات أوسع حسب المجال، فهذه هي
                أفضل نقاط الدخول الحالية داخل الموقع.
              </p>
              <ul className="related-conversion-list">
                <li>
                  <Link href="/ar/unit-guides">مكتبة الأدلة العربية الكاملة</Link>
                </li>
                <li>
                  <Link href="/birimler">المكتبة التركية الكاملة</Link>
                </li>
                <li>
                  <Link href="/ar/historical-units">الوحدات التاريخية بالعربية</Link>
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "كيف يساعدك هذا القسم؟",
          content: (
            <>
              <p>
                عندما ترى رمزا مثل Pa أو kWh أو mmHg أو ohm، فغالبا
                تحتاج إلى معرفة المعنى والسياق قبل التحويل. هذا هو
                الدور الأساسي لهذا القسم.
              </p>
              <p>
                ويمكنك الانتقال بعد ذلك مباشرة إلى صفحة التحويلات من
                خلال <Link href="/ar/all-conversions">بوابة كل التحويلات</Link>.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
