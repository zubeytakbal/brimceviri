import type { Metadata } from "next";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, SITE_URL } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Foydalanish shartlari",
  description:
    "BirimCeviri.app'da e'lon qilingan vositalar va texnik kontent uchun asosiy foydalanish shartlari.",
  alternates: {
    canonical: "/uz/terms",
    languages: {
      tr: "/kullanim-kosullari",
      "uz-UZ": "/uz/terms",
      "x-default": "/kullanim-kosullari",
    },
  },
  openGraph: {
    title: `Foydalanish shartlari | ${SITE_NAME}`,
    description:
      "BirimCeviri.app'da e'lon qilingan vositalar va texnik kontent uchun asosiy foydalanish shartlari.",
    url: `${SITE_URL}/uz/terms`,
    siteName: SITE_NAME,
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekTermsPage() {
  return (
    <StaticPageLayout
      locale="uz"
      breadcrumbAriaLabel="Sahifa yo'li"
      breadcrumbs={[
        { href: "/uz", label: "Bosh sahifa" },
        { label: "Foydalanish shartlari" },
      ]}
      title="Foydalanish shartlari"
      description="Ushbu saytdagi vositalar va kontent quyidagi asosiy shartlar asosida ma'lumot va texnik ma'lumotnoma sifatida taqdim etiladi."
      sections={[
        {
          heading: "Ma'lumot uchun foydalanish",
          content: (
            <>
              <p>
                Ushbu saytdagi konverterlar, kalkulyatorlar va
                qo&apos;llanma kontenti ma&apos;lumotnoma va dastlabki
                ko&apos;rib chiqish uchun mo&apos;ljallangan.
              </p>
              <p>
                Ularning natijasi muhim muhandislik, sog&apos;liq yoki
                xavfsizlik qarorlari uchun yagona asos sifatida qabul
                qilinmasligi kerak.
              </p>
            </>
          ),
        },
        {
          heading: "Mas'uliyat",
          content: (
            <>
              <p>
                Foydalanuvchilar mustaqil tekshiruv olish, loyiha
                standartlarini tekshirish va zarur bo&apos;lganda malakali
                mutaxassislar bilan maslahatlashish uchun
                mas&apos;uliyatli bo&apos;lib qoladi.
              </p>
              <p>
                Haqiqiy ishlash sharoitlari soddalashtirilgan
                kalkulyator kirishlari va taxminlaridan farq qilishi
                mumkin.
              </p>
            </>
          ),
        },
      ]}
      alternateLink={{
        href: "/kullanim-kosullari",
        hrefLang: "tr",
        label: "Turkcha versiyasini ko'rish",
      }}
    />
  );
}
