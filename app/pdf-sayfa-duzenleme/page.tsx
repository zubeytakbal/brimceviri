import {
  PdfDuzenleSayfasi,
  pdfDuzenleMeta,
} from "../components/pdf/PdfSayfalari";

export const metadata = pdfDuzenleMeta();

export default function Page() {
  return <PdfDuzenleSayfasi />;
}
