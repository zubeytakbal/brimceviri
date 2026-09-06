import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "British Airways 5390'da ne oldu?",
    answer:
      "10 Haziran 1990'da bir bakım teknisyeni, uçağın kokpit camını değiştirirken 90 vidanın 84'ünü doğru ölçüden 0,66 mm daha ince seçti. Uçak 17.300 fitteyken kabin basıncı camı yerinden söktü ve kaptan koltuğundan yarı beline kadar dışarı fırladı.",
  },
  {
    question: "Vida hatası nasıl oluştu?",
    answer:
      "Teknisyen, deposundan doğru vidayı gözle seçmeye çalıştı — ölçüyü belgelerden doğrulamak yerine görsel olarak karşılaştırdı. Seçtiği vidalar doğru görünüyordu ama çapları 0,66 mm daha inceydi; bu küçük fark, kabin basıncına karşı yeterli tutma gücü sağlamadı.",
  },
  {
    question: "Kaptan hayatta kaldı mı?",
    answer:
      "Evet. Kabin memurları kaptanı bacaklarından tuttu ve uçak güvenli bir acil inişe geçene kadar dışarı düşmesini engelledi. Kaptan, soğuktan ve darbeden yaralar aldı ama tamamen iyileşti ve yıllar sonra tekrar uçmaya başladı.",
  },
  {
    question: "Bu olay havacılık bakım kurallarını nasıl değiştirdi?",
    answer:
      "Olay sonrası soruşturma, parça değişiminde görsel karşılaştırma yerine belgelenmiş ölçü doğrulamasının zorunlu hale getirilmesi gerektiğini vurguladı. Bugün havacılık bakımında kritik parçaların ölçüsü, gözle değil resmi parça numarasıyla doğrulanır.",
  },
];

export const metadata: Metadata = {
  title: "British Airways 5390: 0,66 Milimetrelik Vida Hatası",
  description:
    "Bir bakım teknisyeni kokpit camının vidalarını doğru ölçüden 0,66 mm ince seçince, cam uçuş sırasında patladı. Gerçek olay, doğrulanmış kaynaklarla.",
  alternates: {
    canonical: "/birim-cevirme-felaketleri/british-airways-5390",
  },
  openGraph: {
    title: "British Airways 5390: 0,66 Milimetrelik Vida Hatası",
    description:
      "0,66 milimetrelik bir ölçü farkı, kokpit camının uçuşta patlamasına yol açtı.",
    url: buildSiteUrl("/birim-cevirme-felaketleri/british-airways-5390"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function BritishAirways5390Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Birim Çevirme Felaketleri",
        item: buildSiteUrl("/birim-cevirme-felaketleri"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "British Airways 5390",
        item: buildSiteUrl("/birim-cevirme-felaketleri/british-airways-5390"),
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/birim-cevirme-felaketleri">Birim Çevirme Felaketleri</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>British Airways 5390</span>
        </nav>

        <header className="all-conversions-header">
          <div className="disaster-hero-meta">
            <span className="disaster-category-badge">Havacılık</span>
            <span className="disaster-year-badge">10 Haziran 1990</span>
          </div>
          <h1>British Airways 5390: 0,66 Milimetrelik Vida Hatası</h1>
          <p>
            Bir bakım teknisyeni kokpit camının vidalarını doğru ölçüden
            0,66 mm daha ince seçince, cam uçuş sırasında patladı ve
            kaptan yarı beline kadar dışarı fırladı.
          </p>
        </header>

        <section className="category-article-content">
          <div className="disaster-fact-grid">
            <div>
              <span>Uçuş</span>
              <strong>BA5390, BAC One-Eleven</strong>
            </div>
            <div>
              <span>İrtifa</span>
              <strong>17.300 fit</strong>
            </div>
            <div>
              <span>Hata</span>
              <strong>0,66 mm ince vida</strong>
            </div>
            <div>
              <span>Sonuç</span>
              <strong>Kaptan hayatta kaldı, can kaybı yok</strong>
            </div>
          </div>

          <h2>Ne oldu?</h2>
          <p>
            10 Haziran 1990&apos;da British Airways&apos;in bir BAC
            One-Eleven uçağı, Birmingham&apos;dan İspanya&apos;ya doğru
            17.300 fit irtifadayken kokpit ön camı aniden yerinden
            fırladı. Kabin basıncı farkı, Kaptan Tim Lancaster&apos;ı
            koltuğundan söküp neredeyse tamamen kokpit dışına savurdu.
            Kabin memurları onu bacaklarından yakalayıp tuttu.
          </p>

          <h2>Hata nasıl oluştu?</h2>
          <p>
            Olaydan kısa süre önce kokpit camı bakım için değiştirilmişti.
            Camı sabitleyen 90 vidadan{" "}
            <strong>84 tanesi, doğru çaptan 0,66 mm daha inceydi</strong>{" "}
            (yanlış standart: A211-8C yerine A211-8D); geri kalan 6 vida
            ise doğru çaptaydı ama 2,5 mm daha kısaydı. Teknisyen, doğru
            vidayı belgelerden veya parça numarasından doğrulamak yerine{" "}
            <strong>gözle karşılaştırarak</strong> seçmişti — vidalar
            neredeyse aynı görünüyordu ama küçük ölçü farkı, camın
            kabin basıncına karşı tutunma gücünü ciddi şekilde
            zayıflattı.
          </p>

          <div className="disaster-pullquote">
            &quot;0,66 milimetre — bir kalem ucunun kalınlığından bile
            ince bir fark — kokpit camının binlerce metre yükseklikte
            yerinden fırlamasına yetti.&quot;
          </div>

          <h2>Kaptan nasıl hayatta kaldı?</h2>
          <p>
            Kabin memuru Nigel Ogden, kaptanı bacaklarından sıkıca tuttu
            ve uçak acil iniş için alçalırken onu bırakmadı — soğuk
            rüzgar ve düşük sıcaklıkta yaklaşık 20 dakika dayandı.
            İkinci pilot uçağı güvenle Southampton Havalimanı&apos;na
            indirdi. Kaptan Lancaster, kırıklar ve donma yaraları
            aldı ama tamamen iyileşti ve birkaç ay içinde tekrar
            uçmaya başladı.
          </p>

          <h2>Bu bize ne öğretiyor?</h2>
          <p>
            Bu olay, bir ölçü hatasının mutlaka farklı birim
            sistemlerinden (metrik/imperial) kaynaklanmak zorunda
            olmadığını, aynı birim içinde bile &quot;yaklaşık doğru&quot;
            bir ölçünün yetersiz olabileceğini gösteriyor. Kritik bir
            parçanın ölçüsünü gözle doğrulamak yerine resmi belgeyle
            (parça numarası, teknik çizim) doğrulamak, havacılıkta bu
            olaydan sonra çok daha katı bir kural haline geldi.
          </p>

          <p className="category-inline-link">
            İlgili araç:{" "}
            <Link href="/milimetre-inc">Milimetre ↔ İnç çevirici</Link>{" "}
            ile bu olaydaki 0,66 mm&apos;lik farkı kendin hesaplayabilirsin.
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
            Bu sayfadaki bilgiler, olay hakkındaki resmi İngiliz Hava
            Kazaları İnceleme Kurulu (AAIB) raporuna dayanan yaygın,
            doğrulanmış havacılık tarihi anlatımlarına dayanmaktadır.
          </p>
        </section>
      </div>
    </main>
  );
}
