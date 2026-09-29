import type { Metadata } from "next";
import { DeBesondereTageHub } from "../../components/takvim/DeKalenderSeiten";
import { deKalenderMetadata } from "../../components/takvim/takvimMeta";

// Restlaufzeiten ändern sich täglich.
export const revalidate = 21600;

export const metadata: Metadata = deKalenderMetadata("/de/besondere-tage", {
  title: "Besondere Tage: Feiertage, Feste und Gedenktage in Deutschland",
  short: "Besondere Tage in Deutschland",
  description:
    "Wann ist Ostern, Rosenmontag, Muttertag oder der erste Advent? Alle Feiertage, Feste, Aktions- und Gedenktage, Lostage und die Zeitumstellung mit Datum und Tagen bis dahin.",
});

export default function Route() {
  return <DeBesondereTageHub />;
}
