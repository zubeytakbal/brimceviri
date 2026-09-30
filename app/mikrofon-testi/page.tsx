import { CihazSayfasi, cihazMeta } from "../components/cihaz/CihazSayfalari";

export const metadata = cihazMeta("mikrofon-testi");

export default function Page() {
  return <CihazSayfasi anahtar="mikrofon-testi" />;
}
