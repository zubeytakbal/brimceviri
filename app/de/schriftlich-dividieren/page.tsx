import GermanMathToolPage, { germanMathMetadata } from "../../components/de/GermanMathToolPage";
import { SchriftlicheDivision } from "../../components/de/GermanSchoolMathTools";

export const metadata = germanMathMetadata("division");

export default function Page() {
  return <GermanMathToolPage pageKey="division" tool={<SchriftlicheDivision />} />;
}
