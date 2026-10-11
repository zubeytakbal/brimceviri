import NordicFuelPage, { nordicFuelMetadata } from "../../components/fuel/NordicFuelPage";

export const metadata = nordicFuelMetadata("sv");

export default function Route() {
  return <NordicFuelPage locale="sv" />;
}
