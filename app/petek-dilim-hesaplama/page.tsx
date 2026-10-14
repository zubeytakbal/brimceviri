import PlumbingPage, { plumbingMetadata } from "../components/engineering/PlumbingPages";

export const metadata = plumbingMetadata("radiator");

export default function Page() {
  return <PlumbingPage kind="radiator" />;
}
