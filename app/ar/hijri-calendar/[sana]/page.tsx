import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SaSana, saSanaMeta } from "../../../components/takvim/SaSafahat";
import { saMetadata } from "../../../components/takvim/takvimMeta";
import {
  SA_HIJRI_SANAWAT,
  saHijriSanaPath,
} from "../../../converter/calendar/saTaqwim";

export const dynamicParams = false;

export function generateStaticParams() {
  return SA_HIJRI_SANAWAT.map((y) => ({ sana: String(y) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sana: string }>;
}): Promise<Metadata> {
  const y = Number((await params).sana);
  return saMetadata(saHijriSanaPath(y), saSanaMeta(y));
}

export default async function Route({
  params,
}: {
  params: Promise<{ sana: string }>;
}) {
  const y = Number((await params).sana);
  if (!SA_HIJRI_SANAWAT.includes(y)) notFound();
  return <SaSana hy={y} />;
}
