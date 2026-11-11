import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import BarVolumeCalculator from "../components/BarVolumeCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "1 oz kaç mL'dir?",
    answer: "1 ABD sıvı ons (fl oz) yaklaşık 29,57 mL'ye eşittir.",
  },
  {
    question: "Jigger ve pony ne kadar tutar?",
    answer:
      "Standart bir jigger genelde bir tarafta 1 oz (~3 cl), diğer tarafta 1,5 oz (~4,4 cl) ölçer. Pony ise tek başına 1 oz'luk bir ölçektir.",
  },
  {
    question: "Neden sıvı ons ile ağırlık onsu (oz) karıştırılmamalı?",
    answer:
      "İkisi de \"oz\" kısaltmasını kullanır ama tamamen farklı şeyleri ölçer: sıvı ons bir hacim birimidir (~29,57 mL), ağırlık onsu ise bir kütle birimidir (~28,35 g). Kokteyl tariflerinde geçen \"oz\" her zaman sıvı onstur.",
  },
];

// 1 ABD sivi onsu = 29,5735 mL (tanim: 1/128 ABD galonu).
const OZ_ML = 29.5735;
const OZ_SATIRLARI = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4];
const ml = (n: number, basamak = 1) => n.toLocaleString("tr-TR", { maximumFractionDigits: basamak });

export const metadata: Metadata = {
  title: "Kokteyl Ölçüsü Çevirici: Oz, mL, Cl",
  description:
    "Kokteyl ve bar ölçülerini oz (sıvı ons), mL ve cl arasında anında çevir; jigger ve pony gibi bar ölçeklerinin karşılıklarını gör.",
  alternates: {
    canonical: "/kokteyl-olcusu-cevirici",
  },
  openGraph: {
    title: "Kokteyl Ölçüsü Çevirici: Oz, mL, Cl",
    description: "Oz, mL ve cl arasında kokteyl ölçüsü çevir.",
    url: buildSiteUrl("/kokteyl-olcusu-cevirici"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function BarVolumeCalculatorPage() {

  return (
    <AracSayfasi
      yol="/kokteyl-olcusu-cevirici"
      baslik="Kokteyl Ölçüsü Çevirici"
      hesap={<BarVolumeCalculator />}
      sss={faqItems}
      serbestIcindekiler={[{"id":"oz-ml-cl-ceviri-tablosu","baslik":"Oz - mL - cl çeviri tablosu"},{"id":"ornek-tarifi-8-kisilik-surahiye-cevirmek","baslik":"Örnek: tarifi 8 kişilik sürahiye çevirmek"},{"id":"olcu-aletleri","baslik":"Ölçü aletleri"},{"id":"sik-yapilan-hatalar","baslik":"Sık yapılan hatalar"}]}
      serbestIcerik={
        <>
          <h2 id="oz-ml-cl-ceviri-tablosu">Oz - mL - cl çeviri tablosu</h2>
          <p>
            Kokteyl tariflerinde en sık geçen ölçüler aşağıdadır. Bar ölçekleri genellikle yuvarlanmış değerlerle işaretlenir;
            bu yüzden Avrupa&apos;da 1 oz çoğu zaman 30 mL, 1,5 oz da 45 mL olarak alınır. Tablonun son sütunu bu pratik değeri
            gösterir.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Sıvı ons (oz)</th>
                  <th>Tam karşılık (mL)</th>
                  <th>Santilitre (cl)</th>
                  <th>Bardaki pratik ölçü</th>
                </tr>
              </thead>
              <tbody>
                {OZ_SATIRLARI.map((oz) => (
                  <tr key={oz}>
                    <td>{ml(oz, 2)} oz</td>
                    <td>{ml(oz * OZ_ML)} mL</td>
                    <td>{ml((oz * OZ_ML) / 10, 2)} cl</td>
                    <td>{ml(oz * 30, 0)} mL</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 id="ornek-tarifi-8-kisilik-surahiye-cevirmek">Örnek: tarifi 8 kişilik sürahiye çevirmek</h2>
          <p>
            2 oz ana içki, 1 oz likör ve 0,75 oz taze limon suyu içeren tek kişilik bir ekşi kokteyl düşünün. Pratik ölçüyle
            bu 60 + 30 + 22,5 = 112,5 mL eder. 8 kişilik sürahi için her malzeme 8 ile çarpılır: 480 mL ana içki, 240 mL likör
            ve 180 mL limon suyu. Shaker ile çalkalanan kokteyllerde buz eriyerek hacme yaklaşık yüzde 20-25 su ekler; sürahide
            hazırlarken bu suyu tarife ayrıca eklemek ya da servis öncesi buzla karıştırmak gerekir.
          </p>
          <h2 id="olcu-aletleri">Ölçü aletleri</h2>
          <ul>
            <li>
              <strong>Jigger:</strong> İki uçlu metal ölçek. ABD tipinde uçlar genellikle 1 oz ve 1,5 oz (yaklaşık 30 ve 45 mL),
              Avrupa tipinde 20/40 mL ya da 25/50 mL&apos;dir. Kendi jigger&apos;ınızın ölçüsünü içindeki çizgilerden kontrol edin.
            </li>
            <li>
              <strong>Bar kaşığı:</strong> Yaklaşık 5 mL alır; şurup ve likör gibi az miktarlar için kullanılır.
            </li>
            <li>
              <strong>Dash:</strong> Bitter şişesinin bir sallanışıdır, standart bir hacmi yoktur; genellikle 1 mL&apos;nin altında kalır.
            </li>
            <li>
              <strong>Ülkelere göre tek ölçü:</strong> Birleşik Krallık&apos;ta barlarda satılan tek ölçü yasal olarak 25 mL ya da 35 mL&apos;dir;
              ABD tariflerindeki &quot;shot&quot; ise genellikle 1,5 oz&apos;tur.
            </li>
          </ul>
          <h2 id="sik-yapilan-hatalar">Sık yapılan hatalar</h2>
          <ul>
            <li>
              <strong>Ağırlık onsunu kullanmak:</strong> Mutfak terazisindeki oz bir kütle birimidir (28,35 g); tarifteki oz ise hacimdir.
            </li>
            <li>
              <strong>İngiliz sıvı onsunu ABD onsuyla karıştırmak:</strong> Eski İngiliz tariflerindeki imperial fl oz 28,41 mL&apos;dir;
              fark küçük görünse de büyük partilerde birikir.
            </li>
            <li>
              <strong>Oranı bozmak:</strong> Tarifi büyütürken tüm malzemeleri aynı katsayıyla çarpın; ekşi ve tatlı dengesi oranlara bağlıdır.
            </li>
          </ul>
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Diğer barmen araçları için{" "}
            <Link href="/hesaplayicilar#olcu-ve-gunluk">Mutfak, Beden ve Okul</Link>
            {" "}sayfasına, alkol yüzdesi ve standart içki hesaplama
            için{" "}
            <Link href="/abv-standart-icki-hesaplama">ABV ve Standart İçki Hesaplama</Link>
            {" "}sayfasına bakabilirsin.
          </p>
        </>
      }
    />
  );
}
