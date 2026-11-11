import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PipeNominalSizeCalculator from "../components/PipeNominalSizeCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import EngineeringNextSteps from "../components/engineering/EngineeringNextSteps";
import { ENGINEERING_FLOWS } from "../converter/engineeringFlows";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "DN ne demektir, gerçek dış çapa eşit midir?",
    answer:
      "DN (Diameter Nominal), EN ISO 6708 standardına göre borunun nominal yani isimsel çapını ifade eder — gerçek dış çapı doğrudan göstermez. Örneğin DN50 borunun gerçek dış çapı 60,3 mm'dir, 50 mm değil.",
  },
  {
    question: "NPS ile DN arasındaki fark nedir?",
    answer:
      "NPS (Nominal Pipe Size), Amerikan/ANSI sisteminde inç cinsinden nominal boyutu; DN ise Avrupa/EN ISO sisteminde milimetre cinsinden nominal çapı ifade eder. İkisi aynı boru boyutuna karşılık gelir (örneğin DN50 = NPS 2\"), ancak gerçek dış çap değerleri standarda göre (DIN/EN veya ASME/ANSI) birkaç milimetre farklılık gösterebilir.",
  },
  {
    question: "Neden DN65 (NPS 2 1/2) için iki farklı dış çap değeri var?",
    answer:
      "DN65/NPS 2½ borunun dış çapı DIN/EN standardında 76,1 mm iken, ASME/ANSI (Amerikan) standardında 73,0 mm'dir. Bu, yuvarlama hatası değil, iki farklı boru standardı arasındaki gerçek bir farktır; hangi standarda göre çalıştığınızı mutlaka teyit edin.",
  },
];

export const metadata: Metadata = {
  title: "Boru Çapı Dönüşüm Hesaplama (DN - NPS - mm)",
  description:
    "Nominal boru çapı (DN) seç: NPS (inç) karşılığını ve gerçek dış çapını (mm) gör. EN ISO 6708/DIN standardına göre boru çapı tablosu.",
  alternates: {
    canonical: "/boru-capi-donusum-hesaplama",
  },
  openGraph: {
    title: "Boru Çapı Dönüşüm Hesaplama (DN - NPS - mm)",
    description: "DN, NPS ve gerçek dış çap değerlerini birbirine dönüştür.",
    url: buildSiteUrl("/boru-capi-donusum-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function PipeNominalSizePage() {

  return (
    <AracSayfasi
      yol="/boru-capi-donusum-hesaplama"
      baslik="Boru Çapı Dönüşüm Hesaplama"
      hesap={<PipeNominalSizeCalculator />}
      sss={faqItems}
      serbestIcindekiler={[{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <EngineeringNextSteps links={ENGINEERING_FLOWS["/boru-capi-donusum-hesaplama"]} />
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Tesisatçı işleri için{" "}
            <Link href="/hesaplayicilar#teknik">Teknik ve Mühendislik</Link>
            {" "}sayfasına, genel uzunluk dönüşümleri için{" "}
            <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Dış çap değerleri EN ISO 6708/DIN standardına dayanır ve
            iki bağımsız kaynaktan (Esko Paslanmaz, Borsel Boru boru
            çapı tabloları) çapraz doğrulanmıştır.
          </p>
        </>
      }
    />
  );
}
