import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Mars Climate Orbiter neden kayboldu?",
    answer:
      "Uydunun üreticisi Lockheed Martin, itki verilerini pound-force-saniye (imperial birim) cinsinden gönderdi; NASA'nın Jet Propulsion Laboratory'deki yön bulma yazılımı ise bu veriyi newton-saniye (metrik birim) sanarak işledi. İki birim arasında yaklaşık 4,45 kat fark olduğu için uydunun yörünge hesapları dokuz aylık yolculuk boyunca giderek saptı.",
  },
  {
    question: "Bu hata ne kadara mal oldu?",
    answer:
      "Mars Climate Orbiter ve beraberindeki Mars Surveyor '98 programının toplam maliyeti yaklaşık 327 milyon dolardı. Uydu, Mars'a ulaştığında atmosfere planlanandan çok daha yakın bir rotaya girdi ve muhtemelen parçalanarak yok oldu.",
  },
  {
    question: "Hata neden fark edilmedi?",
    answer:
      "Dokuz aylık yolculuk boyunca yön bulma ekibi, uydunun rotasında küçük sapmalar olduğunu fark etti ve birkaç kez düzeltme yaptı. Ancak sapmaların gerçek nedeninin bir birim uyuşmazlığı olduğu, uydu Mars'a çok yaklaşana kadar anlaşılamadı — düzeltmeler sorunu gizlemiş, çözmemişti.",
  },
  {
    question: "Bu tür hatalar hâlâ yaşanıyor mu?",
    answer:
      "Evet. Farklı birim sistemlerinin (metrik/imperial) bir arada kullanıldığı her yerde bu risk vardır — mühendislik, havacılık, tıp ve lojistik gibi alanlarda benzer karışıklıklar günümüzde de yaşanabiliyor. Bu yüzden hesaplama yaparken kullanılan birimi açıkça belirtmek ve doğrulamak kritik önem taşır.",
  },
];

