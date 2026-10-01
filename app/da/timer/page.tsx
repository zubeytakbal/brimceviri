import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("timer", "da");

export default function Route() {
  return <NordicTimeToolPage tool="timer" locale="da" />;
}
