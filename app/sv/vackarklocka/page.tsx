import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("alarm", "sv");

export default function Route() {
  return <NordicTimeToolPage tool="alarm" locale="sv" />;
}
