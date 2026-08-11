import type { Metadata } from "next";
import HomeDirectory from "./components/HomeDirectory";

export const metadata: Metadata = {
  title: "İhtiyacınız olan birim dönüşümünü bulun",
  description:
    "Uzunluk, kütle ve basınç dönüşümlerini kategori bazında tarayın; ilgili hesaplayıcıyı, birim rehberini ve bilgi sayfasını doğrudan açın.",
  alternates: {
    canonical: "https://birimceviri.app",
    languages: {
      tr: "https://birimceviri.app",
      en: "https://birimceviri.app/en",
      "x-default": "https://birimceviri.app",
    },
  },
  openGraph: {
    title: "İhtiyacınız olan birim dönüşümünü bulun | BirimCeviri.app",
    description:
      "Kategori kartları, popüler hesaplayıcılar ve birim rehberleriyle doğru dönüşüm sayfasına hızlıca ulaşın.",
    url: "https://birimceviri.app",
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function Page() {
  return <HomeDirectory locale="tr" />;
}
