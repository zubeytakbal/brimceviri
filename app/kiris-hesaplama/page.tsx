import MechanicsPage, { mechanicsMetadata } from "../components/mechanics/MechanicsPage";

export const metadata = mechanicsMetadata("beam");

export default function Page() {
  return <MechanicsPage kind="beam" />;
}
