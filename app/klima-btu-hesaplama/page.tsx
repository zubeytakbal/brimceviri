import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AcCapacityCalculator from "../components/AcCapacityCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import EngineeringNextSteps from "../components/engineering/EngineeringNextSteps";
import { ENGINEERING_FLOWS } from "../converter/engineeringFlows";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Salon ve yatak odasında aynı formül mü kullanılır?",
    answer:
      "Evet, temel formül aynıdır — sadece odanın alanı, içindeki kişi sayısı ve güneş/kat durumu değişir. Mutfak gibi ekstra ısı kaynağı olan (ocak, fırın) mekanlarda gerçek ihtiyaç bu hesaptan biraz daha yüksek çıkabilir.",
  },
  {
    question: "Neden bir üst standart kapasiteye yuvarlanıyor?",
    answer:
      "Klimalar piyasada sabit kapasite adımlarıyla (9.000, 12.000 BTU gibi) satılır; hesaplanan ihtiyacın hemen altındaki bir kapasiteyi almak odayı yeterince soğutamamana yol açar, bu yüzden bir üst standart kapasite güvenli tercihtir.",
  },
];

export const metadata: Metadata = {
  title: "Klima BTU Hesaplama: Kaç BTU Klima Almalıyım?",
  description:
    "Oda alanını, kişi sayısını ve güneş/kat durumunu gir: odana uygun klima soğutma kapasitesini (BTU) ve en yakın standart kapasiteyi anında hesapla.",
  alternates: {
    canonical: "/klima-btu-hesaplama",
  },
  openGraph: {
    title: "Klima BTU Hesaplama: Kaç BTU Klima Almalıyım?",
    description:
      "Oda alanından uygun klima soğutma kapasitesini (BTU) hesaplayın.",
    url: buildSiteUrl("/klima-btu-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function AcCapacityCalculatorPage() {

  return (
    <AracSayfasi
      yol="/klima-btu-hesaplama"
      baslik="Klima BTU Hesaplama"
      hesap={<AcCapacityCalculator />}
      serbestIcindekiler={[{"id":"btu-nedir-klima-gucuyle-ne-ilgisi","baslik":"BTU nedir, klima gücüyle ne ilgisi var?"},{"id":"hesaplama-nasil-yapiliyor","baslik":"Hesaplama nasıl yapılıyor?"},{"id":"sik-sorulan-sorular","baslik":"Sık Sorulan Sorular"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="btu-nedir-klima-gucuyle-ne-ilgisi">BTU nedir, klima gücüyle ne ilgisi var?</h2>
          <p>
            BTU (British Thermal Unit), bir klimanın saatte çekebileceği
            ısı miktarını ifade eden bir birimdir — kabaca klimanın
            &quot;soğutma gücü&quot; olarak düşünebilirsin. Oda için
            gereğinden düşük BTU&apos;lu bir klima sürekli tam güçte
            çalışıp yeterince soğutamaz ve daha çok elektrik harcar;
            gereğinden yüksek BTU&apos;lu bir klima ise odayı çok hızlı
            soğutup sık sık açılıp kapanır (kısa devirli çalışma), bu da
            hem enerji israfına hem nem dengesinin bozulmasına yol açar.
            Doğru kapasite seçimi bu yüzden hem konfor hem tasarruf
            açısından önemlidir.
          </p>
          <h2 id="hesaplama-nasil-yapiliyor">Hesaplama nasıl yapılıyor?</h2>
          <p>
            Yaygın kullanılan pratik formül, oda alanının metrekare
            başına 500-600 BTU ile çarpılmasına dayanır; bu araçta 600
            BTU/m² kullanılmıştır. Odadaki her kişi için insan vücudunun
            yaydığı ısıyı karşılamak üzere 600 BTU eklenir. Oda gün boyu
            doğrudan güneş alıyorsa veya en üst kat/çatı katındaysa,
            ekstra ısı yükü için toplam ihtiyaca %10&apos;ar ek yapılır.
            Son olarak hesaplanan toplam, piyasada satılan standart
            klima kapasitelerinden (9.000, 12.000, 18.000, 24.000,
            30.000 BTU) bir üstteki değere yuvarlanır.
          </p>
          <p>
            Bu hesap pratik bir yaklaşım sunar; tavan yüksekliği normalin
            çok üzerindeyse, odada yoğun ısı kaynağı (fırın, çok sayıda
            elektronik cihaz) varsa veya yalıtım özellikle zayıfsa, bir
            klima teknisyeninden yerinde keşif almak daha doğru sonuç
            verir.
          </p>
          <h2 id="sik-sorulan-sorular">Sık Sorulan Sorular</h2>
          <p>
            <strong>Salon ve yatak odasında aynı formül mü kullanılır?</strong>
            <br />
            Evet, temel formül aynıdır — sadece odanın alanı, içindeki
            kişi sayısı ve güneş/kat durumu değişir. Mutfak gibi ekstra
            ısı kaynağı olan (ocak, fırın) mekanlarda gerçek ihtiyaç bu
            hesaptan biraz daha yüksek çıkabilir.
          </p>
          <p>
            <strong>Neden bir üst standart kapasiteye yuvarlanıyor?</strong>
            <br />
            Klimalar piyasada sabit kapasite adımlarıyla (9.000, 12.000
            BTU gibi) satılır; hesaplanan ihtiyacın hemen altındaki bir
            kapasiteyi almak odayı yeterince soğutamamana yol açar, bu
            yüzden bir üst standart kapasite güvenli tercihtir.
          </p>
          <EngineeringNextSteps links={ENGINEERING_FLOWS["/klima-btu-hesaplama"]} />
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            kombi, klima ve ısı pompasıyla ısınma maliyetini karşılaştırmak için{" "}
            <Link href="/kombi-klima-isitma-maliyeti-karsilastirma">Isıtma Maliyeti Karşılaştırma</Link>,{" "}
            BTU/saat birim dönüşümü için{" "}
            <Link href="/btu-saat-watt">BTU/Saat - Watt Çevirici</Link>
            {" "}sayfasına, diğer klima-soğutma teknisyeni araçları için{" "}
            <Link href="/hesaplayicilar#enerji-ve-arac">Enerji, Fatura ve Araç</Link>
            {" "}sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Formüldeki m² başına BTU aralığı (500-600) ve kişi başına ek
            yük (600 BTU), klima üreticilerinin (Vestel, Toshiba,
            Mitsubishi gibi) yayımladığı kapasite seçim rehberlerinde
            yaygın kullanılan pratik değerlerdir.
          </p>
        </>
      }
    />
  );
}
