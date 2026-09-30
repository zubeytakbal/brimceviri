import {
  PdfSifreleSayfasi,
  pdfSifreleMeta,
} from "../components/pdf/PdfSayfalari";

export const metadata = pdfSifreleMeta();

export default function Page() {
  return <PdfSifreleSayfasi />;
}
