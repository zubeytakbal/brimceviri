import NordicTimeZonePage, { nordicTimeZoneMetadata } from "../../components/world/NordicTimeZonePage";

// Tabellen följer årets sommartid; sidan byggs om dagligen.
export const revalidate = 86400;

export const metadata = nordicTimeZoneMetadata("no");

export default function Route() {
  return <NordicTimeZonePage locale="no" />;
}
