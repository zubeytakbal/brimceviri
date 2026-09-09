import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { getAllCelestialBodies } from "../converter/celestialBodiesHub";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu sayfadaki gökcismi verileri hangi kaynağa dayanıyor?",
    answer:
      "Kütle, çap, yoğunluk, yerçekimi gibi fiziksel değerler NASA'nın resmi Planetary Fact Sheet verisine dayanır. Uydu sayısı gibi sık değişen veriler ayrıca güncel kaynaklarla doğrulanmıştır ve zamanla yeni keşiflerle artabilir.",
  },
];

const categoryLabels: Record<string, string> = {
  gezegen: "Gezegenler",
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const metadata: Metadata = {
  title: "Gökcisimleri Özellikleri: Kütle, Yerçekimi ve Ağırlık Hesaplama",
  description:
    "Güneş sistemindeki gezegenlerin kütlesini, yerçekimini, çapını ve diğer özelliklerini gör; kendi kilonun her gezegende kaç kilo geleceğini hesapla.",
  alternates: { canonical: "/gokcisimleri-ozellikleri" },
  openGraph: {
    title: "Gökcisimleri Özellikleri: Kütle, Yerçekimi ve Ağırlık Hesaplama",
    description: "Gezegenlerin özelliklerini gör, kendi ağırlığını hesapla.",
    url: buildSiteUrl("/gokcisimleri-ozellikleri"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function CelestialBodiesHubPage() {
  const bodies = getAllCelestialBodies();
  const categories = [...new Set(bodies.map((body) => body.category))];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gökcisimleri Özellikleri",
        item: buildSiteUrl("/gokcisimleri-ozellikleri"),
      },
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
          <span>Gökcisimleri Özellikleri</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Gökcisimleri Özellikleri</h1>
          <p>
            Güneş sistemindeki {bodies.length} gezegenin kütlesini,
            çapını, yoğunluğunu, yerçekimini ve diğer özelliklerini
            gör; her gökcisminin kendi sayfasında kendi ağırlığını
            hesaplayabileceğin canlı bir araç da bulunur.
          </p>
        </header>

        <section className="category-article-content">
          {categories.map((category) => {
            const categoryBodies = bodies
              .filter((body) => body.category === category)
              .sort((a, b) => a.distanceFromSunMillionKm - b.distanceFromSunMillionKm);

            return (
              <div key={category}>
                <h2>{categoryLabels[category] ?? category}</h2>
                <ul className="related-conversion-list">
                  {categoryBodies.map((body) => (
                    <li key={body.id}>
                      <Link href={`/gokcisimleri-ozellikleri/${body.id}`}>
                        {body.nameTr}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

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
