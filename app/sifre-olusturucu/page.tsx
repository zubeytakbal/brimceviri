import { MetinSayfasi, metinMeta } from "../components/metin/MetinSayfalari";

export const metadata = metinMeta("sifre-olusturucu");

export default function Page() {
  return <MetinSayfasi anahtar="sifre-olusturucu" />;
}
