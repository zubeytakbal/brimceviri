import type { Metadata } from "next";
import Link from "next/link";
import RemoteWorkVsOfficeCostCalculatorUz from "../../components/calculators/RemoteWorkVsOfficeCostCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/masofadan-ish-ofis-solishtirish";

const faqItems: FaqItem[] = [
  {
    question: "Masofadan ishlash haqiqatan tejamkorlik keltiradimi?",
    answer:
      "Bu yo'l xarajatiga, tushlik odatingizga va uydan ishlashda paydo bo'ladigan qo'shimcha elektr/isitish xarajatiga bog'liq. Ko'p hollarda yo'l va ovqat tejamkorligi, qo'shimcha uy xarajatidan ko'proq chiqadi; ammo uzoq masofali va qimmat jamoat transportidan foydalanuvchilarda farq yanada kattalashadi. Yuqoridagi hisoblagichga o'z raqamlaringizni kiritib aniq natijani ko'rishingiz mumkin.",
  },
  {
    question: "Uydan ishlashning qo'shimcha xarajati nima uchun bor?",
    answer:
      "Kun bo'yi uyda bo'lish elektr (yoritish, kompyuter, isitgich/konditsioner) va ba'zan isitish xarajatini oshiradi. Bu hisoblagich shu qo'shimcha xarajatni ham hisobga olib, faqat 'yo'l puli qolmayapti' emas, haqiqiy sof tejamkorlikni ko'rsatadi.",
  },
  {
    question: "Gibrid ishlash (haftada bir necha kun ofis) uchun qanday ishlatiladi?",
    answer:
      "Haftada necha kun uydan ishlashingizni kiriting (0-5 orasida); hisoblagich yillik ish kunini shunga nisbatlab, faqat uydan ishlagan kunlaringiz uchun yo'l/ovqat tejamkorligi va qo'shimcha uy xarajatini hisoblaydi.",
  },
];

export const metadata: Metadata = {
  title: "Masofadan Ishlashmi yoki Ofismi? Xarajat Solishtirish",
  description:
    "O'z yo'l xarajatingiz, tushlik farqingiz va uydan ishlashning qo'shimcha xarajati bilan, masofadan ishlashning yiliga qancha tejamkorlik keltirishini (yoki keltirmasligini) hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/uzaktan-calisma-ofis-maliyeti-karsilastirma",
      "uz-UZ": pagePath,
      "x-default": "/uzaktan-calisma-ofis-maliyeti-karsilastirma",
    },
  },
  openGraph: {
    title: "Masofadan Ishlashmi yoki Ofismi? Xarajat Solishtirish",
    description: "O'z raqamlaringiz bilan masofadan ishlashning yillik sof tejamkorligini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekRemoteWorkVsOfficeCostPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Masofadan Ishlashmi yoki Ofismi?", item: buildSiteUrl(pagePath) },
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
          <span>Masofadan Ishlashmi yoki Ofismi?</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Masofadan Ishlashmi yoki Ofismi? Xarajat Solishtirish</h1>
          <p>
            O&apos;z yo&apos;l xarajatingiz, tushlik farqingiz va
            uydan ishlashning qo&apos;shimcha xarajati bilan,
            masofadan ishlashning yiliga qancha tejamkorlik
            keltirishini hisoblang.
          </p>
        </header>

        <RemoteWorkVsOfficeCostCalculatorUz />

        <section className="category-article-content">
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
            Avtomobilingizning yoqilg&apos;i xarajatini hisoblash
            uchun{" "}
            <Link href="/uz/yoqilgi-sarfi-hisoblash">Yoqilg&apos;i Sarfi Hisoblash</Link>{" "}
            sahifasiga, boshqa qaror-yordam vositalari uchun{" "}
            <Link href="/uz/elektromobil-benzinli-solishtirish">
              Elektromobilmi yoki Benzinli Avtomobilmi?
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Yillik ish kuni taxmini, ta&apos;til va bayramlarni
            ayirgandan keyingi o&apos;rtacha ish kuni soniga
            asoslangan; o&apos;z tashkilotingizning ta&apos;til/bayram
            taqvimiga qarab yangilashingiz mumkin.
          </p>
        </section>
      </div>
    </main>
  );
}
