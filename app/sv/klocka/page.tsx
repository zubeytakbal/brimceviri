import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("clock", "sv");

export default function Route() {
  return <NordicTimeToolPage tool="clock" locale="sv" />;
}
