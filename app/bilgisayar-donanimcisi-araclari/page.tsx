import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu araç bana kesin PSU modelini önerir mi?",
    answer:
      "Hayır. Bu araç yalnızca önerilen wattaj aralığını hesaplar; hangi PSU modelinin (verimlilik sertifikası, konnektör tipi, marka) uygun olduğunu belirlemez.",
  },
];

export const metadata: Metadata = {
  title: "Bilgisayar Donanımcısı Araçları: PSU Güç Hesaplama",
  description:
    "Bilgisayar donanımcıları için tek sayfada toplanmış araçlar: CPU/GPU gücünden PSU (güç kaynağı) wattajı hesaplama, veri depolama dönüşümleri.",
  alternates: {
    canonical: "/bilgisayar-donanimcisi-araclari",
  },
  openGraph: {
    title: "Bilgisayar Donanımcısı Araçları: PSU Güç Hesaplama",
    description: "PSU güç hesaplama tek sayfada.",
    url: buildSiteUrl("/bilgisayar-donanimcisi-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BilgisayarDonanimcisiAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Bilgisayar Donanımcısı Araçları", item: buildSiteUrl("/bilgisayar-donanimcisi-araclari") },
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
          <span>Bilgisayar Donanımcısı Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Bilgisayar Donanımcısı Araçları</h1>
          <p>
            Bilgisayar donanımcılarının sistem kurarken ihtiyaç
            duyduğu hesaplama araçlarını tek sayfada topladık: CPU/GPU
            gücünden PSU wattajı hesaplama, veri depolama birimi
            dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Önerilen Güvenlik Payı</strong>: %20-30
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/psu-guc-hesaplama">PSU Güç Kaynağı Hesaplama</Link>
              {" "}— CPU, GPU ve diğer bileşenlerin gücünden önerilen
              PSU wattajını hesapla.
            </li>
            <li>
              <Link href="/kategoriler/veri">Veri Depolama Dönüşümleri</Link>
              {" "}— bayt, KB, MB, GB, TB birimleri arasında dönüşüm
              yap.
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
