import type { Metadata } from "next";
import { SaRawatib } from "../../components/takvim/SaSafahat";
import { saMetadata } from "../../components/takvim/takvimMeta";
import { riyadhYawm } from "../../converter/calendar/saTaqwim";

// العد التنازلي للراتب القادم.
export const revalidate = 21600;

export function generateMetadata(): Metadata {
  const y = riyadhYawm().year;
  return saMetadata("/ar/salary-dates", {
    title: `مواعيد صرف الرواتب ${y} و${y + 1}: متى ينزل الراتب؟`,
    short: `مواعيد صرف الرواتب ${y}`,
    description: `موعد صرف رواتب موظفي الدولة في السعودية لكل شهر في ${y} و${y + 1} مع العد التنازلي للراتب القادم والتاريخ الهجري الموافق.`,
  });
}

export default function Route() {
  return <SaRawatib />;
}
