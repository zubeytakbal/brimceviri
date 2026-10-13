import ElectricalFluidPage, { efMetadata } from "../components/engineering/ElectricalFluidPages";

export const metadata = efMetadata("colorcode");

export default function Page() {
  return <ElectricalFluidPage kind="colorcode" />;
}
