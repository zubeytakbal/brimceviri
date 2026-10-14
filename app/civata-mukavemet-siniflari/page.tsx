import MachinePage, { machineMetadata } from "../components/engineering/MachinePages";

export const metadata = machineMetadata("boltclass");

export default function Page() {
  return <MachinePage kind="boltclass" />;
}
