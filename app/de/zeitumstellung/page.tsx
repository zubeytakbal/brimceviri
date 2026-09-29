import type { Metadata } from "next";
import { ZeitumstellungSeite } from "../../components/takvim/DeZeitSeiten";
import { deKalenderMetadata } from "../../components/takvim/takvimMeta";
import { todayBerlin } from "../../converter/time/germanDates";

// Countdown bis zur nächsten Umstellung.
export const revalidate = 21600;

export function generateMetadata(): Metadata {
  const y = todayBerlin().year;
  return deKalenderMetadata("/de/zeitumstellung", {
    title: `Zeitumstellung ${y} und ${y + 1}: Wann wird die Uhr umgestellt?`,
    short: `Zeitumstellung ${y}/${y + 1}`,
    description: `Zeitumstellung ${y} und ${y + 1}: nächster Termin mit Countdown, Uhr vor oder zurück, alle Termine der Sommer- und Winterzeit bis 2035 und der Stand zur Abschaffung.`,
  });
}

export default function Route() {
  return <ZeitumstellungSeite />;
}
