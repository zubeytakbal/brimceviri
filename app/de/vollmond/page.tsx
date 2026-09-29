import type { Metadata } from "next";
import { VollmondSeite } from "../../components/takvim/DeZeitSeiten";
import { deKalenderMetadata } from "../../components/takvim/takvimMeta";
import { todayBerlin } from "../../converter/time/germanDates";

// Nächster Vollmond und aktuelle Mondphase.
export const revalidate = 21600;

export function generateMetadata(): Metadata {
  const y = todayBerlin().year;
  return deKalenderMetadata("/de/vollmond", {
    title: `Vollmond ${y} und ${y + 1}: alle Termine mit Uhrzeit`,
    short: `Vollmond ${y}/${y + 1}`,
    description: `Wann ist Vollmond? Alle Vollmond- und Neumond-Termine ${y} und ${y + 1} mit Uhrzeit (MEZ/MESZ), nächster Vollmond mit Countdown und die Mondphase heute.`,
  });
}

export default function Route() {
  return <VollmondSeite />;
}
