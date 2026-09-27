import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { notFound } from "next/navigation";
import AlarmClock from "../../components/time/AlarmClock";
import TimeToolPage from "../../components/time/TimeToolPage";
import { timeRelated } from "../../components/time/timeRelatedLinks";
import type { FaqItem } from "../../converter/faqSchema";
import { alarmPresetAlternates, alarmPresetSlug, alarmPresetTimes, trTimeLocative } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

export const dynamicParams = false;

export function generateStaticParams() {
  return alarmPresetTimes.map((time) => ({ saat: alarmPresetSlug.tr(time) }));
}

function findTime(slug: string) {
  return alarmPresetTimes.find((time) => alarmPresetSlug.tr(time) === slug) ?? null;
}

function addMinutes(time: string, delta: number) {
  const [h, m] = time.split(":").map(Number);
  const total = (((h * 60 + m + delta) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export async function generateMetadata({ params }: { params: Promise<{ saat: string }> }): Promise<Metadata> {
  const time = findTime((await params).saat);
  if (!time) return {};
  const path = `/online-alarm-kur/${alarmPresetSlug.tr(time)}`;
  const title = `Saat ${time} Alarm Kur: Tek Tıkla Çalar Saat`;
  const description = `Saat ${time} için alarm hazır: tek tıkla kur, sesi seç, ertele. Saat ${trTimeLocative(time)} kalkmak için ideal yatış saatleri de bu sayfada.`;
  return {
    title,
    description,
    alternates: { canonical: path, ...alarmPresetAlternates(time) },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default async function AlarmPresetPage({ params }: { params: Promise<{ saat: string }> }) {
  const time = findTime((await params).saat);
  if (!time) notFound();
  const path = `/online-alarm-kur/${alarmPresetSlug.tr(time)}`;
  const bedTimes = [6, 5, 4].map((cycles) => ({ cycles, bed: addMinutes(time, -15 - cycles * 90) }));

  const faqItems: FaqItem[] = [
    {
      question: `Saat ${trTimeLocative(time)} kalkmak için kaçta yatmalıyım?`,
      answer: `90 dakikalık uyku döngüleri ve 15 dakikalık uykuya dalma süresiyle: 6 döngü için ${bedTimes[0].bed}, 5 döngü için ${bedTimes[1].bed}, 4 döngü için ${bedTimes[2].bed}.`,
    },
    {
      question: `Saat ${time} alarmı sekme kapalıyken çalar mı?`,
      answer: "Hayır, alarm sekme açıkken çalışır. Sekmeyi arka planda bırakabilir, \"Ekranı açık tut\" ile cihazın uykuya geçmesini önleyebilirsiniz.",
    },
    {
      question: "Alarm saatini değiştirebilir miyim?",
      answer: `Evet. Saat ${time} yalnızca hazır değerdir; saat ve dakika seçicilerinden istediğiniz saati ayarlayabilirsiniz.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/online-alarm-kur", label: "Online Alarm" },
        { href: path, label: `${time} Alarm` },
      ]}
      crumbLabel="Sayfa yolu"
      title={`Saat ${time} Alarm Kur`}
      intro={`Alarm saati ${time} olarak hazırlandı. "Alarmı ekle"ye bas, gerekirse sesi ve etiketi değiştir. Aşağıda ${trTimeLocative(time)} dinç kalkmak için önerilen yatış saatlerini de bulabilirsin.`}
      tool={<AlarmClock locale="tr" initialTime={time} />}
      related={{ title: "Diğer alarm saatleri", links: timeRelated.tr.alarms.filter((link) => link.href !== path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "yatis", label: `${trTimeLocative(time)} kalkmak için yatış saati` },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="yatis">Saat {trTimeLocative(time)} kalkmak için kaçta yatmalı?</h2>
      <p>15 dakikalık uykuya dalma süresi dahil, 90 dakikalık döngülere göre:</p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>Döngü</th>
              <th>Uyku süresi</th>
              <th>Yatış saati</th>
            </tr>
          </thead>
          <tbody>
            {bedTimes.map(({ cycles, bed }) => (
              <tr key={cycles}>
                <td>{cycles} döngü</td>
                <td>{(cycles * 1.5).toLocaleString("tr-TR")} saat</td>
                <td>
                  <strong>{bed}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Farklı bir saat için <Link href="/uyku-hesaplama">uyku hesaplama</Link> aracını kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
