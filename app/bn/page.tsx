import type { Metadata } from "next";
import Link from "next/link";
import { bengaliCategoryPages } from "../converter/localizedBengaliCategoryPages";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "একক রূপান্তরকারী — বাংলা",
  description:
    "দৈর্ঘ্য, ভর, তাপমাত্রা এবং অন্যান্য ভৌত একক বিনামূল্যে ও দ্রুত রূপান্তর করুন। ১২+ বিভাগ, নির্ভুল সূত্রসহ।",
  alternates: {
    canonical: "/bn",
    languages: {
      tr: "/",
      en: "/en",
      de: "/de",
      ar: "/ar",
      uz: "/uz",
      bn: "/bn",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "একক রূপান্তরকারী — বাংলা",
    description:
      "দৈর্ঘ্য, ভর, তাপমাত্রা এবং অন্যান্য ভৌত একক বিনামূল্যে ও দ্রুত রূপান্তর করুন।",
    url: buildSiteUrl("/bn"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

export default function BengaliHomePage() {
  return (
    <main className="all-conversions-page" lang="bn">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <span>হোম</span>
        </nav>

        <header className="all-conversions-header">
          <h1>একক রূপান্তরকারী</h1>
          <p>
            প্রয়োজনীয় বিভাগ বেছে নিন: দৈর্ঘ্য, ভর, তাপমাত্রা, চাপ, শক্তি এবং
            অন্যান্য ভৌত একক বিনামূল্যে রূপান্তর করুন।
          </p>
        </header>

        <section className="category-article-content">
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>বিভাগ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bengaliCategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>
                      <Link
                        className="text-link"
                        href={`/bn/categories/${category.slug}`}
                      >
                        দেখুন
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="conversion-section">
            <h2>গণিত টুলস</h2>
            <Link className="text-link" href="/bn/number-base-calculator">
              সংখ্যা পদ্ধতি রূপান্তরকারী (বাইনারি, অক্টাল, ডেসিমেল, হেক্সাডেসিমেল)
            </Link>
          </section>

          <section className="conversion-section">
            <h2>ঐতিহ্যবাহী ওজন একক</h2>
            <Link className="text-link" href="/bn/traditional-weight">
              মণ, সের, ছটাক ও তোলা রূপান্তরকারী
            </Link>
          </section>

          <section className="conversion-section">
            <h2>দৈনন্দিন ক্যালকুলেটর</h2>
            <Link className="text-link" href="/bn/bmi-calculator">
              বিএমআই ক্যালকুলেটর
            </Link>
            <Link className="text-link" href="/bn/paint-calculator">
              রং ক্যালকুলেটর
            </Link>
          </section>

          <section className="conversion-section language-alternatives">
            <h2>অন্যান্য ভাষা</h2>
            <Link className="text-link" href="/" hrefLang="tr">
              Türkçe versiyonu aç
            </Link>
            <Link className="text-link" href="/en" hrefLang="en">
              View the English version
            </Link>
          </section>
        </section>
      </div>
    </main>
  );
}
