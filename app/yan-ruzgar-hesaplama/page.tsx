import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import CrosswindCalculator from "../components/CrosswindCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Yan rüzgar bileşeni nasıl hesaplanır?",
    answer:
      "Yan Rüzgar Bileşeni = Rüzgar Hızı × sin(Rüzgar Yönü − Pist Yönü) formülüyle hesaplanır. Aynı açı farkının kosinüsü alınarak da baş/kuyruk rüzgar bileşeni bulunur: Baş/Kuyruk Rüzgarı = Rüzgar Hızı × cos(Rüzgar Yönü − Pist Yönü).",
  },
  {
    question: "Pist yönünü nasıl bulurum?",
    answer:
      "Pist numarası, pist yönünün (manyetik derece) 10'a bölünüp yuvarlanmasıyla elde edilir — örneğin Pist 24, yaklaşık 240° manyetik yöne karşılık gelir. Tam tersi yönde uçarken (Pist 06) bu 60° olur.",
  },
  {
    question: "Yan rüzgar limitini nereden öğrenirim?",
    answer:
      "Her uçak tipinin üretici tarafından belirlenmiş, genellikle demonstre edilmiş maksimum yan rüzgar bileşeni değeri (demonstrated crosswind component) vardır. Bu değer uçağın performans el kitabında (POH/AFM) yer alır; hesaplanan yan rüzgar bu limiti aşıyorsa iniş/kalkış kararı buna göre değerlendirilmelidir.",
  },
];

export const metadata: Metadata = {
  title: "Yan Rüzgar Bileşeni Hesaplama (Crosswind Component)",
  description:
    "Rüzgar yönü, rüzgar hızı ve pist yönünden, standart navigasyon formülüyle yan rüzgar ve baş/kuyruk rüzgar bileşenini hesapla.",
  alternates: {
    canonical: "/yan-ruzgar-hesaplama",
  },
  openGraph: {
    title: "Yan Rüzgar Bileşeni Hesaplama (Crosswind Component)",
    description:
      "Rüzgar yönü, hızı ve pist yönünden yan rüzgar bileşenini hesaplayın.",
    url: buildSiteUrl("/yan-ruzgar-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function CrosswindCalculatorPage() {

  return (
    <AracSayfasi
      yol="/yan-ruzgar-hesaplama"
      baslik="Yan Rüzgar Bileşeni Hesaplama"
      hesap={<CrosswindCalculator />}
      serbestIcindekiler={[{"id":"yan-ruzgar-bileseni-nasil-hesaplanir","baslik":"Yan rüzgar bileşeni nasıl hesaplanır?"},{"id":"sik-sorulan-sorular","baslik":"Sık Sorulan Sorular"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="yan-ruzgar-bileseni-nasil-hesaplanir">Yan rüzgar bileşeni nasıl hesaplanır?</h2>
          <p>
            Rüzgar yönü ile pist yönü arasındaki açı farkı bulunur, bu
            açının sinüsü rüzgar hızıyla çarpılarak yan rüzgar bileşeni
            elde edilir:{" "}
            <strong>
              Yan Rüzgar = Rüzgar Hızı × sin(Rüzgar Yönü − Pist Yönü)
            </strong>
            . Aynı açının kosinüsü alınarak baş/kuyruk rüzgar bileşeni
            bulunur:{" "}
            <strong>
              Baş/Kuyruk Rüzgarı = Rüzgar Hızı × cos(Rüzgar Yönü − Pist
              Yönü)
            </strong>
            .
          </p>
          <h2 id="sik-sorulan-sorular">Sık Sorulan Sorular</h2>
          <p>
            <strong>Pist yönünü nasıl bulurum?</strong>
            <br />
            Pist numarası, pist yönünün (manyetik derece) 10&apos;a
            bölünüp yuvarlanmasıyla elde edilir — örneğin Pist 24,
            yaklaşık 240° manyetik yöne karşılık gelir.
          </p>
          <p>
            <strong>Yan rüzgar limitini nereden öğrenirim?</strong>
            <br />
            Her uçak tipinin üretici tarafından belirlenmiş,
            genellikle demonstre edilmiş maksimum yan rüzgar bileşeni
            değeri (demonstrated crosswind component) vardır. Bu değer
            uçağın performans el kitabında (POH/AFM) yer alır.
          </p>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Diğer pilot araçları için{" "}
            <Link href="/hesaplayicilar#harita-ve-havacilik">Harita, Coğrafya ve Havacılık</Link> sayfasına,
            uçuş planlaması için{" "}
            İniş Oranı Hesaplama,{" "}
            Ağırlık ve Denge Hesaplama,{" "}
            Yoğunluk İrtifası Hesaplama
            {" "}sayfalarına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Yan rüzgar bileşeni formülü, uçuş eğitiminde standart
            kullanılan temel trigonometrik navigasyon hesabına
            dayanmaktadır. Bu araç genel bilgilendirme ve ön çalışma
            amaçlıdır; gerçek uçuş kararı için uçağın performans el
            kitabı ve resmî hava durumu/METAR verileri esas alınmalıdır.
          </p>
        </>
      }
    />
  );
}
