import MetalWeightPage, { metalWeightMetadata } from "../components/metal/MetalWeightPage";

export const metadata = metalWeightMetadata("pipe");

export default function Page() {
  return <MetalWeightPage kind="pipe" />;
}
