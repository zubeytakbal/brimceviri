import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "রেসিপি রূপান্তরকারী",
  description:
    "আপনার রেসিপি পেস্ট করুন, বড় বা ছোট করার গুণক বেছে নিন, এবং সাথে সাথে নতুন পরিমাণ পান -- কিছু উপাদান স্বয়ংক্রিয়ভাবে গ্রামেও রূপান্তরিত হবে।",
  alternates: {
    canonical: "/bn/recipe-converter",
    languages: {
      tr: "/tarif-cevirici",
      en: "/en/recipe-converter",
      de: "/de/rezept-umrechner",
      bn: "/bn/recipe-converter",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "রেসিপি রূপান্তরকারী",
    description: "রেসিপি পেস্ট করুন এবং সাথে সাথে নতুন পরিমাণ পান।",
    url: buildSiteUrl("/bn/recipe-converter"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

export default function BengaliRecipeConverterPage() {
  return (
    <main className="all-conversions-page" lang="bn">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <Link href="/bn">হোম</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>রেসিপি রূপান্তরকারী</span>
        </nav>

        <header className="all-conversions-header">
          <h1>রেসিপি রূপান্তরকারী</h1>

          <p>
            আপনার রেসিপি লাইনে লাইনে পেস্ট করুন, যেমন: "২ গ্লাস ময়দা"।
            গুণক বেছে নেওয়ার পর সাইট সাথে সাথে নতুন পরিমাণ হিসাব করে
            দেবে। উপাদান পরিচিত হলে এবং গ্লাস বা চামচের মতো এককে লেখা
            থাকলে, একটি আনুমানিক গ্রামের মানও দেখাবে।
          </p>
        </header>

        <RecipeScalerConverter locale="bn" />

        <section className="category-article-content">
          <h2>রেসিপি কীভাবে বড় বা ছোট করবেন?</h2>
          <p>
            মূল ধারণা সহজ: প্রতিটি পরিমাণকে একই গুণক দিয়ে গুণ করা। যদি
            রেসিপি ২ জনের জন্য হয় আর আপনি ৪ জনের জন্য চান, তাহলে গুণক
            হবে ২। এই টুল প্রতিটি লাইনের জন্য এটি স্বয়ংক্রিয়ভাবে করে,
            যেখানে লাইনটি একটি পাঠযোগ্য পরিমাণ (পূর্ণসংখ্যা, ভগ্নাংশ বা
            দশমিক) দিয়ে শুরু হয়।
          </p>
          <p>
            আপনি চাইলে মূল কতজনের জন্য ছিল এবং এখন কতজনের জন্য চান তাও
            লিখতে পারেন, তাহলে হাতে হিসাব না করেই গুণক স্বয়ংক্রিয়ভাবে
            বের হয়ে যাবে।
          </p>

          <h2>কিছু লাইনে গ্রাম কেন দেখায় না?</h2>
          <p>
            গ্রামে রূপান্তর তখনই দেখায় যখন টুল একসাথে একক এবং উপাদানের
            নাম চিনতে পারে। "২টি ডিম" এর মতো লাইন ঠিকভাবে বড় হবে, কিন্তু
            অতিরিক্ত গ্রাম দেখাবে না কারণ ডিম আয়তন-ভিত্তিক রূপান্তর
            তালিকায় নেই।
          </p>
          <p>
            সমর্থিত উপাদানের তালিকা দেখতে{" "}
            <Link href="/bn/kitchen-measurement-converter">
              রান্নাঘর পরিমাপ রূপান্তরকারী
            </Link>{" "}
            খুলুন।
          </p>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>অন্যান্য ভাষা</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            Türkçe versiyonu aç
          </Link>
        </section>
      </div>
    </main>
  );
}
