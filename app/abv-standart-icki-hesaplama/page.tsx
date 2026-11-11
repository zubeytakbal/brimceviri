import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AbvCalculator from "../components/AbvCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Saf alkol miktarı nasıl hesaplanır?",
    answer:
      "Saf Alkol Hacmi (mL) = İçecek Hacmi (mL) × ABV (%) / 100. Ağırlığa çevirmek için, etanolün yoğunluğu (~0,789 g/mL) ile çarpılır: Saf Alkol Ağırlığı (g) = Saf Alkol Hacmi (mL) × 0,789.",
  },
  {
    question: "Standart içki (standard drink) nedir?",
    answer:
      "Standart içki, farklı içecek türlerini (bira, şarap, viski vb.) karşılaştırılabilir kılmak için kullanılan, belirli miktarda saf alkole karşılık gelen bir referans birimidir. Uluslararası yaygın kullanılan referans 10 g saf alkoldür; ABD 14 g, İngiltere 8 g gibi farklı ülke standartları da vardır.",
  },
];

export const metadata: Metadata = {
  title: "ABV ve Standart İçki Hesaplama",
  description:
    "İçecek hacmi ve alkol yüzdesinden (ABV) saf alkol miktarını (mL ve g) ve standart içki sayısını hesapla.",
  alternates: {
    canonical: "/abv-standart-icki-hesaplama",
  },
  openGraph: {
    title: "ABV ve Standart İçki Hesaplama",
    description: "İçecek hacmi ve ABV'den saf alkol miktarını hesapla.",
    url: buildSiteUrl("/abv-standart-icki-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function AbvCalculatorPage() {

  return (
    <AracSayfasi
      yol="/abv-standart-icki-hesaplama"
      baslik="ABV ve Standart İçki Hesaplama"
      hesap={<AbvCalculator />}
      sss={faqItems}
      serbestIcindekiler={[{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Diğer barmen araçları için{" "}
            <Link href="/hesaplayicilar#olcu-ve-gunluk">Mutfak, Beden ve Okul</Link>
            {" "}sayfasına, oz/mL/cl çevirme için{" "}
            <Link href="/kokteyl-olcusu-cevirici">Kokteyl Ölçüsü Çevirici</Link>
            {" "}sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Formül, etanolün yoğunluğuna (~0,789 g/mL, 20°C&apos;de)
            dayanır. Standart içki referans değeri ülkeye göre
            değişir; bu araç tıbbi tavsiye yerine geçmez.
          </p>
        </>
      }
    />
  );
}
