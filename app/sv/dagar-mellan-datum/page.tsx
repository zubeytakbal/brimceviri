import NordicDaysPage, { nordicDaysMetadata } from "../../components/dates/NordicDaysPage";

// "Kaç gün kaldı" tablosu her gün değişir; site her gece yeniden derlenir.
export const revalidate = 21600;

export const metadata = nordicDaysMetadata("sv");

export default function Route() {
  return <NordicDaysPage locale="sv" />;
}
