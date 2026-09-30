import { VeriSayfasi, veriMeta } from "../components/veri/VeriSayfalari";

export const metadata = veriMeta("json-duzenleyici");

export default function Page() {
  return <VeriSayfasi anahtar="json-duzenleyici" />;
}
