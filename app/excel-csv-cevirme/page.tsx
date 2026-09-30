import { VeriSayfasi, veriMeta } from "../components/veri/VeriSayfalari";

export const metadata = veriMeta("excel-csv-cevirme");

export default function Page() {
  return <VeriSayfasi anahtar="excel-csv-cevirme" />;
}
