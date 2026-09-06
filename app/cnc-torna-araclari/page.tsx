import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu sayfadaki araç kesici takım kataloğunun yerini alır mı?",
    answer:
      "Hayır. Bu araç yalnızca kesme hızı (Vc), çap (D) ve devir (N) arasındaki matematiksel bağıntıyı hesaplar. Hangi kesme hızının uygun olduğu, kesici takım üreticisinin kataloğuna ve işlenen malzemeye göre belirlenir.",
  },
];

export const metadata: Metadata = {
  title: "CNC/Torna Operatörü Araçları: Kesme Hızı, Devir Hesaplama",
  description:
    "CNC ve torna operatörleri için tek sayfada toplanmış araçlar: kesme hızı, çap ve devir (RPM) hesaplama, uzunluk birimi dönüşümleri.",
  alternates: {
    canonical: "/cnc-torna-araclari",
  },
  openGraph: {
    title: "CNC/Torna Operatörü Araçları: Kesme Hızı, Devir Hesaplama",
    description: "Kesme hızı ve devir hesaplama tek sayfada.",
    url: buildSiteUrl("/cnc-torna-araclari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function CncTornaAraclariPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "CNC/Torna Operatörü Araçları", item: buildSiteUrl("/cnc-torna-araclari") },
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
          <span>CNC/Torna Operatörü Araçları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>CNC/Torna Operatörü Araçları</h1>
          <p>
            CNC ve torna operatörlerinin tezgah başında ihtiyaç
            duyduğu hesaplama araçlarını tek sayfada topladık: kesme
            hızı, çap ve devir (RPM) hesaplama, uzunluk birimi
            dönüşümleri.
          </p>
        </header>

        <div className="key-stat-callout">
          <p className="key-stat-callout-title">Hızlı Bakış</p>
          <ul>
            <li>
              <strong>Devir (N)</strong> = (Vc × 1000) / (π × D)
            </li>
          </ul>
        </div>

        <section className="category-article-content">
          <h2>Hesaplama Araçları</h2>
          <ul>
            <li>
              <Link href="/kesme-hizi-devir-hesaplama">Kesme Hızı - Devir Hesaplama</Link>
              {" "}— kesme hızı, çap ve devirden ikisini gir,
              üçüncüsünü hesapla.
            </li>
            <li>
              <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>
              {" "}— mm, cm, inç ve diğer uzunluk birimleri arasında
              dönüşüm yap.
            </li>
            <li>
              <Link href="/malzeme-agirligi-hesaplama">
                Malzeme Yoğunlukları Tablosu ve Ağırlık Hesaplama
              </Link>{" "}
              — işlenecek parçanın hacminden ağırlığını hesapla.
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
              — işlenen metalin erime noktasını °C, °F ve Kelvin
              cinsinden gör.
            </li>
            <li>
              <Link href="/sertlik-donusum-hesaplama">Sertlik Dönüşüm Hesaplama</Link>
              {" "}— işlenecek malzemenin Brinell, Rockwell ya da Vickers
              sertlik değerini diğer ölçeklere çevir.
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
