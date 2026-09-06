import type { Metadata } from "next";
import Link from "next/link";
import CuttingSpeedCalculator from "../components/CuttingSpeedCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kesme hızından devir (RPM) nasıl hesaplanır?",
    answer:
      "Devir (N) = (Kesme Hızı (Vc, m/dakika) × 1000) / (π × Çap (D, mm)). Bu formül, torna ve frezede kesici takım veya iş parçasının dönüş hızını belirlemek için kullanılır.",
  },
  {
    question: "Kesme hızı (Vc) nasıl seçilir?",
    answer:
      "Kesme hızı; iş parçası malzemesi, kesici takım tipi (HSS, karbür vb.) ve soğutma sıvısı kullanımına göre değişir. Doğru değer için kesici takım üreticisinin kataloğuna bakılmalıdır.",
  },
];

export const metadata: Metadata = {
  title: "Kesme Hızı - Devir (RPM) Hesaplama",
  description:
    "Kesme hızı (Vc), çap (D) ve devirden (N) ikisini gir, üçüncüsünü torna/freze formülüyle hesapla.",
  alternates: {
    canonical: "/kesme-hizi-devir-hesaplama",
  },
  openGraph: {
    title: "Kesme Hızı - Devir (RPM) Hesaplama",
    description: "Kesme hızı, çap ve devir arasında hesaplama yap.",
    url: buildSiteUrl("/kesme-hizi-devir-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function CuttingSpeedCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "CNC/Torna Operatörü Araçları", item: buildSiteUrl("/cnc-torna-araclari") },
      { "@type": "ListItem", position: 4, name: "Kesme Hızı - Devir Hesaplama", item: buildSiteUrl("/kesme-hizi-devir-hesaplama") },
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
          <Link href="/cnc-torna-araclari">CNC/Torna Operatörü Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Kesme Hızı - Devir Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kesme Hızı - Devir (RPM) Hesaplama</h1>
          <p>
            Kesme hızı (Vc), çap (D) ve devirden (N) hangisini
            hesaplamak istediğini seç; diğer ikisini gir.
          </p>
        </header>

        <CuttingSpeedCalculator />

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
            Diğer CNC/torna araçları için{" "}
            <Link href="/cnc-torna-araclari">CNC/Torna Operatörü Araçları</Link>
            {" "}sayfasına, mm/inç dönüşümü için{" "}
            <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, torna ve freze işlemlerinde standart kabul edilen
            kesme hızı-devir bağıntısına dayanır. Kesici takım
            üreticisinin katalog değerleri her zaman esas alınmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
