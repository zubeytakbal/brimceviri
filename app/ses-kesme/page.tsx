import { SesKesmeSayfasi, sesKesmeMeta } from "../components/ses/SesSayfalari";

export const metadata = sesKesmeMeta();

export default function Page() {
  return <SesKesmeSayfasi />;
}
