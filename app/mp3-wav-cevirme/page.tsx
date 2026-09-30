import {
  SesCiftSayfasi,
  sesCiftBul,
  sesCiftMeta,
} from "../components/ses/SesSayfalari";

const cift = sesCiftBul("mp3-wav-cevirme");

export const metadata = sesCiftMeta(cift);

export default function Page() {
  return <SesCiftSayfasi cift={cift} />;
}
