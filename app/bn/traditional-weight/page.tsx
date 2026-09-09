import type { Metadata } from "next";
import Link from "next/link";
import { bengaliWeightPairs } from "../../converter/bengaliWeightPairs";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "ঐতিহ্যবাহী ওজন একক রূপান্তরকারী — মণ, সের, ছটাক, তোলা",
  description:
    "মণ, সের, ছটাক ও তোলার মতো ঐতিহ্যবাহী বাংলা ওজন একক কিলোগ্রাম ও গ্রামে বিনামূল্যে রূপান্তর করুন।",
  alternates: {
    canonical: "/bn/traditional-weight",
    languages: {
      bn: "/bn/traditional-weight",
      "x-default": "/bn/traditional-weight",
    },
  },
  openGraph: {
    title: "ঐতিহ্যবাহী ওজন একক রূপান্তরকারী",
    description:
      "মণ, সের, ছটাক ও তোলার মতো ঐতিহ্যবাহী বাংলা ওজন একক কিলোগ্রাম ও গ্রামে রূপান্তর করুন।",
    url: buildSiteUrl("/bn/traditional-weight"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

export default function BengaliTraditionalWeightHubPage() {
  return (
    <main className="all-conversions-page" lang="bn">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <Link href="/bn">হোম</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>ঐতিহ্যবাহী ওজন একক</span>
        </nav>

        <header className="all-conversions-header">
          <h1>ঐতিহ্যবাহী ওজন একক রূপান্তরকারী</h1>
          <p>
            বাংলাদেশ ও পশ্চিমবঙ্গের কৃষি ও পাইকারি বাজারে আজও ব্যবহৃত
            মণ, সের, ছটাক ও তোলা — এই ঐতিহ্যবাহী ওজন এককগুলোকে আধুনিক
            কিলোগ্রাম ও গ্রামে রূপান্তর করুন।
          </p>
        </header>

        <section className="category-article-content">
          <h2>একক রূপান্তরের তালিকা</h2>
          <ul className="related-conversion-list">
            {bengaliWeightPairs.map((pair) => (
              <li key={pair.slug}>
                <Link href={`/bn/traditional-weight/${pair.slug}`}>
                  {pair.fromLabel} → {pair.toLabel}
                </Link>
              </li>
            ))}
          </ul>

          <h2>এই এককগুলো কী?</h2>
          <p>
            <strong>মণ (Maund)</strong> ব্রিটিশ-ভারতীয় আমল থেকে চলে আসা
            প্রধান পাইকারি একক, ধান-চাল-পাটের বাজারে ব্যবহৃত হয়।{" "}
            <strong>সের (Seer)</strong> এর উপবিভাগ, প্রায়ই ভুলভাবে ১
            কিলোগ্রামের সমান মনে করা হয় (আসলে ৯৩৩.১ গ্রাম)।{" "}
            <strong>ছটাক</strong> মুদি দোকানের ছোট পরিমাণ মাপার একক, আর{" "}
            <strong>তোলা</strong> দক্ষিণ এশিয়া জুড়ে সোনা-গয়না ব্যবসার
            মানক একক হিসেবে ব্যবহৃত হয়।
          </p>
        </section>
      </div>
    </main>
  );
}
