import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import FertilizerCalculator from "../components/FertilizerCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu araç bana hangi gübreyi ve dozu kullanmam gerektiğini söyler mi?",
    answer:
      "Hayır. Bu araç, zaten belirlenmiş bir hedef besin dozunu (kg/dekar), kullanacağın gübrenin besin içeriği yüzdesiyle birlikte, ürün miktarına (kg) çevirir. Hangi besin dozunun uygun olduğunu belirlemez — bu değer toprak analizi sonucuna ve ürün türüne göre değişir.",
  },
  {
    question: "Gübre ihtiyacı nasıl hesaplanır?",
    answer:
      "Dekara Gerekli Gübre (kg/da) = Hedef Besin Dozu (kg/da) ÷ (Gübrenin Besin İçeriği % / 100). Örneğin dekara 6 kg azot hedefliyorsan ve gübren %20 azot içeriyorsa, dekara 6 ÷ 0,20 = 30 kg gübre gerekir.",
  },
];

/** [gübre, besin, yüzde]: torba üzerindeki garanti değerleri. */
const GUBRELER: Array<[string, string, number]> = [
  ["Üre", "N", 46],
  ["Amonyum nitrat", "N", 33],
  ["Amonyum nitrat (kireçli)", "N", 26],
  ["Amonyum sülfat", "N", 21],
  ["DAP (18-46-0)", "P₂O₅", 46],
  ["Triple süper fosfat", "P₂O₅", 42],
  ["Potasyum sülfat", "K₂O", 50],
];

export const metadata: Metadata = {
  title: "Gübre İhtiyacı Hesaplama (kg/dekar)",
  description:
    "Hedef besin dozunu (kg/dekar) ve gübrenin besin içeriği yüzdesini gir; dekara ve toplam alana gereken gübre miktarını (kg) hesapla.",
  alternates: {
    canonical: "/gubre-ihtiyaci-hesaplama",
  },
  openGraph: {
    title: "Gübre İhtiyacı Hesaplama (kg/dekar)",
    description: "Hedef besin dozundan gübre miktarını hesapla.",
    url: buildSiteUrl("/gubre-ihtiyaci-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function FertilizerCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Tüm Hesaplamalar", item: buildSiteUrl("/hesaplayicilar") },
      { "@type": "ListItem", position: 3, name: "Tarım ve Hayvancılık", item: buildSiteUrl("/hesaplayicilar#tarim") },
      { "@type": "ListItem", position: 4, name: "Gübre İhtiyacı Hesaplama", item: buildSiteUrl("/gubre-ihtiyaci-hesaplama") },
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
          <Link href="/hesaplayicilar#tarim">Tarım ve Hayvancılık</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Gübre İhtiyacı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Gübre İhtiyacı Hesaplama</h1>
          <p>
            Hedef besin dozunu (kg/dekar) ve kullanacağın gübrenin
            besin içeriği yüzdesini gir: dekara ve toplam alana
            gereken gübre miktarını (kg) hesapla.
          </p>
        </header>

        <FertilizerCalculator />

        <section className="category-article-content">
          <h2 id="cesitler">Hangi gübreden ne kadar atılır?</h2>
          <p>
            Gübre torbasındaki sayılar, içindeki bitki besininin yüzdesidir: %46 azotlu üre, 100 kg&apos;da 46 kg saf azot
            taşır. Bu yüzden toprağa verilmek istenen saf besin, gübrenin besin yüzdesine bölünerek gübre miktarına çevrilir.
            Tablo dekara 5, 10 ve 15 kg saf besin vermek için gereken gübreyi gösterir.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Gübre</th>
                  <th>5 kg/da</th>
                  <th>10 kg/da</th>
                  <th>15 kg/da</th>
                </tr>
              </thead>
              <tbody>
                {GUBRELER.map(([ad, besin, oran]) => (
                  <tr key={ad}>
                    <td>
                      {ad} ({besin} %{oran})
                    </td>
                    {[5, 10, 15].map((h) => (
                      <td key={h}>{Math.round((h * 100) / oran)} kg</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Örneğin dekara 10 kg saf azot isteyen bir buğday tarlası için {Math.round(1000 / 46)} kg üre ya da{" "}
            {Math.round(1000 / 26)} kg %26&apos;lık amonyum nitrat gerekir. Ne kadar saf besin verileceğini toprak analizi
            belirler; analiz sonucundaki öneriyi yukarıdaki araca girerek kendi tarlanızın gübre miktarını hesaplayın.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlgili araçlar</h2>
          <p>
            Diğer çiftçi araçları için{" "}
            <Link href="/hesaplayicilar#tarim">Tarım ve Hayvancılık</Link>
            {" "}sayfasına, tohum miktarı hesaplama için{" "}
            <Link href="/tohum-miktari-hesaplama">Tohum Miktarı Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, temel besin dozu-içerik aritmetiğine dayanır. Bu
            araç ve sonuçları tarımsal danışmanlık yerine geçmez;
            hangi dozun uygun olduğunu belirlemez.
          </p>
        </section>
      </div>
    </main>
  );
}
