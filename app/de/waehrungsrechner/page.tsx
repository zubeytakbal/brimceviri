import type { Metadata } from "next";
import FxHubView from "../../components/fx/FxHubView";
import { fxContentDe } from "../../converter/fx/fxContentDe";
import { requireFxDataOutsideBuild } from "../../converter/fx/fxData";
import { fxHubAlternates } from "../../converter/fx/fxHubAlternates";
import { getFxBoard } from "../../converter/fx/fxPageData";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 43200;

const { hub } = fxContentDe;

export const metadata: Metadata = {
  title: hub.title,
  description: hub.description,
  alternates: {
    canonical: fxContentDe.basePath,
    languages: fxHubAlternates,
  },
  openGraph: {
    title: hub.title,
    description: hub.ogDescription,
    url: buildSiteUrl(fxContentDe.basePath),
    siteName: "BirimCeviri.app",
    locale: fxContentDe.ogLocale,
    type: "website",
  },
};

const boardCodes = Object.keys(fxContentDe.currencies).filter((code) => code !== fxContentDe.quote);

export default async function FxHubPage() {
  const board = await getFxBoard(boardCodes, fxContentDe.quote);
  requireFxDataOutsideBuild(board !== null);
  return <FxHubView content={fxContentDe} board={board} />;
}
