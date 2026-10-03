import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PaintCalculator from "../components/PaintCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { BoyaKiloHesabi } from "../components/EvHesapEkleri";
import { EV_BOYA_KATSAYI } from "../converter/evHesaplari";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "1 kg boya kaç metrekare boyar?",
    answer:
      "Plastik iç cephe boyalarında tek katta genellikle 10–14 m², iki katta 5–7 m² boyar. Kesin değer kutunun üzerinde \"m²/kg\" olarak yazar; yüzey ilk kez boyanıyorsa ya da astar yoksa sarfiyat artar.",
  },
  {
    question: "100 m² eve kaç kilo boya gider?",
    answer:
      "100 m² bir dairede duvarlar ve tavanlar toplam yaklaşık 350 m² eder. İki kat ve 12 m²/kg sarfiyatla yaklaşık 58 kg, yani 4 adet 15 kg'lık kutu gerekir. Tavanı ayrı boyayla boyayacaksanız duvarlar için yaklaşık 250 m² hesaplayın.",
  },
  {
    question: "1 kilo boya kaç litre?",
    answer:
      "Su bazlı plastik boyada 1 kg yaklaşık 0,7 litredir (yoğunluk 1,3–1,5 kg/L). 15 kg'lık bir kutu yaklaşık 10–11 litre eder.",
  },
  {
    question: "Boya kaç kat atılmalı?",
    answer:
      "Renk değişmiyorsa genellikle 2 kat yeterlidir. Koyudan açığa geçerken ya da yeni sıvada önce astar, sonra 2 kat boya önerilir.",
  },
  {
    question: "Neden tavanı ayrı işaretlemem gerekiyor?",
    answer:
      "Çoğu boyama işinde tavan ayrı bir boya (genelde mat, farklı renk) ile yapılır ve bazen hiç boyanmaz. Bu yüzden varsayılan olarak hesaba dahil edilmez; dahil etmek istersen kutuyu işaretlemen yeterli.",
  },
  {
    question: "Kaç kat boya sürmeliyim?",
    answer:
      "Açık renkten açık renge geçişte tek kat yeterli olabilir; koyu bir rengin üstünü açık renkle kapatmak veya sıva/alçı gibi emici yeni bir yüzeye boyamak için iki kat önerilir. Emin değilsen iki katı seçmek daha güvenlidir.",
  },
];

