import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Harf notu tablosu her okulda aynı mı?",
    answer:
      "Hayır. Buradaki tablo yaygın kullanılan genel bir referanstır; okulunun veya üniversitenin kendi yönetmeliğinde farklı eşik değerleri olabilir.",
  },
];

export const metadata: Metadata = {
  title: "Öğretmen Araçları: Harf Notu, Not Ortalaması",
  description:
    "Öğretmenler için tek sayfada toplanmış araçlar: harf notu (100'lük-4'lük sistem) hesaplama, not ortalaması ve devamsızlık hesaplama.",
  alternates: {
    canonical: "/ogretmen-araclari",
  },
  openGraph: {
    title: "Öğretmen Araçları: Harf Notu, Not Ortalaması",
    description: "Harf notu hesaplama tek sayfada.",
    url: buildSiteUrl("/ogretmen-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function OgretmenAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Öğretmen Araçları", item: buildSiteUrl("/ogretmen-araclari") },
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
          <span>Öğretmen Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Öğretmen Araçları</h1>
          <p>
            Öğretmenlerin notlandırma ve sınıf yönetiminde ihtiyaç
            duyduğu hesaplama araçlarını tek sayfada topladık: harf
            notu hesaplama, not ortalaması ve devamsızlık hesaplama.
          </p>
        </header>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/harf-notu-hesaplama">Harf Notu Hesaplama</Link>
              {" "}— 100&apos;lük puanı harf notuna ve 4&apos;lük
              sisteme çevir.
            </li>
            <li>
              <Link href="/bilim-hesaplayicilari/matematik/ortalama-hesaplama">
                Ortalama Hesaplama
              </Link>{" "}
              — birden fazla notun aritmetik ortalamasını hesapla.
            </li>
            <li>
              <Link href="/devamsizlik-hesaplama">Devamsızlık Hesaplama</Link>
              {" "}— okul veya üniversite devamsızlık limitine göre
              kalan hakkı hesapla.
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
