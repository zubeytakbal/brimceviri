import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_CONTACT_EMAIL } from "../../siteConfig";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "اتصل بنا",
  description:
    "بيانات التواصل الخاصة بالملاحظات العامة والتصحيحات والمشكلات التقنية المتعلقة بـ BirimCeviri.app.",
  path: "/ar/contact",
  turkishPath: "/iletisim",
  englishPath: "/en/contact",
});

export default function ArabicContactPage() {
  return (
    <StaticPageLayout
      locale="ar"
      breadcrumbAriaLabel="مسار التنقل"
      breadcrumbs={[
        { href: "/ar", label: "الرئيسية" },
        { label: "اتصل بنا" },
      ]}
      title="اتصل بنا"
      description="استخدم العنوان التالي للملاحظات والتصحيحات والتواصل العام."
      sections={[
        {
          heading: "البريد الإلكتروني",
          content: (
            <>
              <p>
                التواصل:
                {" "}
                <a href={`mailto:${SITE_CONTACT_EMAIL}`}>
                  {SITE_CONTACT_EMAIL}
                </a>
              </p>
              <p>
                في تقارير الأعطال التقنية، يفيد عادة إرسال رابط الصفحة
                والقيمة التي أدخلتها حتى تتم المراجعة بشكل أسرع.
              </p>
            </>
          ),
        },
        {
          heading: "نطاق التواصل",
          content: (
            <>
              <p>
                هذه القناة مخصصة لتصحيحات المحتوى والمشكلات التقنية
                والملاحظات العامة.
              </p>
              <p>
                وهي ليست قناة لاعتماد هندسي رسمي أو استشارة متخصصة أو
                مراجعة سلامة عاجلة.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/iletisim",
        hrefLang: "tr",
        label: "عرض النسخة التركية",
      }}
    />
  );
}
