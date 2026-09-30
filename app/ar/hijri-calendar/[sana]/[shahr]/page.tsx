import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SaShahr, saShahrMeta } from "../../../../components/takvim/SaSafahat";
import { saMetadata } from "../../../../components/takvim/takvimMeta";
import {
  HIJRI_SLUG,
  SA_HIJRI_SANAWAT,
  saHijriShahrPath,
} from "../../../../converter/calendar/saTaqwim";

export const dynamicParams = false;

export function generateStaticParams() {
  return SA_HIJRI_SANAWAT.flatMap((y) =>
    HIJRI_SLUG.map((shahr) => ({ sana: String(y), shahr })),
  );
}

type P = { params: Promise<{ sana: string; shahr: string }> };

async function iqra(params: P["params"]) {
  const p = await params;
  const hy = Number(p.sana);
  const hm = HIJRI_SLUG.indexOf(p.shahr) + 1;
  return SA_HIJRI_SANAWAT.includes(hy) && hm > 0 ? { hy, hm } : null;
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const r = await iqra(params);
  return r
    ? saMetadata(saHijriShahrPath(r.hy, r.hm), saShahrMeta(r.hy, r.hm))
    : {};
}

export default async function Route({ params }: P) {
  const r = await iqra(params);
  if (!r) notFound();
  return <SaShahr hy={r.hy} hm={r.hm} />;
}
