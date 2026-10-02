import NordicWorldClockPage, { nordicWorldClockMetadata } from "../../components/world/NordicWorldClockPage";

export const metadata = nordicWorldClockMetadata("sv");

export default function Route() {
  return <NordicWorldClockPage locale="sv" />;
}
