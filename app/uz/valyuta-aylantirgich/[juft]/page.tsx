import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FxPairPageView, { buildFxPairMetadata } from "../../../components/fx/FxPairPageView";
import { fxContentUz, fxPairsUz, getFxPairUz } from "../../../converter/fx/fxContentUz";
import { requireFxDataOutsideBuild } from "../../../converter/fx/fxData";
import { getFxPairPageData } from "../../../converter/fx/fxPageData";

// Kaynak gunde bir guncellenir; gunluk cron ayrica "fx" etiketini
// yeniler. Bu sure yalnizca bir guvenlik agidir.
export const revalidate = 43200;
export const dynamicParams = false;

type PageProps = { params: Promise<{ juft: string }> };

export function generateStaticParams() {
  return fxPairsUz.map((pair) => ({ juft: pair.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { juft } = await params;
  const pair = getFxPairUz(juft);
  if (!pair) return {};
  return buildFxPairMetadata(fxContentUz, pair, await getFxPairPageData(pair.from, pair.to));
}

export default async function FxPairPage({ params }: PageProps) {
  const { juft } = await params;
  const pair = getFxPairUz(juft);
  if (!pair) notFound();

  const data = await getFxPairPageData(pair.from, pair.to);
  requireFxDataOutsideBuild(data !== null);
  return <FxPairPageView content={fxContentUz} pair={pair} data={data} />;
}
