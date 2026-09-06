import type { Metadata } from "next";
import Link from "next/link";
import { DecorativeIcon } from "../components/siteIcons";
import {
  disasterCategoryLabels,
  getPublishedDisasterStories,
} from "../converter/unitDisasters";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Birim Çevirme Felaketleri: Yanlış Birim Yüzünden Yaşanan Gerçek Olaylar",
  description:
    "Tek bir birim çevirme hatası yüzünden milyonlarca dolarlık uyduların kaybolduğu, uçakların havada yakıtsız kaldığı gerçek olaylar — doğrulanmış kaynaklarla anlatılıyor.",
  alternates: {
    canonical: "/birim-cevirme-felaketleri",
  },
  openGraph: {
    title: "Birim Çevirme Felaketleri: Yanlış Birim Yüzünden Yaşanan Gerçek Olaylar",
    description:
      "Bir mühendislik ekibi metrik, diğeri imperial kullandığında ne olur? Gerçek, doğrulanmış olaylar.",
    url: buildSiteUrl("/birim-cevirme-felaketleri"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UnitDisastersHubPage() {
  const stories = getPublishedDisasterStories();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: buildSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Birim Çevirme Felaketleri",
        item: buildSiteUrl("/birim-cevirme-felaketleri"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Birim Çevirme Felaketleri</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Birim Çevirme Felaketleri</h1>
          <p>
            Bir mühendislik ekibi metrik sistemi kullanırken diğeri
            imperial sistemi kullandığında ne olur? Tarih boyunca bunun
            cevabı milyonlarca dolarlık uyduların kaybolması, uçakların
            havada yakıtsız kalması gibi gerçek olaylar oldu. Aşağıda,
            doğrulanmış kaynaklara dayanan bu olayları tek tek anlatıyoruz.
          </p>
        </header>

        <section className="category-article-content" style={{ maxWidth: "none" }}>
          <div className="disaster-story-grid">
            {stories.map((story) => (
              <Link
                key={story.slug}
                href={`/birim-cevirme-felaketleri/${story.slug}`}
                className="disaster-story-card"
              >
                <div className="disaster-story-card-meta">
                  <DecorativeIcon
                    name={
                      story.category === "uzay" ? "spaceDisaster" : "unitDisaster"
                    }
                    size={28}
                  />
                  <span className="disaster-category-badge">
                    {disasterCategoryLabels[story.category]}
                  </span>
                  <span className="disaster-year-badge">{story.year}</span>
                </div>
                <h3>{story.shortTitle}</h3>
                <p>{story.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
