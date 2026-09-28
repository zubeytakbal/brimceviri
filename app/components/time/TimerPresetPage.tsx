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

  // Ornek baslangic saatlerine gore bitis (gun kaymasi notuyla).
  const endTimes = [
    [9, 0],
    [12, 30],
    [18, 0],
    [22, 45],
  ].map(([h, m]) => {
    const start = h * 60 + m;
    const endSec = start * 60 + s;
    const day = Math.floor(endSec / 86400);
    const norm = endSec % 86400;
    const hh = Math.floor(norm / 3600);
    const mm = Math.floor((norm % 3600) / 60);
    const ss = norm % 60;
    const clock = (hour: number, min: number, sec: number) =>
      `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}${sec ? `:${String(sec).padStart(2, "0")}` : ""}`;
    const note = day === 0 ? "" : tr ? (day === 1 ? " (ertesi gün)" : ` (+${day} gün)`) : day === 1 ? " (next day)" : ` (+${day} days)`;
    return { start: clock(h, m, 0), end: `${clock(hh, mm, ss)}${note}` };
  });

  // Bu surede neler olur: ortalama degerlerle hesaplanir.
  const facts = tr
    ? [
        ["Yürüyüş (5 km/sa)", `${n((5 * s) / 3600, 2)} km`],
        ["Koşu (10 km/sa)", `${n((10 * s) / 3600, 2)} km`],
        ["Kalp atışı (dakikada 70)", `yaklaşık ${n(Math.round((70 * s) / 60), 0)}`],
        ["Işığın aldığı yol", `${n((299792.458 * s) / 1e6, 2)} milyon km`],
        ["Bir günün yüzdesi", `%${n((s / 86400) * 100, 2)}`],
      ]
    : [
        ["Walking (3 mph)", `${n((3 * s) / 3600, 2)} mi`],
        ["Running (6 mph)", `${n((6 * s) / 3600, 2)} mi`],
        ["Heartbeats (70 per minute)", `about ${n(Math.round((70 * s) / 60), 0)}`],
        ["Distance light travels", `${n((186282.397 * s) / 1e6, 2)} million mi`],
        ["Share of a day", `${n((s / 86400) * 100, 2)}%`],
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
      install={{ name: tr ? "Zamanlayıcı" : "Timer", lang: lang }}
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
        { id: "bitis", label: tr ? "Ne zaman biter?" : "When will it end?" },
        { id: "bu-surede", label: tr ? "Bu sürede neler olur?" : "What happens in that time?" },
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

      <h2 id="bitis">{tr ? "Ne zaman biter?" : "When will it end?"}</h2>
      <p>
        {tr
          ? `Zamanlayıcıyı başlattığınızda bitiş saati ekranda görünür. Örnek başlangıç saatlerine göre ${preset.labelTr} sonra saat:`
          : `The timer shows its end time as soon as you press start. Some examples of when ${label} runs out:`}
      </p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th scope="col">{tr ? "Başlangıç" : "Start"}</th>
              <th scope="col">{tr ? "Bitiş" : "Ends at"}</th>
            </tr>
          </thead>
          <tbody>
            {endTimes.map((row) => (
              <tr key={row.start}>
                <td>{row.start}</td>
                <td>{row.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="bu-surede">{tr ? "Bu sürede neler olur?" : "What happens in that time?"}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <tbody>
            {facts.map(([what, value]) => (
              <tr key={what}>
                <th scope="row">{what}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <small>{tr ? "Ortalama değerlerle hesaplanmıştır; kişiye göre değişir." : "Based on typical averages; individual values vary."}</small>
      </p>

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
