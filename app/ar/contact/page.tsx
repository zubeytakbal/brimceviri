import Link from "@/app/components/SiteLink";
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
        {
          heading: "عند الإبلاغ عن خطأ",
          content: (
            <ul>
              <li>العنوان الكامل للصفحة،</li>
              <li>القيم التي أدخلتها والنتيجة التي ظهرت لك،</li>
              <li>النتيجة المتوقعة ومصدرها إن أمكن،</li>
              <li>المتصفح والجهاز إذا بدت المشكلة تقنية.</li>
            </ul>
          ),
        },
        {
          heading: "مواضيع أخرى",
          content: (
            <p>
              يمكنك أيضا إرسال اقتراحات لوحدات أو حاسبات غير موجودة، أو ملاحظات
              على أخطاء الترجمة، إلى العنوان نفسه.
            </p>
          ),
        },
        {
          heading: "الخصوصية",
          content: (
            <p>
              يُستخدم بريدك الإلكتروني للرد على رسالتك فقط ولا يُشارك مع أطراف
              أخرى. التفاصيل في <Link href="/ar/privacy">سياسة الخصوصية</Link>.
            </p>
          ),
        },
        {
          heading: "اللغات ومتابعة الرسائل",
          content: (
            <p>
              يمكنك الكتابة بالعربية أو الإنجليزية أو التركية. تُراجع ملاحظات تصحيح القيم والأخطاء التقنية، ويُصحَّح الخطأ في الصفحة
              المعنية متى تأكد وجوده.
            </p>
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
