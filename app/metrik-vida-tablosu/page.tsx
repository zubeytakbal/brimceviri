import MachinePage, { machineMetadata } from "../components/engineering/MachinePages";

export const metadata = machineMetadata("thread");

export default function Page() {
  return <MachinePage kind="thread" />;
}
