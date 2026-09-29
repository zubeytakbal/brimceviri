import type { Metadata } from "next";
import { SaUmrHijriSafha } from "../../components/takvim/SaSafahat";
import { saMetadata } from "../../components/takvim/takvimMeta";

// التاريخ الافتراضي (اليوم) يتغير يوميًا.
export const revalidate = 21600;

export function generateMetadata(): Metadata {
  return saMetadata("/ar/hijri-age-calculator", {
    title: "حساب العمر بالهجري والميلادي (أم القرى): كم عمري بالهجري؟",
    short: "حساب العمر بالهجري",
    description:
      "احسب عمرك بالهجري والميلادي بالسنوات والأشهر والأيام حسب تقويم أم القرى، أدخل تاريخ الميلاد هجري أو ميلادي واعرف عيد ميلادك الهجري القادم.",
  });
}

export default function Route() {
  return <SaUmrHijriSafha />;
}
