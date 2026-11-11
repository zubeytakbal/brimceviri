import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PipeFlowCalculator from "../components/PipeFlowCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import EngineeringNextSteps from "../components/engineering/EngineeringNextSteps";
import { ENGINEERING_FLOWS } from "../converter/engineeringFlows";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Boru çapı nasıl hesaplanır?",
    answer:
      "Boru çapı, süreklilik denklemi (Q = A×v) kullanılarak debi (Q) ve istenen akış hızından (v) hesaplanır: D = √(4Q/(π×v)). Bu formül basınçlı su/sıvı hatları için geçerlidir.",
  },
  {
    question: "Su hatlarında tavsiye edilen akış hızı nedir?",
    answer:
      "İçme suyu şebekelerinde tavsiye edilen akış hızı genelde 0,5-2,5 m/s aralığındadır. Çok düşük hız çökelmeye, çok yüksek hız aşınma ve gürültüye yol açabilir.",
  },
];

export const metadata: Metadata = {
  title: "Boru Çapı, Debi ve Akış Hızı Hesaplama",
  description:
    "Süreklilik denklemiyle (Q=A×v) boru çapı, debi veya akış hızından istediğini hesapla. Basınçlı su/sıvı hatları için.",
  alternates: { canonical: "/boru-capi-hesaplama" },
  openGraph: {
    title: "Boru Çapı, Debi ve Akış Hızı Hesaplama",
    description: "Boru çapı, debi ve akış hızı hesaplayın.",
    url: buildSiteUrl("/boru-capi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function PipeFlowPage() {

  return (
    <AracSayfasi
      yol="/boru-capi-hesaplama"
      baslik="Boru Çapı, Debi ve Akış Hızı Hesaplama"
      hesap={<PipeFlowCalculator />}
      serbestIcindekiler={[{"id":"sik-sorulan-sorular","baslik":"Sık Sorulan Sorular"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="sik-sorulan-sorular">Sık Sorulan Sorular</h2>
          <p>
            <strong>Boru çapı nasıl hesaplanır?</strong>
            <br />
            Boru çapı, süreklilik denklemi (Q = A×v) kullanılarak
            debi (Q) ve istenen akış hızından (v) hesaplanır: D =
            √(4Q/(π×v)). Bu formül basınçlı su/sıvı hatları için
            geçerlidir.
          </p>
          <p>
            <strong>Su hatlarında tavsiye edilen akış hızı nedir?</strong>
            <br />
            İçme suyu şebekelerinde tavsiye edilen akış hızı genelde
            0,5-2,5 m/s aralığındadır. Çok düşük hız çökelmeye, çok
            yüksek hız aşınma ve gürültüye yol açabilir.
          </p>
          <EngineeringNextSteps links={ENGINEERING_FLOWS["/boru-capi-hesaplama"]} />
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Boru hattındaki basınç kaybı için{" "}
            <Link href="/basinc-kaybi-hesaplama">Basınç Kaybı Hesaplama</Link>,
            diğer tesisatçı araçları için{" "}
            <Link href="/hesaplayicilar#teknik">Teknik ve Mühendislik</Link>{" "}
            sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Formül, akışkanlar mekaniğinde temel süreklilik
            denklemine dayanır. Doğalgaz iç tesisatı gibi basınç
            kaybı ve gaz yoğunluğuna bağlı hesaplar TS 7363
            standardına göre ayrıca yapılmalıdır.
          </p>
        </>
      }
    />
  );
}
