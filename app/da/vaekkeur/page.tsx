import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("alarm", "da");

export default function Route() {
  return <NordicTimeToolPage tool="alarm" locale="da" />;
}
