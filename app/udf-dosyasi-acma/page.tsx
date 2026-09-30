import { BelgeSayfasi, belgeMeta } from "../components/belge/BelgeSayfalari";

export const metadata = belgeMeta("udf-dosyasi-acma");

export default function Page() {
  return <BelgeSayfasi anahtar="udf-dosyasi-acma" />;
}
