import type { Metadata } from "next";
import Link from "next/link";
import Converter from "../converter/Converter";

export const metadata: Metadata = {
  title: "Tüm Birim Dönüşümleri",
  description:
    "Uzunluk, kütle, alan, hacim, basınç, sıcaklık, enerji ve mühendislik birimlerini tek sayfada çevirin.",
  alternates: {
    canonical: "/tum-birimler",
    languages: {
      tr: "/tum-birimler",
      en: "/en/all-conversions",
      "x-default": "/tum-birimler",
    },
  },
};

export default function AllConversionsPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">›</span>
          <span>Tüm Birimler</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Tüm Birim Dönüşümleri</h1>

          <p>
            Kategoriyi seçin, değeri girin ve kullanmak istediğiniz
            birimler arasında anında çeviri yapın.
          </p>
        </header>

        <Converter />
      </div>
    </main>
  );
}
