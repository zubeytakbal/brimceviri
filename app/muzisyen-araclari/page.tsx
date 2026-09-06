import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Delay ve reverb süresini neden BPM'e göre ayarlamalıyım?",
    answer:
      "Delay veya reverb süresi şarkının temposuna kilitlendiğinde, efekt vuruşlarla senkronize çalar ve mix'te dağınık durmaz. Bu yüzden prodüktörler bu süreleri dörtlük, sekizlik gibi nota değerlerine göre hesaplar.",
  },
  {
    question: "A4 notası kaç Hz'dir?",
    answer:
      "Modern müzikte standart akort referansı A4 (orta La) notası 440 Hz'dir; bazı orkestra ve tarihi akort sistemleri 415-443 Hz arasında farklı referanslar kullanabilir.",
  },
];

export const metadata: Metadata = {
  title: "Müzisyen Araçları: BPM-MS Hesaplama, Frekans Dönüşümü",
  description:
    "Müzisyen ve prodüktörler için tek sayfada toplanmış araçlar: BPM'den delay/reverb süresi hesaplama, Hz/kHz frekans dönüşümleri.",
  alternates: {
    canonical: "/muzisyen-araclari",
  },
  openGraph: {
    title: "Müzisyen Araçları: BPM-MS Hesaplama, Frekans Dönüşümü",
    description: "BPM'den delay/reverb süresi ve frekans dönüşümleri tek sayfada.",
    url: buildSiteUrl("/muzisyen-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MuzisyenAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Müzisyen Araçları", item: buildSiteUrl("/muzisyen-araclari") },
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
          <span>Müzisyen Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Müzisyen Araçları</h1>
          <p>
            Müzisyen ve prodüktörlerin stüdyoda günlük olarak ihtiyaç
            duyduğu hesaplama araçlarını ve birim dönüşümlerini tek
            sayfada topladık: BPM&apos;den delay/reverb süresi hesaplama,
            Hz/kHz frekans dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Dörtlük nota süresi</strong> = 60000 / BPM (ms)
            </li>
            <li>
              <strong>A4 akort referansı</strong>: 440 Hz
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/bpm-ms-hesaplama">BPM - MS Hesaplama</Link>
              {" "}— temponun dörtlük, sekizlik, onaltılık gibi nota
              değerlerinin düz, noktalı ve triole milisaniye karşılığını
              hesapla.
            </li>
            <li>
              <Link href="/kategoriler/frekans">Frekans Dönüşümleri</Link>
              {" "}— Hz, kHz, MHz ve GHz birimleri arasında dönüşüm yap.
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
