import type { Metadata } from "next";
import FirtinaTakvimiSayfasi from "../components/takvim/FirtinaTakvimiSayfasi";
import { takvimMetadata } from "../components/takvim/takvimMeta";

// "Siradaki firtina" ve halk takvimi gunu icin gunde birkac kez yenilenir.
export const revalidate = 21600;

export const metadata: Metadata = takvimMetadata("/firtina-takvimi", {
  title: "Fırtına Takvimi: Sıradaki Fırtına ve Halk Takvimi",
  short: "Fırtına Takvimi",
  description:
    "Fırtına takvimi (Kocakarı takvimi): sıradaki fırtına, yıl boyu tüm fırtınalar, Kasım ve Hızır günleri, Erbain ve Hamsin sayacı, cemre tarihleri.",
});

export default function FirtinaTakvimiRoute() {
  return <FirtinaTakvimiSayfasi />;
}
