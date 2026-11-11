import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AntennaLengthCalculator from "../components/AntennaLengthCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Dipol anten uzunluğu nasıl hesaplanır?",
    answer:
      "Yarım dalga dipol anten uzunluğu (metre) = 142,5 / Frekans (MHz) formülüyle hesaplanır. Bu formül, uç etkisini (end effect) hesaba katan pratik bir katsayı içerir.",
  },
  {
    question: "Çeyrek dalga vertikal anten uzunluğu nasıl hesaplanır?",
    answer:
      "Çeyrek dalga vertikal anten, yarım dalga dipolün yarısı kadardır: Uzunluk (metre) = 71,25 / Frekans (MHz).",
  },
  {
    question: "Tam dalga boyu ile pratik anten uzunluğu neden farklı?",
    answer:
      "Tam dalga boyu (λ = 300/f), serbest uzaydaki teorik değerdir. Gerçek bir antende iletkenin kalınlığı ve uçlardaki kapasitif etki (end effect) nedeniyle, pratik anten uzunluğu teorik değerden biraz kısadır; bu yüzden 142,5 ve 71,25 gibi düzeltilmiş katsayılar kullanılır.",
  },
];

export const metadata: Metadata = {
  title: "Anten Uzunluğu Hesaplama (Dipol / Vertikal)",
  description:
    "Frekanstan (MHz) yarım dalga dipol ve çeyrek dalga vertikal anten uzunluğunu hesapla; ya da elindeki anten uzunluğundan rezonans frekansını bul.",
  alternates: {
    canonical: "/anten-uzunlugu-hesaplama",
  },
  openGraph: {
    title: "Anten Uzunluğu Hesaplama (Dipol / Vertikal)",
    description: "Frekanstan anten uzunluğu hesapla.",
    url: buildSiteUrl("/anten-uzunlugu-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function AntennaLengthCalculatorPage() {

  return (
    <AracSayfasi
      yol="/anten-uzunlugu-hesaplama"
      baslik="Anten Uzunluğu Hesaplama"
      hesap={<AntennaLengthCalculator />}
      sss={faqItems}
      serbestIcindekiler={[{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Diğer amatör telsiz araçları için{" "}
            <Link href="/hesaplayicilar#teknik">Teknik ve Mühendislik</Link>
            {" "}sayfasına, Hz/kHz/MHz frekans dönüşümleri için{" "}
            <Link href="/kategoriler/frekans">Frekans Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Formüller, amatör telsizcilikte yaygın kullanılan pratik
            anten uzunluğu bağıntılarına dayanır. Gerçek performans
            için anten analizörü ile SWR ölçümü önerilir.
          </p>
        </>
      }
    />
  );
}
