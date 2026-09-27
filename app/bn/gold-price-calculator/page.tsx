import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import BengaliGoldPriceCalculator from "../../components/BengaliGoldPriceCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/bn/gold-price-calculator";

const faqItems: FaqItem[] = [
  {
    question: "১ ভরি সোনা কত গ্রাম?",
    answer:
      "বাংলাদেশ জুয়েলার্স সমিতি (বাজুস) ১ ভরি = ১১.৬৬৪ গ্রাম ধরে হিসাব করে। তোলার সূক্ষ্ম মান ১১.৬৬৩৮ গ্রাম; দুটির পার্থক্য দামের হিসাবে প্রায় নগণ্য।",
  },
  {
    question: "১ আনা, ১ রতি ও ১ পয়েন্ট সোনা কত গ্রাম?",
    answer:
      "১ ভরি = ১৬ আনা, ১ আনা = ৬ রতি এবং ১ রতি = ১০ পয়েন্ট। তাই ১ আনা ≈ ০.৭২৯ গ্রাম, ১ রতি ≈ ০.১২১৫ গ্রাম এবং ১ পয়েন্ট ≈ ০.০১২১৫ গ্রাম।",
  },
  {
    question: "সোনার গহনার দামে মজুরি ও ভ্যাট কীভাবে যোগ হয়?",
    answer:
      "প্রথমে ওজন × ভরির দাম দিয়ে সোনার দাম বের হয়। এর সাথে দোকানের মজুরি যোগ হয় — বাজুস সাধারণত ন্যূনতম ৬% মজুরি নির্ধারণ করে। এরপর সোনা ও মজুরির মোট দামের ওপর সরকার নির্ধারিত ৫% ভ্যাট যোগ হয়। নকশা ও দোকানভেদে মজুরি বেশি হতে পারে, তাই ক্যালকুলেটরে দুটি হারই বদলানো যায়।",
  },
  {
    question: "২২, ২১ ও ১৮ ক্যারেট সোনায় কতটা খাঁটি সোনা থাকে?",
    answer:
      "২২ ক্যারেটে প্রায় ৯১.৬%, ২১ ক্যারেটে ৮৭.৫% এবং ১৮ ক্যারেটে ৭৫% খাঁটি সোনা থাকে। সনাতন পদ্ধতির সোনার বিশুদ্ধতা নির্দিষ্ট নয়, তাই এর দাম সাধারণত সবচেয়ে কম।",
  },
  {
    question: "১ ক্যারেট সমান কত গ্রাম?",
    answer:
      "হীরা ও রত্নপাথরের ওজনের একক ক্যারেট = ০.২ গ্রাম। কিন্তু সোনার ক্যারেট ওজন নয়, বিশুদ্ধতার মাপ — ২২ ক্যারেট মানে ২৪ ভাগের ২২ ভাগ সোনা।",
  },
];

const title = "সোনার দাম ক্যালকুলেটর — ভরি, আনা, রতি ও মজুরি হিসাব";
const description =
  "ভরি-আনা-রতি-পয়েন্ট বা গ্রামে ওজন দিন, আজকের ২২, ২১, ১৮ ক্যারেট বা সনাতন সোনার দাম লিখুন; মজুরি ও ৫% ভ্যাটসহ গহনার মোট দাম দেখুন।";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title,
    description,
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const unitRows = [
  { unit: "১ ভরি", relation: "১৬ আনা", grams: "১১.৬৬৪ গ্রাম" },
  { unit: "১ আনা", relation: "৬ রতি", grams: "০.৭২৯ গ্রাম" },
  { unit: "১ রতি", relation: "১০ পয়েন্ট", grams: "০.১২১৫ গ্রাম" },
  { unit: "১ পয়েন্ট", relation: "ভরির ৯৬০ ভাগের ১ ভাগ", grams: "০.০১২১৫ গ্রাম" },
  { unit: "১০ গ্রাম", relation: "প্রায় ১৩ আনা ৪ রতি ৩ পয়েন্ট", grams: "১০ গ্রাম" },
];

export default function BengaliGoldPriceCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "হোম", item: buildSiteUrl("/bn") },
      { "@type": "ListItem", position: 2, name: "সোনার দাম ক্যালকুলেটর", item: buildSiteUrl(pagePath) },
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
          <span>সোনার দাম ক্যালকুলেটর</span>
        </nav>

        <header className="all-conversions-header">
          <h1>সোনার দাম ক্যালকুলেটর</h1>
          <p>
            গহনার ওজন ভরি-আনা-রতি-পয়েন্ট বা গ্রামে দিন, দোকান বা বাজুসের আজকের
            দাম লিখুন — মজুরি ও ভ্যাটসহ মোট দাম এবং খাঁটি সোনার পরিমাণ সঙ্গে সঙ্গে দেখুন।
          </p>
        </header>

        <BengaliGoldPriceCalculator />

        <section className="category-article-content">
          <h2>ভরি, আনা, রতি ও পয়েন্ট — গ্রামে কত</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>একক</th>
                  <th>সমান</th>
                  <th>গ্রাম</th>
                </tr>
              </thead>
              <tbody>
                {unitRows.map((row) => (
                  <tr key={row.unit}>
                    <td>{row.unit}</td>
                    <td>{row.relation}</td>
                    <td>{row.grams}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>হিসাবটি কীভাবে করা হয়</h2>
          <p>
            সোনার দাম = ওজন (ভরি) × প্রতি ভরির দাম। মজুরি = সোনার দাম × মজুরির হার।
            ভ্যাট = (সোনার দাম + মজুরি) × ভ্যাটের হার। মোট দাম এই তিনটির যোগফল।
          </p>
          <p>
            উদাহরণ: ২ ভরি ৪ আনা ওজনের গহনা মানে ২.২৫ ভরি। প্রতি ভরির দাম ১,০০,০০০ টাকা
            হলে সোনার দাম ২,২৫,০০০ টাকা, ৬% মজুরি ১৩,৫০০ টাকা এবং ৫% ভ্যাট ১১,৯২৫ টাকা —
            মোট ২,৫০,৪২৫ টাকা। (দামটি শুধু উদাহরণ, আজকের বাজারদর নয়।)
          </p>

          <h2>সাধারণ জিজ্ঞাসা</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>সম্পর্কিত পাতা</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/bn/traditional-weight/tola-to-gram">তোলা থেকে গ্রাম</Link>
            </li>
            <li>
              <Link href="/bn/categories/sonar-ayar">স্বর্ণের ক্যারেট রূপান্তর</Link>
            </li>
            <li>
              <Link href="/bn/traditional-weight">ঐতিহ্যবাহী ওজন একক (মণ, সের, ছটাক, তোলা)</Link>
            </li>
            <li>
              <Link href="/en/gold-price-calculator-india" hrefLang="en">
                Gold price calculator (India, English)
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
