"use client";

// Saat bölümünün alarmı (Türkçe /online-alarm-kur): siyah başlıkta dev saat ve aynı ekranda alarm kurma (saat ve dakika,
// hazır saatler, uyku döngüsüne göre öneriler, hızlı kur). Alarm kurulunca kalan süre dev yazılır; "gece modu" ekranı
// karartıp sönük kırmızı bir saat gösterir ve ekranı açık tutar; alarm çalınca tam ekran ERTELE / DURDUR.
// Alarm altyapısı (saklama, sesler, kendi müziği, titreşim) AlarmClock ile ortaktır; alarmlar aynı yerde saklanır.
import { useEffect, useMemo, useRef, useState } from "react";
import SoundPicker from "./SoundPicker";
import { playSound, startRinging, unlockAudio, type TimeSoundId } from "./timeSounds";
import { timeToolsCopy } from "./timeToolsCopy";
import { makeId, nowMs, pad2, useNow } from "./useNow";
import { useWakeLock } from "./useWakeLock";
import { loadAlarms, nextAt, startVibration, STORAGE_KEY, untilText, type Alarm, type Repeat } from "./AlarmClock";

const copy = timeToolsCopy.tr;
const HAZIR = ["05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30"];
const SAATLER = Array.from({ length: 24 }, (_, i) => i);
const DAKIKALAR = Array.from({ length: 60 }, (_, i) => i);
const ERTELEME_DK = 5;

/** Şimdi yatılırsa 15 dk uykuya dalma + 4, 5, 6 uyku döngüsü (90 dk) sonrası; en yakın 5 dakikaya yuvarlanır. */
function uykuOnerileri(an: Date) {
  return [4, 5, 6].map((n) => {
    const t = new Date(an.getTime() + (15 + n * 90) * 60000);
    const dk = Math.round((t.getHours() * 60 + t.getMinutes()) / 5) * 5;
    return { n, saat: `${pad2(Math.floor(dk / 60) % 24)}:${pad2(dk % 60)}` };
  });
}

