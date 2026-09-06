import type { Metadata } from "next";
import Link from "next/link";
import CurrencyConverterCalculator from "../components/CurrencyConverterCalculator";
import EmbedCodeBox from "../components/EmbedCodeBox";
import { getExchangeRates } from "../converter/exchangeRates";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Bu döviz kuru güncel mi?",
    answer:
      "Evet, kurlar Frankfurter (ECB referans kurları) üzerinden canlı olarak çekilir ve saatlik olarak güncellenir. Kaynak kurumun kendisi hafta içi günde bir güncelleme yapar.",
  },
  {
    question: "Buradaki kur ile bankadaki kur neden farklı?",
    answer:
      "Burada gösterilen, ara kur (mid-market rate) olarak bilinen referans kurdur. Bankalar ve döviz büroları alım-satım işlemlerinde bir marj (spread) uygular; bu yüzden gerçekte alacağınız veya ödeyeceğiniz kur burada gösterilenden biraz farklı olur.",
  },
  {
    question: "Hangi para birimleri destekleniyor?",
    answer:
      "Şu an Türk Lirası (TRY), Amerikan Doları (USD), Euro (EUR) ve İngiliz Sterlini (GBP) arasında dönüşüm yapabilirsin.",
  },
];

export const metadata: Metadata = {
  title: "Döviz Çevirici (Dolar, Euro, Sterlin - TL)",
  description:
    "Günlük güncellenen referans kurlarla dolar, euro, sterlin ve TL arasında döviz çevirici. Miktarını gir, istediğin para birimine çevir.",
  alternates: {
    canonical: "/doviz-cevirici",
  },
  openGraph: {
    title: "Döviz Çevirici (Dolar, Euro, Sterlin - TL)",
    description: "Güncel kurlarla dolar, euro, sterlin ve TL arasında anlık dönüşüm.",
    url: buildSiteUrl("/doviz-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function CurrencyConverterPage() {
  const rates = await getExchangeRates();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Döviz Çevirici", item: buildSiteUrl("/doviz-cevirici") },
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
          <span>Döviz Çevirici</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>Döviz Çevirici</h1>
            <p>
              Günlük güncellenen referans kurlarla dolar, euro, sterlin
              ve TL arasında dönüşüm yap. Miktarını gir, para birimlerini
              seç.
            </p>
          </header>

          <EmbedCodeBox
            embedPath="/embed/doviz-cevirici"
            title="Döviz Çevirici"
            height={560}
            maxWidth={480}
          />
        </div>

        <CurrencyConverterCalculator rates={rates} />

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
            Diğer birim dönüşümleri için{" "}
            <Link href="/">Ana Sayfa</Link>
            {" "}üzerinden tüm kategorilere ulaşabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Kurlar Frankfurter API üzerinden, Avrupa Merkez Bankası
            (ECB) referans kurlarına dayanarak çekilir.
          </p>
        </section>
      </div>
    </main>
  );
}
