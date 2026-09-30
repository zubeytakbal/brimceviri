import type { Metadata } from "next";
import { SaNihayatKhidmaSafha } from "../../components/takvim/SaNihayatKhidmaSafha";
import { saMetadata } from "../../components/takvim/takvimMeta";

// تاريخ الانتهاء الافتراضي (اليوم) يتغير يوميًا.
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return saMetadata("/ar/end-of-service-calculator", {
    title: "حساب مكافأة نهاية الخدمة وفق نظام العمل السعودي",
    short: "حساب مكافأة نهاية الخدمة",
    description:
      "حاسبة مكافأة نهاية الخدمة للقطاع الخاص في السعودية وفق المواد 84 و85 و87 من نظام العمل: نصف شهر عن السنوات الخمس الأولى، وحصة الاستقالة (الثلث أو الثلثان أو كاملة).",
  });
}

export default function Route() {
  return <SaNihayatKhidmaSafha />;
}
