import { iddahMetadata, IddahPage } from "../../components/dini/ArabicIslamicPages";

// التاريخ الافتراضي (اليوم) يتغير يوميًا.
export const revalidate = 21600;

export const generateMetadata = iddahMetadata;

export default function Route() {
  return <IddahPage />;
}
