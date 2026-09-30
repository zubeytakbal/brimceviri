import { TurkceSayfasi, turkceMeta } from "../components/metin/TurkceSayfalari";

export const metadata = turkceMeta("vergi-no-dogrulama");

export default function Page() {
  return <TurkceSayfasi anahtar="vergi-no-dogrulama" />;
}
