import ElectricalFluidPage, { efMetadata } from "../components/engineering/ElectricalFluidPages";

export const metadata = efMetadata("motorspeed");

export default function Page() {
  return <ElectricalFluidPage kind="motorspeed" />;
}
