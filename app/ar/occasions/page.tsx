import type { Metadata } from "next";
import { SaMunasabatHub } from "../../components/takvim/SaSafahat";
import { saMetadata } from "../../components/takvim/takvimMeta";

// الأيام المتبقية تتغير يوميًا.
export const revalidate = 21600;

export const metadata: Metadata = saMetadata("/ar/occasions", {
  title: "المناسبات والإجازات الرسمية في السعودية ومواعيدها",
  short: "المناسبات والإجازات الرسمية",
  description:
    "متى رمضان وعيد الفطر وعيد الأضحى ويوم التأسيس واليوم الوطني؟ مواعيد المناسبات والإجازات الرسمية في السعودية وكم باقي عليها.",
});

export default function Route() {
  return <SaMunasabatHub />;
}
