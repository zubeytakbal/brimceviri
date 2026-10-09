import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import BmiCalculator from "../../components/BmiCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "বিএমআই (BMI) কী?",
    answer:
      "বিএমআই (বডি মাস ইনডেক্স) উচ্চতা ও ওজনের অনুপাত থেকে হিসাব করা একটি সংখ্যা, যা প্রাথমিক ধারণা দিতে সাহায্য করে — তবে এটি বিশেষজ্ঞ স্বাস্থ্য মূল্যায়নের বিকল্প নয়।",
  },
  {
    question: "কার্যকলাপের মাত্রা কেন জিজ্ঞাসা করা হয়?",
    answer:
      "কারণ দৈনিক শক্তি খরচ শুধু ওজন ও উচ্চতার উপর নির্ভর করে না — আপনি কতটা সক্রিয়, তাও এতে প্রভাব ফেলে।",
  },
];

export const metadata: Metadata = {
  title: "বিএমআই ক্যালকুলেটর — বডি মাস ইনডেক্স হিসাব করুন",
  description:
    "উচ্চতা, ওজন, বয়স, লিঙ্গ ও কার্যকলাপের মাত্রা থেকে আপনার বিএমআই, মৌলিক বিপাকীয় হার এবং দৈনিক ক্যালরি চাহিদা হিসাব করুন।",
  alternates: {
    canonical: "/bn/bmi-calculator",
    languages: {
      tr: "/bmi-hesaplama",
      en: "/en/bmi-calculator",
      bn: "/bn/bmi-calculator",
      "x-default": "/bmi-hesaplama",
    },
  },
  openGraph: {
    title: "বিএমআই ক্যালকুলেটর",
    description:
      "উচ্চতা, ওজন, বয়স, লিঙ্গ ও কার্যকলাপের মাত্রা থেকে আপনার বিএমআই হিসাব করুন।",
    url: buildSiteUrl("/bn/bmi-calculator"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BengaliBmiCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "হোম", item: buildSiteUrl("/bn") },
      { "@type": "ListItem", position: 2, name: "বিএমআই ক্যালকুলেটর", item: buildSiteUrl("/bn/bmi-calculator") },
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
          <span>বিএমআই ক্যালকুলেটর</span>
        </nav>

        <header className="all-conversions-header">
          <h1>বিএমআই ক্যালকুলেটর</h1>
          <p>
            উচ্চতা, ওজন, বয়স, লিঙ্গ ও কার্যকলাপের মাত্রা দিয়ে আপনার
            বিএমআই, মৌলিক বিপাকীয় হার এবং আনুমানিক দৈনিক ক্যালরি
            চাহিদা তাৎক্ষণিক দেখুন।
          </p>
        </header>

        <BmiCalculator locale="bn" />

        <section className="category-article-content">
          <h2>বিএমআই-এর শ্রেণি (প্রাপ্তবয়স্ক)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>বিএমআই</th>
                  <th>বিশ্ব স্বাস্থ্য সংস্থার শ্রেণি</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>১৮.৫-এর কম</td>
                  <td>কম ওজন</td>
                </tr>
                <tr>
                  <td>১৮.৫ – ২৪.৯</td>
                  <td>স্বাভাবিক ওজন</td>
                </tr>
                <tr>
                  <td>২৫ – ২৯.৯</td>
                  <td>অতিরিক্ত ওজন</td>
                </tr>
                <tr>
                  <td>৩০ বা তার বেশি</td>
                  <td>স্থূলতা</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            দক্ষিণ এশীয়দের ক্ষেত্রে কম বিএমআই-তেই ডায়াবেটিস ও হৃদরোগের ঝুঁকি বাড়তে দেখা যায়। তাই বিশ্ব স্বাস্থ্য সংস্থার
            বিশেষজ্ঞ পরামর্শে এশীয় জনগোষ্ঠীর জন্য ২৩ ও ২৭.৫-কে অতিরিক্ত সতর্কতার সীমা হিসেবে উল্লেখ করা হয়েছে।
          </p>
          <h2>উদাহরণ</h2>
          <p>
            ওজন ৬০ কেজি ও উচ্চতা ১.৬২ মিটার হলে বিএমআই = ৬০ ÷ (১.৬২ × ১.৬২) ≈ ২২.৯, যা স্বাভাবিক সীমার মধ্যে। ১.৬২ মিটার
            উচ্চতায় স্বাভাবিক ওজন প্রায় ৪৮.৬ থেকে ৬৫.৩ কেজি। শিশু, গর্ভবতী নারী ও খেলোয়াড়দের ক্ষেত্রে বিএমআই সঠিক চিত্র দেয়
            না; স্বাস্থ্য বিষয়ে চিকিৎসকের পরামর্শ নিন।
          </p>

          <h2>সাধারণ জিজ্ঞাসা</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>অন্যান্য ভাষা</h2>
          <Link className="text-link" href="/bmi-hesaplama" hrefLang="tr">
            তুর্কি সংস্করণ খুলুন
          </Link>
        </section>
      </div>
    </main>
  );
}
