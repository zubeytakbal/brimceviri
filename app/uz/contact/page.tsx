import type { Metadata } from "next";
import StaticPageLayout from "../../components/StaticPageLayout";
import {
  SITE_CONTACT_EMAIL,
  SITE_NAME,
  SITE_URL,
} from "../../siteConfig";

export const metadata: Metadata = {
  title: "Aloqa",
  description:
    "BirimCeviri.app bilan bog'liq fikr-mulohaza, tuzatishlar va texnik muammolar uchun aloqa ma'lumotlari.",
  alternates: {
    canonical: "/uz/contact",
    languages: {
      tr: "/iletisim",
      "uz-UZ": "/uz/contact",
      "x-default": "/iletisim",
    },
  },
  openGraph: {
    title: `Aloqa | ${SITE_NAME}`,
    description:
      "BirimCeviri.app bilan bog'liq fikr-mulohaza, tuzatishlar va texnik muammolar uchun aloqa ma'lumotlari.",
    url: `${SITE_URL}/uz/contact`,
    siteName: SITE_NAME,
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekContactPage() {
  return (
    <StaticPageLayout
      locale="uz"
      breadcrumbAriaLabel="Sahifa yo'li"
      breadcrumbs={[
        { href: "/uz", label: "Bosh sahifa" },
        { label: "Aloqa" },
      ]}
      title="Aloqa"
      description="Fikr-mulohaza, tuzatishlar va umumiy muloqot uchun quyidagi manzildan foydalaning."
      sections={[
        {
          heading: "Elektron pochta",
          content: (
            <>
              <p>
                Aloqa:{" "}
                <a href={`mailto:${SITE_CONTACT_EMAIL}`}>
                  {SITE_CONTACT_EMAIL}
                </a>
              </p>
              <p>
                Texnik xatolar haqida xabar berishda sahifa manzili va
                namuna qiymatini qo&apos;shish ko&apos;rib chiqishni
                tezlashtiradi.
              </p>
            </>
          ),
        },
        {
          heading: "Qamrov",
          content: (
            <>
              <p>
                Ushbu aloqa kanali kontent tuzatishlari, texnik
                muammolar va umumiy fikr-mulohaza uchun mo&apos;ljallangan.
              </p>
              <p>
                Bu rasmiy muhandislik tasdig&apos;i, konsalting yoki
                shoshilinch xavfsizlik tekshiruvi uchun kanal emas.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/iletisim",
        hrefLang: "tr",
        label: "Turkcha versiyasini ko'rish",
      }}
    />
  );
}
