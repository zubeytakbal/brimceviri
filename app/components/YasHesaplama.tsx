"use client";

import { useEffect, useState } from "react";
import { gregorianToHijri, HIJRI_MONTHS_TR, type YMD } from "../converter/time/calendars";
import { daysInMonth, parseYmd, weekdayOf, ymdKey } from "../converter/time/dateMath";
import { burc, canliSure, duzeltilmisYas, sonrakiYuvarlakGun, yasBilgisi, yasFarki } from "../converter/yasHesap";

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const GUNLER = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const tarih = (d: YMD) => `${d.day} ${AYLAR[d.month - 1]} ${d.year} ${GUNLER[weekdayOf(d)]}`;
const n = (x: number) => x.toLocaleString("tr-TR");
const yag = (y: number, a: number, g: number) => [y ? `${y} yıl` : "", a ? `${a} ay` : "", `${g} gün`].filter(Boolean).join(" ");

function bugunIso() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

/** Bugünün tarihi: sabit tarihle ön işlenir, tarayıcıda gerçek güne geçer. */
function useBugun(initial: string) {
  const [value, setValue] = useState(initial);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setValue(bugunIso()));
    return () => cancelAnimationFrame(frame);
  }, []);
  return value;
}

/** Saniyede bir güncellenen şimdiki an; sunucuda ve ilk çizimde null (canlı sayaç tarayıcıda başlar). */
function useSimdi() {
  const [simdi, setSimdi] = useState<number | null>(null);
  useEffect(() => {
    setSimdi(Date.now()); // eslint-disable-line react-hooks/set-state-in-effect
    const id = setInterval(() => setSimdi(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return simdi;
}

/** Gün / ay / yıl açılır listeleri (Türkçe sırayla); değer "YYYY-AA-GG". */
function TarihSecici({ etiket, deger, degis, enErkenYil, enGecYil }: { etiket: string; deger: string; degis: (v: string) => void; enErkenYil: number; enGecYil: number }) {
  const d = parseYmd(deger) ?? { year: enGecYil, month: 1, day: 1 };
  const ayar = (y: number, m: number, g: number) => degis(ymdKey({ year: y, month: m, day: Math.min(g, daysInMonth(y, m)) }));
  const yillar = Array.from({ length: enGecYil - enErkenYil + 1 }, (_, i) => enGecYil - i);
  return (
    <fieldset className="date-calc-field yas-tarih">
      <legend>{etiket}</legend>
      <div className="yas-tarih-secim">
        <select aria-label={`${etiket}: gün`} value={d.day} onChange={(e) => ayar(d.year, d.month, Number(e.target.value))}>
          {Array.from({ length: daysInMonth(d.year, d.month) }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select aria-label={`${etiket}: ay`} value={d.month} onChange={(e) => ayar(d.year, Number(e.target.value), d.day)}>
          {AYLAR.map((a, i) => (
            <option key={a} value={i + 1}>
              {a}
            </option>
          ))}
        </select>
        <select aria-label={`${etiket}: yıl`} value={d.year} onChange={(e) => ayar(Number(e.target.value), d.month, d.day)}>
          {yillar.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
}

type Mod = "yas" | "fark" | "duzeltilmis";

export default function YasHesaplama({ initialDate }: { initialDate: string }) {
  const bugunRaw = useBugun(initialDate);
  const [mod, setMod] = useState<Mod>("yas");
  const [dogum, setDogum] = useState("2000-01-01");
  const [hedef, setHedef] = useState("");
  const [ikinci, setIkinci] = useState("2003-06-15");
  const [hafta, setHafta] = useState("32");
  const [saat, setSaat] = useState("");
  const [baskaTarih, setBaskaTarih] = useState(false);
  const [kopyalandi, setKopyalandi] = useState(false);
  const simdi = useSimdi();
  const bugun = parseYmd(hedef || bugunRaw);
  const d = parseYmd(dogum);
  const buYil = Number(bugunRaw.slice(0, 4));

  let sonuc: React.ReactNode = <p className="date-calc-note">Doğum tarihini girin.</p>;
  if (d && bugun && mod === "yas") {
    const r = yasBilgisi(d, bugun);
    const [sa, dk] = saat ? saat.split(":").map(Number) : [0, 0];
    const canli = simdi !== null && !hedef ? canliSure(d, sa, dk, simdi) : null;
    // Sonraki doğum gününün başlangıcına (Türkiye saatiyle 00:00) kalan süre.
    const kalanMs =
      r && simdi !== null && !hedef ? Math.max(0, Date.UTC(r.sonrakiDogumGunu.year, r.sonrakiDogumGunu.month - 1, r.sonrakiDogumGunu.day) - 3 * 3600000 - simdi) : null;
    const h = gregorianToHijri(d);
    const yuvarlak = sonrakiYuvarlakGun(d, bugun);
    const ozet = r
      ? `${yag(r.yil, r.ay, r.gun)} (${n(r.toplamGun)} gün). ${GUNLER[weekdayOf(d)]} günü doğdum, burcum ${burc(d)}. Doğum günüme ${n(r.kalanGun)} gün kaldı.`
      : "";
    sonuc = r ? (
      <>
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Yaşınız</span>
            <strong>{yag(r.yil, r.ay, r.gun)}</strong>
            <em>{hedef ? `${tarih(bugun)} itibarıyla` : "bugün itibarıyla"}</em>
          </div>
          <div className="date-calc-stat">
            <span>Sonraki doğum günü</span>
            <strong suppressHydrationWarning>
              {r.kalanGun === 0
                ? "Bugün, iyi ki doğdunuz!"
                : kalanMs !== null
                  ? `${Math.floor(kalanMs / 86400000)} gün ${Math.floor((kalanMs % 86400000) / 3600000)} sa ${Math.floor((kalanMs % 3600000) / 60000)} dk ${Math.floor((kalanMs % 60000) / 1000)} sn`
                  : `${n(r.kalanGun)} gün kaldı`}
            </strong>
            <em>
              {tarih(r.sonrakiDogumGunu)} · {r.yeniYas} yaşına giriyorsunuz
            </em>
          </div>
          <div className="date-calc-stat">
            <span>Toplam yaşadığınız</span>
            <strong>{n(r.toplamGun)} gün</strong>
            <em suppressHydrationWarning>
              {canli
                ? `${n(canli.saat)} saat · ${n(canli.dakika)} dakika · ${n(canli.saniye)} saniye`
                : `${n(r.toplamAy)} ay · ${n(r.toplamHafta)} hafta · ${n(r.toplamSaat)} saat`}
            </em>
          </div>
          <div className="date-calc-stat">
            <span>Doğduğunuz gün</span>
            <strong>{GUNLER[weekdayOf(d)]}</strong>
            <em>
              {d.day} {AYLAR[d.month - 1]} {d.year}
            </em>
          </div>
          <div className="date-calc-stat">
            <span>Burcunuz</span>
            <strong>{burc(d)}</strong>
            <em>Batı (tropikal) burcu</em>
          </div>
          <div className="date-calc-stat">
            <span>Hicri doğum tarihiniz</span>
            <strong>
              {h.day} {HIJRI_MONTHS_TR[h.month - 1]} {h.year}
            </strong>
            <em>Umm al-Qura takvimi (±1 gün)</em>
          </div>
          <div className="date-calc-stat">
            <span>{n(yuvarlak.n)}. gününüz</span>
            <strong>{yuvarlak.kalan === 0 ? "Bugün!" : `${n(yuvarlak.kalan)} gün sonra`}</strong>
            <em>{tarih(yuvarlak.tarih)}</em>
          </div>
        </div>
        <div className="yas-alt">
          <p className="date-calc-note">
            {canli ? (saat ? `Doğum saati ${saat} (Türkiye saati) kabul edildi; sayaç canlıdır.` : "Doğum saati girilmedi; 00:00 kabul edildi.") : ""}
          </p>
          <button
            type="button"
            className="yas-kopyala"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(ozet);
                setKopyalandi(true);
                setTimeout(() => setKopyalandi(false), 1500);
              } catch {
                /* pano izni yok */
              }
            }}
          >
            {kopyalandi ? "Kopyalandı" : "Sonucu kopyala"}
          </button>
        </div>
      </>
    ) : (
      <p className="date-calc-note">Doğum tarihi, hesaplanan tarihten sonra olamaz.</p>
    );
  } else if (d && mod === "fark") {
    const b = parseYmd(ikinci);
    if (b) {
      const r = yasFarki(d, b);
      sonuc = (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Aradaki yaş farkı</span>
            <strong>{r.buyuk ? yag(r.yil, r.ay, r.gun) : "Aynı gün doğmuşlar"}</strong>
            <em>{r.buyuk ? `${r.buyuk === "a" ? "1. kişi" : "2. kişi"} daha büyük` : ""}</em>
          </div>
          <div className="date-calc-stat">
            <span>Gün olarak</span>
            <strong>{n(r.toplamGun)} gün</strong>
            <em>yaklaşık {n(Math.round(r.toplamGun / 7))} hafta</em>
          </div>
        </div>
      );
    }
  } else if (d && bugun && mod === "duzeltilmis") {
    const h = Number(hafta.replace(",", "."));
    const r = duzeltilmisYas(d, h, bugun);
    sonuc = r ? (
      <div className="date-calc-results">
        <div className="date-calc-stat is-main">
          <span>Düzeltilmiş yaş</span>
          <strong>
            {r.duzeltilmis ? yag(r.duzeltilmis.years, r.duzeltilmis.months, r.duzeltilmis.days) : `Tahmini doğum tarihine ${n(-r.duzeltilmisGun)} gün var`}
          </strong>
          <em>gelişim takibinde bu yaş esas alınır (genellikle 2 yaşına kadar)</em>
        </div>
        <div className="date-calc-stat">
          <span>Kronolojik (takvim) yaşı</span>
          <strong>{yag(r.kronolojik.years, r.kronolojik.months, r.kronolojik.days)}</strong>
          <em>aşılar bu yaşa göre yapılır</em>
        </div>
        <div className="date-calc-stat">
          <span>Düşülen süre</span>
          <strong>{n(r.dusulenHafta)} hafta</strong>
          <em>40 − {h} hafta · tahmini doğum tarihi {tarih(r.tahminiDogum)}</em>
        </div>
      </div>
    ) : (
      <p className="date-calc-note">Doğduğu gebelik haftasını 22 ile 42 arasında girin.</p>
    );
  }

  return (
    <div className="date-calc yas-hesap">
      <div className="date-converter-modes is-light" role="tablist" aria-label="Hesaplama türü">
        {(
          [
            ["yas", "Kaç yaşındayım?"],
            ["fark", "İki kişi arası yaş farkı"],
            ["duzeltilmis", "Düzeltilmiş yaş (prematüre)"],
          ] as const
        ).map(([v, t]) => (
          <button key={v} type="button" role="tab" aria-selected={mod === v} className={mod === v ? "is-active" : undefined} onClick={() => setMod(v)}>
            {t}
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <TarihSecici
            etiket={mod === "fark" ? "1. kişinin doğum tarihi" : mod === "duzeltilmis" ? "Bebeğin doğum tarihi" : "Doğum tarihi"}
            deger={dogum}
            degis={setDogum}
            enErkenYil={1900}
            enGecYil={buYil}
          />
          {mod === "yas" ? (
            <label className="date-calc-field yas-saat">
              <span>Doğum saati (isteğe bağlı)</span>
              <input type="time" value={saat} onChange={(e) => setSaat(e.target.value)} />
            </label>
          ) : null}
          {mod === "fark" ? <TarihSecici etiket="2. kişinin doğum tarihi" deger={ikinci} degis={setIkinci} enErkenYil={1900} enGecYil={buYil} /> : null}
          {mod === "duzeltilmis" ? (
            <label className="date-calc-field">
              <span>Doğduğu gebelik haftası</span>
              <input inputMode="numeric" value={hafta} onChange={(e) => setHafta(e.target.value)} />
            </label>
          ) : null}
          {mod !== "fark" && (baskaTarih || hedef) ? (
            <label className="date-calc-field">
              <span>Hangi tarihe göre (boş: bugün)</span>
              <input type="date" value={hedef} onChange={(e) => setHedef(e.target.value)} />
            </label>
          ) : null}
        </div>
        {mod !== "fark" && !baskaTarih && !hedef ? (
          <button type="button" className="yas-baska" onClick={() => setBaskaTarih(true)}>
            Bugüne göre değil, başka bir tarihe göre hesapla
          </button>
        ) : null}
      </div>
      {sonuc}
    </div>
  );
}
