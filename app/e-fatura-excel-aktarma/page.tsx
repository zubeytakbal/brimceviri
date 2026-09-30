import { BelgeSayfasi, belgeMeta } from "../components/belge/BelgeSayfalari";

export const metadata = belgeMeta("e-fatura-excel-aktarma");

export default function Page() {
  return <BelgeSayfasi anahtar="e-fatura-excel-aktarma" />;
}
