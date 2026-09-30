import {
  PdfNumaraSayfasi,
  pdfNumaraMeta,
} from "../components/pdf/PdfSayfalari";

export const metadata = pdfNumaraMeta();

export default function Page() {
  return <PdfNumaraSayfasi />;
}
