import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("stopwatch", "no");

export default function Route() {
  return <NordicTimeToolPage tool="stopwatch" locale="no" />;
}
