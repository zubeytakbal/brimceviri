import {
  PdfSifreKaldirSayfasi,
  pdfSifreKaldirMeta,
} from "../components/pdf/PdfSayfalari";

export const metadata = pdfSifreKaldirMeta();

export default function Page() {
  return <PdfSifreKaldirSayfasi />;
}
