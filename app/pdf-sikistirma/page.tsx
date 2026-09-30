import {
  PdfSikistirSayfasi,
  pdfSikistirMeta,
} from "../components/pdf/PdfSayfalari";

export const metadata = pdfSikistirMeta();

export default function Page() {
  return <PdfSikistirSayfasi />;
}
