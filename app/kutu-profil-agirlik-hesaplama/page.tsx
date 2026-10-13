import MetalWeightPage, { metalWeightMetadata } from "../components/metal/MetalWeightPage";

export const metadata = metalWeightMetadata("box");

export default function Page() {
  return <MetalWeightPage kind="box" />;
}
