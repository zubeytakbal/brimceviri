import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kokteyl tariflerinde geçen \"oz\" hangi ons?",
    answer:
      "Kokteyl tariflerinde geçen oz her zaman sıvı ons (fl oz, ~29,57 mL) anlamına gelir; ağırlık onsu (~28,35 g) ile karıştırılmamalıdır.",
  },
  {
    question: "Bu sayfadaki araçlar sağlık tavsiyesi verir mi?",
    answer:
      "Hayır. Standart içki hesaplayıcısı yalnızca saf alkol miktarını hesaplar; alkol tüketimiyle ilgili sağlık tavsiyesi vermez.",
  },
  {
    question: "\"Jigger\", \"pony\", \"dash\", \"splash\" gibi ölçü isimleri ne kadar?",
    answer:
      "Bunlar bar ekipmanı ve tariflerde geçen geleneksel hacim isimleridir; kesin değerleri bölgeye göre küçük farklılıklar gösterebilir ama en yaygın karşılıklar: pony ≈ 1 oz (30 mL), jigger ≈ 1,5 oz (44 mL), dash ≈ 1 mL civarı (birkaç damla), splash ise kesin bir ölçü değil, genellikle 'az miktarda' anlamına gelir.",
  },
  {
    question: "Yaygın içeceklerin tipik ABV (alkol yüzdesi) aralığı nedir?",
    answer:
      "Biralarda tipik olarak %4-6, şaraplarda %11-14, likörlerde %15-30, distile içkilerde (votka, cin, viski, rom gibi) genellikle %35-45 ABV görülür. Bunlar geniş genel aralıklardır; kesin ABV her zaman şişe etiketinde belirtilen değerdir.",
  },
];

export const metadata: Metadata = {
  title: "Barmen Araçları: Kokteyl Ölçüsü, ABV Hesaplama",
  description:
    "Barmenler için tek sayfada toplanmış araçlar: oz/mL/cl kokteyl ölçüsü çevirme, alkol yüzdesi (ABV) ve standart içki hesaplama.",
  alternates: {
    canonical: "/barmen-araclari",
  },
  openGraph: {
    title: "Barmen Araçları: Kokteyl Ölçüsü, ABV Hesaplama",
    description: "Kokteyl ölçüsü ve ABV hesaplama tek sayfada.",
    url: buildSiteUrl("/barmen-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const barMeasureTable = [
  ["Dash", "≈ 1 mL (birkaç damla)"],
  ["Teaspoon (tsp)", "≈ 5 mL"],
  ["Pony", "≈ 30 mL (1 oz)"],
  ["Jigger", "≈ 44 mL (1,5 oz)"],
  ["Standart kadeh (shot, ABD)", "≈ 44 mL (1,5 oz)"],
];

const typicalAbvTable = [
  ["Bira", "%4 - %6"],
  ["Şarap", "%11 - %14"],
  ["Likör", "%15 - %30"],
  ["Distile içki (votka, cin, viski, rom)", "%35 - %45"],
];

export default function BarmenAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Barmen Araçları", item: buildSiteUrl("/barmen-araclari") },
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
          <Link href="/meslekler">Mesleğe Göre Araçlar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Barmen Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Barmen Araçları</h1>
          <p>
            Barmenlerin bar arkasında ihtiyaç duyduğu hesaplama
            araçlarını tek sayfada topladık: oz/mL/cl kokteyl ölçüsü
            çevirme, alkol yüzdesi (ABV) ve standart içki hesaplama.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1 oz</strong> ≈ 29,57 mL ≈ 2,96 cl
            </li>
            <li>
              <strong>Standart içki</strong> ≈ 10 g saf alkol (uluslararası yaygın referans)
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/kokteyl-olcusu-cevirici">Kokteyl Ölçüsü Çevirici</Link>
              {" "}— oz, mL ve cl arasında kokteyl ölçüsü çevir.
            </li>
            <li>
              <Link href="/abv-standart-icki-hesaplama">ABV ve Standart İçki Hesaplama</Link>
              {" "}— içecek hacmi ve alkol yüzdesinden saf alkol
              miktarını ve standart içki sayısını hesapla.
            </li>
          </ul>

          <h2>Yaygın Bar Ölçüleri</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Kokteyl tariflerinde geçen yaygın ölçü isimleri ve yaklaşık karşılıkları</caption>
              <thead>
                <tr>
                  <th scope="col">Ölçü</th>
                  <th scope="col">Yaklaşık Karşılık</th>
                </tr>
              </thead>
              <tbody>
                {barMeasureTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Yaygın İçeceklerin Tipik Alkol Yüzdesi (ABV)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>İçecek türüne göre tipik ABV aralıkları</caption>
              <thead>
                <tr>
                  <th scope="col">İçecek Türü</th>
                  <th scope="col">Tipik ABV Aralığı</th>
                </tr>
              </thead>
              <tbody>
                {typicalAbvTable.map((row) => (
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
            Bu değerler geniş genel aralıklardır; kesin ABV her zaman
            şişe etiketinde belirtilen değere göre hesaplanmalıdır.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Kaynaklar</h2>
          <p>
            Ölçü karşılıkları ve tipik ABV aralıkları, bar ve içki
            endüstrisinde yaygın kabul gören genel referans değerleridir.
          </p>
        </section>
      </div>
    </main>
  );
}
