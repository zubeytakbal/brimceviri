import StaticPageLayout from "../../components/StaticPageLayout";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "شروط الاستخدام",
  description:
    "الشروط الأساسية لاستخدام الأدوات والمحتوى التقني المنشور على BirimCeviri.app.",
  path: "/ar/terms",
  turkishPath: "/kullanim-kosullari",
  englishPath: "/en/terms",
});

export default function ArabicTermsPage() {
  return (
    <StaticPageLayout
      locale="ar"
      breadcrumbAriaLabel="مسار التنقل"
      breadcrumbs={[
        { href: "/ar", label: "الرئيسية" },
        { label: "شروط الاستخدام" },
      ]}
      title="شروط الاستخدام"
      description="الأدوات والمحتوى المنشوران في هذا الموقع يقدمان لأغراض المعلومات والمرجع التقني وفق الشروط الأساسية التالية."
      sections={[
        {
          heading: "الاستخدام المعلوماتي",
          content: (
            <>
              <p>
                المحولات والحاسبات والمحتوى الإرشادي في هذا الموقع
                مخصصون للمرجعية والمراجعة الأولية.
              </p>
              <p>
                ولا ينبغي الاعتماد على النتائج وحدها في قرارات حرجة
                تخص الهندسة أو الصحة أو السلامة.
              </p>
            </>
          ),
        },
        {
          heading: "المسؤولية",
          content: (
            <>
              <p>
                يبقى المستخدم مسؤولا عن التحقق المستقل من النتائج
                ومراجعة المعايير المطلوبة والاستعانة بالمتخصصين عند
                الحاجة.
              </p>
              <p>
                فقد تختلف ظروف التشغيل الحقيقية عن المدخلات والافتراضات
                المبسطة المستخدمة داخل الحاسبات.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/kullanim-kosullari",
        hrefLang: "tr",
        label: "عرض النسخة التركية",
      }}
    />
  );
}
