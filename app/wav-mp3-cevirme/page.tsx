import {
  SesCiftSayfasi,
  sesCiftBul,
  sesCiftMeta,
} from "../components/ses/SesSayfalari";

const cift = sesCiftBul("wav-mp3-cevirme");

export const metadata = sesCiftMeta(cift);

export default function Page() {
  return <SesCiftSayfasi cift={cift} />;
}
