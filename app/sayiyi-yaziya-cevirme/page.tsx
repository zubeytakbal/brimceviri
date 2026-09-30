import { TurkceSayfasi, turkceMeta } from "../components/metin/TurkceSayfalari";

export const metadata = turkceMeta("sayiyi-yaziya-cevirme");

export default function Page() {
  return <TurkceSayfasi anahtar="sayiyi-yaziya-cevirme" />;
}
