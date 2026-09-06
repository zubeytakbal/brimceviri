import type { Metadata } from "next";
import Link from "next/link";
import BradenScaleCalculator from "../components/BradenScaleCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Braden Skalası ne için kullanılır?",
    answer:
      "Basınç (dekübitüs) yarası gelişme riskini değerlendirmek için kullanılan, duyusal algı, nem, aktivite, hareketlilik, beslenme ve sürtünme/kayma olmak üzere 6 alt ölçekten oluşan hemşirelik risk tarama aracıdır.",
  },
  {
    question: "Braden Skalasında düşük puan neden yüksek riski gösteriyor?",
    answer:
      "Braden Skalasında diğer birçok skorun aksine düşük toplam puan, daha yüksek basınç yarası riskini gösterir; her alt ölçek 1 (en kötü) ile 4 (en iyi) arasında puanlanır ve toplam 6-23 aralığındadır.",
  },
];

export const metadata: Metadata = {
  title: "Braden Skalası Hesaplama (Basınç Yarası Riski)",
  description:
    "Duyusal algı, nem, aktivite, hareketlilik, beslenme ve sürtünme/kayma alt ölçeklerini seç: Braden Skalası toplam skorunu hesapla.",
  alternates: { canonical: "/braden-skalasi-hesaplama" },
  openGraph: {
    title: "Braden Skalası Hesaplama (Basınç Yarası Riski)",
    description: "Braden Skalası toplam skorunu hesaplayın.",
    url: buildSiteUrl("/braden-skalasi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BradenScalePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Braden Skalası Hesaplama",
        item: buildSiteUrl("/braden-skalasi-hesaplama"),
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
          <span>Braden Skalası Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Braden Skalası Hesaplama</h1>
          <p>
            Duyusal algı, nem, aktivite, hareketlilik, beslenme ve
            sürtünme/kayma alt ölçeklerini seç: Braden Skalası toplam
            skorunu ve basınç yarası riskini anında hesapla.
          </p>
        </header>

        <BradenScaleCalculator />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          <p>
            <strong>Braden Skalası ne için kullanılır?</strong>
            <br />
            Basınç (dekübitüs) yarası gelişme riskini değerlendirmek
            için kullanılan, duyusal algı, nem, aktivite,
            hareketlilik, beslenme ve sürtünme/kayma olmak üzere 6
            alt ölçekten oluşan hemşirelik risk tarama aracıdır.
          </p>
          <p>
            <strong>
              Braden Skalasında düşük puan neden yüksek riski
              gösteriyor?
            </strong>
            <br />
            Braden Skalasında diğer birçok skorun aksine düşük
            toplam puan, daha yüksek basınç yarası riskini gösterir;
            her alt ölçek 1 (en kötü) ile 4 (en iyi) arasında
            puanlanır ve toplam 6-23 aralığındadır.
          </p>

          <h2>İlgili araçlar</h2>
          <p>
            Düşme riski için{" "}
            <Link href="/morse-dusme-skalasi-hesaplama">Morse Düşme Skalası Hesaplama</Link>,
            diğer doktor ve hemşire araçları için{" "}
            <Link href="/doktor-hemsire-araclari">Doktor ve Hemşire Araçları</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Skor, Bergstrom N, Braden BJ ve ark. (1987) tarafından
            geliştirilmiştir. Bu araç tıbbi tavsiye yerine geçmez;
            bakım planı için sorumlu sağlık ekibine danışılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
