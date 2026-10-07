import Link from "@/app/components/SiteLink";
import { buildFaqSchema } from "../../converter/faqSchema";
import type { FxLocaleContent } from "../../converter/fx/fxLocale";
import { formatRate } from "../../converter/fx/fxMath";
import type { FxBoardRow } from "../../converter/fx/fxPageData";
import type { FxLatest } from "../../converter/fx/fxData";
import { buildSiteUrl } from "../../siteConfig";
import EmbedCodeBox from "../EmbedCodeBox";
import FxMultiConverter from "./FxMultiConverter";
import FxRelativeTime from "./FxRelativeTime";

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// Istemciye tum 160+ kur yerine yalnizca bu dilin para birimleri gonderilir.
export function pickFxRates(content: FxLocaleContent, rates: Record<string, number>): Record<string, number> {
  return Object.fromEntries(Object.keys(content.currencies).flatMap((code) => (rates[code] ? [[code, rates[code]]] : [])));
}

export function fxMultiOptions(content: FxLocaleContent) {
  return Object.values(content.currencies).map((currency) => ({ code: currency.code, label: `${currency.long} (${currency.code})` }));
}

// Hub'da varsayilan cevirme yonu: ilk ciftin yonu (USD -> yerel para).
function defaultPair(content: FxLocaleContent) {
  const first = content.pairs[0];
  return { from: first?.from ?? "USD", to: first?.to ?? content.quote };
}

type Props = {
  content: FxLocaleContent;
  board: { latest: FxLatest; rows: FxBoardRow[] } | null;
};

export default function FxHubView({ content, board }: Props) {
  const { hub, common, labels, numberLocale } = content;
  const defaults = defaultPair(content);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: common.home, item: buildSiteUrl(content.homeHref) },
      { "@type": "ListItem", position: 2, name: common.hub, item: buildSiteUrl(content.basePath) },
    ],
  };


  return (
    <main className="all-conversions-page" lang={content.htmlLang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(hub.faq)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label={common.breadcrumbAria}>
          <Link href={content.homeHref}>{common.home}</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{common.hub}</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>{hub.h1}</h1>
            <p>{hub.intro}</p>
          </header>

          {hub.embed && <EmbedCodeBox embedPath={hub.embed.path} title={hub.embed.title} height={560} maxWidth={480} />}
        </div>

        {board ? (
          <>
            <p className="fx-update-strip">
              <span>
                <strong>{content.pair.published}:</strong> {content.formatDateTime(board.latest.lastUpdateUnix)} ·{" "}
                <FxRelativeTime targetUnix={board.latest.lastUpdateUnix} mode="since" labels={labels.relative} numberLocale={numberLocale} />
              </span>
              {board.latest.nextUpdateUnix && (
                <span>
                  <strong>{content.pair.nextUpdate}:</strong>{" "}
                  <FxRelativeTime targetUnix={board.latest.nextUpdateUnix} mode="until" labels={labels.relative} numberLocale={numberLocale} />
                </span>
              )}
            </p>

            <FxMultiConverter
              rates={pickFxRates(content, board.latest.rates)}
              options={fxMultiOptions(content)}
              defaultFrom={defaults.from}
              defaultTo={defaults.to}
              numberLocale={numberLocale}
              labels={labels.multi}
            />
          </>
        ) : (
          <p className="calculator-usage-hint">{common.unavailable}</p>
        )}

        <section className="category-article-content">
          {board && (
            <>
              <h2>{hub.boardTitle}</h2>
              <div className="conversion-table-wrap">
                <table className="conversion-table">
                  <thead>
                    <tr>
                      <th>{hub.colCurrency}</th>
                      <th>{hub.colOneUnit}</th>
                      <th>{hub.colChange}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {board.rows.map((row) => {
                      const currency = content.currencies[row.code];
                      const flat = row.change30 === null || Math.abs(row.change30) < 0.05;
                      return (
                        <tr key={row.code}>
                          <td>
                            {currency.long} ({row.code})
                          </td>
                          <td>
                            {formatRate(row.rate, numberLocale)} {hub.quoteLabel}
                          </td>
                          <td className={flat ? undefined : row.change30! > 0 ? "fx-board-change-up" : "fx-board-change-down"}>
                            {row.change30 === null ? "–" : `${flat ? "" : row.change30 > 0 ? "▲ " : "▼ "}${hub.percent(row.change30)}`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p>{hub.boardNote}</p>
            </>
          )}

          <h2>{common.faqTitle}</h2>
          {hub.faq.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>{hub.relatedTitle}</h2>
          <p>
            {hub.relatedLinks.map((link, index) => (
              <span key={link.href}>
                {index > 0 && " · "}
                <Link href={link.href}>{link.label}</Link>
              </span>
            ))}
          </p>

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
      </div>
    </main>
  );
}
