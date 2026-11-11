import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import NumberBaseCalculator from "../components/NumberBaseCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "İkili (binary) sayı sistemi nedir?",
    answer:
      "İkili sistem, yalnızca 0 ve 1 rakamlarını kullanan sayı gösterim biçimidir. Bilgisayarlar veriyi elektronik devrelerde iki durumla (açık/kapalı) temsil ettiği için temel olarak ikili sistemi kullanır.",
  },
  {
    question: "Onaltılık (hexadecimal) sistem nerede kullanılır?",
    answer:
      "Onaltılık sistem, 0-9 rakamları ile A-F harflerini kullanır. Renk kodları (#FF00FF gibi), bellek adresleri ve düşük seviyeli programlamada ikili sayıları daha kısa ve okunaklı göstermek için tercih edilir.",
  },
  {
    question: "Negatif sonuç veren çıkarma işlemini neden desteklemiyor?",
    answer:
      "Bu araç işaretsiz (unsigned) ikili aritmetik kullanır; bu yüzden çıkarma işleminde büyük sayıyı önce girmen gerekir. İşaretli negatif sayı gösterimi (two's complement) bu aracın kapsamı dışındadır.",
  },
];

export const metadata: Metadata = {
  title: "Sayı Tabanı Çevirici: İkili, Sekizli, Onlu, Onaltılık",
  description:
    "İkili (binary), sekizli (octal), onlu (decimal) ve onaltılık (hexadecimal) sayı sistemleri arasında anında çevirin; ikili sayılarla toplama, çıkarma ve çarpma yapın.",
  alternates: {
    canonical: "/sayi-tabani-cevirici",
    languages: {
      tr: "/sayi-tabani-cevirici",
      "x-default": "/sayi-tabani-cevirici",
    },
  },
  openGraph: {
    title: "Sayı Tabanı Çevirici: İkili, Sekizli, Onlu, Onaltılık",
    description:
      "İkili, sekizli, onlu ve onaltılık sayı sistemleri arasında anında çevirin.",
    url: buildSiteUrl("/sayi-tabani-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function NumberBaseCalculatorPage() {

  return (
    <AracSayfasi
      yol="/sayi-tabani-cevirici"
      baslik="Sayı Tabanı Çevirici"
      hesap={<NumberBaseCalculator />}
      sss={faqItems}
      serbestIcindekiler={[{"id":"sayi-tabanlari-nedir-nasil-calisir","baslik":"Sayı tabanları nedir, nasıl çalışır?"},{"id":"ikili-sayilarla-toplama-cikarma-carpma-nasil","baslik":"İkili sayılarla toplama, çıkarma, çarpma nasıl yapılır?"}]}
      serbestIcerik={
        <>
          <h2 id="sayi-tabanlari-nedir-nasil-calisir">Sayı tabanları nedir, nasıl çalışır?</h2>
          <p>
            Günlük hayatta kullandığımız <strong>onlu (decimal)</strong>{" "}
            sistem 10 rakam (0-9) kullanır. Bilgisayarlar ise veriyi{" "}
            <strong>ikili (binary)</strong> sistemde, yalnızca 0 ve 1
            rakamlarıyla temsil eder. <strong>Sekizli (octal)</strong> ve{" "}
            <strong>onaltılık (hexadecimal)</strong> sistemler, uzun ikili
            sayıları daha kısa ve okunabilir göstermek için kullanılır —
            özellikle programlama, ağ adresleme ve renk kodlarında sıkça
            karşına çıkarlar.
          </p>
          <p>
            Bir sayının tabanını değiştirmek, o sayının değerini değil,
            yalnızca gösterim biçimini değiştirir. Örneğin onlu sistemde 10
            sayısı, ikili sistemde 1010, onaltılık sistemde ise A olarak
            yazılır — hepsi aynı miktarı temsil eder.
          </p>
          <h2 id="ikili-sayilarla-toplama-cikarma-carpma-nasil">İkili sayılarla toplama, çıkarma, çarpma nasıl yapılır?</h2>
          <p>
            İkili aritmetik, onlu sistemdeki işlemlerle aynı mantıkla
            çalışır; tek fark her basamağın yalnızca 0 veya 1 olabilmesidir.
            Bu araç, girdiğin iki ikili sayıyı arka planda onlu sisteme
            çevirip işlemi yapar, sonucu tekrar ikili olarak gösterir.
          </p>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Diğer yazılımcı araçları için{" "}
            <Link href="/hesaplayicilar#teknik">Teknik ve Mühendislik</Link>{" "}
            sayfasına, renk kodu çevirme için{" "}
            <Link href="/renk-kodu-cevirici">Renk Kodu Çevirici</Link>
            {" "}sayfasına, veri boyutu birim dönüşümleri için{" "}
            <Link href="/kategoriler/veri">Veri Depolama Dönüşümleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </>
      }
    />
  );
}
