import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FxPairPageView, { buildFxPairMetadata } from "../../../components/fx/FxPairPageView";
import { fxContentDe, fxPairsDe, getFxPairDe } from "../../../converter/fx/fxContentDe";
import { requireFxDataOutsideBuild } from "../../../converter/fx/fxData";
import { getFxPairPageData } from "../../../converter/fx/fxPageData";

// Kaynak gunde bir guncellenir; gunluk cron ayrica "fx" etiketini
// yeniler. Bu sure yalnizca bir guvenlik agidir.
export const revalidate = 43200;
export const dynamicParams = false;

type PageProps = { params: Promise<{ paar: string }> };

export function generateStaticParams() {
  return fxPairsDe.map((pair) => ({ paar: pair.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { paar } = await params;
  const pair = getFxPairDe(paar);
  if (!pair) return {};
  return buildFxPairMetadata(fxContentDe, pair, await getFxPairPageData(pair.from, pair.to));
}

export default async function FxPairPage({ params }: PageProps) {
  const { paar } = await params;
  const pair = getFxPairDe(paar);
  if (!pair) notFound();

  const data = await getFxPairPageData(pair.from, pair.to);
  requireFxDataOutsideBuild(data !== null);
  return <FxPairPageView content={fxContentDe} pair={pair} data={data} />;
}