export const metadata: Metadata = {
  title: "Boya Hesaplama: Kaç Kilo Boya Gerekir? 1 kg Boya Kaç m² Boyar?",
  description:
    "Odanın ölçülerinden boyanacak alanı, gereken boyayı kilo ve litre olarak, kaç kutu alacağını hesapla. 1 kg boya kaç m² boyar, 100 m² eve kaç kilo boya gider?",
  alternates: {
    canonical: "/boya-hesaplama",
  },
  openGraph: {
    title: "Boya Hesaplama: Kaç Kilo Boya Gerekir? 1 kg Boya Kaç m² Boyar?",
    description:
      "Oda ölçülerinden net duvar alanını ve gereken boya miktarını hesaplayın.",
    url: buildSiteUrl("/boya-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PaintCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: buildSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Boya Hesaplama",
        item: buildSiteUrl("/boya-hesaplama"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildFaqSchema(faqItems)),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Boya Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Boya Hesaplama</h1>
          <p>
            Oda uzunluğu, genişliği ve duvar yüksekliğini gir; kapı ve
            pencere sayısını seç. Net duvar alanını, kat sayısına göre
            gereken boya litresini ve en yakın kutu kombinasyonunu anında
            görürsün.
          </p>
        </header>

        <PaintCalculator />

        <section className="category-article-content">
          <h2 id="kilo">Kaç kilo boya gerekir?</h2>
          <p>Türkiye&apos;de boya çoğunlukla kilo ile satılır. Boyanacak alanı, kat sayısını ve kutudaki sarfiyatı girin; kilo, litre ve alınacak kutuları görün.</p>
        </section>
        <BoyaKiloHesabi />
        <section className="category-article-content">
          <h2 id="ev">Eve kaç kilo boya gider?</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Ev (taban alanı)</th>
                  <th scope="col">Boyanacak alan (duvar + tavan)</th>
                  <th scope="col">2 kat boya</th>
                </tr>
              </thead>
              <tbody>
                {[50, 75, 90, 100, 120, 150].map((m2) => {
                  const a = m2 * EV_BOYA_KATSAYI;
                  return (
                    <tr key={m2}>
                      <th scope="row">{m2} m²</th>
                      <td>yaklaşık {Math.round(a)} m²</td>
                      <td>
                        {Math.round((a * 2) / 14)}–{Math.round((a * 2) / 10)} kg
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>Tablo, duvar alanını taban alanının yaklaşık 2,5 katı, tavanı taban kadar kabul eder ve 10–14 m²/kg sarfiyatla hesaplar. Kendi evinizin ölçüleriyle yukarıdaki hesaplayıcı daha doğrudur.</p>
        </section>

        <section className="category-article-content">
          <h2>1 litre boya kaç m² alanı boyar?</h2>
          <p>
            Bu tamamen boyanın cinsine ve yüzeye bağlıdır; su bazlı iç cephe
            boyalarında tek kat için genel ortalama 8-10 m²/litre, iki kat
            uygulamada ise 4-5 m²/litre civarındadır. En doğru rakam her
            zaman kullandığın boya kutusunun etiketinde &quot;m²/litre&quot;
            olarak yazılıdır — hesaplayıcıdaki &quot;Boya Verimi&quot;
            alanına o değeri gir, sonuç ona göre yeniden hesaplanır.
          </p>

          <h2>Hesaplama nasıl yapılıyor?</h2>
          <p>
            Önce brüt duvar alanı bulunur: <strong>2 × (uzunluk + genişlik) × yükseklik</strong>.
            Ardından kapı başına ortalama 1,6 m², pencere başına ortalama
            1,5 m² düşülerek net boyanacak alan elde edilir. Tavan da
            işaretlenirse uzunluk × genişlik kadar alan buna eklenir.
            Sonuç, seçtiğin kat sayısıyla çarpılıp girdiğin verime
            bölünerek litre cinsinden boya miktarına dönüştürülür.
          </p>
          <p>
            Kapı ve pencere alanları standart ev ölçülerine göre alınmış
            ortalamalardır; alışılmadık büyüklükte açıklıkların olduğu
            odalarda sonuç birkaç litre sapabilir. Hesap sonucunu kutu
            adedine yuvarlarken doğal olarak küçük bir fire payı da
            oluşur — yine de köşe/kenar boyamada kullanılan fırça kaybı ve
            ikinci kat için ekstra ihtiyaç olabileceğinden, sınırda
            kalıyorsan bir sonraki kutu boyutuna yuvarlamak güvenlidir.
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
            Aynı yenileme projesinde işine yarayabilecek diğer araçlar:{" "}
            <Link href="/fayans-hesaplama">Fayans Hesaplama</Link>,{" "}
            <Link href="/duvar-kagidi-hesaplama">Duvar Kağıdı Hesaplama</Link>,{" "}
            <Link href="/tugla-hesaplama">Tuğla Hesaplama</Link>,{" "}
            <Link href="/parke-hesaplama">Parke Hesaplama</Link>,{" "}
            <Link href="/siva-hesaplama">Sıva Hesaplama</Link>.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Formüldeki alan hesabı ve tipik verim aralıkları, DYO, Filli
            Boya ve Weber gibi üreticilerin yayımladığı boya hesaplama
            rehberlerinden derlenmiştir; kesin sarfiyat için her zaman
            kullandığın ürünün etiketindeki değeri esas al.
          </p>
        </section>
      </div>
    </main>
  );
}
