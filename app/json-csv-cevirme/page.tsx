import { VeriSayfasi, veriMeta } from "../components/veri/VeriSayfalari";

export const metadata = veriMeta("json-csv-cevirme");

export default function Page() {
  return <VeriSayfasi anahtar="json-csv-cevirme" />;
}
