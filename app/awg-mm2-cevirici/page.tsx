import type { Metadata } from "next";
import Link from "next/link";
import AwgConverter from "../components/AwgConverter";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "AWG nedir?",
    answer:
      "AWG (American Wire Gauge), Kuzey Amerika'da tel ve kablo çapını ifade etmek için kullanılan standart bir ölçü sistemidir. AWG değeri küçüldükçe telin çapı ve kesiti büyür.",
  },
  {
    question: "AWG'den mm²'ye nasıl çevrilir?",
    answer:
      "Önce AWG değerinden çap (mm) hesaplanır: çap = 0,127 × 92^((36-AWG)/39). Ardından kesit alanı, dairenin alan formülüyle (A = π/4 × çap²) bulunur.",
  },
  {
    question: "2,5 mm² kablo kaç AWG'ye denk gelir?",
    answer:
      "2,5 mm² kesitli bir kablo, yaklaşık 13 AWG'ye karşılık gelir. Tam değer ondalıklı olduğu için pratikte en yakın standart AWG ölçüsü kullanılır.",
  },
];

export const metadata: Metadata = {
  title: "AWG - mm² Çevirici (Tel Çapı ve Kesit Alanı)",
  description:
    "AWG (American Wire Gauge) değerinden çap ve kesit alanını (mm²), ya da kesit alanından en yakın AWG değerini hesapla.",
  alternates: {
    canonical: "/awg-mm2-cevirici",
  },
  openGraph: {
    title: "AWG - mm² Çevirici (Tel Çapı ve Kesit Alanı)",
    description: "AWG ile mm² arasında tel çapı ve kesit alanı dönüşümü yap.",
    url: buildSiteUrl("/awg-mm2-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AwgConverterPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "AWG - mm² Çevirici", item: buildSiteUrl("/awg-mm2-cevirici") },
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
          <span>AWG - mm² Çevirici</span>
        </nav>

        <header className="all-conversions-header">
          <h1>AWG - mm² Çevirici</h1>
          <p>
            AWG değerinden çap ve kesit alanını, ya da kesit alanından
            en yakın AWG değerini hesapla. Altta yaygın AWG ölçülerinin
            tam tablosunu da bulabilirsin.
          </p>
        </header>

        <AwgConverter />

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
            Elektrikçi araçları için{" "}
            <Link href="/elektrikci-araclari">Elektrikçi Araçları</Link>
            {" "}sayfasına, mm² cinsinden kablo kesiti hesaplama için{" "}
            <Link href="/muhendislik-hesaplayicilari/elektrik-hesaplari/kablo-kesiti-hesaplama">
              Kablo Kesiti Hesaplama
            </Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formül, AWG&apos;nin standart matematiksel tanımına (ASTM B258)
            dayanır. Akım taşıma kapasitesi bu aracın kapsamı dışındadır;
            ilgili elektrik tesisat yönetmeliğine bakılmalıdır.
          </p>
        </section>
      </div>
    </main>
  );
}
