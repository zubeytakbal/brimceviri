import type { Metadata } from "next";
import Link from "next/link";
import { unitPages } from "../converter/unitPages";

export const metadata: Metadata = {
  title: "Birim Rehberi",
  description:
    "Uzunluk, kütle, hacim, alan, basınç, sıcaklık ve daha birçok kategorideki birimlerin tanımlarını, sembollerini, tarihçelerini ve ilgili dönüşüm araçlarını inceleyin.",
  alternates: {
    canonical: "/birimler",
    languages: {
      tr: "/birimler",
      en: "/en/units",
      "x-default": "/birimler",
    },
  },
};

const unitGroupDefinitions: Array<{ title: string; category: string }> = [
  { title: "Uzunluk birimleri", category: "uzunluk" },
  { title: "Kütle birimleri", category: "kutle" },
  { title: "Hacim birimleri", category: "hacim" },
  { title: "Alan birimleri", category: "alan" },
  { title: "Basınç birimleri", category: "basinc" },
  { title: "Sıcaklık birimleri", category: "sicaklik" },
  { title: "Hız birimleri", category: "hiz" },
  { title: "Enerji birimleri", category: "enerji" },
  { title: "Güç birimleri", category: "guc" },
  { title: "Veri depolama birimleri", category: "veri" },
  { title: "Zaman birimleri", category: "zaman" },
  { title: "Elektrik birimleri", category: "elektrik" },
  { title: "Yoğunluk birimleri", category: "yogunluk" },
  { title: "Kuvvet birimleri", category: "kuvvet" },
  { title: "Tork birimleri", category: "tork" },
  { title: "Momentum birimleri", category: "momentum" },
  { title: "Açı birimleri", category: "aci" },
  { title: "Frekans birimleri", category: "frekans" },
  { title: "Debi birimleri", category: "debi" },
  { title: "Kapasitans birimleri", category: "kapasitans" },
  { title: "Endüktans birimleri", category: "enduktans" },
];

export default function UnitsIndexPage() {
  const unitGroups = unitGroupDefinitions
    .map((definition) => ({
      ...definition,
      units: unitPages.filter(
        (unitPage) => unitPage.category === definition.category
      ),
    }))
    .filter((group) => group.units.length > 0);

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

        {unitGroups.map((group) => (
          <UnitGroup
            key={group.category}
            title={group.title}
            categoryHref={`/kategoriler/${group.category}`}
            units={group.units}
          />
        ))}
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