const tarihYaz = (an: Date) => new Intl.DateTimeFormat("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(an);

export default function AlarmSaat() {
  const now = useNow();
  const wakeLock = useWakeLock();
  const [saat, setSaat] = useState(7);
  const [dakika, setDakika] = useState(0);
  const [etiket, setEtiket] = useState("");
  const [ses, setSes] = useState<TimeSoundId>("classic");
  const [tekrar, setTekrar] = useState<Repeat>("once");
  const [duzey, setDuzey] = useState(0.7);
  const [alarmlar, setAlarmlar] = useState<Alarm[]>([]);
  const [yuklendi, setYuklendi] = useState(false);
  const [calan, setCalan] = useState<Alarm | null>(null);
  const [gece, setGece] = useState(false);
  const durdurRef = useRef<(() => void) | null>(null);
  const geceRef = useRef<HTMLDivElement>(null);

  // Kayıtlı alarmlar ve eski hazır saat adresleri (?t=07:30) yalnızca tarayıcıda okunur.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setAlarmlar(loadAlarms());
      setYuklendi(true);
      const t = new URLSearchParams(window.location.search).get("t");
      const m = t ? /^([01]\d|2[0-3]):([0-5]\d)$/.exec(t) : null;
      if (m) {
        setSaat(Number(m[1]));
        setDakika(Number(m[2]));
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!yuklendi) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(alarmlar));
    } catch {
      // Gizli sekme: kayıt yapılamazsa alarm yine bu sayfada çalışır.
    }
  }, [alarmlar, yuklendi]);

  // Zamanı gelen alarmı çal (250 ms'de bir gerçek saatle karşılaştır).
  useEffect(() => {
    if (calan) return;
    const id = window.setInterval(() => {
      const vakit = alarmlar.find((a) => a.enabled && a.at && nowMs() >= a.at);
      if (!vakit) return;
      window.clearInterval(id);
      setCalan(vakit);
      setGece(false);
      setAlarmlar((liste) =>
        liste.map((a) =>
          a.id !== vakit.id
            ? a
            : a.repeat && a.repeat !== "once"
              ? { ...a, at: nextAt(a.time, vakit.at + 60000, a.repeat) }
              : { ...a, enabled: false, at: 0 },
        ),
      );
      const sesiKes = startRinging(vakit.sound, duzey);
      const titresimiKes = startVibration();
      durdurRef.current = () => {
        sesiKes();
        titresimiKes();
      };
    }, 250);
    return () => window.clearInterval(id);
  }, [alarmlar, calan, duzey]);

  useEffect(() => () => durdurRef.current?.(), []);

  const siradaki = useMemo(() => alarmlar.filter((a) => a.enabled && a.at).sort((a, b) => a.at - b.at)[0], [alarmlar]);

  // Sekme başlığında sıradaki alarm.
  useEffect(() => {
    if (!now) return;
    const temel = document.title.replace(/^⏰ [^|]*\| /, "");
    document.title = calan ? `⏰ ${calan.time} | ${temel}` : siradaki ? `⏰ ${siradaki.time} · ${untilText(siradaki.at - now.getTime(), copy)} | ${temel}` : temel;
  }, [now, siradaki, calan]);

  // Gece modu: tam ekran ve ekranı açık tut; tam ekrandan çıkılınca gece modu da kapanır.
  useEffect(() => {
    if (!gece) return;
    if (!wakeLock.enabled && wakeLock.supported) void wakeLock.toggle();
    geceRef.current?.requestFullscreen?.().catch(() => {});
    const cik = () => {
      if (!document.fullscreenElement) setGece(false);
    };
    document.addEventListener("fullscreenchange", cik);
    return () => {
      document.removeEventListener("fullscreenchange", cik);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, [gece]); // eslint-disable-line react-hooks/exhaustive-deps

  const kur = (zaman: string) => {
    unlockAudio();
    const alarm: Alarm = { id: makeId(), time: zaman, label: etiket.trim(), sound: ses, enabled: true, at: nextAt(zaman, nowMs(), tekrar), repeat: tekrar };
    setAlarmlar((liste) => [...liste, alarm].sort((a, b) => a.time.localeCompare(b.time)));
    setEtiket("");
  };
  const sec = (zaman: string) => {
    const [h, m] = zaman.split(":").map(Number);
    setSaat(h);
    setDakika(m);
  };
  const hizli = (dk: number) => {
    const t = new Date(nowMs() + dk * 60000);
    kur(`${pad2(t.getHours())}:${pad2(t.getMinutes())}`);
  };
  const durdur = () => {
    durdurRef.current?.();
    durdurRef.current = null;
    setCalan(null);
  };
  const ertele = () => {
    if (!calan) return;
    const at = Date.now() + ERTELEME_DK * 60000;
    const t = new Date(at);
    const ertelenen: Alarm = { ...calan, id: `${calan.id}-z${Date.now()}`, enabled: true, at, repeat: "once", time: `${pad2(t.getHours())}:${pad2(t.getMinutes())}` };
    durdur();
    setAlarmlar((liste) => [...liste, ertelenen]);
  };

  const secili = `${pad2(saat)}:${pad2(dakika)}`;
  const kalan = siradaki && now ? untilText(siradaki.at - now.getTime(), copy) : null;
  const oneriler = now ? uykuOnerileri(now) : [];

  return (
    <section className="saat-hero alarm-hero">
      <div className="saat-hero-ic">
        <div className="saat-hero-ust">
          <div>
            <h1 className="saat-baslik">Online alarm kur</h1>
            <p className="saat-ulke" suppressHydrationWarning>
              {now ? tarihYaz(now) : "Ücretsiz, kurulumsuz çalar saat"}
            </p>
          </div>
          <div className="saat-eylemler">
            <button type="button" onClick={() => setGece(true)}>
              ☾ Gece modu
            </button>
            <button type="button" onClick={wakeLock.toggle} disabled={!wakeLock.supported} aria-pressed={wakeLock.enabled}>
              {wakeLock.enabled ? "☀ Ekran açık" : "☀ Ekranı açık tut"}
            </button>
          </div>
        </div>

        <div className="saat-dev alarm-dev" aria-live="off" suppressHydrationWarning>
          {now ? `${pad2(now.getHours())}:${pad2(now.getMinutes())}` : "--:--"}
          <span className="saat-sn">{now ? pad2(now.getSeconds()) : "--"}</span>
        </div>

        {siradaki && (
          <p className="alarm-durum" suppressHydrationWarning>
            <b>⏰ {siradaki.time}</b> · {kalan} sonra çalacak
            {siradaki.label ? ` · ${siradaki.label}` : ""}
          </p>
        )}

        <div className="alarm-kur">
          <div className="alarm-secici">
            <label>
              <span>Saat</span>
              <select value={saat} onChange={(e) => setSaat(Number(e.target.value))}>
                {SAATLER.map((h) => (
                  <option key={h} value={h}>
                    {pad2(h)}
                  </option>
                ))}
              </select>
            </label>
            <b aria-hidden="true">:</b>
            <label>
              <span>Dakika</span>
              <select value={dakika} onChange={(e) => setDakika(Number(e.target.value))}>
                {DAKIKALAR.map((m) => (
                  <option key={m} value={m}>
                    {pad2(m)}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" className="alarm-kur-dugme" onClick={() => kur(secili)}>
              Alarm kur
            </button>
          </div>

          <div className="alarm-cipler" role="group" aria-label="Hazır saatler">
            {HAZIR.map((t) => (
              <button key={t} type="button" className={t === secili ? "is-secili" : undefined} onClick={() => sec(t)}>
                {t}
              </button>
            ))}
          </div>

          {oneriler.length > 0 && (
            <div className="alarm-cipler is-uyku" role="group" aria-label="Şimdi yatarsan uyanma saatleri">
              <span>Şimdi yatarsan dinç uyanırsın:</span>
              {oneriler.map((o) => (
                <button key={o.n} type="button" className={o.saat === secili ? "is-secili" : undefined} onClick={() => sec(o.saat)} title={`${o.n} uyku döngüsü (${o.n * 1.5} saat) + 15 dk uykuya dalma`}>
                  {o.saat} <small>{o.n * 1.5} sa</small>
                </button>
              ))}
            </div>
          )}

          <div className="alarm-cipler is-hizli" role="group" aria-label="Hızlı kur">
            <span>Hızlı kur:</span>
            {[5, 10, 15, 30, 60].map((dk) => (
              <button key={dk} type="button" onClick={() => hizli(dk)}>
                +{dk >= 60 ? "1 sa" : `${dk} dk`}
              </button>
            ))}
          </div>

          <details className="alarm-ayarlar">
            <summary>Ses, not ve tekrar</summary>
            <div className="alarm-ayar-alanlar">
              <label>
                <span>Not</span>
                <input value={etiket} maxLength={40} placeholder="örn. İlaç, toplantı" onChange={(e) => setEtiket(e.target.value)} />
              </label>
              <label>
                <span>Ses</span>
                <SoundPicker value={ses} onChange={setSes} copy={copy} />
              </label>
              <label>
                <span>Tekrar</span>
                <select value={tekrar} onChange={(e) => setTekrar(e.target.value as Repeat)}>
                  <option value="once">{copy.repeat.once}</option>
                  <option value="daily">{copy.repeat.daily}</option>
                  <option value="weekdays">{copy.repeat.weekdays}</option>
                </select>
              </label>
              <label>
                <span>Ses düzeyi</span>
                <input type="range" min={0.1} max={1} step={0.1} value={duzey} onChange={(e) => setDuzey(Number(e.target.value))} />
              </label>
              <button type="button" onClick={() => playSound(ses, duzey)}>
                🔊 Sesi dene
              </button>
            </div>
          </details>
        </div>

        {alarmlar.length > 0 && (
          <ul className="alarm-liste">
            {alarmlar.map((a) => (
              <li key={a.id} className={a.enabled ? "is-acik" : undefined}>
                <b>{a.time}</b>
                <span>
                  {a.label || copy.sounds[a.sound]}
                  {a.repeat && a.repeat !== "once" ? ` · ${copy.repeat[a.repeat]}` : ""}
                </span>
                <label>
                  <input
                    type="checkbox"
                    checked={a.enabled}
                    onChange={(e) => {
                      unlockAudio();
                      const acik = e.target.checked;
                      setAlarmlar((liste) => liste.map((x) => (x.id === a.id ? { ...x, enabled: acik, at: acik ? nextAt(x.time, Date.now(), x.repeat) : 0 } : x)));
                    }}
                  />
                  {a.enabled ? "Açık" : "Kapalı"}
                </label>
                <button type="button" onClick={() => setAlarmlar((liste) => liste.filter((x) => x.id !== a.id))} aria-label={`${a.time} alarmını sil`}>
                  Sil
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="alarm-not">Alarm bu sekme açıkken çalar; sekmeyi kapatmayın. Telefonda &quot;Gece modu&quot;nu açıp şarjda bırakın.</p>
      </div>

      {gece && (
        <div ref={geceRef} className="alarm-gece" onClick={() => setGece(false)} role="dialog" aria-label="Gece modu (kapatmak için dokunun)">
          <div className="alarm-gece-saat" suppressHydrationWarning>
            {now ? `${pad2(now.getHours())}:${pad2(now.getMinutes())}` : "--:--"}
          </div>
          <p suppressHydrationWarning>{siradaki ? `⏰ ${siradaki.time} · ${kalan} sonra` : "Kurulu alarm yok"}</p>
          <small>Çıkmak için dokunun</small>
        </div>
      )}

      {calan && (
        <div className="alarm-caliyor" role="alertdialog" aria-label="Alarm çalıyor">
          <p className="alarm-caliyor-ust">Alarm çalıyor</p>
          <div className="alarm-caliyor-saat">{calan.time}</div>
          {calan.label && <p className="alarm-caliyor-not">{calan.label}</p>}
          <div className="alarm-caliyor-dugmeler">
            <button type="button" onClick={ertele}>
              Ertele · {ERTELEME_DK} dk
            </button>
            <button type="button" className="is-durdur" onClick={durdur}>
              Durdur
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
