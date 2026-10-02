import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("alarm", "no");

export default function Route() {
  return <NordicTimeToolPage tool="alarm" locale="no" />;
}
