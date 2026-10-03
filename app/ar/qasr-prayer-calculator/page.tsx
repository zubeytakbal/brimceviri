import { qasrMetadata, QasrPage } from "../../components/dini/ArabicIslamicPages";

// التاريخ الافتراضي (اليوم) يتغير يوميًا.
export const revalidate = 21600;

export const generateMetadata = qasrMetadata;

export default function Route() {
  return <QasrPage />;
}
