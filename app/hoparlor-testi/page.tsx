import { CihazSayfasi, cihazMeta } from "../components/cihaz/CihazSayfalari";

export const metadata = cihazMeta("hoparlor-testi");

export default function Page() {
  return <CihazSayfasi anahtar="hoparlor-testi" />;
}
