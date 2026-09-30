import { TurkceSayfasi, turkceMeta } from "../components/metin/TurkceSayfalari";

export const metadata = turkceMeta("tc-kimlik-no-dogrulama");

export default function Page() {
  return <TurkceSayfasi anahtar="tc-kimlik-no-dogrulama" />;
}
