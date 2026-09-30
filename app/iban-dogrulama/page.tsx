import { TurkceSayfasi, turkceMeta } from "../components/metin/TurkceSayfalari";

export const metadata = turkceMeta("iban-dogrulama");

export default function Page() {
  return <TurkceSayfasi anahtar="iban-dogrulama" />;
}
