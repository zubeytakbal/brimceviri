import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu sayfadaki araçlar bir P-T kartının yerini alır mı?",
    answer:
      "Hayır. Superheat/subcooling hesaplayıcısı, doyma sıcaklığını senin P-T kartından veya uygulamandan okumanı gerektirir; kendisi basınç-sıcaklık dönüşümü yapmaz.",
  },
];

export const metadata: Metadata = {
  title: "Klima ve Soğutma Teknisyeni Araçları: Superheat, Subcooling",
  description:
    "Klima ve soğutma teknisyenleri için tek sayfada toplanmış araçlar: superheat (aşırı kızdırma) ve subcooling (alt soğutma) hesaplama, klima BTU hesaplama.",
  alternates: {
    canonical: "/klima-sogutma-teknisyeni-araclari",
  },
  openGraph: {
    title: "Klima ve Soğutma Teknisyeni Araçları: Superheat, Subcooling",
    description: "Superheat ve subcooling hesaplama tek sayfada.",
    url: buildSiteUrl("/klima-sogutma-teknisyeni-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function KlimaSogutmaTeknisyeniAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Klima ve Soğutma Teknisyeni Araçları", item: buildSiteUrl("/klima-sogutma-teknisyeni-araclari") },
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
          <span>Klima ve Soğutma Teknisyeni Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Klima ve Soğutma Teknisyeni Araçları</h1>
          <p>
            Klima ve soğutma teknisyenlerinin sistem tanısında
            ihtiyaç duyduğu hesaplama araçlarını tek sayfada topladık:
            superheat (aşırı kızdırma) ve subcooling (alt soğutma)
            hesaplama, klima kapasitesi hesaplama.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Superheat</strong> = Ölçülen Buharlaştırıcı Çıkış Sıcaklığı - Doyma Sıcaklığı
            </li>
            <li>
              <strong>Subcooling</strong> = Doyma Sıcaklığı - Ölçülen Sıvı Hattı Sıcaklığı
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/superheat-subcooling-hesaplama">
                Superheat ve Subcooling Hesaplama
              </Link>{" "}
              — ölçülen sıcaklık ve doyma sıcaklığından superheat ve
              subcooling değerlerini hesapla.
            </li>
            <li>
              <Link href="/klima-btu-hesaplama">Klima BTU Hesaplama</Link>
              {" "}— oda alanı, kişi sayısı ve güneş/kat durumundan
              uygun klima kapasitesini hesapla.
            </li>
            <li>
              <Link href="/kombi-klima-isitma-maliyeti-karsilastirma">
                Kombi mi Klima mı?
              </Link>{" "}
              — doğalgaz ve elektrik fiyatı, kombi verimi ve klima
              SCOP değeriyle ısıtma maliyetini kıyasla.
            </li>
            <li>
              <Link href="/isi-pompasi-kombi-karsilastirma">
                Isı Pompası mı Kombi mi?
              </Link>{" "}
              — ısı pompasının COP değeri ve kurulum maliyeti
              farkıyla amortisman süresini hesapla.
            </li>
          </ul>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
