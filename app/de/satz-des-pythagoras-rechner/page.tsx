import GermanMathToolPage, { germanMathMetadata } from "../../components/de/GermanMathToolPage";
import { PythagorasRechner } from "../../components/de/GermanSchoolMathTools";

export const metadata = germanMathMetadata("pythagoras");

export default function Page() {
  return <GermanMathToolPage pageKey="pythagoras" tool={<PythagorasRechner />} />;
}
