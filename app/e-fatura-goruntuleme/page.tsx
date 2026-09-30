import { BelgeSayfasi, belgeMeta } from "../components/belge/BelgeSayfalari";

export const metadata = belgeMeta("e-fatura-goruntuleme");

export default function Page() {
  return <BelgeSayfasi anahtar="e-fatura-goruntuleme" />;
}
