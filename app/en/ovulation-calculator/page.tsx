import CyclePage, { cycleMetadata } from "../../components/CyclePage";

export const metadata = cycleMetadata("en");

export default function Route() {
  return <CyclePage lang="en" />;
}
