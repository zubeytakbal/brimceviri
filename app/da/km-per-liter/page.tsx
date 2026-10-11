import NordicFuelPage, { nordicFuelMetadata } from "../../components/fuel/NordicFuelPage";

export const metadata = nordicFuelMetadata("da");

export default function Route() {
  return <NordicFuelPage locale="da" />;
}
