import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import EmbedCodeBox from "../components/EmbedCodeBox";
import SolarPanelPaybackCalculator from "../components/SolarPanelPaybackCalculator";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Güneş paneli kaç yılda kendini çıkarır?",
    answer:
      "Türkiye'de konut güneş enerjisi sistemlerinin amortisman süresi genellikle 4-7 yıl arasındadır; güneşlenmesi yüksek bölgelerde (Akdeniz, Ege, Güneydoğu) bu süre daha kısa, Karadeniz gibi bölgelerde daha uzun olur. Kendi sistem gücün, bölgen ve kurulum maliyetinle kesin süreyi yukarıdaki hesaplayıcıdan görebilirsin.",
  },
  {
    question: "1 kWp güneş paneli yılda ne kadar elektrik üretir?",
    answer:
      "Türkiye'de bölgeye göre değişmekle birlikte, 1 kWp'lik bir sistem yılda yaklaşık 1250-1700 kWh elektrik üretir. Akdeniz ve Güneydoğu Anadolu en yüksek, Karadeniz en düşük üretim değerlerine sahiptir.",
  },
  {
    question: "Fazla üretilen elektrik ne olur?",
    answer:
      "Şebekeye bağlı (on-grid) sistemlerde, tüketiminizi aşan üretim mahsuplaşma yoluyla şebekeye aktarılır ve genellikle perakende satış fiyatından daha düşük bir bedelle karşılığınıza yansır. Bu hesaplayıcı basitlik için tüm üretimin kendi tüketiminizde kullanıldığını varsayar; gerçek tasarrufunuz tüketim profilinize göre biraz farklı olabilir.",
  },
];

const AYLIK_TUKETIM = [150, 200, 250, 300, 400, 500];
const sayi = (n: number, basamak = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: basamak });

export const metadata: Metadata = {
  title: "Güneş Paneli Hesaplama: Eve Kaç Panel Gerekir, Kaç Yılda Çıkarır?",
  description:
    "Aylık elektrik tüketiminize göre eve kaç kW güneş paneli ve kaç panel gerektiğini, yıllık üretimi ve sistemin kaç yılda kendini çıkardığını hesaplayın.",
  alternates: {
    canonical: "/gunes-paneli-amortisman-hesaplama",
  },
  openGraph: {
    title: "Güneş Paneli Hesaplama: Eve Kaç Panel Gerekir?",
    description: "Kendi rakamlarınla güneş panelinin amortisman süresini hesapla.",
    url: buildSiteUrl("/gunes-paneli-amortisman-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function SolarPanelPaybackPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Güneş Paneli Amortisman Hesaplama", item: buildSiteUrl("/gunes-paneli-amortisman-hesaplama") },
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
          <span>Güneş Paneli Amortisman Hesaplama</span>
        </nav>

        <div className="page-top-row">
          <header className="all-conversions-header">
            <h1>Güneş Paneli Hesaplama: Kaç Panel Gerekir, Kaç Yılda Çıkarır?</h1>
            <p>
              Sistem gücün, bölgen ve elektrik fiyatınla güneş
              panelinin yıllık ürettiği elektriği, tasarrufu ve kaç
              yılda kendini çıkardığını hesapla.
            </p>
          </header>

          <EmbedCodeBox
            embedPath="/embed/gunes-paneli-amortisman-hesaplama"
            title="Güneş Paneli Amortisman Hesaplama"
            height={680}
            maxWidth={560}
          />
        </div>

        <SolarPanelPaybackCalculator />

        <section className="category-article-content">
          <h2 id="kac-panel">Eve kaç güneş paneli gerekir?</h2>
          <p>
            Hesabın başlangıcı faturanızdaki aylık tüketimdir. Yıllık tüketim, 1 kWp&apos;lik sistemin bulunduğunuz bölgede yılda
            ürettiği elektriğe bölününce gereken sistem gücü çıkar. Türkiye&apos;de bu üretim Karadeniz&apos;de alt sınıra,
            Akdeniz ve Güneydoğu&apos;da üst sınıra yakındır. Panel sayısı 450 W&apos;lık panelle hesaplandı.
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Aylık tüketim</th>
                  <th>Gereken güç</th>
                  <th>450 W panel</th>
                  <th>Çatı alanı</th>
                </tr>
              </thead>
              <tbody>
                {AYLIK_TUKETIM.map((t) => {
                  const ust = (t * 12) / 1250;
                  const alt = (t * 12) / 1700;
                  return (
                    <tr key={t}>
                      <td>{t} kWh</td>
                      <td>
                        {sayi(alt, 1)}–{sayi(ust, 1)} kWp
                      </td>
                      <td>
                        {Math.ceil(alt / 0.45)}–{Math.ceil(ust / 0.45)} adet
                      </td>
                      <td>
                        {sayi(Math.ceil(alt / 0.45) * 2.2)}–{sayi(Math.ceil(ust / 0.45) * 2.2)} m²
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>
            Çatı alanı panel başına yaklaşık 2,2 m² (panel ve aralık) alınarak hesaplandı. Kış aylarında gün kısa ve güneş alçak olduğu için üretim yaz aylarının belirgin biçimde altına
            düşer; bu yüzden yıllık hesabı tutan bir sistem, kış faturasını tek başına sıfırlamaz; aradaki fark şebekeyle
            mahsuplaşma yoluyla dengelenir. Gölge alan, kuzeye bakan ya da çok yatık çatılarda gerçek üretim tablodakinden
            düşük olur.
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
            Elektrik tüketimi hesaplamaları için{" "}
            <Link href="/elektrik-tuketimi-hesaplama">Elektrik Tüketimi Hesaplama</Link>
            {" "}sayfasına, yalıtım amortismanı için{" "}
            <Link href="/yalitim-amortisman-hesaplama">Yalıtım Amortisman Hesaplama</Link>
            {" "}sayfasına, diğer elektrikçi araçları için{" "}
            <Link href="/muhendislik-hesaplayicilari/elektrik-hesaplari">Elektrik Hesapları</Link>
            {" "}sayfasına, panelin öğle güneşine dik açısı için{" "}
            <Link href="/gunes-acisi-ve-golge-boyu-hesaplama">Güneş Açısı ve Gölge Boyu</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Bölgesel verim değerleri, Türkiye güneş enerjisi
            potansiyeli haritalarındaki tipik kWh/kWp/yıl
            aralıklarına dayanır.
          </p>
        </section>
      </div>
    </main>
  );
}
