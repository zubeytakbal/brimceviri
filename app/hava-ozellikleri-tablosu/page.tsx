import FluidPage, { fluidMetadata } from "../components/engineering/FluidPages";

export const metadata = fluidMetadata("air");

export default function Page() {
  return <FluidPage kind="air" />;
}
