import type { Metadata } from "next";
import Link from "next/link";
import QsofaCalculator from "../components/QsofaCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "qSOFA ne için kullanılır?",
    answer:
      "qSOFA (quick SOFA), sepsis şüphesi olan hastalarda yatak başı hızlı bir risk taraması yapmak için kullanılan, laboratuvar sonucu gerektirmeyen 3 kriterlik basit bir skordur.",
  },
  {
    question: "qSOFA ile tam SOFA skoru aynı şey mi?",
    answer:
      "Hayır. qSOFA, laboratuvar gerektirmeyen hızlı bir tarama aracıdır; tam SOFA skoru ise 6 organ sistemini laboratuvar değerleriyle birlikte değerlendiren, yoğun bakımda kullanılan daha kapsamlı bir skordur.",
  },
];

export const metadata: Metadata = {
  title: "qSOFA Hesaplama (Sepsis Taraması)",
  description:
    "Sistolik kan basıncı, solunum sayısı ve bilinç durumundan qSOFA puanını hesapla.",
  alternates: { canonical: "/qsofa-hesaplama" },
  openGraph: {
    title: "qSOFA Hesaplama (Sepsis Taraması)",
    description: "qSOFA puanını hesaplayın.",
    url: buildSiteUrl("/qsofa-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function QsofaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "qSOFA Hesaplama", item: buildSiteUrl("/qsofa-hesaplama") },
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
          <span>qSOFA Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>qSOFA Hesaplama</h1>
          <p>
            Sistolik kan basıncı, solunum sayısı ve bilinç durumunu
            işaretle: qSOFA puanını anında hesapla.
          </p>
        </header>

        <QsofaCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>qSOFA ne için kullanılır?</strong>
            <br />
            qSOFA (quick SOFA), sepsis şüphesi olan hastalarda yatak
            başı hızlı bir risk taraması yapmak için kullanılan,
            laboratuvar sonucu gerektirmeyen 3 kriterlik basit bir
            skordur.
          </p>
          <p>
            <strong>qSOFA ile tam SOFA skoru aynı şey mi?</strong>
            <br />
            Hayır. qSOFA, laboratuvar gerektirmeyen hızlı bir tarama
            aracıdır; tam SOFA skoru ise 6 organ sistemini
            laboratuvar değerleriyle birlikte değerlendiren, yoğun
            bakımda kullanılan daha kapsamlı bir skordur.{" "}
            <Link href="/sofa-skoru-hesaplama">SOFA Skoru Hesaplama</Link>{" "}
            aracımıza bakabilirsin.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Diğer doktor ve hemşire araçları için{" "}
            <Link href="/doktor-hemsire-araclari">Doktor ve Hemşire Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Skor, Sepsis-3 (2016) uzlaşı tanımlarına dayanmaktadır. Bu
            araç tıbbi tavsiye yerine geçmez; tanı ve tedavi kararı
            için bir hekime danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
