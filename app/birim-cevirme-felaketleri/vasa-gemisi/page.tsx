import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Vasa gemisi neden battı?",
    answer:
      "Vasa'nın esas batma nedeni, üst güvertelerine konan çok sayıda ağır top ve heykelin gemiyi tepeden ağır ve dengesiz hale getirmesiydi. Ölçü birimi karışıklığı bu dengesizliğe katkıda bulunan bir faktördü, ama tek başına batışın sebebi değildi.",
  },
  {
    question: "Ölçü birimi karışıklığı ne şekilde etkiledi?",
    answer:
      "Geminin gövdesini inşa eden marangozlardan bazıları İsveç ayağını (12 parmak/inç), bazıları ise Amsterdam ayağını (11 parmak/inç) kullandı. Bu, geminin iki yanının simetrik olmamasına, ağırlığın bir tarafa (iskele tarafına) kaymasına neden oldu.",
  },
  {
    question: "Gemi ne kadar sürede battı?",
    answer:
      "Vasa, 10 Ağustos 1628'de ilk seferine çıktı ve limandan henüz 1300 metre kadar uzaklaşmışken hafif bir rüzgar esintisiyle yan yattı. Açık top deliklerinden su dolmaya başladı ve gemi yaklaşık 20 dakika içinde battı.",
  },
  {
    question: "Vasa şimdi nerede?",
    answer:
      "Gemi 1961'de Stockholm limanından çıkarıldı ve büyük ölçüde orijinal haliyle korunmuş durumda. Bugün Stockholm'deki Vasa Müzesi'nde sergileniyor ve dünyanın en çok ziyaret edilen deniz müzelerinden biri.",
  },
];

export const metadata: Metadata = {
  title: "Vasa Gemisi: İki Farklı 'Ayak' Ölçüsüyle İnşa Edilen Savaş Gemisi",
  description:
    "İsveç'in gururu Vasa savaş gemisi, marangozların bir yanda İsveç ayağını diğer yanda Amsterdam ayağını kullanmasıyla asimetrik çıktı ve ilk seferinde battı.",
  alternates: {
    canonical: "/birim-cevirme-felaketleri/vasa-gemisi",
  },
  openGraph: {
    title: "Vasa Gemisi: İki Farklı 'Ayak' Ölçüsüyle İnşa Edilen Savaş Gemisi",
    description:
      "Marangozların iki farklı 'ayak' ölçüsü kullanması, geminin asimetrik çıkmasına katkıda bulundu.",
    url: buildSiteUrl("/birim-cevirme-felaketleri/vasa-gemisi"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function VasaGemisiPage() {
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
        name: "Vasa Gemisi",
        item: buildSiteUrl("/birim-cevirme-felaketleri/vasa-gemisi"),
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
          <span>Vasa Gemisi</span>
        </nav>

        <header className="all-conversions-header">
          <div className="disaster-hero-meta">
            <span className="disaster-category-badge">Denizcilik</span>
            <span className="disaster-year-badge">10 Ağustos 1628</span>
          </div>
          <h1>Vasa Gemisi: İki Farklı &apos;Ayak&apos; Ölçüsüyle İnşa Edilen Savaş Gemisi</h1>
          <p>
            İsveç&apos;in gururu Vasa savaş gemisi, tekne bir yanı İsveç
            ayağı diğer yanı Amsterdam ayağı ile inşa edildiği için
            asimetrik çıktı ve ilk seferinde limanda battı.
          </p>
        </header>

        <section className="category-article-content">
          <div className="disaster-fact-grid">
            <div>
              <span>Konum</span>
              <strong>Stockholm Limanı</strong>
            </div>
            <div>
              <span>Batış Süresi</span>
              <strong>~20 dakika</strong>
            </div>
            <div>
              <span>Katkıda Bulunan Neden</span>
              <strong>İsveç/Amsterdam ayağı karışıklığı</strong>
            </div>
            <div>
              <span>Bugün</span>
              <strong>Vasa Müzesi, Stockholm</strong>
            </div>
          </div>

          <h2>Ne oldu?</h2>
          <p>
            Vasa, dönemin en güçlü ve gösterişli savaş gemilerinden biri
            olması için inşa edilmiş 64 toplu bir İsveç savaş gemisiydi.
            10 Ağustos 1628&apos;de, Stockholm limanında büyük bir
            kalabalığın önünde ilk seferine çıktı. Ama limandan henüz
            1300 metre kadar uzaklaşmışken hafif bir rüzgar esintisiyle
            yana yattı, açık top deliklerinden içeri su doldu ve gemi
            yaklaşık 20 dakika içinde battı.
          </p>

          <h2>Ölçü birimi karışıklığının rolü neydi?</h2>
          <p>
            Arkeologlar, geminin enkazını incelerken tekneyi inşa eden
            marangozların dört farklı cetvel kullandığını buldu: ikisi{" "}
            <strong>İsveç ayağı</strong> (12 parmak/inç) birimindeydi,
            diğer ikisi ise <strong>Amsterdam ayağı</strong> (11
            parmak/inç) birimindeydi. Her marangoz kendi cetveliyle
            çalıştığı için, geminin gövdesi iki yanda farklı
            ölçülerde şekillendi — bu da ağırlığın iskele tarafına
            (bir yana) kaymasına ve teknenin asimetrik olmasına katkıda
            bulundu.
          </p>

          <div className="disaster-pullquote">
            &quot;Ölçü birimi karışıklığı, batışın tek nedeni değildi —
            ama zaten dengesiz olan bir gemiyi daha da kırılgan hale
            getiren sessiz bir faktördü.&quot;
          </div>

          <h2>Asıl neden neydi?</h2>
          <p>
            Geminin esas sorunu tasarımıydı: kral&apos;ın isteğiyle üst
            güvertelere çok sayıda ağır top ve süsleme amaçlı ağır
            heykeller eklendi, bu da geminin ağırlık merkezini
            tehlikeli derecede yükseltti. Yeterli balast (denge ağırlığı)
            olmadan bu kadar üst-ağır bir gemi, hafif bir rüzgarda bile
            devrilmeye çok yatkındı. Ölçü birimi karışıklığından
            kaynaklanan asimetri, bu zaten kırılgan dengeyi daha da
            kötüleştiren ek bir faktördü — ana sebep değil, ama
            görmezden gelinemeyecek bir katkı.
          </p>

          <h2>Bu bize ne öğretiyor?</h2>
          <p>
            Vasa örneği, aynı projede farklı ölçü standartlarının bir
            arada kullanılmasının, tek başına bir felakete yol açmasa
            bile, mevcut riskleri nasıl büyütebileceğini gösteriyor.
            17. yüzyılda Avrupa&apos;da standart bir ölçü birimi sistemi
            henüz yoktu — bu, metrik sistemin evrensel kabul görmesinin
            neden bu kadar önemli olduğunu hatırlatan tarihi bir örnek.
          </p>

          <p className="category-inline-link">
            İlgili sayfa:{" "}
            <Link href="/tarihi-olcu-birimleri">
              Tarihi Ölçü Birimleri
            </Link>{" "}
            — standart öncesi dönemde kullanılan farklı ölçü sistemlerini
            keşfet.
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
            Bu sayfadaki bilgiler, Vasa Müzesi&apos;nin arkeolojik
            bulguları ve geminin inşası üzerine yapılan tarihi
            mühendislik incelemelerine dayanmaktadır.
          </p>
        </section>
      </div>
    </main>
  );
}
