import { BelgeSayfasi, belgeMeta } from "../components/belge/BelgeSayfalari";

export const metadata = belgeMeta("udf-word-cevirme");

export default function Page() {
  return <BelgeSayfasi anahtar="udf-word-cevirme" />;
}
