import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SaMunasaba,
  saMunasabaMeta,
} from "../../../components/takvim/SaSafahat";
import { saMetadata } from "../../../components/takvim/takvimMeta";
import {
  findMunasaba,
  MUNASABAT,
  saMunasabaPath,
} from "../../../converter/calendar/saTaqwim";

export const dynamicParams = false;
// "كم باقي" يتغير يوميًا.
export const revalidate = 21600;

export function generateStaticParams() {
  return MUNASABAT.map((m) => ({ id: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const m = findMunasaba((await params).id);
  return m ? saMetadata(saMunasabaPath(m.id), saMunasabaMeta(m)) : {};
}

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const m = findMunasaba((await params).id);
  if (!m) notFound();
  return <SaMunasaba m={m} />;
}