export const metadata: Metadata = {
  title: "Mars Climate Orbiter: 327 Milyon Dolarlık Birim Hatası",
  description:
    "NASA'nın Mars Climate Orbiter görevi, bir ekibin pound-force diğerinin newton kullanmasıyla nasıl 327 milyon dolarlık bir kayba dönüştü? Doğrulanmış kaynaklarla anlatım.",
  alternates: {
    canonical: "/birim-cevirme-felaketleri/mars-climate-orbiter",
  },
  openGraph: {
    title: "Mars Climate Orbiter: 327 Milyon Dolarlık Birim Hatası",
    description:
      "Bir ekip pound-force, diğeri newton kullandı — sonuç 327 milyon dolarlık bir uydunun kaybı oldu.",
    url: buildSiteUrl("/birim-cevirme-felaketleri/mars-climate-orbiter"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function MarsClimateOrbiterPage() {
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
        name: "Birim Çevirme Felaketleri",
        item: buildSiteUrl("/birim-cevirme-felaketleri"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Mars Climate Orbiter",
        item: buildSiteUrl("/birim-cevirme-felaketleri/mars-climate-orbiter"),
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
          <Link href="/birim-cevirme-felaketleri">Birim Çevirme Felaketleri</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Mars Climate Orbiter</span>
        </nav>

        <header className="all-conversions-header">
          <div className="disaster-hero-meta">
            <span className="disaster-category-badge">Uzay</span>
            <span className="disaster-year-badge">23 Eylül 1999</span>
          </div>
          <h1>Mars Climate Orbiter: 327 Milyon Dolarlık Birim Hatası</h1>
          <p>
            NASA&apos;nın Mars&apos;a gönderdiği bir uydu, tek bir ekibin
            pound-force diğerinin newton kullanmasıyla yörüngeden çıktı ve
            gezegenin atmosferinde parçalandı.
          </p>
        </header>

        <section className="category-article-content">
          <div className="disaster-fact-grid">
            <div>
              <span>Fırlatma</span>
              <strong>11 Aralık 1998</strong>
            </div>
            <div>
              <span>Kayıp</span>
              <strong>23 Eylül 1999</strong>
            </div>
            <div>
              <span>Toplam Maliyet</span>
              <strong>~327 milyon $</strong>
            </div>
            <div>
              <span>Neden</span>
              <strong>lbf·s / N·s karışıklığı</strong>
            </div>
          </div>

          <h2>Ne oldu?</h2>
          <p>
            Mars Climate Orbiter, Mars&apos;ın iklimini ve atmosferini
            incelemek için NASA&apos;nın Mars Surveyor &apos;98 programı
            kapsamında 11 Aralık 1998&apos;de fırlatıldı. Dokuz aylık bir
            yolculuğun ardından, 23 Eylül 1999&apos;da Mars yörüngesine
            girme manevrasını başlattı — ve bir daha hiç haber alınamadı.
            İncelemeler, uydunun planlanandan çok daha alçak bir rotaya
            girdiğini, muhtemelen atmosferde parçalandığını ya da geri
            sekerek uzaya savrulduğunu ortaya koydu.
          </p>

          <h2>Hata nasıl oluştu?</h2>
          <p>
            Uyduyu üreten Lockheed Martin&apos;deki itki (tahrik) ekibi,
            küçük yörünge düzeltme manevraları için gereken itki gücünü{" "}
            <strong>pound-force-saniye (lbf·s)</strong> — yani imperial
            birim sisteminde — hesaplayıp yazılıma girdi. Ancak
            NASA&apos;nın Jet Propulsion Laboratory&apos;sindeki (JPL) yön
            bulma yazılımı, bu verinin{" "}
            <strong>newton-saniye (N·s)</strong> — yani metrik birim
            sisteminde — olduğunu varsayarak işledi. 1 pound-force yaklaşık
            4,45 newton&apos;a eşit olduğu için, yapılan her küçük düzeltme
            gerçekte olması gerekenden yaklaşık 4,45 kat daha güçlü
            uygulanmış oldu.
          </p>

          <div className="disaster-pullquote">
            &quot;İki ekip de kendi hesaplarında haklıydı — sorun,
            aralarındaki arayüzün hangi birimin kullanıldığını hiç
            doğrulamamasıydı.&quot;
          </div>

          <h2>Hata neden fark edilmedi?</h2>
          <p>
            Dokuz aylık yolculuk boyunca yön bulma ekibi, uydunun
            beklenenden farklı bir rotada ilerlediğini fark etti ve
            birkaç kez küçük düzeltmeler yaptı. Ancak bu düzeltmeler
            sorunun kaynağını çözmek yerine belirtilerini bastırdı — asıl
            neden, uydu Mars&apos;a tehlikeli derecede yaklaşana kadar
            anlaşılamadı. Sonuç olarak uydu, planlanan ~150-226 km
            yerine çok daha alçak bir yükseklikten geçerek atmosferin
            direnciyle karşılaştı.
          </p>

          <h2>Bu bize ne öğretiyor?</h2>
          <p>
            Bu olay, birim çevirmenin sadece bir okul matematiği konusu
            değil, gerçek mühendislik projelerinde hayati bir kontrol
            noktası olduğunu gösteriyor. İki sistem veya ekip arasında
            veri paylaşılan her noktada, kullanılan birimin açıkça
            belirtilmesi ve doğrulanması gerekir — aksi halde her iki
            taraf da kendi hesabında haklı olsa bile sonuç tamamen yanlış
            çıkabilir. NASA, bu olaydan sonra yazılım arayüzlerinde birim
            doğrulamasını zorunlu hale getiren süreçler geliştirdi.
          </p>

          <p className="category-inline-link">
            İlgili araç:{" "}
            <Link href="/newton-pound-kuvvet">
              Newton ↔ Pound-force (lbf) çevirici
            </Link>{" "}
            ile bu olaydaki 4,45 katlık farkı kendin hesaplayabilirsin.
          </p>

          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Kaynaklar</h2>
          <p>
            Bu sayfadaki bilgiler NASA Jet Propulsion Laboratory&apos;nin
            resmi Mars Climate Orbiter arşivi ile olay hakkında yayınlanan
            mühendislik incelemelerine dayanmaktadır.
          </p>
        </section>
      </div>
    </main>
  );
}
