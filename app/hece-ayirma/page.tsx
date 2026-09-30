import { TurkceSayfasi, turkceMeta } from "../components/metin/TurkceSayfalari";

export const metadata = turkceMeta("hece-ayirma");

export default function Page() {
  return <TurkceSayfasi anahtar="hece-ayirma" />;
}
