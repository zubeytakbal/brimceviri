import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DeJahrSeite,
  deJahrMeta,
} from "../../../components/takvim/DeKalenderSeiten";
import { deKalenderMetadata } from "../../../components/takvim/takvimMeta";
import { DE_JAHRE, deJahrPfad } from "../../../converter/calendar/deKalender";

export const dynamicParams = false;

export function generateStaticParams() {
  return DE_JAHRE.map((y) => ({ jahr: String(y) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ jahr: string }>;
}): Promise<Metadata> {
  const y = Number((await params).jahr);
  return deKalenderMetadata(deJahrPfad(y), deJahrMeta(y));
}

export default async function Route({
  params,
}: {
  params: Promise<{ jahr: string }>;
}) {
  const y = Number((await params).jahr);
  if (!DE_JAHRE.includes(y)) notFound();
  return <DeJahrSeite year={y} />;
}
