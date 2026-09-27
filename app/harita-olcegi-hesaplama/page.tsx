import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import MapScaleCalculator from "../components/geo/MapScaleCalculator";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { geoRelated } from "../converter/geo/geoTools";
import { buildSiteUrl } from "../siteConfig";

const path = "/harita-olcegi-hesaplama";
const title = "Harita Ölçeği Hesaplama: Gerçek Uzunluk, Alan ve Ölçek Bulma";
const description =
  "1/25.000, 1/100.000 gibi ölçeklerde haritadaki cm'nin gerçekte kaç km olduğunu, gerçek alanı ve ölçeği adım adım hesaplayın. Çizgi ölçek ve çözümlü örnek sorular.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "1/25.000 ölçekli haritada 1 cm kaç metredir?",
    answer: "1 cm × 25.000 = 25.000 cm = 250 metredir. Yani haritadaki 4 cm gerçekte 1 km'ye karşılık gelir.",
  },
  {
    question: "1/100.000 ölçekli haritada 1 cm kaç km?",
    answer: "1 cm × 100.000 = 100.000 cm = 1 km. Bu ölçekte haritadaki her santimetre 1 kilometreyi gösterir.",
  },
  {
    question: "Büyük ölçekli harita ne demektir?",
    answer:
      "Ölçeğin paydası küçüldükçe ölçek büyür. 1/25.000 ölçekli bir harita 1/1.000.000 ölçekli bir haritadan daha büyük ölçeklidir: daha dar bir alanı çok daha ayrıntılı gösterir.",
  },
  {
    question: "Harita alanı gerçek alana nasıl çevrilir?",
    answer:
      "Alan hesabında ölçeğin paydasının karesi kullanılır: Gerçek alan = Harita alanı × Ölçek paydası². 1/100.000 ölçekli haritada 2 cm² olan bir alan, 2 × 100.000² = 2 × 10¹⁰ cm² = 2 km²'dir.",
  },
  {
    question: "Çizgi ölçeğin kesir ölçekten farkı nedir?",
    answer:
      "Kesir ölçek (1/50.000) oranı sayıyla verir; çizgi ölçek bu oranı bölmeli bir çizgiyle gösterir. Harita büyütülüp küçültüldüğünde çizgi ölçek de aynı oranda değiştiği için doğru kalır, kesir ölçek ise geçerliliğini yitirir.",
  },
];

export default function MapScalePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/cografya-hesaplamalari", label: "Coğrafya Hesaplamaları" },
        { href: path, label: "Harita Ölçeği Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Harita Ölçeği Hesaplama"
      intro="Haritadaki uzunluğu gerçek uzunluğa, gerçek uzunluğu haritaya çevirin; ölçeği bulun, alan hesaplayın ya da ölçek değiştirin. Her sonuç adım adım çözümüyle gösterilir."
      tool={<MapScaleCalculator />}
      related={{ title: "İlginizi çekebilir", links: geoRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "olcek-nedir", label: "Ölçek nedir?" },
        { id: "formuller", label: "Harita hesaplama formülleri" },
        { id: "ornekler", label: "Çözümlü örnek sorular" },
        { id: "buyuk-kucuk", label: "Büyük ve küçük ölçek" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="olcek-nedir">Ölçek nedir?</h2>
      <p>
        Ölçek, haritadaki uzunluğun gerçekteki uzunluğa oranıdır. 1/50.000 ölçekli bir haritada 1 cm, gerçekte 50.000 cm yani 500 metreyi gösterir.
        Kesirdeki pay her zaman 1, payda ise küçültme oranıdır; harita hesaplamalarında pay ve payda aynı birimde (genellikle santimetre) düşünülür.
      </p>

      <h2 id="formuller">Harita hesaplama formülleri</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th scope="col">Bulunacak</th>
              <th scope="col">Formül</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gerçek uzunluk (GU)</td>
              <td>GU = Harita uzunluğu × Ölçek paydası</td>
            </tr>
            <tr>
              <td>Harita uzunluğu (HU)</td>
              <td>HU = Gerçek uzunluk ÷ Ölçek paydası</td>
            </tr>
            <tr>
              <td>Ölçek paydası (ÖP)</td>
              <td>ÖP = Gerçek uzunluk ÷ Harita uzunluğu</td>
            </tr>
            <tr>
              <td>Gerçek alan (GA)</td>
              <td>GA = Harita alanı × Ölçek paydası²</td>
            </tr>
            <tr>
              <td>Ölçek değişince uzunluk</td>
              <td>HU₁ × ÖP₁ = HU₂ × ÖP₂</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Birim dönüşümleri: 1 km = 1.000 m = 100.000 cm; 1 km² = 10.000.000.000 (10¹⁰) cm²; 1 hektar = 10.000 m²; 1 dönüm = 1.000 m². Ayrıntılı
        dönüşümler için <Link href="/kategoriler/uzunluk">uzunluk</Link> ve <Link href="/kategoriler/alan">alan</Link> sayfalarına bakın.
      </p>

      <h2 id="ornekler">Çözümlü örnek sorular</h2>
      <ol>
        <li>
          <strong>1/500.000 ölçekli haritada 3 cm olan mesafe gerçekte kaç km?</strong> GU = 3 × 500.000 = 1.500.000 cm = 15 km.
        </li>
        <li>
          <strong>Gerçekte 60 km olan yol 1/2.000.000 ölçekli haritada kaç cm gösterilir?</strong> 60 km = 6.000.000 cm; HU = 6.000.000 ÷
          2.000.000 = 3 cm.
        </li>
        <li>
          <strong>Haritada 5 cm olan mesafe gerçekte 25 km ise ölçek nedir?</strong> 25 km = 2.500.000 cm; ÖP = 2.500.000 ÷ 5 = 500.000 →
          ölçek 1/500.000.
        </li>
        <li>
          <strong>1/100.000 ölçekli haritada 2 cm² olan alan gerçekte kaç km²?</strong> GA = 2 × 100.000² = 2 × 10¹⁰ cm² = 2 km².
        </li>
        <li>
          <strong>1/200.000 ölçekli haritada 6 cm olan mesafe 1/600.000 ölçekli haritada kaç cm olur?</strong> 6 × 200.000 = HU₂ × 600.000
          → HU₂ = 2 cm. Ölçek 3 kat küçüldüğü için uzunluk 3 kat, alan 9 kat küçülür.
        </li>
      </ol>

      <h2 id="buyuk-kucuk">Büyük ve küçük ölçek</h2>
      <p>
        Ölçek paydası küçüldükçe ölçek büyür. Büyük ölçekli haritalar (örneğin 1/5.000 ya da 1/25.000) dar bir alanı çok ayrıntılı gösterir;
        şehir planları ve topoğrafya haritaları böyledir. Küçük ölçekli haritalar (örneğin 1/5.000.000) geniş alanları gösterir ama ayrıntı azdır;
        dünya ve kıta haritaları bu gruptadır. Aynı alanın iki haritadaki boyutu karşılaştırılırken uzunluklar paydaların oranıyla, alanlar bu
        oranın karesiyle değişir.
      </p>
      <p>
        Haritada ölçülen iki nokta arasındaki kuş uçuşu mesafeyi koordinatlarla doğrulamak için{" "}
        <Link href="/buyuk-daire-mesafesi-hesaplama">büyük daire mesafesi hesaplayıcısını</Link>, bir yerin koordinatını farklı biçimlere çevirmek
        için <Link href="/koordinat-donusturucu">koordinat dönüştürücüyü</Link> kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
