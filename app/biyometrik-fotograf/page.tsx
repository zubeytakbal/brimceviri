import {
  BiyometrikSayfasi,
  biyometrikMeta,
} from "../components/gorsel/BiyometrikSayfasi";

export const metadata = biyometrikMeta();

export default function Page() {
  return <BiyometrikSayfasi />;
}
