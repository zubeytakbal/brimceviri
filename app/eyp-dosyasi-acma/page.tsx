import { BelgeSayfasi, belgeMeta } from "../components/belge/BelgeSayfalari";

export const metadata = belgeMeta("eyp-dosyasi-acma");

export default function Page() {
  return <BelgeSayfasi anahtar="eyp-dosyasi-acma" />;
}
