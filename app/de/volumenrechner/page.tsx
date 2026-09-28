import GermanMathToolPage, { germanMathMetadata } from "../../components/de/GermanMathToolPage";
import { VolumenRechner } from "../../components/de/GermanSchoolMathTools";

export const metadata = germanMathMetadata("volumen");

export default function Page() {
  return <GermanMathToolPage pageKey="volumen" tool={<VolumenRechner />} />;
}
