import type { Metadata } from "next";
import Link from "next/link";
import { homeCategoryOrder } from "../../converter/homeCategoryOrder";
import { arabicCategoryPages } from "../../converter/localizedArabicCategoryPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "كل الفئات — محول الوحدات",
  description:
    "قائمة كاملة بفئات تحويل الوحدات: الطول والكتلة ودرجة الحرارة والضغط والطاقة وغيرها من الكميات الفيزيائية.",
  alternates: {
    canonical: "/ar/categories",
    languages: {
      ar: "/ar/categories",
      "x-default": "/ar/categories",
    },
  },
  openGraph: {
    title: "كل الفئات — محول الوحدات",
    description: "قائمة كاملة بفئات تحويل الوحدات.",
    url: buildSiteUrl("/ar/categories"),
    siteName: "BirimCeviri.app",
    locale: "ar_AR",
    type: "website",
  },
};

const primaryCategoryOrder = new Map<string, number>(
  homeCategoryOrder.map((category, index) => [category, index])
);

const sortedCategories = [...arabicCategoryPages].sort((left, right) => {
  const leftOrder = primaryCategoryOrder.get(left.category) ?? Number.MAX_SAFE_INTEGER;
  const rightOrder = primaryCategoryOrder.get(right.category) ?? Number.MAX_SAFE_INTEGER;

  return leftOrder - rightOrder || left.title.localeCompare(right.title, "ar");
});

export default function ArabicCategoriesIndexPage() {
  return (
    <main className="all-conversions-page" lang="ar" dir="rtl">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="مسار الصفحة">
          <Link href="/ar">الرئيسية</Link>
          <span aria-hidden="true">&lsaquo;</span>
          <span>كل الفئات</span>
        </nav>

        <header className="all-conversions-header">
          <h1>كل فئات تحويل الوحدات</h1>
          <p>
            اختر الكمية الفيزيائية التي تحتاجها لعرض كل الوحدات وصفحات التحويل
            في تلك الفئة.
          </p>
        </header>

        <section className="category-article-content">
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>الفئة</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedCategories.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>
                      <Link className="text-link" href={`/ar/categories/${category.slug}`}>
                        عرض
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
