import GermanMathToolPage, { germanMathMetadata } from "../../components/de/GermanMathToolPage";
import { PrimfaktorRechner } from "../../components/de/GermanSchoolMathTools";

export const metadata = germanMathMetadata("primfaktor");

export default function Page() {
  return <GermanMathToolPage pageKey="primfaktor" tool={<PrimfaktorRechner />} />;
}
