import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { intervalPresets } from "./focusCopy";
import IntervalTimer from "./IntervalTimer";
import PomodoroTimer from "./PomodoroTimer";
import { timeRelated } from "./timeRelatedLinks";
import TimeToolPage from "./TimeToolPage";

// Pomodoro ve aralikli antrenman (Tabata) sayfalari (TR + EN).

const fmt = (seconds: number, lang: "tr" | "en") => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return lang === "tr" ? (m ? `${m} dk${s ? ` ${s} sn` : ""}` : `${s} sn`) : m ? `${m} min${s ? ` ${s} s` : ""}` : `${s} s`;
};

export function PomodoroPage({ lang }: { lang: "tr" | "en" }) {
  const tr = lang === "tr";
  const faqItems: FaqItem[] = tr
    ? [
        {
          question: "Pomodoro tekniği nedir?",
          answer:
            "Francesco Cirillo'nun 1980'lerin sonunda geliştirdiği bir zaman yönetimi yöntemidir: 25 dakika tek bir işe odaklanır, 5 dakika mola verirsin. Her 4 pomodorodan sonra 15-30 dakikalık uzun mola verilir. Adını Cirillo'nun kullandığı domates (İtalyanca pomodoro) şeklindeki mutfak zamanlayıcısından alır.",
        },
        {
          question: "Neden 25 dakika?",
          answer: "25 dakika çoğu kişi için dikkatin dağılmadan sürdürülebileceği, ama işe gerçekten girmeye yetecek kadar uzun bir süredir. Süreleri ayarlardan değiştirebilirsin; örneğin derin çalışma için 50/10 da yaygın bir tercihtir.",
        },
        {
          question: "Tamamladığım pomodorolar kaydediliyor mu?",
          answer: "Evet, bugünün pomodoroları ve toplam odak süresi bu tarayıcıda saklanır; ertesi gün sıfırlanır. Hiçbir veri sunucuya gönderilmez.",
        },
        {
          question: "Sekme arka plandayken çalışır mı?",
          answer: "Evet. Süre gerçek saate göre tutulur, başka sekmeye geçsen de tur doğru anda biter. \"Bildirim gönder\"i açarsan tur bitince masaüstü bildirimi de alırsın.",
        },
      ]
    : [
        {
          question: "What is the Pomodoro Technique?",
          answer:
            "A time-management method developed by Francesco Cirillo in the late 1980s: focus on a single task for 25 minutes, then take a 5-minute break. After four pomodoros take a longer 15–30 minute break. It's named after the tomato-shaped (Italian: pomodoro) kitchen timer Cirillo used.",
        },
        {
          question: "Why 25 minutes?",
          answer: "Twenty-five minutes is long enough to get into a task but short enough to stay focused without drifting. You can change every duration in the settings — 50/10 is a popular choice for deep work.",
        },
        {
          question: "Are my completed pomodoros saved?",
          answer: "Yes — today's pomodoros and total focus time are stored in this browser and reset the next day. Nothing is sent to a server.",
        },
        {
          question: "Does it keep running in the background?",
          answer: "Yes. It follows the real clock, so sessions end on time even in a background tab. Turn on notifications to get a desktop alert when a session ends.",
        },
      ];

  return (
    <TimeToolPage
      crumbs={[
        { href: tr ? "/" : "/en", label: tr ? "Ana Sayfa" : "Home" },
        { href: tr ? "/pomodoro" : "/en/pomodoro-timer", label: tr ? "Pomodoro" : "Pomodoro Timer" },
      ]}
      crumbLabel={tr ? "Sayfa yolu" : "Breadcrumb"}
      install={{ name: "Pomodoro", lang }}
      title={tr ? "Pomodoro Zamanlayıcı" : "Pomodoro Timer"}
      intro={
        tr
          ? "25 dakika odak, 5 dakika mola; her 4 turda uzun mola. Görevini yaz, başlat — tur bitince ses ve bildirim gelsin, günün odak süren kaydedilsin."
          : "25 minutes of focus, 5-minute breaks and a long break every 4 rounds. Name your task and start — get a sound and notification when each session ends, with today's focus time tracked."
      }
      tool={<PomodoroTimer lang={lang} />}
      related={{
        title: tr ? "İlginizi çekebilir" : "You may also like",
        links: (tr ? timeRelated.tr.tools : timeRelated.en.tools).filter((t) => !t.href.includes("pomodoro")),
      }}
      tocTitle={tr ? "İçindekiler" : "Contents"}
      tocItems={[
        { id: "nasil", label: tr ? "Pomodoro nasıl uygulanır?" : "How to use the Pomodoro Technique" },
        { id: "ipuclari", label: tr ? "Daha verimli pomodoro için ipuçları" : "Tips for better pomodoros" },
        { id: "faq", label: tr ? "Sık sorulan sorular" : "FAQ" },
      ]}
      faqTitle={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
      faqItems={faqItems}
    >
      <h2 id="nasil">{tr ? "Pomodoro nasıl uygulanır?" : "How to use the Pomodoro Technique"}</h2>
      <ol>
        {tr ? (
          <>
            <li>Yapacağın tek bir işi seç ve yukarıdaki kutuya yaz.</li>
            <li>&quot;Başlat&quot;a bas ve 25 dakika yalnızca o işe odaklan; telefonu ve bildirimleri kapat.</li>
            <li>Zil çalınca 5 dakika mola ver: kalk, su iç, gözlerini dinlendir.</li>
            <li>4 pomodorodan sonra 15-30 dakikalık uzun mola ver ve döngüye yeniden başla.</li>
          </>
        ) : (
          <>
            <li>Pick one task and type it in the box above.</li>
            <li>Press &quot;Start&quot; and work only on that task for 25 minutes — silence your phone and notifications.</li>
            <li>When the bell rings, take a 5-minute break: stand up, drink water, rest your eyes.</li>
            <li>After 4 pomodoros take a 15–30 minute break, then start the cycle again.</li>
          </>
        )}
      </ol>
      <h2 id="ipuclari">{tr ? "Daha verimli pomodoro için ipuçları" : "Tips for better pomodoros"}</h2>
      <ul>
        {tr ? (
          <>
            <li>Aklına gelen başka işleri bir kâğıda not al ve tura geri dön; molada bakarsın.</li>
            <li>Büyük işleri birkaç pomodoroya bölün; &quot;raporun giriş bölümü&quot; gibi somut hedefler koy.</li>
            <li>Molada ekrandan uzaklaş; göz dinlendirmek için 20 saniyelik bakış molası da verebilirsin.</li>
            <li>Ders çalışırken kısa soruları molalara, zor konuları sabah turlarına bırak.</li>
          </>
        ) : (
          <>
            <li>Jot down anything that pops into your head and get back to the session; deal with it in the break.</li>
            <li>Split big jobs into several pomodoros with concrete goals like &quot;draft the introduction&quot;.</li>
            <li>Step away from screens during breaks to rest your eyes.</li>
          </>
        )}
      </ul>
      <p>
        {tr ? "Tek seferlik bir süre için " : "For a one-off countdown use the "}
        <Link href={tr ? "/zamanlayici?s=1500" : "/en/timer?s=1500"}>{tr ? "25 dakikalık zamanlayıcı" : "25 minute timer"}</Link>
        {tr ? ", egzersiz için " : ", and for workouts the "}
        <Link href={tr ? "/tabata-zamanlayici" : "/en/interval-timer"}>{tr ? "Tabata zamanlayıcı" : "interval timer"}</Link>
        {tr ? " da işine yarar." : "."}
      </p>
    </TimeToolPage>
  );
}

export function IntervalPage({ lang }: { lang: "tr" | "en" }) {
  const tr = lang === "tr";
  const faqItems: FaqItem[] = tr
    ? [
        {
          question: "Tabata nedir?",
          answer:
            "Japon araştırmacı Dr. Izumi Tabata'nın 1996'da yayımlanan çalışmasına dayanan bir yüksek yoğunluklu aralık antrenmanıdır: 20 saniye maksimum eforla çalışma, 10 saniye dinlenme, 8 tur — toplam 4 dakika. Çalışmada bu protokolün hem aerobik hem anaerobik kapasiteyi geliştirdiği gösterilmiştir.",
        },
        {
          question: "HIIT ile Tabata farkı nedir?",
          answer: "HIIT (yüksek yoğunluklu aralıklı antrenman) genel bir addır; çalışma ve dinlenme süreleri serbesttir (ör. 30/30, 40/20). Tabata, HIIT'in 20/10 × 8 kalıbına sahip özel ve çok yoğun bir türüdür.",
        },
        {
          question: "EMOM ne demek?",
          answer: "EMOM (every minute on the minute) her dakikanın başında belirli bir hareketi yapıp dakikanın kalanında dinlenmektir. Hazır programda 60 saniyelik 10 tur olarak kuruludur; hareketi ne kadar hızlı bitirirsen o kadar dinlenirsin.",
        },
        {
          question: "Sesli komut nasıl çalışır?",
          answer: "Her faz başında tarayıcının konuşma özelliğiyle \"Çalış\", \"Dinlen\" gibi komutlar söylenir; ayrıca her fazın son 3 saniyesinde bip çalar. Ekrana bakmadan antrenman yapabilirsin. Konuşma desteklenmiyorsa yalnızca bipler çalar.",
        },
      ]
    : [
        {
          question: "What is Tabata?",
          answer:
            "A high-intensity interval protocol from Dr. Izumi Tabata's 1996 study: 20 seconds of all-out effort, 10 seconds of rest, 8 rounds — 4 minutes in total. The study found it improved both aerobic and anaerobic capacity.",
        },
        {
          question: "What's the difference between HIIT and Tabata?",
          answer: "HIIT (high-intensity interval training) is the general idea with any work/rest split, such as 30/30 or 40/20. Tabata is a specific, very intense HIIT format: 20/10 × 8.",
        },
        {
          question: "What does EMOM mean?",
          answer: "Every Minute On the Minute: do a set number of reps at the start of each minute and rest for whatever is left. The preset runs 10 one-minute rounds.",
        },
        {
          question: "How do the voice cues work?",
          answer: "At the start of each phase your browser's speech voice says \"Work\" or \"Rest\", and the last 3 seconds of every phase beep, so you can train without watching the screen.",
        },
      ];

  return (
    <TimeToolPage
      crumbs={[
        { href: tr ? "/" : "/en", label: tr ? "Ana Sayfa" : "Home" },
        { href: tr ? "/tabata-zamanlayici" : "/en/interval-timer", label: tr ? "Tabata Zamanlayıcı" : "Interval Timer" },
      ]}
      crumbLabel={tr ? "Sayfa yolu" : "Breadcrumb"}
      install={{ name: tr ? "Tabata" : "Interval Timer", lang }}
      title={tr ? "Tabata ve HIIT Zamanlayıcı" : "Interval Timer: Tabata & HIIT"}
      intro={
        tr
          ? "Tabata 20/10, HIIT 30/30, EMOM, boks raundu ya da kendi programın. Hazırlan, çalış, dinlen fazları renkli ve büyük; son 3 saniyede bip, sesli komutlarla ekrana bakmadan antrenman yap."
          : "Tabata 20/10, HIIT 30/30, EMOM, boxing rounds or your own plan. Big colour-coded Get ready / Work / Rest phases, beeps on the last 3 seconds and voice cues so you never have to look at the screen."
      }
      tool={<IntervalTimer lang={lang} />}
      related={{
        title: tr ? "İlginizi çekebilir" : "You may also like",
        links: [
          ...(tr ? timeRelated.tr.tools : timeRelated.en.tools).filter((t) => !t.href.includes("tabata") && !t.href.includes("interval")),
          ...(tr ? [{ href: "/kosu-pace-hesaplama", label: "Koşu Pace Hesaplama" }] : []),
        ],
      }}
      tocTitle={tr ? "İçindekiler" : "Contents"}
      tocItems={[
        { id: "programlar", label: tr ? "Hazır programlar" : "Preset workouts" },
        { id: "tabata", label: tr ? "Tabata antrenmanı nasıl yapılır?" : "How to do a Tabata workout" },
        { id: "faq", label: tr ? "Sık sorulan sorular" : "FAQ" },
      ]}
      faqTitle={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
      faqItems={faqItems}
    >
      <h2 id="programlar">{tr ? "Hazır programlar" : "Preset workouts"}</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th>{tr ? "Program" : "Workout"}</th>
              <th>{tr ? "Çalışma" : "Work"}</th>
              <th>{tr ? "Dinlenme" : "Rest"}</th>
              <th>{tr ? "Tur" : "Rounds"}</th>
              <th>{tr ? "Toplam" : "Total"}</th>
            </tr>
          </thead>
          <tbody>
            {intervalPresets.map((p) => (
              <tr key={p.id}>
                <td>{tr ? p.tr : p.en}</td>
                <td>{fmt(p.work, lang)}</td>
                <td>{p.rest ? fmt(p.rest, lang) : "—"}</td>
                <td>{p.rounds}</td>
                <td>{fmt(p.prepare + p.work * p.rounds + p.rest * (p.rounds - 1), lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>{tr ? "Toplam sürelere 10 saniyelik hazırlık dahildir." : "Totals include a 10-second get-ready phase."}</p>

      <h2 id="tabata">{tr ? "Tabata antrenmanı nasıl yapılır?" : "How to do a Tabata workout"}</h2>
      <ol>
        {tr ? (
          <>
            <li>5-10 dakika hafif tempoyla ısın.</li>
            <li>Tek bir hareket seç: squat jump, burpee, mekik, bisiklet ya da ip atlama.</li>
            <li>20 saniye olabildiğince yüksek eforla çalış, 10 saniye dinlen; 8 turu tamamla.</li>
            <li>Soğuma ve esnemeyle bitir. Yeni başlıyorsan 30/30 HIIT ile başlaman daha güvenlidir.</li>
          </>
        ) : (
          <>
            <li>Warm up at an easy pace for 5–10 minutes.</li>
            <li>Pick one movement: jump squats, burpees, mountain climbers, cycling or skipping.</li>
            <li>Go all-out for 20 seconds, rest 10 seconds, and complete 8 rounds.</li>
            <li>Cool down and stretch. If you&apos;re new to this, 30/30 HIIT is a safer start.</li>
          </>
        )}
      </ol>
      <p className="time-tool-note">
        {tr
          ? "Yüksek yoğunluklu antrenman kalp ve eklemleri zorlar; sağlık sorunun varsa başlamadan önce doktoruna danış."
          : "High-intensity training is demanding on the heart and joints; check with a doctor first if you have health concerns."}
      </p>
    </TimeToolPage>
  );
}
