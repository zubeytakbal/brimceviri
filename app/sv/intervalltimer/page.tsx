import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("interval", "sv");

export default function Route() {
  return <NordicTimeToolPage tool="interval" locale="sv" />;
}
