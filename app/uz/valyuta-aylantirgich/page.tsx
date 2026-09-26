import type { Metadata } from "next";
import FxHubView from "../../components/fx/FxHubView";
import { fxContentUz } from "../../converter/fx/fxContentUz";
import { requireFxDataOutsideBuild } from "../../converter/fx/fxData";
import { fxHubAlternates } from "../../converter/fx/fxHubAlternates";
import { getFxBoard } from "../../converter/fx/fxPageData";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 43200;

const { hub } = fxContentUz;

export const metadata: Metadata = {
  title: hub.title,
  description: hub.description,
  alternates: {
    canonical: fxContentUz.basePath,
    languages: fxHubAlternates,
  },
  openGraph: {
    title: hub.title,
    description: hub.ogDescription,
    url: buildSiteUrl(fxContentUz.basePath),
    siteName: "BirimCeviri.app",
    locale: fxContentUz.ogLocale,
    type: "website",
  },
};

const boardCodes = Object.keys(fxContentUz.currencies).filter((code) => code !== fxContentUz.quote);

export default async function FxHubPage() {
  const board = await getFxBoard(boardCodes, fxContentUz.quote);
  requireFxDataOutsideBuild(board !== null);
  return <FxHubView content={fxContentUz} board={board} />;
}
