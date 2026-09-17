import type { Metadata } from "next";
import Link from "next/link";
import OneRepMaxCalculatorUz from "../../components/calculators/OneRepMaxCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/1rm-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "1RM (bir takrorli maksimum) nima?",
    answer:
      "1RM — bir harakatni (bench press, squat, deadlift va h.k.) to'g'ri texnika bilan bir marta ko'tarish mumkin bo'lgan eng yuqori og'irlikdir. Mashg'ulot dasturlarida ishlatiladigan og'irliklar odatda 1RM foizi sifatida belgilanadi.",
  },
  {
    question: "1RM qanday hisoblanadi?",
    answer:
      "Haqiqiy 1RM'ni topish uchun bitta takror bilan maksimal og'irlikni sinab ko'rish kerak; bu xavflidir. Buning o'rniga, submaksimal og'irlik bilan (masalan, 5 takror) bajarilgan bir set orqali Epley formulasi (1RM = Og'irlik × (1 + Takror/30)) bilan taxminiy 1RM hisoblanadi.",
  },
  {
    question: "Mashg'ulot foizi jadvali nima uchun kerak?",
    answer:
      "Taxminiy 1RM'ingizdan kelib chiqib, kuch (yuqori % past takror) yoki gipertrofiya (past % yuqori takror) maqsadli mashg'ulot dasturi uchun qaysi og'irlikni ishlatish kerakligini ko'rsatadi.",
  },
];

export const metadata: Metadata = {
  title: "1RM Hisoblash: Bir Takrorli Maksimum va Mashg'ulot Foizi",
  description:
    "Ko'targan og'irligingiz va takrorlar sonidan Epley formulasi bilan taxminiy 1RM'ni (bir takrorli maksimum) hisoblang; mashg'ulot foizi jadvali bilan dasturingizga mos og'irliklarni toping.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/1rm-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/1rm-hesaplama",
    },
  },
  openGraph: {
    title: "1RM Hisoblash: Bir Takrorli Maksimum va Mashg'ulot Foizi",
    description: "Epley formulasi bilan taxminiy 1RM va mashg'ulot foizi jadvali.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekOneRepMaxCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "1RM Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>1RM Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>1RM Hisoblash</h1>
          <p>
            Bir harakatda ko&apos;targan og&apos;irligingizni va
            bajargan takrorlar sonini kiriting: Epley formulasi bilan
            taxminiy 1RM&apos;ingizni va mashg&apos;ulot dasturingizga
            mos foiz jadvalini ko&apos;ring.
          </p>
        </header>

        <OneRepMaxCalculatorUz />

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
            Ideal vazningiz uchun{" "}
            <Link href="/uz/ideal-vazn-hisoblash">Ideal Vaznni Hisoblash</Link>,
            tana yog&apos;i foizingiz uchun{" "}
            <Link href="/uz/tana-yogi-foizi-hisoblash">
              Tana Yog&apos;i Foizini Hisoblash
            </Link>{" "}
            va yugurish tempingiz uchun{" "}
            <Link href="/uz/yugurish-tempi-hisoblash">
              Yugurish Tempini Hisoblash
            </Link>{" "}
            sahifalariga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Epley formulasi qarshilik mashqlarida keng qo&apos;llaniladigan
            taxminiy modeldir; haqiqiy 1RM texnika, charchoq va harakat
            turiga qarab farq qilishi mumkin. Bu vosita tibbiy yoki
            murabbiylik maslahati o&apos;rnini bosmaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
