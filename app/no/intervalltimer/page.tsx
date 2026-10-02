import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("interval", "no");

export default function Route() {
  return <NordicTimeToolPage tool="interval" locale="no" />;
}
