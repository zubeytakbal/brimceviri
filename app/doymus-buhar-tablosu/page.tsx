import FluidPage, { fluidMetadata } from "../components/engineering/FluidPages";

export const metadata = fluidMetadata("steam");

export default function Page() {
  return <FluidPage kind="steam" />;
}
