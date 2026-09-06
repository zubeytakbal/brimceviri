import type { Metadata } from "next";
import Link from "next/link";
import PixelCalculator from "../components/PixelCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Piksel ile cm arasında nasıl dönüşüm yapılır?",
    answer:
      "Piksel sayısı, fiziksel boyut (inç cinsinden) ile DPI (inç başına nokta sayısı) çarpılarak bulunur: piksel = (cm / 2,54) × DPI. Ters yönde, fiziksel boyut = piksel / DPI formülüyle hesaplanır.",
  },
  {
    question: "Baskı için hangi DPI değeri kullanılmalı?",
    answer:
      "Web ve ekran tasarımı için 72-96 DPI yeterlidir. Standart kalitede baskı için 300 DPI, yüksek kaliteli/profesyonel baskı için 600 DPI yaygın kullanılan değerlerdir.",
  },
];

export const metadata: Metadata = {
  title: "Piksel, CM ve DPI Hesaplama",
  description:
    "Piksel sayısı, fiziksel boyut (cm/inç) veya DPI değerinden ikisini gir: eksik olan üçüncü değeri anında hesapla.",
  alternates: { canonical: "/piksel-cm-dpi-hesaplama" },
  openGraph: {
    title: "Piksel, CM ve DPI Hesaplama",
    description: "Piksel, fiziksel boyut ve DPI hesaplayın.",
    url: buildSiteUrl("/piksel-cm-dpi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const dpiTable = [
  ["Web / ekran tasarımı", "72-96 DPI"],
  ["Standart baskı (broşür, kartvizit)", "300 DPI"],
  ["Yüksek kaliteli / profesyonel baskı", "600 DPI"],
];

export default function PixelCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Piksel, CM ve DPI Hesaplama", item: buildSiteUrl("/piksel-cm-dpi-hesaplama") },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Piksel, CM ve DPI Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Piksel, CM ve DPI Hesaplama</h1>
          <p>
            Piksel sayısı, fiziksel boyut veya DPI değerinden ikisini
            gir: eksik olan üçüncü değeri anında hesapla.
          </p>
        </header>

        <PixelCalculator />

        <section className="category-article-content">
          <h2>Yaygın Kullanılan DPI Değerleri</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Kullanım amacına göre tipik DPI değerleri</caption>
              <thead>
                <tr>
                  <th scope="col">Kullanım Amacı</th>
                  <th scope="col">Tipik DPI</th>
                </tr>
              </thead>
              <tbody>
                {dpiTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Piksel ile cm arasında nasıl dönüşüm yapılır?</strong>
            <br />
            Piksel sayısı, fiziksel boyut (inç cinsinden) ile DPI
            (inç başına nokta sayısı) çarpılarak bulunur: piksel =
            (cm / 2,54) × DPI. Ters yönde, fiziksel boyut = piksel /
            DPI formülüyle hesaplanır.
          </p>
          <p>
            <strong>Baskı için hangi DPI değeri kullanılmalı?</strong>
            <br />
            Web ve ekran tasarımı için 72-96 DPI yeterlidir. Standart
            kalitede baskı için 300 DPI, yüksek kaliteli/profesyonel
            baskı için 600 DPI yaygın kullanılan değerlerdir.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer grafik tasarımcı araçları için{" "}
            <Link href="/grafik-tasarimci-araclari">Grafik Tasarımcı Araçları</Link>{" "}
            sayfasına, uzunluk birimleri arasında genel dönüşüm için{" "}
            <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, dijital görüntü çözünürlüğü ve baskı sektöründe
            standart kabul edilen piksel/inç/DPI ilişkisine
            dayanmaktadır.
          </p>
        </section>
      </div>
    </main>
  );
}
