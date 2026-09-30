import {
  MetinTaniSayfasi,
  ocrMeta,
} from "../components/gorsel/MetinTaniSayfasi";

export const metadata = ocrMeta();

export default function Page() {
  return <MetinTaniSayfasi />;
}
