import NordicTimeToolPage, { nordicTimeMetadata } from "../../components/time/NordicTimeToolPage";

export const metadata = nordicTimeMetadata("clock", "da");

export default function Route() {
  return <NordicTimeToolPage tool="clock" locale="da" />;
}
