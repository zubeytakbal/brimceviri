import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "1 dönüm kaç m²'dir?",
    answer:
      "1 dönüm, Türkiye'de modern standarda göre tam olarak 1000 m²'dir ve 1 dekara eşittir. Osmanlı döneminde bölgeden bölgeye değişen (900-1600 m² arası) bir birimdi; 1931'deki Ölçüler ve Ayarlar Kanunu ile 1000 m² olarak standartlaştırıldı.",
  },
  {
    question: "Emlak komisyonu yasal olarak en fazla ne kadar olabilir?",
    answer:
      "Satışta alıcı ve satıcının her birinden ayrı ayrı en fazla %2 + KDV, kiralamada kiracı ve kiraya verenin her birinden ayrı ayrı en fazla 1 aylık kira bedeli + KDV komisyon alınabilir. Emlak Komisyonu Hesaplama aracımız bu tavan oranlarına göre hesap yapar.",
  },
];

export const metadata: Metadata = {
  title: "Emlakçı Araçları: Komisyon, Dönüm-m², Alan Dönüşümleri",
  description:
    "Emlakçı ve gayrimenkul danışmanları için tek sayfada toplanmış araçlar: emlak komisyonu hesaplama, dönüm/dekar/m² dönüşümleri ve KDV hesaplama.",
  alternates: {
    canonical: "/emlakci-araclari",
  },
  openGraph: {
    title: "Emlakçı Araçları: Komisyon, Dönüm-m², Alan Dönüşümleri",
    description:
      "Emlak komisyonu hesaplama, dönüm/dekar/m² dönüşümleri ve KDV hesaplama tek sayfada.",
    url: buildSiteUrl("/emlakci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const areaReferenceTable = [
  ["1 Dönüm", "1000 m²", "1 Dekar"],
  ["1 Dekar", "1000 m²", "1 Dönüm"],
  ["1 Hektar", "10.000 m²", "10 Dönüm"],
  ["1 Dönüm", "0,1 Hektar", "—"],
];

export default function EmlakciAraclariPage() {
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
        name: "Emlakçı Araçları",
        item: buildSiteUrl("/emlakci-araclari"),
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
          <span>Emlakçı Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Emlakçı Araçları</h1>
          <p>
            Emlakçı, gayrimenkul danışmanı ve arsa/arazi alım satımıyla
            uğraşan herkes için hesaplama araçlarını ve referans
            bilgileri tek sayfada topladık: emlak komisyonu, dönüm/m²
            dönüşümleri ve KDV hesaplama.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1 dönüm</strong> = 1000 m² = 1 dekar
            </li>
            <li>
              <strong>Satış komisyonu tavanı</strong>: taraf başına %2 +
              KDV
            </li>
            <li>
              <strong>Kiralama komisyonu tavanı</strong>: taraf başına 1
              aylık kira + KDV
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/emlak-komisyonu-hesaplama">
                Emlak Komisyonu Hesaplama
              </Link>{" "}
              — satış veya kiralama bedelinden, yasal tavan oranlarına
              göre KDV dahil/hariç komisyonu hesapla.
            </li>
            <li>
              <Link href="/kdv-hesaplama">KDV Hesaplama</Link> — KDV
              dahil veya KDV hariç tutarı hesapla.
            </li>
            <li>
              <Link href="/kategoriler/alan">Alan Birim Dönüşümleri</Link>
              {" "}— m², dönüm, dekar, hektar arasında dönüşüm yap.
            </li>
            <li>
              <Link href="/kategoriler/uzunluk">Uzunluk Birim Dönüşümleri</Link>
            </li>
          </ul>

          <h2>Dönüm / Dekar / m² / Hektar Karşılık Tablosu</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Türkiye&apos;de yaygın kullanılan arazi alanı birimleri</caption>
              <thead>
                <tr>
                  <th scope="col">Birim</th>
                  <th scope="col">m² Karşılığı</th>
                  <th scope="col">Diğer Karşılık</th>
                </tr>
              </thead>
              <tbody>
                {areaReferenceTable.map((row, index) => (
                  <tr key={`${row[0]}-${index}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${row[0]}-${index}-${cellIndex}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            1 dönüm, Türkiye&apos;de modern standarda göre tam olarak
            1000 m²&apos;dir ve 1 dekara eşittir. Daha fazla arazi
            birimi ve tam hassasiyette dönüşüm için{" "}
            <Link href="/kategoriler/alan">Alan Dönüşümleri</Link>{" "}
            sayfasını kullanabilirsin.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>1 dönüm kaç m²&apos;dir?</strong>
            <br />
            1 dönüm, Türkiye&apos;de modern standarda göre tam olarak
            1000 m²&apos;dir ve 1 dekara eşittir. Osmanlı döneminde
            bölgeden bölgeye değişen (900-1600 m² arası) bir birimdi;
            1931&apos;deki Ölçüler ve Ayarlar Kanunu ile 1000 m² olarak
            standartlaştırıldı.
          </p>
          <p>
            <strong>
              Emlak komisyonu yasal olarak en fazla ne kadar olabilir?
            </strong>
            <br />
            Satışta alıcı ve satıcının her birinden ayrı ayrı en fazla
            %2 + KDV, kiralamada kiracı ve kiraya verenin her birinden
            ayrı ayrı en fazla 1 aylık kira bedeli + KDV komisyon
            alınabilir.{" "}
            <Link href="/emlak-komisyonu-hesaplama">
              Emlak Komisyonu Hesaplama
            </Link>{" "}
            aracımız bu tavan oranlarına göre hesap yapar.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Dönüm/dekar karşılığı 1931 Ölçüler ve Ayarlar Kanunu&apos;na,
            emlak komisyonu tavan oranları T.C. Ticaret
            Bakanlığı&apos;nın Taşınmaz Ticareti Hakkında
            Yönetmeliği&apos;ne dayanmaktadır. Bu sayfa genel
            bilgilendirme amaçlıdır, hukuki/mali tavsiye yerine geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
