import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DeMonatSeite,
  deMonatMeta,
} from "../../../../components/takvim/DeKalenderSeiten";
import { deKalenderMetadata } from "../../../../components/takvim/takvimMeta";
import {
  DE_JAHRE,
  DE_MONAT_SLUG,
  deMonatPfad,
} from "../../../../converter/calendar/deKalender";

export const dynamicParams = false;

export function generateStaticParams() {
  return DE_JAHRE.flatMap((y) =>
    DE_MONAT_SLUG.map((monat) => ({ jahr: String(y), monat })),
  );
}

type P = { params: Promise<{ jahr: string; monat: string }> };

async function lese(params: P["params"]) {
  const p = await params;
  const y = Number(p.jahr);
  const m = DE_MONAT_SLUG.indexOf(p.monat) + 1;
  return DE_JAHRE.includes(y) && m > 0 ? { y, m } : null;
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const r = await lese(params);
  return r
    ? deKalenderMetadata(deMonatPfad(r.y, r.m), deMonatMeta(r.y, r.m))
    : {};
}

export default async function Route({ params }: P) {
  const r = await lese(params);
  if (!r) notFound();
  return <DeMonatSeite year={r.y} month={r.m} />;
}
