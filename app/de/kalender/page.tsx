import type { Metadata } from "next";
import { DeKalenderHub } from "../../components/takvim/DeKalenderSeiten";
import { deKalenderMetadata } from "../../components/takvim/takvimMeta";
import { todayBerlin } from "../../converter/time/germanDates";

// „Heute“ und die nächsten Termine ändern sich täglich.
export const revalidate = 21600;

export function generateMetadata(): Metadata {
  const y = todayBerlin().year;
  return deKalenderMetadata("/de/kalender", {
    title: `Kalender ${y} mit Feiertagen und Kalenderwochen`,
    short: `Kalender ${y} mit Feiertagen`,
    description: `Kalender ${y} für Deutschland: heutiges Datum und KW, Feiertage für jedes Bundesland, Karneval, Ostern, Advent, Zeitumstellung, Bauernregeln und besondere Tage – jeder Monat von 1900 bis 2100.`,
  });
}

export default function Route() {
  return <DeKalenderHub />;
}
