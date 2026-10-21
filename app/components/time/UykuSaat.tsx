"use client";

// Saat bölümünün uyku hesaplayıcısı (Türkçe /uyku-hesaplama): siyah başlıkta "Kaçta kalkmak istiyorsun?" sorusu,
// büyük saat/dakika seçici, aynı ekranda dev sonuç kartları (döngü çubukları, önerilen 5-6 döngü, her kartta
// tek dokunuşla alarm kurma), "Şimdi yatarsam" ve "Kaç saat uyudum?" hesabı. Seçilen kalkış saati isteğe bağlı
// olarak bu tarayıcıda hatırlanır. Hesap: 15 dk uykuya dalma + n × 90 dk döngü.
import { useEffect, useState } from "react";
import Link from "@/app/components/SiteLink";
import { pad2, useNow } from "./useNow";

const DALMA = 15;
const DONGU = 90;
const ANAHTAR = "birimceviri:uyku-kalkis";
const SAATLER = Array.from({ length: 24 }, (_, i) => i);
const DAKIKALAR = Array.from({ length: 12 }, (_, i) => i * 5);

const saatYaz = (dk: number) => {
  const m = ((dk % 1440) + 1440) % 1440;
  return `${pad2(Math.floor(m / 60))}:${pad2(m % 60)}`;
};
const sureYaz = (dk: number) => `${Math.floor(dk / 60)} sa${dk % 60 ? ` ${dk % 60} dk` : ""}`;

type Sonuc = { tur: "yatis" | "kalkis"; baslik: string; kartlar: Array<{ saat: string; dongu: number; alarm: string }> };

function yatisSaatleri(kalkis: number): Sonuc {
  return {
    tur: "yatis",
    baslik: `${saatYaz(kalkis)}'de dinç kalkmak için bu saatlerden birinde yat`,
    kartlar: [6, 5, 4, 3].map((n) => ({ saat: saatYaz(kalkis - DALMA - n * DONGU), dongu: n, alarm: saatYaz(kalkis) })),
  };
}

function kalkisSaatleri(simdi: number): Sonuc {
  return {
    tur: "kalkis",
    baslik: `Şimdi (${saatYaz(simdi)}) yatarsan bu saatlerden birinde kalk`,
    kartlar: [3, 4, 5, 6].map((n) => {
      // Uyanma saati en yakın 5 dakikaya yuvarlanır (alarm için okunaklı).
      const t = Math.round((simdi + DALMA + n * DONGU) / 5) * 5;
      return { saat: saatYaz(t), dongu: n, alarm: saatYaz(t) };
    }),
  };
}

export default function UykuSaat() {
  const now = useNow();
  const [saat, setSaat] = useState(7);
  const [dakika, setDakika] = useState(0);
  const [hatirla, setHatirla] = useState(false);
  const [sonuc, setSonuc] = useState<Sonuc>(() => yatisSaatleri(7 * 60));
  const [yatti, setYatti] = useState(23 * 60);
  const [kalkti, setKalkti] = useState(7 * 60);

  // Hatırlanan kalkış saati yalnızca tarayıcıda okunur.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const kayit = window.localStorage.getItem(ANAHTAR);
        const m = kayit ? /^(\d{2}):(\d{2})$/.exec(kayit) : null;
        if (m) {
          setSaat(Number(m[1]));
          setDakika(Number(m[2]));
          setHatirla(true);
          setSonuc(yatisSaatleri(Number(m[1]) * 60 + Number(m[2])));
        }
      } catch {
        // Depolama kapalı: varsayılan 07:00.
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const kalkis = saat * 60 + dakika;
  const yatisHesapla = () => {
    setSonuc(yatisSaatleri(kalkis));
    try {
      if (hatirla) window.localStorage.setItem(ANAHTAR, saatYaz(kalkis));
      else window.localStorage.removeItem(ANAHTAR);
    } catch {
      // Depolama kapalı.
    }
  };
  const simdiHesapla = () => {
    const d = new Date();
    setSonuc(kalkisSaatleri(d.getHours() * 60 + d.getMinutes()));
  };

  const uyku = (((kalkti - yatti) % 1440) + 1440) % 1440;
  const gercekUyku = Math.max(0, uyku - DALMA);
  const tamDongu = Math.floor(gercekUyku / DONGU);
  const artan = gercekUyku - tamDongu * DONGU;

  return (
    <section className="saat-hero uyku-hero">
      <div className="saat-hero-ic">
        <div className="saat-hero-ust">
          <div>
            <h1 className="saat-baslik">Uyku hesaplama</h1>
            <p className="saat-ulke" suppressHydrationWarning>
              90 dakikalık uyku döngülerine göre · şu an {now ? `${pad2(now.getHours())}:${pad2(now.getMinutes())}` : "--:--"}
            </p>
          </div>
        </div>

        <p className="uyku-soru">Kaçta kalkmak istiyorsun?</p>
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
            <button type="button" className="alarm-kur-dugme" onClick={yatisHesapla}>
              ☾ Kaçta yatmalıyım?
            </button>
          </div>
          <div className="uyku-alt-satir">
            <label className="uyku-hatirla">
              <input type="checkbox" checked={hatirla} onChange={(e) => setHatirla(e.target.checked)} /> Kalkış saatimi bu cihazda hatırla
            </label>
            <button type="button" className="uyku-simdi" onClick={simdiHesapla}>
              ☀ Şimdi yatarsam kaçta kalkmalıyım?
            </button>
          </div>
        </div>

        <div className="uyku-sonuc" aria-live="polite">
          <p className="uyku-sonuc-baslik">{sonuc.baslik}:</p>
          <ul className="uyku-kartlar">
            {sonuc.kartlar.map((k) => (
              <li key={k.dongu} className={k.dongu >= 5 ? "is-onerilen" : undefined}>
                <b>{k.saat}</b>
                <span>
                  {k.dongu} döngü · {(k.dongu * 1.5).toLocaleString("tr-TR")} saat uyku
                </span>
                <span className="uyku-cubuk" aria-hidden="true">
                  {Array.from({ length: 6 }, (_, i) => (
                    <i key={i} className={i < k.dongu ? "is-dolu" : undefined} />
                  ))}
                </span>
                {k.dongu >= 5 && <em>Önerilen</em>}
                <Link href={`/online-alarm-kur?t=${k.alarm}`} prefetch={false} rel="nofollow">
                  ⏰ {k.alarm} için alarm kur
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="uyku-kac-saat">
          <p className="uyku-sonuc-baslik">Kaç saat uyudum?</p>
          <div className="uyku-kac-saat-satir">
            <label>
              <span>Yattım</span>
              <input
                type="time"
                value={saatYaz(yatti)}
                onChange={(e) => {
                  const [h, m] = e.target.value.split(":").map(Number);
                  if (Number.isFinite(h) && Number.isFinite(m)) setYatti(h * 60 + m);
                }}
              />
            </label>
            <label>
              <span>Kalktım</span>
              <input
                type="time"
                value={saatYaz(kalkti)}
                onChange={(e) => {
                  const [h, m] = e.target.value.split(":").map(Number);
                  if (Number.isFinite(h) && Number.isFinite(m)) setKalkti(h * 60 + m);
                }}
              />
            </label>
            <p>
              <b>{sureYaz(uyku)}</b> yatakta · uykuya dalma payı düşülünce <b>{sureYaz(gercekUyku)}</b> uyku, {tamDongu} tam döngü
              {artan ? ` ve ${artan} dk` : ""}
              {artan > 20 && artan < 70 ? " (bir döngünün ortasında uyanmış olabilirsin)" : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
