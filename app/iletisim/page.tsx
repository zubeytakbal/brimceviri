import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
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
          heading: "Hangi konularda yazabilirsiniz?",
          content: (
            <ul>
              <li>Bir hesaplamada ya da bilgide gördüğünüz hata</li>
              <li>Çalışmayan bir araç, bozuk bir bağlantı ya da görünüm sorunu</li>
              <li>Eklenmesini istediğiniz yeni bir birim veya hesaplayıcı</li>
              <li>Gömülebilir araçlar ve iş birliği talepleri</li>
            </ul>
          ),
        },
        {
          heading: "Hata bildirirken",
          content: (
            <p>
              Sayfanın adresini, girdiğiniz değeri, gördüğünüz sonucu ve beklediğiniz sonucu
              yazmanız sorunun hızlıca bulunmasını sağlar. Hata doğrulanırsa sayfa düzeltilir.
            </p>
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
              <p>
                E-posta ile gönderdiğiniz bilgilerin nasıl kullanıldığı{" "}
                <Link href="/gizlilik">Gizlilik Politikası</Link> sayfasında anlatılır.
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
