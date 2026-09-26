import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import EmbedCodeBox from "../components/EmbedCodeBox";
import FxMultiConverter from "../components/fx/FxMultiConverter";
import FxRelativeTime from "../components/fx/FxRelativeTime";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { TR_NUMBER_LOCALE, formatTrDateTime, trPercent, trRate, trRelativeTimeLabels } from "../converter/fx/fxContentTr";
import { requireFxDataOutsideBuild } from "../converter/fx/fxData";
import { getFxBoard } from "../converter/fx/fxPageData";
import { fxCurrenciesTr, fxPairsTr } from "../converter/fx/fxPairsTr";
import { trMultiConverterLabels, trMultiConverterOptions, pickRates } from "../converter/fx/fxHubTr";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 43200;

const faqItems: FaqItem[] = [
  {
    question: "Bu döviz kurları ne sıklıkla güncelleniyor?",
    answer:
      "Kurlar günde bir kez güncellenen referans kurlardır. Sayfanın üstünde kaynağın kuru hangi tarih ve saatte yayınladığını, verinin kaç dakika/saat önce yayınlandığını ve bir sonraki güncellemeye ne kadar kaldığını canlı olarak görebilirsin. Anlık (saniyelik) piyasa kuru değildir.",
  },
  {
    question: "Buradaki kur ile bankadaki kur neden farklı?",
    answer:
      "Burada gösterilen, alış ve satış kurlarının ortası olan ara kurdur (referans kur). Bankalar ve döviz büroları alım-satımda bu kura bir marj (spread) ekler. Her döviz çifti sayfasındaki banka kuru farkı hesaplayıcısıyla bu farkın sana maliyetini görebilirsin.",
  },
  {
    question: "Hangi para birimleri destekleniyor?",
    answer:
      "Türk lirası, Amerikan doları, euro, İngiliz sterlini, İsviçre frangı, Suudi Arabistan riyali, BAE dirhemi, Rus rublesi, Azerbaycan manatı, Kuveyt dinarı, Japon yeni, Çin yuanı, Kanada doları, Avustralya doları ve Gürcü larisi arasında çeviri yapabilirsin.",
  },
  {
    question: "Kurlar nereden alınıyor?",
    answer:
      "Güncel referans kurlar ve yayın zamanı ExchangeRate-API'den, grafiklerdeki geçmiş günlük kurlar fawazahmed0/exchange-api'den alınır. Kurlar bilgi amaçlıdır; gerçek işlem kurunu işlemi yaptığın kurum belirler.",
  },
];

