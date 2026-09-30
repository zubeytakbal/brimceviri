import { TurkceSayfasi, turkceMeta } from "../components/metin/TurkceSayfalari";

export const metadata = turkceMeta("turkce-karakter-kaldirma");

export default function Page() {
  return <TurkceSayfasi anahtar="turkce-karakter-kaldirma" />;
}
