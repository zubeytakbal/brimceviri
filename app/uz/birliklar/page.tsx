import type { Metadata } from "next";
import Link from "next/link";
import { uzbekCategoryPages } from "../../converter/localizedUzbekCategoryPages";
import { uzbekUnitPages } from "../../converter/localizedUzbekUnitPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Birliklar Qo'llanmasi: Ta'riflar, Belgilar va Tarix",
  description:
    "Uzunlik, massa, hajm, harorat va boshqa o'lchov birliklarining ta'riflari, belgilari va tarixi haqida bilib oling.",
  alternates: {
    canonical: "/uz/birliklar",
    languages: {
      tr: "/birimler",
      "uz-UZ": "/uz/birliklar",
      "x-default": "/birimler",
    },
  },
  openGraph: {
    title: "Birliklar Qo'llanmasi | BirimCeviri.app",
    description:
      "O'lchov birliklarining ta'riflari, belgilari va tarixi haqida bilib oling.",
    url: buildSiteUrl("/uz/birliklar"),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekUnitsIndexPage() {
  const categoryPageByCategory = new Map(
    uzbekCategoryPages.map((page) => [page.category, page]),
  );

  const unitGroups = Array.from(
    new Set(uzbekUnitPages.map((unit) => unit.category)),
  )
    .map((category) => {
      const categoryPage = categoryPageByCategory.get(category);

      return {
        category,
        title:
          categoryPage?.title.replace(
            / Birliklarini.*$/,
            " birliklari",
          ) ?? category,
        categoryHref: categoryPage
          ? `/uz/turkumlar/${categoryPage.slug}`
          : undefined,
        units: uzbekUnitPages.filter((unit) => unit.category === category),
      };
    })
    .sort((a, b) => b.units.length - a.units.length);

  return (
    <main className="units-index-page" lang="uz">
      <div className="units-index-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Birliklar Qo&apos;llanmasi</span>
        </nav>

        <header className="units-index-header">
          <p>Birliklar va o&apos;lchovlar</p>
          <h1>Birliklar Qo&apos;llanmasi</h1>

          <span>
            {uzbekUnitPages.length} o&apos;lchov birligining ta&apos;rifi,
            belgisi, tarixi va tegishli aylantirish vositalari.
          </span>
        </header>

        {unitGroups.map((group) => (
          <UnitGroup
            key={group.category}
            title={group.title}
            categoryHref={group.categoryHref}
            units={group.units}
          />
        ))}

        <section className="units-index-section language-alternatives">
          <h2>Boshqa tillar</h2>
          <Link className="text-link" href="/birimler" hrefLang="tr">
            Turkcha birliklar qo&apos;llanmasini ko&apos;rish
          </Link>
        </section>
      </div>
    </main>
  );
}

type UnitGroupProps = {
  title: string;
  categoryHref?: string;
  units: typeof uzbekUnitPages;
};

function UnitGroup({ title, categoryHref, units }: UnitGroupProps) {
  return (
    <section className="units-index-section">
      <div className="units-index-heading">
        <h2>{title}</h2>
        {categoryHref ? (
          <Link href={categoryHref}>Aylantirishlarni ko&apos;rish</Link>
        ) : null}
      </div>

      <ul className="units-index-list">
        {units.map((unit) => (
          <li key={unit.slug}>
            <Link href={`/uz/birliklar/${unit.slug}`}>
              <strong>{unit.symbol}</strong>

              <span>
                {unit.name}
                <small>{unit.shortDescription}</small>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
