import type { Metadata } from "next";
import FxHubView from "../../components/fx/FxHubView";
import { fxContentBn } from "../../converter/fx/fxContentBn";
import { requireFxDataOutsideBuild } from "../../converter/fx/fxData";
import { fxHubAlternates } from "../../converter/fx/fxHubAlternates";
import { getFxBoard } from "../../converter/fx/fxPageData";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 43200;

const { hub } = fxContentBn;

export const metadata: Metadata = {
  title: hub.title,
  description: hub.description,
  alternates: {
    canonical: fxContentBn.basePath,
    languages: fxHubAlternates,
  },
  openGraph: {
    title: hub.title,
    description: hub.ogDescription,
    url: buildSiteUrl(fxContentBn.basePath),
    siteName: "BirimCeviri.app",
    locale: fxContentBn.ogLocale,
    type: "website",
  },
};

const boardCodes = Object.keys(fxContentBn.currencies).filter((code) => code !== fxContentBn.quote);

export default async function FxHubPage() {
  const board = await getFxBoard(boardCodes, fxContentBn.quote);
  requireFxDataOutsideBuild(board !== null);
  return <FxHubView content={fxContentBn} board={board} />;
}
