import GermanMathToolPage, { germanMathMetadata } from "../../components/de/GermanMathToolPage";
import { WurzelRechner } from "../../components/de/GermanSchoolMathTools";

export const metadata = germanMathMetadata("wurzel");

export default function Page() {
  return <GermanMathToolPage pageKey="wurzel" tool={<WurzelRechner />} />;
}
