import type { Metadata } from "next";
import Link from "next/link";
import { bengaliCategoryPages } from "../../converter/localizedBengaliCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "সব বিভাগ — একক রূপান্তরকারী",
  description:
    "দৈর্ঘ্য, ভর, তাপমাত্রা, চাপ, শক্তি ও আরও অনেক ভৌত রাশির একক রূপান্তরের সম্পূর্ণ তালিকা।",
  alternates: {
    canonical: "/bn/categories",
    languages: {
      bn: "/bn/categories",
      "x-default": "/bn/categories",
    },
  },
  openGraph: {
    title: "সব বিভাগ — একক রূপান্তরকারী",
    description: "একক রূপান্তরের সব বিভাগের সম্পূর্ণ তালিকা।",
    url: buildSiteUrl("/bn/categories"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

export default function BengaliCategoriesIndexPage() {
  return (
    <main className="all-conversions-page" lang="bn">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <Link href="/bn">হোম</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>সব বিভাগ</span>
        </nav>

        <header className="all-conversions-header">
          <h1>সব একক রূপান্তর বিভাগ</h1>
          <p>
            প্রয়োজনীয় ভৌত রাশি বেছে নিয়ে সেই বিভাগের সব একক ও রূপান্তর
            পৃষ্ঠা দেখুন।
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
                      <Link className="text-link" href={`/bn/categories/${category.slug}`}>
                        দেখুন
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
