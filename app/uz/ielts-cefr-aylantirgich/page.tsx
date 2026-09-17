import type { Metadata } from "next";
import IeltsCefrCalculatorUz from "../../components/calculators/IeltsCefrCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";
import Link from "next/link";

const pagePath = "/uz/ielts-cefr-aylantirgich";

const faqItems: FaqItem[] = [
  {
    question: "IELTS bali va CEFR darajasi orasida qat'iy formula bormi?",
    answer:
      "Yo'q. IELTS rasmiy tashkilotlari (British Council, Cambridge English, IDP) bu ikkisi orasida qat'iy bir martali moslik yo'qligini alohida ta'kidlaydi — IELTS uzluksiz 9 balli shkala, CEFR esa keng til darajalari tizimi (A1-C2). Shu sababli bu vositadagi jadval oraliqlar shaklida berilgan.",
  },
  {
    question: "CEFR milliy sertifikati IELTS bilan bir xilmi?",
    answer:
      "Yo'q. O'zbekistonda CEFR bo'yicha Milliy sertifikat mahalliy tashkilotlar tomonidan beriladi va faqat O'zbekiston hududida tan olinadi (davlat universitetlariga kirish, davlat xizmatida ustama uchun); IELTS esa xalqaro miqyosda tan olinadigan, chet elga o'qishga kirish uchun ko'proq ishlatiladigan sertifikatdir.",
  },
  {
    question: "B2 darajadagi Milliy sertifikat qanday imtiyoz beradi?",
    answer:
      "B2 va undan yuqori darajadagi CEFR Milliy sertifikat, O'zbekistondagi davlat universitetlariga kirishda chet tili fanidan imtihon topshirmasdan maksimal ball olish imkonini beradi; davlat xizmatchisi yoki o'qituvchilar uchun esa oylik ish haqiga qo'shimcha ustama olish uchun kifoya qiladi.",
  },
];

export const metadata: Metadata = {
  title: "IELTS - CEFR Darajasini Aylantirish",
  description:
    "IELTS balingizni kiriting, taxminiy CEFR (A2-C2) darajangizni ko'ring. Rasmiy manbalarga asoslangan oraliq jadvali bilan.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "IELTS - CEFR Darajasini Aylantirish",
    description: "IELTS balidan taxminiy CEFR darajasini toping.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekIeltsCefrPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "IELTS - CEFR Darajasini Aylantirish", item: buildSiteUrl(pagePath) },
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
          <span>IELTS - CEFR Darajasini Aylantirish</span>
        </nav>

        <header className="all-conversions-header">
          <h1>IELTS - CEFR Darajasini Aylantirish</h1>
          <p>
            IELTS balingizni tanlang: taxminiy CEFR (A2-C2) til
            darajangizni darhol ko&apos;ring.
          </p>
        </header>

        <IeltsCefrCalculatorUz />

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
            IELTS-CEFR mos kelish oraliqlari IELTS.org, British
            Council va Cambridge English rasmiy manbalariga
            asoslangan. Bu tashkilotlarning o&apos;zi ikki tizim
            orasida qat&apos;iy bir martali moslik yo&apos;qligini
            va chegara ballarning &quot;chegara oldi&quot; ekanligini
            alohida ta&apos;kidlaydi; shuning uchun bu vosita umumiy
            yo&apos;naltiruvchi ma&apos;lumot sifatida taqdim etiladi.
          </p>
        </section>
      </div>
    </main>
  );
}
