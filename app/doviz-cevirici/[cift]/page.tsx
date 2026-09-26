import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import FxChart from "../../components/fx/FxChart";
import FxMarkupCalculator from "../../components/fx/FxMarkupCalculator";
import FxPairConverter from "../../components/fx/FxPairConverter";
import FxRelativeTime from "../../components/fx/FxRelativeTime";
import { buildFaqSchema } from "../../converter/faqSchema";
import {
  TR_NUMBER_LOCALE,
  buildTrPairAnalysis,
  buildTrPairFaq,
  formatTrDateTime,
  trChartLabels,
  trMarkupLabels,
  trMoney,
  trPairConverterLabels,
  trRate,
  trRelativeTimeLabels,
} from "../../converter/fx/fxContentTr";
import { FX_TABLE_AMOUNTS } from "../../converter/fx/fxMath";
import { requireFxDataOutsideBuild } from "../../converter/fx/fxData";
import { getFxPairPageData } from "../../converter/fx/fxPageData";
import { buildFxTitleTr, fxCurrenciesTr, fxPairsTr, getFxPairTr, relatedFxPairsTr } from "../../converter/fx/fxPairsTr";
import { buildSiteUrl } from "../../siteConfig";

// Kaynak gunde bir guncellenir; gunluk cron ayrica "fx" etiketini
// yeniler. Bu sure yalnizca bir guvenlik agidir.
export const revalidate = 43200;
export const dynamicParams = false;

type PageProps = { params: Promise<{ cift: string }> };

export function generateStaticParams() {
  return fxPairsTr.map((pair) => ({ cift: pair.slug }));
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cift } = await params;
  const pair = getFxPairTr(cift);
  if (!pair) return {};

  const from = fxCurrenciesTr[pair.from];
  const to = fxCurrenciesTr[pair.to];
  const data = await getFxPairPageData(pair.from, pair.to);
  const path = `/doviz-cevirici/${pair.slug}`;
  const title = buildFxTitleTr(pair);
  const description = data
    ? `1 ${from.code} = ${trRate(data.rate)} ${to.code} (${formatTrDateTime(data.latest.lastUpdateUnix)} TSİ referans kuru). ${from.short} ${to.short} çevirici, 30 gün ve 1 yıllık grafik, banka kuru farkı hesaplama.`
    : `${from.short} ${to.short} çevirici: günlük referans kur, 30 gün ve 1 yıllık grafik, çevirme tablosu ve banka kuru farkı hesaplama.`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(path),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "website",
    },
  };
}

