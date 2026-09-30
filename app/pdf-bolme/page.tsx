import { PdfBolSayfasi, pdfBolMeta } from "../components/pdf/PdfSayfalari";

export const metadata = pdfBolMeta();

export default function Page() {
  return <PdfBolSayfasi />;
}
