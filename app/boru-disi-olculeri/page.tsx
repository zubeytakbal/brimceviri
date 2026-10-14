import MachinePage, { machineMetadata } from "../components/engineering/MachinePages";

export const metadata = machineMetadata("pipethread");

export default function Page() {
  return <MachinePage kind="pipethread" />;
}
