import MechanicsPage, { mechanicsMetadata } from "../components/mechanics/MechanicsPage";

export const metadata = mechanicsMetadata("shaft");

export default function Page() {
  return <MechanicsPage kind="shaft" />;
}
