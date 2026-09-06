import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kuyumculukta ayar ve milyem arasındaki fark nedir?",
    answer:
      "Ayar, altında 24 birim üzerinden saflığı ifade eder (24 ayar = tam saf altın). Milyem ise binde (‰) cinsinden saflıktır ve hem altın hem gümüşte kullanılır; 22 ayar = 916 milyem, 18 ayar = 750 milyem gibi. Gümüşte günlük kullanımda doğrudan milyem değeri söylenir (925 ayar gümüş gibi), 24'lük ayar sistemi kullanılmaz.",
  },
  {
    question: "Has altın/gümüş nasıl hesaplanır?",
    answer:
      "Has Gram = Brüt Gram × (Milyem / 1000). Örneğin 10 gram 22 ayar (916 milyem) altının has değeri 10 × 0,916 = 9,16 gramdır. Bu hesabı Has Hesaplama aracımızda otomatik yapabilirsin.",
  },
  {
    question: "Kıymetli maden ticaretinde neden troy ons kullanılır?",
    answer:
      "Troy ons (31,1034768 g), altın-gümüş-platin gibi kıymetli madenlerin uluslararası piyasalarda (Londra Külçe Piyasası dahil) tartıldığı resmî birimdir. Günlük hayatta bilinen 'ons' (avoirdupois ons, 28,35 g) ile karıştırılmamalıdır — ikisi farklı ağırlıklardır.",
  },
];

