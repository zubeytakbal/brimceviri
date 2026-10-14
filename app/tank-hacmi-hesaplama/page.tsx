import PlumbingPage, { plumbingMetadata } from "../components/engineering/PlumbingPages";

export const metadata = plumbingMetadata("tank");

export default function Page() {
  return <PlumbingPage kind="tank" />;
}
