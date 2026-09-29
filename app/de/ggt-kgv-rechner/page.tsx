import GermanMathToolPage, { germanMathMetadata } from "../../components/de/GermanMathToolPage";
import { GgtKgvRechner } from "../../components/de/GermanSchoolMathTools";

export const metadata = germanMathMetadata("ggtKgv");

export default function Page() {
  return <GermanMathToolPage pageKey="ggtKgv" tool={<GgtKgvRechner />} />;
}
