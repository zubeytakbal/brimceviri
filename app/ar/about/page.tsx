import StaticPageLayout from "../../components/StaticPageLayout";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "من نحن",
  description:
    "نظرة مختصرة على هدف BirimCeviri.app ونطاقه واتجاهه التقني.",
  path: "/ar/about",
  turkishPath: "/hakkimizda",
  englishPath: "/en/about",
});

export default function ArabicAboutPage() {
  return (
    <StaticPageLayout
      locale="ar"
      breadcrumbAriaLabel="مسار التنقل"
      breadcrumbs={[
        { href: "/ar", label: "الرئيسية" },
        { label: "من نحن" },
      ]}
      title="من نحن"
      description="BirimCeviri.app منصة تقنية تجمع بين تحويل الوحدات والحاسبات الهندسية وأدلة الوحدات العلمية في مكان واحد."
      sections={[
        {
          heading: "الهدف",
          content: (
            <>
              <p>
                الهدف هو تقديم أدوات واضحة وسريعة تخدم احتياجات
                التحويل اليومية وكذلك الاستخدامات التقنية والمرجعية.
              </p>
              <p>
                الموقع ليس مجرد محول وحدات، بل طبقة مرجعية مختصرة تضم
                صيغًا وحاسبات وشروحات للوحدات.
              </p>
            </>
          ),
        },
        {
          heading: "النطاق",
          content: (
            <>
              <p>
                يركز المحتوى الحالي بشكل خاص على الطول والكتلة والضغط
                والحسابات ذات الطابع الهندسي.
              </p>
              <p>
                ويمكن إضافة مزيد من أدلة الوحدات وأزواج التحويل
                والحاسبات التقنية مع توسع الموقع.
              </p>
            </>
          ),
        },
        {
          heading: "ملاحظة مهمة",
          content: (
            <>
              <p>
                الحاسبات والصفحات الإرشادية هنا مخصصة للمعلومة
                والمراجعة الأولية.
              </p>
              <p>
                في القرارات الحرجة المتعلقة بالهندسة أو الصحة أو
                السلامة، يجب دائما التحقق من القيم عبر المعايير
                الرسمية والمراجعة المهنية والمصادر المعتمدة.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/hakkimizda",
        hrefLang: "tr",
        label: "عرض النسخة التركية",
      }}
    />
  );
}
