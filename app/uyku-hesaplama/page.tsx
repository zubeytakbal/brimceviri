import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import SleepCalculator from "../components/SleepCalculator";
import TableOfContents from "../components/TableOfContents";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { sleepGuideAlternates } from "../i18n/sleepGuidePaths";
import { buildSiteUrl } from "../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Neden 5 ve 6 döngü \"önerilen\" olarak işaretli?",
    answer:
      "Sağlık kuruluşlarının yetişkinler için önerdiği 7-9 saatlik uyku aralığına en yakın düşen döngü sayıları bunlardır (5 döngü ≈ 7,5 saat, 6 döngü ≈ 9 saat). 3-4 döngü (4,5-6 saat) de gösterilir ama düzenli olarak bu kadar az uyumak önerilmez — bu seçenekler daha çok tek seferlik zorunlu durumlar için bir referanstır.",
  },
  {
    question: "Bu hesap herkes için birebir doğru mu?",
    answer:
      "Hayır — döngü uzunluğu kişiden kişiye biraz değişebilir (75-120 dakika aralığında olabilir) ve yaş, stres, kafein gibi faktörler de uykuyu etkiler. Bu araç genel bir kılavuzdur, kesin bir tıbbi ölçüm değildir.",
  },
  {
    question: "Şimdi uyusam kaçta kalkmalıyım?",
    answer:
      "Şu anki saate yaklaşık 15 dakika uykuya dalma süresi ekleyin, sonra 90 dakikalık döngüleri ekleyin. Örneğin 23:00'te yatarsanız 5 döngü için 06:45'te, 6 döngü için 08:15'te kalkmak en rahatıdır. Hesaplayıcıda \"Şimdi yatarsam…\" altındaki düğmeye basmanız yeterli.",
  },
  {
    question: "6 saat uyku yeterli mi?",
    answer:
      "Yetişkinler için önerilen süre 7-9 saattir. 6 saat (4 döngü) ara sıra idare eder ama düzenli olarak yetersiz kalır; dikkat, ruh hali ve bağışıklık üzerinde olumsuz etkiler görülebilir.",
  },
  {
    question: "Öğle uykusu ne kadar olmalı?",
    answer:
      "Kısa bir şekerleme için 10-20 dakika derin uykuya geçmeden uyanmanızı sağlar. Daha uzun uyuyacaksanız yaklaşık 90 dakikalık tam bir döngü tercih edin; 30-60 dakika arası uyanmak sersemlik hissi yaratabilir.",
  },
  {
    question: "REM uykusu ne kadar sürer?",
    answer:
      "REM, yetişkinlerde toplam uykunun yaklaşık dörtte birini oluşturur. Gecenin ilk döngülerinde birkaç dakika sürer, sabaha doğru her döngüde uzar; bu yüzden uykuyu kısaltmak en çok REM evresini azaltır.",
  },
];

const FALL_ASLEEP_MINUTES = 15;
const CYCLE_MINUTES = 90;

