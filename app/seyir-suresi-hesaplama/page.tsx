import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TransitTimeCalculator from "../components/TransitTimeCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Knot ile deniz mili arasındaki ilişki nedir?",
    answer:
      "Knot, tanım gereği saatte kat edilen deniz mili sayısıdır (1 knot = 1 deniz mili/saat). Bu yüzden mesafe deniz mili, hız knot cinsinden girildiğinde süre hesabı doğrudan ve kesindir: Süre (saat) = Mesafe (nm) / Hız (knot).",
  },
  {
    question: "1 deniz mili kaç km'dir?",
    answer:
      "1 deniz mili tam olarak 1852 metre, yani 1,852 km'dir. Bu değer, Dünya'nın enlem dairesi üzerinde 1 dakikalık yay uzunluğuna dayanır ve uluslararası olarak standartlaştırılmıştır.",
  },
];

export const metadata: Metadata = {
  title: "Seyir Süresi Hesaplama: Mesafe ve Hızdan Süre Bulma",
  description:
    "Mesafe (deniz mili, km veya mil) ve hızı (knot, km/saat veya mph) gir; klasik navigasyon formülüyle seyir süresini saat ve dakika olarak hesapla.",
  alternates: {
    canonical: "/seyir-suresi-hesaplama",
  },
  openGraph: {
    title: "Seyir Süresi Hesaplama: Mesafe ve Hızdan Süre Bulma",
    description:
      "Mesafe ve hızdan, klasik navigasyon formülüyle seyir süresini hesaplayın.",
    url: buildSiteUrl("/seyir-suresi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function TransitTimeCalculatorPage() {

  return (
    <AracSayfasi
      yol="/seyir-suresi-hesaplama"
      baslik="Seyir Süresi Hesaplama"
      hesap={<TransitTimeCalculator />}
      serbestIcindekiler={[{"id":"seyir-suresi-nasil-hesaplanir","baslik":"Seyir süresi nasıl hesaplanır?"},{"id":"sik-sorulan-sorular","baslik":"Sık Sorulan Sorular"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="seyir-suresi-nasil-hesaplanir">Seyir süresi nasıl hesaplanır?</h2>
          <p>
            Temel navigasyon formülü basittir:{" "}
            <strong>Süre = Mesafe / Hız</strong>. Deniz mili ve knot
            birbiriyle doğrudan uyumludur çünkü{" "}
            <strong>1 knot = 1 deniz mili/saat</strong> olarak
            tanımlanmıştır — bu yüzden pilotlar ve gemi kaptanları
            genellikle mesafeyi deniz mili, hızı knot cinsinden
            kullanarak süreyi doğrudan hesaplar.
          </p>
          <h2 id="sik-sorulan-sorular">Sık Sorulan Sorular</h2>
          <p>
            <strong>Knot ile deniz mili arasındaki ilişki nedir?</strong>
            <br />
            Knot, tanım gereği saatte kat edilen deniz mili sayısıdır
            (1 knot = 1 deniz mili/saat). Bu yüzden mesafe deniz mili,
            hız knot cinsinden girildiğinde süre hesabı doğrudan ve
            kesindir: Süre (saat) = Mesafe (nm) / Hız (knot).
          </p>
          <p>
            <strong>1 deniz mili kaç km&apos;dir?</strong>
            <br />
            1 deniz mili tam olarak 1852 metre, yani 1,852 km&apos;dir.
            Bu değer, Dünya&apos;nın enlem dairesi üzerinde 1 dakikalık
            yay uzunluğuna dayanır ve uluslararası olarak
            standartlaştırılmıştır.
          </p>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Diğer havacılık araçları için{" "}
            <Link href="/hesaplayicilar#harita-ve-havacilik">Harita, Coğrafya ve Havacılık</Link>, denizcilik
            araçları için{" "}
            <Link href="/hesaplayicilar#harita-ve-havacilik">Harita, Coğrafya ve Havacılık</Link> sayfasına,
            deniz mili ve fit birimi dönüşümleri için{" "}
            <Link href="/kategoriler/uzunluk">Uzunluk Dönüşümleri</Link>{" "}
            sayfasına, uçuş planlaması için{" "}
            İniş Oranı Hesaplama,{" "}
            <Link href="/yan-ruzgar-hesaplama">Yan Rüzgar Hesaplama</Link>
            {" "}sayfalarına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Deniz mili tanımı ve knot ilişkisi, uluslararası denizcilik
            ve havacılık standartlarına dayanan sabit, değişmeyen
            fiziksel tanımlardır.
          </p>
        </>
      }
    />
  );
}
