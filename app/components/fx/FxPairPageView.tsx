import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { buildFaqSchema } from "../../converter/faqSchema";
import type { FxLocaleContent, FxPair } from "../../converter/fx/fxLocale";
import { formatMoney, formatNumber, formatRate, tableAmountsFor } from "../../converter/fx/fxMath";
import type { FxPairPageData } from "../../converter/fx/fxPageData";
import { buildSiteUrl } from "../../siteConfig";
import FxChart from "./FxChart";
import FxMarkupCalculator from "./FxMarkupCalculator";
import FxPairConverter from "./FxPairConverter";
import FxRelativeTime from "./FxRelativeTime";

// Tum dillerde ortak doviz cifti sayfasi. Birim cevirme sayfalariyla ayni
// tasarim siniflarini (conversion-page, conversion-hero ...) kullanir.

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// Ilgili ciftler: once ayni hedef para birimine sahip olanlar.
export function relatedFxPairs(pairs: FxPair[], pair: FxPair, limit = 8): FxPair[] {
  const others = pairs.filter((candidate) => candidate.slug !== pair.slug);
  const sameTarget = others.filter((candidate) => candidate.to === pair.to);
  const rest = others.filter((candidate) => candidate.to !== pair.to);
  return [...sameTarget, ...rest].slice(0, limit);
}

export function buildFxPairMetadata(content: FxLocaleContent, pair: FxPair, data: FxPairPageData | null): Metadata {
  const path = `${content.basePath}/${pair.slug}`;
  const title = content.pair.title(pair);
  const description = content.pair.description(pair, data);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(path),
      siteName: "BirimCeviri.app",
      locale: content.ogLocale,
      type: "website",
    },
  };
}

type Props = { content: FxLocaleContent; pair: FxPair; data: FxPairPageData | null };

