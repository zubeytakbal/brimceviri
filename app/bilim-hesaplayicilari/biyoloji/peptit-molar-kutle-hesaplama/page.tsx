import type { Metadata } from "next";
import Link from "next/link";
import PeptideMolarMassCalculator from "../../../components/PeptideMolarMassCalculator";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Peptit molar kütlesi nasıl hesaplanır?",
    answer:
      "Bir peptit zinciri oluşurken, birleşen her iki amino asit arasında bir peptit bağı kurulur ve bu sırada 1 su molekülü (18,015 g/mol) açığa çıkar (dehidrasyon/kondansasyon reaksiyonu). Bu yüzden peptit molar kütlesi = serbest amino asitlerin molar kütleleri toplamı − (bağ sayısı × 18,015).",
  },
  {
    question: "Neden peptit, amino asitlerin toplamından daha hafif?",
    answer:
      "Çünkü her peptit bağı oluşumunda bir su molekülü kaybedilir. Örneğin 3 amino asitten oluşan bir tripeptitte 2 peptit bağı vardır, yani 2 × 18,015 = 36,03 g/mol su kaybedilir.",
  },
];

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const metadata: Metadata = {
  title: "Peptit Molar Kütle Hesaplama",
  description:
    "Amino asit dizisini yaz (Gly-Ala-Val gibi), peptit bağlarında kaybedilen suyu hesaba katarak peptit zincirinin molar kütlesini anında öğren.",
  alternates: { canonical: "/bilim-hesaplayicilari/biyoloji/peptit-molar-kutle-hesaplama" },
  openGraph: {
    title: "Peptit Molar Kütle Hesaplama",
    description: "Amino asit dizisinden peptit molar kütlesi hesapla.",
    url: buildSiteUrl("/bilim-hesaplayicilari/biyoloji/peptit-molar-kutle-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function PeptideMolarMassPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Biyoloji", item: buildSiteUrl("/bilim-hesaplayicilari/biyoloji") },
      { "@type": "ListItem", position: 3, name: "Peptit Molar Kütle Hesaplama", item: buildSiteUrl("/bilim-hesaplayicilari/biyoloji/peptit-molar-kutle-hesaplama") },
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
          <Link href="/bilim-hesaplayicilari/biyoloji">Biyoloji</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Peptit Molar Kütle Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Peptit Molar Kütle Hesaplama</h1>
          <p>
            Amino asit dizisini 3 harfli kodlarıyla yaz, peptit
            bağlarında kaybedilen suyu hesaba katarak zincirin toplam
            molar kütlesini anında gör.
          </p>
        </header>

        <PeptideMolarMassCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlginizi Çekebilir</h2>
          <p>
            Tüm amino asitlerin formül ve molar kütlelerini görmek için{" "}
            <Link href="/bilim-hesaplayicilari/biyoloji/amino-asitler">Amino Asitler</Link>
            {" "}sayfasına, DNA/RNA dizisini amino asit dizisine çevirmek için{" "}
            <Link href="/bilim-hesaplayicilari/biyoloji/kodon-tablosu">Kodon Tablosu</Link>
            {" "}sayfasına, genel mol hesaplamaları için{" "}
            <Link href="/bilim-hesaplayicilari/kimya/mol-hesaplama">Mol Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
