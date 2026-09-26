import type { Metadata } from "next";
import Link from "next/link";
import { homeCategoryOrder } from "../../converter/homeCategoryOrder";
import { bengaliCategoryPages } from "../../converter/localizedBengaliCategoryPages";
import { bengaliUnitPages } from "../../converter/localizedBengaliUnitPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "একক গাইড — সংজ্ঞা, প্রতীক ও ব্যবহার",
  description:
    "বাংলায় সব উপলভ্য একক গাইড দেখুন। প্রতিটি গাইডে এককের সংজ্ঞা, প্রতীক, SI সম্পর্ক ও সংশ্লিষ্ট রূপান্তর রয়েছে।",
  alternates: {
    canonical: "/bn/unit-guides",
    languages: {
      tr: "/birimler",
      en: "/en/units",
      de: "/de/einheiten",
      ar: "/ar/unit-guides",
      "uz-UZ": "/uz/birliklar",
      bn: "/bn/unit-guides",
      fr: "/fr/guides-des-unites",
      es: "/es/guias-de-unidades",
      "es-419": "/es-419/guias-de-unidades",
      pt: "/pt/guias-de-unidades",
      "x-default": "/birimler",
    },
  },
  openGraph: {
    title: "একক গাইড | BirimCeviri.app",
    description:
      "বাংলায় এককের সংজ্ঞা, প্রতীক, SI সম্পর্ক ও সংশ্লিষ্ট রূপান্তর দেখুন।",
    url: buildSiteUrl("/bn/unit-guides"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

const primaryCategoryOrder = new Map<string, number>(
  homeCategoryOrder.map((category, index) => [category, index])
);

const categoryPageByCategory = new Map(
  bengaliCategoryPages.map((page) => [page.category, page])
);

const unitGroups = Array.from(
  new Set(bengaliUnitPages.map((unit) => unit.category))
)
  .map((category) => {
    const categoryPage = categoryPageByCategory.get(category);

    return {
      category,
      title: categoryPage?.title ?? category,
      href: categoryPage ? `/bn/categories/${categoryPage.slug}` : undefined,
      units: bengaliUnitPages.filter((unit) => unit.category === category),
    };
  })
  .sort((left, right) => {
    const leftOrder = primaryCategoryOrder.get(left.category) ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = primaryCategoryOrder.get(right.category) ?? Number.MAX_SAFE_INTEGER;

    return leftOrder - rightOrder || left.title.localeCompare(right.title, "bn");
  });

export default function BengaliUnitGuidesPage() {
  return (
    <main className="unit-information-page" lang="bn">
      <article className="unit-page-shell">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <Link href="/bn">হোম</Link>
          <span aria-hidden="true">›</span>
          <span>একক গাইড</span>
        </nav>

        <header className="unit-page-header">
          <p className="unit-symbol">SI</p>
          <h1>একক গাইড</h1>
          <p>
            সব উপলভ্য বাংলা একক গাইড বিভাগ অনুযায়ী সাজানো আছে। প্রতিটি
            পৃষ্ঠায় প্রতীক, সংজ্ঞা, ব্যবহার ও সংশ্লিষ্ট রূপান্তরের পথ পাবেন।
          </p>
        </header>

        <div className="unit-page-content">
          <section className="conversion-section">
            <h2>এই গাইডে কী পাবেন?</h2>
            <p>
              রূপান্তর পৃষ্ঠা একটি মানকে অন্য এককে বদলে দেয়। একক গাইড সেই
              এককের অর্থ, প্রতীক, SI সম্পর্ক এবং সাধারণ ব্যবহার বুঝতে সাহায্য করে।
            </p>
          </section>

          {unitGroups.map((group) => (
            <section className="conversion-section related-conversions" key={group.category}>
              <h2>
                {group.href ? <Link href={group.href}>{group.title}</Link> : group.title}
              </h2>
              {group.href && (
                <p>
                  <Link className="text-link" href={group.href}>
                    এই বিভাগের সব রূপান্তর দেখুন
                  </Link>
                </p>
              )}
              <ul className="related-conversion-list">
                {group.units.map((unit) => (
                  <li key={unit.slug}>
                    <Link href={`/bn/unit-guides/${unit.slug}`}>
                      <strong>{unit.name}</strong>
                      {" — "}
                      {unit.symbol}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
