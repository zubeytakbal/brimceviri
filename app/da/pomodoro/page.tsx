import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("pomodoro", "da");

export default function Route() {
  return <NordicTimeToolPage tool="pomodoro" locale="da" />;
}
