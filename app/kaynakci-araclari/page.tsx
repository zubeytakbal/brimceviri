import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu sayfadaki araçlar bir WPS'in (kaynak prosedürü şartnamesi) yerini alır mı?",
    answer:
      "Hayır. Buradaki hesaplayıcılar genel, sektörde yaygın kabul gören formüllere dayanan başlangıç noktaları sunar. Kritik veya standarda tabi kaynak işlerinde her zaman onaylı bir WPS ve malzeme üreticisinin şartnamesi esas alınmalıdır.",
  },
];

export const metadata: Metadata = {
  title: "Kaynakçı Araçları: Amperaj ve Isı Girdisi Hesaplama",
  description:
    "Kaynakçılar için tek sayfada toplanmış araçlar: elektrot çapına göre kaynak amperajı ve EN 1011 standardına göre ısı girdisi (kJ/mm) hesaplama.",
  alternates: {
    canonical: "/kaynakci-araclari",
  },
  openGraph: {
    title: "Kaynakçı Araçları: Amperaj ve Isı Girdisi Hesaplama",
    description: "Kaynak amperajı ve ısı girdisi hesaplama tek sayfada.",
    url: buildSiteUrl("/kaynakci-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function KaynakciAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Kaynakçı Araçları", item: buildSiteUrl("/kaynakci-araclari") },
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
          <span>Kaynakçı Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kaynakçı Araçları</h1>
          <p>
            Kaynakçıların atölyede günlük olarak ihtiyaç duyduğu
            hesaplama araçlarını tek sayfada topladık: elektrot
            çapına göre amperaj ve EN 1011 standardına göre ısı
            girdisi (kJ/mm) hesaplama.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Amperaj</strong> ≈ Elektrot Çapı (mm) × 40-60
            </li>
            <li>
              <strong>Isı Girdisi</strong> = (V × A × 60) / (Hız × 1000)
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/kaynak-amperaji-hesaplama">Kaynak Amperajı Hesaplama</Link>
              {" "}— elektrot çekirdek çapı ve örtü tipinden önerilen
              amperaj aralığını hesapla.
            </li>
            <li>
              <Link href="/kaynak-isi-girdisi-hesaplama">Kaynak Isı Girdisi Hesaplama</Link>
              {" "}— voltaj, akım ve kaynak hızından ısı girdisini
              (kJ/mm) hesapla.
            </li>
            <li>
              <Link href="/malzeme-agirligi-hesaplama">
                Malzeme Yoğunlukları Tablosu ve Ağırlık Hesaplama
              </Link>{" "}
              — çelik, alüminyum gibi malzemelerin yoğunluğundan
              parça ağırlığını hesapla.
            </li>
            <li>
              <Link href="/civata-torku-hesaplama">Cıvata Torku Hesaplama</Link>
              {" "}— cıvata ölçüsü ve dayanım sınıfından önerilen
              sıkma torkunu hesapla.
            </li>
            <li>
              <Link href="/erime-kaynama-noktasi-hesaplama">
                Element Erime ve Kaynama Noktası Çevirici
              </Link>{" "}
              — bakır, çelik, alüminyum gibi metallerin erime
              noktasını °C, °F ve Kelvin cinsinden gör.
            </li>
            <li>
              <Link href="/sertlik-donusum-hesaplama">Sertlik Dönüşüm Hesaplama</Link>
              {" "}— kaynak dikişi veya ana malzemenin Brinell, Rockwell
              ya da Vickers sertlik değerini diğer ölçeklere çevir.
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
