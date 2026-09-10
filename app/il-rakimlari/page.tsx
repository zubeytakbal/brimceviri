import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { getAllProvinces } from "../converter/provinceElevationHub";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Türkiye'nin en yüksek rakımlı ili hangisi?",
    answer: "Erzurum, 1.890 metre ile Türkiye'nin en yüksek rakımlı ilidir.",
  },
  {
    question: "Türkiye'nin en alçak rakımlı ili hangisi?",
    answer: "İzmir, 2 metre ile Türkiye'nin en alçak rakımlı ilidir.",
  },
];

export const metadata: Metadata = {
  title: "İllerin Rakımı: Türkiye'nin 81 İlinin Yüksekliği ve İrtifa Etkisi",
  description:
    "Türkiye'nin 81 ilinin deniz seviyesinden rakımını, o rakımdaki hava basıncını ve suyun kaç derecede kaynadığını gör.",
  alternates: {
    canonical: "/il-rakimlari",
  },
  openGraph: {
    title: "İllerin Rakımı: Türkiye'nin 81 İlinin Yüksekliği",
    description:
      "Türkiye'nin 81 ilinin rakımını ve irtifa etkisini (basınç, kaynama noktası) karşılaştır.",
    url: buildSiteUrl("/il-rakimlari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ProvinceElevationHubPage() {
  const provinces = getAllProvinces().slice().sort((a, b) => b.elevationM - a.elevationM);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "İllerin Rakımı", item: buildSiteUrl("/il-rakimlari") },
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
          <span>İllerin Rakımı</span>
        </nav>

        <header className="all-conversions-header">
          <h1>İllerin Rakımı ve İrtifa Etkisi</h1>
          <p>
            Türkiye&apos;nin {provinces.length} ilinin deniz seviyesinden
            rakımını, o rakımdaki hava basıncını ve suyun kaç derecede
            kaynadığını gör.
          </p>
        </header>

        <section className="category-article-content">
          <h2>İller (rakıma göre sıralı)</h2>
          <ul className="related-conversion-list">
            {provinces.map((province) => (
              <li key={province.id}>
                <Link href={`/il-rakimlari/${province.id}`}>
                  {province.nameTr}
                </Link>{" "}
                — {province.elevationM.toLocaleString("tr-TR")} m
              </li>
            ))}
          </ul>

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
            Dünyanın en yüksek zirveleriyle karşılaştırmak için{" "}
            <Link href="/dunyanin-en-yuksek-daglari">Dünyanın En Yüksek Dağları</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </section>
      </div>
    </main>
  );
}
