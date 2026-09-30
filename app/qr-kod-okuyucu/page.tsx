import { MetinSayfasi, metinMeta } from "../components/metin/MetinSayfalari";

export const metadata = metinMeta("qr-kod-okuyucu");

export default function Page() {
  return <MetinSayfasi anahtar="qr-kod-okuyucu" />;
}
