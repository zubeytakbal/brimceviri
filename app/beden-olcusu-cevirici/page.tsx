import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Türkiye beden numarası hangi sisteme denk gelir?",
    answer:
      "Türkiye (TR) beden numaralandırması genel olarak Avrupa (EU) sistemiyle aynıdır — TR 38 ile EU 38 aynı bedeni ifade eder. ABD (US) ve İngiltere (UK) sistemleri farklı sayılar kullanır.",
  },
  {
    question: "Neden markaya göre beden farklı çıkabiliyor?",
    answer:
      "Beden numaraları, ayakkabı numarasının aksine (ayak uzunluğuna dayalı fiziksel bir ölçüm) resmi/uluslararası olarak tam standardize edilmemiştir. Her marka kendi kalıbına göre bedenlendirme yapar; bu yüzden aşağıdaki tablo genel bir referanstır, kesin ölçü için her zaman markanın kendi beden tablosuna bakılmalıdır.",
  },
  {
    question: "Gömlek yaka ölçüsü nasıl alınır?",
    answer:
      "Mezurayı boynun en dış kısmından, işaret parmağını gırtlak ile mezura arasına koyarak (dar olmaması için) sarıp ölçmelisin. Çıkan cm değeri, aşağıdaki tablodaki yaka ölçüsü sütunuyla karşılaştırılarak beden bulunur.",
  },
];

export const metadata: Metadata = {
  title: "Beden Ölçüsü Çevirici: TR, EU, US, UK Giyim Bedeni",
  description:
    "Kadın giyim bedenini TR/EU, US ve UK arasında, erkek gömlek bedenini yaka ve göğüs ölçüsüne göre S-XXL arasında çevir.",
  alternates: {
    canonical: "/beden-olcusu-cevirici",
  },
  openGraph: {
    title: "Beden Ölçüsü Çevirici: TR, EU, US, UK Giyim Bedeni",
    description:
      "Kadın ve erkek giyim bedenini TR/EU, US, UK sistemleri arasında çevirin.",
    url: buildSiteUrl("/beden-olcusu-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const womenSizeTable = [
  ["32", "2", "4"],
  ["34", "4", "6"],
  ["36", "6", "8"],
  ["38", "8", "10"],
  ["40", "10", "12"],
  ["42", "12", "14"],
  ["44", "14", "16"],
  ["46", "16", "18"],
];

const menShirtSizeTable = [
  ["S", "46-48", "38", "90-95"],
  ["M", "48-50", "40", "96-101"],
  ["L", "50-52", "42", "102-107"],
  ["XL", "52-54", "44", "108-113"],
  ["XXL", "54-56", "46", "114-119"],
];

export default function BedenOlcusuCeviriciPage() {
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
        name: "Beden Ölçüsü Çevirici",
        item: buildSiteUrl("/beden-olcusu-cevirici"),
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
          <span>Beden Ölçüsü Çevirici</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Beden Ölçüsü Çevirici</h1>
          <p>
            Kadın giyim bedenini TR/EU, US ve UK arasında, erkek gömlek
            bedenini yaka ve göğüs ölçüsüne göre S-XXL arasında çevir.
            Bu değerler genel referans tablolardır — markaya göre
            birkaç numara sapma olabilir.
          </p>
        </header>

        <section className="category-article-content">
          <h2>Kadın Beden Tablosu (TR/EU - US - UK)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Kadın giyim bedeni TR/EU, US ve UK karşılıkları</caption>
              <thead>
                <tr>
                  <th scope="col">TR / EU</th>
                  <th scope="col">US</th>
                  <th scope="col">UK</th>
                </tr>
              </thead>
              <tbody>
                {womenSizeTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Türkiye (TR) beden numaralandırması genel olarak Avrupa
            (EU) sistemiyle aynıdır. Bu tablo üst giyim (elbise,
            gömlek, ceket) için geneldir; pantolon bel ölçüsü ayrı bir
            numaralandırma kullanabilir.
          </p>

          <h2>Erkek Gömlek Beden Tablosu (S - XXL)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Erkek gömlek bedeni, TR numarası, yaka ve göğüs ölçüsü</caption>
              <thead>
                <tr>
                  <th scope="col">Beden</th>
                  <th scope="col">TR Numarası</th>
                  <th scope="col">Yaka (cm)</th>
                  <th scope="col">Göğüs (cm)</th>
                </tr>
              </thead>
              <tbody>
                {menShirtSizeTable.map((row) => (
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
            <strong>Türkiye beden numarası hangi sisteme denk gelir?</strong>
            <br />
            Türkiye (TR) beden numaralandırması genel olarak Avrupa
            (EU) sistemiyle aynıdır — TR 38 ile EU 38 aynı bedeni ifade
            eder. ABD (US) ve İngiltere (UK) sistemleri farklı sayılar
            kullanır.
          </p>
          <p>
            <strong>Neden markaya göre beden farklı çıkabiliyor?</strong>
            <br />
            Beden numaraları, ayakkabı numarasının aksine (ayak
            uzunluğuna dayalı fiziksel bir ölçüm) resmi/uluslararası
            olarak tam standardize edilmemiştir. Her marka kendi
            kalıbına göre bedenlendirme yapar; bu yüzden yukarıdaki
            tablo genel bir referanstır, kesin ölçü için her zaman
            markanın kendi beden tablosuna bakılmalıdır.
          </p>
          <p>
            <strong>Gömlek yaka ölçüsü nasıl alınır?</strong>
            <br />
            Mezurayı boynun en dış kısmından, işaret parmağını gırtlak
            ile mezura arasına koyarak (dar olmaması için) sarıp
            ölçmelisin. Çıkan cm değeri, yukarıdaki tablodaki yaka
            ölçüsü sütunuyla karşılaştırılarak beden bulunur.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Yüzük ölçün için{" "}
            <Link href="/yuzuk-olcusu-cevirici">Yüzük Ölçüsü Çevirici</Link>
            , ayakkabı numaran için{" "}
            <Link href="/ayakkabi-numarasi-cevirme">
              Ayakkabı Numarası Çevirici
            </Link>
            , diğer terzi/moda araçları için{" "}
            <Link href="/terzi-araclari">Terzi Araçları</Link> sayfasına
            bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Beden karşılıkları, Türkiye&apos;de yaygın kullanılan
            giyim markalarının genel beden tablolarından derlenen
            ortalama referans değerlerdir. Kesin ölçü her zaman
            satın alacağın markanın kendi beden tablosundan teyit
            edilmelidir.
          </p>
        </section>
      </div>
    </main>
  );
}
