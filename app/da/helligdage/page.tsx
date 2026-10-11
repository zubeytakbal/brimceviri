import NordicHolidayPage, { nordicHolidayMetadata } from "../../components/dates/NordicHolidayPage";

// Yıl ve "kaç gün kaldı" her gün değişir; site her gece yeniden derlenir.
export const revalidate = 21600;

export const metadata = nordicHolidayMetadata("da");

export default function Route() {
  return <NordicHolidayPage locale="da" />;
}
