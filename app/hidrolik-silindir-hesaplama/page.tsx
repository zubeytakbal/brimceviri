import ElectricalFluidPage, { efMetadata } from "../components/engineering/ElectricalFluidPages";

export const metadata = efMetadata("hydraulic");

export default function Page() {
  return <ElectricalFluidPage kind="hydraulic" />;
}
