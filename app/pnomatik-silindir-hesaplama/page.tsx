import ElectricalFluidPage, { efMetadata } from "../components/engineering/ElectricalFluidPages";

export const metadata = efMetadata("pneumatic");

export default function Page() {
  return <ElectricalFluidPage kind="pneumatic" />;
}
