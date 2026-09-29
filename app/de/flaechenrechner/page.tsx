import GermanMathToolPage, { germanMathMetadata } from "../../components/de/GermanMathToolPage";
import { FlaechenRechner } from "../../components/de/GermanSchoolMathTools";

export const metadata = germanMathMetadata("area");

export default function Page() {
  return <GermanMathToolPage pageKey="area" tool={<FlaechenRechner />} />;
}
