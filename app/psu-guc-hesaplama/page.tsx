import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PsuCalculator from "../components/PsuCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "PSU (güç kaynağı) gücü nasıl hesaplanır?",
    answer:
      "Önce sistemdeki tüm bileşenlerin (CPU, GPU, anakart, RAM, disk, fanlar) toplam güç tüketimi (W) toplanır. Ardından geçici yük sivrilmelerini ve PSU verimlilik eğrisini karşılamak için bu toplama %20-30 güvenlik payı eklenir.",
  },
  {
    question: "Neden güvenlik payı eklemeliyim?",
    answer:
      "Bileşenler kısa süreli olarak nominal güçlerinin üzerinde çekim yapabilir (özellikle GPU'lar). Ayrıca 80+ verimlilik sertifikalı PSU'lar, kapasitelerinin %50-60'ında kullanıldığında en verimli çalışır; tam kapasiteye yakın sürekli çalıştırmak PSU ömrünü kısaltabilir.",
  },
  {
    question: "CPU ve GPU TDP değerlerini nereden bulurum?",
    answer:
      "TDP (Thermal Design Power) değerleri, üreticinin (Intel, AMD, NVIDIA) ürün sayfasında veya kutu üzerinde belirtilir.",
  },
];

export const metadata: Metadata = {
  title: "PSU Güç Kaynağı Hesaplama (Watt)",
  description:
    "CPU, GPU ve diğer bileşenlerin gücünden (W), güvenlik payı dahil önerilen PSU (güç kaynağı) wattajını hesapla.",
  alternates: {
    canonical: "/psu-guc-hesaplama",
  },
  openGraph: {
    title: "PSU Güç Kaynağı Hesaplama (Watt)",
    description: "Bileşen güçlerinden önerilen PSU wattajını hesapla.",
    url: buildSiteUrl("/psu-guc-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function PsuCalculatorPage() {

  return (
    <AracSayfasi
      yol="/psu-guc-hesaplama"
      baslik="PSU Güç Kaynağı Hesaplama"
      hesap={<PsuCalculator />}
      sss={faqItems}
      serbestIcindekiler={[]}
      serbestIcerik={
        <>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Diğer bilgisayar donanımcısı araçları için{" "}
            <Link href="/hesaplayicilar#teknik">Teknik ve Mühendislik</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </>
      }
    />
  );
}
