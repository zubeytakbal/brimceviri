import MetalWeightPage, { metalWeightMetadata } from "../components/metal/MetalWeightPage";

export const metadata = metalWeightMetadata("rebar");

export default function Page() {
  return <MetalWeightPage kind="rebar" />;
}
