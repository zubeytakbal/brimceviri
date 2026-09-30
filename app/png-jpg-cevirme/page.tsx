import {
  GorselCiftSayfasi,
  gorselCiftMeta,
} from "../components/gorsel/GorselSayfalar";
import { findGorselCift } from "../converter/gorsel/ciftler";

const cift = findGorselCift("png-jpg-cevirme")!;

export const metadata = gorselCiftMeta(cift);

export default function Page() {
  return <GorselCiftSayfasi cift={cift} />;
}
