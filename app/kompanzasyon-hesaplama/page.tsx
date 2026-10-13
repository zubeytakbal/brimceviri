import ElectricalFluidPage, { efMetadata } from "../components/engineering/ElectricalFluidPages";

export const metadata = efMetadata("compensation");

export default function Page() {
  return <ElectricalFluidPage kind="compensation" />;
}
