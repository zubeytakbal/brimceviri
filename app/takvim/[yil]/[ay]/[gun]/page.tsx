import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  gunMeta,
  TakvimGunSayfasi,
} from "../../../../components/takvim/TakvimSayfalari";
import { takvimMetadata } from "../../../../components/takvim/takvimMeta";
import {
  AY_SLUG,
  doluGunler,
  TAKVIM_YILLARI,
  takvimGunPath,
} from "../../../../converter/calendar/trTakvim";
import { ymdKey } from "../../../../converter/time/dateMath";

// Yalnizca en az bir ozel gunu olan gunlerin sayfasi vardir (bos gun sayfasi uretilmez).
export const dynamicParams = false;

export function generateStaticParams() {
  return TAKVIM_YILLARI.flatMap((y) =>
    doluGunler(y).map((d) => ({
      yil: String(y),
      ay: AY_SLUG[d.month - 1],
      gun: String(d.day),
    })),
  );
}

type P = { params: Promise<{ yil: string; ay: string; gun: string }> };

async function coz(params: P["params"]) {
  const p = await params;
  const d = {
    year: Number(p.yil),
    month: AY_SLUG.indexOf(p.ay) + 1,
    day: Number(p.gun),
  };
  if (!TAKVIM_YILLARI.includes(d.year)) return null;
  return doluGunler(d.year).some((x) => ymdKey(x) === ymdKey(d)) ? d : null;
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const d = await coz(params);
  return d ? takvimMetadata(takvimGunPath(d), gunMeta(d)) : {};
}

export default async function TakvimGunRoute({ params }: P) {
  const d = await coz(params);
  if (!d) notFound();
  return <TakvimGunSayfasi d={d} />;
}
