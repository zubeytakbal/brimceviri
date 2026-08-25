import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../components/ShoeSizeConverter";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title:
    "Ayakkab\u0131 Numaras\u0131 \u00c7evirme: TR, ABD, \u0130ngiltere Tablosu",
  description:
    "Ayakkab\u0131 numaras\u0131n\u0131 TR/AB, ABD ve \u0130ngiltere sistemleri aras\u0131nda \u00e7evirin. Nike, Adidas, Puma, New Balance ve Converse i\u00e7in marka bazl\u0131 numara tablolar\u0131.",
  alternates: {
    canonical: "/ayakkabi-numarasi-cevirme",
    languages: {
      tr: "/ayakkabi-numarasi-cevirme",
      en: "/en/shoe-size-converter",
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title:
      "Ayakkab\u0131 Numaras\u0131 \u00c7evirme: TR, ABD, \u0130ngiltere Tablosu",
    description:
      "Ayakkab\u0131 numaras\u0131n\u0131 TR/AB, ABD ve \u0130ngiltere sistemleri aras\u0131nda \u00e7evirin; Nike, Adidas, Puma, New Balance ve Converse marka tablolar\u0131n\u0131 g\u00f6r\u00fcn.",
    url: buildSiteUrl("/ayakkabi-numarasi-cevirme"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function ShoeSizePage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>
            {"Ayakkab\u0131 Numaras\u0131 \u00c7evirme"}
          </span>
        </nav>

        <header className="all-conversions-header">
          <h1>{"Ayakkab\u0131 Numaras\u0131 \u00c7evirme"}</h1>

          <p>
            {"Bildi\u011fin numaray\u0131 gir, TR/AB, ABD ve \u0130ngiltere kar\u015f\u0131l\u0131\u011f\u0131n\u0131 an\u0131nda g\u00f6r. Erkek, kad\u0131n, bebek ve b\u00fcy\u00fck \u00e7ocuk i\u00e7in ayr\u0131 tablolar; Nike, Adidas, Puma, New Balance ve Converse i\u00e7in marka bazl\u0131 numaraland\u0131rma mevcut."}
          </p>
        </header>

        <ShoeSizeConverter locale="tr" />

        <section className="category-article-content">
          <h2>
            {"Ayakkab\u0131 numaras\u0131 neden markaya g\u00f6re de\u011fi\u015fir?"}
          </h2>
          <p>
            {"TR numaras\u0131 ile AB (EU) numaras\u0131 ayn\u0131 sistemdir, birebir e\u015fittir. Ama ABD ve \u0130ngiltere numaralar\u0131 farkl\u0131 bir \u00f6l\u00e7e\u011fe dayan\u0131r, \u00fcstelik markalar kendi kal\u0131plar\u0131na g\u00f6re k\u00fc\u00e7\u00fck sapmalar uygular; bu y\u00fczden ayn\u0131 ayak uzunlu\u011fu bir markada 42, ba\u015fka bir markada 42,5 olarak etiketlenebilir. Buradaki tablolar markalar\u0131n kendi resmi \u00f6l\u00e7\u00fc k\u0131lavuzlar\u0131ndan derlenmi\u015ftir; yine de en kesin sonu\u00e7 i\u00e7in aya\u011f\u0131n\u0131 cm cinsinden \u00f6l\u00e7\u00fcp \"Ayak Uzunlu\u011fu\" alan\u0131ndan se\u00e7im yapman\u0131 \u00f6neririz."}
          </p>
          <p>
            {"\u00c7ocuk ayakkab\u0131lar\u0131nda ABD numaraland\u0131rmas\u0131 13,5'ten sonra 1'den yeniden ba\u015flar (bebek/k\u00fc\u00e7\u00fck \u00e7ocuktan b\u00fcy\u00fck \u00e7ocu\u011fa ge\u00e7i\u015f); bu y\u00fczden bebek ve b\u00fcy\u00fck \u00e7ocuk i\u00e7in ayr\u0131 iki tablo kullan\u0131l\u0131yor."}
          </p>
        </section>
      </div>
    </main>
  );
}
