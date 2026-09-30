import { VeriSayfasi, veriMeta } from "../components/veri/VeriSayfalari";

export const metadata = veriMeta("csv-json-cevirme");

export default function Page() {
  return <VeriSayfasi anahtar="csv-json-cevirme" />;
}
