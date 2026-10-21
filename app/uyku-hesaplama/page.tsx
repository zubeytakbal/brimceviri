import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import SaatKabugu from "../components/saat/SaatKabugu";
import UykuSaat from "../components/time/UykuSaat";
import UykuSahneleri, { kalkisIcin, saatYaz, yatisIcin } from "../components/time/UykuSahneleri";
import type { FaqItem } from "../converter/faqSchema";
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
    question: "Bir uyku döngüsü kaç dakika?",
    answer:
      "Bir uyku döngüsü ortalama 90 dakikadır (kişiye göre 75-120 dakika). Her döngü hafif uyku, derin uyku ve REM evrelerinden oluşur; döngü sonunda uyanmak, derin uykunun ortasında uyanmaktan çok daha az sersemletir.",
  },
  {
    question: "Günde kaç saat uyumalıyım?",
    answer:
      "Yetişkinler (18-64 yaş) için 7-9 saat, 65 yaş üstü için 7-8 saat, 14-17 yaş için 8-10 saat önerilir. Bebeklerde ihtiyaç çok daha fazladır: yeni doğan 14-17, 4-11 aylık bebek 12-15 saat uyur. Yaşa göre tablonun tamamı aşağıda.",
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

// Sık aranan "sabah X'te kalkmak için" ve "gece X'te yatarsam" soruları; cevaplar formülden hesaplanır.
// Bulunma eki saatin okunuşuna göre: beşte, altıda, yedide, sekizde.
const EK: Record<number, string> = { 5: "te", 6: "da", 7: "de", 8: "de" };
const kalkisSorulari: FaqItem[] = [5, 6, 7, 8].map((h) => ({
  question: `Sabah ${h}'${EK[h]} kalkmak için kaçta yatmalıyım?`,
  answer: `${saatYaz(h * 60)}'${EK[h]} dinç kalkmak için 5 döngü (7,5 saat) uyku isteniyorsa ${yatisIcin(h * 60, 5)}'te, 6 döngü (9 saat) isteniyorsa ${yatisIcin(h * 60, 6)}'te yatın. Daha geç yatmanız gerekiyorsa 4 döngü için ${yatisIcin(h * 60, 4)} da tam döngüyle biter, ama düzenli olarak 6 saat uyku önerilmez.`,
}));
const yatisSorulari: FaqItem[] = [
  [22 * 60, "Gece 10'da (22:00)"],
  [23 * 60, "Gece 11'de (23:00)"],
  [24 * 60, "Gece 12'de (00:00)"],
  [25 * 60, "Gece 1'de (01:00)"],
].map(([dk, ad]) => ({
  question: `${ad} yatarsam kaçta kalkmalıyım?`,
  answer: `5 döngü (7,5 saat) için ${kalkisIcin(dk as number, 5)}, 6 döngü (9 saat) için ${kalkisIcin(dk as number, 6)} en rahat kalkış saatleridir; 4 döngüyle ${kalkisIcin(dk as number, 4)}'te kalkabilirsiniz. Hesaba 15 dakikalık uykuya dalma süresi dahildir.`,
}));
const tumSorular: FaqItem[] = [...faqItems.slice(0, 3), ...kalkisSorulari, ...yatisSorulari, ...faqItems.slice(3)];

export const metadata: Metadata = {
  title: { absolute: "Uyku Hesaplama: Şimdi Uyusam Kaçta Kalkmalıyım?" },
  description:
    "Şimdi uyusan kaçta kalkmalısın, sabah 7'de kalkmak için kaçta yatmalısın? Tek tıkla 90 dakikalık uyku döngülerine göre dinç uyanacağın saatler. Ücretsiz.",
  alternates: {
    canonical: "/uyku-hesaplama",
    ...sleepGuideAlternates(),
  },
  openGraph: {
    title: "Uyku Hesaplama: Şimdi Uyusam Kaçta Kalkmalıyım?",
    description:
      "90 dakikalık uyku döngülerine göre ideal yatış ve kalkış saatlerini hesaplayın.",
    url: buildSiteUrl("/uyku-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function SleepCalculatorPage() {
  return (
    <SaatKabugu
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/uyku-hesaplama", label: "Uyku Hesaplama" },
      ]}
      faqItems={tumSorular}
      hero={<UykuSaat />}
      sahneler={<UykuSahneleri />}
    >
      <h2 id="uyku-dongusu">Uyku döngüsü ve REM: neden döngü sayısı önemli?</h2>
      <p>
        Uyku, yaklaşık 90 dakika süren tekrarlayan döngülerden oluşur. Her döngüde önce hafif uyku (N1, N2), ardından derin uyku (N3) ve
        en sonda rüyaların görüldüğü REM evresi gelir. Gecenin başında derin uyku uzun, REM kısadır; sabaha doğru bu denge tersine döner.
      </p>
      <p>
        Bir döngünün ortasında, özellikle derin uyku evresinde uyanmak kendinizi sersemlemiş hissetmenize yol açar. Bu yüzden toplam süre
        kadar, tam bir döngünün sonunda uyanmak da önemlidir. Hesaplayıcı, hedef saatinize göre tam döngüyle biten saatleri önerir;
        sonuçlardaki &quot;alarm kur&quot; bağlantısı <Link href="/online-alarm-kur">online alarmı</Link> o saate ayarlar.
      </p>

      <h2 id="hesaplama">Hesaplama nasıl yapılıyor?</h2>
      <p>
        &quot;Kaçta yatmalıyım?&quot; sorusunda kalkış saatinizden geriye doğru 15 dakika uykuya dalma süresi ve 3, 4, 5 ya da 6 döngü × 90
        dakika çıkarılır. Örneğin 07:00&apos;de kalkmak için 5 döngü: 07:00 − 7 saat 30 dakika − 15 dakika = 23:15. &quot;Kaçta
        kalkmalıyım?&quot; sorusunda aynı hesap ileri yönde yapılır. &quot;Kaç saat uyudum?&quot; hesabı yatakta geçen süreden 15 dakika düşer
        ve kalanı 90 dakikalık döngülere böler.
      </p>

      <h2 id="uykuya-dalma">Uykuya dalma payı</h2>
      <p>
        Sağlıklı bir yetişkin genellikle 10-20 dakikada uykuya dalar; hesaplayıcı ortalama 15 dakika kullanır. Daha hızlı uyuyorsanız
        saatleri birkaç dakika kaydırabilirsiniz. Düzenli olarak 30 dakikadan uzun süre uyuyamıyorsanız bir sağlık uzmanına danışmanız
        önerilir.
      </p>

      <h2 id="ipuclari">Daha iyi uyku için ipuçları</h2>
      <ul>
        <li>Hafta sonu dahil her gün aynı saatte yatıp kalkın; vücut saati düzenli programa uyum sağlar.</li>
        <li>Kafeini yatmadan en az 6 saat önce bırakın.</li>
        <li>Yatmadan önceki saatte ekran ışığını azaltın; yatak odasını karanlık, sessiz ve serin tutun.</li>
        <li>Ağır yemeği ve yoğun egzersizi yatmadan hemen önce yapmayın.</li>
        <li>Öğle uykusunu kısa (10-20 dakika) tutun ve akşamüstüne bırakmayın.</li>
      </ul>

      <h2 id="kaynaklar">Kaynaklar</h2>
      <p>
        Yaşa göre uyku süreleri: National Sleep Foundation, &quot;How Much Sleep Do We Really Need?&quot; (Hirshkowitz ve ark., Sleep
        Health, 2015). 90 dakikalık ortalama döngü süresi ve uykuya dalma süresi genel uyku hijyeni kaynaklarına dayanır. Bu sayfa genel
        bilgi içindir, tıbbi tavsiye yerine geçmez.
      </p>
    </SaatKabugu>
  );
}
