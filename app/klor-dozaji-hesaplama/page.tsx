import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ChlorineDoseCalculator from "../components/ChlorineDoseCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Klor dozajı nasıl hesaplanır?",
    answer:
      "ppm, mg/L'ye eşittir. Gereken saf klor miktarı (mg) = (Hedef Klor - Mevcut Klor) ppm × Havuz Hacmi (litre). Bu değer 1000'e bölünerek grama çevrilir, ardından ürünün aktif klor yüzdesine bölünerek toplam ürün miktarı bulunur.",
  },
  {
    question: "Hedef klor seviyesi ne olmalı?",
    answer:
      "Yüzme havuzlarında serbest klor genelde 1-3 ppm aralığında tutulur; şoklama gibi özel durumlarda bu değer çok daha yüksek olabilir. Bu araç hedef değeri belirlemez — sen bunu havuz bakım rehberinden veya yerel mevzuattan almalısın.",
  },
  {
    question: "Ürünün aktif klor yüzdesi nereden bulunur?",
    answer:
      "Sıvı klor genelde %12-15, granül kalsiyum hipoklorit genelde %65-70 aktif klor içerir. Bu değer ürünün ambalajında/etiketinde belirtilir.",
  },
];

const HACIMLER = [10, 25, 50, 75, 100];
const URUNLER: Array<[string, number]> = [
  ["Sıvı", 12],
  ["Dikloro toz", 56],
  ["Granül", 65],
  ["Tablet", 90],
];
const sayi = (n: number, basamak = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: basamak });
/** m³ × ppm = gram saf klor; ürün miktarı = saf klor ÷ aktif oran. */
const gram = (m3: number, ppm: number, oran: number) => {
  const g = (m3 * ppm) / (oran / 100);
  return g >= 1000 ? `${sayi(g / 1000, 2)} kg` : `${sayi(g)} g`;
};

