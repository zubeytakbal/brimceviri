import type { Metadata } from "next";
import Link from "next/link";
import PaintCalculator from "../../components/PaintCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "এই টুলটি কী হিসাব করে?",
    answer:
      "ক্যালকুলেটর দেয়ালের ক্ষেত্রফল থেকে দরজা ও জানালার ক্ষেত্রফল বাদ দেয়, তারপর ফলাফলকে আপনার প্রয়োগ করা কোটের সংখ্যা দিয়ে গুণ করে।",
  },
  {
    question: "এটি কখন কাজে লাগে?",
    answer:
      "রং কেনার আগে, এই পাতা দ্রুত পরিমাণ অনুমান করতে সাহায্য করে, যাতে আপনি কম বা বেশি রং কিনে না ফেলেন।",
  },
];

export const metadata: Metadata = {
  title: "রং ক্যালকুলেটর — প্রয়োজনীয় রংয়ের পরিমাণ হিসাব করুন",
  description:
    "রুমের মাপ, দরজা-জানালার সংখ্যা ও কোটের সংখ্যা থেকে কত লিটার রং প্রয়োজন তা তাৎক্ষণিক হিসাব করুন।",
  alternates: {
    canonical: "/bn/paint-calculator",
    languages: {
      tr: "/boya-hesaplama",
      en: "/en/paint-calculator",
      bn: "/bn/paint-calculator",
      "x-default": "/boya-hesaplama",
    },
  },
  openGraph: {
    title: "রং ক্যালকুলেটর",
    description: "রুমের মাপ থেকে প্রয়োজনীয় রংয়ের পরিমাণ হিসাব করুন।",
    url: buildSiteUrl("/bn/paint-calculator"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BengaliPaintCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "হোম", item: buildSiteUrl("/bn") },
      { "@type": "ListItem", position: 2, name: "রং ক্যালকুলেটর", item: buildSiteUrl("/bn/paint-calculator") },
    ],
  };

  return (
    <main className="all-conversions-page" lang="bn">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <Link href="/bn">হোম</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>রং ক্যালকুলেটর</span>
        </nav>

        <header className="all-conversions-header">
          <h1>রং ক্যালকুলেটর</h1>
          <p>
            রুমের দৈর্ঘ্য, প্রস্থ ও উচ্চতা লিখুন — রং করার ক্ষেত্রফল ও
            আনুমানিক প্রয়োজনীয় লিটার রং তাৎক্ষণিক দেখুন।
          </p>
        </header>

        <PaintCalculator locale="bn" />

        <section className="category-article-content">
          <h2>সাধারণ জিজ্ঞাসা</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>অন্যান্য ভাষা</h2>
          <Link className="text-link" href="/boya-hesaplama" hrefLang="tr">
            Türkçe versiyonu aç
          </Link>
        </section>
      </div>
    </main>
  );
}
