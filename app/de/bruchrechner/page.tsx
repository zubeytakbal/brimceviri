import GermanMathToolPage, { germanMathMetadata } from "../../components/de/GermanMathToolPage";
import { BruchRechner } from "../../components/de/GermanSchoolMathTools";

export const metadata = germanMathMetadata("bruch");

export default function Page() {
  return <GermanMathToolPage pageKey="bruch" tool={<BruchRechner />} />;
}
