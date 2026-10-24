import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import KeresteCalculator from "../components/KeresteCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Kereste metreküp hesabı nasıl yapılır?",
    answer:
      "Kereste hacmi, uzunluk (m) × genişlik (cm/100) × kalınlık (cm/100) formülüyle hesaplanır. Birden fazla kereste parçası için her parçanın hacmi adediyle çarpılıp toplanır.",
  },
  {
    question: "Fire oranı neden ekleniyor?",
    answer:
      "Kesim, planyalama ve işleme sırasında kereste hacminin bir kısmı kayıp olarak gider. Bu kaybı karşılamak için sipariş verirken hesaplanan hacme genelde %5-10 arasında bir fire oranı eklenir.",
  },
];

export const metadata: Metadata = {
  title: "Kereste Metreküp Hesaplama",
  description:
    "Kereste parçalarının uzunluk, genişlik, kalınlık ve adedinden toplam hacmi (m³) ve fire dahil toplamı hesapla.",
  alternates: {
    canonical: "/kereste-hesaplama",
    languages: {
      "uz-UZ": "/uz/yogoch-hajmi-hisoblash",
    },
  },
  openGraph: {
    title: "Kereste Metreküp Hesaplama",
    description: "Kereste hacmini hesaplayın.",
    url: buildSiteUrl("/kereste-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

/** [en, kalınlık] cm */
const KESITLER: Array<[number, number]> = [
  [10, 2.5],
  [15, 2.5],
  [20, 2.5],
  [5, 5],
  [10, 5],
  [15, 5],
  [20, 5],
  [10, 10],
];

const AGIRLIK: Array<[string, number, number]> = [
  ["Ladin", 430, 470],
  ["Göknar", 420, 460],
  ["Sarıçam", 490, 550],
  ["Kayın", 690, 750],
  ["Meşe", 650, 760],
];

const TOMRUK_CAPLARI = [20, 25, 30, 35, 40, 50];
const tomruk = (capCm: number, boyM: number) => Math.PI * (capCm / 200) ** 2 * boyM;
const hacim = (boyM: number, enCm: number, kalinlikCm: number) => boyM * (enCm / 100) * (kalinlikCm / 100);
const sayi = (n: number, basamak = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: basamak });

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function KerestePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Kereste Metreküp Hesaplama", item: buildSiteUrl("/kereste-hesaplama") },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Kereste Metreküp Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kereste Metreküp Hesaplama</h1>
          <p>
            Kereste parçalarının uzunluk, genişlik, kalınlık ve
            adedini gir: toplam hacmi ve fire dahil toplamı anında
            hesapla.
          </p>
        </header>

        <KeresteCalculator />

        <section className="category-article-content">
          <h2>1 m³ kereste kaç adet çıkar?</h2>
          <p>
            Kereste depoları fiyatı çoğunlukla metreküp (halk arasında &quot;mikap&quot;) üzerinden verir, şantiyede ise parça sayılır. Aşağıdaki tablo iki
            hesabı birbirine bağlar: bir metreküpün kaç parçaya denk geldiğini ve tek parçanın hacmini gösterir. Değerler
            yalnızca geometriden hesaplandı; fire ve kesim payı dahil değildir.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Kesit (cm)</th>
                  <th>3 m boyda 1 m³</th>
                  <th>4 m boyda 1 m³</th>
                  <th>4 m&apos;lik 1 parça</th>
                </tr>
              </thead>
              <tbody>
                {KESITLER.map(([en, kalinlik]) => (
                  <tr key={`${kalinlik}x${en}`}>
                    <td>
                      {sayi(kalinlik, 1)} × {sayi(en)}
                    </td>
                    <td>{sayi(1 / hacim(3, en, kalinlik), 1)} adet</td>
                    <td>{sayi(1 / hacim(4, en, kalinlik), 1)} adet</td>
                    <td>{sayi(hacim(4, en, kalinlik), 4)} m³</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Tablodan bir pratik kural da çıkar: kesit yarıya inince aynı metreküpe sığan parça sayısı iki katına çıkar. 5 × 10
            cm&apos;lik 4 metrelik bir parçanın hacmi {sayi(hacim(4, 10, 5), 3)} m³ olduğundan bir metreküp, 50 parça demektir.
          </p>

          <h2>Yuvarlak kütük (tomruk) hacmi</h2>
          <p>
            Henüz biçilmemiş tomrukta hacim, kütüğü silindir sayarak bulunur: orta çap ölçülür ve{" "}
            <strong>Hacim = π × (Çap / 2)² × Boy</strong> uygulanır. Tomruk iki ucunda farklı kalınlıkta olduğu için ölçü,
            kabuk dışında ve boyun tam ortasından alınır. Biçilince bu hacmin tamamı keresteye dönüşmez; kabuk, kenar ve testere
            payı ayrılır.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Orta çap (cm)</th>
                  <th>3 m boy</th>
                  <th>4 m boy</th>
                </tr>
              </thead>
              <tbody>
                {TOMRUK_CAPLARI.map((cap) => (
                  <tr key={cap}>
                    <td>{cap}</td>
                    <td>{sayi(tomruk(cap, 3), 3)} m³</td>
                    <td>{sayi(tomruk(cap, 4), 3)} m³</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Kaba ölçü ve planyalı ölçü farkı</h2>
          <p>
            Satışta söylenen &quot;5 × 10&quot; çoğu zaman biçildiği andaki kaba ölçüdür. Kereste kuruyunca biraz çeker,
            planyadan geçince de her yüzünden birkaç milimetre alınır. Bu yüzden elinizdeki parçayı metreyle ölçüp araca o
            ölçüyü girmek, kâğıttaki ölçüyle hesaplamaktan daha doğru sonuç verir. Fiyat kaba ölçü üzerinden kesildiyse
            hesabı da kaba ölçüyle yapın; ikisini karıştırmak metreküpte birkaç yüzdelik fark doğurur.
          </p>

          <h2>Kereste ne kadar ağır?</h2>
          <p>
            Taşıma ve iskele planı için hacmin yanında ağırlık da gerekir. Hava kurusu (yaklaşık %12 nem) kerestede metreküp
            ağırlığı türe göre aşağıdaki aralıklarda değişir; yaş kereste bunun belirgin biçimde üstündedir.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Ağaç türü</th>
                  <th>1 m³ (kg)</th>
                  <th>4 m 5 × 10 tek parça (kg)</th>
                </tr>
              </thead>
              <tbody>
                {AGIRLIK.map(([tur, alt, ust]) => (
                  <tr key={tur}>
                    <td>{tur}</td>
                    <td>
                      {sayi(alt)}–{sayi(ust)}
                    </td>
                    <td>
                      {sayi(alt * hacim(4, 10, 5), 1)}–{sayi(ust * hacim(4, 10, 5), 1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Örnek: çatı merteği siparişi</h2>
          <p>
            Bir çatı için 4 metrelik 24 adet 5 × 10 cm mertek gerektiğini düşünelim. Tek parça {sayi(hacim(4, 10, 5), 3)} m³
            olduğundan 24 parça {sayi(24 * hacim(4, 10, 5), 2)} m³ eder. Kesim ve budaklı parçalar için %8 pay eklenince
            sipariş {sayi(24 * hacim(4, 10, 5) * 1.08, 3)} m³ olur. Çam kerestede bu hacmin ağırlığı yaklaşık{" "}
            {sayi(24 * hacim(4, 10, 5) * 490)}–{sayi(24 * hacim(4, 10, 5) * 550)} kg&apos;dır; kamyonet kasasına sığıp
            sığmayacağını da bu rakamla kontrol edebilirsiniz.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlgili araçlar</h2>
          <p>
            Diğer ev ve yapı araçları için{" "}
            <Link href="/hesaplayicilar#ev-ve-yapi">Ev, İnşaat ve Bahçe</Link>{" "}
            bölümüne, hacim birimleri arasında genel dönüşüm için{" "}
            <Link href="/kategoriler/hacim">Hacim Dönüşümleri</Link>{" "}
            sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Hacim tabloları dikdörtgen prizma formülüyle hesaplandı. Ağırlık aralıkları, ağaç malzeme başvuru kitaplarında
            (USDA Forest Products Laboratory, <em>Wood Handbook</em>; Wagenführ, <em>Holzatlas</em>) hava kurusu yoğunluk için
            verilen değerlerin yuvarlatılmış hâlidir. Tek bir partinin gerçek ağırlığı nem ve yetişme yerine göre değişir.
          </p>
        </section>
      </div>
    </main>
  );
}
