import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Antrenör Araçları ile Diyetisyen Araçları arasındaki fark nedir?",
    answer:
      "Diyetisyen Araçları beslenme ve klinik ölçümlere (BMI, kalori ihtiyacı, vücut yağ oranı) odaklanır. Antrenör Araçları ise antrenman performansına (1RM, koşu temposu) odaklanır. İkisini birlikte kullanabilirsin.",
  },
  {
    question: "Bu sayfadaki araçlar antrenörlük tavsiyesi yerine geçer mi?",
    answer:
      "Hayır. Buradaki araçlar genel hesaplama amaçlıdır; kişiye özel antrenman programı veya sağlık tavsiyesi vermez.",
  },
];

export const metadata: Metadata = {
  title: "Antrenör Araçları: 1RM Hesaplama, Koşu Temposu",
  description:
    "Antrenör ve sporcular için tek sayfada toplanmış araçlar: 1RM (bir tekrar maksimum) hesaplama, antrenman yüzdesi tablosu, koşu pace hesaplama.",
  alternates: {
    canonical: "/antrenor-araclari",
  },
  openGraph: {
    title: "Antrenör Araçları: 1RM Hesaplama, Koşu Temposu",
    description: "1RM hesaplama ve koşu pace hesaplama tek sayfada.",
    url: buildSiteUrl("/antrenor-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AntrenorAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Antrenör Araçları", item: buildSiteUrl("/antrenor-araclari") },
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
          <span>Antrenör Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Antrenör Araçları</h1>
          <p>
            Antrenör ve sporcuların performans takibinde ihtiyaç
            duyduğu hesaplama araçlarını tek sayfada topladık: 1RM
            (bir tekrar maksimum) hesaplama, antrenman yüzdesi
            tablosu ve koşu temposu hesaplama. Beslenme ve klinik
            hesaplamalar için{" "}
            <Link href="/diyetisyen-araclari">Diyetisyen Araçları</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>1RM (Epley)</strong> = Ağırlık × (1 + Tekrar/30)
            </li>
            <li>
              <strong>%75 1RM</strong> ≈ 10 tekrarlık set ağırlığı
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/1rm-hesaplama">1RM Hesaplama</Link>
              {" "}— kaldırdığın ağırlık ve tekrar sayısından tahmini
              1RM&apos;ini ve antrenman yüzdesi tablosunu hesapla.
            </li>
            <li>
              <Link href="/kosu-pace-hesaplama">Koşu Pace Hesaplama</Link>
              {" "}— mesafe, süre ve tempo arasında hesaplama yap;
              yarış mesafeleri için tahmini bitiş süresi gör.
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
