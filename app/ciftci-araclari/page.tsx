import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu sayfadaki araçlar tarımsal danışmanlık yerine geçer mi?",
    answer:
      "Hayır. Buradaki araçlar genel hesaplama amaçlıdır; hangi gübre dozunun, tohum çeşidinin veya ekim sıklığının uygun olduğunu belirlemez. Bu değerler toprak analizi, ürün çeşidi ve bölgeye göre değişir ve bir ziraat mühendisinden alınmalıdır.",
  },
  {
    question: "Çiftçi Araçları ile Emlakçı Araçları arasındaki fark nedir?",
    answer:
      "Emlakçı Araçları dönüm/dekar/m² alan birimlerini fiyat ve komisyon hesaplarıyla ilişkilendirir. Çiftçi Araçları ise aynı alan birimlerini gübre ve tohum ihtiyacı gibi üretim girdisi hesaplarında kullanır.",
  },
  {
    question: "Gübre etiketindeki N-P-K sayıları ne anlama gelir?",
    answer:
      "N-P-K, gübrenin sırasıyla azot (N), fosfor (P₂O₅) ve potasyum (K₂O) içeriğinin ağırlıkça yüzdesini gösterir. Örneğin 20-20-0 yazan bir gübre, ağırlığının %20'si azot ve %20'si fosfor içerir, potasyum içermez demektir. Gübre İhtiyacı Hesaplama aracımızda hedef dozu bu yüzdeye bölerek gereken toplam gübre miktarını bulabilirsin.",
  },
  {
    question: "1 dönüm, dekar ve hektar kaç m²'dir?",
    answer:
      "Türkiye'de 1 dönüm ve 1 dekar aynı alanı ifade eder ve 1.000 m²'ye eşittir (resmi ölçü birimi dekardır, dönüm ise geleneksel/günlük kullanımdaki karşılığıdır). 1 hektar ise 10 dönüm/dekara, yani 10.000 m²'ye eşittir.",
  },
];

export const metadata: Metadata = {
  title: "Çiftçi Araçları: Gübre ve Tohum Miktarı Hesaplama",
  description:
    "Çiftçi ve ziraat mühendisleri için tek sayfada toplanmış araçlar: gübre ihtiyacı (kg/dekar), tohum miktarı (tohumluk) hesaplama ve alan birimi dönüşümleri.",
  alternates: {
    canonical: "/ciftci-araclari",
  },
  openGraph: {
    title: "Çiftçi Araçları: Gübre ve Tohum Miktarı Hesaplama",
    description: "Gübre ve tohum miktarı hesaplama tek sayfada.",
    url: buildSiteUrl("/ciftci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const commonFertilizerTable = [
  ["Üre", "46-0-0"],
  ["DAP (Diamonyum Fosfat)", "18-46-0"],
  ["Kompoze 20-20-0", "20-20-0"],
  ["Kompoze 15-15-15", "15-15-15"],
  ["Amonyum Sülfat", "21-0-0"],
];

export default function CiftciAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Çiftçi Araçları", item: buildSiteUrl("/ciftci-araclari") },
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
          <span>Çiftçi Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Çiftçi Araçları</h1>
          <p>
            Çiftçi ve ziraat mühendislerinin ekim öncesi planlamada
            ihtiyaç duyduğu hesaplama araçlarını tek sayfada topladık:
            gübre ihtiyacı, tohum miktarı (tohumluk) ve alan birimi
            dönüşümleri. Hiçbiri gübre dozu veya tohum çeşidi önermez —
            bu değerler her zaman kullanıcı tarafından girilir.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Gübre Miktarı</strong> = Hedef Doz (kg/da) ÷ Besin İçeriği %
            </li>
            <li>
              <strong>Tohumluk</strong> = (Bitki/m² × Bin Dane Ağırlığı) ÷ (Çimlenme × Saflık × 1000)
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/gubre-ihtiyaci-hesaplama">Gübre İhtiyacı Hesaplama</Link>
              {" "}— hedef besin dozu ve gübrenin besin içeriğinden,
              dekara ve toplam alana gereken gübre miktarını hesapla.
            </li>
            <li>
              <Link href="/tohum-miktari-hesaplama">Tohum Miktarı Hesaplama</Link>
              {" "}— hedef bitki sayısı, bin dane ağırlığı, çimlenme ve
              saflık oranından tohumluk miktarını hesapla.
            </li>
            <li>
              <Link href="/kategoriler/alan">Alan Dönüşümleri</Link>
              {" "}— dönüm, dekar, hektar ve m² birimleri arasında
              dönüşüm yap.
            </li>
          </ul>

          <h2>Yaygın Gübre Çeşitleri ve N-P-K İçerikleri</h2>
          <p>
            Türkiye&apos;de yaygın kullanılan bazı gübre çeşitlerinin
            tipik N-P-K (azot-fosfor-potasyum) analiz değerleri:
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Yaygın gübre çeşitleri ve N-P-K (%) analiz değerleri</caption>
              <thead>
                <tr>
                  <th scope="col">Gübre Çeşidi</th>
                  <th scope="col">N-P-K (%)</th>
                </tr>
              </thead>
              <tbody>
                {commonFertilizerTable.map((row) => (
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
            Bu değerler yaygın üretici standardıdır; kullandığın gübrenin
            kesin N-P-K oranı için her zaman ürün etiketine bakmalısın.
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
            N-P-K analiz değerleri, gübre endüstrisinde yaygın kullanılan
            standart ürün etiketleme değerlerine dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
