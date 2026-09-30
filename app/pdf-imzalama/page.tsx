import { PdfImzaSayfasi, pdfImzaMeta } from "../components/pdf/PdfSayfalari";

export const metadata = pdfImzaMeta();

export default function Page() {
  return <PdfImzaSayfasi />;
}
