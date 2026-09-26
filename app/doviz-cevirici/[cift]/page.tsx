import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FxPairPageView, { buildFxPairMetadata } from "../../components/fx/FxPairPageView";
import { fxContentTr } from "../../converter/fx/fxContentTr";
import { requireFxDataOutsideBuild } from "../../converter/fx/fxData";
import { getFxPairPageData } from "../../converter/fx/fxPageData";
import { fxPairsTr, getFxPairTr } from "../../converter/fx/fxPairsTr";

// Kaynak gunde bir guncellenir; gunluk cron ayrica "fx" etiketini
// yeniler. Bu sure yalnizca bir guvenlik agidir.
export const revalidate = 43200;
export const dynamicParams = false;

type PageProps = { params: Promise<{ cift: string }> };

export function generateStaticParams() {
  return fxPairsTr.map((pair) => ({ cift: pair.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cift } = await params;
  const pair = getFxPairTr(cift);
  if (!pair) return {};
  return buildFxPairMetadata(fxContentTr, pair, await getFxPairPageData(pair.from, pair.to));
}

export default async function FxPairPage({ params }: PageProps) {
  const { cift } = await params;
  const pair = getFxPairTr(cift);
  if (!pair) notFound();

  const data = await getFxPairPageData(pair.from, pair.to);
  requireFxDataOutsideBuild(data !== null);
  return <FxPairPageView content={fxContentTr} pair={pair} data={data} />;
}
