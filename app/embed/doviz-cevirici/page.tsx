import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import FxMultiConverter from "../../components/fx/FxMultiConverter";
import { fxMultiOptions, pickFxRates } from "../../components/fx/FxHubView";
import { TR_NUMBER_LOCALE, formatTrDateTime, fxContentTr, trMultiConverterLabels } from "../../converter/fx/fxContentTr";
import { getFxLatest, requireFxDataOutsideBuild } from "../../converter/fx/fxData";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 43200;

export const metadata: Metadata = {
  title: "Döviz Çevirici",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CurrencyConverterEmbedPage() {
  const latest = await getFxLatest();
  requireFxDataOutsideBuild(latest !== null);

  return (
    <main className="embed-widget-page">
      <div className="embed-widget-shell">
        {latest ? (
          <>
            <FxMultiConverter
              rates={pickFxRates(fxContentTr, latest.rates)}
              options={fxMultiOptions(fxContentTr)}
              defaultFrom="USD"
              defaultTo="TRY"
              numberLocale={TR_NUMBER_LOCALE}
              labels={trMultiConverterLabels}
            />
            <p className="calculator-usage-hint">
              Günlük referans kur, {formatTrDateTime(latest.lastUpdateUnix)} (TSİ) itibarıyla. Kaynak: Rates By Exchange Rate API.
            </p>
          </>
        ) : (
          <p className="calculator-usage-hint">Güncel döviz kuru şu anda alınamadı, lütfen daha sonra tekrar dene.</p>
        )}

        <Link className="embed-widget-attribution" href={buildSiteUrl("/doviz-cevirici")} target="_blank" rel="noopener">
          Bu araç birimceviri.app tarafından sağlanıyor →
        </Link>
      </div>
    </main>
  );
}
