import NordicFuelPage, { nordicFuelMetadata } from "../../components/fuel/NordicFuelPage";

export const metadata = nordicFuelMetadata("no");

export default function Route() {
  return <NordicFuelPage locale="no" />;
}
