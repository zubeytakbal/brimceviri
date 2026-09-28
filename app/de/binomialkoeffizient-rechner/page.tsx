import GermanMathToolPage, { germanMathMetadata } from "../../components/de/GermanMathToolPage";
import { BinomialRechner } from "../../components/de/GermanSchoolMathTools";

export const metadata = germanMathMetadata("binomial");

export default function Page() {
  return <GermanMathToolPage pageKey="binomial" tool={<BinomialRechner />} />;
}
