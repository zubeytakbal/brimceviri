import type { Metadata } from "next";
import { BauernregelnSeite } from "../../components/takvim/DeZeitSeiten";
import { deKalenderMetadata } from "../../components/takvim/takvimMeta";

// Heutiger bzw. nächster Lostag.
export const revalidate = 21600;

export const metadata: Metadata = deKalenderMetadata("/de/bauernregeln", {
  title: "Bauernregeln und Lostage: Kalender mit Wetterregeln",
  short: "Bauernregeln und Lostage",
  description:
    "Bauernregel des Tages und alle wichtigen Lostage im Jahr: Lichtmess, Eisheiligen, Schafskälte, Siebenschläfer, Hundstage, Michaeli, Martini – mit Erklärung, was dran ist.",
});

export default function Route() {
  return <BauernregelnSeite />;
}
