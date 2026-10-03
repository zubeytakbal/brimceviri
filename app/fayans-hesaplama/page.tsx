import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TileCalculator from "../components/TileCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { FayansKutuHesabi } from "../components/EvHesapEkleri";
import { FAYANS_KUTULARI, fayansKutu } from "../converter/evHesaplari";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "1 kutu fayans kaç metrekare?",
    answer:
      "Ölçüye ve üreticiye göre değişir; yaygın kutular 1,3–1,5 m²'dir. Örneğin 60x60 seramikte kutuda 4 adet (1,44 m²), 30x60'ta 8 adet (1,44 m²), 25x40'ta 15 adet (1,5 m²) bulunur. Kesin değer kutunun etiketinde yazar.",
  },
  {
    question: "1 kutu fayans kaç adet?",
    answer:
      "60x120'de 2, 60x60'ta 4, 45x45'te 7, 30x60'ta 8, 33x33'te 12, 25x40 ve 20x50'de 15 adet yaygındır.",
  },
  {
    question: "Fayans hesabında fire ne kadar olmalı?",
    answer:
      "Düz döşemede %10, çapraz (diyagonal) döşemede, çok köşeli odalarda ve büyük ebatlı (60x120) seramiklerde %15 alın. Aynı partiden almak için fazlasını baştan almak, sonradan tamamlamaktan iyidir.",
  },
  {
    question: "Duvar ve zemin fayansı için aynı hesap mı kullanılır?",
    answer:
      "Evet, formül aynıdır — tek fark kaplanacak alanı nasıl bulduğundur. Zeminde bu genelde oda uzunluğu × genişliği, duvarda ise duvar uzunluğu × yüksekliğidir.",
  },
  {
    question: "Fire payını neye göre seçmeliyim?",
    answer:
      "Dikdörtgen, köşesiz bir alanda %10 genelde yeterlidir. Oda köşeli/girintili ise, fayans çapraz döşenecekse veya desenli fayans kullanılacaksa %15-%20 aralığına çıkmak daha güvenlidir.",
  },
];

export const metadata: Metadata = {
  title: "Fayans Hesaplama: Kaç m², Kaç Kutu Fayans Gerekir?",
  description:
    "Alanı ve fayans ölçüsünü gir: fire dahil kaç adet fayans, kaç kutu alman gerektiğini hesapla. 1 kutu fayans kaç m²? 30x60, 60x60 ve 60x120 seramik kutu tablosu.",
  alternates: {
    canonical: "/fayans-hesaplama",
  },
  openGraph: {
    title: "Fayans Hesaplama: Kaç m², Kaç Kutu Fayans Gerekir?",
    description:
      "Kaplanacak alan ve fayans ebadından gereken fayans adedini hesaplayın.",
    url: buildSiteUrl("/fayans-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function TileCalculatorPage() {
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
        name: "Fayans Hesaplama",
        item: buildSiteUrl("/fayans-hesaplama"),
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
          <span>Fayans Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Fayans Hesaplama</h1>
          <p>
            Kaplanacak alanı ve fayansın en/boy ölçüsünü gir; kesim ve
            desen kaybı için fire payını ayarla. Sonuçta fayans başına
            düşen alanı, fire dahil toplam alanı ve gereken fayans
            adedini görürsün.
          </p>
        </header>

        <TileCalculator />

        <section className="category-article-content">
          <h2 id="kutu">Kaç kutu fayans almalıyım?</h2>
          <p>Fayans kutuyla satılır. Alanı, fayans ölçüsünü ve kutudaki adedi girin; fire dahil adet ve kutu sayısını görün.</p>
        </section>
        <FayansKutuHesabi />
        <section className="category-article-content">
          <h2 id="kutu-tablosu">1 kutu fayans kaç m²?</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Ölçü</th>
                  <th scope="col">Kutuda (yaygın)</th>
                  <th scope="col">1 kutu</th>
                  <th scope="col">10 m² için (%10 fire)</th>
                </tr>
              </thead>
              <tbody>
                {FAYANS_KUTULARI.map(({ olcu, adet }) => {
                  const r = fayansKutu(10, olcu[0], olcu[1], adet, 10)!;
                  return (
                    <tr key={olcu.join("x")}>
                      <th scope="row">
                        {olcu[0]}x{olcu[1]} cm
                      </th>
                      <td>{adet} adet</td>
                      <td>{r.kutuM2.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} m²</td>
                      <td>
                        {r.kutu} kutu ({r.adet} adet)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>Kutu içerikleri üreticiye göre değişebilir; satın alırken kutunun üzerindeki m² ve adet bilgisini esas alın.</p>
        </section>

        <section className="category-article-content">
          <h2>Fayans hesabında fire payı neden önemli?</h2>
          <p>
            Fayans döşerken duvar/zemin kenarlarında ve köşelerde kesim
            yapmak gerekir; bu kesimlerden çıkan parçalar genelde tekrar
            kullanılamaz. Ayrıca desenli veya büyük ebatlı fayanslarda
            hizalama kaybı da olur. Bu yüzden hesaplanan net alanın
            üzerine, basit dikdörtgen bir oda için %10, çok köşeli veya
            desenli döşemelerde %15-%20 fire payı eklemek pratikte daha
            gerçekçi sonuç verir.
          </p>

          <h2>Hesaplama nasıl yapılıyor?</h2>
          <p>
            Önce girdiğin en × boy ölçüsünden 1 fayansın kapladığı alan
            (m²) bulunur. Kaplanacak alan, seçtiğin fire payı oranıyla
            çarpılarak fire dahil toplam alana çevrilir. Son olarak bu
            alan, 1 fayansın alanına bölünüp yukarı yuvarlanarak gereken
            fayans adedi elde edilir — çünkü yarım fayans satın alınamaz,
            her zaman tam adede yuvarlamak gerekir.
          </p>
          <p>
            Fayanslar genelde kutu halinde ve kutu üzerinde yazan
            &quot;m²/kutu&quot; değeriyle satılır; mağazada kutu adedine
            geçerken buradaki &quot;fire dahil toplam alan&quot; sonucunu
            kutu başına düşen m² değerine bölmen yeterli.
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
            <Link href="/boya-hesaplama">Boya Hesaplama</Link>,{" "}
            <Link href="/duvar-kagidi-hesaplama">Duvar Kağıdı Hesaplama</Link>,{" "}
            <Link href="/tugla-hesaplama">Tuğla Hesaplama</Link>,{" "}
            <Link href="/parke-hesaplama">Parke Hesaplama</Link>,{" "}
            <Link href="/siva-hesaplama">Sıva Hesaplama</Link>.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Fire payı aralıkları, yaygın seramik/fayans üreticilerinin ve
            uygulama ustalarının döşeme rehberlerinde önerdiği pratik
            değerlerden derlenmiştir.
          </p>
        </section>
      </div>
    </main>
  );
}
