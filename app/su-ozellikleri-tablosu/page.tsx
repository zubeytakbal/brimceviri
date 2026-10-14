import FluidPage, { fluidMetadata } from "../components/engineering/FluidPages";

export const metadata = fluidMetadata("water");

export default function Page() {
  return <FluidPage kind="water" />;
}