export default function FxPairPageView({ content, pair, data }: Props) {
  const { pair: text, common, labels, numberLocale } = content;
  const from = content.currencies[pair.from];
  const to = content.currencies[pair.to];
  const path = `${content.basePath}/${pair.slug}`;
  const pairName = text.pairName(pair);
  const faqItems = text.faq(pair, data);
  const analysis = data ? text.analysis(pair, data) : [];
  const related = relatedFxPairs(content.pairs, pair);
  const rate = (value: number) => formatRate(value, numberLocale);
  const money = (value: number) => formatMoney(value, numberLocale);
  const count = (value: number) => formatNumber(value, numberLocale);
  const midP1 = text.midRateP1(pair);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: common.home, item: buildSiteUrl(content.homeHref) },
      { "@type": "ListItem", position: 2, name: common.hub, item: buildSiteUrl(content.basePath) },
      { "@type": "ListItem", position: 3, name: text.h1(pairName), item: buildSiteUrl(path) },
    ],
  };
  const webPageSchema = data
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: text.h1(pairName),
        url: buildSiteUrl(path),
        inLanguage: numberLocale,
        dateModified: new Date(data.latest.lastUpdateUnix * 1000).toISOString(),
      }
    : null;

  const directions = data
    ? [
        { key: "forward", fromInfo: from, toInfo: to, fromCode: pair.from, toCode: pair.to, value: data.rate },
        { key: "reverse", fromInfo: to, toInfo: from, fromCode: pair.to, toCode: pair.from, value: data.inverse },
      ]
    : [];

  return (
    <main className="conversion-page fx-pair-page" lang={content.htmlLang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      {webPageSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(webPageSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label={common.breadcrumbAria}>
          <Link href={content.homeHref}>{common.home}</Link>
          <span aria-hidden="true">›</span>
          <Link href={content.basePath}>{common.hub}</Link>
          <span aria-hidden="true">›</span>
          <span>{pairName}</span>
        </nav>
      </div>

      <section className="conversion-hero">
        <div className="conversion-hero-inner">
          <div className="conversion-hero-tool">
            <h1>{text.h1(pairName)}</h1>
            <p className="conversion-hero-description">{text.heroDescription(pair)}</p>

            {data ? (
              <FxPairConverter from={pair.from} to={pair.to} rate={data.rate} numberLocale={numberLocale} labels={labels.converter} />
            ) : (
              <p className="pair-result-text">{common.unavailable}</p>
            )}
          </div>

          <div className="conversion-hero-information">
            <h2>{text.currentRate}</h2>
            {data ? (
              <>
                <p>
                  1 {pair.from} ={" "}
                  <strong>
                    {rate(data.rate)} {pair.to}
                  </strong>
                </p>
                <dl>
                  <div>
                    <dt>{text.inverseRate}</dt>
                    <dd>
                      1 {pair.to} = {rate(data.inverse)} {pair.from}
                    </dd>
                  </div>
                  <div>
                    <dt>{text.published}</dt>
                    <dd>
                      {content.formatDateTime(data.latest.lastUpdateUnix)}
                      <br />
                      <FxRelativeTime targetUnix={data.latest.lastUpdateUnix} mode="since" labels={labels.relative} numberLocale={numberLocale} />
                    </dd>
                  </div>
                  {data.latest.nextUpdateUnix && (
                    <div>
                      <dt>{text.nextUpdate}</dt>
                      <dd>
                        {content.formatDateTime(data.latest.nextUpdateUnix)}
                        <br />
                        <FxRelativeTime targetUnix={data.latest.nextUpdateUnix} mode="until" labels={labels.relative} numberLocale={numberLocale} />
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt>{text.rateType}</dt>
                    <dd>{text.rateTypeValue(data.latest.providerName)}</dd>
                  </div>
                </dl>
              </>
            ) : (
              <p>{text.noData}</p>
            )}
          </div>
        </div>
      </section>

      <article className="conversion-content">
        {data && data.daily.length >= 2 && (
          <section className="conversion-section">
            <h2>{text.chartTitle(pair)}</h2>
            <FxChart pairLabel={`${pair.from}/${pair.to}`} daily={data.daily} yearly={data.yearly} numberLocale={numberLocale} labels={labels.chart} />
          </section>
        )}

        {analysis.length > 0 && (
          <section className="conversion-section">
            <h2>{text.analysisTitle(pairName)}</h2>
            {analysis.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        )}

        {data && (
          <section className="conversion-section">
            <h2>{text.tableTitle(pairName)}</h2>
            <div className="fx-table-pair">
              {directions.map((direction) => (
                <div className="conversion-table-wrap" key={direction.key}>
                  <table className="conversion-table">
                    <thead>
                      <tr>
                        <th>{direction.fromInfo.short}</th>
                        <th>{direction.toInfo.short}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableAmountsFor(direction.value).map((amount) => (
                        <tr key={amount}>
                          <td>
                            {count(amount)} {direction.fromCode}
                          </td>
                          <td>
                            {money(amount * direction.value)} {direction.toCode}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>
        )}

        {data && (
          <section className="conversion-section" id="fx-markup">
            <h2>{text.markupTitle}</h2>
            <p>{text.markupIntro}</p>
            <FxMarkupCalculator
              from={pair.from}
              to={pair.to}
              midRate={data.rate}
              numberLocale={numberLocale}
              labels={labels.markup}
              defaultDirection={content.defaultMarkupDirection}
            />
          </section>
        )}

        <section className="conversion-section">
          <h2>{text.midRateTitle}</h2>
          <p>
            {midP1.before}
            <strong>{midP1.formula}</strong>
            {midP1.after}
          </p>
          <p>
            {text.midRateP2.before}
            <a className="text-link" href="#fx-markup">
              {text.midRateP2.link}
            </a>
            {text.midRateP2.after}
          </p>
        </section>

        {text.officialRateNote && (
          <section className="conversion-section">
            <h2>{text.officialRateNote.title}</h2>
            {text.officialRateNote.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {text.officialRateNote.link && (
              <p>
                <a className="text-link" href={text.officialRateNote.link.href} target="_blank" rel="noreferrer">
                  {text.officialRateNote.link.label}
                </a>
              </p>
            )}
          </section>
        )}

        <section className="conversion-section related-conversions">
          <h2>{text.relatedTitle}</h2>
          <ul className="related-conversion-list">
            {related.map((relatedPair) => (
              <li key={relatedPair.slug}>
                <Link href={`${content.basePath}/${relatedPair.slug}`}>
                  {content.currencies[relatedPair.from].short} → {content.currencies[relatedPair.to].short}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            <Link className="text-link" href={content.basePath}>
              {text.allRatesLink}
            </Link>
          </p>
        </section>

        <section className="conversion-section conversion-faq">
          <h2>{common.faqTitle}</h2>
          {faqItems.map((item) => (
            <div key={item.question} className="conversion-faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>

        <section className="conversion-section unit-sources">
          <h2>{common.sourcesTitle}</h2>
          <ol>
            <li>
              <a href="https://www.exchangerate-api.com" target="_blank" rel="noreferrer">
                Rates By Exchange Rate API
              </a>{" "}
              {common.sourceLatest}
            </li>
            <li>
              <a href="https://github.com/fawazahmed0/exchange-api" target="_blank" rel="noreferrer">
                fawazahmed0/exchange-api
              </a>{" "}
              {common.sourceHistory}
            </li>
          </ol>
          <p>{common.disclaimer}</p>
        </section>
      </article>
    </main>
  );
}
