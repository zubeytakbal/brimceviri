import GermanMathToolPage, { germanMathMetadata } from "../../components/de/GermanMathToolPage";
import { QuadratischeGleichung } from "../../components/de/GermanSchoolMathTools";

export const metadata = germanMathMetadata("quadratisch");

export default function Page() {
  return <GermanMathToolPage pageKey="quadratisch" tool={<QuadratischeGleichung />} />;
}