export const metadata: Metadata = {
  title: "Klor Dozajı Hesaplama (Havuz)",
  description:
    "Havuz hacmi, mevcut ve hedef klor seviyesinden, ürünün aktif klor yüzdesine göre gereken klor ürünü miktarını (gram) hesapla.",
  alternates: {
    canonical: "/klor-dozaji-hesaplama",
  },
  openGraph: {
    title: "Klor Dozajı Hesaplama (Havuz)",
    description: "Havuz hacmi ve klor seviyesinden ürün miktarını hesapla.",
    url: buildSiteUrl("/klor-dozaji-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function ChlorineDoseCalculatorPage() {

  return (
    <AracSayfasi
      yol="/klor-dozaji-hesaplama"
      baslik="Klor Dozajı Hesaplama"
      hesap={<ChlorineDoseCalculator />}
      sss={faqItems}
      serbestIcindekiler={[{"id":"havuza-kac-gram-klor-atilir","baslik":"Havuza kaç gram klor atılır?"},{"id":"ornek-8-4-m-villa-havuzu","baslik":"Örnek: 8 × 4 m villa havuzu"},{"id":"serbest-bagli-ve-toplam-klor","baslik":"Serbest, bağlı ve toplam klor"},{"id":"basvuru-degerleri-ve-guvenlik","baslik":"Başvuru değerleri ve güvenlik"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="havuza-kac-gram-klor-atilir">Havuza kaç gram klor atılır?</h2>
          <p>
            1 ppm, her litre suda 1 mg klor demektir; 1 m³ (1 ton) su için bu 1 gram saf klor eder. Ürünler saf klor
            olmadığından gereken miktar, ürünün aktif klor oranına bölünür. Tabloda sıvı sodyum hipoklorit, dikloro toz, kalsiyum hipoklorit
            granül ve trikloro tablet için yaygın aktif klor oranları kullanıldı. Tablo, serbest kloru <strong>1 ppm
            yükseltmek</strong> için gereken ürün miktarını gösterir; 2 ppm için değerleri ikiyle, 3 ppm için üçle çarpın.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Hacim</th>
                  {URUNLER.map(([ad, oran]) => (
                    <th key={ad}>
                      {ad} (%{oran})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HACIMLER.map((m3) => (
                  <tr key={m3}>
                    <td>{m3} m³</td>
                    {URUNLER.map(([ad, oran]) => (
                      <td key={ad}>{gram(m3, 1, oran)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Satıştaki ürünlerin etiketleri de aynı aritmetiği kullanır: %56 aktif klorlu toz ürün için 100 m³ suda 1 ppm
            karşılığı yaklaşık 180 g, %90&apos;lık üründe yaklaşık 111 g yazar. Kendi ürününüzün oranı farklıysa yukarıdaki
            araca etiketteki yüzdeyi girin. Sıvı klor gramla değil litreyle ölçülür; %12&apos;lik sıvının litresi yaklaşık 1,2 kg
            geldiğinden tablodaki gram değerini 1.200&apos;e bölerek litreye çevirebilirsiniz.
          </p>
          <h2 id="ornek-8-4-m-villa-havuzu">Örnek: 8 × 4 m villa havuzu</h2>
          <p>
            Ortalama derinliği 1,5 m olan 8 × 4 m&apos;lik havuz {sayi(8 * 4 * 1.5)} m³ su alır. Test kiti serbest kloru 0,5 ppm
            gösteriyorsa ve 2 ppm hedefleniyorsa fark 1,5 ppm&apos;dir. Bu, {sayi(48 * 1.5)} g saf klor demektir; %90&apos;lık
            tablet kullanılıyorsa {gram(48, 1.5, 90)}, %56&apos;lık toz kullanılıyorsa {gram(48, 1.5, 56)} ürün gerekir. Havuz
            hacmini bilmiyorsanız önce <Link href="/havuz-hacmi-hesaplama">havuz hacmi hesaplama</Link> aracını kullanın.
          </p>
          <h2 id="serbest-bagli-ve-toplam-klor">Serbest, bağlı ve toplam klor</h2>
          <p>
            Test kitlerinde iki ayrı değer görürsünüz. <strong>Serbest klor</strong> suyu dezenfekte etmeye hâlâ hazır olan
            klordur; dozaj hesabı bu değer üzerinden yapılır. <strong>Bağlı klor</strong> ter, idrar ve kozmetik kalıntılarıyla
            birleşmiş, etkisi azalmış klordur ve havuzdaki keskin &quot;klor kokusunun&quot; asıl kaynağıdır. İkisinin toplamı
            <strong> toplam klor</strong>dur. Toplam ile serbest arasındaki fark büyüdüğünde, yani bağlı klor birikince, düzenli
            dozaj yerine şok klorlama gündeme gelir.
          </p>
          <h2 id="basvuru-degerleri-ve-guvenlik">Başvuru değerleri ve güvenlik</h2>
          <p>
            Dünya Sağlık Örgütü&apos;nün yüzme suyu kılavuzu, halka açık havuzlarda serbest klorun 3 mg/L&apos;yi (3 ppm)
            aşmamasını ve pH&apos;ın 7,2–7,8 aralığında tutulmasını önerir; ABD Hastalık Kontrol Merkezleri&apos;nin model
            havuz kodu ise havuzlarda en az 1 ppm serbest klor ister. Türkiye&apos;de halka açık havuzlar ayrıca Sağlık
            Bakanlığı&apos;nın yüzme havuzları yönetmeliğine tabidir. pH yükseldikçe klorun etkisi azaldığından, klor eklemeden
            önce pH&apos;ı ölçmek dozajı boşa harcamamayı sağlar.
          </p>
          <p>
            Farklı klor ürünlerini kuru hâlde birbirine karıştırmayın; özellikle kalsiyum hipoklorit ile trikloro tabletin bir
            araya gelmesi tehlikeli tepkimeye yol açabilir. Ürünü suya ekleyin, ürünün üzerine su dökmeyin ve dozlamayı havuz
            kullanılmıyorken yapın.
          </p>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Diğer havuz teknisyeni araçları için{" "}
            <Link href="/hesaplayicilar#ev-ve-yapi">Ev, İnşaat ve Bahçe</Link>
            {" "}sayfasına, havuz hacmi hesaplama için{" "}
            <Link href="/havuz-hacmi-hesaplama">Havuz Hacmi Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Hesaplar ppm (mg/L) tanımına dayanır. Başvuru değerleri: WHO, <em>Guidelines for Safe Recreational Water
            Environments, Volume 2: Swimming Pools and Similar Environments</em> (2006); CDC, <em>Model Aquatic Health
            Code</em>. Bu araç havuz bakım danışmanlığı yerine geçmez; hedef klor seviyesini belirlemez.
          </p>
        </>
      }
    />
  );
}
