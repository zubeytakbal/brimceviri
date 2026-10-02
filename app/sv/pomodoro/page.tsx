import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("pomodoro", "sv");

export default function Route() {
  return <NordicTimeToolPage tool="pomodoro" locale="sv" />;
}
