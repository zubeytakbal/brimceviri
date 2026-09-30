import { CihazSayfasi, cihazMeta } from "../components/cihaz/CihazSayfalari";

export const metadata = cihazMeta("ekran-kaydi");

export default function Page() {
  return <CihazSayfasi anahtar="ekran-kaydi" />;
}
