import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TarlaDonumCalculator from "../components/TarlaDonumCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const pagePath = "/tarla-donum-hesaplama";

const faqItems: FaqItem[] = [
  {
    question: "Tarla kaç dönüm nasıl hesaplanır?",
    answer:
      "Tarlanın alanı metrekare olarak bulunur ve 1.000'e bölünür. Örneğin 40 m × 75 m bir tarla 3.000 m²'dir, yani 3 dönüm. Düzensiz tarlada dört kenar ve bir köşegen ölçülür; tarla iki üçgene bölünüp alanları toplanır.",
  },
  {
    question: "1 dönüm kaç metrekare?",
    answer: "Bugün kullanılan dönüm (yeni dönüm) 1.000 m²'dir ve dekar ile aynıdır. 10 dönüm 1 hektar eder.",
  },
  {
    question: "Eski dönüm kaç metrekare?",
    answer:
      "Osmanlı döneminden kalan eski dönüm 40 × 40 = 1.600 arşın karedir; 1 arşın 0,758 m alındığında yaklaşık 919,3 m² eder. Eski tapu kayıtlarında ve bazı yörelerde hâlâ geçebilir; resmî işlemlerde dekar (1.000 m²) kullanılır.",
  },
  {
    question: "Dekar ile dönüm aynı şey mi?",
    answer:
      "Evet, günümüzde 1 dönüm = 1 dekar = 1.000 m² kabul edilir. Dekar resmî ve teknik dilde, dönüm ise günlük konuşmada kullanılır.",
  },
  {
    question: "Köşegen ölçmeden düzensiz tarla hesaplanır mı?",
    answer:
      "Hayır. Aynı dört kenar uzunluğuyla çok farklı alanlarda dörtgenler çizilebilir; alanı belirlemek için bir köşegen (ya da köşe açıları) gerekir. Kenarların ortalamasını çarpmak bu yüzden yanlış sonuç verir.",
  },
];

const title = "Tarla Dönüm Hesaplama: Kenarlardan m², Dönüm, Hektar";
const description =
  "Tarlanın kenarlarını metre olarak girin; dikdörtgen, üçgen veya düzensiz tarlanın alanını m², dönüm, eski dönüm, ar ve hektar olarak hemen hesaplayın.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pagePath },
  openGraph: { title, description, url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function TarlaDonumPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Alan Dönüşümleri", item: buildSiteUrl("/kategoriler/alan") },
      { "@type": "ListItem", position: 3, name: "Tarla Dönüm Hesaplama", item: buildSiteUrl(pagePath) },
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
          <Link href="/kategoriler/alan">Alan Dönüşümleri</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Tarla Dönüm Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Tarla Dönüm Hesaplama</h1>
          <p>
            Tarlanın ya da arsanın kenarlarını metre olarak girin. Dikdörtgen, üçgen ve düzensiz dört kenarlı araziler için alanı m²,
            dönüm, eski dönüm, ar ve hektar olarak anında görün.
          </p>
        </header>

        <TarlaDonumCalculator />

        <section className="category-article-content">
          <h2>Tarla nasıl ölçülür?</h2>
          <p>
            <strong>Dikdörtgen tarla:</strong> iki komşu kenarı (en ve boy) ölçün. 40 m × 75 m = 3.000 m² = 3 dönüm.
          </p>
          <p>
            <strong>Düzensiz tarla:</strong> dört köşeye A, B, C, D deyin. Dört kenarı ve A ile C köşesi arasındaki köşegeni ölçün.
            Köşegen tarlayı iki üçgene böler; her üçgenin alanı üç kenarından (Heron formülü) bulunur ve ikisi toplanır. Çok köşeli
            arazilerde aynı yöntemle daha fazla üçgene bölebilirsiniz.
          </p>
          <p>
            <strong>Üçgen tarla:</strong> üç kenarı ölçmek yeterlidir.
          </p>

          <h2>Dönüm, dekar, eski dönüm ve hektar</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Birim</th>
                  <th>Metrekare</th>
                  <th>Not</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 dönüm (yeni)</td>
                  <td>1.000 m²</td>
                  <td>1 dekar ile aynı</td>
                </tr>
                <tr>
                  <td>1 dekar</td>
                  <td>1.000 m²</td>
                  <td>Resmî tarım birimi</td>
                </tr>
                <tr>
                  <td>1 eski dönüm</td>
                  <td>≈ 919,3 m²</td>
                  <td>1.600 arşın kare</td>
                </tr>
                <tr>
                  <td>1 ar</td>
                  <td>100 m²</td>
                  <td>10 ar = 1 dönüm</td>
                </tr>
                <tr>
                  <td>1 hektar</td>
                  <td>10.000 m²</td>
                  <td>10 dönüm</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlgili dönüşümler</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/metrekare-donum">Metrekare → Dönüm</Link>
            </li>
            <li>
              <Link href="/donum-metrekare">Dönüm → Metrekare</Link>
            </li>
            <li>
              <Link href="/hektar-donum">Hektar → Dönüm</Link>
            </li>
            <li>
              <Link href="/dekar-donum">Dekar → Dönüm</Link>
            </li>
            <li>
              <Link href="/kategoriler/alan">Tüm alan dönüşümleri</Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
