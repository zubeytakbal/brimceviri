import { CihazSayfasi, cihazMeta } from "../components/cihaz/CihazSayfalari";

export const metadata = cihazMeta("fare-testi");

export default function Page() {
  return <CihazSayfasi anahtar="fare-testi" />;
}
