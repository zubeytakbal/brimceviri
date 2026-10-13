import MechanicsPage, { mechanicsMetadata } from "../components/mechanics/MechanicsPage";

export const metadata = mechanicsMetadata("section");

export default function Page() {
  return <MechanicsPage kind="section" />;
}
