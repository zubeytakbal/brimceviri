import PlumbingPage, { plumbingMetadata } from "../components/engineering/PlumbingPages";

export const metadata = plumbingMetadata("boiler");

export default function Page() {
  return <PlumbingPage kind="boiler" />;
}
