import type { Metadata } from "next";
import Link from "next/link";
import IrrigationCalculator from "../components/IrrigationCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Sulama süresi nasıl hesaplanır?",
    answer:
      "1 mm su derinliği, 1 m² alan üzerinde 1 litreye eşittir. Gereken Toplam Su (L) = Hedef Sulama Miktarı (mm) × Alan (m²). Sulama Süresi (dakika) = (Gereken Su (L) / Sistem Debisi (L/saat)) × 60.",
  },
  {
    question: "Damla sulamada sistem debisi nasıl bulunur?",
    answer:
      "Damla sulamada toplam sistem debisi, tek bir damlatıcının (emitter) debisi (L/saat) ile toplam damlatıcı sayısının çarpımıyla bulunur.",
  },
  {
    question: "Hedef sulama miktarı (mm) nereden bulunur?",
    answer:
      "Hedef sulama miktarı; bitki veya çim türüne, mevsime, toprak yapısına, buharlaşma ve yağış durumuna göre değişir. Bu araç, bu değeri belirlemez — sen bu değeri bir peyzaj uzmanından veya bitki bakım rehberinden almalısın.",
  },
];

export const metadata: Metadata = {
  title: "Sulama Süresi Hesaplama (Damla/Sprinkler)",
  description:
    "Hedef sulama miktarı (mm), sulanacak alan (m²) ve sistem debisinden (L/saat), gereken toplam su ve sulama süresini (dakika) hesapla.",
  alternates: {
    canonical: "/sulama-suresi-hesaplama",
  },
  openGraph: {
    title: "Sulama Süresi Hesaplama (Damla/Sprinkler)",
    description: "Alan ve debiden sulama süresini hesapla.",
    url: buildSiteUrl("/sulama-suresi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function IrrigationCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Mesleğe Göre Araçlar", item: buildSiteUrl("/meslekler") },
      { "@type": "ListItem", position: 3, name: "Peyzaj Araçları", item: buildSiteUrl("/peyzaj-araclari") },
      { "@type": "ListItem", position: 4, name: "Sulama Süresi Hesaplama", item: buildSiteUrl("/sulama-suresi-hesaplama") },
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
          <Link href="/peyzaj-araclari">Peyzaj Araçları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Sulama Süresi Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Sulama Süresi Hesaplama</h1>
          <p>
            Hedef sulama miktarını (mm), sulanacak alanı (m²) ve
            sulama sistemi debisini (L/saat) gir: gereken toplam su
            ve sulama süresini (dakika) hesapla.
          </p>
        </header>

        <IrrigationCalculator />

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
            Diğer peyzaj araçları için{" "}
            <Link href="/peyzaj-araclari">Peyzaj Araçları</Link>
            {" "}sayfasına, alan birimi dönüşümleri için{" "}
            <Link href="/kategoriler/alan">Alan Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, 1 mm su derinliğinin 1 m² alanda 1 litreye eşit
            olduğu temel birim ilişkisine dayanır. Bu araç peyzaj
            danışmanlığı yerine geçmez; hedef sulama miktarını
            belirlemez.
          </p>
        </section>
      </div>
    </main>
  );
}
