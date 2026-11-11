import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PressureLossCalculator from "../components/PressureLossCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import EngineeringNextSteps from "../components/engineering/EngineeringNextSteps";
import { ENGINEERING_FLOWS } from "../converter/engineeringFlows";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Basınç kaybı (yük kaybı) nasıl hesaplanır?",
    answer:
      "Basınçlı su hatlarında sürtünme kaynaklı basınç kaybı Hazen-Williams formülüyle hesaplanır: hf = 10,67×L×Q^1,852 / (C^1,852×D^4,87). L boru uzunluğu, Q debi, D çap, C ise boru malzemesine bağlı pürüzlülük katsayısıdır.",
  },
  {
    question: "Hazen-Williams C katsayısı nedir?",
    answer:
      "C, borunun iç yüzey pürüzlülüğünü temsil eden, malzemeye göre değişen bir sabittir. Pürüzsüz malzemeler (PVC, bakır) yüksek C değerine, paslı/eski çelik borular düşük C değerine sahiptir.",
  },
];

export const metadata: Metadata = {
  title: "Basınç Kaybı Hesaplama (Hazen-Williams)",
  description:
    "Boru uzunluğu, çapı, debi ve malzeme katsayısından Hazen-Williams formülüyle basınçlı hatlardaki yük/basınç kaybını hesapla.",
  alternates: { canonical: "/basinc-kaybi-hesaplama" },
  openGraph: {
    title: "Basınç Kaybı Hesaplama (Hazen-Williams)",
    description: "Basınçlı hatlardaki yük/basınç kaybını hesaplayın.",
    url: buildSiteUrl("/basinc-kaybi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function PressureLossPage() {

  return (
    <AracSayfasi
      yol="/basinc-kaybi-hesaplama"
      baslik="Basınç Kaybı Hesaplama (Hazen-Williams)"
      hesap={<PressureLossCalculator />}
      serbestIcindekiler={[{"id":"sik-sorulan-sorular","baslik":"Sık Sorulan Sorular"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="sik-sorulan-sorular">Sık Sorulan Sorular</h2>
          <p>
            <strong>Basınç kaybı (yük kaybı) nasıl hesaplanır?</strong>
            <br />
            Basınçlı su hatlarında sürtünme kaynaklı basınç kaybı
            Hazen-Williams formülüyle hesaplanır: hf =
            10,67×L×Q^1,852 / (C^1,852×D^4,87).
          </p>
          <p>
            <strong>Hazen-Williams C katsayısı nedir?</strong>
            <br />
            C, borunun iç yüzey pürüzlülüğünü temsil eden, malzemeye
            göre değişen bir sabittir. Pürüzsüz malzemeler (PVC,
            bakır) yüksek C değerine, paslı/eski çelik borular düşük
            C değerine sahiptir.
          </p>
          <EngineeringNextSteps links={ENGINEERING_FLOWS["/basinc-kaybi-hesaplama"]} />
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Boru çapı, debi ve akış hızı için{" "}
            <Link href="/boru-capi-hesaplama">Boru Çapı Hesaplama</Link>,
            diğer tesisatçı araçları için{" "}
            <Link href="/hesaplayicilar#teknik">Teknik ve Mühendislik</Link>{" "}
            sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Hazen-Williams formülü, 1902&apos;den beri basınçlı su
            hatlarında yaygın kullanılan ampirik bir mühendislik
            formülüdür ve türbülanslı su akışı için geçerlidir; gaz
            veya yüksek viskoziteli sıvılar için kullanılmaz.
          </p>
        </>
      }
    />
  );
}