export const metadata: Metadata = {
  title: "Kuyumcu Araçları: Ayar, Milyem, Has Hesaplama ve Birim Çevirileri",
  description:
    "Kuyumcu ve gümüşçü esnafı için tek sayfada toplanmış araçlar: altın/gümüş ayar dönüşümleri, has hesaplama, troy ons/karat/dirhem çevirileri ve ayar-milyem karşılık tabloları.",
  alternates: {
    canonical: "/kuyumcu-araclari",
  },
  openGraph: {
    title: "Kuyumcu Araçları: Ayar, Milyem, Has Hesaplama ve Birim Çevirileri",
    description:
      "Altın/gümüş ayar dönüşümleri, has hesaplama, troy ons/karat/dirhem çevirileri tek sayfada.",
    url: buildSiteUrl("/kuyumcu-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const goldGradeTable = [
  ["24 Ayar", "999 milyem", "%99,9", "Külçe, yatırımlık altın"],
  ["22 Ayar", "916 milyem", "%91,6", "Bilezik, geleneksel takı"],
  ["18 Ayar", "750 milyem", "%75,0", "Yüzük, kolye, günlük takı"],
  ["14 Ayar", "585 milyem", "%58,3", "Ekonomik takı, ABD/Avrupa pazarı"],
  ["9 Ayar", "375 milyem", "%37,5", "Bazı Avrupa ülkelerinde ekonomik takı"],
  ["8 Ayar", "333 milyem", "%33,3", "En düşük yasal altın ayarı (bazı ülkelerde)"],
];

const silverGradeTable = [
  ["999 Ayar", "Saf Gümüş (Fine Silver)", "%99,9", "Külçe, yatırımlık gümüş"],
  ["925 Ayar", "Sterlin Gümüş (Sterling Silver)", "%92,5", "Takı, yüzük, gümüş sofra takımı"],
  ["900 Ayar", "Sikke Gümüşü (Coin Silver)", "%90,0", "Tarihi madeni paralar, bazı geleneksel eşyalar"],
  ["800 Ayar", "—", "%80,0", "Geleneksel/antika gümüş eşyalar"],
];

export default function KuyumcuAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: buildSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mesleğe Göre Araçlar",
        item: buildSiteUrl("/meslekler"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Kuyumcu Araçları",
        item: buildSiteUrl("/kuyumcu-araclari"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildFaqSchema(faqItems)),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/meslekler">Mesleğe Göre Araçlar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Kuyumcu Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kuyumcu Araçları</h1>
          <p>
            Kuyumcu ve gümüşçü esnafının günlük işinde kullandığı
            hesaplama araçlarını ve referans bilgileri tek sayfada
            topladık: ayar/milyem çevirileri, has hesaplama, alaşım
            karıştırma ve kıymetli maden ağırlık birimleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>22 ayar altın</strong> = 916 milyem = %91,6 saf
            </li>
            <li>
              <strong>925 ayar gümüş (sterlin)</strong> = %92,5 saf
            </li>
            <li>
              <strong>Has Gram</strong> = Brüt Gram × (Milyem / 1000)
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/has-hesaplama">Has Altın ve Gümüş Hesaplama</Link>
              {" "}— gram ve ayar (milyem) girerek saf metal içeriğini
              hesapla, farklı ayarlarda parça karıştır.
            </li>
            <li>
              <Link href="/kategoriler/altin-ayar">Altın Ayar Dönüşümleri</Link>
              {" "}— 24, 22, 18 ve 14 ayar arasında doğrudan gram
              dönüşümü.
            </li>
            <li>
              <Link href="/kategoriler/gumus-ayar">Gümüş Ayar Dönüşümleri</Link>
              {" "}— 999, 925 (sterlin), 900 ve 800 ayar arasında
              doğrudan gram dönüşümü.
            </li>
            <li>
              <Link href="/gram-troy-ons">Gram ↔ Troy Ons</Link> — kıymetli
              maden ticaretinin uluslararası birimi.
            </li>
            <li>
              <Link href="/gram-karat">Gram ↔ Karat</Link> — elmas ve
              mücevher taşı ağırlığı.
            </li>
            <li>
              <Link href="/dirhem-gram">Dirhem ↔ Gram</Link> — Osmanlı
              dönemi kütle birimi.
            </li>
          </ul>

          <h2>Altın Ayar - Milyem - Yüzde Karşılık Tablosu</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Altın ayar, milyem ve saf altın yüzdesi karşılıkları</caption>
              <thead>
                <tr>
                  <th scope="col">Ayar</th>
                  <th scope="col">Milyem</th>
                  <th scope="col">Saf Altın Yüzdesi</th>
                  <th scope="col">Yaygın Kullanım</th>
                </tr>
              </thead>
              <tbody>
                {goldGradeTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Gümüş Ayar Standartları Tablosu</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Gümüş ayar (milyem) standartları ve saf gümüş yüzdesi</caption>
              <thead>
                <tr>
                  <th scope="col">Ayar (Milyem)</th>
                  <th scope="col">Yaygın Adı</th>
                  <th scope="col">Saf Gümüş Yüzdesi</th>
                  <th scope="col">Yaygın Kullanım</th>
                </tr>
              </thead>
              <tbody>
                {silverGradeTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Kuyumculukta kullanılan birimler</h2>
          <p>
            Gram, kuyumculukta en yaygın ağırlık birimidir. Ancak bazı
            özel durumlarda farklı birimlerle de karşılaşılır:{" "}
            <Link href="/birimler/troy-ons">Troy ons</Link>, altın-gümüş
            ticaretinin uluslararası birimidir ve günlük hayatta bilinen
            ons&apos;tan (avoirdupois) farklıdır.{" "}
            <Link href="/birimler/karat">Karat</Link>, elmas ve mücevher
            taşı ağırlığını ifade eder (1 karat = 0,2 gram) — altın
            ayarındaki &quot;karat&quot; kavramıyla karıştırılmamalıdır.{" "}
            <Link href="/birimler/dirhem">Dirhem</Link> ise Osmanlı
            döneminden kalma, günümüzde bazı kuyumcu esnafının hâlâ
            aşina olduğu geleneksel bir birimdir.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Kuyumculukta ayar ve milyem arasındaki fark nedir?</strong>
            <br />
            Ayar, altında 24 birim üzerinden saflığı ifade eder (24 ayar
            = tam saf altın). Milyem ise binde (‰) cinsinden saflıktır
            ve hem altın hem gümüşte kullanılır; 22 ayar = 916 milyem, 18
            ayar = 750 milyem gibi. Gümüşte günlük kullanımda doğrudan
            milyem değeri söylenir (925 ayar gümüş gibi), 24&apos;lük
            ayar sistemi kullanılmaz.
          </p>
          <p>
            <strong>Has altın/gümüş nasıl hesaplanır?</strong>
            <br />
            Has Gram = Brüt Gram × (Milyem / 1000). Örneğin 10 gram 22
            ayar (916 milyem) altının has değeri 10 × 0,916 = 9,16
            gramdır. Bu hesabı{" "}
            <Link href="/has-hesaplama">Has Hesaplama</Link> aracımızda
            otomatik yapabilirsin.
          </p>
          <p>
            <strong>
              Kıymetli maden ticaretinde neden troy ons kullanılır?
            </strong>
            <br />
            Troy ons (31,1034768 g), altın-gümüş-platin gibi kıymetli
            madenlerin uluslararası piyasalarda (Londra Külçe Piyasası
            dahil) tartıldığı resmî birimdir. Günlük hayatta bilinen
            &quot;ons&quot; (avoirdupois ons, 28,35 g) ile
            karıştırılmamalıdır — ikisi farklı ağırlıklardır.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Ayar/milyem karşılıkları ve saflık standartları, kuyumculukta
            yaygın kullanılan uluslararası has (fineness) standartlarına
            dayanmaktadır. Resmî damga/ayar tespiti için her zaman
            yetkili bir ayar tespit merkezine (probe/mihenk)
            başvurulmalıdır — bu sayfa yalnızca referans ve hesaplama
            amaçlıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
