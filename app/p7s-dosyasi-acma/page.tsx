import { BelgeSayfasi, belgeMeta } from "../components/belge/BelgeSayfalari";

export const metadata = belgeMeta("p7s-dosyasi-acma");

export default function Page() {
  return <BelgeSayfasi anahtar="p7s-dosyasi-acma" />;
}
