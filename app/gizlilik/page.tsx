import type { Metadata } from "next";
import StaticPageLayout from "../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../siteConfig";

export const metadata: Metadata = {
  title: "Gizlilik",
  description:
    "BirimCeviri.app üzerinde hesaplama girdileri ve sayfa kullanımıyla ilgili temel gizlilik bilgileri.",
  alternates: {
    canonical: "/gizlilik",
    languages: {
      tr: "/gizlilik",
      en: "/en/privacy",
      "x-default": "/gizlilik",
    },
  },
  openGraph: {
    title: `Gizlilik | ${SITE_NAME}`,
    description:
      "BirimCeviri.app üzerinde hesaplama girdileri ve sayfa kullanımıyla ilgili temel gizlilik bilgileri.",
    url: `${SITE_URL}/gizlilik`,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <StaticPageLayout
      locale="tr"
      breadcrumbAriaLabel="Sayfa yolu"
      breadcrumbs={[
        { href: "/", label: "Ana Sayfa" },
        { label: "Gizlilik" },
      ]}
      title="Gizlilik"
      description="Bu sayfa, sitedeki hesaplama akışları ve kullanıcı girdileriyle ilgili temel gizlilik yaklaşımını özetler."
      sections={[
        {
          heading: "Hesaplama girdileri",
          content: (
            <>
              <p>
                Hesaplayıcılara girilen değerler, bu sitedeki
                hesaplamaların çalıştırılması amacıyla tarayıcı içinde
                işlenir.
              </p>
              <p>
                Kod tarafında doğrulamadığımız bir sunucu tarafı kayıt,
                reklam veya analiz davranışı varmış gibi iddiada
                bulunmuyoruz.
              </p>
            </>
          ),
        },
        {
          heading: "İçerik ve bağlantılar",
          content: (
            <>
              <p>
                Birim rehberleri ve teknik sayfalar bilgi amaçlıdır.
                Dış bağlantılar kendi gizlilik uygulamalarına tabi
                olabilir.
              </p>
              <p>
                Haricî bir siteye geçtiğinizde o sitenin koşullarını ve
                gizlilik politikasını ayrıca inceleyin.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/en/privacy",
        hrefLang: "en",
        label: "English version",
      }}
    />
  );
}
