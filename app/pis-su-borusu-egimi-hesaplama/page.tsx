import PlumbingPage, { plumbingMetadata } from "../components/engineering/PlumbingPages";

export const metadata = plumbingMetadata("drain");

export default function Page() {
  return <PlumbingPage kind="drain" />;
}
