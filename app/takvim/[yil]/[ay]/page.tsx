import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ayMeta,
  TakvimAySayfasi,
} from "../../../components/takvim/TakvimSayfalari";
import { takvimMetadata } from "../../../components/takvim/takvimMeta";
import {
  AY_SLUG,
  TAKVIM_YILLARI,
  takvimAyPath,
} from "../../../converter/calendar/trTakvim";

export const dynamicParams = false;

export function generateStaticParams() {
  return TAKVIM_YILLARI.flatMap((y) =>
    AY_SLUG.map((ay) => ({ yil: String(y), ay })),
  );
}

type P = { params: Promise<{ yil: string; ay: string }> };

async function coz(params: P["params"]) {
  const p = await params;
  const y = Number(p.yil);
  const m = AY_SLUG.indexOf(p.ay) + 1;
  return TAKVIM_YILLARI.includes(y) && m > 0 ? { y, m } : null;
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const r = await coz(params);
  return r ? takvimMetadata(takvimAyPath(r.y, r.m), ayMeta(r.y, r.m)) : {};
}

export default async function TakvimAyRoute({ params }: P) {
  const r = await coz(params);
  if (!r) notFound();
  return <TakvimAySayfasi year={r.y} month={r.m} />;
}
