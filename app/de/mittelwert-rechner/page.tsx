import GermanMathToolPage, { germanMathMetadata } from "../../components/de/GermanMathToolPage";
import { MittelwertRechner } from "../../components/de/GermanSchoolMathTools";

export const metadata = germanMathMetadata("mittelwert");

export default function Page() {
  return <GermanMathToolPage pageKey="mittelwert" tool={<MittelwertRechner />} />;
}
