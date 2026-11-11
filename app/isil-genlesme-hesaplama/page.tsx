import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ThermalExpansionCalculator from "../components/ThermalExpansionCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import EngineeringNextSteps from "../components/engineering/EngineeringNextSteps";
import { ENGINEERING_FLOWS } from "../converter/engineeringFlows";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Isıl genleşme (termal genleşme) nasıl hesaplanır?",
    answer:
      "ΔL = L₀ × α × ΔT formülüyle hesaplanır. L₀ başlangıç uzunluğu, α malzemenin ısıl genleşme katsayısı (×10⁻⁶/K), ΔT ise sıcaklık farkıdır (°C).",
  },
  {
    question: "Hangi malzeme en fazla ısıl genleşme gösterir?",
    answer:
      "Bu tablodaki malzemeler arasında kurşun (29×10⁻⁶/K) en yüksek genleşme katsayısına, cam (8,5×10⁻⁶/K) ise en düşük katsayıya sahiptir.",
  },
  {
    question: "Boru ve raylarda neden genleşme payı bırakılır?",
    answer:
      "Uzun metal boru veya raylar, mevsimsel sıcaklık farkında birkaç milimetreden birkaç santimetreye kadar uzayıp kısalabilir. Bu hareketi karşılamak için hatlara genleşme derzi veya esnek bağlantı elemanları eklenir.",
  },
];

export const metadata: Metadata = {
  title: "Isıl Genleşme Hesaplama (ΔL = L₀ × α × ΔT)",
  description:
    "Malzeme seç, başlangıç uzunluğu ve sıcaklık farkını gir: ısıl genleşme (uzama/kısalma) miktarını hesapla. Malzeme genleşme katsayıları tablosu dahil.",
  alternates: {
    canonical: "/isil-genlesme-hesaplama",
  },
  openGraph: {
    title: "Isıl Genleşme Hesaplama (ΔL = L₀ × α × ΔT)",
    description: "Malzeme ve sıcaklık farkından ısıl genleşme miktarını hesapla.",
    url: buildSiteUrl("/isil-genlesme-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function ThermalExpansionCalculatorPage() {

  return (
    <AracSayfasi
      yol="/isil-genlesme-hesaplama"
      baslik="Isıl Genleşme Hesaplama"
      hesap={<ThermalExpansionCalculator />}
      sss={faqItems}
      serbestIcindekiler={[{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <EngineeringNextSteps links={ENGINEERING_FLOWS["/isil-genlesme-hesaplama"]} />
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Tesisatçı işleri için{" "}
            <Link href="/hesaplayicilar#teknik">Teknik ve Mühendislik</Link>
            {" "}sayfasına, inşaat hesaplamaları için{" "}
            <Link href="/hesaplayicilar#ev-ve-yapi">Ev, İnşaat ve Bahçe</Link>
            {" "}sayfasına, malzeme yoğunluğu ve diğer özellikleri için{" "}
            <Link href="/malzeme-ozellikleri">Malzeme Özellikleri</Link>
            {" "}sayfasına, yük altında uzama miktarı için{" "}
            <Link href="/elastik-uzama-hesaplama">Elastik Uzama Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Formül ve katsayılar, malzeme biliminde standart kabul
            edilen doğrusal ısıl genleşme tanımına dayanır; alaşım
            ve sıcaklık aralığına göre gerçek değerler küçük farklar
            gösterebilir.
          </p>
        </>
      }
    />
  );
}
