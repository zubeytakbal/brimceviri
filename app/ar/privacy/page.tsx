import { buildPrivacySections } from "../../components/privacyPolicySections";
import { privacyPolicyCopy } from "../../i18n/privacyPolicyCopy";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "الخصوصية",
  description:
    "سياسة الخصوصية في BirimCeviri.app: قيم الحاسبات، والتفضيلات المحفوظة في المتصفح، وGoogle Analytics، وإعلانات Google AdSense وملفات تعريف الارتباط.",
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
      description="ما المعلومات التي تتم معالجتها، وملفات تعريف الارتباط المستخدمة، وكيفية إدارة تفضيلات الإعلانات."
      sections={buildPrivacySections(privacyPolicyCopy.ar)}
      alternateLink={{
        href: "/gizlilik",
        hrefLang: "tr",
        label: "عرض النسخة التركية",
      }}
    />
  );
}
