import type { Metadata } from "next";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Maxfiylik",
  description:
    "BirimCeviri.app'dagi hisoblash kirishlari va sahifadan foydalanish bo'yicha qisqacha maxfiylik siyosati.",
  alternates: {
    canonical: "/uz/privacy",
    languages: {
      tr: "/gizlilik",
      "uz-UZ": "/uz/privacy",
      "x-default": "/gizlilik",
    },
  },
  openGraph: {
    title: `Maxfiylik | ${SITE_NAME}`,
    description:
      "BirimCeviri.app'dagi hisoblash kirishlari va sahifadan foydalanish bo'yicha qisqacha maxfiylik siyosati.",
    url: `${SITE_URL}/uz/privacy`,
    siteName: SITE_NAME,
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekPrivacyPage() {
  return (
    <StaticPageLayout
      locale="uz"
      breadcrumbAriaLabel="Sahifa yo'li"
      breadcrumbs={[
        { href: "/uz", label: "Bosh sahifa" },
        { label: "Maxfiylik" },
      ]}
      title="Maxfiylik"
      description="Ushbu sahifa saytdagi kalkulyator kirishlari va sahifadan foydalanish bo'yicha asosiy maxfiylik yondashuvini qisqacha bayon qiladi."
      sections={[
        {
          heading: "Kalkulyator kirishlari",
          content: (
            <>
              <p>
                Kalkulyatorlarga kiritilgan qiymatlar ushbu saytda mavjud
                hisoblash oqimlari uchun brauzerda qayta ishlanadi.
              </p>
              <p>
                Kodda tasdiqlanmagan server tomonidagi jurnal yuritish,
                reklama yoki analitika xatti-harakatlarini da&apos;vo
                qilmaymiz.
              </p>
            </>
          ),
        },
        {
          heading: "Kontent va tashqi havolalar",
          content: (
            <>
              <p>
                Birlik qo&apos;llanmalari va texnik sahifalar ma&apos;lumot
                beruvchi xarakterga ega. Tashqi saytlar o&apos;z
                maxfiylik siyosati asosida ishlashi mumkin.
              </p>
              <p>
                Saytdan chiqqaningizda, maqsadli saytning shartlari va
                maxfiylik siyosatini alohida ko&apos;rib chiqing.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/gizlilik",
        hrefLang: "tr",
        label: "Turkcha versiyasini ko'rish",
      }}
    />
  );
}
