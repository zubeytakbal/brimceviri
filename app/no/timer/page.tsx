import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("timer", "no");

export default function Route() {
  return <NordicTimeToolPage tool="timer" locale="no" />;
}
