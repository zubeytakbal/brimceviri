import {
  PdfFiligranSayfasi,
  pdfFiligranMeta,
} from "../components/pdf/PdfSayfalari";

export const metadata = pdfFiligranMeta();

export default function Page() {
  return <PdfFiligranSayfasi />;
}
