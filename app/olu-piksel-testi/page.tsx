import { CihazSayfasi, cihazMeta } from "../components/cihaz/CihazSayfalari";

export const metadata = cihazMeta("olu-piksel-testi");

export default function Page() {
  return <CihazSayfasi anahtar="olu-piksel-testi" />;
}
