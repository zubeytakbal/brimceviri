import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { calculateAltitudeEffect } from "../converter/mountainAltitudeEffect";
import { getAllMountains } from "../converter/mountainsHub";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Dünyanın en yüksek dağları nereden veri alıyor?",
    answer:
      "Yükseklik, göreli yükseklik (prominence) ve ilk tırmanış tarihleri Wikipedia/Wikidata kaynaklı, çapraz kontrol edilmiş değerlerdir.",
  },
  {
    question: "Neden sadece 8.000 metre üzeri zirveler var?",
    answer:
      "Dünyadaki tüm 8.000 metre üzeri zirveler ('eight-thousanders') doğal, tanınmış bir set oluşturur — hepsi Himalaya ve Karakoram sıradağlarında bulunur.",
  },
];

export const metadata: Metadata = {
  title: "Dünyanın En Yüksek Dağları: 8.000 Metre Üzeri Zirveler",
  description:
    "Everest, K2 ve dünyadaki tüm 8.000 metre üzeri 14 zirvenin yüksekliğini, göreli yüksekliğini, ilk tırmanış tarihini ve zirvede hava basıncının deniz seviyesine göre yüzdesini karşılaştır.",
  alternates: {
    canonical: "/dunyanin-en-yuksek-daglari",
  },
  openGraph: {
    title: "Dünyanın En Yüksek Dağları",
    description:
      "8.000 metre üzeri 14 zirvenin yüksekliğini, göreli yüksekliğini ve ilk tırmanış tarihini karşılaştır.",
    url: buildSiteUrl("/dunyanin-en-yuksek-daglari"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MountainsHubPage() {
  const mountains = getAllMountains().slice().sort((a, b) => b.elevationM - a.elevationM);
  const himalaya = mountains.filter((m) => m.rangeTr === "Himalaya").length;
  const karakoram = mountains.filter((m) => m.rangeTr === "Karakoram").length;
  const nepal = mountains.filter((m) => m.countriesTr.includes("Nepal")).length;
  const enYuksek = mountains[0];
  const enAlcak = mountains[mountains.length - 1];
  const enDusukGoreli = mountains.reduce((a, b) => (b.prominenceM < a.prominenceM ? b : a));
  const yillar = (key: "firstAscentYear" | "firstWinterAscentYear") => {
    const list = mountains.map((m) => m[key]);
    return [Math.min(...list), Math.max(...list)];
  };
  const ilkTirmanis = yillar("firstAscentYear");
  const kis = yillar("firstWinterAscentYear");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Dünyanın En Yüksek Dağları", item: buildSiteUrl("/dunyanin-en-yuksek-daglari") },
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
          <span>Dünyanın En Yüksek Dağları</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Dünyanın En Yüksek Dağları</h1>
          <p>
            Dünyadaki {mountains.length} adet 8.000 metre üzeri zirvenin
            yüksekliğini, göreli yüksekliğini (prominence), ilk tırmanış
            tarihini ve zirvede hava basıncının deniz seviyesine göre
            yüzdesini karşılaştır.
          </p>
        </header>

        <section className="category-article-content">
          <h2>Zirveler (yüksekliğe göre sıralı)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Dağ</th>
                  <th>Yükseklik</th>
                  <th>Göreli yükseklik</th>
                  <th>Sıradağ / ülke</th>
                  <th>İlk tırmanış</th>
                  <th>İlk kış tırmanışı</th>
                  <th>Zirvede basınç</th>
                </tr>
              </thead>
              <tbody>
                {mountains.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <Link href={`/dunyanin-en-yuksek-daglari/${m.id}`}>{m.nameTr}</Link>
                    </td>
                    <td>{m.elevationM.toLocaleString("tr-TR")} m</td>
                    <td>{m.prominenceM.toLocaleString("tr-TR")} m</td>
                    <td>
                      {m.rangeTr} · {m.countriesTr.join(", ")}
                    </td>
                    <td>{m.firstAscentYear}</td>
                    <td>{m.firstWinterAscentYear}</td>
                    <td>%{Math.round(calculateAltitudeEffect(m.elevationM)?.percentOfSeaLevel ?? 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Rakamlarla 14 zirve</h2>
          <p>
            Zirvelerin {himalaya} tanesi Himalaya&apos;da, {karakoram} tanesi Karakoram&apos;dadır; {nepal} tanesi tamamen ya da
            kısmen Nepal sınırları içindedir. En yüksek zirve {enYuksek.nameTr} ({enYuksek.elevationM.toLocaleString("tr-TR")} m) ile
            listenin sonundaki {enAlcak.nameTr} ({enAlcak.elevationM.toLocaleString("tr-TR")} m) arasındaki fark{" "}
            {(enYuksek.elevationM - enAlcak.elevationM).toLocaleString("tr-TR")} metredir. İlk tırmanışlar {ilkTirmanis[0]} ile{" "}
            {ilkTirmanis[1]} arasındaki {ilkTirmanis[1] - ilkTirmanis[0]} yıla sığar; kışın ilk kez tırmanılması ise çok daha uzun
            sürmüştür: ilk kış zirvesi {kis[0]}, sonuncusu {kis[1]} yılında yapılmıştır.
          </p>

          <h2>Yükseklik ile göreli yükseklik farkı</h2>
          <p>
            Yükseklik, zirvenin deniz seviyesinden ölçülen boyudur. Göreli yükseklik (prominence) ise zirveden, daha yüksek bir
            komşu zirveye geçmek için inilmesi gereken en düşük noktaya kadar olan farktır; bir dağın çevresinden ne kadar
            &quot;bağımsız&quot; yükseldiğini gösterir. Everest dünyanın en yüksek noktası olduğu için göreli yüksekliği kendi
            yüksekliğine eşittir. {enDusukGoreli.nameTr} ise {enDusukGoreli.elevationM.toLocaleString("tr-TR")} m yüksekliğine karşın
            yalnızca {enDusukGoreli.prominenceM.toLocaleString("tr-TR")} m göreli yüksekliğe sahiptir, çünkü komşu bir zirveye bağlı
            bir sırt üzerinde yükselir.
          </p>

          <h2>Ölüm bölgesi ve hava basıncı</h2>
          <p>
            Dağcılıkta 8.000 metrenin üstü &quot;ölüm bölgesi&quot; olarak anılır: hava basıncı ve dolayısıyla soluduğunuz
            havadaki oksijenin kısmi basıncı deniz seviyesinin yaklaşık üçte birine iner ve insan vücudu bu yükseklikte uzun
            süre uyum sağlayamaz. Tablodaki basınç yüzdeleri Uluslararası Standart Atmosfer (ICAO) formülüyle hesaplanmıştır;
            gerçek değer hava durumuna ve mevsime göre birkaç yüzde değişebilir. Türkiye&apos;deki yükseklikleri karşılaştırmak
            için <Link href="/il-rakimlari">il rakımları</Link> sayfasına bakabilirsiniz.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>
      </div>
    </main>
  );
}
