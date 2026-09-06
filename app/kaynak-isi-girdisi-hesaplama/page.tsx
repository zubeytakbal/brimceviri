import type { Metadata } from "next";
import Link from "next/link";
import HeatInputCalculator from "../components/HeatInputCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kaynak ısı girdisi (heat input) nasıl hesaplanır?",
    answer:
      "Isı Girdisi (kJ/mm) = (Voltaj × Akım × 60) / (Kaynak Hızı (mm/dakika) × 1000). Bu, EN 1011 standardına dayanan genel bir hesaptır; işlem verimi katsayısı dahil değildir.",
  },
  {
    question: "Isı girdisi neden önemlidir?",
    answer:
      "Isı girdisi, kaynak dikişinin soğuma hızını ve dolayısıyla mikroyapısını, sertliğini ve çatlak riskini etkiler. Çok yüksek veya çok düşük ısı girdisi, malzemeye göre istenmeyen mekanik özelliklere yol açabilir.",
  },
];

export const metadata: Metadata = {
  title: "Kaynak Isı Girdisi Hesaplama (kJ/mm)",
  description:
    "Voltaj, akım ve kaynak hızından, EN 1011 standardına dayanan kaynak ısı girdisini (kJ/mm) hesapla.",
  alternates: {
    canonical: "/kaynak-isi-girdisi-hesaplama",
  },
  openGraph: {
    title: "Kaynak Isı Girdisi Hesaplama (kJ/mm)",
    description: "Voltaj, akım ve hızdan ısı girdisini hesapla.",
    url: buildSiteUrl("/kaynak-isi-girdisi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function HeatInputCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Kaynakçı Araçları", item: buildSiteUrl("/kaynakci-araclari") },
      { "@type": "ListItem", position: 4, name: "Kaynak Isı Girdisi Hesaplama", item: buildSiteUrl("/kaynak-isi-girdisi-hesaplama") },
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
          <Link href="/kaynakci-araclari">Kaynakçı Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Kaynak Isı Girdisi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kaynak Isı Girdisi Hesaplama</h1>
          <p>
            Voltaj, akım ve kaynak hızını gir: EN 1011 standardına
            dayanan ısı girdisini (kJ/mm) hesapla.
          </p>
        </header>

        <HeatInputCalculator />

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
            Diğer kaynakçı araçları için{" "}
            <Link href="/kaynakci-araclari">Kaynakçı Araçları</Link>
            {" "}sayfasına, elektrot çapına göre amperaj hesaplama için{" "}
            <Link href="/kaynak-amperaji-hesaplama">Kaynak Amperajı Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, EN 1011-1 standardında tanımlanan ısı girdisi
            hesabına dayanır. Bu araç bir prosedür şartnamesinin (WPS)
            yerini almaz.
          </p>
        </section>
      </div>
    </main>
  );
}
