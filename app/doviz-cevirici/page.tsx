import type { Metadata } from "next";
import FxHubView from "../components/fx/FxHubView";
import { fxContentTr } from "../converter/fx/fxContentTr";
import { requireFxDataOutsideBuild } from "../converter/fx/fxData";
import { fxHubAlternates } from "../converter/fx/fxHubAlternates";
import { getFxBoard } from "../converter/fx/fxPageData";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 43200;

const { hub } = fxContentTr;

export const metadata: Metadata = {
  title: hub.title,
  description: hub.description,
  alternates: {
    canonical: fxContentTr.basePath,
    languages: fxHubAlternates,
  },
  openGraph: {
    title: hub.title,
    description: hub.ogDescription,
    url: buildSiteUrl(fxContentTr.basePath),
    siteName: "BirimCeviri.app",
    locale: fxContentTr.ogLocale,
    type: "website",
  },
};

const boardCodes = Object.keys(fxContentTr.currencies).filter((code) => code !== fxContentTr.quote);

export default async function CurrencyConverterPage() {
  const board = await getFxBoard(boardCodes, fxContentTr.quote);
  requireFxDataOutsideBuild(board !== null);
  return <FxHubView content={fxContentTr} board={board} />;
}
