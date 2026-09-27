import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { timerPresetLinks, timerPresetPath, timerPresets, trLik, type TimerPreset } from "../../i18n/timerPresets";
import CountdownTimer from "./CountdownTimer";
import TimeToolPage from "./TimeToolPage";

// Hazir sure sayfasi (TR + EN): 10 saniyeden 24 saate. Her surenin kendi kullanim
// ornekleri, donusum tablosu ve komsu surelere linkleri vardir.

const cap = (text: string) => text.replace(/^(\d+) (\p{L})/u, (_, n: string, c: string) => `${n} ${c.toLocaleUpperCase("tr")}`);

export function timerPresetTitle(p: TimerPreset, lang: "tr" | "en") {
  return lang === "tr" ? `${cap(p.labelTr)} Zamanlayıcı` : `${cap(p.labelEn)} Timer`;
}

export default function TimerPresetPage({ preset, lang }: { preset: TimerPreset; lang: "tr" | "en" }) {
  const tr = lang === "tr";
  const locale = tr ? "tr-TR" : "en-US";
  const n = (value: number, digits = 3) => value.toLocaleString(locale, { maximumFractionDigits: digits });
  const s = preset.seconds;
  const path = timerPresetPath(preset, lang);
  const index = timerPresets.indexOf(preset);
  const neighbors = timerPresets.filter((_, i) => i !== index && Math.abs(i - index) <= 4);
  const label = tr ? preset.labelTr : `${preset.labelEn}${preset.labelEn.startsWith("1 ") ? "" : "s"}`;
  const title = timerPresetTitle(preset, lang);

  const conversions = tr
    ? [
        ["Saniye", n(s)],
        ["Dakika", n(s / 60)],
        ["Saat", n(s / 3600, 4)],
        ["Milisaniye", n(s * 1000)],
      ]
    : [
        ["Seconds", n(s)],
        ["Minutes", n(s / 60)],
        ["Hours", n(s / 3600, 4)],
        ["Milliseconds", n(s * 1000)],
      ];

  const faqItems: FaqItem[] = tr
    ? [
        { question: `${preset.labelTr} kaç saniye?`, answer: `${preset.labelTr} = ${n(s)} saniye = ${n(s / 60)} dakika = ${n(s / 3600, 4)} saat.` },
        { question: `${cap(trLik(preset))} zamanlayıcı arka planda çalışır mı?`, answer: "Evet. Süre gerçek saate göre hesaplanır; başka sekmeye geçseniz de doğru anda biter. Yalnızca sekmeyi kapatmayın; telefonda \"Ekranı açık tut\" düğmesini kullanın." },
        { question: "Kendi müziğimi zil sesi yapabilir miyim?", answer: "Evet. Ses seçiminde \"Kendi müziğin\"i seçip cihazından bir ses dosyası yükle. Dosya yalnızca bu tarayıcıda saklanır, sunucuya gönderilmez." },
      ]
    : [
        { question: `How many seconds are in ${label}?`, answer: `${label} = ${n(s)} seconds = ${n(s / 60)} minutes = ${n(s / 3600, 4)} hours.` },
        { question: `Does the ${title.toLowerCase()} keep running in the background?`, answer: "Yes. It follows the real clock, so it ends on time even if you switch tabs. Just keep the tab open; on phones use \"Keep screen awake\"." },
        { question: "Can I use my own music as the alarm sound?", answer: "Yes. Choose \"Your own sound\" in the sound menu and pick an audio file from your device. It's stored only in this browser and never uploaded." },
      ];

  return (
    <TimeToolPage
      crumbs={[
        { href: tr ? "/" : "/en", label: tr ? "Ana Sayfa" : "Home" },
        { href: tr ? "/zamanlayici" : "/en/timer", label: tr ? "Zamanlayıcı" : "Timer" },
        { href: path, label: title },
      ]}
      crumbLabel={tr ? "Sayfa yolu" : "Breadcrumb"}
      title={title}
      intro={
        tr
          ? `${trLik(preset)} (${n(s)} saniye) geri sayım hazır. "Başlat"a bas; süre bitince sesli uyarı çalar ve bitiş saati ekranda yazar.`
          : `A ${preset.labelEn} (${n(s)} second) countdown is ready. Press "Start" — an alarm sounds when time is up, and the end time is shown on screen.`
      }
      tool={<CountdownTimer locale={lang} initialSeconds={s} presetLinks={timerPresetLinks(lang)} />}
      related={{
        title: tr ? "Diğer süreler" : "Other timers",
        links: [
          ...neighbors.map((p) => ({ href: timerPresetPath(p, lang), label: timerPresetTitle(p, lang) })),
          ...(tr
            ? [
                { href: "/zamanlayici", label: "Tüm süreler" },
                { href: "/kronometre", label: "Kronometre" },
                { href: "/online-alarm-kur", label: "Online Alarm" },
              ]
            : [
                { href: "/en/timer", label: "All timers" },
                { href: "/en/stopwatch", label: "Stopwatch" },
                { href: "/en/alarm-clock", label: "Alarm Clock" },
              ]),
        ],
      }}
      tocTitle={tr ? "İçindekiler" : "Contents"}
      tocItems={[
        { id: "kullanim", label: tr ? `${cap(preset.labelTr)} nelere yeter?` : `What can you do in ${label}?` },
        { id: "donusum", label: tr ? `${cap(preset.labelTr)} kaç saniye?` : `${cap(label)} in other units` },
        { id: "faq", label: tr ? "Sık sorulan sorular" : "FAQ" },
      ]}
      faqTitle={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
      faqItems={faqItems}
    >
      <h2 id="kullanim">{tr ? `${cap(preset.labelTr)} nelere yeter?` : `What can you do in ${label}?`}</h2>
      <ul>
        {(tr ? preset.usesTr : preset.usesEn).map((use) => (
          <li key={use}>{use}</li>
        ))}
      </ul>

      <h2 id="donusum">{tr ? `${cap(preset.labelTr)} kaç saniye?` : `${cap(label)} in other units`}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <tbody>
            {conversions.map(([unit, value]) => (
              <tr key={unit}>
                <th scope="row">{unit}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {tr ? "Farklı bir süre için ana " : "For any other length, use the main "}
        <Link href={tr ? "/zamanlayici" : "/en/timer"}>{tr ? "zamanlayıcıyı" : "online timer"}</Link>
        {tr ? " kullanabilir ya da zaman birimlerini " : ", or convert time units with the "}
        <Link href={tr ? "/kategoriler/zaman" : "/en/categories/time"}>{tr ? "zaman çeviricisiyle" : "time converter"}</Link>
        {tr ? " çevirebilirsiniz." : "."}
      </p>
    </TimeToolPage>
  );
}
