import { aqiqahMetadata, AqiqahPage } from "../../components/dini/ArabicIslamicPages";

// التاريخ الافتراضي (اليوم) يتغير يوميًا.
export const revalidate = 21600;

export const generateMetadata = aqiqahMetadata;

export default function Route() {
  return <AqiqahPage />;
}
