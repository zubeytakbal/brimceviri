import type { Metadata } from "next";
import Link from "next/link";
import WeldingCurrentCalculator from "../components/WeldingCurrentCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kaynak amperajı nasıl hesaplanır?",
    answer:
      "Örtülü elektrot kaynağında amperaj, elektrot çekirdek çapı (mm) ile örtü tipine göre bir katsayının çarpımıyla tahmin edilir: ince örtülü için 40-45 A/mm, kalın örtülü için 45-50 A/mm, demir tozlu kalın örtülü için 50-60 A/mm.",
  },
  {
    question: "Elektrot çapı nasıl seçilir?",
    answer:
      "Elektrot çapı genelde kaynak yapılacak malzeme kalınlığının yaklaşık dörtte üçü kadar seçilir; kök pasoda ise daha ince elektrot tercih edilir.",
  },
];

export const metadata: Metadata = {
  title: "Kaynak Amperajı Hesaplama (Elektrot Çapına Göre)",
  description:
    "Elektrot çekirdek çapı ve örtü tipinden, önerilen kaynak amperajı aralığını hesapla.",
  alternates: {
    canonical: "/kaynak-amperaji-hesaplama",
  },
  openGraph: {
    title: "Kaynak Amperajı Hesaplama (Elektrot Çapına Göre)",
    description: "Elektrot çapından önerilen amperaj aralığını hesapla.",
    url: buildSiteUrl("/kaynak-amperaji-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function WeldingCurrentCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Kaynakçı Araçları", item: buildSiteUrl("/kaynakci-araclari") },
      { "@type": "ListItem", position: 4, name: "Kaynak Amperajı Hesaplama", item: buildSiteUrl("/kaynak-amperaji-hesaplama") },
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
          <span>Kaynak Amperajı Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kaynak Amperajı Hesaplama</h1>
          <p>
            Elektrot çekirdek çapını ve örtü tipini gir: önerilen
            amperaj aralığını (başlangıç noktası olarak) hesapla.
          </p>
        </header>

        <WeldingCurrentCalculator />

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
            {" "}sayfasına, ısı girdisi hesaplama için{" "}
            <Link href="/kaynak-isi-girdisi-hesaplama">Kaynak Isı Girdisi Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, örtülü elektrot ark kaynağında yaygın kullanılan
            elektrot çapı başına amper katsayısı kuralına dayanır.
            Malzemeye özel prosedür şartnamesi (WPS) her zaman esas
            alınmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
