import type { Metadata } from "next";
import Link from "next/link";
import PoolVolumeCalculator from "../components/PoolVolumeCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Havuz hacmi nasıl hesaplanır?",
    answer:
      "Dikdörtgen havuzlarda Hacim (m³) = Uzunluk × Genişlik × Ortalama Derinlik formülü kullanılır. Yuvarlak havuzlarda ise Hacim (m³) = π × (Çap/2)² × Ortalama Derinlik formülü kullanılır.",
  },
  {
    question: "Ortalama derinlik nasıl bulunur?",
    answer:
      "Sığ ve derin uçları farklı olan havuzlarda ortalama derinlik, (sığ uç derinliği + derin uç derinliği) / 2 formülüyle yaklaşık olarak hesaplanabilir.",
  },
];

export const metadata: Metadata = {
  title: "Havuz Hacmi Hesaplama (m³)",
  description:
    "Dikdörtgen veya yuvarlak havuzların ölçülerinden metreküp (m³) cinsinden su hacmini hesapla.",
  alternates: {
    canonical: "/havuz-hacmi-hesaplama",
  },
  openGraph: {
    title: "Havuz Hacmi Hesaplama (m³)",
    description: "Havuz ölçülerinden su hacmini hesapla.",
    url: buildSiteUrl("/havuz-hacmi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PoolVolumeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Havuz Teknisyeni Araçları", item: buildSiteUrl("/havuz-teknisyeni-araclari") },
      { "@type": "ListItem", position: 4, name: "Havuz Hacmi Hesaplama", item: buildSiteUrl("/havuz-hacmi-hesaplama") },
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
          <Link href="/havuz-teknisyeni-araclari">Havuz Teknisyeni Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Havuz Hacmi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Havuz Hacmi Hesaplama</h1>
          <p>
            Dikdörtgen veya yuvarlak havuzunun ölçülerini gir: su
            hacmini metreküp (m³) cinsinden hesapla.
          </p>
        </header>

        <PoolVolumeCalculator />

        <section className="category-article-content">
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
            Diğer havuz teknisyeni araçları için{" "}
            <Link href="/havuz-teknisyeni-araclari">Havuz Teknisyeni Araçları</Link>
            {" "}sayfasına, klor dozajı hesaplama için{" "}
            <Link href="/klor-dozaji-hesaplama">Klor Dozajı Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
