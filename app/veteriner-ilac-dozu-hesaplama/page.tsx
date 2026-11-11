import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import VetDoseCalculator from "../components/VetDoseCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Bu araç bana doğru ilaç dozunu söyler mi?",
    answer:
      "Hayır. Bu araç yalnızca zaten belirlenmiş bir mg/kg doz değerini, hayvanın ağırlığı ve ilaç konsantrasyonuyla birlikte uygulanacak mL hacme çevirir. Hangi mg/kg dozunun uygun olduğunu belirlemez veya önermez — bu değer ilaca, türe ve hayvanın klinik durumuna göre değişir ve her zaman bir veteriner hekimden veya resmi ilaç prospektüsünden alınmalıdır.",
  },
  {
    question: "Toplam doz ve uygulanacak hacim nasıl hesaplanır?",
    answer:
      "Toplam Doz (mg) = Reçete Edilen Doz (mg/kg) × Hayvan Ağırlığı (kg). Uygulanacak Hacim (mL) = Toplam Doz (mg) ÷ İlaç Konsantrasyonu (mg/mL).",
  },
  {
    question: "Neden köpek/kedi gibi türe özel örnek doz değerleri verilmiyor?",
    answer:
      "Aynı ilaç bir türde güvenli, başka bir türde toksik olabilir (örneğin bazı insan ağrı kesicileri kedilerde ölümcül olabilir). Güvenli bir doz aralığı; ilaca, türe, hayvanın yaşına ve klinik durumuna özgüdür ve tek bir genel tabloyla sorumlu şekilde verilemez. Bu yüzden bu sayfa örnek doz değeri içermez.",
  },
];

export const metadata: Metadata = {
  title: "Veteriner İlaç Dozu ve Hacmi Hesaplama (mg/kg - mL)",
  description:
    "Veteriner hekim tarafından reçete edilen mg/kg dozunu, hayvan ağırlığı ve ilaç konsantrasyonuyla birlikte uygulanacak mL hacme çevir. Doz değerini belirlemez, yalnızca birim çevirimi yapar.",
  alternates: {
    canonical: "/veteriner-ilac-dozu-hesaplama",
  },
  openGraph: {
    title: "Veteriner İlaç Dozu ve Hacmi Hesaplama (mg/kg - mL)",
    description:
      "Reçete edilen mg/kg dozunu, ağırlık ve konsantrasyonla birlikte mL hacme çevir.",
    url: buildSiteUrl("/veteriner-ilac-dozu-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function VetDoseCalculatorPage() {

  return (
    <AracSayfasi
      yol="/veteriner-ilac-dozu-hesaplama"
      baslik="Veteriner İlaç Dozu ve Hacmi Hesaplama"
      hesap={<VetDoseCalculator />}
      giris={<><p>Bu araç doz değerini belirlemez — yalnızca birim çevirimi yapar.</p></>}
      sss={faqItems}
      serbestIcindekiler={[{"id":"toplam-doz-ve-hacim-nasil-hesaplanir","baslik":"Toplam doz ve hacim nasıl hesaplanır?"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="toplam-doz-ve-hacim-nasil-hesaplanir">Toplam doz ve hacim nasıl hesaplanır?</h2>
          <p>
            <strong>Toplam Doz (mg) = Reçete Edilen Doz (mg/kg) ×
            Hayvan Ağırlığı (kg)</strong>. Enjeksiyon veya oral
            solüsyon uygulamalarında, bu toplam dozun kaç mL&apos;ye
            karşılık geldiğini bulmak için{" "}
            <strong>Uygulanacak Hacim (mL) = Toplam Doz (mg) ÷ İlaç
            Konsantrasyonu (mg/mL)</strong> formülü kullanılır.
          </p>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Diğer veteriner araçları için{" "}
            <Link href="/hesaplayicilar#klinik">Klinik Skorlar</Link>
            {" "}sayfasına, ağırlık birimleri (kg/lb) için{" "}
            <Link href="/kategoriler/kutle">Kütle Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Formül, temel doz-konsantrasyon aritmetiğine dayanır. Bu
            araç ve sonuçları tıbbi/veteriner tavsiye yerine geçmez;
            uygulanacak dozu belirlemez.
          </p>
        </>
      }
    />
  );
}
