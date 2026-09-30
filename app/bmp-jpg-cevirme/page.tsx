import {
  KaynakCiftSayfasi,
  kaynakCiftBul,
  kaynakCiftMeta,
} from "../components/gorsel/KaynakCiftSayfasi";

const cift = kaynakCiftBul("bmp-jpg-cevirme");

export const metadata = kaynakCiftMeta(cift);

export default function Page() {
  return <KaynakCiftSayfasi cift={cift} />;
}
