import type { Metadata } from "next";
import OkulTakvimiSayfasi from "../components/takvim/OkulTakvimiSayfasi";
import { takvimMetadata } from "../components/takvim/takvimMeta";

// Kalan gün sayıları için günde birkaç kez yenilenir.
export const revalidate = 21600;

export const metadata: Metadata = takvimMetadata("/okul-takvimi", {
  title: "Okul Takvimi 2026-2027: Ara Tatil, Karne ve Yarıyıl Tarihleri",
  short: "Okul Takvimi 2026-2027",
  description:
    "MEB 2026-2027 okul takvimi: okulların açılışı, ara tatiller, yarıyıl tatili ve karne günleri; ara tatile ve karneye kaç gün kaldı, kaç gün okul var.",
});

export default function OkulTakvimiRoute() {
  return <OkulTakvimiSayfasi />;
}
