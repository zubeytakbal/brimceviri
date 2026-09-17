import type { Metadata } from "next";
import Link from "next/link";
import SalaryCalculatorUz from "../../components/calculators/SalaryCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/ish-haqi-kalkulyatori";

const faqItems: FaqItem[] = [
  {
    question: "Ish haqidan qanday soliq va to'lovlar ushlab qolinadi?",
    answer:
      "Yalpi (hisoblangan) ish haqidan ikkita summa ushlab qolinadi: jismoniy shaxslardan olinadigan daromad solig'i (JShShS, standart stavka 12%, IT Park rezidenti xodimlari uchun imtiyozli 7,5%) va individual jamg'arma pensiya hisobiga (IJPH) badali (0,1%). Ikkalasi ham yalpi summaning o'zidan alohida-alohida hisoblanadi, ketma-ket kompaundlanmaydi.",
  },
  {
    question: "Ish beruvchining ijtimoiy solig'i xodimning maoshiga ta'sir qiladimi?",
    answer:
      "Yo'q. Ijtimoiy soliq (12%) ish beruvchi tomonidan, yalpi ish haqi ustiga qo'shimcha ravishda to'lanadi va xodimning qo'lga tegadigan summasini kamaytirmaydi — bu faqat ish beruvchi uchun xodimni ishga olishning haqiqiy umumiy xarajatini bildiradi.",
  },
  {
    question: "IT Park rezidentligi soliqqa qanday ta'sir qiladi?",
    answer:
      "IT Park rezidenti sifatida ro'yxatdan o'tgan kompaniyalar xodimlari uchun JShShS stavkasi 12% o'rniga 7,5% qo'llaniladi, bu esa sof ish haqini sezilarli darajada oshiradi (ko'paytiruvchi 0,879 o'rniga 0,924).",
  },
];

export const metadata: Metadata = {
  title: "Ish Haqi Kalkulyatori: Yalpi va Sof Maosh Hisoblash",
  description:
    "Yalpi (hisoblangan) ish haqidan sof (qo'lga tegadigan) maoshni, yoki aksincha, xohlagan sof maoshdan kerakli yalpi ish haqini hisoblang. JShShS, IJPH va ish beruvchi ijtimoiy solig'i bilan.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "Ish Haqi Kalkulyatori: Yalpi va Sof Maosh Hisoblash",
    description: "Yalpi va sof ish haqi orasida hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekSalaryCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Ish Haqi Kalkulyatori", item: buildSiteUrl(pagePath) },
    ],
  };

  return (
    <main className="all-conversions-page" lang="uz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Ish Haqi Kalkulyatori</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Ish Haqi Kalkulyatori</h1>
          <p>
            Yalpi (hisoblangan) ish haqingizni kiriting: sof (qo&apos;lga
            tegadigan) maoshingizni darhol ko&apos;ring. Yoki aksincha —
            xohlagan sof maoshingizdan kerakli yalpi ish haqini toping.
          </p>
        </header>

        <SalaryCalculatorUz />

        <section className="category-article-content">
          <h2>Yalpi va sof ish haqi qanday hisoblanadi?</h2>
          <p>
            <strong>Sof Ish Haqi = Yalpi Ish Haqi − JShShS − IJPH</strong>.
            Standart holatda JShShS = Yalpi × 12%, IJPH = Yalpi × 0,1%.
            Masalan, 15 000 000 so&apos;m yalpi ish haqidan 1 800 000
            so&apos;m JShShS va 15 000 so&apos;m IJPH ushlanib, 13 185 000
            so&apos;m qo&apos;lga tegadi.
          </p>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Tegishli vositalar</h2>
          <p>
            QQS hisoblash uchun{" "}
            <Link href="/uz/qqs-hisoblash">QQS Hisoblash</Link>,
            amortizatsiya hisoblash uchun{" "}
            <Link href="/uz/amortizatsiya-hisoblash">Amortizatsiyani Hisoblash</Link>{" "}
            sahifalariga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Soliq stavkalari (JShShS 12%/IT Park uchun 7,5%, IJPH 0,1%,
            ish beruvchi ijtimoiy solig&apos;i 12%) O&apos;zbekiston
            Respublikasi Soliq kodeksiga asoslangan. Bu vosita umumiy
            ma&apos;lumot maqsadida taqdim etilgan; rasmiy hisob-kitoblar
            uchun buxgalteringiz yoki soliq organi bilan
            maslahatlashing.
          </p>
        </section>
      </div>
    </main>
  );
}
