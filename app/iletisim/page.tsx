import type { Metadata } from "next";
import StaticPageLayout from "../components/StaticPageLayout";
import {
  SITE_CONTACT_EMAIL,
  SITE_NAME,
  SITE_URL,
} from "../siteConfig";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "BirimCeviri.app ile iletişime geçmek için e-posta bilgileri.",
  alternates: {
    canonical: "/iletisim",
    languages: {
      tr: "/iletisim",
      en: "/en/contact",
      "x-default": "/iletisim",
    },
  },
  openGraph: {
    title: `İletişim | ${SITE_NAME}`,
    description:
      "BirimCeviri.app ile iletişime geçmek için e-posta bilgileri.",
    url: `${SITE_URL}/iletisim`,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <StaticPageLayout
      locale="tr"
      breadcrumbAriaLabel="Sayfa yolu"
      breadcrumbs={[
        { href: "/", label: "Ana Sayfa" },
        { label: "İletişim" },
      ]}
      title="İletişim"
      description="Geri bildirim, düzeltme önerisi veya genel iletişim için aşağıdaki adres kullanılabilir."
      sections={[
        {
          heading: "E-posta",
          content: (
            <>
              <p>
                İletişim için:
                {" "}
                <a href={`mailto:${SITE_CONTACT_EMAIL}`}>
                  {SITE_CONTACT_EMAIL}
                </a>
              </p>
              <p>
                Teknik hata bildirimlerinde ilgili sayfa adresini ve
                mümkünse örnek girdiyi eklemek süreci hızlandırır.
              </p>
            </>
          ),
        },
        {
          heading: "Kapsam",
          content: (
            <>
              <p>
                Bu iletişim kanalı içerik düzeltmeleri, teknik sorunlar
                ve genel geri bildirim içindir.
              </p>
              <p>
                Resmî mühendislik onayı, danışmanlık veya acil güvenlik
                doğrulaması hizmeti sunulmamaktadır.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/en/contact",
        hrefLang: "en",
        label: "English version",
      }}
    />
  );
}