export const metadata: Metadata = {
  title: "Döviz Çevirici ve Güncel Döviz Kurları",
  description:
    "Dolar, euro, sterlin, riyal, dirhem, manat ve daha fazlası için günlük referans kurla döviz çevirici. Yayın saati, canlı sayaç, 30 günlük değişim ve banka kuru farkı hesaplama.",
  alternates: {
    canonical: "/doviz-cevirici",
  },
  openGraph: {
    title: "Döviz Çevirici ve Güncel Döviz Kurları",
    description: "Günlük referans kurla TL ve 14 döviz arasında çeviri; yayın saati ve 30 günlük değişim.",
    url: buildSiteUrl("/doviz-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const boardCodes = Object.keys(fxCurrenciesTr).filter((code) => code !== "TRY");

function pairSlugFor(code: string) {
  return fxPairsTr.find((pair) => pair.from === code && pair.to === "TRY")?.slug;
}

export default async function CurrencyConverterPage() {
  const board = await getFxBoard(boardCodes, "TRY");
  requireFxDataOutsideBuild(board !== null);

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
              Günlük referans kurla TL ve 14 döviz arasında çeviri yap. Kurun kaynakta ne zaman yayınlandığını, kaç saat önce
              güncellendiğini ve sonraki güncellemeye ne kadar kaldığını canlı olarak gör.
            </p>
          </header>

          <EmbedCodeBox embedPath="/embed/doviz-cevirici" title="Döviz Çevirici" height={560} maxWidth={480} />
        </div>

        {board ? (
          <>
            <p className="fx-update-strip">
              <span>
                <strong>Yayınlandı:</strong> {formatTrDateTime(board.latest.lastUpdateUnix)} (TSİ) ·{" "}
                <FxRelativeTime targetUnix={board.latest.lastUpdateUnix} mode="since" labels={trRelativeTimeLabels} numberLocale={TR_NUMBER_LOCALE} />
              </span>
              {board.latest.nextUpdateUnix && (
                <span>
                  <strong>Sonraki güncelleme:</strong>{" "}
                  <FxRelativeTime targetUnix={board.latest.nextUpdateUnix} mode="until" labels={trRelativeTimeLabels} numberLocale={TR_NUMBER_LOCALE} />
                </span>
              )}
            </p>

            <FxMultiConverter
              rates={pickRates(board.latest.rates)}
              options={trMultiConverterOptions}
              defaultFrom="USD"
              defaultTo="TRY"
              numberLocale={TR_NUMBER_LOCALE}
              labels={trMultiConverterLabels}
            />
          </>
        ) : (
          <p className="calculator-usage-hint">Güncel döviz kuru şu anda alınamadı, lütfen daha sonra tekrar dene.</p>
        )}

        <section className="category-article-content">
          {board && (
            <>
              <h2>Güncel döviz kurları (TL)</h2>
              <div className="conversion-table-wrap">
                <table className="conversion-table">
                  <thead>
                    <tr>
                      <th>Para birimi</th>
                      <th>1 birim</th>
                      <th>30 günlük değişim</th>
                    </tr>
                  </thead>
                  <tbody>
                    {board.rows.map((row) => {
                      const currency = fxCurrenciesTr[row.code];
                      const slug = pairSlugFor(row.code);
                      return (
                        <tr key={row.code}>
                          <td>
                            {slug ? <Link href={`/doviz-cevirici/${slug}`}>{currency.long}</Link> : currency.long} ({row.code})
                          </td>
                          <td>{trRate(row.rate)} TL</td>
                          <td className={row.change30 === null || Math.abs(row.change30) < 0.05 ? undefined : row.change30 > 0 ? "fx-board-change-up" : "fx-board-change-down"}>
                            {row.change30 === null ? "–" : `${row.change30 > 0 ? "▲" : row.change30 < 0 ? "▼" : ""} ${trPercent(row.change30)}`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p>
                30 günlük değişim, dövizin TL karşısındaki değişimidir: ▲ dövizin TL karşısında değer kazandığını (aynı miktar döviz için daha
                fazla TL gerektiğini), ▼ değer kaybettiğini gösterir.
              </p>
            </>
          )}

          <h2>Döviz çevirileri</h2>
          <ul className="related-conversion-list">
            {fxPairsTr.map((pair) => (
              <li key={pair.slug}>
                <Link href={`/doviz-cevirici/${pair.slug}`}>
                  {fxCurrenciesTr[pair.from].short} → {fxCurrenciesTr[pair.to].short}
                </Link>
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
            <Link href="/kdv-hesaplama">KDV hesaplama</Link> · <Link href="/kuyumcu-araclari">Kuyumcu araçları</Link> ·{" "}
            <Link href="/seyahat-priz-voltaj-hesaplama">Seyahat priz ve voltaj rehberi</Link> · <Link href="/diger-donusumler">Diğer dönüşümler</Link> ·{" "}
            <Link href="/">Tüm birim çeviricileri</Link>
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Güncel referans kurlar:{" "}
            <a href="https://www.exchangerate-api.com" target="_blank" rel="noreferrer">
              Rates By Exchange Rate API
            </a>
            . Geçmiş günlük kurlar:{" "}
            <a href="https://github.com/fawazahmed0/exchange-api" target="_blank" rel="noreferrer">
              fawazahmed0/exchange-api
            </a>
            . Kurlar bilgi amaçlıdır ve bir alım-satım teklifi değildir.
          </p>
        </section>
      </div>
    </main>
  );
}
