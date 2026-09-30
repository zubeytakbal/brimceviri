import { ExifSayfasi, exifMeta } from "../components/gorsel/ExifSayfasi";

export const metadata = exifMeta();

export default function Page() {
  return <ExifSayfasi />;
}
