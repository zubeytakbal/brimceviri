import {
  PdfBirlestirSayfasi,
  pdfBirlestirMeta,
} from "../components/pdf/PdfSayfalari";

export const metadata = pdfBirlestirMeta();

export default function Page() {
  return <PdfBirlestirSayfasi />;
}
