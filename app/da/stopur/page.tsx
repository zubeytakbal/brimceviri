import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("stopwatch", "da");

export default function Route() {
  return <NordicTimeToolPage tool="stopwatch" locale="da" />;
}
