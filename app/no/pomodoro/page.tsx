import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("pomodoro", "no");

export default function Route() {
  return <NordicTimeToolPage tool="pomodoro" locale="no" />;
}
