import { VeriSayfasi, veriMeta } from "../components/veri/VeriSayfalari";

export const metadata = veriMeta("csv-excel-cevirme");

export default function Page() {
  return <VeriSayfasi anahtar="csv-excel-cevirme" />;
}
