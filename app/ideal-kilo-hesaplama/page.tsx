import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import IdealWeightCalculator from "../components/IdealWeightCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "İdeal kilo ile BMI'ye göre normal kilo aynı şey mi?",
    answer:
      "Hayır, farklı yöntemlerdir. BMI, kilonun boyun karesine bölünmesiyle geniş bir 'normal' aralık verir. İdeal kilo (Devine formülü) ise yalnızca boya dayalı tek bir referans değer üretir ve klinik ortamda ilaç dozlaması gibi hesaplamalarda kullanılır. İkisi birbirini tamamlayan, farklı amaçlı araçlardır.",
  },
  {
    question: "Bu formül herkes için geçerli mi?",
    answer:
      "Devine formülü, kas kütlesi, vücut yapısı veya yaş gibi bireysel farkları hesaba katmaz; genel bir referans noktasıdır. Sporcular veya farklı vücut tipine sahip kişilerde gerçek sağlıklı kilo bu değerden belirgin şekilde sapabilir.",
  },
];

export const metadata: Metadata = {
  title: "İdeal Kilo Hesaplama (Devine Formülü)",
  description:
    "Boy ve cinsiyetini gir; klinik ortamda yaygın kullanılan Devine formülüyle ideal kiloyu anında hesapla.",
  alternates: {
    canonical: "/ideal-kilo-hesaplama",
    languages: {
    },
  },
  openGraph: {
    title: "İdeal Kilo Hesaplama (Devine Formülü)",
    description:
      "Boy ve cinsiyete göre Devine formülüyle ideal kiloyu hesaplayın.",
    url: buildSiteUrl("/ideal-kilo-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function IdealWeightCalculatorPage() {

  return (
    <AracSayfasi
      yol="/ideal-kilo-hesaplama"
      baslik="İdeal Kilo Hesaplama"
      hesap={<IdealWeightCalculator />}
      serbestIcindekiler={[{"id":"devine-formulu-nedir","baslik":"Devine formülü nedir?"},{"id":"sik-sorulan-sorular","baslik":"Sık Sorulan Sorular"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="devine-formulu-nedir">Devine formülü nedir?</h2>
          <p>
            1974&apos;te Dr. B.J. Devine tarafından geliştirilen bu
            formül, başlangıçta ilaç dozlaması hesaplamalarında
            kullanılmak üzere tasarlanmış, sonrasında genel bir ideal
            kilo referansı olarak yaygınlaşmıştır:
          </p>
          <p>
            <strong>Erkek: İdeal Kilo (kg) = 50 + 2,3 × (Boy(inç) − 60)</strong>
            <br />
            <strong>Kadın: İdeal Kilo (kg) = 45,5 + 2,3 × (Boy(inç) − 60)</strong>
          </p>
          <p>
            Formül 152,4 cm (60 inç) ve üzeri boylar için tanımlıdır.
          </p>
          <h2 id="sik-sorulan-sorular">Sık Sorulan Sorular</h2>
          <p>
            <strong>İdeal kilo ile BMI&apos;ye göre normal kilo aynı şey mi?</strong>
            <br />
            Hayır, farklı yöntemlerdir. BMI, kilonun boyun karesine
            bölünmesiyle geniş bir &quot;normal&quot; aralık verir.
            İdeal kilo (Devine formülü) ise yalnızca boya dayalı tek
            bir referans değer üretir ve klinik ortamda ilaç dozlaması
            gibi hesaplamalarda kullanılır.
          </p>
          <p>
            <strong>Bu formül herkes için geçerli mi?</strong>
            <br />
            Devine formülü, kas kütlesi, vücut yapısı veya yaş gibi
            bireysel farkları hesaba katmaz; genel bir referans
            noktasıdır. Sporcular veya farklı vücut tipine sahip
            kişilerde gerçek sağlıklı kilo bu değerden belirgin şekilde
            sapabilir.
          </p>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            BMI ve günlük kalori ihtiyacın için{" "}
            <Link href="/bmi-hesaplama">BMI Hesaplama</Link>, vücut yağ
            oranın için{" "}
            <Link href="/vucut-yag-orani-hesaplama">
              Vücut Yağ Oranı Hesaplama
            </Link>
            , sağlık ve fitness ile ilgili diğer araçlar için{" "}
            <Link href="/hesaplayicilar#saglik-ve-spor">Sağlık ve Spor</Link>{" "}
            sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Formül, Dr. B.J. Devine&apos;in 1974&apos;te yayımladığı ve
            klinik ortamda hâlâ yaygın kullanılan ideal vücut ağırlığı
            tahmin yöntemine dayanmaktadır. Bu araç tıbbi tavsiye
            yerine geçmez.
          </p>
        </>
      }
    />
  );
}
