import { CihazSayfasi, cihazMeta } from "../components/cihaz/CihazSayfalari";

export const metadata = cihazMeta("klavye-testi");

export default function Page() {
  return <CihazSayfasi anahtar="klavye-testi" />;
}
