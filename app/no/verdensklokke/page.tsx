import NordicWorldClockPage, { nordicWorldClockMetadata } from "../../components/world/NordicWorldClockPage";

export const metadata = nordicWorldClockMetadata("no");

export default function Route() {
  return <NordicWorldClockPage locale="no" />;
}
