import type { Metadata } from "next";
import { SaHub } from "../../components/takvim/SaSafahat";
import { saMetadata } from "../../components/takvim/takvimMeta";
import { riyadhYawm } from "../../converter/calendar/saTaqwim";
import { gregorianToHijri } from "../../converter/time/calendars";

// التاريخ الهجري اليوم يتغير يوميًا.
export const revalidate = 21600;

export function generateMetadata(): Metadata {
  const h = gregorianToHijri(riyadhYawm()).year;
  return saMetadata("/ar/calendar", {
    title: `التاريخ الهجري اليوم والتقويم ${h}هـ (أم القرى)`,
    short: `التاريخ الهجري اليوم ${h}هـ`,
    description:
      "التاريخ الهجري اليوم حسب تقويم أم القرى مع الميلادي، وتقويم تفاعلي لكل شهر هجري، والإجازات الرسمية والمناسبات ومواعيد الرواتب في السعودية.",
  });
}

export default function Route() {
  return <SaHub />;
}
