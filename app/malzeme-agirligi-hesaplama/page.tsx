import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import MaterialWeightCalculator from "../components/MaterialWeightCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import EngineeringNextSteps from "../components/engineering/EngineeringNextSteps";
import { ENGINEERING_FLOWS } from "../converter/engineeringFlows";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Çeliğin yoğunluğu kaçtır?",
    answer:
      "Karbon çeliğinin yoğunluğu yaklaşık 7850 kg/m³'tür (7,85 g/cm³). Paslanmaz çelik türleri genelde 8000 kg/m³ civarındadır.",
  },
  {
    question: "Malzeme ağırlığı nasıl hesaplanır?",
    answer:
      "Ağırlık (kg) = Yoğunluk (kg/m³) × Hacim (m³). Küçük parçalarda hacim genelde cm³ cinsinden ölçülür; bu durumda Ağırlık (kg) = Yoğunluk (kg/m³) × Hacim (cm³) / 1.000.000.",
  },
  {
    question: "Alüminyumun yoğunluğu kaçtır?",
    answer:
      "Alüminyumun yoğunluğu yaklaşık 2700 kg/m³'tür (2,7 g/cm³); bu da onu çelikten (7850 kg/m³) yaklaşık 2,9 kat daha hafif yapar.",
  },
];

export const metadata: Metadata = {
  title: "Malzeme Yoğunlukları Tablosu ve Ağırlık Hesaplama",
  description:
    "Çelik, alüminyum, bakır gibi yaygın malzemelerin yoğunluk tablosundan, hacimden ağırlığı ya da ağırlıktan hacmi hesapla.",
  alternates: {
    canonical: "/malzeme-agirligi-hesaplama",
    languages: { de: "/de/materialgewicht-berechnen" },
  },
  openGraph: {
    title: "Malzeme Yoğunlukları Tablosu ve Ağırlık Hesaplama",
    description: "Yoğunluk tablosundan malzeme ağırlığı veya hacmi hesapla.",
    url: buildSiteUrl("/malzeme-agirligi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function MaterialWeightCalculatorPage() {

  return (
    <AracSayfasi
      yol="/malzeme-agirligi-hesaplama"
      baslik="Malzeme Yoğunlukları Tablosu ve Ağırlık Hesaplama"
      hesap={<MaterialWeightCalculator />}
      sss={faqItems}
      serbestIcindekiler={[{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <EngineeringNextSteps links={ENGINEERING_FLOWS["/malzeme-agirligi-hesaplama"]} />
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Kaynak işleri için{" "}
            <Link href="/hesaplayicilar#teknik">Teknik ve Mühendislik</Link>
            {" "}sayfasına, CNC/torna işleri için{" "}
            <Link href="/hesaplayicilar#teknik">Teknik ve Mühendislik</Link>
            {" "}sayfasına, kütle birimi dönüşümleri için{" "}
            <Link href="/kategoriler/kutle">Kütle Dönüşümleri</Link>
            {" "}sayfasına, 100&apos;den fazla malzemenin yoğunluğu ve
            diğer özellikleri için{" "}
            <Link href="/malzeme-ozellikleri">Malzeme Özellikleri</Link>
            {" "}sayfasına, iki malzemeyi yoğunluk açısından karşılaştırmak
            için{" "}
            <Link href="/malzeme-ozellikleri?v=aluminyum-celik-karsilastirma#hesapla">
              Malzeme Karşılaştırma
            </Link>
            {" "}sayfalarına bakabilirsin. Hazır şekilli ürünler için{" "}
            <Link href="/demir-agirlik-hesaplama">İnşaat Demiri</Link>,{" "}
            <Link href="/sac-agirlik-hesaplama">Sac</Link>,{" "}
            <Link href="/boru-agirlik-hesaplama">Boru</Link> ve{" "}
            <Link href="/kutu-profil-agirlik-hesaplama">Kutu Profil</Link>
            {" "}ağırlık hesaplayıcıları ölçüden doğrudan kg/m verir.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Yoğunluk değerleri, ~20°C için yaygın kabul gören genel
            mühendislik referans değerleridir; alaşım ve tür farklarına
            göre küçük sapmalar olabilir.
          </p>
        </>
      }
    />
  );
}
