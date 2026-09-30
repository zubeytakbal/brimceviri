import { AgSayfasi, agMeta } from "../components/ag/AgSayfalari";

export const metadata = agMeta("sha256-hesaplama");

export default function Page() {
  return <AgSayfasi anahtar="sha256-hesaplama" />;
}
