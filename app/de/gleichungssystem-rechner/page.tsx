import GermanMathToolPage, { germanMathMetadata } from "../../components/de/GermanMathToolPage";
import { GleichungssystemRechner } from "../../components/de/GermanSchoolMathTools";

export const metadata = germanMathMetadata("lgs");

export default function Page() {
  return <GermanMathToolPage pageKey="lgs" tool={<GleichungssystemRechner />} />;
}
