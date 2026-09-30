import { BelgeSayfasi, belgeMeta } from "../components/belge/BelgeSayfalari";

export const metadata = belgeMeta("xml-fatura-pdf-cevirme");

export default function Page() {
  return <BelgeSayfasi anahtar="xml-fatura-pdf-cevirme" />;
}
