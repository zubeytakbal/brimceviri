import { PdfMetinSayfasi, pdfMetinMeta } from "../components/pdf/PdfSayfalari";

export const metadata = pdfMetinMeta();

export default function Page() {
  return <PdfMetinSayfasi />;
}
