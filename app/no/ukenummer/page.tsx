import NordicWeekNumberPage, { nordicWeekMetadata } from "../../components/dates/NordicWeekNumberPage";

// Güncel hafta her gün değişir; site her gece yeniden derlenir.
export const revalidate = 21600;

export function generateMetadata() {
  return nordicWeekMetadata("no");
}

export default function Route() {
  return <NordicWeekNumberPage locale="no" />;
}
