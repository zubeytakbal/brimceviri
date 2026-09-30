import { CihazSayfasi, cihazMeta } from "../components/cihaz/CihazSayfalari";

export const metadata = cihazMeta("kamera-testi");

export default function Page() {
  return <CihazSayfasi anahtar="kamera-testi" />;
}
