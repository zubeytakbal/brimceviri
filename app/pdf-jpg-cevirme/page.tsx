import { PdfJpgSayfasi, pdfJpgMeta } from "../components/pdf/PdfSayfalari";

export const metadata = pdfJpgMeta();

export default function Page() {
  return <PdfJpgSayfasi />;
}
