import { TurkceSayfasi, turkceMeta } from "../components/metin/TurkceSayfalari";

export const metadata = turkceMeta("turkce-karakter-duzeltme");

export default function Page() {
  return <TurkceSayfasi anahtar="turkce-karakter-duzeltme" />;
}
