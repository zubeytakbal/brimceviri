import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { notFound } from "next/navigation";
import CountdownTimer from "../../components/time/CountdownTimer";
import TimeToolPage from "../../components/time/TimeToolPage";
import { timeRelated } from "../../components/time/timeRelatedLinks";
import type { FaqItem } from "../../converter/faqSchema";
import { parseTimerPresetSlug, timerPresetAlternates, timerPresetMinutes, timerPresetSlug } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

export const dynamicParams = false;

export function generateStaticParams() {
  return timerPresetMinutes.map((minutes) => ({ sure: timerPresetSlug.tr(minutes) }));
}

const presetLinks = Object.fromEntries(
  timerPresetMinutes.map((minutes) => [minutes, `/zamanlayici/${timerPresetSlug.tr(minutes)}`]),
);

// Sureye ozel kisa kullanim ornekleri: her hazir sayfaya kendi icerigini verir.
const usesByMinutes: Record<number, string[]> = {
  1: ["Hızlı esneme ya da plank", "1 dakikalık konuşma provası", "Diş fırçalamanın yarısı"],
  2: ["Diş fırçalama (önerilen süre)", "Hazır çay demleme", "Kısa nefes egzersizi"],
  3: ["Rafadan yumurta", "Poşet çay demleme", "Kısa sunum"],
  5: ["Mola (Pomodoro kısa ara)", "Hızlı ısınma", "Kafa dağıtma"],
  10: ["Katı yumurta", "Kısa meditasyon", "Hızlı ev toparlama"],
  15: ["Kestirme (power nap)", "Çay demleme", "Kısa sınav bölümü"],
  20: ["Kısa öğle uykusu", "Fırında sebze", "Okuma seansı"],
  25: ["Pomodoro çalışma bloğu", "Kek pişirme", "Odaklanmış çalışma"],
  30: ["Ders çalışma bloğu", "Yürüyüş", "Uzun Pomodoro arası"],
  45: ["Ders saati", "Antrenman", "Fırında tavuk"],
  60: ["Sınav süresi", "Uzun çalışma bloğu", "Fırında yemek"],
};

export async function generateMetadata({ params }: { params: Promise<{ sure: string }> }): Promise<Metadata> {
  const minutes = parseTimerPresetSlug((await params).sure);
  if (!minutes) return {};
  const path = `/zamanlayici/${timerPresetSlug.tr(minutes)}`;
  const title = `${minutes} Dakika Zamanlayıcı: Sesli Geri Sayım`;
  const description = `${minutes} dakikalık geri sayım hazır: başlat'a bas, süre bitince sesli uyarı al. Duraklat, +1 dakika ekle, tam ekran kullan.`;
  return {
    title,
    description,
    alternates: { canonical: path, ...timerPresetAlternates(minutes) },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default async function TimerPresetPage({ params }: { params: Promise<{ sure: string }> }) {
  const minutes = parseTimerPresetSlug((await params).sure);
  if (!minutes) notFound();
  const path = `/zamanlayici/${timerPresetSlug.tr(minutes)}`;
  const seconds = minutes * 60;

  const faqItems: FaqItem[] = [
    {
      question: `${minutes} dakika kaç saniye?`,
      answer: `${minutes} dakika = ${seconds.toLocaleString("tr-TR")} saniye = ${(minutes / 60).toLocaleString("tr-TR", { maximumFractionDigits: 3 })} saat.`,
    },
    {
      question: `${minutes} dakikalık zamanlayıcı arka planda çalışır mı?`,
      answer: "Evet, süre gerçek saate göre hesaplanır; başka sekmeye geçseniz de doğru anda biter. Yalnızca sekmeyi kapatmayın.",
    },
    {
      question: "Süreyi değiştirebilir miyim?",
      answer: `Evet. ${minutes} dakika yalnızca başlangıç değeridir; hazır sürelerden birini seçebilir ya da kendi sürenizi girebilirsiniz.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/zamanlayici", label: "Zamanlayıcı" },
        { href: path, label: `${minutes} Dakika` },
      ]}
      crumbLabel="Sayfa yolu"
      title={`${minutes} Dakika Zamanlayıcı`}
      intro={`${minutes} dakikalık (${seconds.toLocaleString("tr-TR")} saniye) geri sayım hazır. "Başlat"a bas; süre bitince sesli uyarı çalar.`}
      tool={<CountdownTimer locale="tr" initialSeconds={seconds} presetLinks={presetLinks} />}
      related={{ title: "Diğer süreler", links: timeRelated.tr.timers.filter((link) => link.href !== path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "kullanim", label: `${minutes} dakika nelere yeter?` },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="kullanim">{minutes} dakika nelere yeter?</h2>
      <ul>
        {(usesByMinutes[minutes] ?? []).map((use) => (
          <li key={use}>{use}</li>
        ))}
      </ul>
      <p>
        {minutes} dakika = {seconds.toLocaleString("tr-TR")} saniye. Farklı bir süre için ana{" "}
        <Link href="/zamanlayici">zamanlayıcıyı</Link> kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
