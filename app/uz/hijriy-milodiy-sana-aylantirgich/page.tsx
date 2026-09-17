import type { Metadata } from "next";
import HijriCalendarCalculatorUz from "../../components/calculators/HijriCalendarCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";
import Link from "next/link";

const pagePath = "/uz/hijriy-milodiy-sana-aylantirgich";

const faqItems: FaqItem[] = [
  {
    question: "Bu vosita qanday hisoblash usulidan foydalanadi?",
    answer:
      "Jadvalli (tabular) Islom taqvimi algoritmidan — bu 30 yillik davrda 11 kabisa yili bo'lgan, sof matematik qoidaga asoslangan hisoblash usuli (Kuvayt/Microsoft algoritmi nomi bilan ham tanilgan). Bu usul oyning haqiqiy ko'rinishiga (hilol kuzatuviga) emas, oldindan belgilangan formulaga tayanadi.",
  },
  {
    question: "Nega natija rasmiy e'lon qilingan sanadan farq qilishi mumkin?",
    answer:
      "Chunki Islom oy taqvimi asl holatda yangi oyning ko'rinishi (hilol kuzatuvi) asosida belgilanadi, bu esa mamlakatdan mamlakatga va yildan yilga 1-2 kunga farq qilishi mumkin. Jadvalli algoritm esa oldindan hisoblangan, sobit natija beradi — bu amaliy maqsadlar (yosh hisoblash, tarixiy sana taxmini) uchun yetarli, lekin diniy amaliyot (ro'za boshlanishi, hayit) uchun rasmiy e'lon asos qilinishi kerak.",
  },
  {
    question: "Ramazon yoki hayit sanasini aniq bilish uchun nima qilishim kerak?",
    answer:
      "O'zbekistonda diniy sanalar O'zbekiston musulmonlari idorasining rasmiy e'loniga asoslanadi. Bu vosita faqat taxminiy, hisoblangan sanani ko'rsatadi — diniy amaliyot uchun rasmiy manbaga murojaat qiling.",
  },
];

export const metadata: Metadata = {
  title: "Hijriy-Milodiy Sana Aylantirgich",
  description:
    "Milodiy sanani hijriy sanaga yoki aksincha aylantiring. Jadvalli Islom taqvimi algoritmiga asoslangan, taxminiy hisoblash vositasi.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "Hijriy-Milodiy Sana Aylantirgich",
    description: "Milodiy va hijriy sanalar orasida aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekHijriCalendarPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Hijriy-Milodiy Sana Aylantirgich", item: buildSiteUrl(pagePath) },
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
          <span>Hijriy-Milodiy Sana Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Hijriy-Milodiy Sana Aylantirgich</h1>
          <p>
            Milodiy sanani kiriting: taxminiy hijriy sanani darhol
            ko&apos;ring, yoki aksincha — hijriy sanadan milodiy
            sanaga aylantiring.
          </p>
        </header>

        <HijriCalendarCalculatorUz />

        <section className="category-article-content">
          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Manbalar</h2>
          <p>
            Hisoblash algoritmi jadvalli (tabular) Islom taqvimining
            standart 30 yillik davr qoidasiga asoslangan (Kuvayt/Microsoft
            algoritmi nomi bilan ham tanilgan, 11-asrdan beri Islom
            astronomik jadvallarida qo&apos;llaniladi). Bu vosita
            taxminiy, umumiy ma&apos;lumot maqsadida taqdim etilgan;
            diniy amaliyot uchun O&apos;zbekiston musulmonlari
            idorasining rasmiy e&apos;lonini asos qiling.
          </p>
        </section>
      </div>
    </main>
  );
}
