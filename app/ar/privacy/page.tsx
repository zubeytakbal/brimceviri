import StaticPageLayout from "../../components/StaticPageLayout";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "الخصوصية",
  description:
    "ملخص قصير لنهج الخصوصية فيما يتعلق بمدخلات الحاسبات واستخدام الصفحات على BirimCeviri.app.",
  path: "/ar/privacy",
  turkishPath: "/gizlilik",
  englishPath: "/en/privacy",
});

export default function ArabicPrivacyPage() {
  return (
    <StaticPageLayout
      locale="ar"
      breadcrumbAriaLabel="مسار التنقل"
      breadcrumbs={[
        { href: "/ar", label: "الرئيسية" },
        { label: "الخصوصية" },
      ]}
      title="الخصوصية"
      description="تلخص هذه الصفحة النهج الأساسي المتعلق بخصوصية مدخلات الحاسبات واستخدام الصفحات داخل الموقع."
      sections={[
        {
          heading: "مدخلات الحاسبات",
          content: (
            <>
              <p>
                القيم التي تدخلها في الحاسبات تُستخدم داخل المتصفح ضمن
                مسارات الحساب المتاحة في هذا الموقع.
              </p>
              <p>
                ولا ندّعي وجود تسجيل من جهة الخادم أو إعلانات أو
                تحليلات ما لم يكن ذلك مؤكدا فعلا في الكود.
              </p>
            </>
          ),
        },
        {
          heading: "المحتوى والروابط الخارجية",
          content: (
            <>
              <p>
                صفحات الوحدات والمحتوى التقني هنا ذات طابع معلوماتي،
                وقد تعمل المواقع الخارجية وفق سياسات خصوصية مختلفة.
              </p>
              <p>
                عند مغادرة هذا الموقع، من الأفضل مراجعة شروط وسياسة
                الخصوصية الخاصة بالموقع المقصود بشكل منفصل.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/gizlilik",
        hrefLang: "tr",
        label: "عرض النسخة التركية",
      }}
    />
  );
}