function clock(totalMinutes: number) {
  const minutes = ((totalMinutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

const wakeTimes = [5 * 60 + 30, 6 * 60, 6 * 60 + 30, 7 * 60, 7 * 60 + 30, 8 * 60, 8 * 60 + 30, 9 * 60];
const bedTimes = [21 * 60 + 30, 22 * 60, 22 * 60 + 30, 23 * 60, 23 * 60 + 30, 24 * 60, 24 * 60 + 30, 25 * 60];
const cycleColumns = [6, 5, 4];

const ageRecommendations = [
  ["Yeni doğan (0-3 ay)", "14-17 saat"],
  ["Bebek (4-11 ay)", "12-15 saat"],
  ["1-2 yaş", "11-14 saat"],
  ["3-5 yaş", "10-13 saat"],
  ["6-13 yaş", "9-11 saat"],
  ["14-17 yaş", "8-10 saat"],
  ["18-64 yaş", "7-9 saat"],
  ["65 yaş ve üzeri", "7-8 saat"],
];

const tocItems = [
  { id: "uyku-dongusu", label: "Uyku döngüsü ve REM" },
  { id: "yatis-tablosu", label: "Kalkış saatine göre yatış tablosu" },
  { id: "kalkis-tablosu", label: "Yatış saatine göre kalkış tablosu" },
  { id: "kac-saat", label: "Yaşa göre kaç saat uyumalıyım?" },
  { id: "hesaplama", label: "Hesaplama nasıl yapılıyor?" },
  { id: "uykuya-dalma", label: "Uykuya dalma payı" },
  { id: "ipuclari", label: "Daha iyi uyku için ipuçları" },
  { id: "sss", label: "Sık sorulan sorular" },
];

export const metadata: Metadata = {
  title: "Uyku Hesaplama: Kaçta Yatmalı, Kaçta Kalkmalıyım?",
  description:
    "Kalkmak istediğin saati (ya da yatacağın saati) gir: 90 dakikalık uyku döngülerine göre en dinlenmiş uyanacağın saatleri anında hesapla.",
  alternates: {
    canonical: "/uyku-hesaplama",
    ...sleepGuideAlternates(),
  },
  openGraph: {
    title: "Uyku Hesaplama: Kaçta Yatmalı, Kaçta Kalkmalıyım?",
    description:
      "90 dakikalık uyku döngülerine göre ideal yatış ve kalkış saatlerini hesaplayın.",
    url: buildSiteUrl("/uyku-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function SleepCalculatorPage() {
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
        name: "Uyku Hesaplama",
        item: buildSiteUrl("/uyku-hesaplama"),
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
          <span>Uyku Hesaplama</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Uyku Hesaplama</h1>
          <p>
            Kalkmak istediğin saati gir (ya da yatacağın saati): 90
            dakikalık uyku döngülerine göre hangi saatte uyursan daha
            dinlenmiş uyanacağını gör. 5-6 döngü (7,5-9 saat) genel
            olarak önerilen aralıktır.
          </p>
        </header>

        <SleepCalculator />

        <TableOfContents items={tocItems} />

        <section className="category-article-content">
          <h2 id="uyku-dongusu">Uyku döngüsü ve REM: neden döngü sayısı önemli?</h2>
          <p>
            Uyku, yaklaşık 90 dakika süren tekrarlayan döngülerden oluşur. Her döngüde önce hafif uyku (N1, N2), ardından derin uyku
            (N3) ve en sonda rüyaların görüldüğü REM evresi gelir. Gecenin başında derin uyku uzun, REM kısadır; sabaha doğru bu
            denge tersine döner.
          </p>
          <p>
            Bir döngünün ortasında, özellikle derin uyku evresinde uyanmak kendinizi sersemlemiş hissetmenize yol açar. Bu yüzden
            toplam süre kadar, tam bir döngünün sonunda uyanmak da önemlidir. Hesaplayıcı, hedef saatinize göre tam döngüyle biten
            saatleri önerir.
          </p>

          <h2 id="yatis-tablosu">Kalkış saatine göre yatış saati tablosu</h2>
          <p>15 dakikalık uykuya dalma süresi dahil. 5-6 döngü (7,5-9 saat) yetişkinler için önerilen aralıktır.</p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Kalkış</th>
                  {cycleColumns.map((cycles) => (
                    <th key={cycles}>
                      {cycles} döngü ({(cycles * 1.5).toLocaleString("tr-TR")} sa)
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {wakeTimes.map((wake) => (
                  <tr key={wake}>
                    <td>
                      <strong>{clock(wake)}</strong>
                    </td>
                    {cycleColumns.map((cycles) => (
                      <td key={cycles}>{clock(wake - FALL_ASLEEP_MINUTES - cycles * CYCLE_MINUTES)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="kalkis-tablosu">Yatış saatine göre kalkış saati tablosu</h2>
          <p>&quot;Şimdi uyusam kaçta kalkmalıyım?&quot; sorusunun hazır cevabı. Yine 15 dakikalık uykuya dalma süresi eklenmiştir.</p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Yatış</th>
                  {cycleColumns.map((cycles) => (
                    <th key={cycles}>
                      {cycles} döngü ({(cycles * 1.5).toLocaleString("tr-TR")} sa)
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bedTimes.map((bed) => (
                  <tr key={bed}>
                    <td>
                      <strong>{clock(bed)}</strong>
                    </td>
                    {cycleColumns.map((cycles) => (
                      <td key={cycles}>{clock(bed + FALL_ASLEEP_MINUTES + cycles * CYCLE_MINUTES)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="kac-saat">Yaşa göre kaç saat uyumalıyım?</h2>
          <p>National Sleep Foundation&apos;ın (2015) yaş gruplarına göre önerdiği günlük uyku süreleri:</p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Yaş grubu</th>
                  <th>Önerilen uyku</th>
                </tr>
              </thead>
              <tbody>
                {ageRecommendations.map(([group, hours]) => (
                  <tr key={group}>
                    <td>{group}</td>
                    <td>{hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="hesaplama">Hesaplama nasıl yapılıyor?</h2>
          <p>
            &quot;Kaçta yatmalıyım?&quot; sorusunda kalkış saatinizden geriye doğru 15 dakika uykuya dalma süresi ve 3, 4, 5 ya da 6
            döngü × 90 dakika çıkarılır. Örneğin 07:00&apos;de kalkmak için 5 döngü: 07:00 − 7 saat 30 dakika − 15 dakika = 23:15.
            &quot;Kaçta kalkmalıyım?&quot; sorusunda aynı hesap ileri yönde yapılır.
          </p>

          <h2 id="uykuya-dalma">Uykuya dalma payı</h2>
          <p>
            Sağlıklı bir yetişkin genellikle 10-20 dakikada uykuya dalar; hesaplayıcı ortalama 15 dakika kullanır. Daha hızlı
            uyuyorsanız saatleri birkaç dakika kaydırabilirsiniz. Düzenli olarak 30 dakikadan uzun süre uyuyamıyorsanız bir sağlık
            uzmanına danışmanız önerilir.
          </p>

          <h2 id="ipuclari">Daha iyi uyku için ipuçları</h2>
          <ul>
            <li>Hafta sonu dahil her gün aynı saatte yatıp kalkın; vücut saati düzenli programa uyum sağlar.</li>
            <li>Kafeini yatmadan en az 6 saat önce bırakın.</li>
            <li>Yatmadan önceki saatte ekran ışığını azaltın; yatak odasını karanlık, sessiz ve serin tutun.</li>
            <li>Ağır yemeği ve yoğun egzersizi yatmadan hemen önce yapmayın.</li>
            <li>Öğle uykusunu kısa (10-20 dakika) tutun ve akşamüstüne bırakmayın.</li>
          </ul>

          <h2 id="sss">Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Kaynaklar</h2>
          <p>
            Yaşa göre uyku süreleri: National Sleep Foundation, &quot;How Much Sleep Do We Really Need?&quot; (Hirshkowitz ve ark.,
            Sleep Health, 2015). 90 dakikalık ortalama döngü süresi ve uykuya dalma süresi genel uyku hijyeni kaynaklarına dayanır. Bu
            sayfa genel bilgi içindir, tıbbi tavsiye yerine geçmez.
          </p>
        </section>
      </div>
    </main>
  );
}
