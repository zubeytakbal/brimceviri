import { BelgeSayfasi, belgeMeta } from "../components/belge/BelgeSayfalari";

export const metadata = belgeMeta("imz-dosyasi-acma");

export default function Page() {
  return <BelgeSayfasi anahtar="imz-dosyasi-acma" />;
}
