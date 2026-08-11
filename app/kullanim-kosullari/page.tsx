import type { Metadata } from "next";
import StaticPageLayout from "../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../siteConfig";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description:
    "BirimCeviri.app üzerindeki içeriklerin ve hesaplayıcıların kullanımına ilişkin temel koşullar.",
  alternates: {
    canonical: "/kullanim-kosullari",
    languages: {
      tr: "/kullanim-kosullari",
      en: "/en/terms",
      "x-default": "/kullanim-kosullari",
    },
  },
  openGraph: {
    title: `Kullanım Koşulları | ${SITE_NAME}`,
    description:
      "BirimCeviri.app üzerindeki içeriklerin ve hesaplayıcıların kullanımına ilişkin temel koşullar.",
    url: `${SITE_URL}/kullanim-kosullari`,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <StaticPageLayout
      locale="tr"
      breadcrumbAriaLabel="Sayfa yolu"
      breadcrumbs={[
        { href: "/", label: "Ana Sayfa" },
        { label: "Kullanım Koşulları" },
      ]}
      title="Kullanım Koşulları"
      description="Sitedeki araç ve içerikler bilgilendirme amacıyla sunulur; kullanım sırasında aşağıdaki temel koşullar geçerlidir."
      sections={[
        {
          heading: "Bilgilendirme amacı",
          content: (
            <>
              <p>
                Site üzerindeki dönüştürücüler, hesaplayıcılar ve rehber
                içerikleri teknik referans ve ön değerlendirme amacıyla
                hazırlanmıştır.
              </p>
              <p>
                Sonuçlar, kritik mühendislik, sağlık veya güvenlik
                kararlarında tek başına yeterli kabul edilmemelidir.
              </p>
            </>
          ),
        },
        {
          heading: "Sorumluluk sınırı",
          content: (
            <>
              <p>
                Kullanıcı, ihtiyaç duyduğu durumda bağımsız doğrulama,
                proje standardı kontrolü ve profesyonel uzman görüşü alma
                sorumluluğunu taşır.
              </p>
              <p>
                Hesaplama sonucu ile gerçek saha koşulları arasında fark
                oluşabileceğini göz önünde bulundurun.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/en/terms",
        hrefLang: "en",
        label: "English version",
      }}
    />
  );
}
