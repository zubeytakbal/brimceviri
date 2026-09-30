import type { Metadata } from "next";
import { SaTaqwimDirasi } from "../../components/takvim/SaSafahat";
import { saMetadata } from "../../components/takvim/takvimMeta";
import { AAM_HALI } from "../../converter/calendar/saMadrasi";

// العد التنازلي للإجازة القادمة يتغير يوميًا.
export const revalidate = 21600;

export function generateMetadata(): Metadata {
  const h = AAM_HALI.hijri;
  return saMetadata("/ar/school-calendar", {
    title: `التقويم الدراسي ${h}: الإجازات وبداية الفصل الثاني`,
    short: `التقويم الدراسي ${h}`,
    description: `التقويم الدراسي ${h} في السعودية بنظام الفصلين: موعد بداية الدراسة، إجازة اليوم الوطني والخريف ومنتصف العام ويوم التأسيس والعيدين، ونهاية العام مع العد التنازلي.`,
  });
}

export default function Route() {
  return <SaTaqwimDirasi />;
}
