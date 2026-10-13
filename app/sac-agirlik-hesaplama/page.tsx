import MetalWeightPage, { metalWeightMetadata } from "../components/metal/MetalWeightPage";

export const metadata = metalWeightMetadata("plate");

export default function Page() {
  return <MetalWeightPage kind="plate" />;
}