export default async function FxPairPage({ params }: PageProps) {
  const { cift } = await params;
  const pair = getFxPairTr(cift);
  if (!pair) notFound();

  const from = fxCurrenciesTr[pair.from];
  const to = fxCurrenciesTr[pair.to];
  const data = await getFxPairPageData(pair.from, pair.to);
  requireFxDataOutsideBuild(data !== null);
  const path = `/doviz-cevirici/${pair.slug}`;
  const pairName = `${from.short} – ${to.short}`;
  const faqItems = buildTrPairFaq(pair, data);
  const analysis = data ? buildTrPairAnalysis(pair, data) : [];
  const related = relatedFxPairsTr(pair);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Döviz Çevirici", item: buildSiteUrl("/doviz-cevirici") },
      { "@type": "ListItem", position: 3, name: `${pairName} Çevirici`, item: buildSiteUrl(path) },
    ],
  };
  const webPageSchema = data
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${pairName} Çevirici`,
        url: buildSiteUrl(path),
        inLanguage: "tr-TR",
        dateModified: new Date(data.latest.lastUpdateUnix * 1000).toISOString(),
      }
    : null;

  return (
    <main className="conversion-page fx-pair-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      {webPageSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(webPageSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">›</span>
          <Link href="/doviz-cevirici">Döviz Çevirici</Link>
          <span aria-hidden="true">›</span>
          <span>{pairName}</span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>{pairName} Çevirici</h1>
            <p className="conversion-hero-description">
              {from.long} ile {to.long} arasında günlük referans kurla çevir. Kurun ne zaman yayınlandığını canlı sayaçla gör.
            </p>

            {data ? (
              <FxPairConverter from={pair.from} to={pair.to} rate={data.rate} numberLocale={TR_NUMBER_LOCALE} labels={trPairConverterLabels} />
            ) : (
              <p className="pair-result-text">Güncel kur şu anda alınamadı. Lütfen biraz sonra tekrar dene.</p>
            )}
          </div>

          <div className="conversion-hero-information">
            <h2>Güncel kur</h2>
            {data ? (
              <>
                <p>
                  1 {pair.from} ={" "}
                  <strong>
                    {trRate(data.rate)} {pair.to}
                  </strong>
                </p>
                <dl>
                  <div>
                    <dt>Ters kur</dt>
                    <dd>
                      1 {pair.to} = {trRate(data.inverse)} {pair.from}
                    </dd>
                  </div>
                  <div>
                    <dt>Kaynakta yayınlandı</dt>
                    <dd>
                      {formatTrDateTime(data.latest.lastUpdateUnix)} (TSİ)
                      <br />
                      <FxRelativeTime targetUnix={data.latest.lastUpdateUnix} mode="since" labels={trRelativeTimeLabels} numberLocale={TR_NUMBER_LOCALE} />
                    </dd>
                  </div>
                  {data.latest.nextUpdateUnix && (
                    <div>
                      <dt>Sonraki güncelleme</dt>
                      <dd>
                        {formatTrDateTime(data.latest.nextUpdateUnix)} (TSİ)
                        <br />
                        <FxRelativeTime targetUnix={data.latest.nextUpdateUnix} mode="until" labels={trRelativeTimeLabels} numberLocale={TR_NUMBER_LOCALE} />
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt>Kur türü</dt>
                    <dd>Günlük referans ara kur ({data.latest.providerName})</dd>
                  </div>
                </dl>
              </>
            ) : (
              <p>Kur verisi şu anda yok.</p>
            )}
          </div>
        </div>
      </section>

      <article className="conversion-content">
        {data && data.daily.length >= 2 && (
          <section className="conversion-section">
            <h2>
              {pair.from}/{pair.to} kur grafiği
            </h2>
            <FxChart pairLabel={`${pair.from}/${pair.to}`} daily={data.daily} yearly={data.yearly} numberLocale={TR_NUMBER_LOCALE} labels={trChartLabels} />
          </section>
        )}

        {analysis.length > 0 && (
          <section className="conversion-section">
            <h2>{pairName} kuru nasıl değişti?</h2>
            {analysis.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        )}

        {data && (
          <section className="conversion-section">
            <h2>{pairName} çevirme tablosu</h2>
            <div className="fx-table-pair">
              <div className="conversion-table-wrap">
                <table className="conversion-table">
                  <thead>
                    <tr>
                      <th>{from.short}</th>
                      <th>{to.short}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FX_TABLE_AMOUNTS.map((amount) => (
                      <tr key={amount}>
                        <td>
                          {amount.toLocaleString(TR_NUMBER_LOCALE)} {pair.from}
                        </td>
                        <td>
                          {trMoney(amount * data.rate)} {pair.to}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="conversion-table-wrap">
                <table className="conversion-table">
                  <thead>
                    <tr>
                      <th>{to.short}</th>
                      <th>{from.short}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FX_TABLE_AMOUNTS.map((amount) => (
                      <tr key={amount}>
                        <td>
                          {amount.toLocaleString(TR_NUMBER_LOCALE)} {pair.to}
                        </td>
                        <td>
                          {trMoney(amount * data.inverse)} {pair.from}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {data && (
          <section className="conversion-section" id="banka-kuru-farki">
            <h2>Banka kuru farkı hesaplayıcı</h2>
            <p>
              Bankanın ya da döviz bürosunun verdiği kuru gir; ara kura göre ne kadar fark ödediğini, yani kur farkının sana gerçek maliyetini
              hemen gör.
            </p>
            <FxMarkupCalculator from={pair.from} to={pair.to} midRate={data.rate} numberLocale={TR_NUMBER_LOCALE} labels={trMarkupLabels} />
          </section>
        )}

        <section className="conversion-section">
          <h2>Ara kur nedir, nasıl hesaplanır?</h2>
          <p>
            Ara kur (referans kur), piyasadaki alış ve satış kurlarının ortasıdır. Bu sayfadaki çevirici bu kuru kullanır:{" "}
            <strong>
              {to.short} tutarı = {from.short} miktarı × kur
            </strong>
            . Ters yönde ise {from.short} miktarı = {to.short} tutarı ÷ kur olur.
          </p>
          <p>
            Bankalar, döviz büroları ve kart işlemleri çoğu zaman bu kurun üzerine (döviz satarken) veya altına (döviz alırken) bir marj ekler.
            Bu marj ayrı bir ücret olarak yazılmadığı için fark edilmesi zordur; yukarıdaki{" "}
            <a className="text-link" href="#banka-kuru-farki">
              banka kuru farkı hesaplayıcısı
            </a>{" "}
            bu gizli maliyeti ortaya çıkarır.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Diğer döviz çevirileri</h2>
          <ul className="related-conversion-list">
            {related.map((relatedPair) => (
              <li key={relatedPair.slug}>
                <Link href={`/doviz-cevirici/${relatedPair.slug}`}>
                  {fxCurrenciesTr[relatedPair.from].short} → {fxCurrenciesTr[relatedPair.to].short}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            <Link className="text-link" href="/doviz-cevirici">
              Tüm döviz kurları ve çevirici
            </Link>
          </p>
        </section>

        <section className="conversion-section conversion-faq">
          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <div key={item.question} className="conversion-faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>

        <section className="conversion-section unit-sources">
          <h2>Kaynaklar</h2>
          <ol>
            <li>
              <a href="https://www.exchangerate-api.com" target="_blank" rel="noreferrer">
                Rates By Exchange Rate API
              </a>{" "}
              – güncel referans kur ve yayın zamanı (günde bir kez güncellenir).
            </li>
            <li>
              <a href="https://github.com/fawazahmed0/exchange-api" target="_blank" rel="noreferrer">
                fawazahmed0/exchange-api
              </a>{" "}
              – grafik ve istatistiklerdeki geçmiş günlük kurlar. Kaynaklar farklı olduğu için grafiğin son noktası güncel kurdan çok az farklı
              olabilir.
            </li>
          </ol>
          <p>
            Bu sayfadaki kurlar bilgi amaçlıdır ve bir alım-satım teklifi değildir; gerçek işlem kurunu işlemi yaptığın kurum belirler.
          </p>
        </section>
      </article>
    </main>
  );
}
