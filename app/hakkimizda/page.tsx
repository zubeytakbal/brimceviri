import type { Metadata } from "next";
import StaticPageLayout from "../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../siteConfig";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "BirimCeviri.app projesinin amacı, kapsamı ve teknik yaklaşımı hakkında kısa bilgiler.",
  alternates: {
    canonical: "/hakkimizda",
    languages: {
      tr: "/hakkimizda",
      en: "/en/about",
      "x-default": "/hakkimizda",
    },
  },
  openGraph: {
    title: `Hakkımızda | ${SITE_NAME}`,
    description:
      "BirimCeviri.app projesinin amacı, kapsamı ve teknik yaklaşımı hakkında kısa bilgiler.",
    url: `${SITE_URL}/hakkimizda`,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <StaticPageLayout
      locale="tr"
      breadcrumbAriaLabel="Sayfa yolu"
      breadcrumbs={[
        { href: "/", label: "Ana Sayfa" },
        { label: "Hakkımızda" },
      ]}
      title="Hakkımızda"
      description="BirimCeviri.app, birim dönüşümleri, mühendislik hesaplayıcıları ve bilimsel birim rehberlerini tek yerde bir araya getirmek için hazırlanmış teknik bir platformdur."
      sections={[
        {
          heading: "Projenin amacı",
          content: (
            <>
              <p>
                Amaç, günlük kullanım ile teknik ihtiyaçlar arasında
                köprü kuran hızlı ve anlaşılır dönüşüm araçları
                sunmaktır.
              </p>
              <p>
                Site yalnızca dönüştürücü değil; formüller,
                mühendislik hesaplayıcıları ve birim açıklamalarıyla
                birlikte çalışan bir referans alanı olarak
                tasarlanmıştır.
              </p>
            </>
          ),
        },
        {
          heading: "Kapsam",
          content: (
            <>
              <p>
                İçerik şu anda özellikle uzunluk, kütle, basınç ve
                mühendislik odaklı hesaplamalar etrafında
                genişlemektedir.
              </p>
              <p>
                Zaman içinde yeni birim rehberleri, dönüşüm çiftleri
                ve teknik hesaplayıcılar eklenebilir.
              </p>
            </>
          ),
        },
        {
          heading: "Önemli kullanım notu",
          content: (
            <>
              <p>
                Hesaplayıcılar ve bilgi sayfaları bilgilendirme ve ön
                değerlendirme amacıyla sunulur.
              </p>
              <p>
                Kritik mühendislik, sağlık veya güvenlik kararlarında
                sonuçları proje, standart ve profesyonel doğrulama
                kaynaklarıyla ayrıca kontrol edin.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/en/about",
        hrefLang: "en",
        label: "English version",
      }}
    />
  );
}
