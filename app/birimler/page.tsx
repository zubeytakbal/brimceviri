import type { Metadata } from "next";
import Link from "next/link";
import { unitPages } from "../converter/unitPages";

export const metadata: Metadata = {
  title: "Birim Rehberi",
  description:
    "Uzunluk, kütle ve basınç birimlerinin tanımlarını, sembollerini, tarihçelerini ve ilgili dönüşüm araçlarını inceleyin.",
  alternates: {
    canonical: "/birimler",
    languages: {
      tr: "/birimler",
      en: "/en/units",
      "x-default": "/birimler",
    },
  },
};

export default function UnitsIndexPage() {
  const lengthUnits = unitPages.filter(
    (unitPage) => unitPage.category === "uzunluk"
  );

  const massUnits = unitPages.filter(
    (unitPage) => unitPage.category === "kutle"
  );

  const pressureUnits = unitPages.filter(
    (unitPage) => unitPage.category === "basinc"
  );

  return (
    <main className="units-index-page">
      <div className="units-index-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">›</span>
          <span>Birim Rehberi</span>
        </nav>

        <header className="units-index-header">
          <p>Birimler ve ölçüler</p>
          <h1>Birim Rehberi</h1>

          <span>
            Birimlerin tanımlarını, sembollerini, tarihçelerini ve
            ilgili dönüşüm araçlarını inceleyin.
          </span>
        </header>

        <UnitGroup
          title="Uzunluk birimleri"
          categoryHref="/kategoriler/uzunluk"
          units={lengthUnits}
        />

        <UnitGroup
          title="Kütle birimleri"
          categoryHref="/kategoriler/kutle"
          units={massUnits}
        />

        <UnitGroup
          title="Basınç birimleri"
          categoryHref="/kategoriler/basinc"
          units={pressureUnits}
        />
      </div>
    </main>
  );
}

type UnitGroupProps = {
  title: string;
  categoryHref: string;
  units: typeof unitPages;
};

function UnitGroup({
  title,
  categoryHref,
  units,
}: UnitGroupProps) {
  return (
    <section className="units-index-section">
      <div className="units-index-heading">
        <h2>{title}</h2>
        <Link href={categoryHref}>Dönüşümleri görüntüle</Link>
      </div>

      <ul className="units-index-list">
        {units.map((unitPage) => (
          <li key={unitPage.slug}>
            <Link href={`/birimler/${unitPage.slug}`}>
              <strong>{unitPage.symbol}</strong>

              <span>
                {unitPage.name}
                <small>{unitPage.shortDescription}</small>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
