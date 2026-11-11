import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import LengthComparisonTool from "../components/LengthComparisonTool";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "En yakın karşılaştırma nasıl seçiliyor?",
    answer:
      "Girdiğin değere oranı 1'e (yani birebir eşit olmaya) en yakın olan referans nesne en üstte gösterilir; listedeki diğer tüm nesneler de kaç kat olduklarıyla birlikte sıralanır.",
  },
  {
    question: "Neden bazı çubuklar tamamen dolu görünüyor?",
    answer:
      "Girdiğin değer referans nesneden büyükse (örneğin 200 metre girip zürafa boyuyla karşılaştırıyorsan), çubuk görsel olarak dolu gösterilir ve yanındaki sayı gerçek kat farkını (ör. \"36 kat\") yazılı olarak belirtir.",
  },
];

export const metadata: Metadata = {
  title: "Uzunluk Karşılaştırma: Bu Kaç Metre Eder?",
  description:
    "Bir uzunluk değeri gir: zürafa boyu, otobüs uzunluğu, futbol sahası, Eyfel Kulesi ve Boğaz Köprüsü gibi tanıdık nesnelerle anında karşılaştır.",
  alternates: {
    canonical: "/uzunluk-karsilastirma",
  },
  openGraph: {
    title: "Uzunluk Karşılaştırma: Bu Kaç Metre Eder?",
    description:
      "Bir uzunluk değerini tanıdık nesnelerle (zürafa, otobüs, futbol sahası...) karşılaştırın.",
    url: buildSiteUrl("/uzunluk-karsilastirma"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function LengthComparisonPage() {

  return (
    <AracSayfasi
      yol="/uzunluk-karsilastirma"
      baslik="Uzunluk Karşılaştırma"
      hesap={<LengthComparisonTool />}
      serbestIcindekiler={[{"id":"bu-karsilastirmalar-nereden-geliyor","baslik":"Bu karşılaştırmalar nereden geliyor?"},{"id":"sik-sorulan-sorular","baslik":"Sık Sorulan Sorular"}]}
      serbestIcerik={
        <>
          <h2 id="bu-karsilastirmalar-nereden-geliyor">Bu karşılaştırmalar nereden geliyor?</h2>
          <p>
            Kullanılan referans değerler yaygın kabul gören
            kaynaklardan derlenmiştir: yetişkin zürafa boyu için
            National Geographic/hayvanat bahçesi verileri (ortalama
            4,3-5,7 m aralığının orta noktası, 5,5 m), mavi balina
            uzunluğu için NOAA Fisheries verileri (yetişkin ortalama
            24-30 m aralığının alt-orta noktası, 25 m), futbol sahası
            için FIFA&apos;nın standart saha uzunluğu (105 m), Eyfel
            Kulesi için resmi anten dahil yükseklik (330 m) ve 15 Temmuz
            Şehitler Köprüsü için Karayolları Genel Müdürlüğü&apos;nün
            yayımladığı toplam uzunluk (1560 m) kullanılmıştır. Bunlar
            kesin bilimsel ölçümler değil, karşılaştırma amaçlı
            yuvarlatılmış ortalama değerlerdir.
          </p>
          <h2 id="sik-sorulan-sorular">Sık Sorulan Sorular</h2>
          <p>
            <strong>En yakın karşılaştırma nasıl seçiliyor?</strong>
            <br />
            Girdiğin değere oranı 1&apos;e (yani birebir eşit olmaya) en
            yakın olan referans nesne en üstte gösterilir; listedeki
            diğer tüm nesneler de kaç kat olduklarıyla birlikte sıralanır.
          </p>
          <p>
            <strong>Neden bazı çubuklar tamamen dolu görünüyor?</strong>
            <br />
            Girdiğin değer referans nesneden büyükse (örneğin 200 metre
            girip zürafa boyuyla karşılaştırıyorsan), çubuk görsel olarak
            dolu gösterilir ve yanındaki sayı gerçek kat farkını (ör.
            &quot;36 kat&quot;) yazılı olarak belirtir.
          </p>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Ağırlık birimlerini çevirmek için{" "}
            <Link href="/kategoriler/kutle">Kütle Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </>
      }
    />
  );
}
