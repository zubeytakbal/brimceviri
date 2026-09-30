import { JpgPdfSayfasi, jpgPdfMeta } from "../components/pdf/PdfSayfalari";

export const metadata = jpgPdfMeta();

export default function Page() {
  return <JpgPdfSayfasi />;
}
