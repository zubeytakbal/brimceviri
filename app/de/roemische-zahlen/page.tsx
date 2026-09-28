import GermanMathToolPage, { germanMathMetadata } from "../../components/de/GermanMathToolPage";
import { RoemischeZahlen } from "../../components/de/GermanSchoolMathTools";

export const metadata = germanMathMetadata("roemisch");

export default function Page() {
  return <GermanMathToolPage pageKey="roemisch" tool={<RoemischeZahlen />} />;
}
