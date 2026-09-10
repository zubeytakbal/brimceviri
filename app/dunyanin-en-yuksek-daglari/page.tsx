import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { getAllMountains } from "../converter/mountainsHub";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Dünyanın en yüksek dağları nereden veri alıyor?",
    answer:
      "Yükseklik, göreli yükseklik (prominence) ve ilk tırmanış tarihleri Wikipedia/Wikidata kaynaklı, çapraz kontrol edilmiş değerlerdir.",
  },
  {
    question: "Neden sadece 8.000 metre üzeri zirveler var?",
    answer:
      "Dünyadaki tüm 8.000 metre üzeri zirveler ('eight-thousanders') doğal, tanınmış bir set oluşturur — hepsi Himalaya ve Karakoram sıradağlarında bulunur.",
  },
];

export const metadata: Metadata = {
  title: "Dünyanın En Yüksek Dağları: 8.000 Metre Üzeri Zirveler",
  description:
    "Everest, K2 ve dünyadaki tüm 8.000 metre üzeri 14 zirvenin yüksekliğini, göreli yüksekliğini, ilk tırmanış tarihini ve zirvede hava basıncının deniz seviyesine göre yüzdesini karşılaştır.",
  alternates: {
    canonical: "/dunyanin-en-yuksek-daglari",
  },
  openGraph: {
    title: "Dünyanın En Yüksek Dağları",
    description:
      "8.000 metre üzeri 14 zirvenin yüksekliğini, göreli yüksekliğini ve ilk tırmanış tarihini karşılaştır.",
    url: buildSiteUrl("/dunyanin-en-yuksek-daglari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MountainsHubPage() {
  const mountains = getAllMountains().slice().sort((a, b) => b.elevationM - a.elevationM);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Dünyanın En Yüksek Dağları", item: buildSiteUrl("/dunyanin-en-yuksek-daglari") },
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
          <span>Dünyanın En Yüksek Dağları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Dünyanın En Yüksek Dağları</h1>
          <p>
            Dünyadaki {mountains.length} adet 8.000 metre üzeri zirvenin
            yüksekliğini, göreli yüksekliğini (prominence), ilk tırmanış
            tarihini ve zirvede hava basıncının deniz seviyesine göre
            yüzdesini karşılaştır.
          </p>
        </header>

        <section className="category-article-content">
          <h2>Zirveler (yüksekliğe göre sıralı)</h2>
          <ul className="related-conversion-list">
            {mountains.map((mountain) => (
              <li key={mountain.id}>
                <Link href={`/dunyanin-en-yuksek-daglari/${mountain.id}`}>
                  {mountain.nameTr}
                </Link>{" "}
                — {mountain.elevationM.toLocaleString("tr-TR")} m
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
        </section>
      </div>
    </main>
  );
}
