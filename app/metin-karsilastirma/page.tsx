import { MetinSayfasi, metinMeta } from "../components/metin/MetinSayfalari";

export const metadata = metinMeta("metin-karsilastirma");

export default function Page() {
  return <MetinSayfasi anahtar="metin-karsilastirma" />;
}
