import NordicWorldClockPage, { nordicWorldClockMetadata } from "../../components/world/NordicWorldClockPage";

export const metadata = nordicWorldClockMetadata("da");

export default function Route() {
  return <NordicWorldClockPage locale="da" />;
}
