import ElectricalFluidPage, { efMetadata } from "../components/engineering/ElectricalFluidPages";

export const metadata = efMetadata("kva");

export default function Page() {
  return <ElectricalFluidPage kind="kva" />;
}
