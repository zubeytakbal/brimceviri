import type { Metadata } from "next";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Biz haqimizda",
  description:
    "BirimCeviri.app saytining maqsadi, qamrovi va texnik yo'nalishi haqida qisqacha ma'lumot.",
  alternates: {
    canonical: "/uz/about",
    languages: {
      tr: "/hakkimizda",
      "uz-UZ": "/uz/about",
      "x-default": "/hakkimizda",
    },
  },
  openGraph: {
    title: `Biz haqimizda | ${SITE_NAME}`,
    description:
      "BirimCeviri.app saytining maqsadi, qamrovi va texnik yo'nalishi haqida qisqacha ma'lumot.",
    url: `${SITE_URL}/uz/about`,
    siteName: SITE_NAME,
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekAboutPage() {
  return (
    <StaticPageLayout
      locale="uz"
      breadcrumbAriaLabel="Sahifa yo'li"
      breadcrumbs={[
        { href: "/uz", label: "Bosh sahifa" },
        { label: "Biz haqimizda" },
      ]}
      title="Biz haqimizda"
      description="BirimCeviri.app -- o'lchov birliklarini aylantirish, muhandislik kalkulyatorlari va ilmiy birlik qo'llanmalarini bir joyda birlashtiruvchi texnik platforma."
      sections={[
        {
          heading: "Maqsad",
          content: (
            <>
              <p>
                Maqsadimiz -- kundalik aylantirish ehtiyojlarini ham,
                texnik ma&apos;lumotnoma ishlarini ham qo&apos;llab-quvvatlaydigan
                aniq va tez vositalar taqdim etish.
              </p>
              <p>
                Sayt shunchaki konverter emas, balki formulalar,
                kalkulyatorlar va birlik izohlari bilan qisqa
                ma&apos;lumotnoma qatlami sifatida ham loyihalashtirilgan.
              </p>
            </>
          ),
        },
        {
          heading: "Qamrov",
          content: (
            <>
              <p>
                Hozirgi kontent asosan uzunlik, massa, hajm va harorat
                birliklariga qaratilgan.
              </p>
              <p>
                Vaqt o&apos;tishi bilan qo&apos;shimcha birlik
                qo&apos;llanmalari, aylantirish juftliklari va texnik
                kalkulyatorlar qo&apos;shilishi mumkin.
              </p>
            </>
          ),
        },
        {
          heading: "Muhim foydalanish eslatmasi",
          content: (
            <>
              <p>
                Kalkulyatorlar va qo&apos;llanma sahifalari ma&apos;lumot
                va dastlabki ma&apos;lumotnoma maqsadida taqdim etiladi.
              </p>
              <p>
                Muhim muhandislik, sog&apos;liq yoki xavfsizlik qarorlari
                uchun qiymatlarni loyiha standartlari, professional
                ko&apos;rib chiqish va ishonchli manbalar bilan
                tekshiring.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/hakkimizda",
        hrefLang: "tr",
        label: "Turkcha versiyasini ko'rish",
      }}
    />
  );
}
