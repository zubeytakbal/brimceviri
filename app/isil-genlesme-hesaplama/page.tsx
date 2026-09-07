import type { Metadata } from "next";
import Link from "next/link";
import ThermalExpansionCalculator from "../components/ThermalExpansionCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Isıl genleşme (termal genleşme) nasıl hesaplanır?",
    answer:
      "ΔL = L₀ × α × ΔT formülüyle hesaplanır. L₀ başlangıç uzunluğu, α malzemenin ısıl genleşme katsayısı (×10⁻⁶/K), ΔT ise sıcaklık farkıdır (°C).",
  },
  {
    question: "Hangi malzeme en fazla ısıl genleşme gösterir?",
    answer:
      "Bu tablodaki malzemeler arasında kurşun (29×10⁻⁶/K) en yüksek genleşme katsayısına, cam (8,5×10⁻⁶/K) ise en düşük katsayıya sahiptir.",
  },
  {
    question: "Boru ve raylarda neden genleşme payı bırakılır?",
    answer:
      "Uzun metal boru veya raylar, mevsimsel sıcaklık farkında birkaç milimetreden birkaç santimetreye kadar uzayıp kısalabilir. Bu hareketi karşılamak için hatlara genleşme derzi veya esnek bağlantı elemanları eklenir.",
  },
];

export const metadata: Metadata = {
  title: "Isıl Genleşme Hesaplama (ΔL = L₀ × α × ΔT)",
  description:
    "Malzeme seç, başlangıç uzunluğu ve sıcaklık farkını gir: ısıl genleşme (uzama/kısalma) miktarını hesapla. Malzeme genleşme katsayıları tablosu dahil.",
  alternates: {
    canonical: "/isil-genlesme-hesaplama",
  },
  openGraph: {
    title: "Isıl Genleşme Hesaplama (ΔL = L₀ × α × ΔT)",
    description: "Malzeme ve sıcaklık farkından ısıl genleşme miktarını hesapla.",
    url: buildSiteUrl("/isil-genlesme-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ThermalExpansionCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Isıl Genleşme Hesaplama", item: buildSiteUrl("/isil-genlesme-hesaplama") },
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
          <span>Isıl Genleşme Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Isıl Genleşme Hesaplama</h1>
          <p>
            Malzeme seç, başlangıç uzunluğunu ve sıcaklık farkını gir:
            ısıl genleşme miktarını (uzama veya kısalma) hesapla. Altta
            yaygın malzemelerin genleşme katsayısı tablosunu da
            bulabilirsin.
          </p>
        </header>

        <ThermalExpansionCalculator />

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
            Tesisatçı işleri için{" "}
            <Link href="/tesisatci-araclari">Tesisatçı Araçları</Link>
            {" "}sayfasına, inşaat hesaplamaları için{" "}
            <Link href="/insaatci-araclari">İnşaatçı Araçları</Link>
            {" "}sayfasına, malzeme yoğunluğu ve diğer özellikleri için{" "}
            <Link href="/malzeme-ozellikleri">Malzeme Özellikleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül ve katsayılar, malzeme biliminde standart kabul
            edilen doğrusal ısıl genleşme tanımına dayanır; alaşım
            ve sıcaklık aralığına göre gerçek değerler küçük farklar
            gösterebilir.
          </p>
        </section>
      </div>
    </main>
  );
}
