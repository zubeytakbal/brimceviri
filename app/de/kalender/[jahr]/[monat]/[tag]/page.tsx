import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DeTagSeite,
  deTagMeta,
} from "../../../../../components/takvim/DeKalenderSeiten";
import { deKalenderMetadata } from "../../../../../components/takvim/takvimMeta";
import {
  DE_JAHRE,
  DE_MONAT_SLUG,
  deBelegteTage,
  deTagPfad,
} from "../../../../../converter/calendar/deKalender";
import { ymdKey } from "../../../../../converter/time/dateMath";

// Nur Tage mit mindestens einem Termin bekommen eine eigene Seite.
export const dynamicParams = false;

export function generateStaticParams() {
  return DE_JAHRE.flatMap((y) =>
    deBelegteTage(y).map((d) => ({
      jahr: String(y),
      monat: DE_MONAT_SLUG[d.month - 1],
      tag: String(d.day),
    })),
  );
}

type P = { params: Promise<{ jahr: string; monat: string; tag: string }> };

async function lese(params: P["params"]) {
  const p = await params;
  const d = {
    year: Number(p.jahr),
    month: DE_MONAT_SLUG.indexOf(p.monat) + 1,
    day: Number(p.tag),
  };
  if (!DE_JAHRE.includes(d.year)) return null;
  return deBelegteTage(d.year).some((x) => ymdKey(x) === ymdKey(d)) ? d : null;
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const d = await lese(params);
  return d ? deKalenderMetadata(deTagPfad(d), deTagMeta(d)) : {};
}

export default async function Route({ params }: P) {
  const d = await lese(params);
  if (!d) notFound();
  return <DeTagSeite d={d} />;
}
