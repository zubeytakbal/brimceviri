import { BelgeSayfasi, belgeMeta } from "../components/belge/BelgeSayfalari";

export const metadata = belgeMeta("udf-pdf-cevirme");

export default function Page() {
  return <BelgeSayfasi anahtar="udf-pdf-cevirme" />;
}
